Catpow.UI.PointChart=class extends wp.element.Component{
	constructor(props) {
		super(props);
		var bnd={},labels,value=Object.assign({x:0,y:0},props.value),press=false;
		var xVals,yVals,orgPos;
		xVals=Array.isArray(props.x)?props.x:Object.values(props.x);
		yVals=Array.isArray(props.y)?props.y:Object.values(props.y);
		this.valMap={x:xVals[0],y:yVals[0],w:xVals[1]-xVals[0],h:yVals[1]-yVals[0]};
		this.labels={
			x:Array.isArray(props.x)?props.x:Object.keys(props.x),
			y:Array.isArray(props.y)?props.y:Object.keys(props.y)
		}
		this.bodyBnd={t:50,b:250,l:50,r:250,w:200,h:200};
		
		orgPos=this.val2pos({x:0,y:0});
		
		this.base=(
			<g className="base">
				<rect
					className="bg" 
					x={this.bodyBnd.l}
					y={this.bodyBnd.t}
					width={this.bodyBnd.w}
					height={this.bodyBnd.h}
				></rect>
				<line className="baseLine" x1={orgPos.x} x2={orgPos.x} y1={this.bodyBnd.t} y2={this.bodyBnd.b}></line>
				<line className="baseLine" x1={this.bodyBnd.l} x2={this.bodyBnd.r} y1={orgPos.y} y2={orgPos.y}></line>
				<text className="label left" x={this.bodyBnd.l - 10} y={orgPos.y}>{this.labels.x[0]}</text>
				<text className="label right" x={this.bodyBnd.r + 10} y={orgPos.y}>{this.labels.x[1]}</text>
				<text className="label top" x={orgPos.x} y={this.bodyBnd.t - 10}>{this.labels.y[0]}</text>
				<text className="label bottom" x={orgPos.x} y={this.bodyBnd.b + 10}>{this.labels.y[1]}</text>
			</g>
		);
		
		this.state={value,press};
	}
	
	val2pos(value){
		return {
			x:(value.x-this.valMap.x)/this.valMap.w*this.bodyBnd.w+this.bodyBnd.l,
			y:(value.y-this.valMap.y)/this.valMap.h*this.bodyBnd.h+this.bodyBnd.t
		}
	}
	
	render(){
		var {value,press}=this.state;
		
		var pos=this.val2pos(value);
		
		return (
			<div className={'cpui-pointchart'}>
				<svg viewBox="0 0 300 300">
					{this.base}
					<line className="valLine" x1={pos.x} x2={pos.x} y1={this.bodyBnd.t} y2={this.bodyBnd.b}></line>
					<line className="valLine" x1={this.bodyBnd.l} x2={this.bodyBnd.r} y1={pos.y} y2={pos.y}></line>
					<rect className="point" x={pos.x-5} y={pos.y-5} width="10" height="10"></rect>
					<rect
						className="control"
						x={this.bodyBnd.l}
						y={this.bodyBnd.t}
						width={this.bodyBnd.w}
						height={this.bodyBnd.h}
						onMouseDown={(e)=>{this.setState({press:true});}}
						onMouseUp={(e)=>{this.setState({press:false});}}
						onMouseOut={(e)=>{this.setState({press:false});}}
						onMouseMove={(e)=>{
							if(!press){return;}
							var bnd=e.target.getBoundingClientRect();
							this.setState({
								value:{
									x:parseInt((e.clientX - parseInt(bnd.left))/bnd.width*this.valMap.w+this.valMap.x),
									y:parseInt((e.clientY - parseInt(bnd.top))/bnd.height*this.valMap.h+this.valMap.y),
								}
							});
						}}
					></rect>
				</svg>
				<Catpow.UI.HiddenValues
					name={this.props.name}
					value={value}
				/>
			</div>
		);
	}
}