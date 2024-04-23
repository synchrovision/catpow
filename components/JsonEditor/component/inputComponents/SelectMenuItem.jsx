const {__,sprintf}=wp.i18n;

export const SelectMenuItem=(props)=>{
	const {className="JsonEditor-Input-SelectMenuItem",agent,onChange,onUpdate}=props;
	const {useState,useMemo,useCallback,useEffect}=wp.element;
	const {bem}=Catpow.util;
	const classes=useMemo(()=>bem(className),[]);
	
	return (
		<div className={classes()}>
			<Catpow.SelectMenuItem onChange={onUpdate}/>
		</div>
	);
}