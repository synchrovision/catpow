if(undefined===window.Catpow){window.Catpow={};}

Catpow.HiddenValues=class extends wp.element.Component{
	constructor(props) {
		super(props);
	}
	render(){
		const hiddenInput=(name,val)=>{
			if(val instanceof Object){
				return Object.keys(val).map(k=>hiddenInput(name+'['+k+']',val[k]));
			}
			else{
				return <input type="hidden" name={name} value={val}/>;
			}
		}
		return (
			<div className={'hiddenValues'}>
				{hiddenInput(this.props.name,this.props.value)}
			</div>
		);
	}
}