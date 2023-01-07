/**
* 
*/
Catpow.Animation=(props)=>{
	const {useState,useContext,useEffect,useReducer,useRef}=wp.element;
	const {className='Animation'}=props;
	const ref=useRef({pointer:{x:0,y:0},clicked:false,press:false});
	
	const [state,dispatch]=useReducer((state,action)=>{
		switch(action.type){
			case 'tick':
				var clicked=false,bnd=ref.current.getBoundingClientRect();
				if(bnd.top > window.innerHeight || bnd.bottom < 0){return state;}
				if(ref.clicked){var clicked=true;ref.clicked=false;}
				return {
					...state,
					step:state.step+1,
					container:ref.current,
					bnd,
					width:bnd.width,
					height:bnd.height,
					focus:{x:window.innerWidth/2-bnd.left,y:window.innerHeight/2-bnd.top},
					pointer:ref.pointer,
					clicked,
					press:ref.press
				};
		}
		return state;
	},{
		step:0,
		bnd:{},
		width:1920,
		height:1080,
		focus:{},
		pointer:{},
		clicked:false,
		press:false
	});
	useEffect(()=>{
		var requestID;
		const tick=(t)=>{
			requestID=window.requestAnimationFrame(tick);
			dispatch({type:'tick'});
		}
		requestID=window.requestAnimationFrame(tick);
		return ()=>{window.cancelAnimationFrame(requestID);}
	},[props]);
	
	return (
		<Catpow.Animation.Context.Provider value={{state,dispatch}}>
			<div className={className} ref={ref}>{props.children}</div>
		</Catpow.Animation.Context.Provider>
	);
}
Catpow.Animation.Context=wp.element.createContext({});