Catpow.UI.TextItems=(props)=>{
	const {name,defaultLabel,datalist,multiple=false}=props;
	const {useState}=wp.element;
	const [value,setValue]=useState(props.value);
	return (
		<>
			<Catpow.InputTextItems
				items={value}
				datalist={datalist}
				onChange={setValue}
			/>
			<Catpow.UI.HiddenValues name={name} value={value}/>
		</>
	);
}