Catpow.SelectTable = function (_ref) {
	var selections = _ref.selections,
	    value = _ref.value,
	    onChange = _ref.onChange,
	    spacer = _ref.spacer,
	    col = _ref.col;

	var i,
	    items,
	    values,
	    fontSize,
	    className = "SelectTable",
	    rows = [];
	spacer = spacer || 0;
	col = col || 5;
	if (Array.isArray(selections)) {
		values = selections;
		items = selections.map(function (val) {
			return wp.element.createElement(
				'td',
				{ className: val === value ? 'item active' : 'item', onClick: function onClick() {
						onChange(val);
					} },
				val
			);
		});
	} else {
		values = Object.values(selections);
		items = Object.keys(selections).map(function (key) {
			return wp.element.createElement(
				'td',
				{ className: selections[key] === value ? 'item active' : 'item', onClick: function onClick() {
						onChange(selections[key]);
					} },
				key
			);
		});
	}
	fontSize = (360 / col - 5) / Math.max.apply(Math, babelHelpers.toConsumableArray(values.map(function (val) {
		return val.toString().length;
	})));
	if (fontSize > 20) {
		className += ' hasLargeFontSize';
	} else if (fontSize > 10) {
		className += ' hasRegularFontSize';
	} else {
		className += ' hasSmallFontSize';
	}

	for (i = 0; i < spacer; i++) {
		items.unshift(wp.element.createElement('td', { className: 'spacer' }));
	}
	for (i = (col - items.length % col) % col; i > 0; i--) {
		items.push(wp.element.createElement('td', { className: 'spacer' }));
	}
	for (i = 0; i < items.length; i += col) {
		rows.push(items.slice(i, i + col));
	}
	return wp.element.createElement(
		'table',
		{ className: className },
		wp.element.createElement(
			'tbody',
			null,
			rows.map(function (row) {
				return wp.element.createElement(
					'tr',
					null,
					row
				);
			})
		)
	);
};
