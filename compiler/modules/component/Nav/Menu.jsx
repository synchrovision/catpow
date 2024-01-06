import {Nav} from 'component';
import {bem} from 'util';

export const Menu=(props)=>{
	const {useCallback,useMemo,useContext,useRef,useEffect}=wp.element;
	const {state,dispatch}=useContext(Nav.State);
	const {className='cp-nav-menu',menu}=props;
	const classes=useMemo(()=>bem(className),[className]);
	
	if(undefined===Menu.State){Menu.State=wp.element.createContext({});}
	
	const stateValues=useMemo(()=>({menu,level:0}),[menu]);
	
	const ref=useRef({});
	
	useEffect(()=>{
		const observer=new ResizeObserver((entries)=>{
			ref.current.style.setProperty('--inner-height',entries[0].contentRect.height + 'px');
		});
		observer.observe(ref.current.children[0]);
	},[ref.current]);
	
	return (
		<Menu.State.Provider value={stateValues}>
			<div className={classes({'is-active':state.activeMenu===menu})} onMouseLeave={()=>dispatch({type:'deactivate',menu})} ref={ref}>
				<div className={classes._body()}>
					{props.children}
				</div>
			</div>
		</Menu.State.Provider>
	);
}