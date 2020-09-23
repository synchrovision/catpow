Catpow.ChartText = function (props) {
	var keys = ['title', 'unit', 'rowTitle', 'rowUnit', 'colTitle', 'colUnit'];
	var ds = ['row', 'col'];

	props.pos = Object.assign({
		title: function title() {
			return { x: 150, y: 10 };
		},
		unit: function unit() {
			return { x: 100, y: 100 };
		},
		rowTitle: function rowTitle() {
			return { x: 100, y: 100 };
		},
		rowUnit: function rowUnit() {
			return { x: 100, y: 100 };
		},
		colTitle: function colTitle() {
			return { x: 100, y: 100 };
		},
		colUnit: function colUnit() {
			return { x: 100, y: 100 };
		},
		rowLabel: function rowLabel(r) {
			return { x: 50, y: r * 20 };
		},
		colLabel: function colLabel(c) {
			return { x: c * 20, y: 20 };
		},
		val: function val(r, c) {
			return { x: r * 10, y: c * 10 };
		}
	}, props.pos);

	return wp.element.createElement(
		'g',
		{ className: 'texts' },
		keys.map(function (key) {
			var pos = props.pos[key]();
			return wp.element.createElement(
				'text',
				{ className: key, x: pos.x, y: pos.y },
				props[key]
			);
		}),
		ds.map(function (d) {
			return wp.element.createElement(
				'g',
				{ className: d + 'Label' },
				props[d + 's'].map(function (item, i) {
					var pos = props.pos[d + 'Label'](i);
					return wp.element.createElement(
						'text',
						{ className: item.classes.replace(d, ''), x: pos.x, y: pos.y },
						item.label
					);
				})
			);
		}),
		wp.element.createElement(
			'g',
			{ className: 'vals' },
			props.rows.map(function (row, r) {
				return row.vals.map(function (val, c) {
					var pos = props.pos['val'](r, c);
					return wp.element.createElement(
						'text',
						{
							className: row.classes.replace('row', '') + ' ' + props.cols[c].classes.replace('col', 'val'),
							x: pos.x,
							y: pos.y
						},
						val.value
					);
				});
			})
		)
	);
};
