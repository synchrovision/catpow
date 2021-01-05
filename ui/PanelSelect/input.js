/*
絞り込み選択のUI
*/
Catpow.UI.PanelSelect = function (props) {
	var classes = 'PanelSelect';
	var useState = wp.element.useState;

	var _useState = useState(props.value),
	    _useState2 = babelHelpers.slicedToArray(_useState, 2),
	    value = _useState2[0],
	    setValue = _useState2[1];

	var limit = props.limit || false;

	return wp.element.createElement(
		'div',
		{ className: 'PanelSelect' },
		wp.element.createElement(
			'ul',
			{ 'class': 'items' },
			props.items.map(function (item) {
				var isActive = value.indexOf(item.value) > 0;
			})
		),
		wp.element.createElement(Catpow.UI.HiddenValues, { name: props.name, value: value })
	);
};
