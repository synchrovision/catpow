import {Nav,Menu} from 'component';
import {bem,getItemsOfLevel} from 'util';

export const SubMenu=(props)=>{
	const {useCallback,useMemo,useContext,useRef,useEffect}=wp.element;
	const {state}=useContext(Nav.State);
	const menuState=useContext(Menu.State);
	const {className='cp-nav-menu-submenu',menu=menuState.menu,level=menuState.level+1}=props;
	const classes=useMemo(()=>bem(className+' is-level-'+level),[className]);
	const stateValues=useMemo(()=>({menu,level}),[menu,level]);
	
	const items=useMemo(()=>getItemsOfLevel(menu,level-1).filter((item)=>item.children),[menu,level]);
	
	const isActive=items.some((item)=>item.active);
	const levelDiff=level-state.currentLevel;
	
	const classFlags=useMemo(()=>{
		const flags={'is-active':isActive};
		flags['is-upper-level']=levelDiff<0;
		flags['is-prev-level']=levelDiff===-1;
		flags['is-current-level']=levelDiff===0;
		flags['is-next-level']=levelDiff===1;
		flags['is-lower-level']=levelDiff>0;
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