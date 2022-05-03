/*
絞り込み選択のUI

*/
Catpow.UI.SelectPreparedImage=(props)=>{
	const {setURLparams}=Catpow.util;
	const {useState,useEffect}=wp.element;
	const {name,color='i',valueKey='url'}=props;
	const [value,setValue]=useState(props.value);
	const [images,setImages]=useState([]);
	useEffect(()=>{
		wp.apiFetch({path:'cp/v1/images/'+props.type}).then(setImages);
	},[setImages]);
	
	return (
		<div className="SelectPreparedImage">
			<ul>
				{images.map((image)=>{
					const url=setURLparams(image.url,{c:color,theme:cp.theme});
					const thisValue=(valueKey==='url')?url:image[valueKey];
					return (
						<li className={'item '+((value==thisValue)?'active':'')} key={thisValue}>
							<img
								src={url}
								alt={image.alt}
								onClick={()=>{setValue(thisValue)}}
							/>
						</li>
					);
				})}
			</ul>
			<Catpow.UI.HiddenValues name={name} value={value}/>
		</div>
	);
}

