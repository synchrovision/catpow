/* global Catpow console Map WeakMap */

import {getErrorMessageFormat} from './getErrorMessageFormat.jsx';

export const getErrorMessage=(key,schema)=>{
	return getErrorMessageFormat(schema).replace(/{\w+}/g,(matches)=>{
		const key=matches.slice(1,-1);
		if(schema[key]!=null){return schema[key];}
		return matches;
	});
}