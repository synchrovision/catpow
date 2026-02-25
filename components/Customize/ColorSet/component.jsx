import { Bem } from "catpow/component";
import { useThrottle } from "catpow/hooks";
import { hexToOklch, hslToHex } from "catpow/util";
const { useState, useCallback, useMemo, useEffect, useReducer } = wp.element;

Catpow.Customize.ColorSet = (props) => {
	const { value, onChange, param } = props;
	const { roles } = param;
	const [inputMode, setInputMode] = useState("pane");
	const [activeRole, setActiveRole] = useState(null);

	const [state, dispatch] = useReducer(colorReducer, { value, roles }, initColors);

	useThrottle(
		() => {
			onChange(state.colors);
		},
		100,
		[state.colors],
	);

	switch (inputMode) {
		case "pane": {
			return (
				<div className="cp-colorset">
					<ModeSelect value={inputMode} onChange={setInputMode} />
					<div className="cp-colorset-palette">
						{Object.keys(roles).map((role) => (
							<Palette
								role={roles[role]}
								value={state?.colors?.[role]}
								open={role === activeRole}
								onClick={() => setActiveRole(role === activeRole ? null : role)}
								onChange={(value) => dispatch({ role, value })}
								key={role}
							/>
						))}
					</div>
					<HueRange value={state.colors} onChange={(value) => dispatch(value)} />
					<Preview value={state.colors} />
				</div>
			);
		}
		case "bulk": {
			return (
				<div className="cp-colorset">
					<ModeSelect value={inputMode} onChange={setInputMode} />
					<BulkInput value={state.colors} roles={roles} onChange={(colors) => dispatch({ colors })} />
					<Preview value={state.colors} />
				</div>
			);
		}
	}
};

const colorReducer = (state, action) => {
	if (action.colors) {
		const newColors = { ...state.colors, ...action.colors };
		Object.keys(action.colors).map((role) => {
			if (state.roles[role]) {
				newColors.tones[state.roles[role].shorthand] = getTones(action.colors[role]);
			}
		});
		return { ...state, colors: newColors };
	}
	if (action.hueRange) {
		return { ...state, colors: { ...state.colors, hueRange: parseInt(action.hueRange) } };
	}
	if (action.hueShift !== undefined) {
		return { ...state, colors: { ...state.colors, hueShift: parseInt(action.hueShift) } };
	}
	const { role, value } = action;
	const key = state.roles[role].shorthand;
	state.colors.tones[key] = getTones(value);
	const newColors = { ...state.colors, [role]: value };
	return { ...state, colors: newColors };
};
const initColors = ({ value: colors, roles }) => {
	if (!colors) {
		colors = {};
	}
	if (!colors.tones) {
		colors.tones = {};
	}
	if (!colors.hueRange) {
		colors.hueRange = 30;
	}
	if (!colors.hueShift) {
		colors.hueShift = 0;
	}
	Object.keys(roles).map((role) => {
		const key = roles[role].shorthand;
		if (!colors[role]) {
			colors[role] = roles[role].default;
		}
		if (!colors.tones[key]) {
			colors.tones[key] = getTones(colors[role]);
		}
	});
	return { colors, roles };
};
const getTones = (color) => {
	if (color.slice(0, 5) === "oklch") {
		const [l, c, h, a = 1] = color
			.match(/^oklch\(([\d\.]+) ([\d\.]+) ([\d\.]+)(?: \/ ([\d\.]+))?\)$/)
			.slice(1)
			.map(parseFloat);
		return { l, c, h, a };
	}
	if (color.slice(0, 3) === "hsl") {
		const [h, s, l, a = 1] = color
			.match(/^hsla?\((\d+),(\d+)%,(\d+)%(?:,([\d\.]+))?\)$/)
			.slice(1)
			.map((v, i) => (i < 3 ? parseInt(v) : parseFloat(v)));
		color = hslToHex({ h, s, l, a });
	}
	if (/^#(\w{6}|\w{8})$/.test(color)) {
		const lch = hexToOklch(color);
		return {
			...lch,
			t: (1 - lch.l) / 100,
		};
	}
};
const isDarkColor = (color) => {
	if (!color) {
		return true;
	}
	return getTones(color)?.l < 0.6;
};

const ModeSelect = (props) => {
	const { Icon } = wp.components;
	const { value, onChange } = props;
	return (
		<div className="cp-colorset-modeselect">
			<Icon className={"colorset-modeselect__item" + (value === "pane" ? " active" : "")} icon="admin-settings" onClick={() => onChange("pane")} />
			<Icon className={"colorset-modeselect__item" + (value === "bulk" ? " active" : "")} icon="media-text" onClick={() => onChange("bulk")} />
		</div>
	);
};
const Palette = (props) => {
	const { role, value, open, onClick, onChange } = props;
	const { ColorPicker } = wp.components;

	return (
		<div className={"cp-colorset-palette__item is-" + (open ? "open" : "close")}>
			<div className={"chip " + (isDarkColor(value) ? "is-dark" : "is-light")} onClick={onClick} style={{ backgroundColor: value }}>
				<div className="label">{role.label}</div>
			</div>
			<Catpow.Popover open={open}>
				<div className="cp-colorset-palette__box">
					<ColorPicker color={value} onChange={onChange} enableAlpha defaultValue="#000" />
				</div>
			</Catpow.Popover>
		</div>
	);
};
const HueRange = (props) => {
	const { value, onChange } = props;
	return (
		<div className="cp-colorset-huerange">
			<div className="cp-colorset-huerange__input">
				<label>Range</label>
				<input
					type="range"
					value={value.hueRange}
					onChange={(e) => {
						onChange({ hueRange: parseInt(e.currentTarget.value) });
					}}
					min={1}
					max={30}
				/>
			</div>
			<div className="cp-colorset-huerange__input">
				<label>Shift</label>
				<input
					type="range"
					value={value.hueShift}
					onChange={(e) => {
						onChange({ hueShift: parseInt(e.currentTarget.value) });
					}}
					min={-180}
					max={180}
				/>
			</div>
		</div>
	);
};
const BulkInput = (props) => {
	const { Icon } = wp.components;
	const { value, roles, onChange } = props;
	const [tmp, setTmp] = useState();
	const keyRoleMap = useMemo(() => {
		const map = { hr: "hueRange", hs: "hueShift" };
		Object.keys(roles).map((role) => {
			map[roles[role].shorthand] = role;
		});
		return map;
	}, [roles]);
	const checkValue = useCallback((tmp) => {
		const lines = tmp.split("\n");
		if (
			lines.some((line) => {
				if (!line) {
					return true;
				}
				const [key, val] = line.split(" : ");
				const role = keyRoleMap[key];
				if (key === "hr" || key === "hs") {
					return !/^-?\d+$/.test(val);
				}
				if (roles[role].alphaEnabled) {
					return !/^hsla?\(\d+,\d+%,\d+%(,[\d\.]+)?\)$/.test(val);
				}
				return !/^#\w{6}$/.test(val);
			})
		) {
			return false;
		}
		return true;
	}, []);
	const commitValue = useCallback(
		(tmp) => {
			const lines = tmp.split("\n"),
				colors = {};
			lines.map((line) => {
				const [key, val] = line.split(" : ");
				const role = keyRoleMap[key];
				if (key === "hr" || key === "hs") {
					colors[role] = parseInt(val);
				} else {
					colors[role] = val;
					value.tones[key] = getTones(val);
				}
			});
			onChange(colors);
		},
		[onChange],
	);
	useEffect(() => {
		setTmp(
			Object.keys(roles)
				.map((role) => roles[role].shorthand + " : " + value[role])
				.join("\n") +
				"\nhr : " +
				value.hueRange +
				"\nhs : " +
				value.hueShift,
		);
	}, [value]);
	return (
		<div className="cp-colorset-bulkinput">
			<textarea
				className="cp-colorset-bulkinput__textarea"
				value={tmp}
				rows={Object.keys(roles).length + 2}
				onChange={(e) => {
					const tmp = e.currentTarget.value;
					setTmp(tmp);
					if (checkValue(tmp)) {
						commitValue(tmp);
					}
				}}
			/>
			<Icon className="cp-colorset-bulkinput__clipboard" icon="clipboard" onClick={() => navigator.clipboard.writeText(tmp)} />
		</div>
	);
};
const getOklchString = ({ l, c, h, a = 1 }, hr, hs, i) => {
	return `oklch(${l} ${c} ${h + hr * i + hs}${a ? ` / ${a}` : ""})`;
};
const Preview = (props) => {
	const { value } = props;
	return (
		<Bem>
			<div className="cp-colorset-preview">
				{[
					["b", "t", "l"],
					["s", "h", "l"],
					["m", "i", "r"],
					["a", "e", "r"],
				].map(([k1, k2, k3]) => {
					const { hueRange: hr, hueShift: hs } = value;

					return (
						<div className="_row">
							{[...Array(12).keys()].map((i) => (
								<div className="_item" style={{ backgroundColor: getOklchString(value.tones[k1], hr, hs, i) }} key={i}>
									<div className="_icon" style={{ color: getOklchString(value.tones[k2], hr, hs, i), borderColor: getOklchString(value.tones[k3], hr, hs, i) }}>
										{i + 1}
									</div>
								</div>
							))}
						</div>
					);
				})}
			</div>
		</Bem>
	);
};
