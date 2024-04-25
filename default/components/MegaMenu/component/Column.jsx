import {DataContext,StateContext} from './MegaMenu.jsx';

export const Column=(props)=>{
	const {className='MegaMenu-Column',basis=300,grow=1}=props;
	const {useMemo,useEffect,useCallback,useContext}=wp.element;
	const {bem}=Catpow.util;
	const classes=bem(className);
	
	return (
		<div className={classes()} style={{'--column-basis':basis,'--column-grow':grow}}>{props.children}</div>
	);
}