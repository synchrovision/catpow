Catpow.External=(props)=>{
	const {children,trace}=props;
	const {render,useState,useMemo,useCallback,useEffect,useRef,createPortal}=wp.element;
	
	const ref=useRef({contents:false,setContents:()=>{}});
	
	const el=useMemo(()=>{
		const doc=(trace && trace.ownerDocument) || document;
		if(props.id){
			const exEl=doc.getElementById(props.id);
			if(exEl){return exEl;}
		}
		const el=doc.createElement('div');
		if(props.id){el.id=props.id;}
		el.className=props.className;
		doc.body.appendChild(el);
		return el;
	},[trace]);
	
	useEffect(()=>{
		if(trace){
			const doc=trace.ownerDocument || document;
			el.style.position='absolute';
			const timer=setInterval(()=>{
				if(trace.getBoundingClientRect){
					const bnd=trace.getBoundingClientRect();
					el.style.left=(doc.defaultView.scrollX+bnd.left)+'px';
					el.style.top=(doc.defaultView.scrollY+bnd.top)+'px';
					el.style.width=bnd.width+'px';
					el.style.height=bnd.height+'px';
				}
			},50);
			return ()=>clearInterval(timer);
		}
	},[trace]);
	
	return createPortal(children,el);
}