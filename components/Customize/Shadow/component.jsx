import { useMemo, useEffect, useReducer } from "react";
import { Bem, Toggle, AngleInput, RangeInput, DataSet, Legend, LineChartInput, DataTable } from "catpow/component";

const extractLabels = ({ rolesByShorthand }) =>
	Object.keys(rolesByShorthand).reduce(
		(p, c) => ({
			...p,
			[c]: { columns: Object.values(rolesByShorthand[c].variants) },
		}),
		{},
	);

const extractValues = ({ vars, rolesByShorthand }) =>
	Object.keys(rolesByShorthand).reduce(
		(p, h) => ({
			...p,
			[h]: Object.keys(rolesByShorthand[h].variants).reduce(
				(p, v, c) => {
					const matches = (vars[`${h}-${v}`] || rolesByShorthand[h].defaultValues[c]).match(
						/^(inset )?calc\(sin\(\d+deg\) \* cos\(\d+deg\) \* \d+px\) calc\(cos\((\d+)deg\) \* cos\((\d+)deg\) \* (\d+)px\) calc\(\d+px \* ([\d\.]+)\) calc\(\d+px \* ([\d\.]+)\)/,
					);
					if (matches) {
						p.angles.push(matches[2]);
						p.heights.push(matches[3]);
						p.offsetValues.push(matches[4] * (matches[1] ? -1 : 1));
						p.growBlurs.push(matches[5] * 10);
						p.growSpreads.push(matches[6] * 10);
					} else {
						p.angles.push(0);
						p.heights.push(0);
						p.offsetValues.push(0);
						p.growBlurs.push(0);
						p.growSpreads.push(0);
					}
					return p;
				},
				{ angles: [], heights: [], offsetValues: [], growBlurs: [], growSpreads: [] },
			),
		}),
		{},
	);
const convertToVars = ({ values, rolesByShorthand }) => {
	return Object.keys(rolesByShorthand).reduce((p, h, r) => {
		const { angles, heights, offsetValues, growBlurs, growSpreads } = values[h];
		Object.keys(rolesByShorthand[h].variants).forEach((v, c) => {
			const offset = offsetValues[c];
			p[`${h}-${v}`] =
				offsetValues[c] !== 0
					? `${offset < 0 ? "inset " : ""}calc(sin(${angles[c] + 180}deg) * cos(${heights[c]}deg) * ${Math.abs(offset)}px) calc(cos(${angles[c]}deg) * cos(${heights[c]}deg) * ${Math.abs(offset)}px) calc(${Math.abs(offset)}px * ${growBlurs[c] / 10}) calc(${Math.abs(offset)}px * ${growSpreads[c] / 10})`
					: "none";
		});
		return p;
	}, {});
};

const angleSteps = {
	360: 15,
};
const heightSteps = {
	90: 5,
};
const offsetSteps = {
	[-64]: 0,
	[-32]: 16,
	[-16]: 8,
	[-8]: 4,
	[-4]: 2,
	4: 1,
	8: 2,
	16: 4,
	32: 8,
	64: 16,
};
const blurSteps = {
	4: 1,
	8: 2,
	16: 4,
	32: 8,
	64: 16,
};
const colors = {
	rows: [`oklch(50% 20% 180)`, `oklch(60% 20% 240)`, `oklch(50% 20% 180)`, `oklch(60% 20% 240)`],
};

const init = ({ vars, rolesByShorthand }) => {
	const labels = extractLabels({ rolesByShorthand });
	const values = extractValues({ vars, rolesByShorthand });
	const mergedLightValues = Object.values(values).reduce(
		(p, c) => {
			for (let i in c.offsetValues) {
				if (c.offsetValues[i] === 0) {
					continue;
				}
				Object.keys(p).forEach((key) => {
					p[key].push(c[key][i]);
				});
			}
			return p;
		},
		{ angles: [], heights: [], growBlurs: [], growSpreads: [] },
	);
	const hasUnionLight = Object.values(mergedLightValues).every((vals) => new Set(vals).size < 2);
	console.log({ values, mergedLightValues });
	const unionValues =
		mergedLightValues.angles.length > 0 ? Object.keys(mergedLightValues).reduce((p, c) => ({ ...p, [c]: mergedLightValues[c][0] }), {}) : { angles: 0, heights: 0, growBlurs: 0, growSpreads: 0 };
	return { vars, rolesByShorthand, hasUnionLight, unionValues, labels, values };
};
const reducer = (state, action) => {
	const { values, hasUnionLight, unionValues } = action;
	const newState = { ...state };
	if (unionValues) {
		newState.unionValues = { ...newState.unionValues, ...unionValues };
		Object.keys(unionValues).forEach((key) => {
			Object.values(newState.values).forEach((vals) => {
				vals[key] = vals[key].map(() => unionValues[key]);
			});
		});
		newState.vars = convertToVars(newState);
	}
	if (values) {
		newState.values = Object.keys(values).reduce((p, c) => ({ ...p, [c]: { ...p[c], ...values[c] } }), newState.values);
		newState.vars = convertToVars(newState);
	}
	if (hasUnionLight != null) {
		newState.hasUnionLight = hasUnionLight;
		if (newState.hasUnionLight) {
			Object.keys(newState.unionValues).forEach((key) => {
				Object.values(newState.values).forEach((vals) => {
					vals[key] = vals[key].map(() => newState.unionValues[key]);
				});
			});
		}
	}
	return newState;
};

Catpow.Customize.Shadow = (props) => {
	const {
		value: vars,
		onChange,
		param: { roles },
	} = props;

	const rolesByShorthand = useMemo(() => Object.values(roles).reduce((p, c) => ({ ...p, [c.shorthand]: c }), {}), [roles]);

	const [state, update] = useReducer(reducer, { vars, rolesByShorthand }, init);

	useEffect(() => {
		if (!state.vars || !onChange) {
			return;
		}
		onChange(state.vars);
	}, [state.vars]);

	console.log({ state });

	return (
		<Bem prefix="cp-customize">
			<dl className="dl-">
				<dt>光源統一</dt>
				<dd>
					<Toggle value={state.hasUnionLight} onChange={(hasUnionLight) => update({ hasUnionLight })} />
				</dd>
			</dl>
			{state.hasUnionLight && (
				<dl className="dl-">
					<dt>方向</dt>
					<dd>
						<AngleInput value={state.unionValues.angles} steps={angleSteps} snap={true} onChange={(angles) => update({ unionValues: { angles } })} />
					</dd>
					<dt>高さ</dt>
					<dd>
						<RangeInput value={state.unionValues.heights} steps={heightSteps} snap={true} onChange={({ value: heights }) => update({ unionValues: { heights } })} />
					</dd>
					<dt>ぼかし</dt>
					<dd>
						<RangeInput value={state.unionValues.growBlurs} steps={blurSteps} snap={true} onChange={({ value: growBlurs }) => update({ unionValues: { growBlurs } })} />
					</dd>
					<dt>拡大</dt>
					<dd>
						<RangeInput value={state.unionValues.growSpreads} steps={blurSteps} snap={true} onChange={({ value: growSpreads }) => update({ unionValues: { growSpreads } })} />
					</dd>
				</dl>
			)}
			{Object.keys(rolesByShorthand).map((h) => {
				const labels = state.labels[h];
				const { angles, heights, growBlurs, growSpreads, offsetValues } = state.values[h];
				return (
					<>
						<h5 className="cp-customize__label">{rolesByShorthand[h].label}</h5>
						{!state.hasUnionLight && (
							<>
								<DataSet values={[angles]} labels={labels} steps={angleSteps} onChange={([angles]) => update({ values: { [h]: { angles } } })}>
									<LineChartInput width={400} height={200} />
									<DataTable />
								</DataSet>
								<DataSet values={[heights]} labels={labels} steps={heightSteps} onChange={([heights]) => update({ values: { [h]: { heights } } })}>
									<LineChartInput width={400} height={200} />
									<DataTable />
								</DataSet>
								<DataSet
									values={[growBlurs, growSpreads]}
									labels={{ ...labels, rows: ["ぼかし", "拡大"] }}
									colors={colors}
									steps={blurSteps}
									onChange={([growBlurs, growSpreads]) => update({ values: { [h]: { growBlurs, growSpreads } } })}
								>
									<Legend />
									<LineChartInput width={400} height={120} />
									<DataTable showRowHeader={false} />
								</DataSet>
							</>
						)}
						<DataSet values={[offsetValues]} labels={labels} steps={offsetSteps} onChange={([offsetValues]) => update({ values: { [h]: { offsetValues } } })}>
							<LineChartInput width={400} height={200} />
							<DataTable />
						</DataSet>
					</>
				);
			})}
		</Bem>
	);
};
