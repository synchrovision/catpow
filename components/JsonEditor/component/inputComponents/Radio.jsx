const {__,sprintf}=wp.i18n;

export const Radio=(props)=>{
	const {className="JsonEditor-Input-Radio",agent,onChange,onUpdate}=props;
	const {useState,useMemo,useCallback,useEffect}=wp.element;
	const {bem}=Catpow.util;
	const classes=useMemo(()=>bem(className),[]);
	
	const schema=agent.getMergedSchemaForInput();
	
	return (
		<div className={classes()}>
			<Catpow.RadioButtons value={agent.getValue()}　options={schema.enum} onChange={onUpdate}/>
		</div>
	);
}