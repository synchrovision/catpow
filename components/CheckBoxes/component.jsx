Catpow.CheckBoxes=(props)=>{
	const {useMemo}=wp.element;
	const {value=[],onChange}=props;
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
		const flags={};
		value.map((val)=>flags[val]=true);
		return (
			<div className={"CheckBoxes"}>
				{options.map((option)=>(
					<CheckBox
						label={option.label}
						onChange={(selected)=>{
							if(selected){flags[option.value]=true;}
							else{delete flags[option.value];}
							onChange(Object.keys(flags));
						}}
						selected={flags[option.value]}
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