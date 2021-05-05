Catpow.SelectBox=(props)=>{
	const {label,value,options,onChange}=props;
	
	return (
		<select className={"SelectBox"} value={value} onChange={(e)=>onChange(event.target.value)}>
			{label && (
				<option value={false}>{label}</option>
			)}
			{typeof options === 'object' && (Array.isArray(options)?(
				options.map((val)=><option value={val}>{val}</option>)
			):(
				Object.keys(options).map((label)=><option value={options[label]}>{label}</option>)
			))}
		</select>
	);
}