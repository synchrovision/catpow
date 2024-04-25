import {DataContext,StateContext} from './MegaMenu.jsx';

export const Section=(props)=>{
	const {className='MegaMenu-Section',item}=props;
	const {useMemo,useEffect,useCallback,useContext}=wp.element;
	const {bem}=Catpow.util;
	const classes=bem(className);
	
	const data=useContext(DataContext);
	const state=useContext(StateContext);
	
	return (
		<div className={classes()}>
		</div>
	);
}