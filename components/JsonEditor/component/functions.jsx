import * as inputComponents from './inputComponents/index.js';

export const getInputComponentForSchema=(schema)=>{
	if(schema.hasOwnProperty('@type')){
		switch(schema['@type']){
			case 'Icon':return inputComponents.SelectIcon;
			case 'Image':return inputComponents.SelectImage;
			case 'MenuItem':return inputComponents.SelectMenuItem;
			case 'MenuItems':return inputComponents.SelectMenuItems;
		}
	}
	if(schema.type === 'null'){
		return inputComponents.None;
	}
	if(schema.enum){
		if(schema.enum.length<8){return inputComponents.Radio;}
		if(schema.enum.length<64){return inputComponents.Select;}
		return inputComponents.SearchSelect;
	}
	if(schema.type === 'boolean'){
		return inputComponents.Toggle;
	}
	if(schema.type === 'string'){
		if(schema.format){
			switch(schema.format){
				case 'date-time':return inputComponents.DateTime;
				case 'date':return inputComponents.Date;
				case 'time':return inputComponents.Time;
				case 'duration':return inputComponents.Duration;
				default:return inputComponents.Text;
			}
		}
		if(
			schema.hasOwnProperty('pattern') ||
			schema.hasOwnProperty('maxLength') && schema.maxLength< 32
		){
		   return inputComponents.Text;
		}
		return inputComponents.Textarea;
	}
	if(schema.type === 'integer' || schema.type === 'number'){
		if(schema.hasOwnProperty('minimum') && schema.hasOwnProperty('maximum')){
			return inputComponents.Range;
		}
		return inputComponents.Number;
	}
	if(schema.type === 'array'){
		if(schema.items.enum){
			if(schema.items.enum.length<16){return inputComponents.Checkbox;}
			return inputComponents.SearchSelect;
		}
		return inputComponents.ArrayInput;
	}
	if(schema.type === 'object'){
		return inputComponents.ObjectInput;
	}
	return inputComponents.Text;
}