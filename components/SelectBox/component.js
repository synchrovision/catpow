Catpow.SelectBox = function (props) {
	var label = props.label,
	    value = props.value,
	    options = props.options,
	    _onChange = props.onChange;


	return wp.element.createElement(
		"select",
		{ className: "SelectBox", value: value, onChange: function onChange(e) {
				return _onChange(event.target.value);
			} },
		label && wp.element.createElement(
			"option",
			{ value: false },
			label
		),
		(typeof options === "undefined" ? "undefined" : babelHelpers.typeof(options)) === 'object' && (Array.isArray(options) ? options.map(function (val) {
			return wp.element.createElement(
				"option",
				{ value: val },
				val
			);
		}) : Object.keys(options).map(function (label) {
			return wp.element.createElement(
				"option",
				{ value: options[label] },
				label
			);
		}))
	);
};
