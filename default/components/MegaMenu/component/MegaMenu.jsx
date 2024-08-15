import {SiteInfo} from './SiteInfo.jsx';
import {MainMenu} from './MainMenu.jsx';
import {PrimaryMenu} from './PrimaryMenu.jsx';
import {Panel} from './Panel.jsx';
import {MenuButton} from './MenuButton.jsx';

export const ControlContext=wp.element.createContext({});
export const DataContext=wp.element.createContext({});
export const StateContext=wp.element.createContext({});

export const MegaMenu=(props)=>{
	const {className='MegaMenu'}=props;
	const {useMemo,useEffect,useCallback,useReducer}=wp.element;
	const {bem}=Catpow.util;
	const classes=bem(className);
	
	const data=useMemo(()=>{
		const allMenuItems=[];
		const initMenuItem=(menuItems,parentItem)=>{
			if(menuItems && menuItems.forEach){
				menuItems.forEach((item)=>{
					if(item.children){
						setRefToParent(item.children,item);
					}
				});
			}
		};
		if(props.menu){
			for(const name in props.menu){
				if(props.menu[name]){initMenuItem(props.menu[name].items,props.menu[name]);}
			}
		}
		return {...props,allMenuItems};
	},[props]);
	
	const init=useCallback((state)=>{
		const itemStatusMap=new Map();
		//find current menu item for current URL and apply status to it and its anscestors
		
		const currentUrlPath=location.pathname;
		data.allMenuItems.forEach((item)=>{
			if(item.path===location.pathname){
				let currentItem=item;
				while(currentItem.parent){
					
					currentItem=currentItem.parent;
				}
			}
		});
		return state;
	},[data]);
	const reducer=useCallback((state,action)=>{
		switch(action.type){
			case 'TOGGLE_MENU':{
				return {...state,menuOpen:!state.menuOpen}
			}
			case 'ACTIVATE_ITEM':{
				return {...state};
			}
			case 'DEACTIVATE_ITEM':{
				return {...state};
			}
		}
		return state;
	},[]);
	const [state,dispatch]=useReducer(reducer,{},init);
	
	const controls=useMemo(()=>{
		const toggleMenu=()=>{
			dispatch({type:'TOGGLE_MENU'});
		};
		return {dispatch,toggleMenu};
	},[dispatch]);
	
	return (
		<ControlContext.Provider value={controls}>
			<DataContext.Provider value={data}>
				<StateContext.Provider value={state}>
					<div className={classes()}>
						<div className={classes._contents()}>
							<SiteInfo/>
							<div className={classes._contents.menus({'is-open':state.menuOpen})}>
								<MainMenu/>
								<PrimaryMenu/>
							</div>
							<MenuButton/>
						</div>
						<Panel/>
					</div>
				</StateContext.Provider>
			</DataContext.Provider>
		</ControlContext.Provider>
	);
}