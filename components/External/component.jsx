Catpow.External=(props)=>{
	const {children,trace}=props;
	const {render,useState,useMemo,useCallback,useEffect,useRef,createPortal}=wp.element;
	
	const ref=useRef({contents:false,setContents:()=>{}});
	
	const el=useMemo(()=>{
		if(props.id){
			const exEl=document.getElementById(props.id);
			if(exEl){return exEl;}
		}
		const el=document.createElement('div');
		if(props.id){el.id=props.id;}
		el.className=props.className;
		document.body.appendChild(el);
		return el;
	},[]);
	
	if(trace){
		useEffect(()=>{
			el.style.position='absolute';
			const timer=setInterval(()=>{
				if(trace.getBoundingClientRect){
					const bnd=trace.getBoundingClientRect();
					el.style.left=(window.scrollX+bnd.left)+'px';
					el.style.top=(window.scrollY+bnd.top)+'px';
					el.style.width=bnd.width+'px';
					el.style.height=bnd.height+'px';
				}
			},50);
			return ()=>clearInterval(timer);
		},[trace]);
	}
	
	return createPortal(children,el);
}