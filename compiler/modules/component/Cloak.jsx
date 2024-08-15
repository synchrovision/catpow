import {bem} from 'util';

export const Cloak=(props)=>{
	const {className='cp-cloak',onComplete}=props;
	const {useMemo,useState,useRef,useEffect,useCallback,forwardRef}=wp.element;
	const classes=useMemo(()=>bem(className));
	
	const ref=useRef({});
	
	const isEntry=useMemo(()=>{
		return !document.referrer.includes(document.location.host);
	},[]);
	const [phase,setPhase]=useState('init');
	
	useEffect(()=>{
		if(phase==='complete'){
			if(onComplete){onComplete();}
			return;
		}
		const forwardPhase=()=>{
			const phases=['init','entry','start','loading','complete'];
			setPhase(phases[phases.indexOf(phase)+1]);
		};
		const forwardPhaseIfGetNoAnimation=()=>{
			window.requestAnimationFrame(()=>{
				if(ref.current.getAnimations().length<1){
					forwardPhase();
				}
			});
		};
		if(phase==='init'){
			window.requestAnimationFrame(()=>{
				setPhase(isEntry?'entry':'start');
			});
			return;
		}
		if(phase==='loading'){
			const forwardPhaseIfLoaded=()=>{
				if(document.readyState==='complete'){
					forwardPhase();
					return true;
				}
				return false;
			};
			const observeReadyStateEveryFrames=()=>{
				if(!forwardPhaseIfLoaded()){
					window.requestAnimationFrame(observeReadyStateEveryFrames);
				}
			}
			ref.current.addEventListener('animationiteration',forwardPhaseIfLoaded);
			window.requestAnimationFrame(()=>{
				if(ref.current.getAnimations().length<1){
					observeReadyStateEveryFrames();
				}
			});
			return ()=>{
				ref.current.removeEventListener('animationiteration',forwardPhaseIfLoaded);
			};
		}
		ref.current.addEventListener('transitionend',forwardPhase);
		ref.current.addEventListener('animationend',forwardPhase);
		forwardPhaseIfGetNoAnimation();
		return ()=>{
			ref.current.removeEventListener('transitionend',forwardPhase);
			ref.current.removeEventListener('animationend',forwardPhase);
		};
	},[phase]);
	
	return (
		<div className={classes('is-'+phase)}>
			<div className={classes.timer()} ref={ref}></div>
			{props.children}
		</div>
	);
}