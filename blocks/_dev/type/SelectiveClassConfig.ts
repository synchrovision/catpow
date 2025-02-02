import { selectiveClassesPresets } from "../../_init/init/selectiveClassesPresets";

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
	devices?:string[],
	cond?:string,
	min?:number,
	max?:number,
	item?:SubSelectiveClassConfig,
	sub?:SubSelectiveClassConfig
} | 'color'|'pattern'|'cond'|'event'| keyof typeof selectiveClassesPresets;
type SubSelectiveClassConfig={
	[key:string]:SelectiveClassConfig[]
} | SelectiveClassConfig[];
