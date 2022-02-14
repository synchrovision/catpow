Catpow.Buttons=(props)=>{
	const {className="medium"}=props;
	const {useMemo}=wp.element;
	if(props.children){
		return (
			<div className={"Buttons "+className}>
				{props.children}
			</div>
		);
	}
	const {onClick}=props;
	const options=useMemo(()=>{
		if(Array.isArray(props.options)){
			return props.options.map((option)=>{
				if(typeof option === 'object'){return option;}
				const [label,className]=(option+':').split(':');
				return {label,className,value:label};
			});
		}
		return Object.keys(props.options).map((key)=>{
			const [label,className]=(key+':').split(':');
			return {label,className,value:props.options[key]};
		});
	},[props.options]);
	return (
		<div className={"Buttons "+className}>
			{options.map((option,index)=><Catpow.Button onClick={onClick} {...option} key={index}/>)}
		</div>
	);
}
Catpow.Button=(props)=>{
	const {className="secondary",label,value,onClick}=props;
	const disabled=props.disabled || className.split(' ').indexOf('disabled')!==-1;
	
	return (
		<button className={"Button "+className} onClick={()=>{!props.disabled && onClick(value)}} disabled={props.disabled}>
			<div className={"ButtonIcon"}> </div>
			{label}
		</button>
	);
}