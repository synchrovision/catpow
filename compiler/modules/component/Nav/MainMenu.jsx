import {Nav,Menu} from 'component';
import {bem,getItemsOfLevel} from 'util';

export const MainMenu=(props)=>{
	const {useCallback,useMemo,useContext,useRef,useEffect}=wp.element;
	const {state}=useContext(Nav.State);
	const menuState=useContext(Menu.State);
	const {className='cp-nav-menu-mainmenu',menu=menuState.menu}=props;
	const classes=useMemo(()=>bem(className),[className]);
	const stateValues=useMemo(()=>({menu,level:0}),[menu]);
	
	const isActive=state.activeMenu===menu;
	const levelDiff=-state.currentLevel;
	
	const classFlags=useMemo(()=>{
		const flags={'is-active':isActive};
		flags['is-current-level']=levelDiff===0;
		flags['is-upper-level']=levelDiff<0;
		flags['is-prev-level']=levelDiff===-1;
		return flags;
	},[isActive,levelDiff]);
	
	const ref=useRef({});
	
	useEffect(()=>{
		const observer=new ResizeObserver((entries)=>{
			ref.current.style.setProperty('--inner-height',entries[0].contentRect.height + 'px');
		});
		observer.observe(ref.current.children[0]);
	},[ref.current]);
	
	return (
		<Menu.State.Provider value={stateValues}>
			<div className={classes(classFlags)} ref={ref}>
				<div className={classes._body()}>
					{props.children}
				</div>
			</div>
		</Menu.State.Provider>
	);
}