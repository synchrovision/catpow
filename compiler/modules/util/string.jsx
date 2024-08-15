export const nl2br=(text)=>{
	return text.split(/(\n)/).map((line,index)=>line==="\n"?<br/>:line);
};
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