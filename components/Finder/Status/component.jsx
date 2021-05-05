/**
* Finderの表示項目を絞り込みするコンポーネント
*/

Catpow.Finder.Status=(props)=>{
	const {useState,useContext}=wp.element;
	const {__,sprintf}=wp.i18n;
	const {state,dispatch}=useContext(Catpow.FinderContext);
	const [open,setOpen]=useState(false);
	const {cols}=state.index;
	
	const selectedItems=state.itemsInPage.filter((item)=>item._selected);
	
	return (
		<div className="FinderControl FinderStatus">
			{sprintf(__('%d件中%d件表示','catpow'),state.items.length,state.itemsInPage.length)}
			{selectedItems.length>0 && sprintf(__('%d件選択','catpow'),selectedItems.length)}
		</div>
	);
}