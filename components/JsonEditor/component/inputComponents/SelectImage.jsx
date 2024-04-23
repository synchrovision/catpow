const {__,sprintf}=wp.i18n;

export const SelectImage=(props)=>{
	const {className="JsonEditor-Input-SelectImage",agent,onChange,onUpdate}=props;
	const {useState,useMemo,useCallback,useEffect}=wp.element;
	const {bem}=Catpow.util;
	const classes=useMemo(()=>bem(className),[]);
	
	const onChangeHandle=useCallback((value)=>{
		onUpdate(value)
	},[onUpdate]);
	
	return (
		<div className={classes()}>
			<Catpow.SelectMedia src={agent.getValue() && agent.getValue().url} onChange={onChangeHandle}/>
		</div>
	);
}