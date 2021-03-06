Catpow.UI.PieChart = function (_wp$element$Component) {
	babelHelpers.inherits(_class, _wp$element$Component);

	function _class(props) {
		babelHelpers.classCallCheck(this, _class);

		var _this = babelHelpers.possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

		var value = props.value,
		    total = props.total;

		var press = false;

		if (undefined === total) {
			total = 100;
		}

		_this.bodyBnd = { ox: 150, oy: 150, r: 100 };
		_this.total = total;

		_this.state = { value: value, press: press };
		return _this;
	}

	babelHelpers.createClass(_class, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _state = this.state,
			    value = _state.value,
			    press = _state.press;


			var val2pos = function val2pos(v) {
				var rad = v / _this2.total * Math.PI * 2 - Math.PI / 2;
				return {
					x: Math.cos(rad) * _this2.bodyBnd.r + _this2.bodyBnd.ox,
					y: Math.sin(rad) * _this2.bodyBnd.r + _this2.bodyBnd.oy
				};
			};

			var i,
			    d,
			    crrVal,
			    crrPos,
			    pies = [];

			crrVal = 0;
			crrPos = val2pos(0);
			for (i = 0; i < 4; i++) {
				d = 'M ' + this.bodyBnd.ox + ' ' + this.bodyBnd.oy + ' L ' + crrPos.x + ' ' + crrPos.y;
				var v = Math.random() * 80;
				crrVal += Math.floor(v);
				if (crrVal > this.total) {
					break;
				}
				crrPos = val2pos(crrVal);
				d += ' A ' + this.bodyBnd.r + ' ' + this.bodyBnd.r + ' 0 ' + (v * 2 > this.total ? '1' : '0') + ' 1 ' + crrPos.x + ' ' + crrPos.y;
				d += ' L ' + this.bodyBnd.ox + ' ' + this.bodyBnd.oy;
				pies.push(wp.element.createElement('path', { d: d, stroke: 'red' }));
			}

			return wp.element.createElement(
				'div',
				{ className: 'PieChart' },
				wp.element.createElement(
					'svg',
					{ viewBox: '0 0 300 300' },
					pies,
					wp.element.createElement('rect', {
						className: 'control',
						x: this.bodyBnd.l,
						y: this.bodyBnd.t,
						width: this.bodyBnd.w,
						height: this.bodyBnd.h,
						onMouseDown: function onMouseDown(e) {
							_this2.setState({ press: true });
						},
						onMouseUp: function onMouseUp(e) {
							_this2.setState({ press: false });
						},
						onMouseOut: function onMouseOut(e) {
							_this2.setState({ press: false });
						},
						onMouseMove: function onMouseMove(e) {
							if (!press) {
								return;
							}
							var bnd = e.target.getBoundingClientRect();
							_this2.setState({
								value: {
									x: parseInt((e.clientX - parseInt(bnd.left)) / bnd.width * _this2.valMap.w + _this2.valMap.x),
									y: parseInt((e.clientY - parseInt(bnd.top)) / bnd.height * _this2.valMap.h + _this2.valMap.y)
								}
							});
						}
					})
				),
				wp.element.createElement(Catpow.UI.HiddenValues, {
					name: this.props.name,
					value: value
				})
			);
		}
	}]);
	return _class;
}(wp.element.Component);
