window.Catpow.JsonEditor.Image=(props)=>{
	const {className="JsonEditor-Input-Image",agent,onChange,onUpdate}=props;
	const {useState,useMemo,useCallback,useEffect}=wp.element;
	const {bem}=Catpow.util;
	const classes=useMemo(()=>bem(className),[]);
	const {__,sprintf}=wp.i18n;
	
	const onChangeHandle=useCallback((value)=>{
		onUpdate(value)
	},[onUpdate]);
	
	return (
		<div className={classes()}>
			<Catpow.SelectMedia src={agent.getValue() && agent.getValue().url} onChange={onChangeHandle}/>
		</div>
	);
}