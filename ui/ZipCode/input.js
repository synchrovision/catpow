jQuery(function ($) {
	if (!("AjaxZip3" in window)) {
		$.getScript("https://ajaxzip3.github.io/ajaxzip3.js");
	}
});

Catpow.UI.ZipCode = function (_wp$element$Component) {
	babelHelpers.inherits(_class, _wp$element$Component);

	function _class(props) {
		babelHelpers.classCallCheck(this, _class);

		var _this = babelHelpers.possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

		_this.secs0 = React.createRef();
		_this.secs1 = React.createRef();
		_this.state = { value: props.value || '-', isComposing: false };
		return _this;
	}

	babelHelpers.createClass(_class, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var _state = this.state,
			    value = _state.value,
			    isComposing = _state.isComposing;

			var secs = value.split('-').slice(0, 2);

			var setValue = function setValue(i, val) {
				if (!val.match(/^\d+$/)) {
					val = '';
				}
				if (val.length == 7) {
					secs[0] = val.substring(0, 3);
					secs[1] = val.substring(3);
				} else {
					secs[i] = val;
					if (i == 0 && val.length > 2) {
						if (!isComposing) {
							_this2.secs1.current.focus();
						}
					}
				}
				AjaxZip3.zip2addr(_this2.secs0.current, _this2.secs1.current, _this2.props.pref, _this2.props.addr);
				_this2.setState({ value: secs.join('-') });
			};

			var input = function input(i) {
				return wp.element.createElement("input", {
					type: "text",
					size: ["3", "4"][i],
					className: "sec" + i,
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
				"div",
				{ className: 'ZipCode' },
				input(0),
				wp.element.createElement(
					"span",
					{ "class": "sep" },
					"-"
				),
				input(1),
				wp.element.createElement(Catpow.UI.HiddenValues, {
					name: this.props.name,
					value: value
				})
			);
		}
	}]);
	return _class;
}(wp.element.Component);
