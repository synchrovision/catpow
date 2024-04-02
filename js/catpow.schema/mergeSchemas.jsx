/* global Catpow console Map WeakMap */

import {mergeSchema} from './mergeSchema.jsx';

export const mergeSchemas=(schemas,rootSchema,params={})=>{
	const mergedSchema={};
	schemas.forEach((schema)=>mergeSchema(mergedSchema,schema,rootSchema,params));
	return mergedSchema;
}