Catpow.UI.CalendarSelect=(props)=>{
	const {useState,useCallback,useMemo}=wp.element;
	const [value,setValue]=useState(props.value);
	const d=Catpow.util.getDateObject(value,new Date());
	const [year,setYear]=useState(d.getFullYear());
	const [month,setMonth]=useState(d.getMonth()+1);
	
	return (
		<div className='CalendarSelect'>
			<Catpow.Calendar
				className='medium'
				year={year}
				month={month}
				min={props.min}
				max={props.max}
				values={
					value?{[value]:true}:{}
				}
				onSelect={setValue}
			/>
			{value &&
				<Catpow.UI.HiddenValues
					name={props.name}
					value={value}
				/>
			}
		</div>
	);
}