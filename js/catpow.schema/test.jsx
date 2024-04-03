/* global Catpow console Map WeakMap */

import {getType} from './getType.jsx';
import {getResolvedSchema} from './getResolvedSchema.jsx';
import {extractDependencies} from './extractDependencies.jsx';
import {getMatchedSchemas} from './getMatchedSchemas.jsx';

export const test=(value,schema,rootSchema,params={})=>{
	const type=getType(schema,rootSchema);
	schema=getResolvedSchema(schema,rootSchema);
	const {ignoreRequired=false,recursive=false,onError=false}=params;
	const cb=(invalidBy,params={})=>onError && onError(Object.assign({invalidBy,schema,value},params));
	if(schema.const!=null && schema.const!==value){return cb('const');}
	if(schema.enum!=null && !schema.enum.includes(value)){return cb('enum');}
	if(value == null){return true;}
	switch(type){
		case 'boolean':{
			if(typeof value !== 'boolean'){return cb('type');}
			break;
		}
		case 'integer':
		case 'number':{
			if(type==='intger' && !Number.isInteger(value)){return cb('type');}
			if(schema.minimum!=null && value<schema.minimum){return cb('minimum');}
			if(schema.maximum!=null && value>schema.maximum){return cb('maximum');}
			if(schema.exclusiveMinimum!=null){
				if(typeof schema.exclusiveMinimum === 'boolean'){
					if(schema.exclusiveMinimum===true && value<=schema.minimum){return cb('minimum');}
				}
				else{
					if(value<=schema.exclusiveMinimum){return cb('exclusiveMinimum');}
				}
			}
			if(schema.exclusiveMaximum!=null){
				if(typeof schema.exclusiveMaximum === 'boolean'){
					if(schema.exclusiveMaximum===true && value>=schema.maximum){return cb('maximum');}
				}
				else{
					if(value>=schema.exclusiveMaximum){return cb('exclusiveMaximum');}
				}
			}
			if(schema.multipleOf!=null){
				if(value%schema.multipleOf!==0){return cb('multipleOf');}
			}
			break;
		}
		case 'string':{
			if(schema.pattern!=null){
				const reg=new RegExp(schema.pattern);
				if(!reg.test(value)){return cb('pattern');}
			}
			if(schema.minLength!=null && value.length<schema.minLength){return cb('minLength');}
			if(schema.maxLength!=null && value.length>schema.maxLength){return cb('maxLength');}
			break;
		}
		case 'object':{
			if(typeof value !== 'object' || Array.isArray(value)){return cb('type');}
			if(schema.required!=null && !ignoreRequired){
				for(let propertyName of schema.required){
					if(value[propertyName]==null){return cb('required',{propertyName});}
				}
			}
			if(schema.additionalProperties!=null && schema.additionalProperties===false){
				if(Object.keys(value).some((key)=>!schema.properties.hasOwnProperty(key))){return cb('additionalProperties');}
			}
			const {dependentRequired,dependentSchemas}=extractDependencies(schema);
			if(dependentRequired){
				if(!ignoreRequired){
					for(let keyPropertyName in dependentRequired){
						if(value[keyPropertyName]==null){continue;}
						for(let propertyName of dependentRequired[keyPropertyName]){
							if(value[propertyName]==null){return cb('dependentRequired',{propertyName});}
						}
					}
				}
			}
			if(dependentSchemas){
				for(let propertyName in dependentSchemas){
					if(value[key]==null){continue;}
					const result=test(value,dependentSchemas[propertyName],rootSchema,params);
					if(result!==true){return result;}
				}
			}
			const length=Object.keys(value).length;
			if(schema.minProperties!=null && length<schema.minProperties){return cb('minProperties');}
			if(schema.maxProperties!=null && length>schema.maxProperties){return cb('maxProperties');}
			if(recursive && schema.properties!=null){
				if(Object.keys(schema.properties).some((key)=>{
					if(value[key]==null){return false;}
					return test(value[key],schema.properties[key],rootSchema,params) !== true;
				})){return false;}
			}
			break;
		}
		case 'array':{
			if(schema.minItems!=null && value.length<schema.minItems){return cb('minItems');}
			if(schema.maxItems!=null && value.length>schema.maxItems){return cb('maxItems');}
			if(schema.prefixItems!=null){
				if(schema.prefixItems.some((itemSchema,index)=>value[index]!==undefined && test(value[index],itemSchema,rootSchema,params)!==true)){return cb('prefixItems');}
			}
			if(schema.contains!=null){
				const matchedItems=value.filter((item)=>test(item,schema.contain,rootSchema,params)!==true);
				if(matchedItems.length===0){return cb('contains');}
				if(schema.minContains!=null && matchedItems.length<schema.minContains){return cb('minContains');}
				if(schema.maxContains!=null && matchedItems.length>schema.maxContains){return cb('maxContains');}
			}
			if(schema.uniqueItems!=null && schema.uniqueItems===true){
				if(value.slice(0,-1).some((item,index)=>value.indexOf(item,index+1)!==-1)){return cb('uniqueItems');}
			}
			break;
		}
	}
	if(schema.oneOf!=null){
		const matchedSchemaLength=getMatchedSchemas(value,schema.oneOf,rootSchema).length;
		if(matchedSchemaLength!==1){return cb('oneOf',{matchedSchemaLength});}
	}
	if(schema.anyOf!=null){
		if(schema.anyOf.every((subSchema)=>test(value,subSchema,rootSchema)!==true)){return cb('anyOf');}
	}
	//@todo implement validation for mergedSchema
	if(schema.allOf!=null){
		for(let subSchema of schema.allOf){
			const result=test(value,subSchema,rootSchema,params);
			if(result!==true){return result;}
		}
	}
	return true;
}