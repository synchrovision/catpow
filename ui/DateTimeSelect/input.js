Catpow.DateTimeSelect = function (_wp$element$Component) {
	babelHelpers.inherits(_class, _wp$element$Component);

	function _class(props) {
		babelHelpers.classCallCheck(this, _class);

		var _this = babelHelpers.possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

		var date, min, max, step, selections, i;

		if (props.value) {
			var dateArr = props.value.match(/^(\d+)\-(\d+)\-(\d+) (\d+):(\d+):(\d+)$/);
			date = new Date(dateArr[1], dateArr[2] - 1, dateArr[3], dateArr[4], dateArr[5]);
		} else if (props.default) {
			date = new Date(props.default);
		} else {
			date = false;
		}
		if (props.min) {
			min = new Date(props.min);
		} else {
			min = new Date(Date.now() - 1000 * 3600 * 24 * 3000);
		}
		if (props.max) {
			max = new Date(props.max);
		} else {
			max = new Date(Date.now() + 1000 * 3600 * 24 * 3000);
		}
		if (props.step) {
			step = props.step;
		} else {
			step = 5;
		}

		selections = {
			year: [],
			month: [],
			date: [],
			hours: [],
			minutes: []
		};
		for (i = min.getFullYear(); i <= max.getFullYear(); i++) {
			selections.year.push(i);
		}
		for (i = 1; i <= 12; i++) {
			selections.month.push(i);
		}
		for (i = 1; i <= 31; i++) {
			selections.date.push(i);
		}
		for (i = 0; i <= 23; i++) {
			selections.hours.push(i);
		}
		for (i = 0; i <= 59; i += step) {
			selections.minutes.push(i);
		}
		_this.state = { date: date, selections: selections, min: min, max: max };
		return _this;
	}

	babelHelpers.createClass(_class, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _state = this.state,
			    date = _state.date,
			    min = _state.min,
			    max = _state.max;

			if (date !== false) {
				if (min > date) {
					date = new Date(min);
				} else if (max < date) {
					date = new Date(max);
				} else {
					date = new Date(date);
				}
			}

			var nameInFunction = {
				Y: 'FullYear',
				m: 'Month',
				d: 'Date',
				w: 'Day',
				H: 'Hours',
				i: 'Minutes',
				s: 'Seconds'
			};
			var setDate = function setDate(key, val) {
				if (val == -1) {
					date = false;
				} else {
					if (date === false) {
						date = new Date();
					}
					val = parseInt(val);
					if (key === 'm') {
						val--;
					}
					date['set' + nameInFunction[key]](val);
				}
				_this2.setState({ date: date });
			};
			var getDate = function getDate(key) {
				if (date === false) {
					return '−';
				}
				var val = date['get' + nameInFunction[key]]();
				if (key === 'm') {
					val++;
				}
				return val;
			};

			return wp.element.createElement(
				'div',
				{ className: 'DateSelect' },
				wp.element.createElement(
					'div',
					{ 'class': 'value year', onClick: function onClick() {
							_this2.setState({ yearSelecting: true });
						} },
					getDate('Y')
				),
				wp.element.createElement(
					Catpow.Popup,
					{ open: this.state.yearSelecting, onClose: function onClose() {
							return _this2.setState({ yearSelecting: false });
						} },
					wp.element.createElement(Catpow.SelectTable, {
						selections: this.state.selections.year,
						value: getDate('Y'),
						col: 10,
						spacer: this.state.selections.year[0] % 10,
						onChange: function onChange(label) {
							setDate('Y', label);
							_this2.setState({ yearSelecting: false });
						}
					})
				),
				wp.element.createElement(
					'span',
					{ 'class': 'unit' },
					'\u5E74'
				),
				wp.element.createElement(
					'div',
					{ 'class': 'value month', onClick: function onClick() {
							_this2.setState({ monthSelecting: true });
						} },
					getDate('m')
				),
				wp.element.createElement(
					Catpow.Popup,
					{ open: this.state.monthSelecting, onClose: function onClose() {
							return _this2.setState({ monthSelecting: false });
						} },
					wp.element.createElement(Catpow.SelectTable, {
						selections: this.state.selections.month,
						value: getDate('m'),
						col: 6,
						onChange: function onChange(label) {
							setDate('m', label);
							_this2.setState({ monthSelecting: false });
						}
					})
				),
				wp.element.createElement(
					'span',
					{ 'class': 'unit' },
					'\u6708'
				),
				wp.element.createElement(
					'div',
					{ 'class': 'value date', onClick: function onClick() {
							_this2.setState({ dateSelecting: true });
						} },
					getDate('d')
				),
				wp.element.createElement(
					Catpow.Popup,
					{ open: this.state.dateSelecting, onClose: function onClose() {
							return _this2.setState({ dateSelecting: false });
						} },
					wp.element.createElement(Catpow.SelectTable, {
						selections: this.state.selections.date,
						value: getDate('d'),
						col: 7,
						onChange: function onChange(label) {
							setDate('d', label);
							_this2.setState({ dateSelecting: false });
						}
					})
				),
				wp.element.createElement(
					'span',
					{ 'class': 'unit' },
					'\u65E5'
				),
				wp.element.createElement(
					'div',
					{ 'class': 'value hours', onClick: function onClick() {
							_this2.setState({ hoursSelecting: true });
						} },
					getDate('H')
				),
				wp.element.createElement(
					Catpow.Popup,
					{ open: this.state.hoursSelecting, onClose: function onClose() {
							return _this2.setState({ hoursSelecting: false });
						} },
					wp.element.createElement(Catpow.SelectTable, {
						selections: this.state.selections.hours,
						value: getDate('H'),
						col: 12,
						onChange: function onChange(label) {
							setDate('H', label);
							_this2.setState({ hoursSelecting: false });
						}
					})
				),
				wp.element.createElement(
					'span',
					{ 'class': 'unit' },
					'\u6642'
				),
				wp.element.createElement(
					'div',
					{ 'class': 'value minutes', onClick: function onClick() {
							_this2.setState({ minutesSelecting: true });
						} },
					getDate('i')
				),
				wp.element.createElement(
					Catpow.Popup,
					{ open: this.state.minutesSelecting, onClose: function onClose() {
							return _this2.setState({ minutesSelecting: false });
						} },
					wp.element.createElement(Catpow.SelectTable, {
						selections: this.state.selections.minutes,
						value: getDate('i'),
						col: 4,
						onChange: function onChange(label) {
							setDate('i', label);
							_this2.setState({ minutesSelecting: false });
						}
					})
				),
				wp.element.createElement(
					'span',
					{ 'class': 'unit' },
					'\u5206'
				),
				date !== false && wp.element.createElement(Catpow.HiddenValues, {
					name: this.props.name,
					value: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
				})
			);
		}
	}]);
	return _class;
}(wp.element.Component);
