Catpow.CheckBoxes = (props) => {
	const { className = "cp-checkboxes", useState, useMemo } = wp.element;
	const { value = [], onChange } = props;
	const { CheckBox } = Catpow;
	const { bem } = Catpow.util;
	const classes = useMemo(() => bem(className), []);

	const options = useMemo(() => {
		if (Array.isArray(props.options)) {
			return props.options.map((option) => {
				if (typeof option === "object") {
					return option;
				}
				return { label: option, value: option };
			});
		}
		return Object.keys(props.options).map((label) => {
			return { label, value: props.options[label] };
		});
	}, [props.options]);

	if (!Array.isArray(value) && typeof value === "object") {
		return (
			<div className={classes()}>
				{options.map((option) => (
					<CheckBox
						label={option.label}
						onChange={(selected) => {
							value[option.value] = selected;
							onChange(option.value, selected, value);
						}}
						selected={value[option.value]}
						key={option.label}
					/>
				))}
			</div>
		);
	}
	const flags = {};
	value.map((val) => (flags[val] = true));
	return (
		<div className={classes()}>
			{options.map((option) => (
				<CheckBox
					label={option.label}
					onChange={(selected) => {
						if (selected) {
							flags[option.value] = true;
						} else {
							delete flags[option.value];
						}
						onChange(Object.keys(flags));
					}}
					selected={flags[option.value]}
					key={option.label}
				/>
			))}
		</div>
	);
};
