import {DataContext} from '../JsonEditor.jsx';
import {getInputComponentForSchema} from '../functions.jsx';
import {throttle} from 'util';

const {__,sprintf}=wp.i18n;

export const Input=(props)=>{
	const {className="JsonEditor-Input",layout='block',size='medium',compact=false,level=0,agent}=props;
	const {useState,useMemo,useCallback,useEffect,useContext}=wp.element;
	const {bem}=Catpow.util;
	const classes=useMemo(()=>bem(className),[]);

	const schema=agent.getMergedSchemaForInput();
	
	const {getAdditionalInputComponent}=useContext(DataContext);

	const {description}=schema;
	const InputComponent=useMemo(()=>{
		return (
			(getAdditionalInputComponent && getAdditionalInputComponent(schema,{layout,size,compact})) || 
			getInputComponentForSchema(schema,{layout,size,compact})
		);
	},[schema,layout,size]);
	
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
		<div className={classes({'is-invalid':!agent.isValid,'is-compact':compact},`is-layout-${layout}`,`is-size-${size}`,`is-level-${level}`)} data-json-key={agent.key}>
			<div className={classes._title()}>
				<span className={classes._title.text()}>{schema.title || schema.key}</span>
			</div>
			<div className={classes._body()}>
				{agent.getMessage() && (
					<div className={classes._body.message(showMessage?'is-show':'is-hidden')}>{agent.getMessage()}</div>
				)}
				<InputComponent
					agent={agent}
					layout={layout}
					size={size}
					compact={compact}
					level={level}
					onChange={onChange}
					onUpdate={onUpdate}
					lastChanged={lastChanged}
				/>
				{description && <div className={classes._body.description()}>{description}</div>}
			</div>
		</div>
	);
}