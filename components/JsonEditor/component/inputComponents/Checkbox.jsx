export const Checkbox = (props) => {
	const { className = "cp-jsoneditor-input-checkbox", agent, onUpdate } = props;
	return (
		<div className={className}>
			<Catpow.CheckBoxes value={agent.getValue()} options={agent.getMergedSchemaForInput().items.enum} onChange={onUpdate} />
		</div>
	);
};
