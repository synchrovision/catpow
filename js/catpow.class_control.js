/* global Catpow WeakMap*/

Catpow.class_control=(control,target,param)=>{
	if(!target){target=control.parentNode;}
	const {bem,el}=Catpow.util;
	const bems=new WeakMap();
	const registerBem=(item)=>bems.set(item,bem(item.className));
	const initItem=(item,index)=>{
		registerBem(item);
		item.addEventListener('click',()=>{
			app.goto(index);
		});
	};
	const updateItemClassName=(item,index)=>{
		item.className=bems.get(item)('item'+(index-app.current),{
			before:index<app.current,
			prev:index-app.current===-1,
			active:index===app.current,
			next:index-app.current===1,
			after:index>app.current,
		});
	};
	const app=this;
	app.init=()=>{
		app.control=control;
		app.target=target;
		app.length=target.children.length;
		app.images=Array.from(app.target.children);
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
		const dotsContainer=control.querySelector('.dots');
		const thumbsContainer=control.querySelector('.thumb,.thumbnail');
		
		app.images.forEach(initItem);
		if(dotsContainer){
			while(dotsContainer.children.length<app.length){
				dotsContainer.append(el('span',{className:'dot'}));
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
		app.goto(app.param.initialSlide);
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
			while(index<0){index+=app.length;}
			index%=app.length;
		}
		else{
			index=Math.max(0,Math.min(index,app.length-1));
		}
		app.current=index;
		app.images.forEach(updateItemClassName);
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