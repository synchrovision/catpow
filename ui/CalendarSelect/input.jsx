Catpow.CalendarSelect=class extends wp.element.Component{
	constructor(props) {
		super(props);
		var date,min,minDate,max,maxDate,crr,i;
		
		if(props.value){date=new Date(props.value);}
		else if(props.default){date=new Date(props.default);}
		else{date=new Date();}
		if(props.min){min=new Date(props.min);}
		else{min=new Date(Date.now()-1000*3600*24*100);}
		if(props.max){max=new Date(props.max);}
		else{max=new Date(Date.now()+1000*3600*24*100);}
		
		minDate=min.getDate();
		maxDate=max.getDate();
		
		crr=new Date(date);
		crr.setDate(1);
		
		this.thead=(
			<thead>
				<tr>{"日,月,火,水,木,金,土".split(',').map((d)=>(
					<td>{d}</td>
				))}</tr>
			</thead>
		);
		
		this.state={date,min,minDate,max,maxDate,crr};
	}
	render(){
		var {date,min,minDate,max,maxDate,crr}=this.state;
		var crrHasActive,crrHasMin,crrHasMax,
			prevMonth,nextMonth,
			activeDate,startDay,lastDate,
			c,r,d,cells,rows;
		if(min>date){date=new Date(min);}
		else if(max<date){date=new Date(max);}
		else{date=new Date(date);}
		crr=new Date(crr);
		
		
		crrHasActive=crr.getFullYear()==date.getFullYear() && crr.getMonth()==date.getMonth();
		crrHasMin=crr.getFullYear()==min.getFullYear() && crr.getMonth()==min.getMonth();
		crrHasMax=crr.getFullYear()==max.getFullYear() && crr.getMonth()==max.getMonth();
		activeDate=date.getDate();
		
		const cell=(i)=>{
			if(i<1 || i>lastDate){return (<td></td>);}
			if((crrHasMin && i<minDate) || (crrHasMax && i>maxDate)){
				return (<td className="disable">{i}</td>);
			}
			return (
				<td
					className={(crrHasActive && i==activeDate)?'active':''}
					onClick={(e)=>{
						this.setState({date:new Date(crr.getFullYear(),crr.getMonth(),i)});
					}}
				>{i}</td>
			);
		};
		
		startDay=crr.getDay();
		crr.setMonth(crr.getMonth()-1);
		prevMonth=crr.getMonth()+1;
		crr.setMonth(crr.getMonth()+2);
		nextMonth=crr.getMonth()+1;
		crr.setDate(0);
		lastDate=crr.getDate();
		crr.setDate(1);
		
		rows=[];
		for(r=0;r<6;r++){
			cells=[];
			for(c=1;c<=7;c++){
				cells.push(cell(r*7+c-startDay));
			}
			rows.push(<tr>{cells}</tr>);
		}
		
		const goto=(i)=>{
			crr.setMonth(crr.getMonth()+i);
			this.setState({crr});
		}
		
		return (
			<div className={'CalendarSelect'}>
				<table>
					<caption>
						<div class="year">{crr.getFullYear()}<span className="unit">年</span></div>
						{!crrHasMin && <span class="prev" onClick={(e)=>{goto(-1)}}>{prevMonth}<span className="unit">月</span></span>}
						<span class="current">{crr.getMonth()+1}<span className="unit">月</span></span>
						{!crrHasMax && <span class="next" onClick={(e)=>{goto(1)}}>{nextMonth}<span className="unit">月</span></span>}
					</caption>
					{this.thead}
					<tbody>{rows}</tbody>
				</table>
				<Catpow.HiddenValues
					name={this.props.name}
					value={date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()}
				/>
			</div>
		);
	}
}