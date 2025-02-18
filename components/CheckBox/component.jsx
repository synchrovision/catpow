Catpow.CheckBox=(props)=>{
	const {label,onChange}=props;
	const {useState}=wp.element;
	
	const selected=props.selected || props.value;
	
	if(label){
		return (
			<div className={"cp-checkbox"+(selected?' selected':'')} onClick={(e)=>{onChange(!selected);}} role="checkbox" aria-checked={selected}>
				<div className={"cp-checkbox__icon"+(selected?' selected':'')}> </div>
				{label}
			</div>
		);
	}
	return (
		<div className={"cp-checkbox__icon"+(selected?' selected':'')} onClick={(e)=>{onChange(!selected);}} role="checkbox" aria-checked={selected}> </div>
	);
}