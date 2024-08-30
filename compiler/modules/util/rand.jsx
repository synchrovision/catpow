export const srand=(w=88675123)=>{
	var x=123456789,y=362436069,z=521288629;
	return function(){
		let t;
		t=x^(x<<11);
		[x,y,z]=[y,z,w];
		w=(w^(w>>>19))^(t^(t>>>8));
		if(arguments.length===0){return w;}
		if(arguments.length===1){return w%(arguments[0]+1);}
		const [min,max]=arguments;
		return min+Math.abs(w)%(max+1-min);
	}
};