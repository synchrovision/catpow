import {useCallback} from 'react';

window.Catpow.JsonEditor.Image=(props)=>{
	const {className="cp-jsoneditor-input-image",agent,onUpdate}=props;
	
	const onChangeHandle=useCallback((value)=>{
		onUpdate(value)
	},[onUpdate]);
	
	return (
		<div className={className}>
			<Catpow.SelectMedia src={agent.getValue() && agent.getValue().url} onChange={onChangeHandle}/>
		</div>
	);
}