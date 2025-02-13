
export type CatpowBlockConfig={
	devices?:('sp'|'tb'|'pc')[],
	imageKeys?:{
		[key:string]:{src:string,srcset?:string,sources?:string,alt:string,code?:string,items?:string}
	},
	imageSizes?:{
		[key:string]:string
	}
};