/*
絞り込み選択のUI
*/
Catpow.UI.TreeSelect = function (_wp$element$Component) {
	babelHelpers.inherits(_class, _wp$element$Component);

	function _class(props) {
		babelHelpers.classCallCheck(this, _class);

		var _this = babelHelpers.possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

		var currentLabel,
		    openPath = [],
		    depth,
		    focus;
		var param = Object.assign({
			itemPerPage: 7,
			itemPerStep: 5
		}, props.param);
		if (props.value) {
			var buildOpenPath = function buildOpenPath(sels, val) {
				return Object.keys(sels).some(function (key) {
					if (sels[key] instanceof Object) {
						if (buildOpenPath(sels[key], val)) {
							openPath.unshift({
								selected: key,
								paged: 0
							});
							return true;
						}
						return false;
					}
					if (val == sels[key]) {
						openPath.unshift({
							selected: key,
							paged: 0
						});
						currentLabel = sels instanceof Array ? sels[key] : key;
						return true;
					}
					return false;
				});
			};
			if (buildOpenPath(props.selections, props.value) === false) {
				delete props.value;
				openPath = [''];
			}
		} else {
			openPath = [''];
		}

		_this.state = {
			value: props.value,
			currentLabel: currentLabel,
			openPath: openPath,
			depth: depth,
			param: param
		};
		return _this;
	}

	babelHelpers.createClass(_class, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var sels = this.props.selections;

			var currentLabel = this.state.currentLabel,
			    currentLevel = this.state.openPath.length - 1;

			var items = this.state.openPath.map(function (key, i) {
				var crr = sels;
				sels = sels[key] || [];
				var classes = 'selectBox level' + i;
				if (i == currentLevel) {
					classes += ' active';
				} else if (i == currentLevel - 1) {
					classes += ' prev';
				}
				return wp.element.createElement(
					'div',
					{ className: classes },
					i > 0 && wp.element.createElement(
						'div',
						{ className: 'backToPrev', onClick: function onClick(e) {
								_this2.setState({ openPath: _this2.state.openPath.slice(0, i) });
							} },
						' '
					),
					wp.element.createElement(
						'ul',
						{ className: 'selectBoxItems' },
						Object.keys(crr).map(function (k) {
							return wp.element.createElement(
								'li',
								{ className: 'selectBoxItem ' + (k == key ? 'selected' : '') },
								wp.element.createElement(
									'h3',
									{ onClick: function onClick(e) {
											var openPath = _this2.state.openPath.slice(0, i);
											openPath.push(k);
											if (crr[k] instanceof Object) {
												openPath.push('');
												_this2.setState({ openPath: openPath });
											} else {
												_this2.setState({
													value: crr[k],
													selecting: false,
													currentLabel: crr instanceof Array ? crr[k] : k,
													openPath: openPath
												});
											}
										} },
									crr instanceof Array ? crr[k] : k
								)
							);
						})
					)
				);
			});

			var classes = 'treeSelect depth' + currentLevel;
			if (this.state.selecting) {
				classes += ' selecting';
			}
			return wp.element.createElement(
				'div',
				{ className: classes },
				wp.element.createElement(
					'div',
					{
						className: 'currentLabel',
						onClick: function onClick(e) {
							_this2.setState({ selecting: !_this2.state.selecting });
						}
					},
					wp.element.createElement(
						'h3',
						null,
						currentLabel || this.props.defaultLabel
					)
				),
				wp.element.createElement(
					Catpow.Popup,
					{ open: this.state.selecting, onClose: function onClose() {
							return _this2.setState({ selecting: false });
						} },
					wp.element.createElement(
						'div',
						{ className: 'selectBoxes' },
						items
					)
				),
				wp.element.createElement(Catpow.UI.HiddenValues, { name: this.props.name, value: this.state.value })
			);
		}
	}]);
	return _class;
}(wp.element.Component);
