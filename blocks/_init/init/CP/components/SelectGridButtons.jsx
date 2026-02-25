import { clsx } from "clsx";

const { useMemo } = wp.element;

export const SelectGridButtons = (props) => {
	const { Icon, BaseControl } = wp.components;

	const options = useMemo(() => {
		return props.options.map((option) => {
			const [, icon, label] = option.label.match(/^(?::([\w\-]+):)?(.*)$/u);
			return {
				...option,
				icon,
				label,
			};
		});
	}, [props.options]);

	const maxStrlen = options.reduce((acc, cur) => Math.max(acc, cur.label.length + cur.label.replace(/[ -~]+/, "").length), 3);
	const colNum = Math.min(6, Math.floor(36 / (maxStrlen + 2)));

	return (
		<BaseControl label={props.label} help={props.help} id={"cp-selectgridbuttons-" + wp.compose.useInstanceId(SelectGridButtons)}>
			<CP.Bem>
				<ul className={"cp-selectgridbuttons has-columns-" + colNum}>
					{props.options.map((option) => {
						const [, icon, label] = option.label.match(/^(?::([\w\-]+):)?(.*)$/u);
						return (
							<li
								onClick={() => props.onChange(props.selected === option.value && !props.required ? null : option.value)}
								className={clsx("_item", props.selected === option.value && "is-active")}
								key={option.value}
							>
								{icon && <Icon icon={icon}></Icon>}
								{label && <span className="_label">{label}</span>}
							</li>
						);
					})}
				</ul>
			</CP.Bem>
		</BaseControl>
	);
};
