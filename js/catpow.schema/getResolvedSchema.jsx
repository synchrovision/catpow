/* global Catpow console Map WeakMap */

import {getType} from './getType.jsx';
import {getSubSchema} from './getSubSchema.jsx';

const cache=new WeakMap();

export const getResolvedSchema=(schema,rootSchema)=>{
	if(schema==null){return {};}
	if(rootSchema==null){rootSchema=schema;}
	if(cache.has(schema)){return cache.get(schema);}
	const resolvedSchema={};
	const {properties=null,items=null,...otherParams}=schema;
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
	if(items!=null){
		if(resolvedSchema.items){
			const {properties:itemsProperties=null,...otherItemsParams}=items;
			if(itemsProperties!=null){
				resolvedSchema.items.properties=Object.assign({},resolvedSchema.items.properties || {},itemsProperties);
			}
			Object.assign(resolvedSchema.items,otherItemsParams);
		}
		else{
			resolvedSchema.items=items;
		}
	}
	if(properties!=null){
		if(resolvedSchema.properties==null){resolvedSchema.properties={};}
		resolvedSchema.properties=Object.assign({},resolvedSchema.properties,properties);
	}
	Object.assign(resolvedSchema,otherParams);
	if(resolvedSchema.type==null){
		resolvedSchema.type=getType(resolvedSchema,rootSchema);
	}
	cache.set(schema,resolvedSchema);
	return resolvedSchema;
}