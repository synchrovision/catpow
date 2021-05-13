/**
* Finderの１ページあたりの表示件数を変更
*/

Catpow.Finder.PerPage=(props)=>{
	const {useState,useCallback,useContext}=wp.element;
	const {__}=wp.i18n;
	const {state,dispatch}=useContext(Catpow.FinderContext);
	
	const onChange=useCallback((e)=>{
		const itemsPerPage=Math.max(1,parseInt(e.currentTarget.value));
		dispatch({type:'setItemsPerPage',itemsPerPage})
	},[dispatch]);
	
	return (
		<div className="FinderControl FinderPerPage">
			<ul className="items">
				<li className='item'>
					<div className="inputs">
						<input type="number" value={state.itemsPerPage} min="1" max="1000" onChange={onChange}/>
						{__('件/頁','catpow')}
					</div>
				</li>
			</ul>
		</div>
	);
}