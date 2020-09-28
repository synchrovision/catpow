Catpow.ChartText=function(props){
	const keys=['title','unit','rowTitle','rowUnit'];
	var {rows,cols,width=300,height=300,padding=50,total}=props;
	
	var graphHeight=height-padding*2, graphWidth=width-padding*2,graphOrg={x:padding,y:height-padding};
	var rowStep=graphWidth/rows.length;
	const legendItemWidths=cols.map((col)=>parseInt(20+col.label.length*12));
	const legendWidth=legendItemWidths.reduce((val,w)=>w+val,0);
	var legendItemPos=[{x:width/2-legendWidth/2,y:height-15}];
	legendItemWidths.map((w,c)=>{
		legendItemPos.push({
			x:legendItemPos[c].x+w,
			y:legendItemPos[c].y,
		});
	});
	
	props.pos=Object.assign({
		title:()=>{return {x:width/2,y:padding/2}},
		unit:()=>{return {x:width-padding/2,y:padding/2}},
		rowTitle:()=>{return {x:padding/2,y:height-padding+15}},
		rowUnit:()=>{return {x:width-padding/2,y:height-padding+15}},
		rowLabel:(r)=>{return {x:r*rowStep+rowStep/2+padding,y:height-padding+15}},
		legend:(c)=>{return legendItemPos[c]},
		val:(r,c)=>{return {x:r*rowStep+rowStep/2,y:c}},
	},props.pos);
	
	
	return (
		<g className='ChartText'>
			{keys.map((key)=>{
				let pos=props.pos[key]();
				return (
					<text className={key} x={pos.x} y={pos.y}>{props[key]}</text>
				);
			})}
			<g className={'rowLabel'}>
				{props.rows.map((item,i)=>{
					let pos=props.pos['rowLabel'](i);
					return (
						<text className={item.classes.replace('row','')} x={pos.x} y={pos.y}>{item.label}</text>
					);
				})}
			</g>
			<g className="ledgend">
				{props.cols.map((col,c)=>{
					const pos=props.pos.legend(c);
					return (
						<g className="ledgendItem">
							<rect
								className={cols[c].classes.replace('col','ledgendRect')}
								x={pos.x}
								y={pos.y-6}
								width={12}
								height={12}
							/>
							<text className="ledgendText" x={pos.x+15} y={pos.y}>{col.label}</text>
						</g>
					);
				})}
			</g>
			{props.hasValue && 
				<g className="vals">
					{props.rows.map((row,r)=>{
						return row.vals.map((val,c)=>{
							let pos=props.pos['val'](r,c);
							return (
								<text
									className={row.classes.replace('row','')+' '+props.cols[c].classes.replace('col','val')}
									x={pos.x}
									y={pos.y}
								>
									{val.value}
									{props.hasUnit && 
										<tspan className="unit">{props.unit}</tspan>
									}
								</text>
							);
						});
					})}
				</g>
			}
		</g>
	);
}