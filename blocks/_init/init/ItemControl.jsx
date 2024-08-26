import {CP} from './CP.jsx';
import {bem} from 'util';

CP.ItemControl=(props)=>{
	const {controls,float=true,children}=props;
	const {useState}=wp.element;
	const classes=bem('CP-ItemControl');
	
	const [open,setOpen]=useState(false);
	
	return (
		<div className={classes({'is-open':open,'is-position-absolute':float})}>
			{Object.keys(controls).map((key)=>{
				return (
					<div className={classes.button('is-'+key)} onClick={controls[key]} key={key}></div>
				);
			})}
			{children && (
				<>
					<div className={classes.button('is-edit')} onClick={()=>setOpen(!open)}></div>
					<div className={classes.inputs()}>{children}</div>
				</>
			)}
		</div>
	);
};