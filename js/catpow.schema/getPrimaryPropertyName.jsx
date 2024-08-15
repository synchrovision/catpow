/* global Catpow console Map WeakMap */

import {getType} from './getType.jsx';
import {getMergedSchema} from './getMergedSchema.jsx';

export const getPrimaryPropertyName=(schema,rootSchema)=>{
	if(getType(schema,rootSchema)!=='object'){return null;}
	const mergedSchema=getMergedSchema(schema,rootSchema);
	if(mergedSchema.properties['@type']!=null){return '@type';}
	return Object.keys(mergedSchema.properties).find((key)=>mergedSchema.properties[key].enum!=null);
}