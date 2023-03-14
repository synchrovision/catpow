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
	const [search,setSearch]=useState('');
	
	useEffect(()=>{
		wp.apiFetch({path:'cp/v1/images/'+props.type}).then(setImages);
	},[setImages]);
	
	const filteredImages=useMemo(()=>images.filter((image)=>!search || image.url.indexOf(search)!==-1),[images,search]);
	
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
				<div className={classes.popover()}>
					<div className={classes.popover.search()}>
						<input
							type="text"
							className={classes.popover.search.input()}
							onChange={(e)=>setSearch(e.target.value)}
							value={search}
						/>
					</div>
					<div className={classes.popover.list()}>
						{filteredImages.map((image)=>{
							const url=setURLparams(image.url,{c:color});
							const thisValue=(valueKey==='url')?url:image[valueKey];
							return (
								<div className={classes.popover.list.item({'is-active':value==thisValue})} key={thisValue}>
									<img
										className={classes.popover.list.item.img()}
										src={url}
										alt={image.alt}
										onClick={()=>{setValue(thisValue)}}
									/>
								</div>
							);
						})}
					</div>
				</div>
			</Catpow.Popover>
			<Catpow.UI.HiddenValues name={name} value={value}/>
		</div>
	);
}

