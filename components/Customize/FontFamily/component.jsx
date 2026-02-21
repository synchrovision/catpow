import { useState, useCallback, useMemo } from "react";
import { Bem } from "catpow/component";

const extractDefaultValues = (originalValue, rolesByShorthand) => {
	const values = {};
	Object.keys(rolesByShorthand).forEach((c) => {
		Object.keys(rolesByShorthand[c].variants).forEach((variantKey, i) => {
			values[c + "-" + variantKey] = originalValue?.[c + "-" + variantKey] || rolesByShorthand[c].defaultValues?.[i] || "";
		});
	});
	return values;
};

Catpow.Customize.FontFamily = (props) => {
	const {
		value: originalValue,
		onChange,
		param: { roles },
	} = props;

	const rolesByShorthand = useMemo(() => Object.values(roles).reduce((p, c) => ({ ...p, [c.shorthand]: c }), {}), [roles]);

	const [values, setValues] = useState(extractDefaultValues(originalValue, rolesByShorthand));

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
				{Object.keys(rolesByShorthand).map((role) =>
					Object.keys(rolesByShorthand[role].variants).map((variantKey) => (
						<div className="_row">
							<h5 className="_label" key={role}>
								{rolesByShorthand[role].variants[variantKey]}
							</h5>
							<input type="text" onChange={(e) => onChangeHandle({ ...values, [role + "-" + variantKey]: e.target.value })} value={values[role + "-" + variantKey]} />
						</div>
					)),
				)}
			</div>
		</Bem>
	);
};
