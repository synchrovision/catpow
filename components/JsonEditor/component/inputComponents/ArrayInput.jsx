import {Input} from './Input.jsx';

export const ArrayInput=(props)=>{
	const {className="cp-jsoneditor-input-arrayinput",compact=false,agent,onChange,onUpdate}=props;
	const {useState,useMemo,useCallback,useEffect}=wp.element;
	const {bem}=Catpow.util;
	const classes=useMemo(()=>bem(className),[]);
	
	const schema=agent.getMergedSchemaForInput();
	const layout=schema.layout || props.layout || (compact?'table':'block');
	const size=schema.size || props.size || 'medium';
	
	const {minContains:min,maxContains:max,items,prefixItems}=schema;
	
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
				const {agent}=props;
				
				const cols={};
				
				for(const item of agent.items){
					const itemSchema=item.getMergedSchemaForInput();
					if(itemSchema.properties==null){continue;}
					for(const col in itemSchema.properties){
						if(cols[col]==null){cols[col]={}}
						Object.assign(cols[col],itemSchema.properties[col]);
					}
				}
				const sortedColsKeys=Object.keys(cols).filter((key)=>!cols[key].hidden).sort((key1,key2)=>(cols[key1].order || 10) - (cols[key2].order || 10));
				
				return (
					<Catpow.TableInput
						size={size}
						labels={sortedColsKeys.map((key)=>cols[key].title || key)}
						onAddItem={onAddItem}
						onCopyItem={onCopyItem}
						onMoveItem={onMoveItem}
						onRemoveItem={onRemoveItem}
					>
						{props.agent.items.map((item)=>sortedColsKeys.map((col)=>{
							if(item.getMergedSchemaForInput().properties[col]==null){return false;}
							return (
								<Input agent={item.properties[col]} layout="inline" size="small" compact={true} key={getItemId(item)}/>
							);
						}))}
					</Catpow.TableInput>
				);
			};
		}
		return (props)=>{
			const {agent}=props;
			return (
				<Catpow.ArrayInput
					size={size}
					onAddItem={onAddItem}
					onCopyItem={onCopyItem}
					onMoveItem={onMoveItem}
					onRemoveItem={onRemoveItem}
				>
					{props.agent.items.map((item)=><Input agent={item} layout="inline" size="small" compact={true} key={getItemId(item)}/>)}
				</Catpow.ArrayInput>
			);
		};
	},[layout,size,onAddItem,onCopyItem,onMoveItem,onRemoveItem]);
	
	
	return (
		<div className={classes(`is-layout-${layout}`,`is-size-${size}`)}>
			<InputComponent agent={agent}/>
		</div>
	);
}