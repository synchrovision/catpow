/*
* 週間スケジュール
* 
*/
Catpow.UI.WeeklySchedule=class extends wp.element.Component{
	constructor(props) {
		super(props);
		let {value,step,range,dayLabels}=props;
		console.log(props);
		this.dayLabels=dayLabels || ['日','月','火','水','木','金','土'];
		this.dayClasses=['sun','mon','tue','wed','thu','fri','sat'];
		value=value || [];
		value=value.map((item)=>{
			return {start:parseInt(item.start),end:parseInt(item.end)};
		});
		step=step || 15;
		this.state={value,step,range};
	}
	render(){
		let {value,step,range,id}=this.state;
		var hs=[];
		
		if(!id){
			this.setState({id:'ws'+(new Date().getTime().toString(16))})
		}
		const save=()=>{
			this.setState({value:JSON.parse(JSON.stringify(value))});
		};
		const minutesToTime=(minutes)=>{
			minutes=Math.floor(parseInt(minutes%1440)/step)*step;
			var h=Math.floor(minutes/60);
			return ('0'+h).slice(-2)+':'+('0'+(minutes-h*60)).slice(-2);
		};
		const minutesToDayAndTime=(minutes)=>{
			if(minutes<0){minutes+=1440*7;}
			minutes=minutes%(1440*7);
			return {
				d:Math.floor(minutes/1440),
				m:minutes%1440
			}
		};
		const getMinutes=(e)=>{
			return Math.floor((Math.floor(e.x/e.w*7)*1440+e.y/e.h*1440)/step)*step;
		}
		const Rect=(props)=>{
			const {children,day,start,end,...otherProps}=props;
			return (
				<div
					style={{
						position:'absolute',
						top:start/1440*100+'%',
						bottom:(1440-end)/1440*100+'%',
						left:(day%7)/7*100+'%',
						right:(6-(day%7))/7*100+'%'
					}}
					{...otherProps}
				>{children}</div>
			);
		};
		const Event=(props)=>{
			var {index,start,end,...otherProps}=props;
			var d,h={},rcts=[];
			[start,h.setStart]=wp.element.useState(start);
			[end,h.setEnd]=wp.element.useState(end);
			hs[index]=h;
			if(start>end){end+=1440*7;}
			start=minutesToDayAndTime(start);
			end=minutesToDayAndTime(end);
			const startHandler=<div className="handler moveStart" data-drawaction="moveStart"></div>;
			const endHandler=<div className="handler moveEnd" data-drawaction="moveEnd"></div>;
			const label=<div className="label">{minutesToTime(start.m)+'〜'+minutesToTime(end.m)}</div>;
			if(start.d<end.d){
				rcts.push({day:start.d,start:start.m,end:1440,children:[label,startHandler]});
				for(d=start.d+1;d<end.d;d++){
					rcts.push({day:d,start:0,end:1440});
				}
				rcts.push({day:end.d,start:0,end:end.m,children:[endHandler]});
			}
			else if(start.d>end.d || start.m>end.m){
				rcts.push({day:start.d,start:start.m,end:1440,children:[label,startHandler]});
				for(d=start.d+1;d<7;d++){
					rcts.push({day:d,start:0,end:1440});
				}
				for(d=0;d<end.d;d++){
					rcts.push({day:d,start:0,end:1440});
				}
				rcts.push({day:end.d,start:0,end:end.m,children:[endHandler]});
			}
			else{
				rcts=[{day:start.d,start:start.m,end:end.m,children:[label,startHandler,endHandler]}];
			}
			return (
				<div className="item event" data-index={index}>
					{rcts.map((rectProps)=><Rect className="rect" data-drawaction="move" {...rectProps}/>)}
				</div>
			);
		};
		var events=value.map((eventProps,index)=><Event index={index} {...eventProps}/>);
		
		
		return (
			<div className={'cpui-weeklyschedule'}>
				<table className="grid">
					<thead>
						<tr>
							<td className="spacer"></td>
							{Array.from({length:7}).map((_,i)=><th>{this.dayLabels[i]}</th>)}
						</tr>
					</thead>
					<tbody>
						{Array.from({length:24}).map((_,i)=>{
							return (
								<tr>
									<th>{i}:00</th>
									{Array.from({length:7}).map((_,i)=><td></td>)}
								</tr>
							);
						})}
					</tbody>
				</table>
				<Catpow.DrawArea
					className="cpui-weeklyschedule-drawarea"
					onCatch={(e)=>{
						//console.log(e);
					}}
					onDraw={(e)=>{
						switch(e.action){
							case 'move':
								var t=getMinutes({w:e.w,h:e.h,x:e.tx+e.w/14,y:e.ty});
								hs[e.index].setStart(value[e.index]['start']+t);
								hs[e.index].setEnd(value[e.index]['end']+t);
								break;
							case 'moveStart':
								hs[e.index].setStart(getMinutes(e));
								break;
							case 'moveEnd':
								hs[e.index].setEnd(getMinutes(e));
								break;
						}
					}}
					onRelease={(e)=>{
						switch(e.action){
							case 'add':
								value.push({
									start:getMinutes(e),
									end:getMinutes(e)+120
								});
								break;
							case 'move':
								var t=getMinutes({w:e.w,h:e.h,x:e.tx+e.w/14,y:e.ty});
								value[e.index]['start']+=t;
								value[e.index]['end']+=t;
								break;
							case 'moveStart':
								value[e.index]['start']=getMinutes(e);
								break;
							case 'moveEnd':
								value[e.index]['end']=getMinutes(e);
								break;
						}
						e.resetItem();
						save();
					}}
					onDelete={(e)=>{
						console.log(e)
						value.splice(e.index,1);
						save();
					}}
				>
					<div className="item base" data-drawaction="add"></div>
					{events}
				</Catpow.DrawArea>
				<Catpow.UI.HiddenValues name={this.props.name} value={value}/>
			</div>
		);
	}
}