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

	const {description}=schema;
	const InputComponent=useMemo(()=>{
		return (getAdditionalInputComponent && getAdditionalInputComponent(schema)) || getInputComponentForSchema(schema);
	},[schema]);
	
	const [showMessage,setShowMessage]=useState(false);
	const [open,setOpen]=useState(schema.initialOpen || false);

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
	
	const getTitle=useMemo(()=>{
		if(!schema.title){return ()=>null;}
		if(schema.title.includes('{')){
			return (agent)=>schema.title.replaceAll(/{(.+?)}/g,(match,p1)=>{
				const names=p1.split('|');
				for(let name of names){
					if(/^("|').+\1$/.test(name)){return name.slice(1,-1);}
					if(agent.properties[name]){
						let value=agent.properties[name].getValue();
						if(value){return value;}
					}
				}
				return '';
			});
		}
		return ()=>schema.title;
	},[schema.title]);
	const title=getTitle(agent);
	
	
	const InputBody=useMemo(()=>{
		if(schema.collapsible){
			if(schema.inline){
				return ({classes,open,onClose,children})=>(
					<Catpow.Popover onClose={onClose} open={open}>
						<div className={classes()}>{children}</div>
					</Catpow.Popover>
				);
			}
			return ({classes,open,onClose,children})=>(
				<Catpow.Popup onClose={onClose} open={open}>
					<div className={classes()}>{children}</div>
				</Catpow.Popup>
			);
		}
		return ({classes,children})=><div className={classes()}>{children}</div>;
	},[schema.inline,schema.collapsible]);
	

	return (
		<div className={classes({'is-invalid':!agent.isValid,'is-collapsible':schema.collapsible,},open?'is-open':'is-close',schema.inline?'is-inline':'is-block')} data-json-key={agent.key}>
			{schema.collapsible?(
				<div className={classes._title()} onClick={()=>setOpen(!open)}>
					<span className={classes._title.text()}>{getTitle(agent)}</span>
					<span className={classes._title.arrow()}/>
				</div>
			):(
				<div className={classes._title()}>
					<span className={classes._title.text()}>{getTitle(agent)}</span>
				</div>
			)}
			<InputBody classes={classes._body} open={open} onClose={()=>setOpen(false)}>
				{agent.getMessage() && (
					<div className={classes._body.message(showMessage?'is-show':'is-hidden')}>{agent.getMessage()}</div>
				)}
				<InputComponent
					agent={agent}
					onChange={onChange}
					onUpdate={onUpdate}
					lastChanged={lastChanged}
				/>
				{description && <div className={classes._body.description()}>{description}</div>}
			</InputBody>
		</div>
	);
}