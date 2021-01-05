Catpow.UI.TimeSelect = function (_wp$element$Component) {
	babelHelpers.inherits(_class, _wp$element$Component);

	function _class(props) {
		babelHelpers.classCallCheck(this, _class);

		var _this = babelHelpers.possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

		var selections, value, step, i, ii;

		if (props.value) {
			value = props.value;
		} else if (props.default) {
			value = props.default;
		} else {
			value = '00:00';
		}

		step = props.step || 5;

		selections = {
			hour: [],
			minit: []
		};
		for (i = 0; i < 24; i++) {
			ii = (i + "").padStart(2, '0');
			selections.hour.push(wp.element.createElement(
				'option',
				{ value: ii },
				ii
			));
		}
		for (i = 0; i < 60; i += step) {
			ii = (i + "").padStart(2, '0');
			selections.minit.push(wp.element.createElement(
				'option',
				{ value: ii },
				ii
			));
		}
		_this.state = { selections: selections, value: value };
		return _this;
	}

	babelHelpers.createClass(_class, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var vals = this.state.value.split(':');

			var setTime = function setTime(i, val) {
				vals[i] = val;
				_this2.setState({ value: vals.join(':') });
			};

			return wp.element.createElement(
				'div',
				{ className: 'TimeSelect' },
				wp.element.createElement(
					'select',
					{ onChange: function onChange(e) {
							setTime(0, e.target.value);
						}, value: vals[0] },
					this.state.selections.hour
				),
				wp.element.createElement(
					'span',
					{ 'class': 'delimiter' },
					':'
				),
				wp.element.createElement(
					'select',
					{ onChange: function onChange(e) {
							setTime(1, e.target.value);
						}, value: vals[1] },
					this.state.selections.minit
				),
				wp.element.createElement(Catpow.UI.HiddenValues, {
					name: this.props.name,
					value: this.state.value
				})
			);
		}
	}]);
	return _class;
}(wp.element.Component);
