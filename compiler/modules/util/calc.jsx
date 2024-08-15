export const dataSizeStringToInt=(sizeString)=>{
	const matches=sizeString.match(/(\d[\d,]*(?:\.\d+)?)([KMG])B/i);
	if(matches){
		return parseInt(matches[1]*{'K':1<<10,'M':1<<20,'G':1<<30}[matches[2]]);
	}
	return parseInt(sizeString);
}
export const intToDataSizeString=(sizeInt)=>{
	let grade=0;
	while(sizeInt>1000){
		sizeInt/=1024;
		grade++;
	}
	return Math.round(sizeInt*10)/10+['byte','KB','MB','GB','TB','PB'][grade];
}