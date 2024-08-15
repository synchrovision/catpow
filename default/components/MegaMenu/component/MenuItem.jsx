import {ControlContext,DataContext,StateContext} from './MegaMenu.jsx';

export const MenuItem=(props)=>{
	const {className='MegaMenu-MenuItem',item}=props;
	const {useMemo,useEffect,useCallback,useContext}=wp.element;
	const {bem}=Catpow.util;
	const classes=bem(className);
	
	const controls=useContext(ControlContext);
	const data=useContext(DataContext);
	const state=useContext(StateContext);
	
	return (
		<div className={classes({'is-active':state.activeItem===item})}>
		</div>
	);
}