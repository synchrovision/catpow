import {CP} from './CP.jsx';

CP.Message=(props)=>{
	const {useMemo}=wp.element;
	const {bem}=Catpow.util;
	const classes=useMemo(()=>bem('CP-Message'),[]);
	return (
		<div className={classes()}>
			<div className={classes._body()}>
				{props.children}
			</div>
		</div>
	);
}