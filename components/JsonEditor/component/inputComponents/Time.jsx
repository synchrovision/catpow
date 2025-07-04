export const Time = (props) => {
	const { className = "cp-jsoneditor-input-time", agent, onChange, onUpdate } = props;
	const { useMemo, useCallback } = wp.element;
	const { bem } = Catpow.util;
	const classes = useMemo(() => bem(className), []);

	const onChangeHandle = useCallback(
		(e) => {
			onChange(e.currentTarget.value);
		},
		[onChange]
	);
	const onUpdateHandle = useCallback(
		(e) => {
			onUpdate(e.currentTarget.value);
		},
		[onUpdate]
	);

	return (
		<div className={classes()}>
			<input type="time" value={agent.getValue() || ""} onChange={onChangeHandle} onBlur={onUpdateHandle} />
		</div>
	);
};
