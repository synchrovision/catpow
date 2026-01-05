Catpow.TabPanel = (props) => {
	const { className = "cp-tabpanel", useState, useMemo } = wp.element;
	const { size = "medium", onChange } = props;
	const { bem } = Catpow.util;
	const classes = useMemo(() => bem(className), []);

	const [value, setValue] = useState(props.value ?? null);

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

	return (
		<div className={classes(`is-size-${size}`)}>
			<ul className={classes.tabs()}>
				{options.map((option) => {
					const selected = option.value === value;
					return (
						<li
							className={classes.tabs.tab({ "is-selected": selected })}
							onClick={(e) => {
								setValue(option.value);
								onChange(option.value);
							}}
							role="checkbox"
							aria-checked={selected}
							key={option.label}
						>
							{option.label}
						</li>
					);
				})}
			</ul>
			<div className={classes.contents()}>{props.children}</div>
		</div>
	);
};
