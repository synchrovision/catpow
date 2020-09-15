Catpow.PhoneNumber=class extends wp.element.Component{
	constructor(props) {
		super(props);
		this.secs0=React.createRef();
		this.secs1=React.createRef();
		this.secs2=React.createRef();
		this.state={value:props.value,isComposing:false};
	}
	render(){
		var {value,isComposing}=this.state;
		var secs=value.split('-');
		
		const setValue=(i,val)=>{
			if(!val.match(/^\d+$/)){val='';}
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
					if(!isComposing){
						this['secs'+(i+1)].current.focus();
					}
				}
			}
			this.setState({value:secs.join('-')});
		};
		
		const input=(i)=>(
			<input
				type="text"
				className={"sec"+i}
				size="4"
				autocomplete={['tel-area-code','tel-local-prefix','tel-local-suffix'][i]}
				onChange={(e)=>{
					var val=e.target.value;
					setValue(i,e.target.value);
				}}
				onCompositionStart={(e)=>{
					this.setState({isComposing:true});
				}}
				onCompositionEnd={(e)=>{
					isComposing=false;
					setValue(i,e.target.value);
					this.setState({isComposing});
				}}
				ref={this['secs'+i]}
				value={secs[i]}
			/>
		);
		
		return (
			<div className={'PhoneNumber'}>
				{input(0)}
				<span class="sep">-</span>
				{input(1)}
				<span class="sep">-</span>
				{input(2)}

				<Catpow.HiddenValues
					name={this.props.name}
					value={value}
				/>
			</div>
		);
	}
}