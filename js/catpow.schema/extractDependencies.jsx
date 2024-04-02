/* global Catpow console Map WeakMap */

export const extractDependencies=(schema)=>{
	if(schema.dependencies!=null){
		if(Array.isArray(Object.values(schema.dependencies)[0])){
			return {dependentRequired:schema.dependencies};
		}
		else{
			return {dependentSchemas:schema.dependencies};
		}
	}
	else{
		const {dependentRequired,dependentSchemas}=schema;
		return {dependentRequired,dependentSchemas};
	}		
}