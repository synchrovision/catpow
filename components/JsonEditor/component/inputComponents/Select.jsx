const { __, sprintf } = wp.i18n;

export const Select = (props) => {
	const { className = "cp-jsoneditor-input-select", agent, onChange, onUpdate } = props;
	const { useState, useMemo, useCallback, useEffect } = wp.element;
	const { bem } = Catpow.util;
	const classes = useMemo(() => bem(className), []);

	const mergedSchemaForInput = agent.getMergedSchemaForInput();

	return (
		<div className={classes()}>
			<Catpow.SelectBox value={agent.getValue()} options={mergedSchemaForInput.options || mergedSchemaForInput.enum} onChange={onUpdate} />
		</div>
	);
};
