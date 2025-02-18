window.Catpow.JsonEditor.MenuItem=(props)=>{
	const {className="cp-jsoneditor-input-menuitem",agent,onChange,onUpdate}=props;
	const {useState,useMemo,useCallback,useEffect}=wp.element;
	const {bem}=Catpow.util;
	const classes=useMemo(()=>bem(className),[]);
	const {__,sprintf}=wp.i18n;
	
	const schema=agent.getMergedSchemaForInput();
	
	return (
		<div className={classes()}>
			<Catpow.SelectMenuItem onChange={onUpdate}/>
		</div>
	);
}