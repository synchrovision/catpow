Catpow.RadioButtons = function (props) {
	var useMemo = wp.element.useMemo;
	var value = props.value,
	    onChange = props.onChange;


	var options = useMemo(function () {
		if (Array.isArray(props.options)) {
			return props.options.map(function (option) {
				if ((typeof option === "undefined" ? "undefined" : babelHelpers.typeof(option)) === 'object') {
					return option;
				}
				return { label: option, value: option };
			});
		}
		return Object.keys(props.options).map(function (label) {
			return { label: label, value: props.options[label] };
		});
	}, [props.options]);

	return wp.element.createElement(
		"div",
		{ className: "RadioButtons" },
		options.map(function (option) {
			var selected = option.value === value;
			return wp.element.createElement(
				"div",
				{ className: "RadioButton" + (selected ? ' selected' : ''), onClick: function onClick(e) {
						onChange(option.value);
					} },
				wp.element.createElement(
					"div",
					{ className: "RadioButtonIcon" + (selected ? ' selected' : '') },
					" "
				),
				option.label
			);
		})
	);
};
