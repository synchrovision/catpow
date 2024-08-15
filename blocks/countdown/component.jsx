Catpow.CountDown=function(props){
	const {className='wp-block-catpow-countdown-body'}=props;
	const {useMemo,useEffect,useCallback,useReducer}=wp.element;
	const {bem}=Catpow.util;
	const classes=bem(className);
	
	const init=useCallback(()=>{
		const state={isDone:true,days:'0000',hours:'00',minutes:'00',seconds:'00'};
		let {target=null,value=null}=props;
		if(!value && target){
			const d0=new Date();
			const d1=Catpow.util.getDateTimeObject(props.target);
			value=Math.ceil((d1.getTime()-d0.getTime())/1000);
		}
		if(value && value>0){
			state.isDone=false;
			const divs={seconds:60,minutes:60,hours:24,days:10000};
			for(let key in divs){
				state[key]=(value%divs[key]).toString().padStart(key==='days'?4:2,'0');
				value=Math.floor(value/divs[key]);
				if(value===0){break;}
			}
		}
		return state;
	},[]);
	const reducer=useCallback((state,action)=>{
		switch(action.type){
			case 'COUNT_DOWN':{
				if(state.isDone){return state;}
				const newState={...state};
				const divs={seconds:'59',minutes:'59',hours:'23',days:'9999'};
				for(let key in divs){
					let val=parseInt(state[key]);
					val--;
					if(val<0){
						newState[key]=divs[key];
						if(key==='days'){
							return {isDone:true,days:'0000',hours:'00',minutes:'00',seconds:'00'}
						}
					}
					else{
						newState[key]=val.toString().padStart(divs[key].length,'0');
						break;
					}
				}
				return newState;
			}
		}
		return state;
	},[])
	const [state,dispatch]=useReducer(reducer,{},init);
	
	useEffect(()=>{
		const cb=()=>{dispatch({type:'COUNT_DOWN'});};
		const timer=setInterval(cb,1000);
		return ()=>clearInterval(timer);
	},[]);
	
	
	
	return (
		<div className={classes()}>
			<span className={classes.group('is-days')}>
				<span className={classes.group.number({'is-leading-zero':state.days[0]==='0'})}>{state.days[0]}</span>
				<span className={classes.group.number({'is-leading-zero':state.days.slice(0,2)==='00'})}>{state.days[1]}</span>
				<span className={classes.group.number({'is-leading-zero':state.days.slice(0,3)==='000'})}>{state.days[2]}</span>
				<span className={classes.group.number()}>{state.days[3]}</span>
			</span>
			<span className={classes.group('is-hours')}>
				<span className={classes.group.number({'is-leading-zero':state.hours[0]==='0'})}>{state.hours[0]}</span>
				<span className={classes.group.number()}>{state.hours[1]}</span>
			</span>
			<span className={classes.group('is-minutes')}>
				<span className={classes.group.number({'is-leading-zero':state.minutes[0]==='0'})}>{state.minutes[0]}</span>
				<span className={classes.group.number()}>{state.minutes[1]}</span>
			</span>
			<span className={classes.group('is-seconds')}>
				<span className={classes.group.number({'is-leading-zero':state.seconds[0]==='0'})}>{state.seconds[0]}</span>
				<span className={classes.group.number()}>{state.seconds[1]}</span>
			</span>
		</div>
	);
}