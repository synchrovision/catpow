﻿import {ControlContext,DataContext,StateContext} from './MegaMenu.jsx';
import {MenuItem} from './MenuItem.jsx';

export const MainMenu=(props)=>{
	const {className='MegaMenu-MainMenu',item}=props;
	const {useMemo,useEffect,useCallback,useContext}=wp.element;
	const {bem}=Catpow.util;
	const classes=bem(className);
	
	const controls=useContext(ControlContext);
	const data=useContext(DataContext);
	const state=useContext(StateContext);
	
	const menuData=data.menu.main;
	
	if(!menuData || !menuData.items){return false;}
	
	return (
		<div className={classes()}>
			<ul className={classes.items()}>
			{menuData.items.map((item,index)=>(
				<li className={classes.items.item()} key={index}>
					<a className={classes.items.item.link()} href={item.link && item.link.url}>
						<span className={classes.items.item.link.title()}>{item.title}</span>
						<span className={classes.items.item.link.name()}>{item.name}</span>
					</a>
				</li>
			))}
			</ul>
		</div>
	);
}