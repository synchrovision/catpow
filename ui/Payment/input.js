function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

Catpow.UI.Payment = /*#__PURE__*/function (_wp$element$Component) {
  babelHelpers.inherits(_class, _wp$element$Component);

  var _super = _createSuper(_class);

  function _class(props) {
    babelHelpers.classCallCheck(this, _class);

    /*
    購入しようとしている商品の内容と価格
    有効な決済方法の情報（クライアントキーはWP API）
    */
    return _super.call(this, props);
  }

  babelHelpers.createClass(_class, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          cart = _this$props.cart,
          payment = _this$props.payment;
      return wp.element.createElement("div", {
        className: 'Payment'
      }, wp.element.createElement(Catpow.UI.HiddenValues, {
        name: this.props.name,
        value: this.state.value
      }));
    }
  }]);
  return _class;
}(wp.element.Component);
