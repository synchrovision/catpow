/* global Catpow console Map WeakMap */

import {reservedKeys,minMaxKeys} from './consts.jsx';
import {getMergedSchemaForValue} from './getMergedSchemaForValue.jsx';
import {getMergedSchema} from './getMergedSchema.jsx';
import {getMatchedSchemas} from './getMatchedSchemas.jsx';
import {extractDependencies} from './extractDependencies.jsx';

export const mergeSchema=(targetSchema,schema,rootSchema,params={})=>{
	const {extend=false,initialize=true,value=null}=params;
	const forValue=params.hasOwnProperty('value');
	const includeConditional=forValue || params.includeConditional;
	for(let key in schema){
		if(!reservedKeys[key] && targetSchema[key]==null){
			targetSchema[key]=schema[key];
		}
	}
	//scalar
	if(schema.const!=null){
		if(extend){
			if(targetSchema.enum!=null){
				if(!targetSchema.enum){targetSchema.enum=[];}
				if(!targetSchema.enum.includes(schema.const)){
					targetSchema.enum.push(schema.const);
				}
			}
			else if(initialize){
				targetSchema.const=schema.const;
			}
		}
		else{
			targetSchema.const=schema.const;
		}
	}
	else{
		if(extend && targetSchema.const!=null){
			targetSchema.const=null;
		}
		if(schema.enum!=null){
			if(extend){
				if(targetSchema.enum==null){
					if(targetSchema.const!=null){
						targetSchema.enum=schema.enum.slice();
						if(!targetSchema.enum.includes(targetSchema.cons)){
							targetSchema.enum.push(targetSchema.const);
						}
						targetSchema.const=null;
					}
					else if(initialize){
						targetSchema.enum=schema.enum.slice();
					}
				}
				else{
					targetSchema.enum.push.apply(
						targetSchema.enum,schema.enum.filter((val)=>!targetSchema.enum.includes(val))
					);
				}
			}
			else{
				if(targetSchema.enum==null){targetSchema.enum=schema.enum.slice();}
				else{targetSchema.enum=targetSchema.enum.filter((val)=>schema.enum.includes(val));}
			}
		}
		else if(extend && targetSchema.enum!=null){
			targetSchema.enum=null;
		}
	 }

	//min max
	for(let key in minMaxKeys){
		if(schema[key]!=null){
			if(targetSchema[key]!=null){
				targetSchema[key]=Math[minMaxKeys[key]==extend?'max':'min'](targetSchema[key],schema[key]);
			}
			else{
				if(initialize){targetSchema[key]=schema[key];}
			}
		}
		else if(extend && targetSchema[key]!=null){
			targetSchema[key]=null;
		}
	}

	//object
	if(schema.required!=null){
		if(extend){
			if(targetSchema.required!==null){
				if(targetSchema.required==null){targetSchema.required=schema.required.slice();}
				else{targetSchema.required=targetSchema.required.filter((val)=>schema.required.includes(val));}
			}
		}
		else{
			if(targetSchema.required==null){targetSchema.required=schema.required.slice();}
			else{
				targetSchema.required.push.apply(
					targetSchema.required,schema.required.filter((val)=>!targetSchema.required.includes(val))
				);
			}
		}
	}
	else if(extend && targetSchema.required!=null){
		targetSchema.required=null;
	}
	if(schema.properties!=null){
		if(targetSchema.properties==null){targetSchema.properties={}}
		for(let key in schema.properties){
			const propParams=Object.assign({},params);
			if(forValue){propParams.value=propParams.value[key];}
			if(targetSchema.properties[key]!=null){
				mergeSchema(targetSchema.properties[key],schema.properties[key],rootSchema,propParams);
			}
			else{
				const propSchema={};
				mergeSchema(propSchema,schema.properties[key],rootSchema,propParams);
				targetSchema.properties[key]=propSchema;
			}
		}
	}

	//array
	if(schema.items!=null){
		if(targetSchema.items==null){
			targetSchema.items=getMergedSchema(schema.items,rootSchema);
			if(forValue && value!=null){
				targetSchema.itemsForValue=[];
				for(let i in value){
					targetSchema.itemsForValue.push(
						getMergedSchemaForValue(value[i],schema.items,rootSchema)
					)
				}
			}
		}
	}
	
	//conditional
	if(!includeConditional){return targetSchema;}
	const conditionalSchemas=[];
	if(schema.oneOf!=null){
		conditionalSchemas.push.apply(
			conditionalSchemas,
			forValue?getMatchedSchemas(value,schema.oneOf,rootSchema,{ignoreRequired:true}):schema.oneOf
		);
	}
	if(schema.anyOf!=null){
		conditionalSchemas.push.apply(
			conditionalSchemas,
			forValue?getMatchedSchemas(value,schema.anyOf,rootSchema,{ignoreRequired:true}):schema.anyOf
		);
	}
	const {dependentSchemas}=extractDependencies(schema);
	if(dependentSchemas!=null){
		if(forValue){
			for(let key in dependentSchemas){
				if(value[key]!=null){conditionalSchemas.push(dependentSchemas[key]);}
			}
		}
		else{
			conditionalSchemas.push.apply(
				conditionalSchemas,
				Object.values(dependentSchemas)
			);
		}
	}
	if(conditionalSchemas.length){
		const mergedConditionalSchema={};
		for(let i in conditionalSchemas){
			if(forValue){
				mergeSchema(
					mergedConditionalSchema,
					getMergedSchemaForValue(value,conditionalSchemas[i],rootSchema),
					rootSchema,
					{extend:true,value}
				);
			}
			else{
				mergeSchema(
					mergedConditionalSchema,
					getMergedSchemaForValue(value,conditionalSchemas[i],rootSchema),
					rootSchema,
					{extend:true}
				);
			}
		}
		mergeSchema(targetSchema,conditionalSchemas[i],rootSchema,params);
	}
	return targetSchema;
}