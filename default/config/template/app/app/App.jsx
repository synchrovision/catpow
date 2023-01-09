const {useState,useMemo,useCallback,useReducer,createContext,useEffect}=wp.element;
const {bem}=Catpow.util;

export const PropsContext=createContext({});
export const StateContext=createContext({});
export const App=(props)=>{
	const {className="cp-app-sample"}=props;
	const classes=bem(className);
	
	const init=useCallback((state)=>{
		return state;
	},[]);
	const reducer=useCallback((state,action)=>{
		const {type,...params}=action;
		switch(action.type){
			case 'INIT':{
				return {...state,...params};
			}
		}
		return state;
	},[])
	const [state,dispatch]=useReducer(reducer,{
		
	},init);
	
	useEffect(()=>{
		wp.apiFetch({path:'/cp/v1/'+props.path}).then((res)=>{
			dispatch({type:'INIT',...res})
		}).catch(console.error);
	},[]);
	
	return (
		<PropsContext.Provider value={props}>
			<StateContext.Provider value={{state,dispatch}}>
				<div className={classes()}>
					<div className={classes.header()}>{props.title}</div>
					<div className={classes.body()}>
						<ul className={classes.body.items()}>
						{state.items && state.items.map((item)=>{
							return (
								<li className={classes.body.items._item()}>{item.title}</li>
							);
						})}
						</ul>
					</div>
					<div className={classes.footer()}></div>
				</div>
			</StateContext.Provider>
		</PropsContext.Provider>
	);
};
