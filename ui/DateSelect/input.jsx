Catpow.UI.DateSelect=(props)=>{
	const {useState,useReducer,useMemo,useCallback,useEffect}=wp.element;
	const [open,setOpen]=useState(false);
	
	const now=useMemo(()=>Catpow.util.getDateObject('now'));
	const reducer=useCallback((state,action)=>{
		switch(action.type){
			case 'init':{
				state.min=Catpow.util.getDateObject(props.min || '-80 year');
				state.max=Catpow.util.getDateObject(props.max || '+1 year');
				state.minTime=state.min.getTime();
				state.maxTime=state.max.getTime();
				state.minYear=state.min.getFullYear();
				state.maxYear=state.max.getFullYear();
				action.value=props.value;
			}
			case 'update':{
				const d=action.value?(
					Catpow.util.getDateObject(action.value)
				):(
					new Date(
						action.year || state.year || now.getFullYear(),
						(action.month || state.month || now.getMonth()+1)-1,
						action.date || state.date || now.getDate()
					)
				);
				if(isNaN(d.getTime())){
				   state.value=state.year=state.month=state.date=undefined;
					return {...state};
				}
				const t=d.getTime();
				if(t<state.minTime){d.setTime(state.minTime);}
				if(t>state.maxTime){d.setTime(state.maxTime);}
				state.value=Catpow.util.getDateValue(d);
				state.year=d.getFullYear();
				state.month=d.getMonth()+1;
				state.date=d.getDate();
				
				if(d.getFullYear()===state.minYear){
					state.minMonth=state.min.getMonth()+1;
					if(d.getMonth()===state.minMonth-1){
						state.minDate=state.min.getDate();
					}
					else{
						state.minDate=1;
					}
				}
				else{
					state.minMonth=1;
					state.minDate=1;
				}
				if(d.getFullYear()===state.maxYear){
					state.maxMonth=state.max.getMonth()+1;
					if(d.getMonth()===state.maxMonth-1){
						state.maxDate=state.max.getDate();
					}
					else{
						state.maxDate=(new Date(d.getFullYear(),d.getMonth()+1,0)).getDate();
					}
				}
				else{
					state.maxMonth=12;
					state.maxDate=(new Date(d.getFullYear(),d.getMonth()+1,0)).getDate();
				}
				return {...state};
			}
		}
		return state;
	},[]);
	const [state,dispatch]=useReducer(reducer,{});
	useEffect(()=>dispatch({type:'init'}),[]);
	
	return (
		<div className='DateSelect'>
			<div className="inputs">
				<Catpow.SelectNumber label="---" min={state.minYear} max={state.maxYear} value={state.year} onChange={(year)=>{dispatch({type:'update',year})}}/>
				<span className="unit">年</span>
				<Catpow.SelectNumber label="---" min={state.minMonth} max={state.maxMonth} value={state.month} onChange={(month)=>{dispatch({type:'update',month})}}/>
				<span className="unit">月</span>
				<Catpow.SelectNumber label="---" min={state.minDate} max={state.maxDate} value={state.date} onChange={(date)=>{dispatch({type:'update',date})}}/>
				<span className="unit">日</span>
				<span className="btn calendar" onClick={()=>setOpen(true)}></span>
			</div>
			<Catpow.Popup open={open} onClose={()=>setOpen(false)} closeButton={true}>
				<Catpow.Calendar
					className='medium'
					year={state.year || now.getFullYear()}
					month={state.month || now.getMonth()+1}
					showControl={true}
					min={props.min}
					max={props.max}
					values={
						state.value?{[state.value]:true}:{}
					}
					onSelect={(value)=>{
						setOpen(false);
						dispatch({type:'update',value})
					}}
				/>
			</Catpow.Popup>
			{state.value &&
				<Catpow.UI.HiddenValues
					name={props.name}
					value={state.value}
				/>
			}
		</div>
	);
}