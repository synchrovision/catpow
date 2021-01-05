Catpow.UI.RadarChartOutput=class extends wp.element.Component{
	constructor(props) {
		super(props);
		var {value,total}=props;
		var press=false;
		
		if(undefined===total){total=100;}
		
		this.bodyBnd={ox:150,oy:150,r:100};
		this.total=total;
		
		this.state={value,press};
	}
	
	render(){
		var {value,press}=this.state;
		
		const val2pos=(v)=>{
			var rad=v/this.total*Math.PI*2-Math.PI/2;
			return {
				x:Math.cos(rad)*this.bodyBnd.r+this.bodyBnd.ox,
				y:Math.sin(rad)*this.bodyBnd.r+this.bodyBnd.oy
			};
		}
		
		var i,d,crrVal,crrPos,pies=[];
		
		crrVal=0;
		crrPos=val2pos(0);
		for(i=0;i<4;i++){
			d='M '+this.bodyBnd.ox+' '+this.bodyBnd.oy+' L '+crrPos.x+' '+crrPos.y;
			var v=Math.random()*80;
			crrVal+=Math.floor(v);
			if(crrVal>this.total){break;}
			crrPos=val2pos(crrVal);
			d+=' A '+this.bodyBnd.r+' '+this.bodyBnd.r+' 0 '+((v*2>this.total)?'1':'0')+' 1 '+crrPos.x+' '+crrPos.y;
			d+=' L '+this.bodyBnd.ox+' '+this.bodyBnd.oy;
			pies.push(
				<path d={d} stroke="red"/>
			);
		}
		
		return (
			<div className={'RadarChart'}>
				<svg viewBox="0 0 300 300">
					{pies}
				</svg>
			</div>
		);
	}
}