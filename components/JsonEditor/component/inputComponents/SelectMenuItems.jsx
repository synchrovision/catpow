const {__,sprintf}=wp.i18n;

export const SelectMenuItems=(props)=>{
	const {className="JsonEditor-Input-SelectMenuItems",agent,onChange}=props;
	const {useState,useMemo,useCallback,useEffect}=wp.element;
	const {bem}=Catpow.util;
	const classes=useMemo(()=>bem(className),[]);
	
	
	return (
		<div className={classes()}>
		</div>
	);
}