/* global Catpow console Map WeakMap */

import {getErrorMessageFormat} from './getErrorMessageFormat.jsx';

export const getErrorMessage=(params)=>{
	const format=getErrorMessageFormat(params);
	if(format==null){return null;}
	return format.replace(/{\w+}/g,(matches)=>{
		const key=matches.slice(1,-1);
		if(params[key]!=null){return params[key];}
		if(params.schema[key]!=null){return params.schema[key];}
		return matches;
	});
}