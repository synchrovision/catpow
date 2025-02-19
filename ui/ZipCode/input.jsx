Catpow.UI.ZipCode=(props)=>{
	const {useState,useCallback,useReducer,useMemo,useEffect,useRef}=wp.element;
	const [isComposing,setIsComposing]=useState(false);
	const ref0=useRef(),ref1=useRef();
	const refs=useMemo(()=>[ref0,ref1],[ref0,ref1]);

	const reducer=useCallback((state,action)=>{
		const secs=[...state.secs];
		if(!action.value.match(/^\d+$/)){action.value='';}
		if(action.value.length===7){
			secs[0]=action.value.substring(0,3);
			secs[1]=action.value.substring(3);
		}
		else{
			secs[action.index]=action.value;
		}
		return {value:secs.join('-'),secs};
	},[]);
	const [state,update]=useReducer(reducer,{
		value:props.value,
		secs:props.value.split('-').slice(0,2)
	});
	
	useEffect(()=>{
		if('AjaxZip3' in window){
			AjaxZip3.zip2addr(ref0.current,ref1.current,props.pref,props.addr);
		}
	},[state.value]);
	useEffect(()=>{
		if(state.secs[0].length>2 && !isComposing){
			ref1.current.focus();
		}
	},[state.secs[0].length,isComposing]);

	const Input=useCallback((props)=>{
		const {index,value}=props;
		return (
			<input
				type="text"
				size={["3","4"][index]}
				className={"sec"+index}
				onChange={(e)=>{
					update({index,value:e.target.value});
				}}
				onCompositionStart={(e)=>{
					setIsComposing(true);
				}}
				onCompositionEnd={(e)=>{
					setIsComposing(false);
					update({index,value:e.target.value});
				}}
				ref={refs[index]}
				value={value}
			/>
		);
	},[update,refs]);

	return (
		<div className={'cpui-zipcode'}>
			<Input index={0} value={state.secs[0]}/>
			<span className="sep">-</span>
			<Input index={1} value={state.secs[1]}/>

			<Catpow.UI.HiddenValues
				name={props.name}
				value={state.value}
			/>
		</div>
	);
}