import {DataContext,StateContext} from './MegaMenu.jsx';
import {Section} from './Section.jsx';

export const Panel=(props)=>{
	const {className='MegaMenu-Panel',item}=props;
	const {useMemo,useEffect,useCallback,useContext}=wp.element;
	const {bem}=Catpow.util;
	const classes=bem(className);
	
	const data=useContext(DataContext);
	const state=useContext(StateContext);
	
	return (
		<div className={classes({'is-active':state.activeItem===item})}>
		</div>
	);
}