import {CP} from './CP.jsx';

CP.SelectPreparedImageSet=({className,name,value,color,onChange,...otherProps})=>{
	let onClick;
	const {getURLparam,setURLparam,setURLparams,removeURLparam}=Catpow.util;
	const [state,dispatch]=wp.element.useReducer((state,action)=>{
		switch(action.type){
			case 'update':
				if(action.imagesets){
					state.imagesets=action.imagesets;
					const bareURL=removeURLparam(value,'c');
					for(const key in state.imagesets){
						if(state.imagesets[key].url===bareURL){
							state.imageset=state.imagesets[key];
							break;
						}
					}
				}
				if(action.imageset){state.imageset=action.imageset;}
				if(state.imageset){
					onChange(state.imageset.map((item)=>{
						return {...item,url:setURLparams(item.url,{c:color,theme:wpinfo.theme})};
					}));
				}
		}
		return {...state};
	},{page:0,imagesets:null,imageset:null});

	CP.cache.PreparedImageSets=CP.cache.PreparedImageSets || {};

	if(state.imagesets===null){
		if(CP.cache.PreparedImageSets[name]){
			dispatch({type:'update',imagesets:CP.cache.PreparedImageSets[name]});
		}
		else{
			wp.apiFetch({path:'cp/v1/imageset/'+name}).then((imagesets)=>{
				CP.cache.PreparedImageSets[name]=imagesets;
				dispatch({type:'update',imagesets});
			});
		}
		return false;
	}
	return (
		<ul className={'selectPreparedImageSet '+name+' '+className} {...otherProps}>
			{Object.keys(state.imagesets).map((key)=>{
				const imageset=state.imagesets[key];
				const url=setURLparams(imageset[0].url,{c:color,theme:wpinfo.theme});
				return (
					<li className={'item '+((value==url)?'active':'')} key={key}>
						<img
							src={url}
							alt={imageset[0].alt}
							onClick={()=>dispatch({type:'update',imageset})}
						/>
					</li>
				);
			})}
		</ul>
	);
};