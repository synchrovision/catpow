import { useState, useCallback, useMemo } from "react";
import { Bem, DataSet, LineChartInput, Legend, DataTable } from "catpow/component";
import { range } from "catpow/util";

const labels = {
	rows: ["見出し(vw)", "見出し(rem)", "本文(vw)", "本文(rem)"],
	columns: [...range(1, 6)].map((i) => `${7 - i}`),
	cells: [[[...range(1, 6)].map((i) => `h${i}(vw)`), [...range(1, 6)].map((i) => `h${i}(rem)`), [...range(1, 6)].map((i) => `p${i}(vw)`), [...range(1, 6)].map((i) => `p${i}(rem)`)]],
};
const colors = {
	rows: ["oklch(50% 40% 220)", "oklch(50% 80% 220)", "oklch(60% 5% 220)", "oklch(60% 10% 220)"],
};
const classNames = {
	rows: ["is-row-heading is-row-vw", "is-row-heading is-row-rem", "is-row-paragraph is-row-vw", "is-row-paragraph is-row-rem"],
};
const translateToDisplayValue = (value, { r }) => {
	if (r % 2 === 0) {
		return `${(value / 4).toFixed(2)}`;
	}
	return `${(value / 16).toFixed(2)}`;
};

const extractValuesFromSize = (size) => {
	const m = size.match(/min\((.+?)vw,(.+?)rem/);
	return [m[1] * 4, m[2] * 16];
};
const sizesToValues = (sizes, rolesByShorthand) => {
	const values = [[], [], [], []];
	[...range(1, 6)].reverse().forEach((i) => {
		const [hvw, hrem] = extractValuesFromSize(sizes[`h${i}`] || rolesByShorthand[`h${i}`].default);
		const [pvw, prem] = extractValuesFromSize(sizes[`p${i}`] || rolesByShorthand[`p${i}`].default);
		values[0].push(hvw);
		values[1].push(hrem);
		values[2].push(pvw);
		values[3].push(prem);
	});
	return values;
};

const convertValuesToSizes = (vwValue, remValue) => {
	return `min(${vwValue * 0.25}vw,${remValue * 0.0625}rem)`;
};
const valuesToSizes = (values) => {
	const sizes = {};
	[...range(1, 6)].reverse().forEach((i) => {
		sizes[`h${i}`] = convertValuesToSizes(values[0][6 - i], values[1][6 - i]);
		sizes[`p${i}`] = convertValuesToSizes(values[2][6 - i], values[3][6 - i]);
	});
	return sizes;
};

const steps = {
	8: 0,
	24: 1,
	48: 2,
	96: 4,
	192: 8,
	400: 16,
};

Catpow.Customize.FontSizes = (props) => {
	const {
		value: sizes,
		onChange,
		param: { roles },
	} = props;

	const rolesByShorthand = useMemo(() => Object.values(roles).reduce((p, c) => ({ ...p, [c.shorthand]: c }), {}), [roles]);

	const [values, setValues] = useState(sizesToValues(sizes, rolesByShorthand));

	const onChangeHandle = useCallback(
		(values) => {
			setValues(values);
			onChange(valuesToSizes(values));
		},
		[onChange, setValues]
	);

	return (
		<Bem>
			<DataSet values={values} labels={labels} colors={colors} classNames={classNames} steps={steps} translateToDisplayValue={translateToDisplayValue} onChange={onChangeHandle}>
				<Legend />
				<LineChartInput width={400} height={600} />
				<DataTable />
			</DataSet>
		</Bem>
	);
};
