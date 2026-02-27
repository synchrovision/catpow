Catpow.UI.SelectColor = (props) => {
	const { useState } = wp.element;
	const { name } = props;
	const [value, setValue] = useState(props.value);

	return (
		<>
			<Catpow.SelectColorToneClass selected={value} onChange={(proxy) => setValue(proxy.classes.split(" "))} />
			<Catpow.UI.HiddenValues name={name} value={value} />
		</>
	);
};
