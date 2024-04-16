/* global Catpow console Map WeakMap */

import {find} from './find.jsx';

export const getType=(schema,rootSchema)=>{
	return find((schema)=>{
		if(schema.type!=null){return schema.type;}
		if(schema.properties!=null){return 'object';}
		if(schema.items!=null || schema.prefixItems!=null){return 'array';}
		if(schema.minimum!=null || schema.maximam!=null || schema.multipleOf!=null){return 'number';}
		if(schema.pattern!=null || schema.minLength!=null || schema.maxLength!=null){return 'string';}
		if(schema.const!=null){return typeof schema.const;}
		if(schema.default!=null){return typeof schema.default;}
		if(schema.enum!=null && schema.enum.length){return typeof schema.enum[0];}
		if(schema['@type']!=null){return 'object';}
	},schema,rootSchema);
}