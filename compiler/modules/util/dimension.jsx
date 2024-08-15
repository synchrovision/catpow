export const parallax=(el,vars={})=>{
	var wh,ch;
	const updateCoef=()=>{
		wh=window.innerHeight,ch=el.clientHeight;
	};
	window.addEventListener('resize',updateCoef);
	updateCoef();
	const keys=Object.keys(vars);
	const testCallback=(cb)=>{
		const tbl=[];
		for(let n=0;n<=100;n+=5){
			tbl.push({n,rusult:cb(n/100)});
		}
		console.table(tbl);
	}
	keys.forEach((key)=>{
		if(Array.isArray(vars[key])){
			const vs=[0,0].concat(vars[key]);
			if(vs.length & 1){vs.push(1);}
			if(vs[vs.length-2]!==1){vs.push(1,1);}
			const es=[],cs=[],ds=[];
			for(let i=2;i<vs.length;i+=2){
				const c=(vs[i+1]-vs[i-1])/(vs[i]-vs[i-2]);
				es.push(vs[i]);
				cs.push(c);
				ds.push(vs[i+1]-c*vs[i]);
			}
			vars[key]=(p)=>{
				for(let i=0;i<es.length;i++){
					if(p<=es[i]){
						return p*cs[i]+ds[i]
					}
				}
				return 1;
			}
		}
	});
	const tick=(t)=>{
		const bnd=el.getBoundingClientRect();
		const p=Math.min(1,Math.max(0,(wh-bnd.top)/(bnd.height+wh)));
		el.style.setProperty('--parallax-t',bnd.top);
		el.style.setProperty('--parallax-c',bnd.top+ch/2-wh/2);
		el.style.setProperty('--parallax-b',wh-bnd.bottom);
		el.style.setProperty('--parallax-p',p);
		keys.map((key)=>el.style.setProperty('--'+key,vars[key](p)));
		window.requestAnimationFrame(tick);
	}
	window.requestAnimationFrame(tick);
};
export const simpleParallax=(el,target)=>{
	if(!target || !target.getBoundingClientRect){target=el.parentElement;}
	el.style.setProperty('position','fixed');
	el.style.setProperty('inset','0');
	const update=()=>{
		const bnd=target.getBoundingClientRect(),wh=window.innerHeight,ww=window.innerWidth;
		const t=Math.max(0,Math.min(1,bnd.top/wh))*100;
		const b=Math.max(0,Math.min(1,bnd.bottom/wh))*100;
		const l=Math.max(0,Math.min(1,bnd.left/ww))*100;
		const r=Math.max(0,Math.min(1,bnd.right/ww))*100;
		el.style.setProperty('clip-path',`polygon(${l}% ${t}%, ${r}% ${t}%, ${r}% ${b}%, ${l}% ${b}%)`);
	}
	document.addEventListener('scroll',(cb)=>window.requestAnimationFrame(update));
	window.addEventListener('resize',(cb)=>window.requestAnimationFrame(update));
	window.addEventListener('load',update);
	update();
}
export const dimensionBox=(box)=>{
	const body=box.children[0];
	const observer=new ResizeObserver((entries)=>{
		box.style.setProperty('height',entries[0].contentRect.height + 'px');
	});
	observer.observe(body);
	const tick=(t)=>{
		const bnd=box.getBoundingClientRect(),wh=window.innerHeight;
		body.style.setProperty('perspective-origin','center '+(wh/2-bnd.top)+'px');
		body.style.setProperty('transform','translate3d(0,'+bnd.top+'px,0)');
		window.requestAnimationFrame(tick);
	}
	window.requestAnimationFrame(tick);
	body.style.setProperty('position','fixed');
	body.style.setProperty('overflow','hidden');
	body.style.setProperty('top',0);
	body.style.setProperty('left',0);
	body.style.setProperty('right',0);
	box.style.setProperty('height',body.getBoundingClientRect().height + 'px');
}