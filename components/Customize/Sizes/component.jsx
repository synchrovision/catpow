import { useState, useCallback, useMemo, useReducer, useEffect } from "react";
import { Bem, DataSet, LineChartInput, Legend, DataTable } from "catpow/component";

const init = ({ sizes, rolesByGroup }) => {
	return {
		sizes,
		values: Object.keys(rolesByGroup).reduce((p, group) => ({ ...p, [group]: getValues(sizes, rolesByGroup[group]) }), {}),
		labels: Object.keys(rolesByGroup).reduce((p, group) => ({ ...p, [group]: getLabels(rolesByGroup[group]) }), {}),
		colors: Object.keys(rolesByGroup).reduce((p, group) => ({ ...p, [group]: getColors(rolesByGroup[group]) }), {}),
		height: Object.keys(rolesByGroup).reduce((p, group) => ({ ...p, [group]: valueSizeConverters[rolesByGroup[group][0].type].height }), {}),
		steps: Object.keys(rolesByGroup).reduce((p, group) => ({ ...p, [group]: valueSizeConverters[rolesByGroup[group][0].type].steps }), {}),
	};
};
const reducer = (state, action) => {
	switch (action.type) {
		case "updateValues": {
			const { roles, group, values } = action;
			return { ...state, values: { ...state.values, [group]: values }, sizes: { ...state.sizes, ...getSizes(values, roles) } };
		}
	}
	return state;
};

const getValues = (sizes, roles) => {
	const values = [];
	let r = 0;
	roles.forEach((role) => {
		const { toValues, toSizes } = valueSizeConverters[role.type];
		Object.keys(role.variants).forEach((variantKey, i) => {
			toValues(sizes[role.shorthand + "-" + variantKey] || role.defaultValues[i]).forEach((v, j) => {
				(values[r + j] ||= []).push(v);
			});
		});
		r += toSizes.length;
	});
	return values;
};
const getSizes = (values, roles) => {
	const sizes = {};
	let r = 0;
	roles.forEach((role, i) => {
		const { toSizes } = valueSizeConverters[role.type];
		Object.keys(role.variants).forEach((variantKey, j) => {
			sizes[role.shorthand + "-" + variantKey] = toSizes.apply(
				null,
				values.slice(r, r + toSizes.length).map((v) => v[j]),
			);
		});
		r += toSizes.length;
	});
	return sizes;
};
const getLabels = (roles) => {
	const labels = { rows: [], columns: Object.values(roles[0].variants) };
	let r = 0;
	roles.forEach((role, i) => {
		const { getRowLabels } = valueSizeConverters[role.type];
		labels.rows.push(...getRowLabels(role));
	});
	return labels;
};
const getColors = (roles) => {
	const colors = { rows: [] };
	let r = 0;
	roles.forEach((role, i) => {
		const rowCount = valueSizeConverters[role.type].toSizes.length;
		for (let j = 0; j < rowCount; j++) {
			colors.rows.push(`oklch(${60 - i * 10}% 20% ${(i * 40 + j * 20) % 360})`);
		}
	});
	return colors;
};
const translateToDisplayValue = (value, { r }, roles) => {
	let n = r;
	const role = roles.find((role) => {
		const l = valueSizeConverters[role.type].toSizes.length;
		if (n < l) {
			return true;
		}
		n -= l;
		return false;
	});
	return valueSizeConverters[role.type].getDisplayValue(value, n);
};
const valueSizeConverters = {
	size: {
		steps: {
			80: 0,
			480: 20,
			960: 40,
			1920: 80,
			4000: 160,
		},
		height: 600,
		getRowLabels: (role) => ["(vw)", "(rem)"].map((suffix) => role.label + suffix),
		toValues: (size) =>
			size
				.match(/min\((.+?)vw,(.+?)rem\)/)
				.slice(1)
				.map((v, i) => (i === 0 ? v * 4 : v * 16)),
		toSizes: (vw, rem) => `min(${(vw / 4).toFixed(2)}vw,${(rem / 16).toFixed(2)}rem)`,
		getDisplayValue: (val, n) => (n % 2 ? val / 16 : val / 4),
	},
	sizeRelative: {
		steps: {
			80: 0,
			480: 20,
			960: 40,
		},
		height: 400,
		getRowLabels: (role) => [role.label + "(em)"],
		toValues: (size) => [parseFloat(size) * 16],
		toSizes: (value) => `${value / 16}em`,
		getDisplayValue: (val) => val / 16,
	},
	spacingeRelative: {
		steps: {
			20: 4,
			40: 8,
			80: 16,
			160: 32,
			320: 64,
		},
		height: 160,
		getRowLabels: (role) => [role.label + "(em)"],
		toValues: (size) => [parseFloat(size) * 16],
		toSizes: (value) => `${value / 16}em`,
		getDisplayValue: (val) => val / 16,
	},
	radiusRelative: {
		steps: {
			8: 2,
			24: 4,
			48: 8,
		},
		height: 120,
		getRowLabels: (role) => [role.label + "(em)"],
		toValues: (size) => [parseFloat(size) * 16],
		toSizes: (value) => `${value / 16}em`,
		getDisplayValue: (val) => val / 16,
	},
	spacing: {
		steps: {
			20: 4,
			40: 8,
			80: 16,
			160: 32,
			320: 64,
		},
		height: 160,
		getRowLabels: (role) => ["(vw)", "(rem)"].map((suffix) => role.label + suffix),
		toValues: (size) =>
			size
				.match(/min\((.+?)vw,(.+?)rem\)/)
				.slice(1)
				.map((v, i) => (i === 0 ? v * 4 : v * 16)),
		toSizes: (vw, rem) => `min(${(vw / 4).toFixed(2)}vw,${(rem / 16).toFixed(2)}rem)`,
		getDisplayValue: (val, n) => (n % 2 ? val / 16 : val / 4),
	},
	padding: {
		steps: {
			20: 4,
			40: 8,
			80: 16,
			160: 32,
			320: 64,
		},
		height: 160,
		getRowLabels: (role) => ["縦(vw)", "縦(rem)", "横(vw)", "横(rem)"].map((suffix) => role.label + suffix),
		toValues: (size) =>
			size
				.match(/min\((.+?)vw,(.+?)rem\) min\((.+?)vw,(.+?)rem\)/)
				.slice(1)
				.map((v, i) => (i % 2 === 0 ? v * 4 : v * 16)),
		toSizes: (vw1, rem1, vw2, rem2) => `min(${(vw1 / 4).toFixed(2)}vw,${(rem1 / 16).toFixed(2)}rem) min(${(vw2 / 4).toFixed(2)}vw,${(rem2 / 16).toFixed(2)}rem)`,
		getDisplayValue: (val, n) => (n % 2 ? val / 16 : val / 4),
	},
	paddingVertical: {
		steps: {
			20: 4,
			40: 8,
			80: 16,
			160: 32,
			320: 64,
		},
		height: 160,
		getRowLabels: (role) => ["上(vw)", "上(rem)", "下(vw)", "下(rem)"].map((suffix) => role.label + suffix),
		toValues: (size) =>
			size
				.match(/min\((.+?)vw,(.+?)rem\) 0 min\((.+?)vw,(.+?)rem\)/)
				.slice(1)
				.map((v, i) => (i % 2 === 0 ? v * 4 : v * 16)),
		toSizes: (vw1, rem1, vw2, rem2) => `min(${(vw1 / 4).toFixed(2)}vw,${(rem1 / 16).toFixed(2)}rem) 0 min(${(vw2 / 4).toFixed(2)}vw,${(rem2 / 16).toFixed(2)}rem)`,
		getDisplayValue: (val, n) => (n % 2 ? val / 16 : val / 4),
	},
	gap: {
		steps: {
			40: 4,
			80: 8,
			160: 16,
		},
		height: 120,
		getRowLabels: (role) => ["縦(vw)", "縦(rem)", "横(vw)", "横(rem)"].map((suffix) => role.label + suffix),
		toValues: (size) =>
			size
				.match(/min\((.+?)vw,(.+?)rem\) min\((.+?)vw,(.+?)rem\)/)
				.slice(1)
				.map((v, i) => (i % 2 === 0 ? v * 4 : v * 16)),
		toSizes: (vw1, rem1, vw2, rem2) => `min(${(vw1 / 4).toFixed(2)}vw,${(rem1 / 16).toFixed(2)}rem) min(${(vw2 / 4).toFixed(2)}vw,${(rem2 / 16).toFixed(2)}rem)`,
		getDisplayValue: (val, n) => (n % 2 ? val / 16 : val / 4),
	},
};

Catpow.Customize.Sizes = (props) => {
	const {
		value: sizes,
		onChange,
		param: { roles },
	} = props;

	const rolesByShorthand = useMemo(() => Object.values(roles).reduce((p, c) => ({ ...p, [c.shorthand]: c }), {}), [roles]);
	const rolesByGroup = useMemo(() => {
		const groups = {};
		Object.values(roles).forEach((role) => {
			(groups[role.group] ||= []).push(role);
		});
		return groups;
	}, [roles]);

	const [state, dispatch] = useReducer(reducer, { sizes, rolesByGroup }, init);
	useEffect(() => {
		onChange(state.sizes);
	}, [state]);

	return (
		<Bem>
			{Object.keys(rolesByGroup).map((groupKey) => (
				<DataSet
					values={state.values[groupKey]}
					labels={state.labels[groupKey]}
					colors={state.colors[groupKey]}
					steps={state.steps[groupKey]}
					translateToDisplayValue={(value, ctx) => translateToDisplayValue(value, ctx, rolesByGroup[groupKey])}
					onChange={(values) => {
						dispatch({ type: "updateValues", group: groupKey, roles: rolesByGroup[groupKey], values });
					}}
				>
					<h5 className="cp-customize__label">{groupKey}</h5>
					<Legend />
					<LineChartInput width={400} height={state.height[groupKey]} />
					<DataTable showRowHeader={false} />
				</DataSet>
			))}
		</Bem>
	);
};
