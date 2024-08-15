import {ControlContext,StateContext} from './MegaMenu.jsx';

export const MenuButton=(props)=>{
	const {className='MegaMenu-MenuButton'}=props;
	const {useMemo,useEffect,useCallback,useContext}=wp.element;
	const {bem}=Catpow.util;
	const classes=useMemo(()=>bem(className),[className]);
	
	const {toggleMenu}=useContext(ControlContext);
	const state=useContext(StateContext);
	
	return (
		<div className={classes(state.menuOpen?'is-open':'is-close')} onClick={toggleMenu}>
			<span className={classes.icon()}/>
		</div>
	);
}