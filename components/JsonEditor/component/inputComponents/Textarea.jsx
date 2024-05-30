const {__,sprintf}=wp.i18n;

export const Textarea=(props)=>{
	const {className="JsonEditor-Input-Textarea",agent,onChange,onUpdate}=props;
	const {useState,useMemo,useCallback,useEffect}=wp.element;
	const {bem}=Catpow.util;
	const classes=useMemo(()=>bem(className),[]);
	
	const onChangeHandle=useCallback((e)=>{
		onChange(e.currentTarget.value);
	},[onChange]);
	const onUpdateHandle=useCallback((e)=>{
		onUpdate(e.currentTarget.value);
	},[onChange]);
	
	const {cols,rows}=useMemo(()=>{
		const schema=agent.getMergedSchemaForInput();
		const {cols,rows}=schema;
		return {cols,rows};
	},[agent.getMergedSchemaForInput()]);
	
	return (
		<div className={classes()}>
			<textarea
				className={classes.textarea()}
				onChange={onChangeHandle}
				onBlur={onUpdateHandle}
				value={agent.getValue() || ''}
				cols={cols}
				rows={rows}
			/>
		</div>
	);
}