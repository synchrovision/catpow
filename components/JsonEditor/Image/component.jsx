import { useState, useCallback } from "react";
import { Bem } from "catpow/component";
import { clsx } from "clsx";

window.Catpow.JsonEditor.Image = (props) => {
	const { className = "cp-jsoneditor-input-image", agent, onUpdate, keys = ["url", "alt", "width", "height", "id", "mime"] } = props;
	const [isCode, setIsCode] = useState(!!agent.getValue()?.url?.includes("["));

	const onChangeHandle = useCallback(
		(originalValue) => {
			const value = keys.reduce((value, key) => {
				if (originalValue[key] !== undefined) {
					value[key] = originalValue[key];
				}
				return value;
			}, {});
			onUpdate(value);
		},
		[onUpdate],
	);
	const onChangeCode = useCallback(
		(e) => {
			onUpdate({ url: e.target.value });
		},
		[onUpdate],
	);

	return (
		<Bem>
			<div className={className}>
				{isCode ? (
					<input className="_code" type="text" value={agent.getValue() && agent.getValue().url} onChange={onChangeCode} />
				) : (
					<Catpow.SelectMedia src={agent.getValue() && agent.getValue().url} onChange={onChangeHandle} />
				)}
				<div className="_buttons">
					<button className={clsx("_button is-image", { "is-active": !isCode })} onClick={() => setIsCode(false)}></button>
					<button className={clsx("_button is-code", { "is-active": isCode })} onClick={() => setIsCode(true)}></button>
				</div>
			</div>
		</Bem>
	);
};
