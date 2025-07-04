export const Toggle = (props) => {
	const { className = "cp-jsoneditor-input-toggle", agent, onUpdate } = props;
	const { useMemo } = wp.element;
	const { bem } = Catpow.util;
	const classes = useMemo(() => bem(className), []);

	return (
		<div className={classes()}>
			<Catpow.Toggle value={agent.getValue()} onChange={onUpdate} />
		</div>
	);
};
