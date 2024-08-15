export const ComputeLine=(props)=>{
	const {callback,step=100,fill='none',stroke="black",...otherProps}=props;
	const {useMemo}=wp.element;
	
	const d=useMemo(()=>'M '+Array.from({length:step+1},(v,i)=>i+','+callback(i)).join(' L '),[callback,step]);
	
	return (
		<path d={d} fill={fill} stroke={stroke} {...otherProps}/>
	);
}