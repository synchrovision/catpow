Catpow.ModalFormContext=wp.element.createContext({});

Catpow.ModalForm=(props)=>{
	const {useCallback,useReducer}=wp.element;
	const {className,children,onComplete}=props;
	
	const reducer=useCallback((state,action)=>{
		switch(action.type){
			case 'update':
				return {...state,...(action.data || {})};
			case 'setValue':{
				const values={...state.values,[action.name]:action.value};
				return {...state,values};
			}
			case 'complete':{
				const values={...state.values,[action.name]:action.value};
				return {...state,values,open:false};
			}
		}
	},[]);
	
	const [state,dispatch]=useReducer(reducer,{open:true,values:{}});
	
	return (
		<Catpow.Popup open={state.open} closeOnClickAway={false} onClosed={()=>onComplete(state.values)}>
			<Catpow.ModalFormContext.Provider value={{state,dispatch}}>
				<div className={"ModalForm"}>
					{children}
				</div>
			</Catpow.ModalFormContext.Provider>
		</Catpow.Popup>
	);
}
Catpow.ModalForm.Input=(props)=>{
	const {useCallback,useContext}=wp.element;
	const {type='CheckBox',name='accept',children,...otherProps}=props;
	const {state,dispatch}=useContext(Catpow.ModalFormContext);
	
	const InputComponent=Catpow[type];
	
	const onChange=props.onChange || useCallback(({state,dispatch,name,value})=>{
		dispatch({type:'setValue',name,value});
	});
	
	return (
		<InputComponent value={state.values[name]} onChange={(value)=>onChange({state,dispatch,name,value})} {...otherProps}>{children}</InputComponent>
	);
}
Catpow.ModalForm.Button=(props)=>{
	const {__}=wp.i18n;
	const {useCallback,useContext}=wp.element;
	const {className='button',name='',value='',label=__('送信','catpow')}=props;
	const {state,dispatch}=useContext(Catpow.ModalFormContext);
	
	const onClick=props.onClick || useCallback(({state,dispatch,name,value})=>{
		dispatch({type:'complete',name,value});
	});
	
	return (
		<button className={className} onClick={()=>{onClick({state,dispatch,name,value})}}>{label}</button>
	);
}