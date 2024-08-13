import {ObjectInput} from './inputComponents/ObjectInput.jsx';
import {Input} from './inputComponents/Input.jsx';
import {bem} from 'util';

export const DataContext=wp.element.createContext({});

export const JsonEditor=(props)=>{
	const {useState,useCallback,useMemo,useEffect,useRef,useReducer}=wp.element;
	const {
		className='JsonEditor-Editor',title='JsonEditor',
		schema,debug=false,onChange,autoSave=false,
		children:getAdditionalInputComponent
	}=props;
	const classes=bem(className);
	
	const [hasChange,setHasChange]=useState(false);
	const json=useMemo(()=>{
		if(typeof props.json === 'object'){return props.json;}
		if(props.json==null){return {};}
		const json=JSON.parse(props.json);
		if(json==null){return {};}
		return json;
	},[]);
	
	
	const save=useCallback(()=>{
		onChange((typeof props.json === 'object')?json:JSON.stringify(json));
		setHasChange(false);
	},[json,setHasChange,onChange]);
	
	useEffect(()=>{
		if(hasChange && autoSave){
			const timer=setTimeout(save,1000);
			return ()=>clearTimeout(timer);
		}
	},[hasChange]);
	
	
	const data=useMemo(()=>{
		return {getAdditionalInputComponent};
	},[getAdditionalInputComponent]);
	
	const rootAgent=useMemo(()=>{
		const rootAgent=Catpow.schema(schema,{debug}).createAgent(json);
		rootAgent.on('change',(e)=>{
			setHasChange(true);
		});
		return rootAgent;
	},[]);
	return (
		<DataContext.Provider value={data}>
			<div className={classes()}>
				<div className={classes._body()}>
					<div className={classes._body.header()}>
						<div className={classes._body.header.title()}>{title}</div>
						<div className={classes._body.header.controls()}>
							<div
								className={classes._body.header.controls.save({'is-active':hasChange})}
								onClick={()=>save()}
							>Save</div>
						</div>
					</div>
					<div className={classes._body.contents()}>
						<ObjectInput agent={rootAgent}/>
					</div>
				</div>
			</div>
		</DataContext.Provider>
	);
}

JsonEditor.Input=Input;