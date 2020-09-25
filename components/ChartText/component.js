Catpow.ChartText = function (props) {
	var keys = ['title', 'unit', 'rowTitle', 'rowUnit'];
	var rows = props.rows,
	    cols = props.cols,
	    _props$width = props.width,
	    width = _props$width === undefined ? 300 : _props$width,
	    _props$height = props.height,
	    height = _props$height === undefined ? 300 : _props$height,
	    _props$padding = props.padding,
	    padding = _props$padding === undefined ? 50 : _props$padding,
	    total = props.total;


	var graphHeight = height - padding * 2,
	    graphWidth = width - padding * 2,
	    graphOrg = { x: padding, y: height - padding };
	var rowStep = graphWidth / rows.length;
	var legendItemWidths = cols.map(function (col) {
		return parseInt(20 + col.label.length * 12);
	});
	var legendWidth = legendItemWidths.reduce(function (val, w) {
		return w + val;
	}, 0);
	var legendItemPos = [{ x: width / 2 - legendWidth / 2, y: height - 15 }];
	legendItemWidths.map(function (w, c) {
		legendItemPos.push({
			x: legendItemPos[c].x + w,
			y: legendItemPos[c].y
		});
	});

	props.pos = Object.assign({
		title: function title() {
			return { x: width / 2, y: padding / 2 };
		},
		unit: function unit() {
			return { x: width - padding / 2, y: padding / 2 };
		},
		rowTitle: function rowTitle() {
			return { x: padding / 2, y: height - padding + 15 };
		},
		rowUnit: function rowUnit() {
			return { x: width - padding / 2, y: height - padding + 15 };
		},
		rowLabel: function rowLabel(r) {
			return { x: r * rowStep + rowStep / 2 + padding, y: height - padding + 15 };
		},
		legend: function legend(c) {
			return legendItemPos[c];
		},
		val: function val(r, c) {
			return { x: r * rowStep + rowStep / 2, y: c };
		}
	}, props.pos);

	return wp.element.createElement(
		'g',
		{ className: 'ChartText' },
		keys.map(function (key) {
			var pos = props.pos[key]();
			return wp.element.createElement(
				'text',
				{ className: key, x: pos.x, y: pos.y },
				props[key]
			);
		}),
		wp.element.createElement(
			'g',
			{ className: 'rowLabel' },
			props.rows.map(function (item, i) {
				var pos = props.pos['rowLabel'](i);
				return wp.element.createElement(
					'text',
					{ className: item.classes.replace('row', ''), x: pos.x, y: pos.y },
					item.label
				);
			})
		),
		wp.element.createElement(
			'g',
			{ className: 'ledgend' },
			props.cols.map(function (col, c) {
				var pos = props.pos.legend(c);
				return wp.element.createElement(
					'g',
					{ className: 'ledgendItem' },
					wp.element.createElement('rect', {
						className: cols[c].classes.replace('col', 'ledgendRect'),
						x: pos.x,
						y: pos.y - 6,
						width: 12,
						height: 12
					}),
					wp.element.createElement(
						'text',
						{ className: 'ledgendText', x: pos.x + 15, y: pos.y },
						col.label
					)
				);
			})
		),
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
