Catpow.SelectTable=function({selections,value,onChange,spacer,col}){
	var i,items,values,fontSize,className="SelectTable",rows=[];
	spacer=spacer || 0;
	col=col || 5;
	if(Array.isArray(selections)){
		values=selections;
		items=selections.map((val)=>(
			<td className={val===value?'item active':'item'} onClick={()=>{
				onChange(val);
			}} key={val}>{val}</td>
		));
	}
	else{
		values=Object.values(selections);
		items=Object.keys(selections).map((key)=>(
			<td className={selections[key]===value?'item active':'item'} onClick={()=>{
				onChange(selections[key]);
			}} key={key}>{key}</td>
		));
	}
	fontSize=(360/col-5)/Math.max(...(values.map((val)=>val.toString().length)));
	if(fontSize>20){className+=' hasLargeFontSize';}
	else if(fontSize>10){className+=' hasRegularFontSize';}
	else{className+=' hasSmallFontSize';}
	
	for(i=0;i<spacer;i++){
		items.unshift(<td className="spacer" key={`start-spacer-${i}`}></td>);
	}
	for(i=(col-items.length%col)%col;i>0;i--){
		items.push(<td className="spacer" key={`end-spacer-${i}`}></td>);
	}
	for(i=0;i<items.length;i+=col){
		rows.push(items.slice(i,i+col));
	}
	return (
		<table className={className}>
			<tbody>
				{rows.map((row,index)=><tr key={index}>{row}</tr>)}
			</tbody>
		</table>
	);
}