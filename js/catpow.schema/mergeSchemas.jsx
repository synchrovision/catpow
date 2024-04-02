/* global Catpow console Map WeakMap */

import {mergeSchema} from './mergeSchema.jsx';

export const mergeSchemas=(schemas,rootSchema,params={})=>{
	const mergedSchema=Object.assign({},schemas[0]);
	schemas.slice(1).forEach((schema)=>mergeSchema(mergedSchema,schema,rootSchema,params));
	return mergedSchema;
}