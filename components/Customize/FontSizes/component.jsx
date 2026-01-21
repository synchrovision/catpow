import { useState, useCallback, useMemo } from "react";
import { Bem, DataSet, LineChartInput, Legend, DataTable } from "catpow/component";
import { range } from "catpow/util";

const extractStaticSizeLabels = (rolesByShorthand) => ({
	rows: Object.keys(rolesByShorthand)
		.filter((key) => !rolesByShorthand[key].relative)
		.reduce((p, c) => {
			p.push(`${rolesByShorthand[c].label}(vw)`);
			p.push(`${rolesByShorthand[c].label}(rem)`);
			return p;
		}, []),
	columns: Object.values(Object.values(rolesByShorthand).find((role) => !role.relative).variants),
});
const extractRelativeSizeLabels = (rolesByShorthand) => ({
	columns: Object.keys(rolesByShorthand)
		.filter((key) => rolesByShorthand[key].relative)
		.map((key) => rolesByShorthand[key].label),
});
const getStaticSizeColors = (rolesByShorthand) => ({
	rows: Object.keys(rolesByShorthand)
		.filter((key) => !rolesByShorthand[key].relative)
		.reduce((p, c, i) => {
			p.push(`oklch(60% 20% ${i * 30 + 120})`);
			p.push(`oklch(50% 80% ${i * 30 + 120})`);
			return p;
		}, []),
});
const getStaticSizeClassNames = (roles) => ({
	rows: Object.keys(roles)
		.filter((key) => !roles[key].relative)
		.reduce((p, c) => {
			p.push(`is-row-${c} is-row-vw`);
			p.push(`is-row-${c} is-row-rem`);
			return p;
		}, []),
});
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
	const keys = Object.keys(rolesByShorthand).filter((key) => !rolesByShorthand[key].relative);
	const values = [];
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		values.push([], []);
		Object.keys(rolesByShorthand[key].variants).forEach((l, j) => {
			const [vw, rem] = extractValuesFromSize(sizes[`${key}-${l}`] || rolesByShorthand[key].defaultValues[j]);
			values[i * 2].push(vw);
			values[i * 2 + 1].push(rem);
		});
	}
	return values;
};
const extractRelativeSizeValues = (sizes, rolesByShorthand) => {
	return [
		Object.keys(rolesByShorthand)
			.filter((key) => rolesByShorthand[key].relative)
			.map((key) => parseInt(sizes[key]) || parseInt(rolesByShorthand[key].default)),
	];
};

const convertValuesToSizes = (vwValue, remValue) => {
	return `min(${vwValue * 0.25}vw,${remValue * 0.0625}rem)`;
};
const valuesToStaticSizes = (values, rolesByShorthand) => {
	const sizes = {};
	const keys = Object.keys(rolesByShorthand).filter((key) => !rolesByShorthand[key].relative);
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		Object.keys(rolesByShorthand[key].variants).forEach((l, j) => {
			sizes[`${key}-${l}`] = convertValuesToSizes(values[i * 2][j], values[i * 2 + 1][j]);
		});
	}
	return sizes;
};

const valuesToRelativeSizes = (values, rolesByShorthand) => {
	return Object.keys(rolesByShorthand)
		.filter((key) => rolesByShorthand[key].relative)
		.reduce((p, c, i) => ({ ...p, [c]: `${values[0][i]}%` }), {});
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
	const staticSizeLabels = useMemo(() => extractStaticSizeLabels(rolesByShorthand), [rolesByShorthand]);
	const relativeSizeLabels = useMemo(() => extractRelativeSizeLabels(rolesByShorthand), [rolesByShorthand]);

	const staticSizeClassNames = useMemo(() => getStaticSizeClassNames(roles), [roles]);
	const staticSizeColors = useMemo(() => getStaticSizeColors(rolesByShorthand), [rolesByShorthand]);

	const [staticSizeValues, setStaticSizeValues] = useState(extractStaticSizeValues(sizes, rolesByShorthand));
	const [relativeSizeValues, setRelativeSizeValues] = useState(extractRelativeSizeValues(sizes, rolesByShorthand));

	const onChangeStaticValues = useCallback(
		(staticSizeValues) => {
			setStaticSizeValues(staticSizeValues);
			onChange({
				...valuesToStaticSizes(staticSizeValues, rolesByShorthand),
				...valuesToRelativeSizes(relativeSizeValues, rolesByShorthand),
			});
		},
		[onChange, rolesByShorthand, relativeSizeValues, setStaticSizeValues],
	);
	const onChangeRelativeValues = useCallback(
		(relativeSizeValues) => {
			setRelativeSizeValues(relativeSizeValues);
			onChange({
				...valuesToStaticSizes(staticSizeValues, rolesByShorthand),
				...valuesToRelativeSizes(relativeSizeValues, rolesByShorthand),
			});
		},
		[onChange, rolesByShorthand, staticSizeValues, setRelativeSizeValues],
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
				<DataTable showRowHeader={false} />
			</DataSet>
			<DataSet values={relativeSizeValues} labels={relativeSizeLabels} steps={relativeSizeSteps} translateToDisplayValue={translateRelativeValueToDisplayValue} onChange={onChangeRelativeValues}>
				<LineChartInput width={400} height={300} />
				<DataTable />
			</DataSet>
		</Bem>
	);
};
