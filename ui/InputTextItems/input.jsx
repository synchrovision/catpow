Catpow.UI.InputTextItems=(props)=>{
	const {name,defaultLabel,options,multiple=false}=props;
	const {useState}=wp.element;
	const [value,setValue]=useState(props.value);
	return (
		<>
			<Catpow.InputTextItems
				items={value}
				onChange={setValue}
			/>
			<Catpow.UI.HiddenValues name={name} value={value}/>
		</>
	);
}