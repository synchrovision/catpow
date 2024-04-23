const {__,sprintf}=wp.i18n;

export const SelectIcon=(props)=>{
	const {className="JsonEditor-Input-SelectIcon",agent,onChange,onUpdate}=props;
	const {useState,useMemo,useCallback,useEffect}=wp.element;
	const {bem}=Catpow.util;
	const classes=useMemo(()=>bem(className),[]);
	
	return (
		<div className={classes()}>
			<Catpow.SelectPreparedImage name='icon' value={agent.getValue()} onChange={onUpdate}/>
		</div>
	);
}