import {bem} from 'util';

export const ElasticBox=(props)=>{
	const {useMemo,useState,useCallback,useEffect,useRef}=wp.element;
	const {className="cp-elasticbox",children,observeHeight=true,observeWidth=false}=props;
	const [current,setCurrent]=useState(props.initialOpen || 0);
	const classes=useMemo(()=>bem(className),[className]);
	
	const ref=useRef({});
	
	const [height,setHeight]=useState(observeHeight?'auto':'');
	const [width,setWidth]=useState(observeWidth?'auto':'');
	
	useEffect(()=>{
		const observer=new ResizeObserver((entries)=>{
			if(observeHeight){setHeight(entries[0].contentRect.height + 'px');}
			if(observeWidth){setWidth(entries[0].contentRect.width + 'px');}
		});
		observer.observe(ref.current.children[0]);
		return ()=>observer.disconnect();
	},[ref.current,observeHeight,observeWidth]);
	
	return (
		<div className={classes()} ref={ref} style={{height,width}}>
			<div className={classes._body()}>
				{props.children}
			</div>
		</div>
	);
}