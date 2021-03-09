Catpow.UI.DateSelect=(props)=>{
	const {min=false,max=false}=props;
	const {useState,useReducer,useMemo}=wp.element;
	const [open,setOpen]=useState(false);
	const minDate=Catpow.util.getDateObject(min || '-5 month');
	const maxDate=Catpow.util.getDateObject(max || '+5 month');
	const minTime=minDate.getTime();
	const maxTime=maxDate.getTime();
	
	const d=Catpow.util.getDateObject(props.value,new Date());
	
	const [state,dispatch]=useReducer((state,action)=>{
		switch(action.type){
			case 'update':
				const d=action.value?(
					Catpow.util.getDateObject(action.value)
				):(
					new Date(
						action.year || state.year,
						(action.month || state.month)-1,
						action.date || state.date,
					)
				);
				const t=d.getTime();
				if(t<minTime){d.setTime(minTime);}
				if(t>maxTime){d.setTime(maxTime);}
				
				return {
					value:Catpow.util.getDateValue(d),
					year:d.getFullYear(),
					month:d.getMonth()+1,
					date:d.getDate()
				};
		}
		return state;
	},{
		value:props.value,
		year:d.getFullYear(),
		month:d.getMonth()+1,
		date:d.getDate()
	});
	
	return (
		<div className='DateSelect'>
			<div className="inputs">
				<Catpow.SelectNumber min={minDate.getFullYear()} max={maxDate.getFullYear()} value={state.year} onChange={(year)=>{dispatch({type:'update',year})}}/>
				<span className="unit">年</span>
				<Catpow.SelectNumber min={1} max={12} value={state.month} onChange={(month)=>{dispatch({type:'update',month})}}/>
				<span className="unit">月</span>
				<Catpow.SelectNumber min={1} max={31} value={state.date} onChange={(date)=>{dispatch({type:'update',date})}}/>
				<span className="unit">日</span>
				<span className="btn calendar" onClick={()=>setOpen(true)}></span>
			</div>
			<Catpow.Popup open={open} onClose={()=>setOpen(false)} closeButton={true}>
				<Catpow.Calendar
					className='medium'
					year={state.year}
					month={state.month}
					showControl={true}
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