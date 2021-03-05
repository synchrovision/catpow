/*
絞り込み選択のUI

*/
Catpow.UI.SelectPreparedImage=(props)=>{
	const {setURLparams}=Catpow.util;
	const {useState,useEffect}=wp.element;
	const {name,color='i'}=props;
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
					const url=setURLparams(image.url,{c:color,theme:cp.theme});
					return (
						<li className={'item '+((value==url)?'active':'')}>
							<img
								src={url}
								alt={image.alt}
								onClick={onClick}
							/>
						</li>
					);
				})}
			</ul>
			<Catpow.UI.HiddenValues name={name} value={value}/>
		</div>
	);
}

