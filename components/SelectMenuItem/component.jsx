Catpow.SelectMenuItem=(props)=>{
	const {useCallback,useMemo,useState,useEffect}=wp.element;
	const {className='cp-selectmenuitem',value,onChange}=props;
	const {bem}=Catpow.util;
	const classes=useMemo(()=>bem(className),[]);
	const {cache}=Catpow.SelectMenuItem;
	
	const [options,setOptions]=useState(false);
	
	useEffect(()=>{
		if(undefined !== cache.menuItems){
			setOptions(cache.menuItems);
			return;
		}
		wp.apiFetch({path:"/cp/v1/menu/items"}).then((res)=>{
			console.log(res);
			cache.menuItems=res;
			setOptions(cache.menuItems);
		}).catch((e)=>{
			console.error(e);
		});
	},[setOptions]);
	
	if(options===false){return false;}
	
	return (
		<div className={classes()}>
			
		</div>
	);
}
Catpow.SelectMenuItem.cache={};