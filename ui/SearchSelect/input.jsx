/*
絞り込み選択のUI

*/
Catpow.UI.SearchSelect=(props)=>{
	const {name,defaultLabel,options,multiple=false}=props;
	const {useState}=wp.element;
	const [value,setValue]=useState(props.value);
	return (
		<>
			<Catpow.SearchSelect
				options={options}
				value={value}
				multiple={multiple}
				onChange={setValue}
				defaultLabel={defaultLabel}
			/>
			<Catpow.UI.HiddenValues name={name} value={value}/>
		</>
	);
}