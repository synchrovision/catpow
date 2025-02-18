const {__,sprintf}=wp.i18n;

export const Duration=(props)=>{
	const {className="cp-jsoneditor-input-duration",agent,onChange,onUpdate}=props;
	const {useState,useMemo,useCallback,useEffect}=wp.element;
	const {bem}=Catpow.util;
	const classes=useMemo(()=>bem(className),[]);
	
	return (
		<div className={classes()}>
			<Catpow.InputDuration value={agent.getValue() || ''} onChange={onUpdate}/>
		</div>
	);
}