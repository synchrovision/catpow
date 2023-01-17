Catpow.Finder.Download=(props)=>{
	const {useContext,useCallback}=wp.element;
	const {state,dispatch}=useContext(Catpow.FinderContext);
	const {action='download'}=props;
	
	const download=useCallback(()=>{
		const selectedItems=state.itemsInPage.filter((item)=>item._selected);
		const items=selectedItems.length?selectedItems:state.items;
		const rows=items.map((item)=>item._id);
		console.log(rows);
		wp.apiFetch({
			path:state.apiPath+'/'+action,
			method: 'POST',
			data:{rows}
		}).then((res)=>{
			Catpow.util.download(res.data,res.name || state.name+'.csv','text/csv');
		});
	},[state.items,state.itemsInPage,dispatch]);
	
	return (
		<div className="FinderControl FinderDownload">
			<ul className="items">
				<li className={'item'} onClick={download}>
					<div className={"icon dashicons dashicons-download"}></div>
				</li>
			</ul>
		</div>
	);
}