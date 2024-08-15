export const waveFromBase36=(s)=>{
	const ns=s.replace(' ','').split('').map((c)=>parseInt(c,36));
	const ws=ns.map((n)=>({t:n&1,a:Math.pow((n>>1&3)+1,2),f:Math.pow((n>>3)+1,2)})).reduce((pv,cv)=>{
		if(pv.length===0 || ((pv[0].a^cv.a)&3)===3){pv.unshift(cv);return pv;}
		pv[0].t=(pv[0].t+cv.t)/2;
		pv[0].a=(pv[0].a+cv.a & 31)+1;
		pv[0].f=(pv[0].f+cv.f & 31)+1;
		return pv;
	},[]);
	const l=ws.length;
	const c=1/l/32;
	return (p)=>ws.reduce((pv,w)=>pv+(Math.abs((p+w.t)*w.f%4-2)-1)*w.a,0)*c;
}
export const sinWave=(a,f)=>{
	return (p)=>Math.sin(p*Math.PI*f)*a;
}