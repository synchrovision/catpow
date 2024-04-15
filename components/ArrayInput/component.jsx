Catpow.ArrayInput=(props)=>{
	const {className="ArrayInput",items,onAddItem,onCopyItem,onMoveItem,onRemoveItem,onChange,children}=props;
	const {useState,useCallback,useEffect,useReducer,useMemo,useRef,forwardRef}=wp.element;
	const {bem}=Catpow.util;
	const classes=useMemo(()=>bem(className),[className]);
	
	const Item=useMemo(()=>{
		return forwardRef((props,ref)=>{
			const {classes,index,length,children}=props;

			return (
				<li className={classes()}>
					<div className={classes.body()}><span>{props.id}</span>{children}</div>
					<div className={classes.controls()}>
						{index>0?(
							<div className={classes.controls.button('is-up')} onClick={()=>onMoveItem(index,index-1)}>↑</div>
						):<div className={classes.controls.spacer()}/>}
						{index<length-1?(
							<div className={classes.controls.button('is-down')} onClick={()=>onMoveItem(index,index+1)}>↓</div>
						):<div className={classes.controls.spacer()}/>}
						{length>1?(
							<div className={classes.controls.button('is-remove')} onClick={()=>onRemoveItem(index)}>-</div>
						):<div className={classes.controls.spacer()}/>}
						<div className={classes.controls.button('is-add')} onClick={()=>onAddItem(index+1)}>+</div>
					</div>
				</li>
			);
		});
	},[onAddItem,onCopyItem,onMoveItem,onRemoveItem,onChange]);
	
	
	return (
		<div className={classes()}>
			<ul className={classes.items()}>
				{children.map((child,index)=><Item classes={classes.items.item} index={index} length={children.length} key={index}>{child}</Item>)}
			</ul>
		</div>
	);
}