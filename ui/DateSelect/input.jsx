Catpow.UI.DateSelect=(props)=>{
	const {min=false,max=false}=props;
	const {useState,useReducer,useMemo}=wp.element;
	const [open,setOpen]=useState(false);
	const minTime=min?Catpow.util.getDateObject(min).getTime():-Number.MAX_VALUE;
	const maxTime=max?Catpow.util.getDateObject(max).getTime():Number.MAX_VALUE;
	
	const d=Catpow.util.getDateObject(props.value,new Date());
	
	const [state,dispatch]=useReducer((state,action)=>{
		console.log(state,action);
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
				<input className="input year" type="number" size="4" value={state.year} onInput={(e)=>{dispatch({type:'update',year:e.currentTarget.value})}}/>
				<span className="unit">年</span>
				<input className="input month" type="number" size="2" value={state.month} onInput={(e)=>{dispatch({type:'update',month:e.currentTarget.value})}}/>
				<span className="unit">月</span>
				<input className="input date"  type="number" size="2" value={state.date} onInput={(e)=>{dispatch({type:'update',date:e.currentTarget.value})}}/>
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