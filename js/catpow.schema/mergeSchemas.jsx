/* global Catpow console Map WeakMap */

import {mergeSchema} from './mergeSchema.jsx';

export const mergeSchemas=(schemas,rootSchema,params={})=>{
	const mergedSchema={};
	schemas.forEach((schema)=>mergeSchema(mergedSchema,schema,rootSchema,params));
	if(mergedSchema.properties!=null){
		const sortedProperties={};
		Object.keys(mergedSchema.properties).sort((key1,key2)=>{
			return (mergedSchema.properties[key1].order || 10) - (mergedSchema.properties[key2].order || 10);
		}).forEach((key)=>{
			sortedProperties[key]=mergedSchema.properties[key];
		});
		mergedSchema.properties=sortedProperties;
		console.log({mergedSchema,sortedProperties});
	}
	console.log({mergedSchema});
	return mergedSchema;
}