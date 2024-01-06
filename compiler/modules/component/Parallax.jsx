import {bem} from 'util';

export const Parallax=(props)=>{
	const {useState,useCallback,useEffect,useRef}=wp.element;
	const {className='cp-parallax',minRatio=0.1}=props;
	const [aspect,setAspect]=useState('outer');
	const [distant,setDistant]=useState('outer');
	const ref=useRef();
	
	useEffect(()=>{
		if(!ref.current){return;}
		var c,dc;
		const updateCoef=()=>{
			var wh=window.innerHeight,ch=ref.current.clientHeight,r=Math.abs(ch-wh)/wh;
			if(r<minRatio){
				if(wh>ch){ch=wh*(1-minRatio);}
				else{ch=wh*(1+minRatio);}
			}
			setDistant(r<minRatio?'close':'leave');
			setAspect(wh>ch?'inner':'outer');
			c=1/ch;
			dc=1/(wh-ch);
		};
		window.addEventListener('resize',updateCoef);
		updateCoef();
		const tick=(t)=>{
			if(!ref.current){return;}
			ref.current.style.setProperty('--parallax-p',ref.current.getBoundingClientRect().top*c);
			ref.current.style.setProperty('--parallax-dp',ref.current.getBoundingClientRect().top*dc);
			window.requestAnimationFrame(tick);
		}
		window.requestAnimationFrame(tick);
	},[ref.current,minRatio]);
	const classes=useMemo(()=>bem(className),[className]);
	
	return (
		<div className={classes([`is-`+aspect,'is-'+distant])} ref={ref}>
			{props.children}
		</div>
	);
}