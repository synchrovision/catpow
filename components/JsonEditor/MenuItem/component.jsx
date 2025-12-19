window.Catpow.JsonEditor.MenuItem=(props)=>{
	const {className="cp-jsoneditor-input-menuitem",onUpdate}=props;
	
	return (
		<div className={className}>
			<Catpow.SelectMenuItem onChange={onUpdate}/>
		</div>
	);
}