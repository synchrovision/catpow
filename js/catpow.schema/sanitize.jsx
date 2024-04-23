/* global Catpow console Map WeakMap */

import {getType} from './getType.jsx';
import {getResolvedSchema} from './getResolvedSchema.jsx';

export const sanitize=(value,schema,rootSchema)=>{
	const type=getType(schema,rootSchema);
	schema=getResolvedSchema(schema,rootSchema);
	if(value == null){return value;}
	if(schema.const!=null && schema.const!==value){return schema.const;}
	if(schema.enum!=null && !schema.enum.includes(value)){return null;}
	switch(type){
		case 'integer':
			if(!Number.isInteger(value)){value=parseInt(value);}
		case 'number':{
			if(typeof value !== 'number'){parseFloat(value);}
			if(schema.minimum!=null && value<schema.minimum){value=schema.minimum;}
			if(schema.maximum!=null && value>schema.maximum){value=schema.maximum;}
			const step=schema.multipleOf || 1;
			if(schema.exclusiveMinimum!=null){
				if(typeof schema.exclusiveMinimum === 'boolean'){
					if(schema.exclusiveMinimum===true && value<=schema.minimum){
						value=schema.minimum+step;
					}
				}
				else{
					if(value<=schema.exclusiveMinimum){
						value=schema.exclusiveMinimum+step;
					}
				}
			}
			if(schema.exclusiveMaximum!=null){
				if(typeof schema.exclusiveMaximum === 'boolean'){
					if(schema.exclusiveMaximum===true && value>=schema.maximum){
						value=schema.maximum-step;
					}
				}
				else{
					if(value<=schema.exclusiveMaximum){
						value=schema.exclusiveMaximum-step;
					}
				}
			}
			break;
		}
		case 'string':{
			if(typeof value !== 'string' && value.toString){return value.toString();}
			break;
		}
		case 'object':{
			if(typeof value !== 'object' || Array.isArray(value)){return {};}
			if(schema.additionalProperties!=null && schema.additionalProperties===false){
				for(let key in value){
					if(!schema.properties.hasOwnProperty(key)){delete value[key];}
				}
			}
			break;
		}
	}
	return value;
}