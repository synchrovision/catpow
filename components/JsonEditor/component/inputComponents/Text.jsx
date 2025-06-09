const { __, sprintf } = wp.i18n;

export const Text = (props) => {
	const { className = "cp-jsoneditor-input-text", agent, onChange, onUpdate } = props;
	const { useState, useMemo, useCallback, useEffect } = wp.element;
	const { bem } = Catpow.util;
	const classes = useMemo(() => bem(className), []);

	const autoComplete = useMemo(() => {
		const schema = agent.getMergedSchemaForInput();
		if (schema.hasOwnProperty("autoComplete")) {
			return schema.autoComplete;
		}
		if (schema.hasOwnProperty("format")) {
			switch (schema.format) {
				case "email":
				case "idn-email":
					return "email";
				case "uri":
				case "uri-reference":
					return "url";
			}
		}
		return null;
	}, [agent.getMergedSchemaForInput()]);

	const inputType = useMemo(() => {
		const schema = agent.getMergedSchemaForInput();
		if (schema.hasOwnProperty("format")) {
			switch (schema.format) {
				case "datetime":
					return "datetime-local";
				case "uri":
					return "url";
				case "date":
				case "time":
				case "email":
					return schema.format;
				default:
					return "text";
			}
		}
		return "text";
	}, [agent.getMergedSchemaForInput()]);

	const size = useMemo(() => {
		const schema = agent.getMergedSchemaForInput();
		if (schema.hasOwnProperty("maxLength")) {
			return schema.maxLength;
		}
		return null;
	}, [agent.getMergedSchemaForInput()]);

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
		[onChange]
	);

	return (
		<div className={classes()}>
			<input type={inputType} value={agent.getValue() || ""} size={size} className={classes.input()} onChange={onChangeHandle} onBlur={onUpdateHandle} autoComplete={autoComplete} />
		</div>
	);
};
