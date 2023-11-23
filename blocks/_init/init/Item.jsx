import {CP} from './CP.jsx';

CP.Item=(props)=>{
	const {tag,items,itemsKey,index,set,attr,triggerClasses,children}=props;
	let {itemClasses}=props;
	if(!items[index].classes){items[index].classes='item';}
	else if(items[index].classes.search(/\bitem\b/)===-1){items[index].classes+=' item';}
	let classes=items[index].classes;
	if(props.className){classes+=' '+props.className;}

	const {currentItemIndex=0}=attr;

	const isSelected=(props.isSelected === undefined)?(index==currentItemIndex):props.isSelected;

	return wp.element.createElement(
		tag,
		{
			className:classes,
			style:props.style,
			"data-index":index,
			"data-refine-cond":items[index]['cond'],
			onKeyDown:(e)=>{
				if((e.ctrlKey || e.metaKey)){
					switch(e.key){
						case 's':CP.saveItem(props);e.preventDefault();break;
						case 'd':CP.cloneItem(props);e.preventDefault();break;
						case 'Backspace':CP.deleteItem(props);e.preventDefault();break;
						case 'ArrowUp':CP.upItem(props);e.preventDefault();break;
						case 'ArrowDown':CP.downItem(props);e.preventDefault();break;
					}
				}
			},
			onClick:(e)=>{
				set({currentItemIndex:index});
			}
		},
		<>
			{children}
			{isSelected &&
				<div className='itemControl'>
					<div className='btn delete' onClick={(e)=>CP.deleteItem(props)}></div>
					<div className='btn clone' onClick={(e)=>CP.cloneItem(props)}></div>
					<div className='btn up' onClick={(e)=>CP.upItem(props)}></div>
					<div className='btn down' onClick={(e)=>CP.downItem(props)}></div>
				</div>
			}
		</>
	);
};