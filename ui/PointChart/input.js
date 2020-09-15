Catpow.PointChart = function (_wp$element$Component) {
	babelHelpers.inherits(_class, _wp$element$Component);

	function _class(props) {
		babelHelpers.classCallCheck(this, _class);

		var _this = babelHelpers.possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

		var bnd = {},
		    labels,
		    value = Object.assign({ x: 0, y: 0 }, props.value),
		    press = false;
		var xVals, yVals, orgPos;
		xVals = Array.isArray(props.x) ? props.x : Object.values(props.x);
		yVals = Array.isArray(props.y) ? props.y : Object.values(props.y);
		_this.valMap = { x: xVals[0], y: yVals[0], w: xVals[1] - xVals[0], h: yVals[1] - yVals[0] };
		_this.labels = {
			x: Array.isArray(props.x) ? props.x : Object.keys(props.x),
			y: Array.isArray(props.y) ? props.y : Object.keys(props.y)
		};
		_this.bodyBnd = { t: 50, b: 250, l: 50, r: 250, w: 200, h: 200 };

		orgPos = _this.val2pos({ x: 0, y: 0 });

		_this.base = wp.element.createElement(
			"g",
			{ "class": "base" },
			wp.element.createElement("rect", {
				className: "bg",
				x: _this.bodyBnd.l,
				y: _this.bodyBnd.t,
				width: _this.bodyBnd.w,
				height: _this.bodyBnd.h
			}),
			wp.element.createElement("line", { className: "baseLine", x1: orgPos.x, x2: orgPos.x, y1: _this.bodyBnd.t, y2: _this.bodyBnd.b }),
			wp.element.createElement("line", { className: "baseLine", x1: _this.bodyBnd.l, x2: _this.bodyBnd.r, y1: orgPos.y, y2: orgPos.y }),
			wp.element.createElement(
				"text",
				{ className: "label left", x: _this.bodyBnd.l - 10, y: orgPos.y },
				_this.labels.x[0]
			),
			wp.element.createElement(
				"text",
				{ className: "label right", x: _this.bodyBnd.r + 10, y: orgPos.y },
				_this.labels.x[1]
			),
			wp.element.createElement(
				"text",
				{ className: "label top", x: orgPos.x, y: _this.bodyBnd.t - 10 },
				_this.labels.y[0]
			),
			wp.element.createElement(
				"text",
				{ className: "label bottom", x: orgPos.x, y: _this.bodyBnd.b + 10 },
				_this.labels.y[1]
			)
		);

		_this.state = { value: value, press: press };
		return _this;
	}

	babelHelpers.createClass(_class, [{
		key: "val2pos",
		value: function val2pos(value) {
			return {
				x: (value.x - this.valMap.x) / this.valMap.w * this.bodyBnd.w + this.bodyBnd.l,
				y: (value.y - this.valMap.y) / this.valMap.h * this.bodyBnd.h + this.bodyBnd.t
			};
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			var _state = this.state,
			    value = _state.value,
			    press = _state.press;


			var pos = this.val2pos(value);

			return wp.element.createElement(
				"div",
				{ className: 'PointChart' },
				wp.element.createElement(
					"svg",
					{ viewBox: "0 0 300 300" },
					this.base,
					wp.element.createElement("line", { className: "valLine", x1: pos.x, x2: pos.x, y1: this.bodyBnd.t, y2: this.bodyBnd.b }),
					wp.element.createElement("line", { className: "valLine", x1: this.bodyBnd.l, x2: this.bodyBnd.r, y1: pos.y, y2: pos.y }),
					wp.element.createElement("rect", { className: "point", x: pos.x - 5, y: pos.y - 5, width: "10", height: "10" }),
					wp.element.createElement("rect", {
						className: "control",
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
				wp.element.createElement(Catpow.HiddenValues, {
					name: this.props.name,
					value: value
				})
			);
		}
	}]);
	return _class;
}(wp.element.Component);
