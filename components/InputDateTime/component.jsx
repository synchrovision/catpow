Catpow.InputDateTime=(props)=>{
	const {value,onChange}=props;
	const {useState,useMemo,useCallback}=wp.element;
	
    const date=useMemo(()=>{
        const date=new Date();
        if(value){date.setTime(value);}
        return date;
    },[]);
	const update=useCallback(()=>{
		onChange(date.getTime());
	},[]);
	const getDateString=useCallback((date)=>(new Date(date.getTime()-date.getTimezoneOffset()*60*1000)).toISOString().split('.')[0],[]);
	
	return (
		<div className={"InputDateTime"}>
			<input type="datetime-local" className="InputDateTime__date" value={getDateString(date)} onChange={(e)=>{date.setTime(Date.parse(e.target.value));update();}}/>
		</div>
	);
}