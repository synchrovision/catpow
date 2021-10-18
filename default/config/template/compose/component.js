function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Compose = /*#__PURE__*/function (_wp$element$Component) {
  babelHelpers.inherits(Compose, _wp$element$Component);

  var _super = _createSuper(Compose);

  function Compose(props) {
    var _this;

    babelHelpers.classCallCheck(this, Compose);
    _this = _super.call(this, props);
    var myData = props.myData;
    var count = 0;
    _this.state = {
      myData: myData,
      count: count
    };
    return _this;
  }

  babelHelpers.createClass(Compose, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return wp.element.createElement("div", null, wp.element.createElement("div", {
        class: "result"
      }, this.state.wait ? 'waiting...' : this.state.myData + this.state.count), wp.element.createElement("button", {
        onClick: function onClick(e) {
          _this2.setState({
            wait: true
          });

          wp.apiFetch({
            path: _this2.props.path + '/myAction',
            method: 'post',
            data: _this2.state
          }).then(function (data) {
            data.wait = false;

            _this2.setState(data);
          }).catch(function (e) {
            console.log(e);
          });
        }
      }, "myAction"));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {}
  }]);
  return Compose;
}(wp.element.Component);
