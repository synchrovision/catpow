export const Nav=(props)=>{
	const {menus}=props;
	const {useState,useMemo,useCallback,useEffect,useRef,useReducer}=wp.element;
	
	if(undefined===Nav.State){Nav.State=wp.element.createContext({});}
	if(undefined===Nav.Functions){Nav.Functions=wp.element.createContext({});}
	
	const menuCurrentLevelMap=useMemo(()=>(new Map()),[]);
	const menuActiveItemIndexMap=useMemo(()=>(new Map()),[]);
	const itemMenuMap=useMemo(()=>(new Map()),[]);
	const itemIndexMap=useMemo(()=>(new Map()),[]);
	const itemParentMap=useMemo(()=>(new Map()),[]);
	const itemSiblingsMap=useMemo(()=>(new Map()),[]);
	
	const activateItem=useCallback((item)=>{
		if(!item.active){
			item.active=true;
			if(item.parent){activateItem(item.parent);}
			const activeIndex=itemIndexMap.get(item);
			itemSiblingsMap.get(item).forEach((item)=>{
				deactivateItem(item);
			});
		}
	},[]);
	const deactivateItem=useCallback((item)=>{
		if(item.active){
			item.active=false;
			if(item.children){item.children.forEach(deactivateItem);}
		}
	},[]);
	const initItem=useCallback((item)=>{
		if(undefined===item.level){item.level=0;}
		if(item.children){
			item.children.forEach((childItem,index)=>{
				childItem.level=item.level+1;
				itemMenuMap.set(childItem,itemMenuMap.get(item));
				itemIndexMap.set(childItem,index);
				itemParentMap.set(childItem,item);
				itemSiblingsMap.set(childItem,item.children.filter((sibling)=>sibling!==childItem));
				initItem(childItem);
			});
		}
	},[]);
	const init=useCallback((state)=>{
		Object.values(menus).forEach((menu)=>{
			menu.forEach((item,index)=>{
				itemMenuMap.set(item,menu);
				itemIndexMap.set(item,index);
				itemSiblingsMap.set(item,menu.filter((sibling)=>sibling!==item));
				initItem(item);
			});
		});
		return {...state,currentLevel:0};
	},[]);
	const reducer=useCallback((state,action)=>{
		switch(action.type){
			case 'activate':{
				if(action.menu){
					action.menu.forEach(deactivateItem);
					return {...state,activeMenu:action.menu,currentLevel:0};
				}
				if(action.item.active && !action.updateLevel){return state;}
				activateItem(action.item);
				const activeItem=action.item;
				const newState={
					...state,
					activeMenu:itemMenuMap.get(activeItem),
					activeItem
				};
				if(action.updateLevel){
					newState.currentLevel=action.item.level+(action.item.children?1:0);
				}
				return newState;
			}
			case 'deactivate':{
				if(action.menu){
					action.menu.forEach(deactivateItem);
					return {...state,activeMenu:null,currentLevel:0};
				}
				if(!action.item.active && !action.updateLevel){return state;}
				deactivateItem(action.item);
				if(!itemParentMap.has(action.item)){return {...state,activeItem:false,activeMenu:false,currentLevel:0};}
				const activeItem=itemParentMap.get(action.item);
				const newState={
					...state,
					activeItem
				};
				if(action.updateLevel){
					newState.currentLevel=action.item.level;
				}
				return newState;
			}
		}
	},[]);
	const [state,dispatch]=useReducer(reducer,{},init);
	
	const functions=useMemo(()=>{
		return {
			activateMenu:(menu)=>dispatch({type:'activate',menu}),
			deactivateMenu:(menu)=>dispatch({type:'deactivate',menu}),
			activateItem:(item)=>dispatch({type:'activate',item}),
			deactivateItem:(item)=>dispatch({type:'deactivate',item}),
			focusItem:(item)=>dispatch({type:'activate',item,updateLevel:true}),
			unfocusItem:(item)=>dispatch({type:'deactivate',item,updateLevel:true})
		};
	},[dispatch]);
	
	return (
		<Nav.Functions.Provider value={functions}>
			<Nav.State.Provider value={{menus,state,dispatch}}>
				{props.children}
			</Nav.State.Provider>
		</Nav.Functions.Provider>
	);
}