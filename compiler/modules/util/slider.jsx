export const slider=function(el,param={}){
	const app={};
	app.param=Object.assign({interval:5000,pauseInterval:10000,autoPlay:true,isNav:false},param);
	const l=app.length=el.children.length;
	const h=l>>1;
	const updateItemsClass=(items,i)=>{
		const l=items.length;
		for(let p=-h;p<l-h;p++){
			const item=items[(p+i+l)%l];
			item.classList.toggle('is-before',p<0);
			item.classList.toggle('is-prev',p===-1);
			item.classList.toggle('is-current',p===0);
			item.classList.toggle('is-next',p===1);
			item.classList.toggle('is-after',p>0);
			item.style.setProperty('--slide-p',p);
		}
	};
	const registerAsNav=(items)=>{
		const l=items.length;
		for(let i=0;i<l;i++){
			items[i].addEventListener('click',()=>{
				app.pause();
				app.goto(i);
			})
		}
	}
	app.goto=(i)=>{
		i=((i%l)+l)%l;
		app.current=i;
		updateItemsClass(el.children,i);
		if(app.param.sync){
			if(Array.isArray(app.param.sync)){
				param.sync.forEach((target)=>updateItemsClass(target.children,i));
			}
			else{
				updateItemsClass(app.param.sync.children,i);
			}
		}
		if(param.nav){
			updateItemsClass(app.param.nav.children,i);
		}
	}
	app.prev=()=>app.goto(app.current-1);
	app.next=()=>app.goto(app.current+1);
	app.stop=()=>{
		el.classList.remove('is-playing');
		if(app.pauseTimer){clearTimeout(app.pauseTimer);}
		if(app.timer){clearInterval(app.timer);}
	};
	app.pause=()=>{app.stop();if(app.param.autoPlay){app.pauseTimer=setTimeout(()=>app.play(),app.param.pauseInterval);}}
	app.play=()=>{app.stop();el.classList.add('is-playing');app.timer=setInterval(()=>app.next(),app.param.interval);}
	if(app.param.autoPlay){
		app.play();
		app.observer=new IntersectionObserver((entries)=>{
			entries.forEach((entry)=>{
				if(entry.intersectionRatio>0){app.play();}
				else{app.stop();}
			});
		},{threshold:[0,.1]});
		app.observer.observe(el);
	}
	if(app.param.isNav){
		registerAsNav(el.children);
		if(app.param.sync){
			if(Array.isArray(app.param.sync)){
				param.sync.forEach((target)=>{registerAsNav(target.children);});
			}
			else{
				registerAsNav(app.param.sync.children);
			}
		}
	}
	if(typeof app.param.nav === 'string'){
		app.param.nav=document.querySelector(app.param.nav);
	}
	if(app.param.nav){
		registerAsNav(app.param.nav.children);
	}
	app.goto(param.initialSlide || 0);
	el.classList.add('is-init');
	window.requestAnimationFrame(()=>el.classList.remove('is-init'));
	return app;
}