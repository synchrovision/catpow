/* global Catpow console Map WeakMap */

import {extractDependencies} from './extractDependencies.jsx';
import {getSubSchema} from './getSubSchema.jsx';

export const find=(callback,schema,rootSchema,params={})=>{
	if(schema==null){return null}
	const result=callback(schema,rootSchema);
	if(result!=null){return result;}
	if(!params.refStack!=null){params.refStack=new WeakMap();}
	if(params.refStack.has(schema)){return null;}
	params.refStack.set(schema,true);
	if(schema.allOf!=null){
		for(let i in schema.allOf){
			const result=find(callback,schema.allOf[i],rootSchema,params);
			if(result!=null){return result;}
		}
	}
	if(params.proactive){
		if(schema.anyOf!=null){
			for(let i in schema.anyOf){
				const result=find(callback,schema.anyOf[i],rootSchema,params);
				if(result!=null){return result;}
			}
		}
		if(schema.oneOf!=null){
			for(let i in schema.oneOf){
				const result=find(callback,schema.oneOf[i],rootSchema,params);
				if(result!=null){return result;}
			}
		}
		for(let key in ['if','then','else']){
			if(schema[key]==null){break;}
			const result=find(callback,schema[key],rootSchema,params);
			if(result!=null){return result;}
		}
		const {dependentSchemas}=extractDependencies(schema);
		if(dependentSchemas){
			for(let i in dependentSchemas){
				const result=find(callback,dependentSchemas[i],rootSchema,params);
				if(result!=null){return result;}
			}
		}
	}
	if(schema['$ref']!=null){
		const refSchema=getSubSchema(schema.$ref,schema,rootSchema);
		const result=find(callback,refSchema,rootSchema,params);
		if(result!=null){return result;}
	}
	return null;
}