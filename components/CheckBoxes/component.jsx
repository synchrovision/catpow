Catpow.CheckBoxes=(props)=>{
	const {useMemo}=wp.element;
	const {value,onChange}=props;
	const {CheckBox}=Catpow;
	
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
	
	if(Array.isArray(value)){
		return (
			<div className={"CheckBoxes"}>
				{options.map((option)=>(
					<CheckBox
						label={option.label}
						onChange={(selected)=>{
							onChange(
								option.value,selected,
								selected?
								value.concat(value,[option.value]):
								value.filter((val)=>val!==option.value)
							)
						}}
						selected={value.indexOf(option.value)!==-1}
					/>
				))}
			</div>
		);
	}
	
	return (
		<div className={"CheckBoxes"}>
			{options.map((option)=>(
				<CheckBox
					label={option.label}
					onChange={(selected)=>{
						value[option.value]=selected;
						onChange(option.value,selected,value)
					}}
					selected={value[option.value]}
				/>
			))}
		</div>
	);
}