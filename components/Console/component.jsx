/**
* APIへ入力値を送信して結果を表示する
*/
Catpow.Console=(props)=>{
	const {className='cp-console',path}=props;
	const el=wp.element.createElement;
	const {useState,useCallback,useEffect,useRef,useMemo,useReducer}=wp.element;
	
	const ControlItem=useCallback((props)=>{
		const {state,dispatch}=props;
		const {SelectBox,CheckBoxes,RadioButtons,Buttons,Button,ModalForm}=Catpow;
		const {name,type,label,desc}=props;
		const inputTypes=useMemo(()=>({
			text:(props)=>(
				<input type="text" onChange={(e)=>{dispatch({type:'setData',name,value:e.currentTarget.value});}} value={state.data[name]}/>
			),
			select:(props)=>(
				<SelectBox onChange={(value)=>{dispatch({type:'setData',name,value});}} options={props.options} value={state.data[name]}/>
			),
			checkbox:(props)=>(
				<CheckBoxes onChange={(value)=>{dispatch({type:'setData',name,value});}} options={props.options} value={state.data[name]}/>
			),
			radio:(props)=>(
				<RadioButtons onChange={(value)=>{dispatch({type:'setData',name,value});}} options={props.options} value={state.data[name]}/>
			),
			submit:(props)=>(
				<Buttons onClick={(action)=>{submit(action,state.data)}} options={props.options}/>
			)
		}),[]);
		return (
			<div className={className+'-controls-item'}>
				{label && <div className="label">{label}</div>}
				{desc && <div className="desc">{desc}</div>}
				<div class="body">{el(inputTypes[type],props)}</div>
			</div>
		);
	},[className]);
	const ResultItem=useCallback((props)=>{
		const {type='log',text}=props;
		const resultTypes=useMemo(()=>({
			success:(props)=>(<div className="text -success">{props.text}</div>),
			error:(props)=>(<div className="text -error">{props.text}</div>),
			warn:(props)=>(<div className="text -warn">{props.text}</div>),
			notice:(props)=>(<div className="text -notice">{props.text}</div>),
			log:(props)=>(<div className="text -log">{props.text}</div>),
		}),[]);
		return el(resultTypes[type],props);
	},[]);
	const reducer=useCallback((state,action)=>{
		switch(action.type){
			case 'setData':{
				state.data[action.name]=action.value;
				return {...state};
			}
			case 'setResults':{
				state.results=action.results;
				return {...state};
			}
		}
		return state;
	},[]);
	const [state,dispatch]=useReducer(reducer,{
		data:{},
		results:[]
	});
	const submit=useCallback((action,data)=>{
		wp.apiFetch({path:`/cp/v1/${path}/${action}`,method:'POST',data}).then((res)=>{
			const {results,resubmit=false}=res;
			dispatch({type:'setResults',results});
			if(resubmit){submit(action,resubmit);}
		}).catch((e)=>{
			dispatch({type:'setResults',results:[{type:'error',text:e.message}]});
		});
	},[]);
	
	const flagsToWords=useCallback((flags)=>{
		if(undefined === flags){return '';}
		return Object.keys(flags).filter((word)=>flags[word]).join(' ');
	},[]);
	return (
		<div className={className}>
			<div class={className+'-controls'}>
				{props.controls.map((itemProps)=>el(ControlItem,{...itemProps,state,dispatch}))}
			</div>
			<div class={className+'-results'}>
				{state.results.map((itemProps)=>el(ResultItem,itemProps))}
			</div>
		</div>
	);
}