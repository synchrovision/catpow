/**
* Finderの表示項目を絞り込みするコンポーネント
*/

Catpow.Finder.FilterControl=(props)=>{
	const {useState,useContext}=wp.element;
	const {__}=wp.i18n;
	const {state,dispatch}=useContext(Catpow.FinderContext);
	const [open,setOpen]=useState(false);
	const {cols}=state.index;
	
	return (
		<div className="FinderControl FinderFilterControl">
			<ul className="items">
				<li className={'item'+(Object.keys(state.query).length?' active':'')}>
					<div className={"icon dashicons dashicons-filter"} onClick={()=>setOpen(!open)}></div>
					<Catpow.Popover　open={open}>
						<table className="FinderFilterControl__table">
						{Object.keys(state.index.cols).map((key)=>{
							const col=state.index.cols[key];
							if(col.role==='group'){
								return (
									<tr className="row">
										<th className="label">{col.label}</th>
										<td className="inputs">
											{Object.keys(col.dict).map((val)=>{
												const isActive=state.query[key] && state.query[key].indexOf(val)!==-1;
												return (
													<Catpow.CheckBox
														label={col.dict[val]}
														selected={isActive}
														onChange={(selected)=>dispatch({type:(selected?'add':'remove')+'Query',key,val})}
													/>
												);
											})}
										</td>
									</tr>
								);
							}
							return false;
						})}
						</table>
					</Catpow.Popover>
				</li>
			</ul>
		</div>
	);
}