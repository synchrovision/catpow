import {CP} from './CP.jsx';

CP.BoundingBox=(props)=>{
	const {target,onDeselect,onDuplicate,onChange}=props;
	const {useState,useCallback,useMemo,useEffect,useRef}=wp.element;
	const {bem}=Catpow.util;
	const classes=useMemo(()=>bem('CP-BoundingBox'),[]);
	const ref=useRef();
	const [style,setStyle]=useState({});
	const [action,setAction]=useState(false);
	const container=useMemo(()=>props.container || document,[props.container]);
	
	const tracePosition=useCallback((target)=>{
		setStyle(extractPosition(target));
	},[]);
	const extractPosition=useCallback((target)=>{
		if(!target){return {};}
		const {position,left,top,width,height}=window.getComputedStyle(target);
		return {position,left,top,width,height};
	},[]);
	const getBoundingArray=useCallback((obj)=>[
		parseFloat(obj.left),
		parseFloat(obj.top),
		parseFloat(obj.width),
		parseFloat(obj.height)
	]);
	
	const observer=useMemo(()=>{
		return new MutationObserver(mutations=>{
			mutations.forEach(mutation=>{
				if(mutation.attributeName==="style") {
					tracePosition(mutation.target);
				}
			});
		});
	},[tracePosition]);
	useEffect(()=>{
		if(!target){return false;}
		tracePosition(target);
		observer.observe(target,{attributes:true,attributeFilter:['style']});
		return ()=>observer.disconnect();
	},[target,observer]);
	useEffect(()=>{
		const cb=(e)=>{
			if(!target.contains(e.target) && !ref.current.contains(e.target)){
				onDeselect();
			}
		}
		container.addEventListener('click',cb);
		return ()=>container.removeEventListener('click',cb);
	},[container,onDeselect]);
	
	const controls=useMemo(()=>{
		const controls=[];
		['top','middle','bottom'].forEach((v,vi)=>{
			['left','center','right'].forEach((h,hi)=>{
				const isMove=vi===1 && hi===1;
				const d=isMove?'move':(vi===1?'ew':(hi===1?'ns':(vi===hi?'nwse':'nesw')));
				controls.push({
					className:[isMove?'is-position-control':'is-size-control','is-'+v,'is-'+h,'is-'+d],
					action:isMove?'move':'resize',
					flags:(hi<<2)|vi
				});
			});
		});
		return controls;
	},[]);
	
	
	const onMouseDown=useCallback((e)=>{
		const control=e.target.closest('[data-control-action]');
		if(!control){return setAction(false);}
		target.style.animation='none';
		target.style.transition='none';
		setAction({
			action:control.dataset.controlAction,
			flags:parseInt(control.dataset.controlFlags),
			org:{x:e.clientX,y:e.clientY},
			orgPos:getBoundingArray(window.getComputedStyle(target)),
			keepAspect:e.shiftKey,
			target
		});
	},[target,onDuplicate]);
	const onMouseMove=useCallback((e)=>{
		if(!action){return;}
		const dx=e.clientX-action.org.x;
		const dy=e.clientY-action.org.y;
		if(action.action==='move'){
			action.target.style.left=action.orgPos[0]+dx+'px';
			action.target.style.top=action.orgPos[1]+dy+'px';
		}
		else if(action.action==='resize'){
			if(!(action.flags&4)){
				let w=action.orgPos[2];
				if(action.flags&8){
					w+=dx;
				}
				else{
					w-=dx;
					action.target.style.left=action.orgPos[0]+dx+'px';
				}
				action.target.style.width=w+'px';
				if(action.keepAspect){
					let h=action.orgPos[3]*w/action.orgPos[2],dh=h-action.orgPos[3];
					action.target.style.height=h+'px';
					if(action.flags&1){
						action.target.style.top=action.orgPos[1]-dh/2+'px';
					}
				}
			}
			if(!(action.flags&1)){
				let h=action.orgPos[3];
				if(action.flags&2){
					h+=dy;
				}
				else{
					h-=dy;
					action.target.style.top=action.orgPos[1]+dy+'px';
				}
				action.target.style.height=h+'px';
				if(action.keepAspect){
					let w=action.orgPos[2]*h/action.orgPos[3],dw=w-action.orgPos[2];
					action.target.style.width=w+'px';
					if(action.flags&4){
						action.target.style.left=action.orgPos[0]-dw/2+'px';
					}
					else if(!(action.flags&8)){
						action.target.style.left=action.orgPos[0]-dw+'px';
					}
				}
			}
		}
	},[action]);
	const onMouseUp=useCallback((e)=>{
		action.target.style.animation='';
		action.target.style.transition='';
		if(onChange){onChange(getBoundingArray(window.getComputedStyle(action.target)));}
		setAction(false);
	},[action,onChange]);
	const onDoubleClick=useCallback((e)=>{
		target.style.height='auto';
		target.style.height=window.getComputedStyle(target).height+'px';
	},[target]);
	
	
	
	if(!target){return false;}
	return (
		<div
			className={classes({'is-doing-action':!!action})}
			style={style} 
			ref={ref}
			onMouseDown={onMouseDown}
			onMouseMove={onMouseMove}
			onMouseUp={onMouseUp}
			onDoubleClick={onDoubleClick}
		>
			<div className={classes.controls()}>
			{controls.map((props,i)=>(
				<span
					className={classes.controls.control(props.className)}
					data-control-action={props.action}
					data-control-flags={props.flags}
					key={i}
				/>
			))}
			</div>
		</div>
	);
};