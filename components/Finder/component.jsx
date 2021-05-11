/**
* WP APIで取得したインデックス情報を元に
* 検索のユーザーインターフェースを提供するコンポーネント
* ステートをURLと連携することを前提とし、ステートを変更すると
* ブラウザの履歴にステートに対応するURLを追加する
* 専用の子孫コンポーネントを持ち
* コンテキストによってこれらの
* 子孫コンポーネントのステートを一元管理する
*/


Catpow.FinderContext=wp.element.createContext({});

Catpow.Finder=(props)=>{
	const {useState,useCallback,useMemo,useEffect,useRef,useReducer}=wp.element;
	const {basepath,baseurl,className=''}=props;
	const pushState=useCallback((state)=>{
		const {path='',query}=state;
		let q={};
		if(query){
			Object.keys(query).map((key)=>{
				q['q['+key+']'+(Array.isArray(query[key])?'[]':'')]=query[key];
			});
		}
		const uri=URI(baseurl);
		history.pushState(state,'',uri.directory(uri.directory()+'/'+path).addQuery(q).toString());
	},[props]);
	
	const reducer=useCallback((state,action)=>{
		switch(action.type){
			case 'setIndex':{
				const {config}=state;
				const {index,wait=false}=action;
				const colsByRole={};
				const colsToShow=[];
				const colsToShowByRole={};
				Object.keys(index.cols).map((name,i)=>{
					const col=index.cols[name];
					const {role='none'}=col;
					col.name=name;
					col.hide=(config.cols[name])?config.cols[name].hide:(i>8 || ['contents','data'].indexOf(role)!==-1);
					if(!colsByRole[role]){colsByRole[role]=[];}
					colsByRole[role].push(col);
					if(!col.hide){
						colsToShow.push(col);
						if(!colsToShowByRole[role]){colsToShowByRole[role]=[];}
						colsToShowByRole[role].push(col);
					}
					fillConf(index.cols[name]);
				});
				return {...state,index,colsByRole,colsToShow,colsToShowByRole,wait};
			}
			case 'setPath':
				return {...state,path:action.path};
			case 'addQuery':{
				const {key,val}=action;
				const {query}=state;
				if(!query[key]){query[key]=[];}
				if(query[key].indexOf(val)===-1){query[key].push(val);}
				return {...state,query:{...query}};
			}
			case 'removeQuery':{
				const {key,val}=action;
				const {query}=state;
				if(!query[key]){query[key]=[];}
				query[key]=query[key].filter((v)=>v!==val);
				if(query[key].length===0){delete query[key];}
				return {...state,query:{...query}};
			}	
			case 'setQeury':
				return {...state,query:action.query};
			case 'setPathAndQuery':
				return {...state,path:action.path,query:action.query};
			case 'update':
				return {...state,...(action.data || {})};
			case 'setLayout':
				if(action.layout===state.layout){return state;}
				return {...state,layout:action.layout,transition:'mod'};
			case 'showColumn':
			case 'hideColumn':{
				const {role='none'}=state.index.cols[action.name];
				state.index.cols[action.name].hide=action.type!=='showColumn';
				state.colsToShow=Object.keys(state.index.cols).map((key)=>state.index.cols[key]).filter((col)=>!col.hide);
				state.colsToShowByRole[role]=state.colsToShow.filter((col)=>col.role===role);
				return {...state};
			}
			case 'selectRow':
			case 'deselectRow':{
				action.row._selected=action.type==='selectRow';
				const selectedRows=state.index.rows.filter((row)=>row._selected);
				return {...state,selectedRows};
			}
			case 'focusItem':
				return {...state,focused:action.row};
			case 'blurItem':
				return {...state,focused:false};
			case 'setItems':
				var maxNumPages=Math.ceil(action.items.length/state.itemsPerPage);
				return {
					...state,
					items:action.items,
					maxNumPages,
					page:Math.min(maxNumPages,state.page)
				};
			case 'setPage':{
				const page=Math.min(state.maxNumPages,Math.max(1,action.page));
				if(page==state.page){return state;}
				const offset=state.itemsPerPage*(page-1);
				return {
					...state,
					itemsInPage:state.items.slice(offset,offset+state.itemsPerPage),
					page
				}
			}
			case 'setItemsPerPage':{
				if(!action.itemsPerPage){return state;}
				const maxNumPages=Math.ceil(state.items.length/action.itemsPerPage);
				const page=Math.min(maxNumPages,state.page);
				const offset=action.itemsPerPage*(page-1);
				return {
					...state,
					itemsInPage:state.items.slice(offset,offset+action.itemsPerPage),
					itemsPerPage:action.itemsPerPage,
					maxNumPages,
					page
				};
			}
			case 'updateDevice':
				var device=Catpow.util.getDevice();
				if(device===state.device){return state;}
				return {...state,device:Catpow.util.getDevice()};
		}
		return state;
	},[]);
	const [state,dispatch]=useReducer(reducer,{
		wait:true,
		config:JSON.parse(localStorage.getItem('config:'+basepath) || '{}'),
		index:{
			cols:{},
			rows:[],
		},
		colsByRole:{},
		colsToShow:[],
		colsToShowByRole:{},
		path:props.path,
		apiPath:'/cp/v1/'+basepath,
		query:props.query || {},
		layout:'table',
		items:[],
		itemsInPage:[],
		itemsPerPage:20,
		selectedRows:[],
		focused:false,
		page:1,
		device:Catpow.util.getDevice()
	});
	const fillConf=useCallback((conf)=>{
		switch(conf.output_type){
			case 'select':
			case 'radio':
			case 'checkbox':
				conf.dict={};
				if(Array.isArray(conf.value)){
					conf.value.map((val)=>{
						conf.dict[val]=val;
					});
				}
				else{
					Object.keys(conf.value).map((label)=>{
						if(typeof conf.value[label] === 'object'){
							if(Array.isArray(conf.value[label])){
								conf.value[label].map((val)=>{
									conf.dict[val]=val;
								});
							}
							else{
								Object.keys(conf.value[label]).map((label_)=>{
									conf.dict[conf.value[label][label_]]=label_;
								});
							}
						}
						else{
							conf.dict[conf.value[label]]=label;
						}
					});
				}
				break;
		}
	},[]);
	
	const info=useMemo(()=>{
		return {
			roleGroups:{
				images:['image'],
				header:['label','name'],
				tags:['group','tag'],
				address:['zip','prefecture','address'],
				contact:['tel','fax','email','url'],
				contentes:['data','contents'],
				style:['color']
			}
		}
	},[]);
	
	useEffect(()=>{
		localStorage.setItem('config:'+basepath,JSON.stringify({cols:state.index.cols}));
	},[state]);
	
	useEffect(()=>{
		const items=state.index.rows.filter((row)=>{
			return Object.keys(state.query).every((key)=>{
				if(state.query[key].length===0){return true;}
				return state.query[key].indexOf(row[key].value[0])!==-1;
			});
		});
		const itemsInPage=items.slice(0,state.itemsPerPage);
		const maxNumPages=Math.ceil(items.length/state.itemsPerPage);
		dispatch({type:'update',data:{
			page:1,
			items,
			itemsInPage,
			maxNumPages
		}});
	},[state.path,state.query,state.index]);
	useEffect(()=>{
		if(!state.ignorePushState){
			pushState(state);
		}
		else{
			dispatch({type:'update',data:{ignorePushState:false}});
		}
	},[state.path,state.query]);
	
	useEffect(()=>{
		wp.apiFetch({
			path:state.apiPath+'/index'
		}).then((index)=>{
			dispatch({type:'setIndex',index});
		});
		window.addEventListener('popstate',(e)=>{
			if(!e.state){return;}
			dispatch({type:'update',data:{
				path:e.state.path,
				query:e.state.query,
				ignorePushState:true
			}});
		});
		window.addEventListener('resize',(e)=>{
			dispatch({type:'updateDevice'});
		});
	},[props]);
	
	return (
		<Catpow.AppManager>
			<Catpow.FinderContext.Provider value={{state,dispatch,info}}>
				<div className={"Finder "+className}>{props.children}</div>
			</Catpow.FinderContext.Provider>
		</Catpow.AppManager>
	);
}
Catpow.Finder.Nav=(props)=>{
	const {className='',children,...otherProps}=props;
	return <div className={"FinderNavigation "+className} {...otherProps}>{children}</div>
};
Catpow.Finder.Spacer=(props)=>{
	const {className='',...otherProps}=props;
	return <div className={"FinderSpacer "+className} {...otherProps}></div>
};
Catpow.Finder.Main=(props)=>{
	const {className='',children,...otherProps}=props;
	return <div className={"FinderMain "+className} {...otherProps}>{children}</div>
};