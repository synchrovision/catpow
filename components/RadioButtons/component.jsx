Catpow.RadioButtons=(props)=>{
	const {useMemo}=wp.element;
	const {value,onChange}=props;
	
	const options=useMemo(()=>{
		if(Array.isArray(props.options)){
			return props.options.map((option)=>{
				if(typeof option === 'object'){return option;}
				return {label:option,value:option};
			});
		}
		return Object.keys(props.options).map((label)=>{
			return {label,value:props.options[label]};
		});
	},[props.options]);
	
	return (
		<div className={"RadioButtons"}>
			{options.map((option)=>{
				const selected=option.value===value;
				return (
					<div className={"RadioButton"+(selected?' selected':'')} onClick={(e)=>{onChange(option.value);}}>
						<div className={"RadioButtonIcon"+(selected?' selected':'')} > </div>
						{option.label}
					</div>
				);
			})}
		</div>
	);
}