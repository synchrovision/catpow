Catpow.UI.TimeSelect=class extends wp.element.Component{
	constructor(props) {
		super(props);
		var selections,value,step,i,ii;
		
		if(props.value){value=props.value;}
		else if(props.default){value=props.default;}
		else{value='00:00';}
		
		step=props.step || 5;
		
		selections={
			hour:[],
			minit:[]
		}
		for(i=0;i<24;i++){
			ii=(i+"").padStart(2,'0');
			selections.hour.push(<option value={ii}>{ii}</option>);
		}
		for(i=0;i<60;i+=step){
			ii=(i+"").padStart(2,'0');
			selections.minit.push(<option value={ii}>{ii}</option>);
		}
		this.state={selections,value};
	}
	render(){
		var vals=this.state.value.split(':');
		
		const setTime=(i,val)=>{
			vals[i]=val;
			this.setState({value:vals.join(':')});
		};
		
		return (
			<div className={'TimeSelect'}>
				<select onChange={(e)=>{setTime(0,e.target.value);}} value={vals[0]}>
					{this.state.selections.hour}
				</select>
				<span className="delimiter">:</span>
				<select onChange={(e)=>{setTime(1,e.target.value);}} value={vals[1]}>
					{this.state.selections.minit}
				</select>

				<Catpow.UI.HiddenValues
					name={this.props.name}
					value={this.state.value}
				/>
			</div>
		);
	}
}