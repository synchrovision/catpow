Catpow.BarChartOutput=function(props){
	var colsSvg=[],rowsSvg=[],textsSvg=[];
	
	var {rows,cols,width,height,padding,total}=Object.assign({
		width:300,
		height:300,
		padding:50
	},props);
	
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
	
	var rowStep=graphWidth/rows.length,barWidth=rowStep/2,barMargin=rowStep/4,coef=graphHeight/total;
	var pos,h;
	
	colsSvg=cols.map((col,r)=>{
		return (
			<g className={col.classes} data-label={col.label}></g>
		);
	});
	rowsSvg=rows.map((row,r)=>{
		var pos={x:r*rowStep+graphOrg.x+barMargin,y:graphOrg.y};
		return(
			<g className={row.classes} data-label={row.label}>
				{row.vals.map((val,c)=>{
					h=val.value*coef;
					pos.y-=h;
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

	return (
		<div className={'BarChart'}>
			<svg viewBox="0 0 300 300">
				<g class="graph">
					<g class="cols">{colsSvg}</g>
					<g class="rows">{rowsSvg}</g>
				</g>
				{el(Catpow.ChartText,props)}
			</svg>
		</div>
	);
}