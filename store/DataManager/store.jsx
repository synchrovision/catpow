(({register,createReduxStore})=>{
	const actions={
		setIndex(path,index){
			return {type:'SET_INDEX',path,index};
		},
		fetchFromAPI(path){
			return {type:'FETCH_FROM_API',path};
		}
	};
	const store=createReduxStore({
		reducer:(state,action)=>{
			switch(action.type){
				case 'SET_INDEX':{
					state.index[action.path]=action.index;
					return {...state};
				}
			}
			return state;
		},
		actions,
		selectors:{
			getIndex(state,path){
				return state.index[path];
			}
		},
		controls:{
			FETCH_FROM_API(action){
				const {path,data=null,method='GET'}=action;
				return wp.apiFetch({path,data,method});
			}
		},
		resolvers:{
			*getIndex(path){
				const index=yield actions.fetchFromAPI({path:'cp/v1/'+path+'/index'});
				return actions.setIndex(path,index);
			}
		}
	});
})(wp.data);