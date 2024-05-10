import {Input} from './Input.jsx';

export const ArrayInput=(props)=>{
	const {className="JsonEditor-Input-ArrayInput",agent,onChange,onUpdate}=props;
	const {useState,useMemo,useCallback,useEffect}=wp.element;
	const {bem}=Catpow.util;
	const classes=useMemo(()=>bem(className),[]);
	
	const schema=agent.getMergedSchemaForInput();
	const layout=schema.layout || 'table';
	const size=schema.size || 'medium';
	
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
	
	const InputComponent=useMemo(()=>{
		if(layout==='table'){
			return (props)=>{
				const schema=agent.items[0].getMergedSchemaForInput();
				const cols=Object.keys(schema.properties);
				const labels=cols.map((col)=>schema.properties[col].title || col);
				
				return (
					<Catpow.TableInput
						labels={labels}
						onAddItem={onAddItem}
						onCopyItem={onCopyItem}
						onMoveItem={onMoveItem}
						onRemoveItem={onRemoveItem}
					>
						{props.agent.items.map((item)=>cols.map((col)=>(
							<Input agent={item.properties[col]} layout="inline" size="small" compact={true} key={getItemId(item)}/>
						)))}
					</Catpow.TableInput>
				);
			};
		}
		return (props)=>{
			return (
				<Catpow.ArrayInput
					onAddItem={onAddItem}
					onCopyItem={onCopyItem}
					onMoveItem={onMoveItem}
					onRemoveItem={onRemoveItem}
				>
					{props.agent.items.map((item)=><Input agent={item} layout="inline" size="small" compact={true} key={getItemId(item)}/>)}
				</Catpow.ArrayInput>
			);
		};
	},[layout,onAddItem,onCopyItem,onMoveItem,onRemoveItem]);
	
	
	return (
		<div className={classes(`is-layout-${layout}`,`is-size-${size}`)}>
			<InputComponent agent={agent}/>
		</div>
	);
}