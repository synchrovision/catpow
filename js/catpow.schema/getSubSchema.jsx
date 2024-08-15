/* global Catpow console Map WeakMap */

export const getSubSchema=(path,schema,rootSchema)=>{
	let keys=path.split('/');
	if(keys[0]==='#'){
		keys.shift();
		schema=rootSchema;
	}
	keys.every((key)=>{
		if(!schema.hasOwnProperty(key)){
			schema=null;
			return false;
		}
		schema=schema[key];
		return true
	});
	return schema;
}