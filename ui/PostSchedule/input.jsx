Catpow.UI.PostSchedule=(props)=>{
	const {Fragment,useCallback,useMemo,useState,useReducer}=wp.element;
	const {RadioButtons,CheckBoxes,CheckBox,SelectNumber}=Catpow;
    const {statuses=['publish','private','draft','trash']}=props;
	const {__}=wp.i18n;
    const [usePostSchedule,setUsePostSchedule]=useState(!!props.value);
    
	const reducer=useCallback((state,action)=>{
		switch(action.type){
			case 'SAVE':{
                if(!state.value.status){state.value.status='trash';}
				return {...state};
			}
		}
		return state;
	},[]);
	const [state,dispatch]=useReducer(reducer,{
		value:props.value || {status:'trash',time:Math.floor(Date.now()/(24*3600*1000)+3)*24*3600}
	});
	const save=useCallback((key,value,result)=>{
		dispatch({type:'SAVE'});
	},[dispatch]);
    
	return (
		<div className={'cpui-postschedule'}>
			<div className="PostSchedule__contents">
				<Catpow.CheckBox selected={usePostSchedule} onChange={()=>setUsePostSchedule(!usePostSchedule)}/>
				{usePostSchedule && (
					<Fragment>
						<Catpow.InputDateTime value={state.value.time*1000} onChange={(time)=>{state.value.time=Math.floor(time/1000);save();}}/>
						<Catpow.SelectBox options={statuses} value={state.value.status || 'trash'} onChange={(status)=>{state.value.status=status;save();}}/>
						{state.value && <Catpow.UI.HiddenValues
							name={props.name}
							value={state.value}
						/>}
					</Fragment>
				)}
			</div>
		</div>
	);
}