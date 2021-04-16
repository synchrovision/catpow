Catpow.CheckBox=(props)=>{
	const {label,selected,onChange}=props;
	const {useState}=wp.element;
	
	return (
		<div className={"CheckBox"+(selected?' selected':'')} onClick={(e)=>{onChange(!selected);}}>
			<div class="icon"> </div>
			{label}
		</div>
	);
}