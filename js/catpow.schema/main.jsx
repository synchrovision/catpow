/* global console Map WeakMap */

import {conditionalSchemaKeys,minMaxKeys} from './consts.jsx';
import {getResolvedSchema} from './getResolvedSchema.jsx';
import {extractDependencies} from './extractDependencies.jsx';
import {mergeSchemas} from './mergeSchemas.jsx';
import {test} from './test.jsx';
import {sanitize} from './sanitize.jsx';

export const main=(rootSchema)=>{
	const resolveSchema=(uri,schema,param)=>{
		const resolvedSchema=getResolvedSchema(schema,rootSchema);
		Object.assign(resolvedSchema,param);
		if(resolvedSchema.$ref!=null){delete resolvedSchema.$ref;}
		const {parent}=param;
		for(let conditionalSchemaKey in conditionalSchemaKeys){
			if(resolvedSchema[conditionalSchemaKey]==null){continue;}
			if(conditionalSchemaKeys[conditionalSchemaKey]){
				for(let key in resolvedSchema[conditionalSchemaKey]){
					resolvedSchema[conditionalSchemaKey][key]=resolveSchema(uri,resolvedSchema[conditionalSchemaKey][key],{parent,isConditional:true});
				}
			}
			else{
				resolvedSchema[conditionalSchemaKey]=resolveSchema(uri,resolvedSchema[conditionalSchemaKey],{parent,isConditional:true});
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
				resolvedSchema.properties[key]=resolveSchema(uri+'/'+key,resolvedSchema.properties[key],{parent:resolvedSchema});
			}
			if(resolvedSchema.required){
				for(let key in resolvedSchema.required){
					resolvedSchema.properties[key].isRequired=true;
				}
			}
		}
		if(resolvedSchema.prefixItems!=null){
			for(let index in resolvedSchema.prefixItems){
				resolvedSchema.prefixItems[index]=resolveSchema(uri+'/'+index,resolvedSchema.prefixItems[index],{parent:resolvedSchema});
			}
		}
		if(resolvedSchema.items!=null){
			resolvedSchema.items=resolveSchema(uri+'/$',resolvedSchema.items,{parent:resolvedSchema});
		}
		return resolvedSchema;
	};
	const resolvedRootSchema=resolveSchema('#',rootSchema,{});
	const mergeSchemasProxy=(schemas,extend)=>{
		return mergeSchemas(schemas,resolvedRootSchema,{extend});
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
		if(cb(agent)===false){return false;}
		agent.walkChildren((child)=>walkDescendant(child,cb));
		return true;
	}
	const walkDescendantSchema=(agent,schema,cb)=>{
		if(cb(agent,schema)===false){return false;}
		agent.walkChildren((child)=>{
			for(let subSchema of child.matrix.schemas){
				if(subSchema.parent===schema){
					walkDescendantSchema(child,subSchema,cb);
				}
			}
		});
		return true;
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
			const test=(value,schema)=>test(value,schema,rootSchema);
			if(schema.if!=null){
				schemas.push(getUnlimietedSchema(schema.if));
				updateHandlesList.push((agent)=>{
					const isValid=test(agent.getValue(),schema.if);
					if(schema.then!=null){agent.setConditionalSchemaStatus(schema.then,isValid?3:0);}
					if(schema.else!=null){agent.setConditionalSchemaStatus(schema.else,isValid?0:3);}
				});
			}
			if(schema.allOf!=null){
				Array.push.apply(schemas,schema.allOf);
			}
			if(schema.anyOf!=null){
				schemas.push(mergeSchemasProxy(schema.anyOf,true))
			}
			if(schema.oneOf!=null){
				const keyPropertyName=getKeyPropertyName(schema.oneOf);
				updateHandlesList.push((agent)=>{
					const keyValue=agent.getValue()[keyPropertyName];
					schema.oneOf.forEach((schema)=>{
						agent.setConditionalSchemaStatus(schema,test(keyValue,schema.properties[keyPropertyName])?3:0);
					});
				});
			}
			const {dependentRequired,dependentSchemas}=extractDependencies(schema);
			if(dependentSchemas!=null){
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
						for(let child of agent.properties){cb(child);}
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
			getMergedSchema:(agent)=>{
				const cache={};
				return (status,extend=true)=>{
					const key=Array.from(agent.schemaStatus.values()).join('')+'-'+status+'-'+(extend?'e':'');
					if(cache[key]!=null){return cache[key];}
					cache[key]=mergeSchemasProxy(agent.getSchemas(status),extend);
					return cache[key];
				}
			},
			getValue:(agent)=>{
				return ()=>agent.value;
			},
			setValue:(agent)=>{
				return (value)=>{
					agent.value=value;
					walkAncestor(agent,(agent)=>{
						agent.update();
						agent.validate();
					});
				}
			},
			deleteValue:(agent)=>{
				return ()=>{
					delete agent.ref[agent.key];
					if(agent.onChange!=null){agent.onChange(null);}
					updateHandles.get(agent.matrix)(agent);
				}
			},
			update:(agent)=>{
				return ()=>{
					const valueType=getTypeOfValue(agent.value);
					if(possibleTypes[valueType]==null){return false;}
					if(agent.onChange!=null){agent.onChange(agent);}
					agent.ref[agent.key]=agent.value;
					updateHandles.get(agent.matrix)(agent);
				}
			},
			validate:(agent)=>{
				return ()=>{
					if(agent.additionalValidaion!=null){
						agent.additionalValidaion(agent.value,agent.getMergedSchema());
					}
					agent.invalidSchema=agent.getSchemas(1).find((schema)=>{
						return !test(agent.value,schema,rootSchema);
					});
					if(agent.invalidSchema){
						if(agent.onError!=null){agent.onError(agent,agent.invalidSchema);}
						agent.isValid=false;
					}
					else{
						agent.isValid=true;
					}
				}
			},
			initialize:(agent)=>{
				return ()=>{
					const mergedSchema=agent.getMergedSchema(2);
					if(mergedSchema.hasOwnProperty('default')){
						agent.setValue(mergedSchema.default);
					}
				}
			},
			sanitize:(agent)=>{
				return ()=>{
					let value=agent.getValue();
					const schemas=agent.getSchemas(2);
					for(const schema of schemas){
						value=sanitize(value,schema,rootSchema);
					}
					if(value!==agent.getValue()){
						agent.setValue(value);
					}
				}
			},
			setAdditionalValidaion:(agent)=>{
				return (cb)=>{
					agent.additionalValidaion=cb;
				}
			},
			setAdditionalInitialization:(agent)=>{
				return (cb)=>{
					agent.additionalInitialization=cb;
				}
			},
			setAdditionalSanitization:(agent)=>{
				return (cb)=>{
					agent.additionalSanitization=cb;
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
				return (item,index)=>{
					agent.items.splice(index,0,item);
					agent.items.forEach((item,index)=>item.key=index);
				}
			},
			copyItem:(agent)=>{
				return (from,to)=>{
					const item=createAgent(
						agent.matrix,agent.value,to,
						JSON.parse(JSON.stringify(agent.items[from])),
						agent.parent
					);
					agent.addItem(to,item);
				}
			},
			moveItem:(agent)=>{
				return (from,to)=>{
					agent.items.splice(to,0,agent.items.splice(from,1)[0]);
					agent.items.forEach((item,index)=>item.key=index);
				}
			},
			removeItem:(agent)=>{
				return (index)=>{
					agent.items.splice(index,1);
					agent.items.forEach((item,index)=>item.key=index);
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
		for(let schema of matrix.schemas){
			agent.schemaStatus.set(schema,3);
			if(schema.isConditional){
				agent.conditionalSchemaStatus.set(schema,3);
			}
			
		}
		if(matrix.properties!=null){
			if(agent.value==null){
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
		if(matrix.items!=null){
			if(agent.value==null){
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
		return rootAgent;
	}
	return rootMatrix;
}