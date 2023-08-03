Catpow.Toggle=(props)=>{
	const {useMemo,useState,useEffect}=wp.element;
	const {className="Toggle",onChange,threashold=40}=props;
	const {bem}=Catpow.util;
	const classes=useMemo(()=>bem(className),[]);
	
	const [value,setValue]=useState(props.value);
	const [handler,setHandler]=useState(false);
	
	useEffect(()=>{
		if(!handler){return;}
		const org={x:0};
		const handleTouchStart=(e)=>{
			org.x=e.targetTouches[0].clientX;
		};
		const handleTouchMove=(e)=>{
			setValue(e.targetTouches[0].clientX-org.x > threashold);
		};
		return ()=>{
			handler.removeEventListener('touchstart',handleTouchStart);
			handler.removeEventListener('touchmove',handleTouchMove);
			handler.removeEventListener('mousedown',handleTouchStart);
			handler.removeEventListener('mousemove',handleTouchMove);
		};
	},[handler,setValue,threashold]);
	useEffect(()=>{
		if(props.value!==value){onChange(value);}
	},[props.value,value,onChange]);
	
	return (
		<div className={classes({'is-active':value})} onClick={()=>{setValue(!value);}} ref={setHandler}>
			<span className={classes.handler()}></span>
		</div>
	);
}