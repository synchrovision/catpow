Catpow.UI.CalendarSelect = function (props) {
	var _wp$element = wp.element,
	    useState = _wp$element.useState,
	    useCallback = _wp$element.useCallback,
	    useMemo = _wp$element.useMemo;

	var _useState = useState(props.value),
	    _useState2 = babelHelpers.slicedToArray(_useState, 2),
	    value = _useState2[0],
	    setValue = _useState2[1];

	var d = Catpow.util.getDateObject(value, new Date());

	var _useState3 = useState(d.getFullYear()),
	    _useState4 = babelHelpers.slicedToArray(_useState3, 2),
	    year = _useState4[0],
	    setYear = _useState4[1];

	var _useState5 = useState(d.getMonth() + 1),
	    _useState6 = babelHelpers.slicedToArray(_useState5, 2),
	    month = _useState6[0],
	    setMonth = _useState6[1];

	return wp.element.createElement(
		'div',
		{ className: 'CalendarSelect' },
		wp.element.createElement(Catpow.Calendar, {
			className: 'medium',
			year: year,
			month: month,
			min: props.min,
			max: props.max,
			values: value ? babelHelpers.defineProperty({}, value, true) : {},
			onSelect: setValue
		}),
		value && wp.element.createElement(Catpow.UI.HiddenValues, {
			name: props.name,
			value: value
		})
	);
};
