import {Nav} from 'component';
import {bem} from 'util';

export const SubMenuContents=(props)=>{
	const {useCallback,useMemo,useContext}=wp.element;
	const {dispatch}=useContext(Nav.State);
	const {className='cp-nav-submenu-contents',parent}=props;
	const classes=useMemo(()=>bem(className),[className]);
	
	return (
		<div className={classes({'is-active':parent.active})}>
			{props.children}
		</div>
	);
}