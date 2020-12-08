const app=(props)=>{
	const {Finder}=Catpow;
	const {SelectLayout}=Finder;
	return (
		<Finder {...props}>
			<SelectLayout/>
		</Finder>
	);
};