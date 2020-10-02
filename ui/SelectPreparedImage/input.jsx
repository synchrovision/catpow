/*
絞り込み選択のUI

*/
Catpow.SelectPreparedImage=(props)=>{
	const {useState,useEffect}=wp.element;
	const {name}=props;
	const [value,setValue]=useState(props.value);
	const [images,setImages]=useState([]);
	useEffect(()=>{
		wp.apiFetch({path:'cp/v1/images/'+props.type}).then(setImages);
	},[setImages]);
	
	const onClick=(e)=>setValue(e.currentTarget.src);
	return (
		<div className="SelectPreparedImage">
			<ul>
				{images.map((image)=>{
					return (
						<li className={'item '+((value==image.url)?'active':'')}>
							<img
								src={image.url}
								alt={image.alt}
								onClick={onClick}
							/>
						</li>
					);
				})}
			</ul>
			<Catpow.HiddenValues name={name} value={value}/>
		</div>
	);
}

