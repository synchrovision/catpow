const { __ } = wp.i18n;

import { useState, useEffect } from "react";

const options = [
	{ value: "cover", label: __("外接", "catpow") },
	{ value: "contain", label: __("内接", "catpow") },
	{ value: "auto", label: __("自動", "catpow") },
	{ value: "custom", label: __("カスタム", "catpow") },
];
const regularTypes = ["cover", "contain", "auto"];

export const SelectSize = (props) => {
	const { onChange } = props;
	const { RangeControl } = wp.components;

	const [type, setType] = useState(regularTypes.includes(props.value) ? props.value : "custom");
	const [size, setSize] = useState(parseInt(props.value) || 100);

	useEffect(() => {
		onChange(type === "custom" ? size + "px" : type);
	}, [type, size]);

	return (
		<>
			<CP.SelectButtons label={props.label} onChange={setType} selected={type} options={options} />
			{type === "custom" && <RangeControl onChange={setSize} value={size} min={props.min || 5} max={props.max || 1000} step={props.step || 5} />}
		</>
	);
};
