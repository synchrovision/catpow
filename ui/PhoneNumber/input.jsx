Catpow.UI.PhoneNumber=(props)=>{
	const {useState,useMemo,useRef,useCallback,useReducer}=wp.element;
	
	const init=useCallback((state)=>{
		const {value}=state;
		const secs=[];
		return {value,secs:value.split('-'),isComposing:false};
	},[]);
	const reducer=useCallback((state,action)=>{
		switch(action.type){
			case 'SET_SEC':{
				const {i,val}=action;
				if(!val.match(/^\d*$/)){return state;}
				const secs=state.value.split('-');
				if(val.length===10){
					secs[0]=val.substring(0,2);
					secs[1]=val.substring(2,6);
					secs[2]=val.substring(6);
				}
				else if(val.length===11){
					secs[0]=val.substring(0,3);
					secs[1]=val.substring(3,7);
					secs[2]=val.substring(7);
				}
				else{
					secs[i]=val;
					if((val.length>3 && i<2) || (i==0 && val.match(/^0\d0$/))){
						if(!state.isComposing){
							refs[i+1].current.focus();
						}
					}
				}
				return {...state,secs,value:secs.join('-')};
			}
			case 'START_COMPOSE':return {...state,isComposing:true};
			case 'END_COMPOSE':return {...state,isComposing:false};
		}
		return state;
	},[]);
	const [state,dispatch]=useReducer(reducer,{value:props.value},init);
	const Input=useCallback(({i,refs,state,dispatch})=>(
		<input
			type="text"
			className={"sec"+i}
			size="4"
			autoComplete={['tel-area-code','tel-local-prefix','tel-local-suffix'][i]}
			onChange={(e)=>{
				const val=e.target.value;
				dispatch({type:'SET_SEC',i,val});
			}}
			onCompositionStart={(e)=>{
				dispatch({type:'START_COMPOSE'});
			}}
			onCompositionEnd={(e)=>{
				const val=e.target.value;
				dispatch({type:'SET_SEC',i,val});
				dispatch({type:'END_COMPOSE'});
			}}
			ref={refs[i]}
			value={state.secs[i]}
		/>
	),[]);
	const refs=[useRef({}),useRef({}),useRef({})];
	
	return (
		<div className={'PhoneNumber'}>
			<Input i={0} refs={refs} state={state} dispatch={dispatch}/>
			<span className="sep">-</span>
			<Input i={1} refs={refs} state={state} dispatch={dispatch}/>
			<span className="sep">-</span>
			<Input i={2} refs={refs} state={state} dispatch={dispatch}/>

			<Catpow.UI.HiddenValues
				name={props.name}
				value={state.value}
			/>
		</div>
	);
}