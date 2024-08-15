/* global Catpow console Map WeakMap */

import {find} from './find.jsx';
import {mergeSchema} from './mergeSchema.jsx';

const cache=new WeakMap();

export const getMergedSchema=(schema,rootSchema)=>{
	if(rootSchema==null){rootSchema=schema;}
	if(cache.has(schema)){return cache.get(schema);}
	const mergedSchema={};
	find((schema)=>{
		mergeSchema(mergedSchema,schema,rootSchema,{extend:false});
	},schema,rootSchema,{proactive:false});
	cache.set(schema,mergedSchema);
	return mergedSchema;
}