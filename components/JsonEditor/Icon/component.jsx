window.Catpow.JsonEditor.Icon=(props)=>{
	const {className="JsonEditor-Input-Icon",agent,onChange,onUpdate}=props;
	const {useState,useMemo,useCallback,useEffect}=wp.element;
	const {bem}=Catpow.util;
	const classes=useMemo(()=>bem(className),[]);const {__,sprintf}=wp.i18n;
	
	return (
		<div className={classes()}>
			<Catpow.SelectPreparedImage name='icon' value={agent.getValue()} onChange={onUpdate}/>
		</div>
	);
}