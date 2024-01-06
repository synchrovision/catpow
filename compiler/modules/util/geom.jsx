export const perspective=(x,y,z)=>{
	const m=new WeakMap();
	let s=0;
	const rf=(op,ip)=>{
		const c=oz/(ip.z+f.z);
		op.x=f.x+(ip.x-f.x)*c;
		op.y=f.y+(ip.y-f.y)*c;
		op.prevX=ip.x;
		op.prevY=ip.y;
		op.prevZ=ip.z;
		op.prevS=s;
		return op;
	};
	const f=(ip)=>{
		if(!m.has(ip)){
			return m.set(ip,rf({},ip)).get(ip);
		}
		const op=m.get(ip);
		return op;
	};
	f.update=(x,y,z)=>{
		if(Number.isFinite(x)){f.x=x;}
		if(Number.isFinite(y)){f.y=y;}
		if(Number.isFinite(z)){f.z=z;}
		s++;
	}
	f.x=x,f.y=y,f.z=z;
	return f;
};

export const preserveDistances=(w,c)=>{
	const r=[...Array(w).keys()];
	return r.map((y)=>r.map((x)=>c?Math.round(Math.hypot(x,y)*c):Math.hypot(x,y)));
};
export const preserveDerections=(w)=>{
	return preserveDistances.map((r,y)=>r.map((d,x)=>({x:x/d,y:y/d})));
};