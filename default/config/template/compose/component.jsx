class Compose extends wp.element.Component{
	constructor(props){
		super(props);
		var {myData}=props;
		var count=0;
		this.state={myData,count};
	}
	render(){
		return (
			<div>
				<div class="result">{this.state.wait?'waiting...':this.state.myData+this.state.count}</div>
				<button
					onClick={(e)=>{
						this.setState({wait:true});
						wp.apiFetch({path:this.props.path+'/myAction',method:'post',data:this.state}).then((data)=>{
							data.wait=false;
							this.setState(data);
						}).catch((e)=>{console.log(e);});
					}}
				>myAction</button>
			</div>
		);
	}
	componentDidMount(){
		
	}
	componentDidUpdate(){
		
	}
}