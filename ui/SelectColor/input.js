Catpow.SelectColor = function (props) {
	var _wp$element = wp.element,
	    useState = _wp$element.useState,
	    useEffect = _wp$element.useEffect;
	var name = props.name;

	var _useState = useState(props.value),
	    _useState2 = babelHelpers.slicedToArray(_useState, 2),
	    value = _useState2[0],
	    setValue = _useState2[1];

	var color = value.substr(5) || 0;
	var items = Array.from(Array(13), function (v, i) {
		var classes = 'fillColor' + i;
		if (color == i) {
			classes += ' active';
		}
		return wp.element.createElement(
			'li',
			{ className: classes, onClick: function onClick() {
					setValue('color' + i);
				} },
			' '
		);
	});;

	return wp.element.createElement(
		'div',
		{ className: 'SelectColor' },
		wp.element.createElement(
			'ul',
			null,
			items
		),
		wp.element.createElement(Catpow.HiddenValues, { name: name, value: value })
	);
};
