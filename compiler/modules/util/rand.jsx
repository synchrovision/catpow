export const srand=(w=88675123)=>{
	var x=123456789,y=362436069,z=521288629;
	return (min,max)=>{
		let t;
		t=x^(x<<11);
		[x,y,z]=[y,z,w];
		w=(w^(w>>>19))^(t^(t>>>8));
		return min+Math.abs(w)%(max+1-min);
	}
};