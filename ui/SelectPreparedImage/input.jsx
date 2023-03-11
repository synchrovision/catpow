/*
絞り込み選択のUI

*/
Catpow.UI.SelectPreparedImage=(props)=>{
	const {setURLparams}=Catpow.util;
	const {useState,useMemo,useEffect}=wp.element;
	const {name,color='i',valueKey='url'}=props;
	const [value,setValue]=useState(props.value);
	const [images,setImages]=useState([]);
	const {bem}=Catpow.util;
	const classes=bem('SelectPreparedImage')
	const [isOpen,setIsOpen]=useState(false);
	
	useEffect(()=>{
		wp.apiFetch({path:'cp/v1/images/'+props.type}).then(setImages);
	},[setImages]);
	
	return (
		<div className={classes()}>
			<div className={classes.icon()}>
				<img
					className={classes.icon.img()}
					src={value}
					alt={'Selected Image'}
					onClick={()=>setIsOpen(!isOpen)}
				/>
			</div>
			<Catpow.Popover open={isOpen} onClose={()=>setIsOpen(false)}>
				<div className={classes.list()}>
					{images.map((image)=>{
						const url=setURLparams(image.url,{c:color});
						const thisValue=(valueKey==='url')?url:image[valueKey];
						return (
							<div className={classes.list.item({'is-active':value==thisValue})} key={thisValue}>
								<img
									className={classes.list.item.img()}
									src={url}
									alt={image.alt}
									onClick={()=>{setValue(thisValue)}}
								/>
							</div>
						);
					})}
				</div>
			</Catpow.Popover>
			<Catpow.UI.HiddenValues name={name} value={value}/>
		</div>
	);
}

