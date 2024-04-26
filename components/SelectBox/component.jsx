Catpow.SelectBox=(props)=>{
	const {useMemo}=wp.element;
	const {className="SelectBox",label,value,onChange}=props;
	const {bem}=Catpow.util;
	const classes=useMemo(()=>bem(className),[]);
	
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
		<div className={classes()}>
			<select className={classes.select()} value={value} onChange={(e)=>onChange(event.target.value)}>
				{label && <option value={false}>{label}</option>}
				{options.map((option)=><option value={option.value} key={option.label}>{option.label}</option>)}
			</select>
		</div>
	);
}