Catpow.UI.DateSelect = function (props) {
	var _props$min = props.min,
	    min = _props$min === undefined ? false : _props$min,
	    _props$max = props.max,
	    max = _props$max === undefined ? false : _props$max;
	var _wp$element = wp.element,
	    useState = _wp$element.useState,
	    useReducer = _wp$element.useReducer,
	    useMemo = _wp$element.useMemo;

	var _useState = useState(false),
	    _useState2 = babelHelpers.slicedToArray(_useState, 2),
	    open = _useState2[0],
	    setOpen = _useState2[1];

	var minTime = min ? Catpow.util.getDateObject(min).getTime() : -Number.MAX_VALUE;
	var maxTime = max ? Catpow.util.getDateObject(max).getTime() : Number.MAX_VALUE;

	var d = Catpow.util.getDateObject(props.value, new Date());

	var _useReducer = useReducer(function (state, action) {
		console.log(state, action);
		switch (action.type) {
			case 'update':
				var _d = action.value ? Catpow.util.getDateObject(action.value) : new Date(action.year || state.year, (action.month || state.month) - 1, action.date || state.date);
				var t = _d.getTime();
				if (t < minTime) {
					_d.setTime(minTime);
				}
				if (t > maxTime) {
					_d.setTime(maxTime);
				}

				return {
					value: Catpow.util.getDateValue(_d),
					year: _d.getFullYear(),
					month: _d.getMonth() + 1,
					date: _d.getDate()
				};
		}
		return state;
	}, {
		value: props.value,
		year: d.getFullYear(),
		month: d.getMonth() + 1,
		date: d.getDate()
	}),
	    _useReducer2 = babelHelpers.slicedToArray(_useReducer, 2),
	    state = _useReducer2[0],
	    dispatch = _useReducer2[1];

	return wp.element.createElement(
		'div',
		{ className: 'DateSelect' },
		wp.element.createElement(
			'div',
			{ className: 'inputs' },
			wp.element.createElement('input', { className: 'input year', type: 'number', size: '4', value: state.year, onInput: function onInput(e) {
					dispatch({ type: 'update', year: e.currentTarget.value });
				} }),
			wp.element.createElement(
				'span',
				{ className: 'unit' },
				'\u5E74'
			),
			wp.element.createElement('input', { className: 'input month', type: 'number', size: '2', value: state.month, onInput: function onInput(e) {
					dispatch({ type: 'update', month: e.currentTarget.value });
				} }),
			wp.element.createElement(
				'span',
				{ className: 'unit' },
				'\u6708'
			),
			wp.element.createElement('input', { className: 'input date', type: 'number', size: '2', value: state.date, onInput: function onInput(e) {
					dispatch({ type: 'update', date: e.currentTarget.value });
				} }),
			wp.element.createElement(
				'span',
				{ className: 'unit' },
				'\u65E5'
			),
			wp.element.createElement('span', { className: 'btn calendar', onClick: function onClick() {
					return setOpen(true);
				} })
		),
		wp.element.createElement(
			Catpow.Popup,
			{ open: open, onClose: function onClose() {
					return setOpen(false);
				}, closeButton: true },
			wp.element.createElement(Catpow.Calendar, {
				className: 'medium',
				year: state.year,
				month: state.month,
				showControl: true,
				values: state.value ? babelHelpers.defineProperty({}, state.value, true) : {},
				onSelect: function onSelect(value) {
					setOpen(false);
					dispatch({ type: 'update', value: value });
				}
			})
		),
		state.value && wp.element.createElement(Catpow.UI.HiddenValues, {
			name: props.name,
			value: state.value
		})
	);
};
