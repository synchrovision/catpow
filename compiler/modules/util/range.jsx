export const range=function*(start,end,step=1){
	if(arguments.length===1){end=start;start=0;}
	for(let i=start;i<=end;i+=step){yield i;}
};