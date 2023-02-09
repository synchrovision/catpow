import {CP} from './CP.jsx';

CP.BoundingBox=(props)=>{
	const {targets,onDeselect,onDuplicate,onDelete,onChange}=props;
	const {useState,useCallback,useMemo,useEffect,useRef}=wp.element;
	const {bem}=Catpow.util;
	const classes=useMemo(()=>bem('CP-BoundingBox'),[]);
	const ref=useRef();
	const [style,setStyle]=useState({});
	const [action,setAction]=useState(false);
	const container=useMemo(()=>props.container || document,[props.container]);
	
	const tracePosition=useCallback((targets)=>{
		if(targets.length===1){
			setStyle(extractPosition(targets[0]));
			return;
		}
		const bnd=targets.reduce((bnd,target)=>{
			const crrBnd=getBoundingArray(extractPosition(target));
			crrBnd[2]+=crrBnd[0];
			crrBnd[3]+=crrBnd[1];
			if(bnd===false){return crrBnd;}
			return [
				Math.min(bnd[0],crrBnd[0]),
				Math.min(bnd[1],crrBnd[1]),
				Math.max(bnd[2],crrBnd[2]),
				Math.max(bnd[3],crrBnd[3]),
			];
		},false);
		setStyle({
			position:window.getComputedStyle(targets[0]).position,
			left:bnd[0]+'px',
			top:bnd[1]+'px',
			width:(bnd[2]-bnd[0])+'px',
			height:(bnd[3]-bnd[1])+'px',
		});
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
			tracePosition(targets);
		});
	},[tracePosition,targets]);
	
	useEffect(()=>{
		if(!targets.length){return false;}
		tracePosition(targets);
		targets.forEach((target)=>{
			observer.observe(target,{attributes:true,attributeFilter:['style']});
		});
		return ()=>observer.disconnect();
	},[targets,observer]);
	useEffect(()=>{
		if(!targets.length){return false;}
		tracePosition(targets);
		const cb=()=>tracePosition(targets);
		window.addEventListener('resize',cb);
		return ()=>window.removeEventListener('resize',cb);
	},[targets,props.viewMode]);
	useEffect(()=>{
		if(!onDeselect){return;}
		const cb=(e)=>{
			if(ref.current && !e.shiftKey){
				const bnd=ref.current.getBoundingClientRect();
				const {clientX:x,clientY:y}=e;
				if(x<bnd.left || x>bnd.right || y<bnd.top || y>bnd.bottom){
					onDeselect();
				}
			}
		}
		container.addEventListener('click',cb);
		return ()=>container.removeEventListener('click',cb);
	},[targets,container,onDeselect]);
	useEffect(()=>{
		if(!onDelete){return;}
		const cb=(e)=>{
			if(e.isComposing || e.target.nodeName === "INPUT" || e.target.nodeName === "TEXTAREA" || e.target.isContentEditable){
				return;
			}
			if(e.key === 'Backspace'){
				onDelete(targets);
			}
		}
		document.addEventListener('keydown',cb);
		return ()=>document.removeEventListener('keydown',cb);
	},[targets,onDelete]);
	
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
		if(onDuplicate && e.altKey && control.dataset.controlAction==='move'){
			onDuplicate(targets);
		}
		targets.forEach(target=>{
			target.style.animation='none';
			target.style.transition='none';
		});
		const orgBnd=getBoundingArray(window.getComputedStyle(ref.current));
		const orgBnds=targets.map(target=>getBoundingArray(window.getComputedStyle(target)));
		const [ol,ot,ow,oh]=orgBnd;
		setAction({
			action:control.dataset.controlAction,
			flags:parseInt(control.dataset.controlFlags),
			org:{x:e.clientX,y:e.clientY},
			orgBnd,
			orgBnds,
			coefs:orgBnds.map(bnd=>{
				const [l,t,w,h]=bnd;
				return [(l-ol)/ow,(t-ot)/oh,w/ow,h/oh];
			}),
			orgAspect:oh/ow,
			keepAspect:e.shiftKey,
			keepCenter:e.altKey,
			targets
		});
	},[ref,targets,onDuplicate]);
	const onMouseMove=useCallback((e)=>{
		if(!action){return;}
		const dx=e.clientX-action.org.x;
		const dy=e.clientY-action.org.y;
		if(action.action==='move'){
			targets.forEach((target,index)=>{
				target.style.left=action.orgBnds[index][0]+dx+'px';
				target.style.top=action.orgBnds[index][1]+dy+'px';
			});
		}
		else if(action.action==='resize'){
			let [ol,ot,ow,oh]=action.orgBnd;
			let [l,t,w,h]=action.orgBnd;
			if(!(action.flags&4)){
				if(action.flags&8){
					w+=dx;
				}
				else{
					w-=dx;
					l+=dx;
				}
			}
			if(!(action.flags&1)){
				if(action.flags&2){
					h+=dy;
				}
				else{
					h-=dy;
					t+=dy;
				}
			}
			if(action.keepAspect){
				let d;
				if(action.flags&1){
					h*=w/ow;
					t+=(oh-h)/2;
				}
				else if(action.flags&4){
					w*=h/oh;
					l+=(ow-w)/2;
				}
				else{
					if(w*oh>h*ow){
						w=ow*h/oh;
						if(!(action.flags&8)){
							l=ol+ow-w;
						}
					}
					else{
						h=oh*w/ow;
						if(!(action.flags&2)){
							t=ot+oh-h;
						}
					}
				}
			}
			targets.forEach((target,index)=>{
				const coef=action.coefs[index];
				target.style.left=l+w*coef[0]+'px';
				target.style.top=t+h*coef[1]+'px';
				target.style.width=w*coef[2]+'px';
				target.style.height=h*coef[3]+'px';
			});
		}
	},[action]);
	const onMouseUp=useCallback((e)=>{
		action.targets.map(target=>{
			target.style.animation='';
			target.style.transition='';
		});
		if(onChange){
			onChange(action.targets.map(
				target=>getBoundingArray(extractPosition(target))
			));
		}
		action.targets.map(target=>{
			target.style.left='';
			target.style.top='';
			target.style.width='';
			target.style.height='';
		});
		setAction(false);
	},[action,onChange]);
	const onDoubleClick=useCallback((e)=>{
		targets.forEach(target=>{
			target.style.height='auto';
			target.style.height=window.getComputedStyle(target).height+'px';
		});
		if(onChange){
			onChange(targets.map(
				target=>getBoundingArray(extractPosition(target))
			));
		}
	},[targets,onChange]);
	
	if(!targets.length){return false;}
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