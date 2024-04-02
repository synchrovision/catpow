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
		case 'number':{
			if(type==='intger' && !Number.isInteger(value)){value=parseInt(value);}
			if(schema.minimum!=null && value<schema.minimum){value=schema.minimum;}
			if(schema.maximum!=null && value>schema.maximum){value=schema.maximum;}
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
		}
	}
	return value;
}