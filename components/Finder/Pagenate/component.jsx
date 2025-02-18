﻿/**
* Finderのページネーション
*/

Catpow.Finder.Pagenate=(props)=>{
	const {useContext}=wp.element;
	const {state,dispatch}=useContext(Catpow.FinderContext);
	
	if(!state.maxNumPages || state.maxNumPages<2){return false;}
	return (
		<div className="cp-finder-pagenate">
			<div
				className={"button button_prev"+(state.page<=1?' disable':'')}
				onClick={()=>{
					if(state.page<=1){return;}
					dispatch({type:'setPage',page:state.page-1});
				}}
			>
				<div className={"icon dashicons dashicons-arrow-left-alt2"}></div>
			</div>
			<ul className="items">
				{[...Array(state.maxNumPages).keys()].map((i)=>{
					const page=i+1;
					const p=page-state.page;
					const stateClass=p===0?'active':(p<0?'before':'after')
					return (
						<li
							className={'item item'+p+' '+stateClass}
							onClick={()=>{
								dispatch({type:'setPage',page});
							}}
							key={i}
						>{page}</li>
					);
				})}
			</ul>
			<div
				className={"button button_next"+(state.page>=state.maxNumPages?' disable':'')}
				onClick={()=>{
					if(state.page>=state.maxNumPages){return;}
					dispatch({type:'setPage',page:state.page+1});
				}}
			>
				<div className={"icon dashicons dashicons-arrow-right-alt2"}></div>
			</div>
		</div>
	);
}