export const StepSelect = (props) => {
	const { className = "cp-jsoneditor-input-stepselect", agent, onChange, onUpdate } = props;
	const { useMemo } = wp.element;
	const { bem } = Catpow.util;
	const classes = useMemo(() => bem(className), []);

	const options = useMemo(() => {
		const schema = agent.getMergedSchemaForInput();
		if (schema.items != null) {
			if (schema.items.options != null) {
				return schema.items.options;
			}
			if (schema.items.enum != null) {
				return schema.items.enum;
			}
			return [];
		}
		if (schema.options != null) {
			return schema.options;
		}
		if (schema.enum != null) {
			return schema.enum;
		}
		return [];
	}, [agent.getMergedSchemaForInput()]);

	return (
		<div className={classes()}>
			<Catpow.StepSelect options={options} multiple={agent.getMergedSchemaForInput().type === "array"} onChange={onUpdate} />
		</div>
	);
};
