Catpow.PhoneNumber = function (_wp$element$Component) {
	babelHelpers.inherits(_class, _wp$element$Component);

	function _class(props) {
		babelHelpers.classCallCheck(this, _class);

		var _this = babelHelpers.possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

		_this.secs0 = React.createRef();
		_this.secs1 = React.createRef();
		_this.secs2 = React.createRef();
		_this.state = { value: props.value, isComposing: false };
		return _this;
	}

	babelHelpers.createClass(_class, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _state = this.state,
			    value = _state.value,
			    isComposing = _state.isComposing;

			var secs = value.split('-');

			var setValue = function setValue(i, val) {
				if (!val.match(/^\d+$/)) {
					val = '';
				}
				if (val.length === 10) {
					secs[0] = val.substring(0, 2);
					secs[1] = val.substring(2, 6);
					secs[2] = val.substring(6);
				} else if (val.length === 11) {
					secs[0] = val.substring(0, 3);
					secs[1] = val.substring(3, 7);
					secs[2] = val.substring(7);
				} else {
					secs[i] = val;
					if (val.length > 3 && i < 2 || i == 0 && val.match(/^0\d0$/)) {
						if (!isComposing) {
							_this2['secs' + (i + 1)].current.focus();
						}
					}
				}
				_this2.setState({ value: secs.join('-') });
			};

			var input = function input(i) {
				return wp.element.createElement('input', {
					type: 'text',
					className: "sec" + i,
					size: '4',
					autocomplete: ['tel-area-code', 'tel-local-prefix', 'tel-local-suffix'][i],
					onChange: function onChange(e) {
						var val = e.target.value;
						setValue(i, e.target.value);
					},
					onCompositionStart: function onCompositionStart(e) {
						_this2.setState({ isComposing: true });
					},
					onCompositionEnd: function onCompositionEnd(e) {
						isComposing = false;
						setValue(i, e.target.value);
						_this2.setState({ isComposing: isComposing });
					},
					ref: _this2['secs' + i],
					value: secs[i]
				});
			};

			return wp.element.createElement(
				'div',
				{ className: 'PhoneNumber' },
				input(0),
				wp.element.createElement(
					'span',
					{ 'class': 'sep' },
					'-'
				),
				input(1),
				wp.element.createElement(
					'span',
					{ 'class': 'sep' },
					'-'
				),
				input(2),
				wp.element.createElement(Catpow.HiddenValues, {
					name: this.props.name,
					value: value
				})
			);
		}
	}]);
	return _class;
}(wp.element.Component);
