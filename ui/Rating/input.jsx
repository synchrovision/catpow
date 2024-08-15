
Catpow.UI.Rating=({name,value,max=5})=>{
	const {useState,useCallback}=wp.element;
	const [val,setVal]=useState(value);
	const {bem}=Catpow.util;
	const classes=bem('Rating');
	
	return (
		<div className={classes()} style={{'--rating-max':max,'--rating-value':val,'--rating-ratio':val/max}}>
			<div className={classes.points()}>
				{[...Array(max).keys()].map((rate)=>(
					<div className={classes.points.point({'is-active':(rate+1)<=val})} onClick={()=>setVal(rate+1)} key={rate}></div>
				))}
			</div>
			<Catpow.UI.HiddenValues name={name} value={val}/>
		</div>
	);
}