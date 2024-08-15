export const RawNode=(props)=>{
	const {useEffect,useRef}=wp.element;
	const {className='cp-rawnode'}=props;
	const ref=useRef();
	
	useEffect(()=>{
		if(props.node.forEach){
			props.node.forEach((node)=>ref.current.appendChild(node));
		}
		else{
			ref.current.appendChild(props.node);
		}
		
	},[ref.current,props.node]);
	
	return (
		<div className={className} ref={ref}>
			{props.children}
		</div>
	);
}