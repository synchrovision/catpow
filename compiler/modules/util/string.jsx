export const wordsToFlags=(words)=>{
	var rtn={};
	if(undefined === words){return {};}
	words.split(' ').map((word)=>{rtn[word]=true;});
	return rtn;
};
export const flagsToWords=(flags)=>{
	if(undefined === flags){return '';}
	return Object.keys(flags).filter((word)=>flags[word]).join(' ');
};
export const classNamesToFlags=(classNames)=>classNames && classNames.split(' ').map(kebabToCamel).reduce((p,c)=>{p[c]=true;return p},{});
export const flagsToClassNames=(flags)=>flags && Object.keys(flags).filter((f)=>flags[f]).map(camelToKebab).join(' ');

export const camelToKebab=(str)=>str.replace(/(\w)([A-Z])/g,'$1-$2').toLowerCase();
export const camelToSnake=(str)=>str.replace(/(\w)([A-Z])/g,'$1_$2').toLowerCase();
export const kebabToCamel=(str)=>str.replace(/\-(\w)/g,(m)=>m[1].toUpperCase());
export const snakeToCamel=(str)=>str.replace(/_(\w)/g,(m)=>m[1].toUpperCase());