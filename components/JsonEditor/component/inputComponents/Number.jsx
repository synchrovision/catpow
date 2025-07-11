﻿export const Number = (props) => {
	const { className = "cp-jsoneditor-input-number", agent, onChange, onUpdate } = props;
	const { useState, useMemo, useCallback, useEffect } = wp.element;
	const { bem } = Catpow.util;
	const classes = useMemo(() => bem(className), []);

	const { minimum: min, maximum: max, multipleOf: step } = agent.getMergedSchemaForInput();

	const onChangeHandle = useCallback(
		(e) => {
			onChange(parseFloat(e.currentTarget.value));
		},
		[onChange]
	);
	const onUpdateHandle = useCallback(
		(e) => {
			onUpdate(parseFloat(e.currentTarget.value));
		},
		[onUpdate]
	);

	return (
		<div className={classes()}>
			<input type="number" value={agent.getValue()} min={min} max={max} step={step} onChange={onChangeHandle} onBlur={onUpdateHandle} />
		</div>
	);
};
