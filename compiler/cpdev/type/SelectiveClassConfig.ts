import { selectiveClassesPresets } from "blocks/_init/init/selectiveClassesPresets.jsx";

export type SelectiveClassConfig={
	name?:string,
	label?:string,
	type?:'radio'|'buttons'|'gridbuttons',
	input?:'select'|'buttons'|'gridbuttons'|'bool'|'range'|'text'|'textarea'|'dataset'|'customColorVars'|'blendmode'|'image'|'picture'|'position'|'icon'|'symbol'|'flag'|'color'|'colors'|'gradient'|'border'|'pattern'|'frame',
	filter?:string,
	values?:string | (string[]) | {[key:string]:number | string},
	bind?:{[key:string]:string[]},
	key?:string,
	keys?:{[key:string]:string},
	vars?:string,
	devices?:string[],
	cond?:string | string[] | boolean | ((states:object,props:object)=>boolean),
	min?:number,
	max?:number,
	step?:number,
	sub?:SubSelectiveClassConfig,
	isTemplate?:boolean
} | 'color'|'pattern'|'cond'|'event'| keyof typeof selectiveClassesPresets;
type SubSelectiveClassConfig={
	[key:string]:SelectiveClassConfig[]
} | SelectiveClassConfig[];
