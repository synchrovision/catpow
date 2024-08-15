Catpow.StepSelect=(props)=>{
	const {defaultLabel='─',onChange,multiple=true,placeholder='Search'}=props;
	const {useState,useReducer,useCallback,useMemo,useRef,useEffect}=wp.element;
	const {bem}=Catpow.util;
	const classes=bem('StepSelect');
	
	const [open,setOpen]=useState(false);
	const [search,setSearch]=useState('');
	const cache=useRef({});
	
	const {rootItem,valueItemMap}=useMemo(()=>{
		const rootItem={};
		const valueItemMap={};
		const cb=(options,parent)=>{
			const items=[];
			if(Array.isArray(options)){
				options.forEach((value)=>{
					const item={label:value,value,parent};
					valueItemMap[value]=item;
					items.push(item);
				});
			}
			else{
				Object.keys(options).forEach((label)=>{
					const item={label,parent};
					if(typeof options[label] === 'object'){
						item.options=cb(options[label],item);
					}
					else{
						item.value=options[label];
						valueItemMap[options[label]]=item;
					}
					items.push(item);
				});
			}
			return items;
		};
		rootItem.options=cb(props.options,rootItem);
		return {rootItem,valueItemMap};
	},[props.options]);
	
	const init=useCallback((state)=>{
		state.selectedItems=props.value?props.value.map((value)=>valueItemMap[value]):[];
		state.activeItems=[rootItem];
		return state;
	},[]);
	const toggleItemReducer=useCallback((state,itemToToggle)=>{
		const {selectedItems,activeItems}=state;
		const newState={...state};
		
		if(activeItems.includes(itemToToggle)){
			newState.activeItems=activeItems.slice(0,activeItems.indexOf(itemToToggle));
		}
		else{
			newState.activeItems=[];
			let currentItem=itemToToggle;
			while(currentItem){
				if(currentItem.options!=null){newState.activeItems.unshift(currentItem);}
				currentItem=currentItem.parent;
			}
		}
		if(activeItems.some((activeItem)=>activeItem.options && activeItem.options.includes(itemToToggle))){
			if(itemToToggle.hasOwnProperty('value')){
				if(multiple){
					if(selectedItems.includes(itemToToggle)){
						newState.selectedItems=selectedItems.filter((item)=>item!==itemToToggle);
					}
					else{
						newState.selectedItems=[...selectedItems,itemToToggle];
					}
				}
				else{
					newState.selectedItems=(selectedItems.includes(itemToToggle))?[]:[itemToToggle];
				}
			}
		}
		return newState;
	},[]);
	const [state,toggleItem]=useReducer(toggleItemReducer,{},init);
	useEffect(()=>{
		if(multiple){
			onChange(state.selectedItems.map((item)=>item.value));
		}
		else{
			onChange(state.selectedItems.length?state.selectedItems[0].value:null);
		}
	},[state.selectedItems]);
	
	return (
		<div className={classes()}>
			<div className={classes.selected()} onClick={()=>setOpen(true)}>
				<ul className={classes.selected.items()}>
					{(state.selectedItems && state.selectedItems.length)?(
						state.selectedItems.map((item)=>(
							<li className={classes.selected.items.item()} onClick={()=>toggleItem(item)} key={item.value}>
								{item.label}
								<span className={classes.selected.items.item.button()}></span>
							</li>
						))
					):(
						<li className={classes.selected.items.item()}>{defaultLabel}</li>
					)}
				</ul>
			</div>
			<Catpow.Popup open={open} onClose={()=>open && setOpen(false)}>
				<div className={classes._body()}>
					<div className={classes.selected()} onClick={()=>setOpen(true)}>
						<ul className={classes.selected.items()}>
							{(state.selectedItems && state.selectedItems.length)?(
								state.selectedItems.map((item)=>(
									<li className={classes.selected.items.item()} onClick={()=>toggleItem(item)} key={item.value}>
										{item.label}
										<span className={classes.selected.items.item.button()}></span>
									</li>
								))
							):false}
						</ul>
					</div>
					<div className={classes.selections()}>
						{state.activeItems.map((activeItem,index)=>(
							<div className={classes.selections.options()} key={index}>
								<ul className={classes.selections.options.items()}>
									{activeItem.options.map((item,index)=>(
										<li
											className={classes.selections.options.items.item({
												'is-selected':state.selectedItems.includes(item),
												'is-active':state.activeItems.includes(item),
												'has-children':!item.hasOwnProperty('value')
											})}
											onClick={()=>toggleItem(item)}
											key={item.label}
										>
											{item.label}
										</li>
									))}
								</ul>
								<div className={classes.selections.options.arrow((index<state.activeItems.length-1)?'is-shown':'is-hidden')}></div>
							</div>
						))}
					</div>
				</div>
			</Catpow.Popup>
		</div>
	);
}