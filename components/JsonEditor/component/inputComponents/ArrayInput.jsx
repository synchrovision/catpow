import {Input} from './Input.jsx';

export const ArrayInput=(props)=>{
	const {className="JsonEditor-Input-ArrayInput",agent,onChange,onUpdate}=props;
	const {useState,useMemo,useCallback,useEffect}=wp.element;
	const {bem}=Catpow.util;
	const classes=useMemo(()=>bem(className),[]);
	
	const {minContains:min,maxContains:max,items,prefixItems}=agent.getMergedSchemaForInput();
	
	const onAddItem=useCallback((index,value)=>{
		agent.addItem(index,value);
	},[agent]);
	const onCopyItem=useCallback((from,to)=>{
		agent.copyItem(from,to);
	},[agent]);
	const onMoveItem=useCallback((from,to)=>{
		agent.moveItem(from,to);
	},[agent]);
	const onRemoveItem=useCallback((index)=>{
		agent.removeItem(index);
	},[agent]);
	
	const [lastUpdated,setLastUpdated]=useState(Date.now());
	useEffect(()=>{
		const cb=(e)=>{setLastUpdated(Date.now());}
		agent.on('modifyItems',cb);
		return ()=>agent.off('modifyItems',cb);
	},[]);
	
	const getItemId=useMemo(()=>{
		const map=new WeakMap();
		let maxId=0;
		return (item)=>{
			if(!map.has(item)){map.set(item,maxId++);}
			return map.get(item);
		};
	},[]);
	
	return (
		<div className={classes()}>
			<Catpow.ArrayInput
				onAddItem={onAddItem}
				onCopyItem={onCopyItem}
				onMoveItem={onMoveItem}
				onRemoveItem={onRemoveItem}
			>
				{agent.items.map((item)=><Input agent={item} key={getItemId(item)}/>)}
			</Catpow.ArrayInput>
		</div>
	);
}