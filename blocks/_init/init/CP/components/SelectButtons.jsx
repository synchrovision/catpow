export const SelectButtons = (props) => {
	const { BaseControl, Button, ButtonGroup } = wp.components;
	return (
		<BaseControl label={props.label} help={props.help} id={"cp-slectbuttons-" + wp.compose.useInstanceId(SelectButtons)}>
			<div className="cp-selectbuttons">
				<ButtonGroup>
					{props.options.map((option) => {
						const [, icon, label] = option.label.match(/^(?::([\w\-]+):)?(.*)$/u);
						return (
							<Button
								icon={icon}
								onClick={() => props.onChange(props.selected === option.value && !props.required ? null : option.value)}
								isPrimary={props.selected === option.value}
								key={option.value}
							>
								{label}
							</Button>
						);
					})}
				</ButtonGroup>
			</div>
		</BaseControl>
	);
};
