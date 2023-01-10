import {CP} from './CP.jsx';

CP.SelectPreparedImage=({className,name,value,color,onChange,...otherProps})=>{
	let onClick;
	const {getURLparam,setURLparam,setURLparams,removeURLparam}=Catpow.util;
	const [state,dispatch]=wp.element.useReducer((state,action)=>{
		switch(action.type){
			case 'nextPage':state.page--;break;
			case 'prevPage':state.page++;break;
			case 'gotoPage':state.page=action.page;break;
			case 'update':
				if(action.images){
					state.images=action.images;
					const bareURL=removeURLparam(value,'c');
					state.image=state.images.find((image)=>image.url===bareURL);
				}
				if(action.image){state.image=action.image;}
				onChange({...state.image,url:setURLparams(state.image?state.image.url:value,{c:color,theme:wpinfo.theme})});
		}
		return {...state};
	},{page:0,images:null,image:null});

	CP.cache.PreparedImage=CP.cache.PreparedImage || {};

	if(state.images===null){
		if(CP.cache.PreparedImage[name]){
			dispatch({type:'update',images:CP.cache.PreparedImage[name]});
		}
		else{
			wp.apiFetch({path:'cp/v1/images/'+name}).then((images)=>{
				CP.cache.PreparedImage[name]=images;
				dispatch({type:'update',images});
			});
		}
		return false;
	}
	return (
		<ul className={'selectPreparedImage '+name+' '+className} {...otherProps}>
			{state.images.map((image)=>{
				const url=setURLparams(image.url,{c:color,theme:wpinfo.theme});
				return (
					<li className={'item '+((value==url)?'active':'')} key={image.url}>
						<img
							src={url}
							alt={image.alt}
							onClick={()=>dispatch({type:'update',image})}
						/>
					</li>
				);
			})}
		</ul>
	);
};