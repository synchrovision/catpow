window.Catpow.JsonEditor.MenuItems=(props)=>{
	const {className="cp-jsoneditor-input-menuitems",agent,onUpdate}=props;
	
	return (
		<div className={className}>
			<Catpow.SelectMenuItem name='icon' value={agent.getValue()} onChange={onUpdate}/>
		</div>
	);
}