import { useState, useEffect } from "react";

const options = [
	{ value: "cover", label: "外接" },
	{ value: "contain", label: "内接" },
	{ value: "auto", label: "自動" },
	{ value: "custom", label: "カスタム" },
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
