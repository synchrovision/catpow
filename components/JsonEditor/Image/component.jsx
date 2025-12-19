import {useCallback} from 'react';

window.Catpow.JsonEditor.Image=(props)=>{
	const {className="cp-jsoneditor-input-image",agent,onUpdate,keys=["url","alt","width","height","id","mime"]}=props;
	
	const onChangeHandle=useCallback((originalValue)=>{
		const value=keys.reduce((value,key)=>{
			if(originalValue[key]!==undefined){
				value[key]=originalValue[key];
			}
			return value;
		},{});
		onUpdate(value)
	},[onUpdate]);
	
	return (
		<div className={className}>
			<Catpow.SelectMedia src={agent.getValue() && agent.getValue().url} onChange={onChangeHandle}/>
		</div>
	);
}