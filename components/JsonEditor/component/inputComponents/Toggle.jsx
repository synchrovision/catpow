const {__,sprintf}=wp.i18n;

export const Toggle=(props)=>{
	const {className="JsonEditor-Input-Toggle",agent,onChange,onUpdate}=props;
	const {useState,useMemo,useCallback,useEffect}=wp.element;
	const {bem}=Catpow.util;
	const classes=useMemo(()=>bem(className),[]);
	
	return (
		<div className={classes()}>
			<Catpow.Toggle value={agent.getValue()} onChange={onUpdate}/>
		</div>
	);
}