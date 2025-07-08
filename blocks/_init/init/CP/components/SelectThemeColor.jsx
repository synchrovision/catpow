import { bem, kebabToCamel } from "catpow/util";

export const SelectThemeColor = (props) => {
	const { onChange } = props;
	const { useCallback, useMemo, Fragment } = wp.element;
	const { Icon } = wp.components;
	const classes = bem("cp-selectthemecolor");

	const proxy = useMemo(() => CP.colorClassProxy(props.selected), [props.selected]);
	const data = useMemo(() => CP.parseColorClass(proxy.h), [proxy.h]);

	const ColorSelections = useCallback(
		(props) => {
			const { fixed = false, absolute = false, relative = false, active = false, proxy } = props;
			const { h, s, l } = proxy;
			const hsl = { h, s, l };
			console.log(hsl);
			return (
				<ul className={classes.colors({ "is-color-fixed": fixed, "is-color-absolute": absolute, "is-color-relative": relative, "is-active": active })}>
					<li className={classes.colors.icon({ active })}>
						<Icon icon={fixed ? "lock" : absolute ? "media-default" : "excerpt-view"} />
					</li>
					{Array.from(Array(13), (v, value) => {
						const colorClass = CP.generateColorClass({
							fixed,
							absolute,
							relative,
							value,
						});
						const active = kebabToCamel(colorClass) === h;
						return (
							<li
								className={classes.colors.item(colorClass, s, l, { "is-active": active })}
								onClick={() => {
									proxy.h = !active && colorClass;
									onChange(proxy);
								}}
								key={colorClass}
							>
								{" "}
							</li>
						);
					})}
				</ul>
			);
		},
		[onChange]
	);
	const ToneSelections = useCallback(
		(props) => {
			const { proxy } = props;
			const { h, s, l } = proxy;
			const hsl = { h, s, l };
			return (
				<ul className={classes.tones()}>
					{["s", "l"].map((r) => (
						<Fragment key={r}>
							<li className={classes.colors.icon({ "is-active": !!hsl[r] })}>
								<CP.ConfigIcon icon={{ s: "contrast", l: "light" }[r]} />
							</li>
							{Array.from(Array(5), (v, index) => {
								const value = index - 2;
								const toneClass = CP.generateToneClass({ [r]: true, value });
								const active = kebabToCamel(toneClass) === hsl[r];
								return (
									<li
										className={classes.tones.item(h, r === "s" ? l : s, toneClass, { "is-active": active })}
										onClick={() => {
											proxy[r] = !active && toneClass;
											onChange(proxy);
										}}
										key={toneClass}
									>
										{" "}
									</li>
								);
							})}
						</Fragment>
					))}
				</ul>
			);
		},
		[onChange]
	);

	return (
		<div className={classes()}>
			<ColorSelections proxy={proxy} fixed={true} active={data.fixed} />
			<ColorSelections proxy={proxy} absolute={true} active={data.absolute} />
			<ColorSelections proxy={proxy} relative={true} active={data.relative} />
			<ToneSelections proxy={proxy} />
		</div>
	);
};
