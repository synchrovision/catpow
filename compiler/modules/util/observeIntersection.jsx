export const observeIntersection=function(items,param={}){
	const app={};
	const map=new WeakMap();
	app.param=Object.assign({threshold:[0,.01,.25,.5,1]},param);
	app.observer=new IntersectionObserver((entries)=>{
		entries.forEach((entry)=>{
			const el=entry.target;
			const r=entry.intersectionRatio;
			const prev=map.has(el)?map.get(el):0;
			map.set(el,r);
			if(r>prev){
				if(prev===0){el.dispatchEvent(new Event('enterIntoView'));}
				if(prev<0.5){
					if(r>0.5){el.dispatchEvent(new Event('enterHalfIntoView'));}
				}
				if(r===1){el.dispatchEvent(new Event('enterFullIntoView'));}
			}
			else{
				if(r===0){el.dispatchEvent(new Event('leaveFullFromView'));}
				else if(prev>0.5){
					if(prev===1){
						el.dispatchEvent(new Event('leaveFromView'));
					}
					if(r<0.5){el.dispatchEvent(new Event('leaveHalfFromView'));}
				}
			}
			
		});
	},app.param);
	if(items.forEach){
		items.forEach((item)=>app.observer.observe(item));
	}
	else{
		app.observer.observe(items);
	}
	return app;
}