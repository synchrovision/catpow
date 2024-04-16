/* global Catpow console Map WeakMap */

import {getType} from './getType.jsx';
import {getSubSchema} from './getSubSchema.jsx';

const cache=new WeakMap();

export const getResolvedSchema=(schema,rootSchema)=>{
	if(rootSchema==null){rootSchema=schema;}
	if(cache.has(schema)){return cache.get(schema);}
	const resolvedSchema={};
	if(schema.hasOwnProperty('@type')){
		Object.assign(resolvedSchema,
			getResolvedSchema(
				getSubSchema('#/$defs/'+schema['@type'],schema,rootSchema),
				rootSchema
			)
		);
	}
	if(schema.hasOwnProperty('$ref')){
		Object.assign(resolvedSchema,
			getResolvedSchema(
				getSubSchema(schema.$ref,schema,rootSchema),
				rootSchema
			)
		);
	}
	Object.assign(resolvedSchema,schema);
	if(resolvedSchema.type==null){
		resolvedSchema.type=getType(resolvedSchema,rootSchema);
	}
	cache.set(schema,resolvedSchema);
	return resolvedSchema;
}