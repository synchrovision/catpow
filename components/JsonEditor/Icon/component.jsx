
window.Catpow.JsonEditor.Icon=(props)=>{
	const {className="cp-jsoneditor-input-icon",agent,onUpdate}=props;
	
	return (
		<div className={className}>
			<Catpow.SelectPreparedImage name='icon' value={agent.getValue()} onChange={onUpdate}/>
		</div>
	);
}