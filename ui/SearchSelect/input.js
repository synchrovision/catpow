/*
絞り込み選択のUI
*/
Catpow.UI.SearchSelect = function (_wp$element$Component) {
	babelHelpers.inherits(_class, _wp$element$Component);

	function _class(props) {
		babelHelpers.classCallCheck(this, _class);

		var _this = babelHelpers.possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

		_this.flatSelections = {};
		_this.allLabels = [];
		var currentLabel = props.defaultLabel;
		var walkSelections = function walkSelections(sels) {
			if (Array.isArray(sels)) {
				sels.map(function (val) {
					if ((typeof val === 'undefined' ? 'undefined' : babelHelpers.typeof(val)) === 'object') {
						walkSelections(val);
					} else {
						_this.flatSelections[val] = val;
						_this.allLabels.push(val);
						if (val === _this.props.value) {
							currentLabel = val;
						}
					}
				});
			} else {
				Object.keys(sels).map(function (key) {
					var val = sels[key];
					if ((typeof val === 'undefined' ? 'undefined' : babelHelpers.typeof(val)) === 'object') {
						walkSelections(val);
					} else {
						_this.flatSelections[key] = val;
						_this.allLabels.push(key);
						if (val === _this.props.value) {
							currentLabel = key;
						}
					}
				});
			}
		};
		walkSelections(props.selections);
		_this.state = {
			value: props.value,
			selecting: false,
			currentSelections: [],
			currentLabel: currentLabel,
			cache: {},
			needle: ''
		};
		return _this;
	}

	babelHelpers.createClass(_class, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var classes = 'SearchSelect';
			var _state = this.state,
			    cache = _state.cache,
			    needle = _state.needle,
			    currentSelections = _state.currentSelections,
			    currentLabel = _state.currentLabel;

			var search = function search(needle) {
				if (cache[needle]) {
					return cache[needle];
				}
				if (needle.length < 2) {
					return [];
				}
				var haystack = void 0;
				if (needle.length > 3) {
					haystack = search(needle.slice(0, -1));
				} else {
					haystack = _this2.allLabels;
				}
				return cache[needle] = haystack.filter(function (val) {
					return val.indexOf(needle) >= 0;
				});
			};
			return wp.element.createElement(
				'div',
				{ className: 'SearchSelect' },
				wp.element.createElement(
					'div',
					{
						className: 'currentLabel',
						onClick: function onClick(e) {
							_this2.setState({ selecting: !_this2.state.selecting });
						}
					},
					currentLabel || this.props.defaultLabel
				),
				wp.element.createElement(
					Catpow.Popup,
					{ open: this.state.selecting, onClose: function onClose() {
							return _this2.setState({ selecting: false });
						} },
					wp.element.createElement(
						'div',
						{ 'class': 'searchBox' },
						wp.element.createElement('input', {
							type: 'text',
							className: 'searchInput',
							value: needle,
							placeholder: this.props.placeholder,
							onChange: function onChange(e) {
								_this2.setState({
									needle: e.currentTarget.value,
									currentSelections: search(e.currentTarget.value)
								});
							}
						})
					),
					wp.element.createElement(
						'div',
						{ 'class': 'selectBox' },
						wp.element.createElement(Catpow.SelectTable, {
							selections: currentSelections,
							value: currentLabel,
							col: this.props.col || 5,
							onChange: function onChange(label) {
								_this2.setState({
									value: _this2.flatSelections[label],
									needle: label,
									currentLabel: label,
									selecting: false
								});
							}
						})
					)
				),
				wp.element.createElement(Catpow.UI.HiddenValues, { name: this.props.name, value: this.state.value })
			);
		}
	}]);
	return _class;
}(wp.element.Component);
