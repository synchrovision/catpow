Catpow.InputDateTime=(props)=>{
	const {value,onChange}=props;
	const {useState,useMemo,useCallback,useEffect}=wp.element;
	const [dateStr,setDateStr]=useState('');
	const [isValid,setIsValid]=useState(true);
	
	const update=useCallback((dateStr)=>{
		const dateData=parseDateString(dateStr);
		if(dateData){
			const date=new Date(dateData.groups.year,parseInt(dateData.groups.month)-1,dateData.groups.date);
			if(dateData.groups.hours){
				date.setHours(dateData.groups.hours);
				date.setMinutes(dateData.groups.minutes);
			}
			onChange(date.getTime());
			setIsValid(true);
		}
		else{setIsValid(false);}
	},[]);
	const getDateString=useCallback((date)=>[date.getFullYear(),date.getMonth()+1,date.getDate()].join('-')+' '+date.getHours()+':'+('00'+date.getMinutes()).slice(-2),[]);
	const parseDateString=useCallback((dateStr)=>dateStr.match(/^(?<year>\d{4})\-(?<month>\d{1,2})\-(?<date>\d{1,2})(?: (?<hours>\d{1,2}):(?<minutes>\d{2}))?$/),[]);
	useEffect(()=>{setDateStr(getDateString(new Date(value)));},[value]);
	
	return (
		<div className={"InputDateTime"+(isValid?' valid':' invalid')}>
			<input
				type="text"
				className="InputDateTime__date"
				placeholder={'0000-00-00 00:00'}
				value={dateStr}
				onChange={(e)=>{setDateStr(e.target.value);}}
				onBlur={(e)=>{update(dateStr);}}
				onKeyPress={(e)=>{if(e.key=='Enter'){e.preventDefault();update(dateStr);}}}
			/>
		</div>
	);
}