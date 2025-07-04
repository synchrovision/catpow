export const Select = (props) => {
	const { className = "cp-jsoneditor-input-select", agent, onUpdate } = props;
	const { useMemo } = wp.element;
	const { bem } = Catpow.util;
	const classes = useMemo(() => bem(className), []);

	const mergedSchemaForInput = agent.getMergedSchemaForInput();

	return (
		<div className={classes()}>
			<Catpow.SelectBox value={agent.getValue()} options={mergedSchemaForInput.options || mergedSchemaForInput.enum} onChange={onUpdate} />
		</div>
	);
};
