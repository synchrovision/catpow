import {SelectiveClassConfig} from './SelectiveClassConfig';

export type SelectiveClassPanelProps={
	title?:string,
	icon?:string,
	set?:Function,
	attr?:{[key:string]:any},
	items:object[],
	index:number,
	selectiveClasses:SelectiveClassConfig[],
	triggerClasses:SelectiveClassConfig
}