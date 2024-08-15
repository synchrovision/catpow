const {__,sprintf}=wp.i18n;
import {debounce} from 'util';

export const Date=(props)=>{
	const {className="JsonEditor-Input-Date",agent,onChange,onUpdate}=props;
	const {useState,useMemo,useCallback,useEffect}=wp.element;
	const {bem}=Catpow.util;
	const classes=useMemo(()=>bem(className),[]);
	
	const onChangeHandle=useCallback((e)=>{
		onChange(e.currentTarget.value);
	},[onChange]);
	const onUpdateHandle=useCallback((e)=>{
		onUpdate(e.currentTarget.value);
	},[onUpdate]);
	
	
	return (
		<div className={classes()}>
			<input type="date" value={agent.getValue() || ''} onChange={onChangeHandle} onBlur={onUpdateHandle}/>
		</div>
	);
}