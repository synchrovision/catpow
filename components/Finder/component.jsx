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
	const updateResults=useCallback((state)=>{
		state.items=state.index.rows.filter((row)=>{
			return Object.keys(state.query).every((key)=>{
				if(state.query[key].length===0){return true;}
				return state.query[key].some((val)=>val==row[key].value[0]);
			});
		});
		if(Object.keys(state.sort).length>0){
			const keys=Object.keys(state.sort);
			state.items.sort((a,b)=>{
				var rtn=0;
				keys.some((key)=>{
					if(a[key].value[0]==b[key].value[0]){return false;}
					rtn=((a[key].value[0]<b[key].value[0]) === (state.sort[key]==='asc'))?-1:1;
					return true;
				});
				return rtn;
			});
		}
		reflectResults(state);
	},[]);
	const reflectResults=useCallback((state)=>{
		state.selectedRows=state.items.filter((row)=>row._selected);
		state.maxNumPages=Math.ceil(state.items.length/state.itemsPerPage);
		state.page=Math.min(state.maxNumPages,Math.max(1,state.page));
		const offset=state.itemsPerPage*(state.page-1);
		state.itemsInPage=state.items.slice(offset,offset+state.itemsPerPage);
	},[]);
	
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
			case 'updateRows':{
				if(action.rows){
					const newRowsMap=new Map(action.rows.map((row)=>[row._id,row]));
					state.index.rows.map((row)=>{
						if(newRowsMap.has(row._id)){
							console.log(row);
							console.log(newRowsMap.get(row._id));
							Object.assign(row,newRowsMap.get(row._id));
						}
					});
				}
				updateResults(state);
				return {...state};
			}
			case 'removeRows':{
				const removeFrags=new Map(action.rows.map((row)=>[row,true]));
				state.index.rows=state.index.rows.filter((row)=>!removeFrags.has(row));
				state.items=state.items.filter((row)=>!removeFrags.has(row));
				reflectResults(state);
				return {...state};
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
			case 'updateSort':{
				const {key,val}=action;
				if(!action.val){
					delete state.sort[key];
					return {...state,sort:{...state.sort}};
				}
				return {...state,sort:{...state.sort,[key]:[val]}};
			}
			case 'switchSort':{
				const {key}=action;
				if(state.sort[key]==='desc'){
					delete state.sort[key];
					return {...state,sort:{...state.sort}};
				}
				return {...state,sort:{...state.sort,[key]:state.sort[key]?'desc':'asc'}};
			}
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
			case 'selectAllRowsInPage':
			case 'deselectAllRowsInPage':{
				const isSelect=action.type==='selectAllRowsInPage';
				state.index.rows.map((row)=>row._selected=false);
				const selectedRows=state.itemsInPage.filter((row)=>row._selected=isSelect);
				return {...state,selectedRows};
			}
			case 'focusItem':
				return {...state,focused:action.row};
			case 'blurItem':
				return {...state,focused:false};
			case 'setItems':{
				const maxNumPages=Math.ceil(action.items.length/state.itemsPerPage);
				return {
					...state,
					items:action.items,
					maxNumPages,
					page:Math.min(maxNumPages,state.page)
				};
			}
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
				if(!action.itemsPerPage || action.itemsPerPage===state.itemsPerPage){return state;}
				state.itemsPerPage=action.itemsPerPage;
				reflectResults(state);
				return {...state};
			}
			case 'updateDevice':{
				const device=Catpow.util.getDevice();
				if(device===state.device){return state;}
				return {...state,device:Catpow.util.getDevice()};
			}
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
		sort:props.sort || {},
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
				header:['label','name','altname'],
				tags:['group','tag'],
				excerpt:['desc'],
				address:['zip','prefecture','address'],
				contact:['tel','fax','email','url'],
				contents:['data','contents'],
				style:['color']
			}
		}
	},[]);
	
	useEffect(()=>{
		localStorage.setItem('config:'+basepath,JSON.stringify({cols:state.index.cols}));
	},[state]);
	
	useEffect(()=>{
		updateResults(state);
		dispatch({type:'update'});
	},[state.path,state.query,state.index,state.sort]);
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