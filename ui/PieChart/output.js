Catpow.UI.PieChartOutput = function (props) {
	var useState = wp.element.useState;
	var rows = props.rows,
	    cols = props.cols,
	    _props$width = props.width,
	    width = _props$width === undefined ? 300 : _props$width,
	    _props$height = props.height,
	    height = _props$height === undefined ? 300 : _props$height,
	    _props$padding = props.padding,
	    padding = _props$padding === undefined ? 50 : _props$padding;


	var total = rows[0].vals.reduce(function (v, val) {
		return v + parseInt(val.value);
	}, 0);
	var r = (width - padding * 2) / 2,
	    ox = width / 2,
	    oy = height / 2;
	console.log(total);

	var val2pos = function val2pos(v) {
		var coef = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

		var rad = v / total * Math.PI * 2 - Math.PI / 2;
		return {
			x: Math.cos(rad) * r * coef + ox,
			y: Math.sin(rad) * r * coef + oy
		};
	};

	var i,
	    d,
	    crrVal = 0,
	    crrPos = val2pos(0),
	    pies = [];

	var valPos = [];
	rows[0].vals.map(function (val, c) {
		var v = val.value;
		d = 'M ' + ox + ' ' + oy + ' L ' + crrPos.x + ' ' + crrPos.y;
		valPos[c] = val2pos(crrVal + Math.floor(val.value / 2), 5 / 8);
		crrVal += Math.floor(val.value);
		crrPos = val2pos(crrVal);
		d += ' A ' + r + ' ' + r + ' 0 ' + (v * 2 > total ? '1' : '0') + ' 1 ' + crrPos.x + ' ' + crrPos.y;
		d += ' L ' + ox + ' ' + oy;
		pies.push(wp.element.createElement('path', {
			className: cols[c].classes.replace('col', 'val'),
			'data-value': v,
			d: d
		}));
	});

	return wp.element.createElement(
		'div',
		{ className: 'PieChart' },
		wp.element.createElement(
			'svg',
			{ viewBox: "0 0 " + width + " " + height },
			wp.element.createElement(
				'g',
				{ 'class': 'graph' },
				wp.element.createElement(
					'g',
					{ className: rows[0].classes, 'data-label': rows[0].label },
					pies
				)
			),
			el(Catpow.ChartText, babelHelpers.extends({}, props, {
				rowTitle: false,
				rowUnit: false,
				rows: [{
					classes: props.rows[0].classes,
					vals: props.rows[0].vals
				}],
				pos: {
					val: function val(r, c) {
						return valPos[c];
					}
				}
			}))
		)
	);
};
