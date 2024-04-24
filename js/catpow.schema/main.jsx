/* global console Map WeakMap */

import {conditionalSchemaKeys,minMaxKeys} from './consts.jsx';
import {getResolvedSchema} from './getResolvedSchema.jsx';
import {extractDependencies} from './extractDependencies.jsx';
import {mergeSchemas} from './mergeSchemas.jsx';
import {getDefaultValue} from './getDefaultValue.jsx';
import {getErrorMessage} from './getErrorMessage.jsx';
import {test} from './test.jsx';
import {sanitize} from './sanitize.jsx';

export const main=(rootSchema,params={})=>{
	const {debug=false}=params;
	const resolveSchema=(uri,schema,param)=>{
		const resolvedSchema=getResolvedSchema(schema,rootSchema);
		Object.assign(resolvedSchema,param);
		if(resolvedSchema.$ref!=null){delete resolvedSchema.$ref;}
		const {parent}=param;
		for(let conditionalSchemaKey in conditionalSchemaKeys){
			if(resolvedSchema[conditionalSchemaKey]==null){continue;}
			if(conditionalSchemaKeys[conditionalSchemaKey]){
				for(let key in resolvedSchema[conditionalSchemaKey]){
					resolvedSchema[conditionalSchemaKey][key]=resolveSchema(
						uri,resolvedSchema[conditionalSchemaKey][key],
						{parent,isConditional:true}
					);
				}
			}
			else{
				resolvedSchema[conditionalSchemaKey]=resolveSchema(
					uri,resolvedSchema[conditionalSchemaKey],
					{parent,isConditional:true}
				);
			}
		}
		const {dependentSchemas}=extractDependencies(resolvedSchema);
		if(dependentSchemas!=null){
			for(let propertyName in dependentSchemas){
				dependentSchemas[propertyName]=resolveSchema(uri,dependentSchemas[propertyName],{parent,isConditional:true});
			}
		}
		
		if(resolvedSchema.properties!=null){
			for(let key in resolvedSchema.properties){
				resolvedSchema.properties[key]=resolveSchema(
					uri+'/'+key,resolvedSchema.properties[key],
					{parent:resolvedSchema}
				);
			}
			if(resolvedSchema.required){
				for(let key of resolvedSchema.required){
					if(resolvedSchema.properties[key]){
						resolvedSchema.properties[key].isRequired=true;
					}
				}
			}
		}
		if(resolvedSchema.prefixItems!=null){
			for(let index in resolvedSchema.prefixItems){
				resolvedSchema.prefixItems[index]=resolveSchema(
					uri+'/'+index,resolvedSchema.prefixItems[index],
					{parent:resolvedSchema}
				);
			}
		}
		if(resolvedSchema.items!=null){
			resolvedSchema.items=resolveSchema(
				uri+'/$',resolvedSchema.items,
				{parent:resolvedSchema}
			);
		}
		return resolvedSchema;
	};
	const resolvedRootSchema=resolveSchema('#',rootSchema,{});
	const mergeSchemasProxy=(schemas,extend)=>{
		return mergeSchemas(schemas,resolvedRootSchema,{extend});
	}
	const debugLog=(message,object)=>{
		console.groupCollapsed(message);
		console.debug(object);
		console.groupEnd();
	}
	
	const updateHandles=new WeakMap();
	const getTypeOfValue=(value)=>{
		if(value == null){return 'null';}
		if(Array.isArray(value)){return 'array';}
		return typeof value;
	}
	const getPossibleTypes=(schemas)=>{
		const flags={};
		schemas.forEach((schema)=>flags[schema.type]=true);
		return flags;
	}
	const getKeyPropertyName=(schemas)=>{
		return Object.keys(schemas[0].properties).find((key)=>schemas.every((schema)=>schema.properties[key]!=null));
	}
	const walkAncestor=(agent,cb)=>{
		if(cb(agent)===false){return false;}
		if(agent.parent){
			return walkAncestor(agent.parent,cb);
		}
		return true;
	}
	const walkAncestorSchema=(agent,schema,cb)=>{
		if(cb(agent,schema)===false){return false;}
		if(agent.parent && schema.parent){
			return walkAncestorSchema(agent.parent,schema.parent,cb);
		}
		return true;
	}
	const walkDescendant=(agent,cb)=>{
		agent.walkChildren((child)=>{
			if(cb(child)!==false){
				walkDescendant(child,cb);
			}
		});
	}
	const walkDescendantSchema=(agent,schema,cb)=>{
		agent.walkChildren((child)=>{
			for(let subSchema of child.matrix.schemas){
				if(subSchema.parent===schema){
					if(cb(child,subSchema)!==false){
						walkDescendantSchema(child,subSchema,cb);
					}
				}
			}
		});
	}
	const getUnlimietedSchema=(schema)=>{
		const unlimitedSchema=Object.assign({},schema);
		delete unlimitedSchema.enum;
		delete unlimitedSchema.const;
		for(let key in minMaxKeys){
			if(unlimitedSchema[key]!=null){delete unlimitedSchema[key];}
		}
		return unlimitedSchema;
	}
	
	const getMatrix=(schemas)=>{
		const updateHandlesList=[];
		schemas.slice().forEach((schema)=>{
			if(schema.if!=null){
				schemas.push(getUnlimietedSchema(schema.if));
				updateHandlesList.push((agent)=>{
					const isValid=test(agent.getValue(),schema.if,rootSchema);
					if(schema.then!=null){agent.setConditionalSchemaStatus(schema.then,isValid?3:0);}
					if(schema.else!=null){agent.setConditionalSchemaStatus(schema.else,isValid?0:3);}
				});
			}
			if(schema.allOf!=null){
				schemas.push.apply(schemas,schema.allOf);
			}
			if(schema.anyOf!=null){
				schemas.push(mergeSchemasProxy(schema.anyOf,true))
			}
			if(schema.oneOf!=null){
				schemas.push.apply(schemas,schema.oneOf);
				const keyPropertyName=getKeyPropertyName(schema.oneOf);
				updateHandlesList.push((agent)=>{
					const keyValue=agent.properties[keyPropertyName].getValue();
					schema.oneOf.forEach((schema)=>{
						agent.setConditionalSchemaStatus(
							schema,test(keyValue,schema.properties[keyPropertyName],rootSchema)?3:0
						);
					});
				});
			}
			const {dependentRequired,dependentSchemas}=extractDependencies(schema);
			if(dependentSchemas!=null){
				for(let name in dependentSchemas){
					schemas.push(dependentSchemas[name]);
				}
				updateHandlesList.push((agent)=>{
					const value=agent.getValue();
					for(let name in dependentSchemas){
						agent.setConditionalSchemaStatus(dependentSchemas[name],(value[name]!=null)?3:0);
					}
				});
			}
			if(dependentRequired!=null){
				updateHandlesList.push((agent)=>{
					const value=agent.getValue();
					for(let name in dependentRequired){
						const flag=value[name]!=null;
						dependentRequired[name].forEach((name)=>{
							agent.properties[name].setConditionalRequiredFlag(schema,flag);
						});
					}
				});
			}
		});
		const matrix=createMatrix(schemas);
		updateHandles.set(matrix,(agent)=>{
			updateHandlesList.forEach((cb)=>cb(agent));
		});
		
		schemas.forEach((schema)=>{
			if(schema.properties!=null){
				if(matrix.properties==null){matrix.properties={};}
				for(let key in schema.properties){
					if(matrix.properties[key]==null){matrix.properties[key]=[];}
					matrix.properties[key].push(schema.properties[key]);
				}
			}
			if(schema.prefixItems!=null){
				if(matrix.prefixItems==null){matrix.prefixItems=[];}
				for(let index in schema.prefixItems){
					if(matrix.prefixItems[index]==null){matrix.prefixItems[index]=[];}
					matrix.prefixItems[index].push(schema.prefixItems[index]);
				}
			}
			if(schema.items!=null){
				if(matrix.items==null){matrix.items=[];}
				matrix.items.push(schema.items);
			}
		});
		if(matrix.properties!=null){
			for(let key in matrix.properties){
				matrix.properties[key]=getMatrix(matrix.properties[key]);
			}
		}
		if(matrix.prefixItems!=null){
			for(let index in matrix.prefixItems){
				matrix.prefixItems[index]=getMatrix(matrix.prefixItems[index]);
			}
		}
		if(matrix.items!=null){
			matrix.items=getMatrix(matrix.items);
		}
		
		return matrix;
	};
	const createMatrix=(schemas)=>{
		const possibleTypes=getPossibleTypes(schemas);
		const curries={
			on:(agent)=>{
				return (type,callback,arg=null)=>{
					if(agent.eventListeners[type]==null){
						agent.eventListeners[type]=new Map();
					}
					agent.eventListeners[type].set(callback,arg);
				}
			},
			off:(agent)=>{
				return (type,callback)=>{
					if(agent.eventListeners[type]==null){return;}
					return agent.eventListeners[type].delete(callback);
				}
			},
			trigger:(agent)=>{
				return (event)=>{
					if(typeof event === 'string'){
						event={type:event,bubbles:true};
					}
					event.target=agent;
					const cb=(agent)=>{
						if(agent.eventListeners[event.type]==null){return true;}
						let stopPropagation=false;
						agent.eventListeners[event.type].forEach((arg,callback)=>{
							if(callback(event,arg)===false){stopPropagation=true;}
						});
						return !stopPropagation;
					}
					if(event.bubbles){
						walkAncestor(agent,cb);
					}
					else{
						cb(agent);
					}
				}
			},
			getAgent:(agent)=>{
				return (path)=>{
					if(!Array.isArray(path)){path=path.split('/');}
					if(path.length===0){return agent;}
					const key=path.shift();
					if(isNaN(key)){
						return agent.properties[key].getAgent(path);
					}
					else{
						const index=parseInt(key);
						if(agent.prefixItems!=null){
							if(index<agent.prefixItems.length){
								return agent.prefixItems[index].getAgent(path);
							}
							else{
								return agent.prefixItems[index-agent.prefixItems.length].getAgent(path);
							}
						}
						else{
							return agent.items[index].getAgent(path);
						}
					}
				};
			},
			walkChildren:(agent)=>{
				return (cb)=>{
					if(agent.properties!=null){
						for(let name in agent.properties){
							cb(agent.properties[name]);
						}
					}
					if(agent.prefixItems!=null){
						for(let child of agent.prefixItems){cb(child);}
					}
					if(agent.items!=null){
						for(let child of agent.items){cb(child);}
					}
				}
			},
			
			getConditionalSchemaStatus:(agent)=>{
				return (schema)=>{
					return agent.conditionalSchemaStatus.get(schema);
				}
			},
			setConditionalSchemaStatus:(agent)=>{
				return (schema,status)=>{
					if(agent.conditionalSchemaStatus.get(schema)===status){return status;}
					agent.conditionalSchemaStatus.set(schema,status);
					if(debug){debugLog(`🔑 conditionalSchemaStatus of '${agent.key}' was changed`,{schema,status});}
					agent.setSchemaStatus(schema,agent.parent==null?3:agent.parent.getSchemaStatus(schema.parent) & status);
				}
			},
			setConditionalRequiredFlag:(agent)=>{
				return (schema,flag)=>{
					if(agent.conditionalRequiredFlag.get(schema)===flag){return flag;}
					agent.conditionalRequiredFlag.set(schema,flag);
					agent.isReqired=false;
					for(let [schema,flag] of agent.conditionalRequiredFlag.entries()){
						if(flag && (agent.getSchemaStatus(schema) & 1)){
							agent.isReqired=true;break;
						}
					}
				}
			},
			
			getSchemaStatus:(agent)=>{
				return (schema)=>{
					if(agent.schemaStatus==null || !agent.schemaStatus.has(schema)){return 1;}
					return agent.schemaStatus.get(schema);
				}
			},
			setSchemaStatus:(agent)=>{
				return (schema,status)=>{
					if(agent.schemaStatus.get(schema)===status){return status;}
					agent.schemaStatus.set(schema,status);
					if(debug){debugLog(`🔑 schemaStatus of '${agent.key}' was changed`,{schema,status});}
					walkDescendantSchema(agent,schema,(agent,schema)=>{
						const currentStatus=agent.schemaStatus.get(schema);
						let status=agent.parent.schemaStatus.get(schema.parent);
						if(agent.conditionalSchemaStatus.has(schema)){
							status&=agent.conditionalSchemaStatus.get(schema);
						}
						if(status===currentStatus){return false;}
						agent.schemaStatus.set(schema,status);
					});
				}
			},
			
			getSchemas:(agent)=>{
				return (status)=>{
					return schemas.filter((schema)=>(agent.getSchemaStatus(schema) & status) != 0);
				}
			},
			getSchemasForInput:(agent)=>{
				return ()=>agent.getSchemas(1);
			},
			getSchemasForValidation:(agent)=>{
				return ()=>agent.getSchemas(2);
			},
			
			getMergedSchema:(agent)=>{
				const cache={};
				return (status=1,extend=true)=>{
					const key=agent.getMergedSchemaKey(status,extend);
					if(cache[key]!=null){return cache[key];}
					cache[key]=mergeSchemasProxy(agent.getSchemas(status),extend);
					return cache[key];
				}
			},
			getMergedSchemaKey:(agent)=>{
				return (status=1,extend=true)=>{
					return Array.from(agent.schemaStatus.values()).join('')+'-'+status+(extend?'-e':'');
				}
			},
			getMergedSchemaForInput:(agent)=>{
				return ()=>agent.getMergedSchema(1,true);
			},
			getMergedSchemaForValidation:(agent)=>{
				return ()=>agent.getMergedSchema(2,false);
			},
			
			getValue:(agent)=>{
				return (getDefaultValueIfEmpty=true)=>{
					if(agent.value==null && getDefaultValueIfEmpty){
						return getDefaultValue(agent.getMergedSchemaForInput(),rootSchema);
					}
					return agent.value;
				}
			},
			setValue:(agent)=>{
				return (value)=>{
					agent.value=value;
					agent.trigger({type:'change',bubbles:true});
					if(debug){debugLog(`📝 change value for '${agent.key}'`,{value});}
				}
			},
			deleteValue:(agent)=>{
				return ()=>{
					agent.value=null;
					agent.trigger({type:'change',bubbles:true});
				}
			},
			update:(agent)=>{
				return ()=>{
					if(debug){debugLog(`⚙️ update process for '${agent.key}' start`,params);}
					if(agent.value==null){
						delete agent.ref[agent.key];
					}
					else{
						agent.ref[agent.key]=agent.value;
					}
					if(agent.parent!=null){agent.parent.update();}
					updateHandles.get(agent.matrix)(agent);
					agent.validate();
					if(!agent.isValid){
						agent.trigger({type:'error',bubbles:false});
					}
					agent.trigger({type:'update',bubbles:false});
					if(debug){debugLog(`⚙️ update process for '${agent.key}' end`,params);}
				}
			},
			validate:(agent)=>{
				return ()=>{
					agent.isValid=agent.getSchemasForValidation().every((schema)=>{
						return test(agent.value,schema,rootSchema,{onError:(params)=>{
							if(debug){debugLog('⚠️ invalid value was found',params);}
							agent.setMessage(getErrorMessage(params));
							agent.trigger({type:'error',bubble:false});
							return false;
						}});
					});
					agent.trigger({type:'validate',bubbles:false});
				}
			},
			initialize:(agent)=>{
				return ()=>{
					if(agent.value==null){
						agent.value=getDefaultValue(agent.getMergedSchemaForInput(),rootSchema);
					}
					agent.trigger({type:'initialize',bubbles:false});
				}
			},
			initializeRecursive:(agent)=>{
				return ()=>{
					agent.initialize();
					agent.walkChildren((agent)=>agent.initialize());
				}
			},
			sanitize:(agent)=>{
				return ()=>{
					let value=agent.getValue();
					const schemas=agent.getSchemasForValidation();
					for(const schema of schemas){
						value=sanitize(value,schema,rootSchema);
					}
					if(value!==agent.getValue()){
						agent.setValue(value);
					}
					agent.trigger({type:'sanitize',bubbles:false});
				}
			},
			sanitizeRecursive:(agent)=>{
				return ()=>{
					agent.sanitize();
					agent.walkChildren((agent)=>agent.sanitize());
				}
			},
			getMessage:(agent)=>{
				return ()=>agent.message
			},
			setMessage:(agent)=>{
				return (message)=>{agent.message=message;}
			},
			getProperties:(agent)=>{
				return ()=>{
					return agent.properties;
				}
			},
			getPrefixItems:(agent)=>{
				return ()=>{
					return agent.prefixItems;
				}
			},
			getItems:(agent)=>{
				return ()=>{
					return agent.items;
				}
			},
			addItem:(agent)=>{
				return (index,value)=>{
					const item=createAgent(
						agent.matrix.items,agent.value,index,value,agent.parent
					);
					agent.items.splice(index,0,item);
					agent.items.forEach((item,index)=>item.key=index);
					agent.trigger({type:'addItem',bubbles:false});
					agent.trigger({type:'modifyItems',bubbles:false});
				}
			},
			copyItem:(agent)=>{
				return (from,to)=>{
					agent.addItem(to,JSON.parse(JSON.stringify(agent.items[from].getValue())));
				}
			},
			moveItem:(agent)=>{
				return (from,to)=>{
					agent.items.splice(to,0,agent.items.splice(from,1)[0]);
					agent.items.forEach((item,index)=>item.key=index);
					agent.trigger({type:'moveItem',bubbles:false});
					agent.trigger({type:'modifyItems',bubbles:false});
				}
			},
			removeItem:(agent)=>{
				return (index)=>{
					agent.items.splice(index,1);
					agent.items.forEach((item,index)=>item.key=index);
					agent.trigger({type:'removeItem',bubbles:false});
					agent.trigger({type:'modifyItems',bubbles:false});
				}			
			}
		}
		return {possibleTypes,curries,schemas};
	}
	const createAgent=(matrix,ref,key,value,parent,params)=>{
		const agent={matrix,ref,key,value,parent};
		for(let functionName in matrix.curries){
			agent[functionName]=matrix.curries[functionName](agent);
		}
		if(params!=null){Object.assign(agent,params);}
		agent.message=false;
		agent.schemaStatus=new Map();
		agent.conditionalSchemaStatus=new WeakMap();
		agent.conditionalRequiredFlag=new Map();
		agent.eventListeners={};
		for(let schema of matrix.schemas){
			if(schema.isConditional){
				agent.schemaStatus.set(schema,0);
				agent.conditionalSchemaStatus.set(schema,0);
			}
			else{
				agent.schemaStatus.set(schema,parent?parent.getSchemaStatus(schema.parent):3);
			}
		}
		if(matrix.properties!=null){
			if(agent.value==null || Array.isArray(agent.value) || typeof agent.value !== 'object'){
				agent.value=value={};
			}
			agent.properties={};
			for(let propertyName in matrix.properties){
				agent.properties[propertyName]=createAgent(
					matrix.properties[propertyName],
					value,propertyName,value[propertyName],agent
				);
			}
		}
		else if(matrix.items!=null){
			if(agent.value==null || !Array.isArray(agent.value)){
				agent.value=value=[];
			}
			if(value.length>0){
				agent.items=[];
				for(let index in value){
					agent.items[index]=createAgent(matrix.items,value,index,value[index],agent);
				}
			}
			else{
				agent.items=[createAgent(matrix.items,value,0,null,agent)];
			}
		}
		
		return agent;
	}
	
	const rootMatrix=getMatrix([resolvedRootSchema]);
	rootMatrix.createAgent=(data,params)=>{
		const rootAgent=createAgent(rootMatrix,{data},'data',data,null,params);
		rootAgent.initializeRecursive();
		rootAgent.sanitizeRecursive();
		if(debug){debugLog('✨ rootAgent was created',{rootAgent});}
		return rootAgent;
	}
	if(debug){debugLog('✨ rootMatrix was created',{rootMatrix});}
	return rootMatrix;
}