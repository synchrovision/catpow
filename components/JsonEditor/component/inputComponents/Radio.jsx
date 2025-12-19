import { useMemo } from "react";

export const Radio = (props) => {
	const { className = "cp-jsoneditor-input-radio", agent, onUpdate } = props;
	const { bem } = Catpow.util;
	const classes = useMemo(() => bem(className), []);

	const schema = agent.getMergedSchemaForInput();

	return (
		<div className={classes()}>
			<Catpow.RadioButtons value={agent.getValue()} options={schema.enum} onChange={onUpdate} />
		</div>
	);
};
