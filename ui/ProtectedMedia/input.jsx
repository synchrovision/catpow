Catpow.UI.ProtectedMedia=(props)=>{
	const {SelectMedia}=Catpow;
	const {useState,useCallback}=wp.element;
	const [value,setValue]=useState(props.value);
	
	return (
		<div className={'ProtectedMedia'}>
			<SelectMedia
				src={value.url || props.default.url}
				mime={value.mime || props.default.mime}
				onChange={(media)=>{
					setValue({
						...value,
						id:media.id,
						url:media.url,
						mime:media.mime,
					});
				}}
			/>
			<Catpow.UI.HiddenValues
				name={props.name}
				value={value}
			/>
		</div>
	);
}