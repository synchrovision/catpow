
Catpow.UI.Progress = function (_ref) {
	var name = _ref.name,
	    value = _ref.value,
	    _ref$max = _ref.max,
	    max = _ref$max === undefined ? 100 : _ref$max,
	    _ref$step = _ref.step,
	    step = _ref$step === undefined ? 1 : _ref$step;
	var useState = wp.element.useState;

	var _useState = useState(value),
	    _useState2 = babelHelpers.slicedToArray(_useState, 2),
	    val = _useState2[0],
	    setVal = _useState2[1];

	var _useState3 = useState(false),
	    _useState4 = babelHelpers.slicedToArray(_useState3, 2),
	    drawing = _useState4[0],
	    setDrawing = _useState4[1];

	var updateVal = function updateVal(e) {
		if (!drawing) {
			return false;
		}
		var bnd = e.currentTarget.getBoundingClientRect();
		setVal(Math.round((e.clientX - bnd.left) / bnd.width * max / step) * step);
	};
	return wp.element.createElement(
		"div",
		{ className: 'Progress' },
		wp.element.createElement(
			"progress",
			{
				value: val,
				max: max,
				onMouseMove: updateVal,
				onMouseDown: function onMouseDown() {
					return setDrawing(true);
				},
				onMouseUp: function onMouseUp() {
					return setDrawing(false);
				},
				onMouseLeave: function onMouseLeave() {
					return setDrawing(false);
				}
			},
			val
		),
		wp.element.createElement("input", {
			type: "numer",
			onChange: function onChange(e) {
				setVal(e.currentTarget.value);
			},
			value: val,
			max: max,
			min: 0,
			size: 3,
			step: step
		}),
		wp.element.createElement(Catpow.UI.HiddenValues, { name: name, value: val })
	);
};
