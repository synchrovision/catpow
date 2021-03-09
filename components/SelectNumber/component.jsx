Catpow.SelectNumber=(props)=>{
	const {min=1,max=10,step=1,value,onChange}=props;
	const {useState,useMemo}=wp.element;
	
	const selections=useMemo(()=>{
		const selections=[];
		for(let i=parseInt(min);i<=parseInt(max);i+=parseInt(step)){
			selections.push(i);
		}
		return selections;
	},[min,max,step]);
	
	return (
		<select className="SelectNumber" onChange={(e)=>{onChange(e.currentTarget.value);}}>
			{selections.map((i)=>(<option value={i} selected={value===i}>{i}</option>))}
		</select>
	);
}