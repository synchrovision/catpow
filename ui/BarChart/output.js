Catpow.BarChartOutput = function (props) {
	var colsSvg = [],
	    rowsSvg = [],
	    textsSvg = [];

	var _Object$assign = Object.assign({
		width: 300,
		height: 300,
		padding: 50
	}, props),
	    rows = _Object$assign.rows,
	    cols = _Object$assign.cols,
	    width = _Object$assign.width,
	    height = _Object$assign.height,
	    padding = _Object$assign.padding,
	    total = _Object$assign.total;

	if (!total) {
		var n;
		total = 0;
		rows.map(function (row) {
			n = 0;
			row.vals.map(function (val) {
				n += parseFloat(val.value);
			});
			total = Math.max(n, total);
		});
	}

	var graphHeight = height - padding * 2,
	    graphWidth = width - padding * 2,
	    graphOrg = { x: padding, y: height - padding };

	var rowStep = graphWidth / rows.length,
	    barWidth = rowStep / 2,
	    barMargin = rowStep / 4,
	    coef = graphHeight / total;
	var pos, h;

	colsSvg = cols.map(function (col, r) {
		return wp.element.createElement('g', { className: col.classes, 'data-label': col.label });
	});
	rowsSvg = rows.map(function (row, r) {
		var pos = { x: r * rowStep + graphOrg.x + barMargin, y: graphOrg.y };
		return wp.element.createElement(
			'g',
			{ className: row.classes, 'data-label': row.label },
			row.vals.map(function (val, c) {
				h = val.value * coef;
				pos.y -= h;
				return wp.element.createElement('rect', {
					className: cols[c].classes.replace('col', 'val'),
					'data-value': val.value,
					x: pos.x,
					y: pos.y,
					width: barWidth,
					height: h
				});
			})
		);
	});

	return wp.element.createElement(
		'div',
		{ className: 'BarChart' },
		wp.element.createElement(
			'svg',
			{ viewBox: '0 0 300 300' },
			wp.element.createElement(
				'g',
				{ 'class': 'graph' },
				wp.element.createElement(
					'g',
					{ 'class': 'cols' },
					colsSvg
				),
				wp.element.createElement(
					'g',
					{ 'class': 'rows' },
					rowsSvg
				)
			),
			el(Catpow.ChartText, props)
		)
	);
};
