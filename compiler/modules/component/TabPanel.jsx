import {bem} from 'util';

export const TabPanel=(props)=>{
	const {useState,useMemo,useCallback,useEffect,useRef,useReducer}=wp.element;
	const {className="cp-tabpanel",children}=props;
	const [current,setCurrent]=useState(props.initialOpen || 0);
	const classes=useMemo(()=>bem(className),[className]);
	
	return (
		<div className={classes()}>
			<div className={classes.tabs()}>
			{children.map((child,index)=>(
				<div className={classes.tabs.tab({'is-active':current===index})} onClick={()=>setCurrent(index)} key={child.key}>{child.key}</div>
			))}
			</div>
			<div className={classes.contents()}>{children[current]}</div>
		</div>
	);
}