import { useCallback } from "react";
import { Bem } from "catpow/component";

export const Range = (props) => {
	const { className = "cp-jsoneditor-input-range", agent, onChange, onUpdate } = props;

	const { minimum: min, maximum: max, multipleOf: step } = agent.getMergedSchemaForInput();

	const onUpdateHandle = useCallback(
		(e) => {
			onUpdate(parseFloat(e.currentTarget.value));
		},
		[onUpdate]
	);

	return (
		<Bem>
			<div className={className}>
				<input className="_range" type="range" value={agent.getValue()} min={min} max={max} step={step} onChange={onUpdateHandle} />
				<input className="_input" type="number" value={agent.getValue()} min={min} max={max} step={step} onChange={onUpdateHandle} />
			</div>
		</Bem>
	);
};
