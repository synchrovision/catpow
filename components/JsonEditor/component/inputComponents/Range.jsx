import { useCallback } from "react";
import { Bem } from "catpow/component";

export const Range = (props) => {
	const { className = "cp-jsoneditor-input-range", agent, onChange, onUpdate } = props;

	const { minimum: min, maximum: max, multipleOf: step = 1, steps } = agent.getMergedSchemaForInput();

	const onChangeHandle = useCallback(
		({ value }) => {
			onUpdate(value);
		},
		[onUpdate]
	);

	return (
		<Bem>
			<Catpow.RangeInput value={agent.getValue()} steps={steps || { [min]: 0, [max]: step }} snap={true} onChange={onChangeHandle} />
		</Bem>
	);
};
