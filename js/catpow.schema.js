/* global Catpow console WeakMap */
Catpow.schema=(rootSchema)=>{
	const resolveSchema=(uri,schema,param)=>{
		const resolvedSchema=Catpow.schema.getResolvedSchema(schema,rootSchema);
		Object.assign(resolvedSchema,param);
		if(resolvedSchema.$ref!=null){delete resolvedSchema.$ref;}
		const {parent}=param;
		for(let conditionalSchemaKey in Catpow.schema.conditionalSchemaKeys){
			if(resolvedSchema[conditionalSchemaKey]==null){continue;}
			if(Catpow.schema.conditionalSchemaKeys[conditionalSchemaKey]){
				for(let key in resolvedSchema[conditionalSchemaKey]){
					resolvedSchema[conditionalSchemaKey][key]=resolveSchema(uri,resolvedSchema[conditionalSchemaKey][key],{parent,isConditional:true});
				}
			}
			else{
				resolvedSchema[conditionalSchemaKey]=resolveSchema(uri,resolvedSchema[conditionalSchemaKey],{parent,isConditional:true});
			}
		}
		if(resolvedSchema.dependencies!=null){
			for(let propertyName in resolvedSchema.dependencies){
				if(Array.isArray(resolvedSchema.dependencies[propertyName])){continue;}
				resolvedSchema.dependencies[propertyName]=resolveSchema(uri,resolvedSchema.dependencies[propertyName],{parent,isConditional:true});
			}
		}
		if(resolvedSchema.dependentSchemas!=null){
			for(let propertyName in resolvedSchema.dependentSchemas){
				resolvedSchema.dependentSchemas[propertyName]=resolveSchema(uri,resolvedSchema.dependentSchemas[propertyName],{parent,isConditional:true});
			}
		}
		
		if(resolvedSchema.properties!=null){
			for(let key in resolvedSchema.properties){
				resolvedSchema.properties[key]=resolveSchema(uri+'/'+key,resolvedSchema.properties[key],{parent:resolvedSchema});
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
	const getUnlimietedSchema=(schema)=>{
		const unlimitedSchema=Object.assign({},schema);
		delete unlimitedSchema.enum;
		delete unlimitedSchema.const;
		for(let key in Catpow.schema.minMaxKeys){
			if(unlimitedSchema[key]!=null){delete unlimitedSchema[key];}
		}
		return unlimitedSchema;
	}
	
	const getMatrix=(schemas)=>{
		const updateHandlesList=[];
		schemas.slice().forEach((schema)=>{
			const test=(value,schema)=>Catpow.schema.test(value,schema,rootSchema);
			if(schema.if!=null){
				schemas.push(getUnlimietedSchema(schema.if));
				updateHandlesList.push((agent)=>{
					const isValid=test(agent.getValue(),schema.if);
					if(schema.then!=null){agent.setSchemaStatus(schema.then,isValid?3:0);}
					if(schema.else!=null){agent.setSchemaStatus(schema.else,isValid?0:3);}
				});
			}
			if(schema.allOf!=null){
				//@todo AND merge schema
				Array.push.apply(schemas,schema.allOf);
			}
			if(schema.anyOf!=null){
				//@todo OR merge schemas
				Array.push.apply(schemas,schema.anyOf);
			}
			if(schema.oneOf!=null){
				const keyPropertyName=getKeyPropertyName(schema.oneOf);
				updateHandlesList.push((agent)=>{
					const keyValue=agent.getValue()[keyPropertyName];
					schema.oneOf.forEach((schema)=>{
						agent.setSchemaStatus(schema,test(keyValue,schema.properties[keyPropertyName])?3:0);
					});
				});
			}
			const {dependentRequired,dependentSchemas}=Catpow.schema.extractDependencies(schema);
			if(dependentSchemas!=null){
				updateHandlesList.push((agent)=>{
					const value=agent.getValue();
					for(let name in schema.dependentSchemas){
						agent.setSchemaStatus(schema.dependentSchemas[name],(value[name]!=null)?3:0);
					}
				});
			}
			if(dependentRequired!=null){
				updateHandlesList.push((agent)=>{
					const value=agent.getValue();
					for(let name in dependentRequired){
						agent.setSchemaStatus(schema.dependentSchemas[name],(value[name]!=null)?3:0);
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
			getSchemaStatus:(agent)=>{
				return (schema)=>{
					if(agent.schemaStatus==null || !agent.schemaStatus.has(schema)){return 1;}
					return agent.schemaStatus.get(schema);
				}
			},
			setSchemaStatus:(agent)=>{
				return (schema,status)=>{
					if(agent.schemaStatus==null){agent.schemaStatus=new WeakMap();}
					agent.schemaStatus.set(schema,status);
				}
			},
			getSchemas:(agent)=>{
				return (status)=>{
					return schemas.filter((schema)=>{
						walkAncestorSchema(agent,schema,(agent,schema)=>{
							return !schema.isConditional || (agent.getSchemaStatus(schema) & status) != 0;
						});
					});
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
					const invalidSchema=agent.getSchemas(1).find((schema)=>{
						return !Catpow.schema.test(agent.value,schema,rootSchema);
					});
					if(invalidSchema){
						if(agent.onError!=null){agent.onError(agent,invalidSchema);}
						agent.isValid=false;
					}
					else{
						agent.isValid=true;
					}
				}
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
		return {
			possibleTypes,
			curries
		};
	}
	const createAgent=(matrix,ref,key,value,parent,params)=>{
		const agent={matrix,ref,key,value,parent};
		for(let functionName in matrix.curries){
			agent[functionName]=matrix.curries[functionName](agent);
		}
		if(params!=null){Object.assign(agent,params);}
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
	
	const rootMatrix=getMatrix([resolveSchema('#',rootSchema,{})]);
	rootMatrix.createAgent=(data,params)=>{
		const rootAgent=createAgent(rootMatrix,{data},'data',data,null,params);
		return rootAgent;
	}
	return rootMatrix;
}
Catpow.schema.typeSpecificKeys={
	number:['minimum','maximum','multipleOf'],
	string:['minLength','maxLength','pattern'],
	array:['items','prefixItems','minItems','maxItems','contains','minContains','maxContains'],
	object:[
		'properties','minProperties','maxProperties','propertyNames',
		'patternProperties','additionalProperties','unevaluatedProperties',
		'required','depndencies','dependentSchemas','dependentRequired'
	]
}
Catpow.schema.minMaxKeys={
	minimum:false,maximum:true,
	minLength:false,maxLength:true,
	minItems:false,maxItems:true,
	minContains:false,maxContains:true,
}
Catpow.schema.conditionalSchemaKeys={
	allOf:true,anyOf:true,oneOf:true,
	if:false,then:false,else:false,
	dependentSchemas:true,
}

Catpow.schema.getMatchedSchemas=(value,schemas,rootSchema,params)=>{
	return schemas.filter((schema)=>Catpow.schema.test(value,schema,rootSchema,params));
}
Catpow.schema.test=(value,schema,rootSchema,params={})=>{
	if(schema.const!=null && schema.const!==value){return false;}
	if(schema.enum!=null && !schema.enum.includes(value)){return false;}
	const type=Catpow.schema.getType(schema,rootSchema);
	const {ignoreRequired=false}=params;
	if(value == null){return type==='null' || ignoreRequired;}
	switch(type){
		case 'boolean':{
			if(typeof value !== 'boolean'){return false;}
			break;
		}
		case 'integer':
		case 'number':{
			if(type==='intger' && !Number.isInteger(value)){return false;}
			if(schema.minimum!=null && value<schema.minimum){return false;}
			if(schema.maximum!=null && value>schema.maximum){return false;}
			if(schema.exclusiveMinimum!=null){
				if(typeof schema.exclusiveMinimum === 'boolean'){
					if(schema.exclusiveMinimum===true && value<=schema.minimum){return false;}
				}
				else{
					if(value<=schema.exclusiveMinimum){return false;}
				}
			}
			if(schema.exclusiveMaximum!=null){
				if(typeof schema.exclusiveMaximum === 'boolean'){
					if(schema.exclusiveMaximum===true && value>=schema.minimum){return false;}
				}
				else{
					if(value>=schema.exclusiveMaximum){return false;}
				}
			}
			if(schema.multipleOf!=null){
				if(value%schema.multipleOf!==0){return false;}
			}
			break;
		}
		case 'string':{
			if(schema.pattern!=null){
				const reg=new RegExp(schema.pattern);
				if(!reg.test(value)){return false;}
			}
			if(schema.minLength!=null && value.length<schema.minLength){return false;}
			if(schema.maxLength!=null && value.length>schema.maxLength){return false;}
			break;
		}
		case 'object':{
			if(typeof value !== 'object' || Array.isArray(value)){return false;}
			if(schema.required!=null && !ignoreRequired){
				if(schema.required.some((key)=>value[key]==null)){return false;}
			}
			if(schema.additionalProperties!=null && schema.additionalProperties===false){
				if(Object.keys(value).some((key)=>!schema.properties.hasOwnProperty(key))){return false;}
			}
			const {dependentRequired,dependentSchemas}=Catpow.schema.extractDependencies(schema);
			if(dependentRequired){
				if(!ignoreRequired){
					if(Object.keys(dependentRequired).some((key)=>{
						return value[key]!=null && dependentRequired[key].some((depKey)=>value[depKey]==null);
					})){return false;}
				}
			}
			if(dependentSchemas){
				if(Object.keys(dependentSchemas).some((key)=>{
					return value[key]!=null && !Catpow.schema.test(value,dependentSchemas[key],rootSchema,params);
				})){return false;}
			}
			const length=Object.keys(value).length;
			if(schema.minProperties!=null && length<schema.minProperties){return false;}
			if(schema.maxProperties!=null && length>schema.maxProperties){return false;}
			if(schema.properties!=null){
				if(Object.keys(schema.properties).some((key)=>{
					if(value[key]==null){return false;}
					return !Catpow.schema.test(
						value[key],schema.properties[key],rootSchema,
						Object.assign({},params,{refStack:null})
					);
				})){return false;}
			}
			break;
		}
		case 'array':{
			if(schema.minItems!=null && value.length<schema.minItems){return false;}
			if(schema.maxItems!=null && value.length>schema.maxItems){return false;}
			if(schema.prefixItems!=null){
				if(schema.prefixItems.some((itemSchema,index)=>value[index]!==undefined && !Catpow.schema.test(value[index],itemSchema,rootSchema,params))){return false;}
			}
			if(schema.contains!=null){
				const matchedItems=value.filter((item)=>Catpow.schema.test(item,schema.contain,rootSchema,params));
				if(matchedItems.length===0){return false;}
				if(schema.minContains!=null && matchedItems.length<schema.minContains){return false;}
				if(schema.maxContains!=null && matchedItems.length>schema.maxContains){return false;}
			}
			if(schema.uniqueItems!=null && schema.uniqueItems===true){
				if(value.slice(0,-1).some((item,index)=>value.indexOf(item,index+1)!==-1)){return false;}
			}
			break;
		}
	}
	if(schema.oneOf!=null){
		const matchedSchemaLength=Catpow.schema.getMatchedSchemas(value,schema.oneOf,rootSchema,params).length;
		if(ignoreRequired){
			if(matchedSchemaLength===0){return false;}
		}
		else{
			if(matchedSchemaLength!==1){return false;}
		}
	}
	if(schema.anyOf!=null){
		if(schema.anyOf.every((subSchema)=>!Catpow.schema.test(value,subSchema,rootSchema))){return false;}
	}
	if(schema.allOf!=null){
		if(schema.allOf.some((subSchema)=>!Catpow.schema.test(value,subSchema,rootSchema))){return false;}
	}
	if(schema['$ref']!=null){
		if(params.refStack==null){params.refStack=new WeakMap();}
		const refSchema=Catpow.schema.getSubSchema(schema.$ref,schema,rootSchema);
		if(refSchema && !params.refStack.has(refSchema)){
			params.refStack.set(refSchema,true);
			if(!Catpow.schema.test(value,refSchema,rootSchema,params)){
				return false;
			}
		}
	}
	return true;
}
Catpow.schema.extractDependencies=(schema)=>{
	if(schema.dependencies!=null){
		if(Array.isArray(Object.values(schema.dependencies)[0])){
			return {dependentRequired:schema.dependencies};
		}
		else{
			return {dependentSchemas:schema.dependencies};
		}
	}
	else{
		const {dependentRequired,dependentSchemas}=schema;
		return {dependentRequired,dependentSchemas};
	}		
}
Catpow.schema.getType=(schema,rootSchema)=>{
	return Catpow.schema.find((schema)=>{
		if(schema.type!=null){return schema.type;}
		if(schema.properties!=null){return 'object';}
		if(schema.items!=null || schema.prefixItems!=null){return 'array';}
		if(schema.minimum!=null || schema.maximam!=null || schema.multipleOf!=null){return 'number';}
		if(schema.pattern!=null || schema.minLength!=null || schema.maxLength!=null){return 'string';}
		if(schema.const!=null){return typeof schema.const;}
		if(schema.default!=null){return typeof schema.default;}
		if(schema.enum!=null && schema.enum.length){return typeof schema.enum[0];}
	},schema,rootSchema);
}
Catpow.schema.getSubSchema=(path,schema,rootSchema)=>{
	let keys=path.split('/');
	if(keys[0]==='#'){
		keys.shift();
		schema=rootSchema;
	}
	keys.every((key)=>{
		if(!schema.hasOwnProperty(key)){
			schema=null;
			return false;
		}
		schema=schema[key];
		return true
	});
	return schema;
}
Catpow.schema.find=(callback,schema,rootSchema,params={})=>{
	if(schema==null){return null}
	const result=callback(schema,rootSchema);
	if(result!=null){return result;}
	if(!params.refStack!=null){params.refStack=new WeakMap();}
	if(params.refStack.has(schema)){return null;}
	params.refStack.set(schema,true);
	if(schema.allOf!=null){
		for(let i in schema.allOf){
			const result=Catpow.schema.find(callback,schema.allOf[i],rootSchema,params);
			if(result!=null){return result;}
		}
	}
	if(params.proactive){
		if(schema.anyOf!=null){
			for(let i in schema.anyOf){
				const result=Catpow.schema.find(callback,schema.anyOf[i],rootSchema,params);
				if(result!=null){return result;}
			}
		}
		if(schema.oneOf!=null){
			for(let i in schema.oneOf){
				const result=Catpow.schema.find(callback,schema.oneOf[i],rootSchema,params);
				if(result!=null){return result;}
			}
		}
		for(let key in ['if','then','else']){
			if(schema[key]==null){break;}
			const result=Catpow.schema.find(callback,schema[key],rootSchema,params);
			if(result!=null){return result;}
		}
		const {dependentSchemas}=Catpow.schema.extractDependencies(schema);
		if(dependentSchemas){
			for(let i in dependentSchemas){
				const result=Catpow.schema.find(callback,dependentSchemas[i],rootSchema,params);
				if(result!=null){return result;}
			}
		}
	}
	if(schema['$ref']!=null){
		const refSchema=Catpow.schema.getSubSchema(schema.$ref,schema,rootSchema);
		const result=Catpow.schema.find(callback,refSchema,rootSchema,params);
		if(result!=null){return result;}
	}
	return null;
}
Catpow.schema.getPrimaryPropertyName=(schema,rootSchema)=>{
	if(Catpow.schema.getType(schema,rootSchema)!=='object'){return null;}
	const mergedSchema=Catpow.schema.getMergedSchema(schema,rootSchema);
	if(mergedSchema.properties['@type']!=null){return '@type';}
	return Object.keys(mergedSchema.properties).find((key)=>mergedSchema.properties[key].enum!=null);
}
Catpow.schema.reservedKeys={
	"const":1,"enum":1,
	"oneOf":1,"anyOf":1,"$ref":1,
	"minimum":1,"maximum":1,"multipleOf":1,
	"minLength":1,"maxLength":1,
	"items":1,"prefixItems":1,"minItems":1,"maxItems":1,"contains":1,"minContains":1,"maxContains":1,
	"properties":1,"required":1,"dependencies":1,"dependentSchemas":1,"dependentRequired":1,
};
Catpow.schema.getResolvedSchema=(schema,rootSchema)=>{
	if(rootSchema==null){rootSchema=schema;}
	const cache=Catpow.schema.getResolvedSchema.cache;
	if(cache.has(schema)){return cache.get(schema);}
	let resolvedSchema;
	if(schema.hasOwnProperty('$ref')){
		resolvedSchema=Object.assign({},
			Catpow.schema.getResolvedSchema(
				Catpow.schema.getSubSchema(schema.$ref,schema,rootSchema),
				rootSchema
			),
			schema
		);
	}
	else{
		resolvedSchema=Object.assign({},schema);
	}
	if(resolvedSchema.type==null){
		resolvedSchema.type=Catpow.schema.getType(resolvedSchema,rootSchema);
	}
	cache.set(schema,resolvedSchema);
	return resolvedSchema;
}
Catpow.schema.getResolvedSchema.cache=new WeakMap();
Catpow.schema.getMergedSchema=(schema,rootSchema)=>{
	if(rootSchema==null){rootSchema=schema;}
	const cache=Catpow.schema.getMergedSchema.cache;
	if(cache.has(schema)){return cache.get(schema);}
	const mergedSchema={};
	Catpow.schema.find((schema)=>{
		Catpow.schema.mergeSchema(mergedSchema,schema,rootSchema,{extend:false});
	},schema,rootSchema,{proactive:false});
	cache.set(schema,mergedSchema);
	return mergedSchema;
}
Catpow.schema.getMergedSchema.cache=new WeakMap();
Catpow.schema.getMergedSchemaForValue=(value,schema,rootSchema)=>{
	if(rootSchema==null){rootSchema=schema;}
	const mergedSchema={}
	Catpow.schema.find((schema)=>{
		Catpow.schema.mergeSchema(mergedSchema,schema,rootSchema,{extend:false,value});
	},schema,rootSchema,{proactive:false});
	return mergedSchema;
}
Catpow.schema.mergeSchema=(targetSchema,schema,rootSchema,params={})=>{
	const {extend=false,value=null}=params;
	const forValue=params.hasOwnProperty('value');
	for(let key in schema){
		if(Catpow.schema.reservedKeys[key] && targetSchema[key]==null){
			targetSchema[key]=schema[key];
		}
	}
	//scalar
	if(schema.const!=null){
		if(extend){
			if(targetSchema.enum!==null){
				if(!targetSchema.enum){targetSchema.enum=[];}
				targetSchema.enum.push(schema.const);
			}
		}
		else{
			targetSchema.const=schema.const;
		}
	}
	else if(extend && targetSchema.const!=null){
		targetSchema.const=null;
	}
	if(schema.enum!=null){
		if(extend){
			if(targetSchema.enum==null){targetSchema.enum=[];}
			else{
				targetSchema.enum.push.apply(
					targetSchema.enum,schema.enum.filter((val)=>!targetSchema.enum.includes(val))
				);
			}
		}
		else{
			if(targetSchema.enum==null){targetSchema.enum=schema.enum.slice();}
			else{targetSchema.enum=targetSchema.enum.filter((val)=>schema.enum.includes(val));}
		}
	}
	else if(extend && targetSchema.enum!=null){
		targetSchema.enum=null;
	}

	//min max
	for(let key in Catpow.schema.minMaxKeys){
		if(schema[key]!=null){
			targetSchema[key]=Math[Catpow.schema.minMaxKeys[key]==extend?'max':'min'](targetSchema[key],schema[key]);
		}
		else if(extend && targetSchema[key]!=null){
			targetSchema[key]=null;
		}
	}

	//object
	if(schema.required!=null){
		if(extend){
			if(targetSchema.required!==null){
				if(targetSchema.required==null){targetSchema.required=schema.required.slice();}
				else{targetSchema.required=targetSchema.required.filter((val)=>schema.required.includes(val));}
			}
		}
		else{
			if(targetSchema.required==null){targetSchema.required=schema.required.slice();}
			else{
				targetSchema.required.push.apply(
					targetSchema.required,schema.required.filter((val)=>!targetSchema.required.includes(val))
				);
			}

		}
	}
	else if(extend && targetSchema.required!=null){
		targetSchema.required=null;
	}
	if(schema.properties!=null){
		if(targetSchema.properties==null){targetSchema.properties={}}
		for(let key in schema.properties){
			const propSchema=forValue?
				Catpow.schema.getMergedSchemaForValue(value || value[key],schema.properties[key],rootSchema):
				Catpow.schema.getMergedSchema(schema.properties[key],rootSchema);
			if(targetSchema.properties[key]!=null){
				Catpow.schema.mergeSchema(targetSchema.properties[key],propSchema,rootSchema,params);
			}
			else{
				targetSchema.properties[key]=propSchema;
			}
		}
	}

	//array
	if(schema.items!=null){
		if(targetSchema.items==null){
			targetSchema.items=Catpow.schema.getMergedSchema(schema.items,rootSchema);
			if(forValue && value!=null){
				targetSchema.itemsForValue=[];
				for(let i in value){
					targetSchema.itemsForValue.push(
						Catpow.schema.getMergedSchemaForValue(value[i],schema.items,rootSchema)
					)
				}
			}
		}
	}

	//conditional
	const conditionalSchemas=[];
	if(schema.oneOf!=null){
		conditionalSchemas.push.apply(
			conditionalSchemas,
			forValue?Catpow.schema.getMatchedSchemas(value,schema.oneOf,rootSchema,{ignoreRequired:true}):schema.oneOf
		);
	}
	if(schema.anyOf!=null){
		conditionalSchemas.push.apply(
			conditionalSchemas,
			forValue?Catpow.schema.getMatchedSchemas(value,schema.anyOf,rootSchema,{ignoreRequired:true}):schema.anyOf
		);
	}
	const {dependentSchemas}=Catpow.schema.extractDependencies(schema);
	if(dependentSchemas!=null){
		if(forValue){
			for(let key in dependentSchemas){
				if(value[key]!=null){conditionalSchemas.push(dependentSchemas[key]);}
			}
		}
		else{
			conditionalSchemas.push.apply(
				conditionalSchemas,
				Object.values(dependentSchemas)
			);
		}
	}
	if(conditionalSchemas.length){
		const mergedConditionalSchema={};
		for(let i in conditionalSchemas){
			if(forValue){
				Catpow.schema.mergeSchema(
					mergedConditionalSchema,
					Catpow.schema.getMergedSchemaForValue(value,conditionalSchemas[i],rootSchema),
					rootSchema,
					{extend:true,value}
				);
			}
			else{
				Catpow.schema.mergeSchema(
					mergedConditionalSchema,
					Catpow.schema.getMergedSchemaForValue(value,conditionalSchemas[i],rootSchema),
					rootSchema,
					{extend:true}
				);
			}
		}
		Catpow.schema.mergeSchema(targetSchema,mergedConditionalSchema,rootSchema,params);
	}
}