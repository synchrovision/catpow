Catpow.Finder.SearchResults=(props)=>{
	const {useContext,useCallback,createElement:el,Fragment}=wp.element;
	const {__}=wp.i18n;
	const {state,dispatch,info}=useContext(Catpow.FinderContext);
	const {roleGroups}=info;
	
	const flagsToWords=useCallback((classes)=>Object.keys(classes).filter((key)=>classes[key]).join(' '),[]);
	const hasRoleGroup=useCallback((group)=>{
		return !roleGroups[group].every((role)=>!state.colsToShowByRole[role] || !state.colsToShowByRole[role].length);
	},[state.colsToShowByRole,roleGroups]);
	const ucfirst=useCallback((str)=>str.charAt(0).toUpperCase()+str.slice(1),[]);
	
	const ListView=props.listView || useCallback(({state,info})=>{
		const {colsToShowByRole}=state;
		
		const flags={list:true};
		Object.keys(info.roleGroups).map((group)=>{
			flags['has'+ucfirst(group)]=hasRoleGroup(group);
		});
		
		return (
			<ul className={flagsToWords(flags)}>
				{state.itemsInPage.map((row)=>{
					return (
						<li className={'item'+(row._selected?' selected':'')} key={'row'+row._id}>
							<div className="contents">
								<div className="control"><Catpow.CheckBox selected={row._selected} onChange={(selected)=>dispatch({type:selected?'selectRow':'deselectRow',row})}/></div>
								{flags.hasImages && (
									<div className="images">
										{roleGroups.images.map((role)=>{
											if(!colsToShowByRole[role] || !colsToShowByRole[role].length){return false;}
											return colsToShowByRole[role].map((col)=>(
												<Catpow.Output conf={col} {...row[col.name]}/>
											))
										})}
									</div>
								)}
								<div class="texts">
									{Object.keys(roleGroups).map((group)=>{
										if(!hasRoleGroup(group) || group==='images'){return false;}
										return (
											<div className={group}>
												{roleGroups[group].map((role)=>{
													if(!colsToShowByRole[role] || !colsToShowByRole[role].length){return false;}
													return colsToShowByRole[role].map((col)=>(
														<Catpow.Output conf={col} {...row[col.name]}/>
													))
												})}
											</div>
										);
									})}
									<div className="focus" onClick={()=>dispatch({type:'focusItem',row})}>{__('詳細を見る','catpow')}</div>
								</div>
							</div>
						</li>
					);
				})}
				{[...Array(10).keys()].map((i)=><li className="spacer" key={'spacer'+i}></li>)}
			</ul>
		);
	},[]);
	const TableView=props.tableView || useCallback(({state})=>{
		return (
			<table className="table">
				<thead className="header">
					<tr className="row">
						<th className="control">
							<Catpow.CheckBox
								selected={state.itemsInPage.every((item)=>item._selected)}
								onChange={(selected)=>dispatch({type:selected?'selectAllRows':'deselectAllRows'})}
							/>
						</th>
						<th className="focus"></th>
						{state.colsToShow.map((col)=>(
							<th className="cell">{col.label}</th>
						))}
					</tr>
				</thead>
				<tbody className="body">
					{state.itemsInPage.map((row)=>(
						<tr className={"row"+(row._selected?' selected':'')} key={'row'+row._id}>
							<th className="control"><Catpow.CheckBox selected={row._selected} onChange={(selected)=>dispatch({type:selected?'selectRow':'deselectRow',row})}/></th>
							<th className="focus"><div className={"icon dashicons dashicons-admin-page"} onClick={()=>dispatch({type:'focusItem',row})}></div></th>
							{state.colsToShow.map((col)=>(
								<td className="cell"><Catpow.Output conf={col} {...row[col.name]}/></td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		);
	},[props]);
	
	
	return (
		<div className="FinderSearchResults">
			<Catpow.Transition type={state.transition}>
				{state.items.length>0?(
					<div className={"FinderSearchResultsItems "+state.layout+"-view"} depth={1} page={state.page} view={state.layout}>
						{el((state.layout === 'table')?TableView:ListView,{state,dispatch,info})}
					</div>
				):(
					<div className={"message"} depth={1} page={1} view={'message'}>
						{__('検索結果なし','catpow')}
					</div>
				)}
			</Catpow.Transition>
		</div>
	);
}