export const Star=(props)=>{
	const {className='cp-svg-star',n=5,x=100,y=100,r1=100,r2=50,fill='black',stroke="none",...otherProps}=props;
	const {useMemo}=wp.element;
	
	const d=useMemo(()=>{
		let i,rad;
		const step=Math.PI/n,ps=[];
		for(i=0;i<n;i++){
			rad=Math.PI+step*i*2;
			ps.push([r1*Math.sin(rad),r1*Math.cos(rad)]);
			ps.push([r2*Math.sin(rad+step),r2*Math.cos(rad+step)]);
		}
		for(i=ps.length-1;i>0;i--){
			ps[i][0]-=ps[i-1][0];
			ps[i][1]-=ps[i-1][1];
		}
		return 'm '+ps.map((p)=>p.join(',')).join(' l ')+' z';
	},[n,r1,r2]);
	
	
	return (
		<path className={className} d={`M ${x},${y} ${d}`} fill={fill} stroke={stroke} {...otherProps}/>
	);
}