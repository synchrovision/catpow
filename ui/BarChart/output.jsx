Catpow.UI.BarChartOutput=(props)=>{
	var colsSvg=[],rowsSvg=[],textsSvg=[];
	var {rows,cols,width=300,height=300,padding=50,total}=props;
	
	if(!total){
		var n;
		total=0;
		rows.map((row)=>{
			n=0;
			row.vals.map((val)=>{n+=parseFloat(val.value);});
			total=Math.max(n,total);
		});
	}
	
	
	var graphHeight=height-padding*2, graphWidth=width-padding*2,graphOrg={x:padding,y:height-padding};
	
	var rowStep=graphWidth/rows.length,barWidth=rowStep/4*3,barMargin=rowStep/8,coef=graphHeight/total;
	var pos,h;
	
	colsSvg=cols.map((col,r)=>{
		return (
			<g className={col.classes} data-label={col.label}></g>
		);
	});
	var valPos=[];
	rowsSvg=rows.map((row,r)=>{
		var pos={x:r*rowStep+graphOrg.x+barMargin,y:graphOrg.y};
		valPos[r]=[];
		return(
			<g className={row.classes} data-label={row.label}>
				{row.vals.map((val,c)=>{
					h=val.value*coef;
					pos.y-=h;
					valPos[r][c]={
						x:r*rowStep+rowStep/2+padding,
						y:pos.y+h/2
					};
					return (
						<rect
							className={cols[c].classes.replace('col','val')}
							data-value={val.value}
							x={pos.x}
							y={pos.y}
							width={barWidth}
							height={h}
						/>
					);
				})}
			</g>
		);
	});
	props.pos={
		val:(r,c)=>{return valPos[r][c]},
	};

	return (
		<div className={'cpui-barchart'}>
			<svg viewBox={"0 0 "+width+" "+height}>
				<g className="graph">
					<g className="cols">{colsSvg}</g>
					<g className="rows">{rowsSvg}</g>
				</g>
				{el(Catpow.ChartText,props)}
			</svg>
		</div>
	);
}