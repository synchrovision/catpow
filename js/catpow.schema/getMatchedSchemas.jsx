/* global Catpow console Map WeakMap */

import {test} from './test.jsx';

export const getMatchedSchemas=(value,schemas,rootSchema,params)=>{
	return schemas.filter((schema)=>test(value,schema,rootSchema,params));
}