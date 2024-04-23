Catpow.SelectPreparedImage=(props)=>{
	const {className='SelectPreparedImage',name,value,color,onChange,...otherProps}=props;
	const {useState,useEffect,useReducer,useMemo}=wp.element;
	const {getURLparam,setURLparam,setURLparams,removeURLparam,bem}=Catpow.util;
	const classes=useMemo(()=>bem(className),[]);
	
	const [open,setOpen]=useState(false);
	
	const [state,dispatch]=useReducer((state,action)=>{
		const newState={...state};
		switch(action.type){
			case 'nextPage':newState.page--;break;
			case 'prevPage':newState.page++;break;
			case 'gotoPage':newState.page=action.page;break;
			case 'update':
				if(action.images){
					newState.images=action.images;
					newState.image=action.images.find((image)=>image.url===value);
				}
				if(action.image){newState.image=action.image;}
		}
		return newState;
	},{page:0,images:null,image:null});
	
	const cache=useMemo(()=>{
		if(Catpow.SelectPreparedImage.cache==null){
			Catpow.SelectPreparedImage.cache={};
		}
		return Catpow.SelectPreparedImage.cache;
	},[]);

	useEffect(()=>{
		if(state.images===null){
			if(cache[name]){
				dispatch({type:'update',images:cache[name]});
			}
			else{
				wp.apiFetch({path:'cp/v1/images/'+name}).then((images)=>{
					cache[name]=images;
					dispatch({type:'update',images});
				});
			}
			
		}
	},[state.images]);
	useEffect(()=>{
		if(state.image!=null && state.image.url!==value){
			console.log(state.image.url);
			onChange(state.image.url);
		}
	},[state.image]);
	
	if(state.images===null){return false;}
	return (
		<div className={classes('is-'+name,open?'is-open':'is-close')} {...otherProps}>
			<img className={classes._img()} src={value} alt="" width="40" height="40" onClick={()=>setOpen(true)}/>
			<Catpow.Popover open={open} onClose={()=>setOpen(false)}>
				<ul className={classes.items()}>
					{state.images.map((image)=>{
						return (
							<li className={classes.items.item({'is-active':value==image.url})} key={image.url}>
								<img
									className={classes.items.item._img()}
									src={image.url}
									alt={image.alt}
									onClick={()=>dispatch({type:'update',image})}
								/>
							</li>
						);
					})}
				</ul>
			</Catpow.Popover>
		</div>
	);
};