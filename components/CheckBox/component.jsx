Catpow.CheckBox=(props)=>{
	const {label,onChange}=props;
	const {useState}=wp.element;
	
	const selected=props.selected || props.value;
	
	if(label){
		return (
			<div className={"CheckBox"+(selected?' selected':'')} onClick={(e)=>{onChange(!selected);}} role="checkbox" aria-checked={selected}>
				<div className={"CheckBoxIcon"+(selected?' selected':'')}> </div>
				{label}
			</div>
		);
	}
	return (
		<div className={"CheckBoxIcon"+(selected?' selected':'')} onClick={(e)=>{onChange(!selected);}} role="checkbox" aria-checked={selected}> </div>
	);
}