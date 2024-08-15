/* global Catpow console Map WeakMap */

import {find} from './find.jsx';
import {mergeSchema} from './mergeSchema.jsx';

export const getMergedSchemaForValue=(value,schema,rootSchema)=>{
	if(rootSchema==null){rootSchema=schema;}
	const mergedSchema={}
	find((schema)=>{
		mergeSchema(mergedSchema,schema,rootSchema,{extend:false,value});
	},schema,rootSchema,{proactive:false});
	return mergedSchema;
}