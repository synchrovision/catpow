import { useState, useCallback, useMemo } from "react";
import { Bem, TabPanel, DataSet, LineChartInput, Legend, DataTable } from "catpow/component";

const extractLabels = (rolesByShorthand) => ({
	columns: Object.keys(rolesByShorthand).map((h) => rolesByShorthand[h].label),
});

const extractValues = (vars, rolesByShorthand) => {
	return [Object.keys(rolesByShorthand).map((h) => parseInt(vars[h]) || parseInt(rolesByShorthand[h].default))];
};
const convertToVars = (values, rolesByShorthand) => {
	return values[0].reduce((p, c, i) => ({ ...p, [Object.keys(rolesByShorthand)[i]]: c }), {});
};

const steps = {
	100: 0,
	900: 100,
};

Catpow.Customize.FontWeight = (props) => {
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
				<LineChartInput width={400} height={80} />
				<DataTable />
			</DataSet>
		</Bem>
	);
};
