Catpow.DateSelect=class extends wp.element.Component{
	constructor(props) {
		super(props);
		var date,min,max,selections,i;
		
		if(props.value){
			var dateArr=props.value.split('-');
			dateArr[1]--;
			date=new Date(dateArr[0],dateArr[1],dateArr[2]);
		}
		else if(props.default){date=new Date(props.default);}
		else{date=false;}
		if(props.min){min=new Date(props.min);}
		else{min=new Date(Date.now()-1000*3600*24*100);}
		if(props.max){max=new Date(props.max);}
		else{max=new Date(Date.now()+1000*3600*24*100);}
		
		selections={
			year:[],
			month:[],
			date:[]
		}
		for(i=min.getFullYear();i<=max.getFullYear();i++){
			selections.year.push(i);
		}
		for(i=1;i<=12;i++){
			selections.month.push(i);
		}
		for(i=1;i<=31;i++){
			selections.date.push(i);
		}
		this.state={date,selections,min,max};
	}
	render(){
		var {date,min,max}=this.state;
		if(date!==false){
			if(min>date){date=new Date(min);}
			else if(max<date){date=new Date(max);}
			else{date=new Date(date);}
		}
		
		const nameInFunction={
			Y:'FullYear',
			m:'Month',
			d:'Date',
			w:'Day'
		};
		const setDate=(key,val)=>{
			if(val==-1){
				date=false;
			}
			else{
				if(date===false){date=new Date();}
				val=parseInt(val);
				if(key==='m'){val--;}
				date['set'+nameInFunction[key]](val);
			}
			this.setState({date});
		};
		const getDate=(key)=>{
			if(date===false){return '−';}
			var val=date['get'+nameInFunction[key]]();
			if(key==='m'){val++}
			return val;
		};
		
		return (
			<div className={'DateSelect'}>
				<div class="value year" onClick={()=>{this.setState({yearSelecting:true})}}>{getDate('Y')}</div>
				<Catpow.Popup open={this.state.yearSelecting} onClose={()=>this.setState({yearSelecting:false})}>
					<Catpow.SelectTable
						selections={this.state.selections.year}
						value={getDate('Y')}
						col={10}
						spacer={this.state.selections.year[0]%10}
						onChange={(label)=>{
							setDate('Y',label);
							this.setState({yearSelecting:false});
						}}
					/>
				</Catpow.Popup>
				<span class="unit">年</span>
				<div class="value month" onClick={()=>{this.setState({monthSelecting:true})}}>{getDate('m')}</div>
				<Catpow.Popup open={this.state.monthSelecting} onClose={()=>this.setState({monthSelecting:false})}>
					<Catpow.SelectTable
						selections={this.state.selections.month}
						value={getDate('m')}
						col={6}
						onChange={(label)=>{
							setDate('m',label);
							this.setState({monthSelecting:false});
						}}
					/>
				</Catpow.Popup>
				<span class="unit">月</span>
				<div class="value date" onClick={()=>{this.setState({dateSelecting:true})}}>{getDate('d')}</div>
				<Catpow.Popup open={this.state.dateSelecting} onClose={()=>this.setState({dateSelecting:false})}>
					<Catpow.SelectTable
						selections={this.state.selections.date}
						value={getDate('d')}
						col={7}
						spacer={(getDate('w')-getDate('d')+35)%7}
						onChange={(label)=>{
							setDate('d',label);
							this.setState({dateSelecting:false});
						}}
					/>
				</Catpow.Popup>
				<span class="unit">日</span>

				{date!==false && <Catpow.HiddenValues
					name={this.props.name}
					value={date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()}
				/>}
			</div>
		);
	}
}