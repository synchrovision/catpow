import { useState, useCallback, useMemo, useReducer, useEffect } from "react";
import { Bem, DataSet, LineChartInput, Legend, DataTable } from "catpow/component";
import * as converters from "../converters.ts";

const init = ({ sizes, rolesByShorthand }) => {
	return {
		sizes,
		values: Object.keys(rolesByShorthand).reduce((p, shorthand) => {
			const role = rolesByShorthand[shorthand];
			return { ...p, [shorthand]: getValues(sizes, [role]) };
		}, {}),
		labels: Object.keys(rolesByShorthand).reduce((p, shorthand) => {
			const role = rolesByShorthand[shorthand];
			return { ...p, [shorthand]: getLabels(role) };
		}, {}),
		colors: Object.keys(rolesByShorthand).reduce((p, shorthand) => {
			const role = rolesByShorthand[shorthand];
			return { ...p, [shorthand]: getColors([role]) };
		}, {}),
		height: Object.keys(rolesByShorthand).reduce((p, shorthand) => {
			const role = rolesByShorthand[shorthand];
			return { ...p, [shorthand]: getConverter(role).height };
		}, {}),
		steps: Object.keys(rolesByShorthand).reduce((p, shorthand) => {
			const role = rolesByShorthand[shorthand];
			return { ...p, [shorthand]: getConverter(role).steps };
		}, {}),
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

const getConverter = (role) => converters[role.type + "Converter"];
const getValues = (sizes, roles) => {
	const values = [];
	let r = 0;
	roles.forEach((role) => {
		const { toValues, toSizes } = getConverter(role);
		if (role.subVariants == null) {
			Object.keys(role.variants).forEach((variantKey, i) => {
				toValues(sizes[role.shorthand + "-" + variantKey] || role.defaultValues[i]).forEach((v, j) => {
					(values[r + j] ||= []).push(v);
				});
			});
			r += toSizes.length;
		} else {
			Object.keys(role.variants).forEach((variantKey, i) => {
				Object.keys(role.subVariants).forEach((subVariantKey, j) => {
					toValues(sizes[role.shorthand + "-" + variantKey + "-" + subVariantKey] || role.defaultValues[i][j]).forEach((v, k) => {
						(values[r + k] ||= []).push(v);
					});
				});
				r += toSizes.length;
			});
		}
	});
	return values;
};
const getSizes = (values, roles) => {
	const sizes = {};
	let r = 0;
	roles.forEach((role, i) => {
		const { toSizes } = getConverter(role);
		if (role.subVariants == null) {
			Object.keys(role.variants).forEach((variantKey, j) => {
				sizes[role.shorthand + "-" + variantKey] = toSizes.apply(
					null,
					values.slice(r, r + toSizes.length).map((v) => v[j]),
				);
			});
			r += toSizes.length;
		} else {
			Object.keys(role.variants).forEach((variantKey, i) => {
				Object.keys(role.subVariants).forEach((subVariantKey, j) => {
					sizes[role.shorthand + "-" + variantKey + "-" + subVariantKey] = toSizes.apply(
						null,
						values.slice(r, r + toSizes.length).map((v) => v[j]),
					);
				});
				r += toSizes.length;
			});
		}
	});
	return sizes;
};
const getLabels = (role) => {
	const labels = { rows: [], columns: role.subVariants ? Object.values(role.subVariants) : Object.values(role.variants) };
	let r = 0;
	const { getRowLabels } = getConverter(role);
	if (role.subVariants != null) {
		Object.keys(role.variants).forEach((variantKey) => {
			labels.rows.push(...getRowLabels(role.variants[variantKey]));
		});
	} else {
		labels.rows.push(...getRowLabels(role.label));
	}
	return labels;
};
const getColors = (roles) => {
	const colors = { rows: [] };
	let r = 0;
	roles.forEach((role, i) => {
		let rowCount = getConverter(role).toSizes.length;
		if (role.subVariants != null) {
			rowCount *= Object.keys(role.variants).length;
		}
		for (let j = 0; j < rowCount; j++) {
			colors.rows.push(`oklch(${60 - i * 10}% 20% ${(i * 40 + j * 20) % 360})`);
		}
	});
	return colors;
};
const translateToDisplayValue = (value, { r }, role) => {
	const cnv = getConverter(role);
	return cnv.getDisplayValue(value, r % cnv.toSizes.length);
};

Catpow.Customize.Sizes = (props) => {
	const {
		value: sizes,
		onChange,
		param: { roles },
	} = props;

	const rolesByShorthand = useMemo(() => Object.values(roles).reduce((p, c) => ({ ...p, [c.shorthand]: c }), {}), [roles]);

	const [state, dispatch] = useReducer(reducer, { sizes, rolesByShorthand }, init);
	useEffect(() => {
		onChange(state.sizes);
	}, [state]);

	return (
		<Bem>
			{Object.keys(rolesByShorthand).map((h) => (
				<DataSet
					values={state.values[h]}
					labels={state.labels[h]}
					colors={state.colors[h]}
					steps={state.steps[h]}
					translateToDisplayValue={(value, ctx) => translateToDisplayValue(value, ctx, rolesByShorthand[h])}
					onChange={(values) => {
						dispatch({ type: "updateValues", group: h, roles: [rolesByShorthand[h]], values });
					}}
				>
					<h5 className="cp-customize__label">{rolesByShorthand[h].label}</h5>
					<Legend />
					<LineChartInput width={400} height={state.height[h]} />
					<DataTable showRowHeader={false} />
				</DataSet>
			))}
		</Bem>
	);
};
