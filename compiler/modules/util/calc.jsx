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
export const pfloor=(n,p)=>parseFloat(Math.floor(parseFloat(n+'e'+p))+'e-'+p);
export const pround=(n,p)=>parseFloat(Math.round(parseFloat(n+'e'+p))+'e-'+p);
export const pceil=(n,p)=>parseFloat(Math.ceil(parseFloat(n+'e'+p))+'e-'+p);


export const hfloor=(n,p)=>parseFloat(n.toExponential(p).replace(/^(\-?\d\.\d+)/,(m)=>pfloor(m,p-1)));
export const hround=(n,p)=>parseFloat(n.toExponential(p).replace(/^(\-?\d\.\d+)/,(m)=>pround(m,p-1)));
export const hceil=(n,p)=>parseFloat(n.toExponential(p).replace(/^(\-?\d\.\d+)/,(m)=>pceil(m,p-1)));
export const hunit=(n,p)=>parseFloat(n.toExponential(p).replace(/^(\-?\d\.\d+)/,'1.0').replace(/\-?\d+$/,(m)=>1+parseFloat(m)-p));