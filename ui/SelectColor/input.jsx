Catpow.SelectColor=(props)=>{
	const {useState,useEffect}=wp.element;
	const {name}=props;
	const [value,setValue]=useState(props.value);
	
	const color=value.substr(5) || 0;
	var items=Array.from(Array(13),(v,i)=>{
		var classes='fillColor'+i;
		if(color==i){classes+=' active';}
		return (
			<li className={classes} onClick={()=>{setValue('color'+i);}}> </li>
		);
	});;
	
	return (
		<div className="SelectColor">
			<ul>{items}</ul>
			<Catpow.HiddenValues name={name} value={value}/>
		</div>
	);
}