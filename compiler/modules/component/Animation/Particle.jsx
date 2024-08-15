import {Animation} from 'component';
import {preserveAnimationValues} from 'util';

export const Particle=(props)=>{
	const {className='cp-particle',dur=200,speed=100,gravity=1,amount=20,children}=props;
	const {useMemo,useRef,useCallback,useEffect,useContext}=wp.element;
	const frames=useContext(Animation.Frames);
	const screen=useContext(Animation.Screen);
	const cache=useRef({parts:[]});
	
	const parseSeed=useCallback((seed)=>{
		
	},[]);
	const partStyles=useMemo(()=>{
		
	},[props.partStyleCallback,dur]);
	
	const initPart=useMemo(()=>{
		return (part)=>{
			part.p=0;
			part.ax=ax;
			part.ay=ay;
			part.az=az;
			part.tx=part.ax;
			part.ty=part.ay;
			part.tz=part.az;
			part.x=part.tx;
			part.y=part.ty;
			part.z=part.tz;
			return part;
		};
	},[dur,speed,gravity]);
	
	const updatePart=useMemo(()=>{
		const updateTrans=(part)=>{
			part.tx+=part.ax;
			part.ty+=part.ay;
			part.tz+=part.az;
		}
		const updatePos=(part)=>{
			part.x+=part.tx;
			part.y+=part.ty;
			part.z+=part.tz;
		}
		const updateCss=(part)=>{
			part.css=partStyles[part.progress];
			part.css.transform=`translate(${part.x}px,${part.y}px,${part.z}px)`;
		}
		if(gravity){
			return (part)=>{
				updateTrans(part);
				updatePos(part);
			};
		}
		return (part)=>{
			
		};
	},[partStyles]);
	const parts=useMemo(()=>{
		if(cache.current.parts.length !== amount){
			cache.current.parts=[...Array(amount).keys()].map((index)=>initPart({index}));
		}
		cache.current.parts.forEach((part)=>{
			
		});
		return cache.current.parts;
	},[frames.frame,children.length,amount]);
	const classes=useMemo(()=>bem(className),[className]);
	
	
	return (
		<div className={classes()} >
			{parts.map(({index})=>(
				<div className={classes._part()} style={part.css}>{children[part.index]}</div>
			))}
		</div>
	);
}