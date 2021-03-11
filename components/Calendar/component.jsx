Catpow.Calendar=(props)=>{
	const {Fragment}=wp.element;
	const {useState,useCallback,useEffect,useReducer,useMemo}=wp.element;
	const {className='medium',min=null,max=null,values,onSelect,showYear=true,showMonth=true,showControl=false}=props;
	
	const minTime=min?Catpow.util.getDateObject(min).getTime():Number.MIN_VALUE;
	const maxTime=max?Catpow.util.getDateObject(max).getTime():Number.MAX_VALUE;
	
	const thead=useMemo(()=>(
		<thead>
			<tr>
				{"日,月,火,水,木,金,土".split(',').map((d)=>(
					<td>{d}</td>
				))}
			</tr>
		</thead>
	),[props]);
	const weekDays=['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
	const [state,dispatch]=useReducer((state,action)=>{
		switch(action.type){
			case 'goto':
				return {
					year:action.year,
					month:action.month
				};
			case 'reset':
				return {
					year:props.year,
					month:props.month
				};
			case 'prevYear':
				return {
					year:state.year-1,
					month:state.month
				};
			case 'nextYear':
				return {
					year:state.year+1,
					month:state.month
				};
			case 'prev10Year':
				return {
					year:state.year-10,
					month:state.month
				};
			case 'next10Year':
				return {
					year:state.year+10,
					month:state.month
				};
			case 'prevMonth':
				var d=new Date(
					state.year,
					state.month-2
				);
				return {
					year:d.getFullYear(),
					month:d.getMonth()+1
				};
			case 'nextMonth':
				var d=new Date(
					state.year,
					state.month
				);
				return {
					year:d.getFullYear(),
					month:d.getMonth()+1
				};
		}
	},{
		year:props.year,
		month:props.month
	});
	const weeks=useMemo(()=>{
		var r,c,d,dateObject,weeks=[],days;
		const msOfDay=86400000;
		const firstDay=new Date(state.year,state.month-1,1);
		const lastDay=new Date(state.year,state.month,0);
		var d=-firstDay.getDay()+1;
		for(var r=0;r<6;r++){
			days=[];
			for(c=1;c<=7;c++){
				dateObject=new Date(state.year,state.month-1,d);
				days.push({
					dateObject,
					value:Catpow.util.getDateValue(dateObject),
					inMonth:dateObject.getMonth()==state.month-1
				});
				d++;
			}
			weeks.push({days});
		}
		return weeks;
	},[state.year,state.month]);
	useEffect(()=>{
		dispatch({
			type:'goto',
			year:props.year,
			month:props.month
		});
	},[props.year,props.month]);

	return (
		<div className={'Calendar '+className}>
			<table>
				<caption onDoubleClick={()=>dispatch({type:'reset'})}>
					{showYear && (
						<div className="year">
							{showControl && (
								<Fragment>
									<span className="btn prev10" onClick={()=>dispatch({type:'prev10Year'})}></span>
									<span className="btn prev" onClick={()=>dispatch({type:'prevYear'})}></span>
								</Fragment>
							)}
							<span class="current">{state.year}</span>
							{showControl && (
								<Fragment>
									<span className="btn next" onClick={()=>dispatch({type:'nextYear'})}></span>
									<span className="btn next10" onClick={()=>dispatch({type:'next10Year'})}></span>
								</Fragment>
							)}
						</div>
					)}
					{showMonth && (
						<div className="month">
							{showControl && (
								<span className="btn prev" onClick={()=>dispatch({type:'prevMonth'})}></span>
							)}
							<span class="current">{state.month}</span>
							{showControl && (
								<span className="btn next" onClick={()=>dispatch({type:'nextMonth'})}></span>
							)}
						</div>
					)}
				</caption>
				{thead}
				<tbody>
				{weeks.map((week)=>{
					return (
						<tr className="week">
							{week.days.map((day,i)=>{
								const t=day.dateObject.getTime();
								const value=values[day.value]?values[day.value]:null;
								const inRange=(t>=minTime && t<=maxTime);
								let classes='day';
								classes+=' '+weekDays[i];
								classes+=day.inMonth?' inMonth':' outMonth';
								classes+=inRange?'':' disabled';
								if(value){
									if(typeof value == 'object'){
										if('classes' in value){classes+=value.classes;}
									}
									else{
										if(value){classes+=' active';}
									}
								}
								return (
									<td
										className={classes}
										onClick={()=>{
											if(inRange){onSelect(day.value,{day,value});}
										}}
									>
										<span class="date">{day.dateObject.getDate()}</span>
										{value && value.content && (
											<div className="content">{value.content}</div>
										)}
									</td>
								);
							})}
						</tr>
					);
				})}
				</tbody>
			</table>
		</div>
	);
}