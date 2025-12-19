import {useMemo, useCallback} from 'react';

export const DateTime = (props) => {
	const { className = "cp-jsoneditor-input-datetime", agent, onChange, onUpdate } = props;
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
			<input type="datetime-local" value={agent.getValue() || ""} onChange={onChangeHandle} onBlur={onUpdateHandle} />
		</div>
	);
};
