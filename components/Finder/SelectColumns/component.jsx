/**
* FinderのTableViewで表示するカラムを選択
*/

Catpow.Finder.SelectColumns=(props)=>{
	const {useState,useContext}=wp.element;
	const {state,dispatch}=useContext(Catpow.FinderContext);
	const [open,setOpen]=useState(false);
	const {cols}=state.index;
	
	return (
		<div className="FinderControl FinderSelectColumns">
			<ul className="items">
				<li className={'item'+(open?' active':'')}>
					<div className={"icon dashicons dashicons-visibility"} onClick={()=>setOpen(!open)}></div>
					<Catpow.Popover open={open}>
						<div className="CheckBox__wrapper">
							{Object.keys(cols).map((name)=>(
								<Catpow.CheckBox
									label={cols[name].label}
									selected={!cols[name].hide}
									onChange={(val)=>dispatch({type:(val?'show':'hide')+'Column',name})}
								/>
							))}
						</div>
					</Catpow.Popover>
				</li>
			</ul>
		</div>
	);
}