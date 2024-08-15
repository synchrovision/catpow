export const Animation=(props)=>{
	const {className="cp-animation"}=props
	const {useState,useMemo,useCallback,useEffect,useRef,useReducer}=wp.element;
	
	const ref=useRef({});
	const [time,setTime]=useState(0);
	const [frame,setFrame]=useState(0);
	const [originX,setOriginX]=useState(0);
	const [originY,setOriginY]=useState(0);
	const [touchX,setTouchX]=useState(0);
	const [touchY,setTouchY]=useState(0);
	const [press,setPress]=useState(false);
	const [width,setWidth]=useState(0);
	const [height,setHeight]=useState(0);
	
	const {Perspective,Touches,Frames,Screen}=useMemo(()=>{
		['Perspective','Touches','Frames','Screen'].forEach((contextName)=>{
			if(undefined===Animation[contextName]){
				Animation[contextName]=wp.element.createContext({});
			}
		});
		return Animation;
	},[]);
	
	useEffect(()=>{
		var touch={clientX:0,clientY:0},isPressed=false;
		const tick=(t)=>{
			const bnd=ref.current.getBoundingClientRect();
			setFrame((t>>4)&0xFFFF);
			setOriginX(bnd.width>>1);
			setOriginY((window.innerHeight>>1)-bnd.top);
			setTouchX(touch.clientX-bnd.left);
			setTouchY(touch.clientY-bnd.top);
			setPress(isPressed);
			setWidth(bnd.width);
			setHeight(bnd.height);
			window.requestAnimationFrame(tick);
		};
		const handleTouch=(e)=>{
			touch=e.changedTouches[0];
			isPressed=e.type!=='touchend';
		}
		const handleMouse=(e)=>{
			touch=e;
			if(e.type==='mousedown'){isPressed=true;}
			else if(e.type=='mouseup' || e.type=='mouseleave'){isPressed=false;}
		}
		ref.current.addEventListener('touchStart',handleTouch);
		ref.current.addEventListener('touchMove',handleTouch);
		ref.current.addEventListener('touchEnd',handleTouch);
		ref.current.addEventListener('mousedown',handleMouse);
		ref.current.addEventListener('mousemove',handleMouse);
		ref.current.addEventListener('mouseup',handleMouse);
		ref.current.addEventListener('mouseleave',handleMouse);
		window.requestAnimationFrame(tick);
	},[ref.current]);
	const perspective=useMemo(()=>({x:originX,y:originY}),[originX,originY]);
	const touches=useMemo(()=>({x:touchX,y:touchY,press}),[touchX,touchY,press]);
	const screen=useMemo(()=>({width,height}),[width,height]);
	
	return (
		<Animation.Perspective.Provider value={perspective}>
			<Animation.Touches.Provider value={touches}>
				<Animation.Frames.Provider value={{frame}}>
					<Animation.Screen.Provider value={screen}>
						<div className={className} ref={ref}>
							{props.children}
						</div>
					</Animation.Screen.Provider>
				</Animation.Frames.Provider>
			</Animation.Touches.Provider>
		</Animation.Perspective.Provider>
	);
}