import {useMemo,useCallback} from "react";

export const Textarea = (props) => {
	const { className = "cp-jsoneditor-input-textarea", agent, onChange, onUpdate } = props;
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
		[onChange]
	);

	const { cols, rows } = useMemo(() => {
		const schema = agent.getMergedSchemaForInput();
		const { cols, rows } = schema;
		return { cols, rows };
	}, [agent.getMergedSchemaForInput()]);

	return (
		<div className={classes()}>
			<textarea className={classes.textarea()} onChange={onChangeHandle} onBlur={onUpdateHandle} value={agent.getValue() || ""} cols={cols} rows={rows} />
		</div>
	);
};
