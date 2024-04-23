import {DataContext} from '../JsonEditor.jsx';
import {getInputComponentForSchema} from '../functions.jsx';
import {throttle} from 'util';

const {__,sprintf}=wp.i18n;

export const Input=(props)=>{
	const {className="JsonEditor-Input",agent}=props;
	const {useState,useMemo,useCallback,useEffect,useContext}=wp.element;
	const {bem}=Catpow.util;
	const classes=useMemo(()=>bem(className),[]);

	const schema=agent.getMergedSchemaForInput();
	
	const {getAdditionalInputComponent}=useContext(DataContext);

	const {title,description}=schema;
	const InputComponent=useMemo(()=>{
		return (getAdditionalInputComponent && getAdditionalInputComponent(schema)) || getInputComponentForSchema(schema);
	},[schema]);
	
	const [showMessage,setShowMessage]=useState(false);

	const onChange=useCallback((value)=>{
		agent.setValue(value);
		setShowMessage(false);
	},[agent,setShowMessage]);
	
	const onUpdate=useCallback((value)=>{
		agent.setValue(value);
		agent.update();
		window.requestAnimationFrame(()=>{
			setShowMessage(true);
		});
	},[agent,setShowMessage]);

	const [lastChanged,setLastChanged]=useState(Date.now());

	useEffect(()=>{
		const cb=(e)=>{setLastChanged(Date.now());}
		agent.on('change',cb);
		return ()=>agent.off('change',cb);
	},[]);
	

	return (
		<div className={classes({'is-invalid':!agent.isValid})} data-json-key={agent.key}>
			{title && <div className={classes._title()}>{title}</div>}
			<div className={classes._body()}>
				{agent.getMessage() && <div className={classes._body.message(showMessage?'is-show':'is-hidden')}>{agent.getMessage()}</div>}
				<InputComponent agent={agent} onChange={onChange} onUpdate={onUpdate} lastChanged={lastChanged}/>
				{description && <div className={classes._body.description()}>{description}</div>}
			</div>
		</div>
	);
}