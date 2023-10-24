Catpow.Customize.Sizes=(props)=>{
	const {useState,useCallback,useMemo,useEffect,useRef,useReducer,useContext,createContext}=wp.element;
	const {id,value,onChange,param}=props;
	const {roles,breakpoints}=param;
	const [inputMode,setInputMode]=useState('diagram');
	const {bem}=Catpow.util;
	const classes=bem('Sizes');
	const minSize=0.5;
	
	const DataContext=useMemo(()=>wp.element.createContext({}),[]);
	const StateContext=useMemo(()=>wp.element.createContext({}),[]);
	const ControlContext=useMemo(()=>wp.element.createContext({}),[]);
	
	const [graphEl,setGraphEl]=useState(false);
	
	const rolesBySlug=useMemo(()=>{
		const  rolesBySlug={};
		Object.keys(roles).forEach((key)=>{
			rolesBySlug[roles[key].shorthand]=roles[key];
		});
		return rolesBySlug;
	},[roles]);
	const get6Sizes=useCallback((min,mid,max)=>{
		const d1=max-min;
		const d2=(mid-min)-d1/2;
		return [...Array(6).keys()].map((i)=>min+d1*i/5+d2*(1-Math.abs(i/2.5-1,2)));
	},[]);
	const getRel6Sizes=useCallback((min,mid,max,rmax)=>{
		const a=(rmax-minSize)/(max-minSize);
		return get6Sizes((min-minSize)*a+minSize,(mid-minSize)*a+minSize,rmax);
	},[]);
	const replace6SizeValues=useCallback((value,role,bp,newValues)=>{
		newValues.forEach((val,i)=>{value[role+(6-i)][bp]=val;});
	},[]);
	const getMasterValuesFromValue=useCallback((value)=>{
		const masterValues={};
		const min=parseFloat(value.h6[0]),max=parseFloat(value.h1[0]);
		const d=max-min;
		let mid=d/2;
		for(let i=1;i<5;i++){
			mid+=(parseFloat(value['h'+(i+1)][0])-min-d/5*i)/(1-Math.pow(i/2.5-1,2))/4;
		}
		masterValues[getMasterValuesSlug('h',0,0)]=min;
		masterValues[getMasterValuesSlug('h',0,1)]=mid;
		masterValues[getMasterValuesSlug('h',0,2)]=max;
		const bps=Object.keys(breakpoints);
		for(let role of ['h','p']){
			for(let bp=(role==='h')?1:0;bp<bps.length;bp++){
				if(value[role+'1'][bp]){
					masterValues[getMasterValuesSlug(role,bp)]=parseFloat(value[role+'1'][bp]);
				}
			}
		}
		return masterValues;
	},[]);
	
	const getColOfRole=useCallback((slug)=>{
		const matches=slug.match(/\w([1-6])/);
		if(matches){return 12-matches[1]*2;}
		return 10;
	},[]);
	const getMasterValuesSlug=useCallback((role,bp,pos=false)=>pos===false?`${role}-${bp}`:`${role}-${bp}-${pos}`,[]);
	const parseMasterValuesSlug=useCallback((slug)=>{
		let [,role,bp,,pos]=slug.match(/(h|p)\-(\d)(\-(\d))?/);
		if(pos===undefined){pos=false;}
		return {role,bp,pos};
	},[]);
	
	const init=useCallback(({value})=>{
		let breakpointsFlags=0;
		if(!value){value={};}
		Object.keys(rolesBySlug).forEach((role)=>{
			if(!value.hasOwnProperty(role)){
				value[role]=rolesBySlug[role].default;
			}
		});
		Object.keys(breakpoints).forEach((bpLabel,index)=>{
			if(index>0 && value.h1[index]){
				breakpointsFlags|=1<<index-1;
			}
		});
		const masterValues=getMasterValuesFromValue(value);
		return {value,masterValues,breakpointsFlags,focusBreakpointsFlags:1,editMaster:true};
	},[]);
	const reducer=useCallback((state,action)=>{
		switch(action.type){
			case 'UPDATE_VALUE':{
				if(action.role.responsive){
					const newValues=[...state.value[action.role.shorthand]];
					newValues[action.bp]=action.value;
					return {...state,value:{...state.value,[action.role]:newValues}};
				}
				else{
					return {...state,value:{...state.value,[action.role]:action.value}}
				}
			}
			case 'UPDATE_MASTER_VALUE':{
				const value=JSON.parse(JSON.stringify(state.value));
				const slug=getMasterValuesSlug(action.role,action.bp,action.pos || false);
				const masterValues={...state.masterValues,[slug]:action.value};
				const bps=Object.keys(breakpoints);
				const args=[masterValues['h-0-0'],masterValues['h-0-1'],masterValues['h-0-2']];
				for(const role of action.role==='h'?['h','p']:['p']){
					for(let bp=parseInt(action.bp);bp<=bps.length;bp++){
						if(role==='h' && bp===0){
							replace6SizeValues(value,'h',0,get6Sizes.apply(null,args));
						}
						else{
							if(bp===0 || (bp>0 && state.breakpointsFlags & (1<<(bp-1)))){
								args[3]=masterValues[getMasterValuesSlug(role,bp)];
								if(args[3]){
									replace6SizeValues(value,role,bp,getRel6Sizes.apply(null,args));
								}
							}
						}
					}
				}
				return {...state,masterValues,value};
			}
			case 'TOGGLE_EDIT_MASTER':{
				return {...state,editMaster:!state.editMaster};
			}
			case 'TOGGLE_FOCUS_BREAKPOINT':{
				return {...state,focusBreakpointsFlags:state.focusBreakpointsFlags ^ (1<<action.bp)};
			}
			case 'TOGGLE_BREAKPOINT':{
				const bpFlag=1<<(action.bp-1);
				const isActiveBp=state.breakpointsFlags & bpFlag;
				const breakpointsFlags=state.breakpointsFlags ^ bpFlag;
				const value=JSON.parse(JSON.stringify(state.value));
				const masterValues={...state.masterValues};
				if(isActiveBp){
					Object.keys(value).forEach((key)=>{
						if(!!rolesBySlug[key].responsive){
							value[key]=[...value[key]];
							value[key][action.bp]=null;
						}
					});
					masterValues[getMasterValuesSlug('h',action.bp)]=null;
					masterValues[getMasterValuesSlug('p',action.bp)]=null;
				}
				else{
					const bp=Math.min(1,action.bp);
					Object.keys(value).forEach((key)=>{
						if(!!rolesBySlug[key].responsive){
							value[key]=[...value[key]];
							value[key][action.bp]=value[key][action.bp+1] || rolesBySlug[key].default[bp];
						}
					});
					masterValues[getMasterValuesSlug('h',action.bp)]=value.h1[action.bp];
					masterValues[getMasterValuesSlug('p',action.bp)]=value.p1[action.bp];
				}
				return {...state,value,masterValues,breakpointsFlags};
			}
		}
	},[]);
	const [state,dispatch]=useReducer(reducer,{value},init);
	
	const Point=useCallback((props)=>{
		const {classes,label,onChange,role,bp}=props;
		const {min=0.5,max=15,step=0.0625}=role;
		const ref=useRef();
		
		const {graphEl}=useContext(DataContext);
		const state=useContext(StateContext);
		
		const valueInState=
			  role.master?
			  state.masterValues[role.slug]:
			  (role.responsive?state.value[role.shorthand][bp]:state.value[role.shorthand]);
		const [value,setValue]=useState(parseFloat(valueInState));
		const x=useMemo(()=>props.col/10,[props.col]);
		const [y,setY]=useState(Math.sqrt(value/max));
		const minY=useMemo(()=>Math.sqrt(min/max),[min,max]);
		
		useEffect(()=>{
			const value=parseFloat(valueInState)
			setValue(value);
			setY(Math.sqrt(value/max));
		},[valueInState]);
		useEffect(()=>{
			if(!ref || !ref.current){return;}
			const el=ref.current;
			const state={isHold:false,org:null,bnd:null};
			const handleMouseDown=(e)=>{
				state.isHold=true;
				state.org=e.clientY;
				state.bnd=graphEl.getBoundingClientRect();
			};
			const handleMouseMove=(e)=>{
				if(state.isHold){
					const y=Math.max(minY,Math.min(1,(state.bnd.bottom-e.clientY)/state.bnd.height));
					const value=Math.round(y*y*max/step)*step;
					setY(y);
					setValue(value);
					onChange(value);
				}
			};
			const handleMouseUp=(e)=>{
				handleMouseMove(e);
				state.isHold=false;
			};
			el.addEventListener('mousedown',handleMouseDown);
			document.addEventListener('mousemove',handleMouseMove);
			document.addEventListener('mouseup',handleMouseUp);
			return ()=>{
				el.removeEventListener('mousedown',handleMouseDown);
				document.removeEventListener('mousemove',handleMouseMove);
				document.removeEventListener('mouseup',handleMouseUp);
			};
		},[ref.current,onChange]);
		
		const isDisabled=useMemo(()=>{
			return (!state.editMaster===!!role.master) || !(state.focusBreakpointsFlags & (1<<bp));
		},[state.editMaster,state.focusBreakpointsFlags]);
		
		return (
			<div className={classes({'is-master':role.master,'is-disabled':isDisabled})} style={{'--point-x':x,'--point-y':y}} ref={ref}>
				{role.label && <div className={classes.label()}>{role.label}</div>}
			</div>
		);
	},[]);
	
	const points=useMemo(()=>{
		return Object.keys(state.value).map((roleSlug)=>{
			return Object.keys(breakpoints).map((bpLabel,bp)=>{
				const role=rolesBySlug[roleSlug];
				if(!role.responsive || bp>0 && !(state.breakpointsFlags & (1<<bp-1))){return false;}
				return (
					<Point
						classes={classes.graph.point}
						role={role}
						bp={bp}
						col={getColOfRole(roleSlug)}
						onChange={(value)=>{
							dispatch({type:'UPDATE_VALUE',role,bp,value});
						}}
						key={roleSlug+'-'+bp}
					/>
				);
			});
		});
	},[Point,state.breakpointsFlags,dispatch]);
	const masterPoints=useMemo(()=>{
		const bps=Object.keys(breakpoints);
		return Object.keys(state.masterValues).map((slug)=>{
			const {role,bp,pos}=parseMasterValuesSlug(slug);
			let label=role;
			if(pos!==false){label+='-'+['min','mid','max'][pos];}
			else{label+='('+bps[bp]+')';}
			const roleObj={master:true,slug,label};
			return (
				<Point
					classes={classes.graph.point}
					role={roleObj}
					bp={bp}
					col={pos===false?10:pos*5}
					onChange={(value)=>{
						dispatch({type:'UPDATE_MASTER_VALUE',role,bp,pos,value});
					}}
					key={slug}
				/>
			);
		});
	},[Point,state.breakpointsFlags,dispatch]);
	const data=useMemo(()=>{
		return {...props,rolesBySlug,graphEl};
	},[props,rolesBySlug,graphEl]);
	const control=useMemo(()=>{
		return {dispatch};
	},[dispatch]);
	
	const ToggleBreakPoints=useCallback((props)=>{
		const {classes}=props;
		
		const {param}=useContext(DataContext);
		const {breakpoints}=param;
		const {breakpointsFlags}=useContext(StateContext);
		const {dispatch}=useContext(ControlContext);
		
		return (
			<div className={classes()}>
				{Object.keys(breakpoints).map((bpLabel,bpIndex)=>{
					if(bpIndex===0){return false;}
					const isActive=breakpointsFlags & (1<<bpIndex-1);
					return (
						<div
							className={classes.item({'is-active':isActive})}
							onClick={()=>dispatch({type:'TOGGLE_BREAKPOINT',bp:bpIndex})}
						>{bpLabel}</div>
					);
				})}
			</div>
		);
		
	},[]);
	const ToggleFocusBreakPoints=useCallback((props)=>{
		const {classes}=props;
		
		const {param}=useContext(DataContext);
		const {breakpoints}=param;
		const {breakpointsFlags,focusBreakpointsFlags}=useContext(StateContext);
		const {dispatch}=useContext(ControlContext);
		
		
		return (
			<div className={classes()}>
				{Object.keys(breakpoints).map((bpLabel,bpIndex)=>{
					if(bpIndex>0 && !(breakpointsFlags & (1<<bpIndex-1))){return false;}
					const isActive=focusBreakpointsFlags & (1<<bpIndex);
					return (
						<div
							className={classes.item({'is-active':isActive})}
							onClick={()=>dispatch({type:'TOGGLE_FOCUS_BREAKPOINT',bp:bpIndex})}
						>{bpLabel}</div>
					);
				})}
			</div>
		);
	},[]);
	
	const Lines=useCallback((props)=>{
		const {classes}=props;
		const {param}=useContext(DataContext);
		const {breakpoints}=param;
		const {value,breakpointsFlags,focusBreakpointsFlags}=useContext(StateContext);
		
		const lines=useMemo(()=>{
			const lines=[];
			Object.keys(breakpoints).forEach((bpLabel,bpIndex)=>{
				if(bpIndex===0 || breakpointsFlags & (1<<bpIndex-1)){
					const isActive=!!(focusBreakpointsFlags & (1<<bpIndex));
					let d="";
					for(let role of ['h','p']){
						const roleObj=rolesBySlug[role+'1'];
						const {max=15}=roleObj;
						for(let i=0;i<6;i++){
							d+=(i===0?'M':' L')+' '+(i*20)+' '+(1-Math.sqrt(parseFloat(value[role+(6-i)][bpIndex])/max))*100;
						}
						lines.push(<path className={classes.line({'is-active':isActive})} d={d} key={`${role}-${bpIndex}`}/>);
					}
				}
			});
			return lines;
		},[value,breakpointsFlags,focusBreakpointsFlags]);
		
		return (
			<svg className={classes()} viewBox="0 0 100 100">
				{lines}
			</svg>
		);
	},[]);
	
	const Table=useCallback((props)=>{
		const {classes}=props;
		const {param,rolesBySlug}=useContext(DataContext);
		const state=useContext(StateContext);
		const {dispatch}=useContext(ControlContext);
		
		
		const tables=useMemo(()=>{
			const rows=[[],[]];
			const rowClasses=classes.table.tbody.tr;
			Object.keys(state.value).forEach((roleSlug)=>{
				const role=rolesBySlug[roleSlug];
				if(role.responsive){
					const cells=[<th className={rowClasses.th()} key="label">{role.label}</th>];
					Object.keys(breakpoints).forEach((bpLabel,bp)=>{
						cells.push(<td className={rowClasses.td()} key={bpLabel}>{state.value[roleSlug][bp]}</td>);
					});
					rows[0].push(<tr className={rowClasses()} key={roleSlug}>{cells}</tr>);
				}
				else{
					rows[1].push(
						<tr className={rowClasses()} key={roleSlug}>
							<th className={rowClasses.th()}>{role.label}</th>
							<td className={rowClasses.td()}>{state.value[roleSlug]}</td>
						</tr>
					);
				}
			});
			return (
				<>
					<table className={classes.table('is-responsive')}>
						<thead className={classes.table.thead()}>
							<td className={classes.table.thead.td('is-spacer')}></td>
							{Object.keys(breakpoints).map((bpLabel,bp)=>{
								return (
									<th></th>
								);
							})}
						</thead>
						<tbody className={classes.table.tbody()}>{rows[0]}</tbody>
					</table>
					<table className={classes.table('is-static')}>
						<tbody className={classes.table.tbody()}>{rows[1]}</tbody>
					</table>
				</>
			);
		},[state.value,state.breakpointsFlags]);
		
		return (
			<div className={classes()}>
				{tables}
			</div>
		);
	},[]);
	
	return (
		<DataContext.Provider value={data}>
			<StateContext.Provider value={state}>
				<ControlContext.Provider value={control}>
					<div className={classes()}>
						<div className={classes.header()}>Sizes</div>
						<div className={classes.control()}>
							<ToggleBreakPoints classes={classes.control.togglebreakpoints}/>
						</div>
						<div className={classes.graph()} ref={setGraphEl}>
							<Lines classes={classes.graph.lines}/>
							{points}
							{masterPoints}
						</div>
						<Table classes={classes.table}/>
						<div className={classes.control()}>
							<ToggleFocusBreakPoints classes={classes.control.togglefocusbreakpoints}/>
							<div
								className={classes.control.button({'is-active':!state.editMaster})}
								onClick={()=>dispatch({type:'TOGGLE_EDIT_MASTER'})}
							>個別調整</div>
						</div>
					</div>
				</ControlContext.Provider>
			</StateContext.Provider>
		</DataContext.Provider>
	);
}