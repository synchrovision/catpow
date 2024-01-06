import {Nav} from 'component';
import {bem} from 'util';

export const MenuItem=(props)=>{
	const {useState,useCallback,useMemo,useContext}=wp.element;
	const {state,dispatch}=useContext(Nav.State);
	const {className='cp-nav-menu',item}=props;
	const classes=useMemo(()=>bem(className),[className]);
	
	
	const onMouseEnter=useCallback(()=>dispatch({type:'activate',item}),[]);
	const onClick=useCallback(()=>{
		dispatch({type:(!item.active || state.currentLevel===item.level)?'activate':'deactivate',item,updateLevel:true});
	},[state.currentLevel]);
	
	return (
		<div
			className={classes({'is-active':item.active,'has-children':item.children})}
			onClick={onClick}
			onMouseEnter={onMouseEnter}
		>
			{props.children}
		</div>
	);
}