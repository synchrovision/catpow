/**
* Finderのレイアウトを変更する
*/

Catpow.Finder.SelectLayout=(props)=>{
	const {useContext}=wp.element;
	const {state,dispatch}=useContext(Catpow.FinderContext);
	const selections=[
		{value:'list',icon:'excerpt-view'},
		{value:'grid',icon:'grid-view'},
		{value:'table',icon:'list-view'}
	];
	return (
		<div className="FinderControl FinderSelectLayout">
			<ul className="items">
				{selections.map((sel)=>{
					return (
						<li
							className={'item'+(state.layout===sel.value?' active':'')}
							onClick={()=>{
								dispatch({type:'setLayout',layout:sel.value})
							}}
						>
							<div className={"icon dashicons dashicons-"+sel.icon}></div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}