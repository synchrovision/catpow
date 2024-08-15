import {flagsToWords} from 'util';

export const ScrollSpy=(props)=>{
	const {useState,useCallback,useEffect,useRef,useReducer}=wp.element;
	const {className='cp-scrollspy'}=props;
	const ref=useRef();
	
	const [flags,updateFlags]=useReducer((flags,action)=>{
		return {...flags,...action};
	},{[className]:true});
	
	useEffect(()=>{
		const observer=new IntersectionObserver((entries,observer)=>{
			entries.forEach((entry)=>{
				updateFlags({
					"-visible":entry.isIntersecting,
					"-appear":entry.intersectionRatio>0.9
				});
			});
		},{
			threshold:[0,0.1,0.9,1]
		});
		observer.observe(ref.current);
		return ()=>observer.disconnect();
	},[ref.current,flags.current]);
	
	return (
		<div className={flagsToWords(flags)} ref={ref}>
			{props.children}
		</div>
	);
}