import {debounce} from './debounce.jsx';

export const scrollsync=function(el,param={}){
	const app={};
	app.param=Object.assign({nav:false,items:el.children,loop:false,auto:false,interval:5000},param);
	app.param.items=Array.from(app.param.items);
	if(!app.param.direction){
		app.param.direction=(el.clientHeight<el.scrollHeight)?'y':'x';
	}
	const ps={x:'left',y:'top'}[app.param.direction];
	const pe={x:'right',y:'bottom'}[app.param.direction];
	const ss={x:'scrollLeft',y:'scrollTop'}[app.param.direction];
	const w={x:'width',y:'height'}[app.param.direction];
	const sw={x:'scrollWidth',y:'scrollHeight'}[app.param.direction];
	const pds={x:'paddingLeft',y:'paddingTop'}[app.param.direction];
	const pde={x:'paddingRight',y:'paddingBottom'}[app.param.direction];
	const scrollToMainItems=()=>{
		if(!app.param.loop){return;}
		const bnd=el.getBoundingClientRect();
		const d=el[ss]-(el[sw]-bnd[w])/2;
		const u=el[sw]/10;
		const ul=el.children.length/5;
		if(Math.abs(d)>u){
			let i=(d<0)?1:3;
			if(d<u*-3){i--;}
			else if(d>u*3){i++;}
			el.style.setProperty('will-change','scroll-position');
			setTimeout(()=>{
				el.scrollTo({
					[ps]:el[ss]+el.children[ul*2].getBoundingClientRect()[ps]-el.children[ul*i].getBoundingClientRect()[ps],
					behavior:'instant'
				});
				el.style.setProperty('will-change','');
			},100);
		}
	}
	const cloneChildrenForLoop=()=>{
		const children=Array.from(el.children);
		for(let i=0,l=children.length;i<l;i++){
			el.appendChild(children[i].cloneNode(true));
			el.insertBefore(children[i].cloneNode(true),children[0]);
		}
		for(let i=0,l=children.length;i<l;i++){
			el.appendChild(children[i].cloneNode(true));
			el.insertBefore(children[i].cloneNode(true),children[0]);
		}
	}
	const updateActiveItem=()=>{
		if(app.param.loop){scrollToMainItems();}
		let i,index=-1;
		const l=app.param.items.length;
		const bnd=el.getBoundingClientRect();
		const c=bnd[ps]+app.param.padding+bnd[w]*app.param.position;
		for(i=0;i<l;i++){
			const bnd=app.param.items[i].getBoundingClientRect();
			if(bnd[pe]>c){index=i;break;}
		}
		updateItemsClass(app.param.items,index);
		if(app.param.navItemsList){
			app.param.navItemsList.forEach((items)=>updateItemsClass(items,index));
		}
		if(app.param.controls && !app.param.loop){
			if(app.param.controls.prev){app.param.controls.prev.classList.toggle('is-disabled',index<=0);}
			if(app.param.controls.next){app.param.controls.next.classList.toggle('is-disabled',index>=l-1);}
		}
		app.current=index;
		el.style.setProperty('--scroll-index',index);
	};
	const updateItemsClass=(items,index)=>{
		const l=items.length;
		for(let i=0;i<l;i++){
			const item=items[i];
			const p=i-index;
			item.classList.toggle('is-before',p<0);
			item.classList.toggle('is-prev',p===-1);
			item.classList.toggle('is-current',p===0);
			item.classList.toggle('is-next',p===1);
			item.classList.toggle('is-after',p>0);
			item.style.setProperty('--scroll-p',p);
		}
	};
	const updateNavClass=()=>{
		if(!app.param.nav || app.param.loop){return;}
		const bnd=el.getBoundingClientRect();
		const p=app.param.position;
		const ls=bnd[ps]+bnd[w]*p-el[ss];
		const le=ls+el[sw]-bnd[w];
		for(let i=0;i<app.param.items.length;i++){
			const bnd=app.param.items[i].getBoundingClientRect();
			app.param.navItemsList.forEach((items)=>{
				items[i].classList.toggle('is-disabled',bnd[pe]<ls || bnd[ps]>le);
			});
		}
	}
	const initParam=()=>{
		const ssa=getComputedStyle(app.param.items[0])['scroll-snap-align'];
		if(!app.param.position){
			app.param.position={start:0,center:0.5,end:1}[ssa] || 0;
		}
		if(!app.param.padding){
			app.param.padding=parseFloat(getComputedStyle(el)['scroll-padding-'+(ssa==='end'?pe:ps)]);
			if(isNaN(app.param.padding)){app.param.padding=0;}
		}
	};
	initParam();
	const observer=new ResizeObserver(updateNavClass);
	observer.observe(el);
	app.goto=(index)=>{
		let d=0;
		if(app.param.loop){
			const l=app.param.items.length;
			if(index<0){d-=el[sw]/5;while(index<0){index+=l;}}
			else if(index>=l){d+=el[sw]/5;index%=l;}
		}
		else{
			index=Math.max(0,Math.min(app.param.items.length-1,index));
		}
		const bnd1=el.getBoundingClientRect();
		const bnd2=app.param.items[index].getBoundingClientRect();
		const p=app.param.position;
		el.scrollTo({
			[ps]:el[ss]-app.param.padding+(bnd2[ps]+bnd2[w]*p)-(bnd1[ps]+bnd1[w]*p)+d
		});
	};
	app.prev=()=>app.goto(app.current-1);
	app.next=()=>app.goto(app.current+1);
	app.play=()=>{
		app.timer=setInterval(app.next,app.param.interval);
	};
	app.pause=()=>{
		clearInterval(app.timer);
	};
	const registerAsNav=(items)=>{
		const l=items.length;
		for(let i=0;i<l;i++){
			items[i].addEventListener('click',()=>app.goto(i));
		}
	}
	const getNavtItemsList=(val)=>{
		if(Array.isArray(val)){
			return Array.concat.apply([],val.map(getNavtItemsList));
		}
		else if(val instanceof HTMLCollection || val instanceof NodeList){
			return [val];
		}
		else{
			return [val.children];
		}
	}
	if(app.param.nav){
		app.param.navItemsList=getNavtItemsList(app.param.nav);
		app.param.navItemsList.forEach(registerAsNav);
	}
	if(app.param.controls){
		if(app.param.controls.prev){app.param.controls.prev.addEventListener('click',app.prev);}
		if(app.param.controls.next){app.param.controls.next.addEventListener('click',app.next);}
	}
	if(app.param.loop){
		cloneChildrenForLoop();
	}
	if(app.param.auto){
		app.play();
		el.addEventListener('touchstart',app.pause);
		el.addEventListener('touchend',app.play);
	}
	el.addEventListener('scroll',debounce(updateActiveItem,100),{passive: true});
	window.addEventListener('resize',debounce(updateActiveItem,100));
	window.addEventListener('load',initParam);
	updateNavClass();
	updateActiveItem();
	return app;
}