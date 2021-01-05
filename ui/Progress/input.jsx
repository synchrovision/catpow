
Catpow.UI.Progress=({name,value,max=100,step=1})=>{
	const {useState}=wp.element;
	const [val,setVal]=useState(value);
	const [drawing,setDrawing]=useState(false);
	
	const updateVal=(e)=>{
		if(!drawing){return false;}
		const bnd=e.currentTarget.getBoundingClientRect();
		setVal(Math.round((e.clientX-bnd.left)/bnd.width*max/step)*step);
	}
	return (
		<div className={'Progress'}>
			<progress
				value={val}
				max={max}
				onMouseMove={updateVal}
				onMouseDown={()=>setDrawing(true)}
				onMouseUp={()=>setDrawing(false)}
				onMouseLeave={()=>setDrawing(false)}
			>{val}</progress>
			<input
				type="numer"
				onChange={(e)=>{setVal(e.currentTarget.value)}}
				value={val}
				max={max}
				min={0}
				size={3}
				step={step}
			/>
			<Catpow.UI.HiddenValues name={name} value={val}/>
		</div>
	);
}