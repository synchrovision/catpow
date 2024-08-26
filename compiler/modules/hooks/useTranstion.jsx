export const useTranstion=(isInitialActive=false)=>{
	const {useState,useEffect,useRef}=wp.element;
	const [isActive,setIsActive]=useState(isInitialActive);
	const [status,setStatus]=useState({isActive,isInactive:!isActive});
	const ref=useRef();
	useEffect(()=>{
		if(!ref.current){return;}
		if(isActive){
			if(status==='is-inactive'){
				setStatus('is-enter');
				const cb=getTransitionCallback()
				requestAnimationFrame(()=>{
					setStatus('is-active');
				});
			}
		}
		else{
			if(status==='is-active'){
				setStatus('is-leave');
				let stackCount=0;
				const checkTransitionStack=()=>{
					if(stackCount<1){
						removeEventListeners();
						setStatus('is-inactive');
					}
				}
				const onTransitionRun=()=>{
					stackCount++;
					checkTransitionStack();
				};
				const onTransitionEnd=()=>{
					stackCount--;
					checkTransitionStack();
				};
				const timer=setTimeout(checkTransitionStack,100);
				const removeEventListeners=()=>{
					ref.current.removeEventListener('transitionrun',onTransitionRun);
					ref.current.removeEventListener('transitionend',onTransitionEnd);
					ref.current.removeEventListener('transitioncancel',onTransitionEnd);
					clearTimeout(timer);
				}
				ref.current.addEventListener('transitionrun',onTransitionRun);
				ref.current.addEventListener('transitionend',onTransitionEnd);
				ref.current.addEventListener('transitioncancel',onTransitionEnd);
				return removeEventListeners;
			}
		}
		
	},[ref.current,isActive]);
	return [ref,status,setIsActive];
}