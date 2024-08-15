window.Catpow.JsonEditor.MenuItems=(props)=>{
	const {className="JsonEditor-Input-MenuItems",agent,onChange,onUpdate}=props;
	const {useState,useMemo,useCallback,useEffect}=wp.element;
	const {bem}=Catpow.util;
	const classes=useMemo(()=>bem(className),[]);
	const {__,sprintf}=wp.i18n;
	
	return (
		<div className={classes()}>
			<Catpow.SelectMenuItem name='icon' value={agent.getValue()} onChange={onUpdate}/>
		</div>
	);
}