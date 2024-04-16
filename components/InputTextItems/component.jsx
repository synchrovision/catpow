﻿Catpow.InputTextItems=(props)=>{
	const {className='InputTextItems',onChange}=props;
	const {useState,useMemo,useCallback,useEffect,useReducer}=wp.element;
	const {bem}=Catpow.util;
	const classes=bem(className);
	const [isComposing,setIsComposing]=useState(false);
	const [ref,setRef]=useState(false);
	
	const reducer=useCallback((state,action)=>{
		switch(action.type){
			case 'INPUT':{
				const chunks=action.input.split(',');
				if(chunks.length>1){
					const input=chunks.pop();
					const items=state.items.concat(chunks);
					return {...state,items,input};
				}
				return {...state,input:action.input};
			}
			case 'ENTER':{
				console.log('ENTER');
				if(state.isComposing){return state;}
				const chunks=state.input.split(',').filter((chunk)=>chunk);
				const items=state.items.concat(chunks);
				return {...state,input:'',items}
			}
			case 'REMOVE':{
				const items=state.items.toSpliced(action.index,1);
				return {...state,items};
			}
			case 'START_COMPOSE':{
				console.log('START_COMPOSE');
				return {...state,isComposing:true};
			}
			case 'END_COMPOSE':{
				console.log('END_COMPOSE');
				return {...state,isComposing:false};
			}
		}
	},[]);
	const [state,dispatch]=useReducer(reducer,{items:props.items || [],input:'',isComposing:false});
	useEffect(()=>{
		if(ref){
			const cb=(e)=>e.code==='Enter' && dispatch({type:'ENTER'});
			ref.addEventListener('keydown',cb,true);
			return ()=>ref.removeEventListener('keydown',cb,true);
		};
	},[ref,dispatch]);
	useEffect(()=>{
		onChange(state.items);
	},[state.items]);
	
	const [datalistId,datalist]=useMemo(()=>{
		if(props.datalist==null){return [null,null];}
		const datalistId=(performance.now()*1000).toString(16);
		const datalist=Array.isArray(props.datalist)?props.datalist:props.datalist.split(',');
		return [datalistId,datalist];
	},[props.datalist]);
	
	
	return (
		<div className={classes()}>
			{state.items.map((item,index)=>(
				<span className={classes.item()} key={index}>
					<span className={classes.item.text()}>{item}</span>
					<span className={classes.item.remove()} onClick={(e)=>dispatch({type:'REMOVE',index})}>×</span>
				</span>	 
			))}
			<input
				type="text"
				className={classes.input()}
				value={state.input}
				onChange={(e)=>dispatch({type:'INPUT',input:e.target.value})}
				onBlur={(e)=>dispatch({type:'ENTER'})}
				onCompositionStart={(e)=>dispatch({type:'START_COMPOSE'})}
				onCompositionEnd={(e)=>setTimeout(()=>dispatch({type:'END_COMPOSE'}),100)}
				list={datalistId}
				ref={setRef}
			/>
			{datalist && (
				<datalist id={datalistId}>
					{datalist.map((val)=><option value={val} disabled={state.items.includes(val)} key={val}></option>)}
				</datalist>
			)}
		</div>
	);
}