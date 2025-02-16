Catpow.SelectNumber=(props)=>{
	const {min=1,max=10,label,step=1,exclude=false,value,onChange}=props;
	const {useState,useMemo}=wp.element;
	
	const selections=useMemo(()=>{
		const selections=[];
		for(let i=parseInt(min);i<=parseInt(max);i+=parseInt(step)){
			selections.push(i);
		}
		return selections;
	},[min,max,step]);
	
	return (
		<select className="cp-selectnumber" value={value} onChange={(e)=>{onChange(e.currentTarget.value);}}>
			{label && <option>{label}</option>}
			{selections.map((i)=>(<option value={i} disabled={exclude && exclude.includes(i)} key={i}>{i}</option>))}
		</select>
	);
}