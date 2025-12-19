import { useMemo } from "react";

export const ReadOnly = (props) => {
	const { className = "cp-jsoneditor-input-readonly", agent, onChange, onUpdate } = props;
	const { bem } = Catpow.util;
	const classes = useMemo(() => bem(className), []);

	return <div className={classes()}>{agent.getValue() || ""}</div>;
};
