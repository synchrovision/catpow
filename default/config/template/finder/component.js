function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Finder = /*#__PURE__*/function (_wp$element$Component) {
  babelHelpers.inherits(Finder, _wp$element$Component);

  var _super = _createSuper(Finder);

  function Finder(props) {
    babelHelpers.classCallCheck(this, Finder);
    return _super.call(this, props);
  }

  babelHelpers.createClass(Finder, [{
    key: "render",
    value: function render() {
      return wp.element.createElement("ul", {
        class: "wp-block-catpow-listed" + this.props.classes
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {}
  }]);
  return Finder;
}(wp.element.Component);
