Catpow.RadioButtons=(props)=>{
	const {className="RadioButtons",useState,useMemo}=wp.element;
	const {onChange}=props;
	const {bem}=Catpow.util;
	const classes=useMemo(()=>bem(className),[]);
	
	const [value,setValue]=useState(props.value??null);
	
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
			{options.map((option)=>{
				const selected=option.value===value;
				return (
					<div
						className={classes.button({'is-selected':selected})}
						onClick={(e)=>{
							setValue(option.value);
							onChange(option.value);
						}}
						role="checkbox"
						aria-checked={selected}
						key={option.label}
					>
						<div className={classes.button.icon({'is-selected':selected})} > </div>
						{option.label}
					</div>
				);
			})}
		</div>
	);
}