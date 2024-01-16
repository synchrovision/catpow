/* global Catpow console Proxy WeakMap */
Catpow.schema=(schema,rootSchema)=>{
	if(undefined===rootSchema){rootSchema=schema;}
	return new Proxy((value,params={})=>Catpow.schema.test(value,params.schema!=null?params.schema:schema,rootSchema),{
		get:(target,prop)=>{
			switch(prop){
				case 'getSubSchema':{
					return (path)=>Catpow.schema(
						Catpow.schema.getSubSchem(path,schema,rootSchema),
						rootSchema
					);
				}
			}
		}
	});
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
					return !Catpow.schema.test(value[key],schema.properties[key],rootSchema,{...params,refStack:null});
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
		if(schema.oneOf!=null){
			for(let i in schema.oneOf){
				const result=Catpow.schema.find(callback,schema.oneOf[i],rootSchema,params);
				if(result!=null){return result;}
			}
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
	const mergedSchema=Catpow.schema.mergeSchema(schema,rootSchema);
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
Catpow.schema.getMergedSchemaForValue=(value,schema,rootSchema,params)=>{
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
	if(!forValue){console.trace()}
	for(let key in schema){
		if(Catpow.schema.reservedKeys[key] && targetSchema[key]==null){
			targetSchema[key]=schema[key];
		}
	}
	if(schema==null){console.trace();}
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
