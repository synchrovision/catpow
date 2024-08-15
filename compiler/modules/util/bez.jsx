export const bez=(ns,t)=>{
	var p=0,n=ns.length-1,i;
	p+=ns[0]*Math.pow((1-t),n)
	for(i=1;i<n;i++){
		p+=ns[i]*Math.pow((1-t),n-i)*Math.pow(t,i)*n;
	}
	p+=ns[n]*Math.pow(t,n);
	return p;
};