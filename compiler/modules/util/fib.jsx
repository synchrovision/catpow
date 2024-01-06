const cache=[0,1,1];
export const fib=(n)=>{
	if(undefined!==cache[n]){return cache[n];}
	return cache[n-2]+cache[n-1];
};