Catpow.External=(props)=>{
	const {children,trace}=props;
	const {render,useState,useMemo,useCallback,useEffect,useRef}=wp.element;
	
	const ref=useRef({contents:false,setContents:()=>{}});
	
	const el=useMemo(()=>{
		const el=document.createElement('div');
		el.className=props.className;
		document.body.appendChild(el);
		return el;
	},[]);
	
	const ExternalContents=useCallback((props)=>{
		[ref.current.contents,ref.current.setContents]=useState(children);
		return ref.current.contents;
	},[]);
	
	useEffect(()=>{
		render(<ExternalContents/>,el);
		return ()=>el.remove();
	},[]);
	useEffect(()=>{ref.current.setContents(children);},[children]);
	
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
	
	return false;
}