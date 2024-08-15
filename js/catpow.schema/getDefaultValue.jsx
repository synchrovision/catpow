/* global Catpow console Map WeakMap */

import {getType} from './getType.jsx';
import {getResolvedSchema} from './getResolvedSchema.jsx';

export const getDefaultValue=(schema,rootSchema)=>{
	const type=getType(schema,rootSchema);
	schema=getResolvedSchema(schema,rootSchema);
	if(schema.default!=null){return schema.default;}
	if(schema.const!=null){return schema.const;}
	if(schema.enum!=null){return schema.enum[0];}
	switch(type){
		case 'null':{return null;}
		case 'boolean':{return false;}
		case 'integer':
		case 'number':{
			if(schema.minimum!=null){
				const unit=schema.multipleOf!=null?schema.multipleOf:1;
				if(schema.exclusiveMinimum === true){
					return schema.minimum+unit;
				}
				return schema.minimum;
			}
			if(schema.exclusiveMinimum!=null){
				return schema.exclusiveMinimum+unit;
			}  
			return 0;
		}
		case 'string':{
			return '';
		}
	}
	return null;
}