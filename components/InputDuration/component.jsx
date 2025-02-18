Catpow.InputDuration=(props)=>{
	const {value,onChange}=props;
	const {useState,useMemo,useCallback,useEffect,useReducer}=wp.element;
	const {bem}=Catpow.util;
	const classes=useMemo(()=>bem('cp-inputduration'),[]);
	
	const cols=useMemo(()=>{
		return {
			y:{unit:'年',min:1,max:100},
			m:{unit:'月',min:1,max:11},
			d:{unit:'日',min:1,max:31},
			h:{unit:'時間',min:1,max:23},
			i:{unit:'分',min:1,max:59},
			s:{unit:'秒',min:1,max:59}
		};
	},[]);
	
	const init=useCallback((state)=>{
		state.value=props.value || '';
		return state;
	},[]);
	const reducer=useCallback((state,action)=>{
		const newState=Object.assign({},state,action);
		let value='P';
		if(newState.y){value+=newState.y+'Y';}
		if(newState.m){value+=newState.m+'M';}
		if(newState.d){value+=newState.d+'D';}
		if(newState.h || newState.i || newState.s){
			value+='T';
			if(newState.h){value+=newState.h+'H';}
			if(newState.i){value+=newState.i+'M';}
			if(newState.s){value+=newState.s+'S';}
		}
		newState.value=value==='P'?'':value;
		return newState;
	},[]);
	const [state,update]=useReducer(reducer,{},init);
	
	useEffect(()=>{
		if(state.value || props.value){
			onChange(state.value);
		}
	},[onChange,state.value]);
	
	
	return (
		<div className={classes()}>
			{Object.keys(cols).map((key)=>{
				return (
					<div className={classes.col('is-col-'+key)} key={key}>
						<input
							type="number"
							className={classes.col.input('is-input-'+key)}
							min={cols[key].min}
							max={cols[key].max}
							onChange={(e)=>update({[key]:e.currentTarget.value})}
						/>
						<span className={classes.col.unit()}>{cols[key].unit}</span>
					</div>
				);
			})}
		</div>
	);
}