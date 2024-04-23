import {Input} from './Input.jsx';

export const ObjectInput=(props)=>{
	const {className='JsonEditor-Input-ObjectInput',agent,lastChanged}=props;
	const {useState,useMemo,useCallback,useEffect,useContext}=wp.element;
	const {bem}=Catpow.util;
	const classes=useMemo(()=>bem(className),[]);
	
	const activeProperties=agent.getMergedSchemaForInput().properties;
	
	if(activeProperties == null){
		return (
			<div className={classes.message()}></div>
		);
	}
	
	return (
		<div className={classes()}>
			{Object.keys(activeProperties).map((name)=>(
				agent.properties[name] && <Input agent={agent.properties[name]} key={name}/>
			))}
		</div>
	);
}