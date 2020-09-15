Catpow.ChartTextOutput=function(props){
	const keys=['title','unit','rowTitle','rowUnit','colTitle','colUnit'];
	const ds=['row','col'];
	
	props.pos=Object.assign({
		title:()=>{return {x:150,y:10}},
		unit:()=>{return {x:100,y:100}},
		rowTitle:()=>{return {x:100,y:100}},
		rowUnit:()=>{return {x:100,y:100}},
		colTitle:()=>{return {x:100,y:100}},
		colUnit:()=>{return {x:100,y:100}},
		rowLabel:(r)=>{return {x:50,y:r*20}},
		colLabel:(c)=>{return {x:c*20,y:20}},
		val:(r,c)=>{return {x:r*10,y:c*10}},
	},props.pos);
	
	return (
		<g className='texts'>
			{keys.map((key)=>{
				let pos=props.pos[key]();
				return (
					<text className={key} x={pos.x} y={pos.y}>{props[key]}</text>
				);
			})}
			{ds.map((d)=>{
				return (
					<g className={d+'Label'}>
						{props[d+'s'].map((item,i)=>{
							let pos=props.pos[d+'Label'](i);
							return (
								<text className={item.classes.replace(d,'')} x={pos.x} y={pos.y}>{item.label}</text>
							);
						})}
					</g>
				);
			})}
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
							</text>
						);
					});
				})}
			</g>
		</g>
	);
}