if (undefined === window.Catpow) {
	window.Catpow = {};
}

Catpow.HiddenValues = function (_wp$element$Component) {
	babelHelpers.inherits(_class, _wp$element$Component);

	function _class(props) {
		babelHelpers.classCallCheck(this, _class);
		return babelHelpers.possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));
	}

	babelHelpers.createClass(_class, [{
		key: 'render',
		value: function render() {
			var hiddenInput = function hiddenInput(name, val) {
				if (val instanceof Object) {
					return Object.keys(val).map(function (k) {
						return hiddenInput(name + '[' + k + ']', val[k]);
					});
				} else {
					return wp.element.createElement('input', { type: 'hidden', name: name, value: val });
				}
			};
			return wp.element.createElement(
				'div',
				{ className: 'hiddenValues' },
				hiddenInput(this.props.name, this.props.value)
			);
		}
	}]);
	return _class;
}(wp.element.Component);
