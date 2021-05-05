Catpow.Output=(props)=>{
	const {conf,value}=props;
	const {createElemnt:el}=wp.element;
	if(!value)return '';
	switch(conf.output_type){
		case 'group':
			return (
				<ul className="outputs">
					{value.map((row)=>{
						return (
							<li className="outputs__item">
								{Object.keys(conf.meta).map((name)=>(
									<dl>
										<dt>{conf.meta[name].label}</dt>
										<dd><Catpow.Output conf={conf.meta[name]} value={row[name]}/></dd>
									</dl>
								))}
							</li>
						);
					})}
				</ul>
			);
		case 'select':
		case 'radio':
		case 'checkbox':
			return value.map((val)=>conf.dict[val]).join(',');
		default:
			return value.join(',');
	}
}