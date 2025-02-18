Catpow.TableInput=(props)=>{
	const {className="cp-tableinput",labels,items,onAddItem,onCopyItem,onMoveItem,onRemoveItem,onChange,children}=props;
	const {useState,useCallback,useEffect,useReducer,useMemo,useRef,forwardRef}=wp.element;
	const {bem}=Catpow.util;
	const classes=useMemo(()=>bem(className),[className]);
	
	const Row=useMemo(()=>{
		return forwardRef((props,ref)=>{
			const {classes,index,length,children}=props;

			return (
				<tr className={classes()}>
					{children.map((child,index)=><td className={classes.td('is-input')} key={index}>{child}</td>)}
					<td className={classes.td('is-control')} key={index}>
						<div className={classes.td.controls()}>
							{index>0?(
								<div className={classes.td.controls.button('is-up')} onClick={()=>onMoveItem(index,index-1)}></div>
							):<div className={classes.td.controls.spacer()}/>}
							{index<length-1?(
								<div className={classes.td.controls.button('is-down')} onClick={()=>onMoveItem(index,index+1)}></div>
							):<div className={classes.td.controls.spacer()}/>}
							{length>1?(
								<div className={classes.td.controls.button('is-remove')} onClick={()=>onRemoveItem(index)}></div>
							):<div className={classes.td.controls.spacer()}/>}
							<div className={classes.td.controls.button('is-add')} onClick={()=>onAddItem(index+1)}></div>
						</div>
					</td>
				</tr>
			);
		});
	},[onAddItem,onCopyItem,onMoveItem,onRemoveItem,onChange]);
	
	
	return (
		<div className={classes()}>
			<table className={classes.table()}>
				{labels && (
					<thead className={classes.table.thead()}>
						<tr className={classes.table.thead.tr()}>
							{labels.map((label,index)=><th className={classes.table.thead.tr.th()} key={index}>{label}</th>)}
							<td className={classes.table.thead.tr.td()}/>
						</tr>
					</thead>
				)}
				<tbody className={classes.table.tbody()}>
				{children.map((child,index)=><Row classes={classes.table.tbody.tr} index={index} length={children.length} key={index}>{child}</Row>)}
				</tbody>
			</table>
		</div>
	);
}