/* global Catpow console Map WeakMap */

import {getType} from './getType.jsx';
import {getSubSchema} from './getSubSchema.jsx';

const cache=new WeakMap();

export const getResolvedSchema=(schema,rootSchema)=>{
	if(rootSchema==null){rootSchema=schema;}
	if(cache.has(schema)){return cache.get(schema);}
	let resolvedSchema;
	if(schema.hasOwnProperty('$ref')){
		resolvedSchema=Object.assign({},
			getResolvedSchema(
				getSubSchema(schema.$ref,schema,rootSchema),
				rootSchema
			),
			schema
		);
	}
	else{
		resolvedSchema=Object.assign({},schema);
	}
	if(resolvedSchema.type==null){
		resolvedSchema.type=getType(resolvedSchema,rootSchema);
	}
	cache.set(schema,resolvedSchema);
	return resolvedSchema;
}