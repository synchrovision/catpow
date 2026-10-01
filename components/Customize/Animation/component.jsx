import { useMemo, useReducer, useEffect } from "react";
import { Bem, DataSet, LineChartInput, Legend, DataTable } from "catpow/component";
import { init, reducer, translateToDisplayValue } from "../Sizes/component";

Catpow.Customize.Animation = (props) => {
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
