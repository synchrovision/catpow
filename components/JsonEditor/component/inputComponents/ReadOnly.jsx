const {__,sprintf}=wp.i18n;

export const ReadOnly=(props)=>{
	const {className="JsonEditor-Input-ReadOnly",agent,onChange,onUpdate}=props;
	const {useState,useMemo,useCallback,useEffect}=wp.element;
	const {bem}=Catpow.util;
	const classes=useMemo(()=>bem(className),[]);
	
	return (
		<div className={classes()}>{agent.getValue() || ''}</div>
	);
}