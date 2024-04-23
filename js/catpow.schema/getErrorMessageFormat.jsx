/* global Catpow console Map WeakMap */

export const getErrorMessageFormat=(params)=>{
	const {invalidBy,schema}=params;
	if(schema.message!=null){return schema.message;}
	switch(invalidBy){
		case 'type':return '入力値の型が一致しません';
		case 'minimum':return schema.exclusiveMinimum?'{minimum}より大きい数値を入力してください':'{minimum}以上の数値を入力してください';
		case 'exclusiveMinimum':return '{exclusiveMinimum}より大きい数値を入力してください';
		case 'maximum':return schema.exclusiveMaximum?'{maximum}より小さい数値を入力してください':'{maximum}以下の数値を入力してください';
		case 'exclusiveMaximum':return '{exclusiveMaximum}より小さい数値を入力してください';
		case 'multipleOf':return '{multipleOf}の倍数で入力してください';
		case 'pattern':return '入力形式が一致しません';
		case 'minLength':return '{minLength}文字以上で入力してください';
		case 'maxLength':return '{maxLength}文字以下で入力してください';
		case 'required':
		case 'dependentRequired':return '入力してください';
		case 'additionalProperties':return '規定のプロパティ以外入力できません';
		case 'minProperties':return '{minProperties}以上のプロパティを入力してください';
		case 'maxProperties':return '{maxProperties}以下のプロパティを入力してください';
		case 'minItems':return '{minItems}以上のアイテムを入力してください';
		case 'maxItems':return '{maxItems}以下のアイテムを入力してください';
		case 'contains':return '規定の形式のアイテムを含めてください';
		case 'minContains':return '規定の形式のアイテムを{maxItems}以上含めてください';
		case 'maxContains':return '規定の形式のアイテムは{maxContains}以下にしてください';
		case 'uniqueItems':return '値が重複しています';
		case 'oneOf':return params.matchedSchemaLength>1?'複数の入力規則に一致しています':'一致する入力規則がありません';
		case 'anyOf':return '一致する入力規則がありません';
	}
	return null;
}