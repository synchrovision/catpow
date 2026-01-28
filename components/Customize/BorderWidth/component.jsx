import { useState, useCallback, useMemo } from "react";
import { Bem, DataSet, LineChartInput, DataTable } from "catpow/component";

const extractLabels = (rolesByShorthand) => ({
	columns: Object.values(Object.values(rolesByShorthand)[0].variants),
});

const extractValues = (vars, rolesByShorthand) => {
	return Object.keys(rolesByShorthand).map((h) => Object.keys(rolesByShorthand[h].variants).map((v, c) => parseFloat(vars[`${h}-${v}`] || rolesByShorthand[h].defaultValues[c]) * 16));
};
const convertToVars = (values, rolesByShorthand) => {
	return Object.keys(rolesByShorthand).reduce((p, h, r) => {
		Object.keys(rolesByShorthand[h].variants).forEach((v, c) => {
			p[`${h}-${v}`] = values[r][c] / 16 + "rem";
		});
		return p;
	}, {});
};

const steps = {
	8: 1,
	16: 2,
};

Catpow.Customize.BorderWidth = (props) => {
	const {
		value: vars,
		onChange,
		param: { roles },
	} = props;

	const rolesByShorthand = useMemo(() => Object.values(roles).reduce((p, c) => ({ ...p, [c.shorthand]: c }), {}), [roles]);
	const labels = useMemo(() => extractLabels(rolesByShorthand), [rolesByShorthand]);

	const [values, setValues] = useState(extractValues(vars, rolesByShorthand));

	const onChangeValues = useCallback(
		(values) => {
			setValues(values);
			onChange(convertToVars(values, rolesByShorthand));
		},
		[onChange, rolesByShorthand],
	);

	return (
		<Bem>
			<DataSet values={values} labels={labels} steps={steps} onChange={onChangeValues}>
				<LineChartInput width={400} height={120} />
				<DataTable />
			</DataSet>
		</Bem>
	);
};
