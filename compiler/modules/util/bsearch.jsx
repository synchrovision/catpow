export const bsearch=(arr,val)=>{
	let l=0,r=arr.length-1;
	if(arr[0]>val){return -1;}
	if(arr[r]<val){return r+1;}
	while(l<=r){
		let m=l+((r-l)>>1);
		if(arr[m]===val){return m;}
		if(arr[m]>val){r=m-1;}
		else{l=m+1;}
	}
	return m;
};