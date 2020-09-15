Catpow.Payment = function (_wp$element$Component) {
	babelHelpers.inherits(_class, _wp$element$Component);

	function _class(props) {
		babelHelpers.classCallCheck(this, _class);

		/*
  購入しようとしている商品の内容と価格
  有効な決済方法の情報（クライアントキーはWP API）
  */
		return babelHelpers.possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));
	}

	babelHelpers.createClass(_class, [{
		key: 'render',
		value: function render() {
			var _props = this.props,
			    cart = _props.cart,
			    payment = _props.payment;


			return wp.element.createElement(
				'div',
				{ className: 'Payment' },
				wp.element.createElement(Catpow.HiddenValues, {
					name: this.props.name,
					value: this.state.value
				})
			);
		}
	}]);
	return _class;
}(wp.element.Component);
