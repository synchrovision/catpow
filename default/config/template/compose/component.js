var Compose = function (_wp$element$Component) {
	babelHelpers.inherits(Compose, _wp$element$Component);

	function Compose(props) {
		babelHelpers.classCallCheck(this, Compose);

		var _this = babelHelpers.possibleConstructorReturn(this, (Compose.__proto__ || Object.getPrototypeOf(Compose)).call(this, props));

		var myData = props.myData;

		var count = 0;
		_this.state = { myData: myData, count: count };
		return _this;
	}

	babelHelpers.createClass(Compose, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			return wp.element.createElement(
				'div',
				null,
				wp.element.createElement(
					'div',
					{ 'class': 'result' },
					this.state.wait ? 'waiting...' : this.state.myData + this.state.count
				),
				wp.element.createElement(
					'button',
					{
						onClick: function onClick(e) {
							_this2.setState({ wait: true });
							wp.apiFetch({ path: _this2.props.path + '/myAction', method: 'post', data: _this2.state }).then(function (data) {
								data.wait = false;
								_this2.setState(data);
							}).catch(function (e) {
								console.log(e);
							});
						}
					},
					'myAction'
				)
			);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {}
	}]);
	return Compose;
}(wp.element.Component);
