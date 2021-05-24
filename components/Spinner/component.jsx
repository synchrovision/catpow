Catpow.Spinner=(props)=>{
	const {type='circle'}=props;
	
	return (
		<div className={`Spinner Spinner-${type}`}>
			<div className="graphics">
				<div className="graphic graphic1"></div>
				<div className="graphic graphic2"></div>
				<div className="graphic graphic3"></div>
			</div>
		</div>
	);
}