/* global Catpow WeakMap*/

Catpow.class_control=(control,target,param)=>{
	if(!target){target=control.parentNode;}
	const {bem}=Catpow.util;
	const bems=new WeakMap();
	const registerBem=(item)=>bems.set(item,bem(item.className));
	const initItem=(item,index)=>{
		registerBem(item);
		item.addEventListener('click',()=>{
			app.goto(index);
		});
	};
	const getRealIndex=(i,c,l,lp)=>{
		let d=i-c;
		while(d>=l){d-=l;}
		while(d<=-l){d+=l;}
		if(lp){
			const h=l>>1;
			if(c<h && d>h){d+=l;}
			if(c>h+l && d<-h){d-=l;}
		}
		return c+d;
	};
	const getRelativeIndex=(i,c,l,lp)=>{
		if(!lp){return i-c;}
		const h=l>>1;
		return (i-c+h+l)%l-h;
	};
	const updateClassName=(item,p)=>{
		item.className=bems.get(item)('item'+(p),{
			before:p<0,
			prev:p===-1,
			active:p===0,
			next:p===1,
			after:p>0,
		});
		item.style.setProperty('--item-p',p);
	}
	const updateItemClassName=(item,index)=>{
		updateClassName(item,getRelativeIndex(index%app.length,app.current%app.length,app.length,app.param.loop));
	};
	const updateImageClassName=(item,index)=>{
		updateClassName(item,getRelativeIndex(index,app.current,app.imageLength,app.param.loop));
	};
	const app=this;
	app.init=()=>{
		app.control=control;
		app.target=target;
		app.param={
			loop:control.classList.contains('loop'),
			autoplay:control.classList.contains('autoplay'),
			flickable:control.classList.contains('flickable'),
			scrollable:control.classList.contains('scrollable'),
			stopbyhover:control.classList.contains('stopbyhover'),
			closable:control.classList.contains('closable'),
			loopItems:control.classList.contains('loopItems'),
			initialSlide:0,
			interval:500,
			wait:4500,
		};
		if(control.dataset.config){
			Object.assign(app.param,JSON.parse(control.dataset.config));
		}
		if(param){
			Object.assign(app.param,param);
		}
		app.length=target.children.length;
		if(app.param.loopItems){
			const images=Array.from(app.target.children);
			for(let i=0;i<2;i++){
				images.forEach((image)=>app.target.append(image.cloneNode(true)));
			}
		}
		app.images=Array.from(app.target.children);
		app.imageLength=app.images.length;
		const dotsContainer=control.querySelector('.dots');
		const thumbsContainer=control.querySelector('.thumb,.thumbnail');
		
		app.images.forEach(initItem);
		if(dotsContainer){
			while(dotsContainer.children.length<app.length){
				dotsContainer.append(dotsContainer.children[0].cloneNode());
			}
			app.dots=Array.from(dotsContainer.children);
			app.dots.forEach(initItem);
		}
		if(thumbsContainer){
			app.thumb=Array.from(thumbsContainer.children);
			app.thumb.forEach(initItem);
		}
		
		const prevButton=control.querySelector('.prev');
		const nextButton=control.querySelector('.next');
		if(prevButton){prevButton.addEventListener('click',()=>app.prev());}
		if(nextButton){nextButton.addEventListener('click',()=>app.next());}
		app.current=app.param.initialSlide;
		app.images.forEach(updateImageClassName);
		if(app.dots){app.dots.forEach(updateItemClassName);}
		if(app.thumb){app.thumb.forEach(updateItemClassName);}
		if(app.param.autoplay){
			app.play();
			if(app.param.stopbyhover){
				app.target.addEventListener('mouseover',()=>app.stop());
				app.target.addEventListener('mouseout',()=>app.play());
			}
		}
	}
	app.goto=(index)=>{
		if(app.param.loop){
			while(index<0){index+=app.imageLength;}
			index%=app.imageLength;
		}
		else{
			index=Math.max(0,Math.min(index,app.imageLength-1));
		}
		if(app.param.loopItems){
			index=getRealIndex(index,app.current,app.length,app.param.loop);
		}
		app.current=index;
		app.images.forEach(updateImageClassName);
		if(app.dots){app.dots.forEach(updateItemClassName);}
		if(app.thumb){app.thumb.forEach(updateItemClassName);}
	};
	app.prev=()=>app.goto(app.current-1);
	app.next=()=>app.goto(app.current+1);
	
	app.stop=()=>{if(app.timer){clearInterval(app.timer);}};
	app.play=()=>{app.stop();app.timer=setInterval(()=>{app.next();},app.param.interval+app.param.wait);};
	app.close=()=>{
		app.control.classList.add('close');
		app.control.classList.remove('open');
		app.pause();
	};
	app.open=()=>{
		app.control.classList.remove('close');
		app.control.classList.add('open');
		app.resume();
	};
	app.init();
	return app;
};