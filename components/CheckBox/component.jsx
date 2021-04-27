Catpow.CheckBox=(props)=>{
	const {label,selected,onChange}=props;
	const {useState}=wp.element;
	
	if(label){
		return (
			<div className={"CheckBox"+(selected?' selected':'')} onClick={(e)=>{onChange(!selected);}}>
				<div className={"CheckBoxIcon"+(selected?' selected':'')} > </div>
				{label}
			</div>
		);
	}
	return (
		<div className={"CheckBoxIcon"+(selected?' selected':'')} onClick={(e)=>{onChange(!selected);}}> </div>
	);
}