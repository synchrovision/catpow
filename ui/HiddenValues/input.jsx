Catpow.UI.HiddenValues=(props)=>{
	const {useCallback}=wp.element;
	const hiddenInput=useCallback((name,val)=>{
		if(val instanceof Object){
			return Object.keys(val).map(k=>hiddenInput(name+'['+k+']',val[k]));
		}
		else{
			return <input type="hidden" name={name} value={val} key={name}/>;
		}
	},[props]);
	return (
		<div className={'cpui-hiddenvalues'} style={{display:"none"}}>
			{hiddenInput(props.name,props.value)}
		</div>
	);
}
