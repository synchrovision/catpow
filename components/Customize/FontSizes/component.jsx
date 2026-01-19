import { useState, useCallback, useMemo } from "react";
import { Bem, DataSet, LineChartInput, Legend, DataTable } from "catpow/component";
import { range } from "catpow/util";

const staticSizeLabels = {
	rows: ["見出し(vw)", "見出し(rem)", "リード文(vw)", "リード文(rem)", "本文(vw)", "本文(rem)", "キャプション(vw)", "キャプション(rem)"],
	columns: [...range(1, 6)].map((i) => `${7 - i}`),
	cells: [[[...range(1, 6)].map((i) => `h${i}(vw)`), [...range(1, 6)].map((i) => `h${i}(rem)`), [...range(1, 6)].map((i) => `p${i}(vw)`), [...range(1, 6)].map((i) => `p${i}(rem)`)]],
};
const relativeSizeLabels = {
	columns: ["極小", "小", "大", "極大"],
};
const staticSizeColors = {
	rows: ["oklch(50% 40% 220)", "oklch(50% 80% 220)", "oklch(50% 40% 220)", "oklch(50% 80% 220)", "oklch(60% 5% 220)", "oklch(60% 10% 220)", "oklch(60% 5% 220)", "oklch(60% 10% 220)"],
};
const staticSizeClassNames = {
	rows: [
		"is-row-heading is-row-vw",
		"is-row-heading is-row-rem",
		"is-row-lead is-row-vw",
		"is-row-lead is-row-rem",
		"is-row-paragraph is-row-vw",
		"is-row-paragraph is-row-rem",
		"is-row-caption is-row-vw",
		"is-row-caption is-row-rem",
	],
};
const translateStaticValueToDisplayValue = (value, { r }) => {
	if (r % 2 === 0) {
		return `${(value / 4).toFixed(2)}`;
	}
	return `${(value / 16).toFixed(2)}`;
};
const translateRelativeValueToDisplayValue = (value, { r }) => {
	return `${value}%`;
};

const extractValuesFromSize = (size) => {
	const m = size.match(/min\((.+?)vw,(.+?)rem/);
	return [m[1] * 4, m[2] * 16];
};
const extractStaticSizeValues = (sizes, rolesByShorthand) => {
	const values = [[], [], [], [], [], [], [], []];
	[...range(1, 6)].reverse().forEach((l) => {
		const [hvw, hrem] = extractValuesFromSize(sizes[`h-${l}`] || rolesByShorthand.h.defaultValues[l - 1]);
		const [lhw, lrem] = extractValuesFromSize(sizes[`l-${l}`] || rolesByShorthand.l.defaultValues[l - 1]);
		const [pvw, prem] = extractValuesFromSize(sizes[`p-${l}`] || rolesByShorthand.p.defaultValues[l - 1]);
		const [cvw, crem] = extractValuesFromSize(sizes[`c-${l}`] || rolesByShorthand.c.defaultValues[l - 1]);
		values[0].push(hvw);
		values[1].push(hrem);
		values[2].push(lhw);
		values[3].push(lrem);
		values[4].push(pvw);
		values[5].push(prem);
		values[6].push(cvw);
		values[7].push(crem);
	});
	return values;
};
const extractRelativeSizeValues = (sizes, rolesByShorthand) => {
	return [["xsm", "sm", "lg", "xlg"].map((key) => parseInt(sizes[key]) || parseInt(rolesByShorthand[key].default))];
};

const convertValuesToSizes = (vwValue, remValue) => {
	return `min(${vwValue * 0.25}vw,${remValue * 0.0625}rem)`;
};
const valuesToStaticSizes = (values) => {
	const sizes = {};
	[...range(1, 6)].reverse().forEach((i) => {
		sizes[`h-${i}`] = convertValuesToSizes(values[0][6 - i], values[1][6 - i]);
		sizes[`l-${i}`] = convertValuesToSizes(values[2][6 - i], values[3][6 - i]);
		sizes[`p-${i}`] = convertValuesToSizes(values[4][6 - i], values[5][6 - i]);
		sizes[`c-${i}`] = convertValuesToSizes(values[6][6 - i], values[7][6 - i]);
	});
	return sizes;
};

const valuesToRelativeSizes = (values) => {
	return ["xsm", "sm", "lg", "xlg"].reduce((p, c, i) => ({ ...p, [c]: `${values[0][i]}%` }), {});
};

const staticSizeSteps = {
	8: 0,
	24: 1,
	48: 2,
	96: 4,
	192: 8,
	400: 16,
};
const relativeSizeSteps = {
	20: 0,
	125: 5,
	400: 25,
};

Catpow.Customize.FontSizes = (props) => {
	const {
		value: sizes,
		onChange,
		param: { roles },
	} = props;

	const rolesByShorthand = useMemo(() => Object.values(roles).reduce((p, c) => ({ ...p, [c.shorthand]: c }), {}), [roles]);

	const [staticSizeValues, setStaticSizeValues] = useState(extractStaticSizeValues(sizes, rolesByShorthand));
	const [relativeSizeValues, setRelativeSizeValues] = useState(extractRelativeSizeValues(sizes, rolesByShorthand));

	const onChangeStaticValues = useCallback(
		(staticSizeValues) => {
			setStaticSizeValues(staticSizeValues);
			onChange({
				...valuesToStaticSizes(staticSizeValues),
				...valuesToRelativeSizes(relativeSizeValues),
			});
		},
		[onChange, relativeSizeValues, setStaticSizeValues],
	);
	const onChangeRelativeValues = useCallback(
		(relativeSizeValues) => {
			setRelativeSizeValues(relativeSizeValues);
			onChange({
				...valuesToStaticSizes(staticSizeValues),
				...valuesToRelativeSizes(relativeSizeValues),
			});
		},
		[onChange, staticSizeValues, setRelativeSizeValues],
	);

	return (
		<Bem>
			<DataSet
				values={staticSizeValues}
				labels={staticSizeLabels}
				colors={staticSizeColors}
				classNames={staticSizeClassNames}
				steps={staticSizeSteps}
				translateToDisplayValue={translateStaticValueToDisplayValue}
				onChange={onChangeStaticValues}
			>
				<Legend />
				<LineChartInput width={400} height={600} />
			</DataSet>
			<DataSet values={relativeSizeValues} labels={relativeSizeLabels} steps={relativeSizeSteps} translateToDisplayValue={translateRelativeValueToDisplayValue} onChange={onChangeRelativeValues}>
				<DataTable />
				<LineChartInput width={400} height={300} />
			</DataSet>
		</Bem>
	);
};
