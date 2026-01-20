import { useState, useCallback, useMemo } from "react";
import { Bem } from "catpow/component";

const extractDefaultValue = (originalValue, rolesByShorthand) => {
	return Object.keys(rolesByShorthand).reduce((p, c) => ({ ...p, [c]: originalValue?.[c] || rolesByShorthand[c].default || "" }), {});
};

Catpow.Customize.FontFamily = (props) => {
	const {
		value: originalValue,
		onChange,
		param: { roles },
	} = props;

	const rolesByShorthand = useMemo(() => Object.values(roles).reduce((p, c) => ({ ...p, [c.shorthand]: c }), {}), [roles]);

	const [values, setValues] = useState(extractDefaultValue(originalValue, rolesByShorthand));
	console.log({ originalValue, values });

	const onChangeHandle = useCallback(
		(newValues) => {
			setValues(newValues);
			onChange(newValues);
		},
		[onChange],
	);

	return (
		<Bem>
			<div className="cp-textinputs">
				{Object.keys(rolesByShorthand).map((role) => (
					<div className="_row">
						<h4 className="_label" key={role}>
							{rolesByShorthand[role].label}
						</h4>
						<input type="text" onChange={(e) => onChangeHandle({ ...values, [role]: e.target.value })} value={values[role]} />
					</div>
				))}
			</div>
		</Bem>
	);
};
