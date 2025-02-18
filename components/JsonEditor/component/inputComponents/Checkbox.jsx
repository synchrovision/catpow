const {__,sprintf}=wp.i18n;

export const Checkbox=(props)=>{
	const {className="cp-jsoneditor-input-checkbox",agent,onChange,onUpdate}=props;
	const {useState,useMemo,useCallback,useEffect}=wp.element;
	const {bem}=Catpow.util;
	const classes=useMemo(()=>bem(className),[]);
	
	return (
		<div className={className}>
			<Catpow.CheckBoxes
				value={agent.getValue()}
				options={agent.getMergedSchemaForInput().items.enum}
				onChange={onUpdate}
			/>
		</div>
	);
}