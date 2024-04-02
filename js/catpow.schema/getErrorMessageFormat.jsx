/* global Catpow console Map WeakMap */

export const getErrorMessageFormat=(key,schema)=>{
	if(schema.message!=null){return schema.message;}
	
	if(schema.minimum!=null || schema.maximum!=null){
		let message='';
		if(schema.minimum!=null){
			message+=schema.minimum+(schema.exclusiveMinimum?'超':'以上');
		}
		if(schema.maximum!=null){
			message+=schema.maximum+(schema.exclusiveMaximum?'未満':'以下');
		}
		message+='の数値を入力してください';
		return message;
	}
	if(schema.exclusiveMinimum!=null || schema.exclusiveMaximum!=null){
		let message='';
		if(schema.exclusiveMinimum!=null){message+=schema.exclusiveMinimum+'超';}
		if(schema.exclusiveMaximum!=null){message+=schema.exclusiveMinimum+'未満';}
		message+='の数値を入力してください';
		return message;
	}
}