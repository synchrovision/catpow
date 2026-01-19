import { useState, useCallback, useMemo } from "react";
import { Bem, TabPanel, DataSet, LineChartInput, Legend, DataTable } from "catpow/component";

const labels = {
	columns: ["見出し", "リード文", "本文", "注釈"],
};

const extractValues = (vars, rolesByShorthand) => {
	return [["h", "l", "p", "c"].map((h) => parseInt(vars[h]) || parseInt(rolesByShorthand[h].default))];
};
const convertToVars = (values, rolesByShorthand) => {
	return values[0].reduce((p, c, i) => ({ ...p, [Object.keys(rolesByShorthand)[i]]: c + "%" }), {});
};

const steps = {
	100: 0,
	125: 5,
	300: 25,
};
const translateToDisplayValue = (value, { r }) => {
	return `${value}%`;
};

Catpow.Customize.LineHeight = (props) => {
	const {
		value: vars,
		onChange,
		param: { roles },
	} = props;

	const rolesByShorthand = useMemo(() => Object.values(roles).reduce((p, c) => ({ ...p, [c.shorthand]: c }), {}), [roles]);

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
			<DataSet values={values} labels={labels} steps={steps} onChange={onChangeValues} translateToDisplayValue={translateToDisplayValue}>
				<LineChartInput width={400} height={120} />
				<DataTable />
			</DataSet>
		</Bem>
	);
};
