import { useState, useCallback, useMemo } from "react";
import { Bem, TabPanel, DataSet, LineChartInput, Legend, DataTable } from "catpow/component";

const labels = {
	columns: ["見出し", "リード文", "本文", "注釈"],
};

const extractValues = (vars, rolesByShorthand) => {
	return [
		["h", "l", "p", "c"].map((h) => {
			const value = vars[h] || rolesByShorthand[h].default;
			return value === "normal" ? 0 : parseInt(value);
		}),
	];
};
const convertToVars = (values, rolesByShorthand) => {
	return values[0].reduce((p, c, i) => ({ ...p, [Object.keys(rolesByShorthand)[i]]: c == 0 ? "normal" : c + "%" }), {});
};

const steps = {
	25: 5,
	100: 25,
};
const translateToDisplayValue = (value, { r }) => {
	return value === 0 ? "normal" : `${value}%`;
};

Catpow.Customize.LetterSpacing = (props) => {
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
				<LineChartInput width={400} height={80} />
				<DataTable />
			</DataSet>
		</Bem>
	);
};
