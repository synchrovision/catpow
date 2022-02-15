/**
* APIへ入力値を送信して結果を表示する
*/
Catpow.Console=(props)=>{
	const {path}=props;
	const el=wp.element.createElement;
	const {useState,useCallback,useEffect,useRef,useMemo,useReducer}=wp.element;
	
	const ControlItem=useCallback((props)=>{
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
				<Buttons onClick={(action)=>{submit(action)}} options={props.options}/>
			)
		}),[]);
		return (
			<div className="ControlItem">
				{label && <div className="ControlItem__label">{label}</div>}
				{desc && <div className="ControlItem__desc">{desc}</div>}
				<div class="ControlItem__body">{el(inputTypes[type],props)}</div>
			</div>
		);
	},[]);
	const ResultItem=useCallback((props)=>{
		const {type='log',text}=props;
		const resultTypes=useMemo(()=>({
			error:(props)=>(<div className="error">{props.text}</div>),
			warn:(props)=>(<div className="warn">{props.text}</div>),
			log:(props)=>(<div className="log">{props.text}</div>),
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
	const submit=useCallback((action)=>{
		const {data}=state;
		wp.apiFetch({path:`/cp/v1/${path}/${action}`,method:'POST',data}).then((res)=>{
			const {results}=res;
			dispatch({type:'setResults',results});
		}).catch((e)=>{
			dispatch({type:'setResults',results:[{type:'error',text:e.message}]});
		});
	},[]);
	
	const flagsToWords=useCallback((flags)=>{
		if(undefined === flags){return '';}
		return Object.keys(flags).filter((word)=>flags[word]).join(' ');
	},[]);
	console.log(state);
	return (
		<div className="Console">
			<div class="Console__controles">
				{props.controls.map((itemProps)=>el(ControlItem,itemProps))}
			</div>
			<div class="Console__results">
				{state.results.map((itemProps)=>el(ResultItem,itemProps))}
			</div>
		</div>
	);
}