function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { babelHelpers.defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

Catpow.Customize.ColorSet = function (props) {
  var _wp$element = wp.element,
      useState = _wp$element.useState,
      useCallback = _wp$element.useCallback,
      useMemo = _wp$element.useMemo,
      useEffect = _wp$element.useEffect,
      useRef = _wp$element.useRef,
      useReducer = _wp$element.useReducer;
  var value = props.value,
      _onChange = props.onChange,
      param = props.param;
  var roles = param.roles;
  var Pane = useCallback(function (props) {
    var role = props.role,
        value = props.value;
    var ref = useRef(null);

    var _useState = useState(value[role]),
        _useState2 = babelHelpers.slicedToArray(_useState, 2),
        tmp = _useState2[0],
        setTmp = _useState2[1];

    useEffect(function () {
      setTmp(value[role]);
    }, [value[role]]);
    var isDark = useMemo(function () {
      return value[role].match(/#?(\w{2})(\w{2})(\w{2})/).slice(1).reduce(function (p, c, i) {
        return p + parseInt(c, 16) * [3, 6, 2][i];
      }, 0) < 0x600;
    }, [value[role]]);
    return wp.element.createElement("div", {
      className: 'pane pane_' + role + (isDark ? ' is-dark' : ' is-light')
    }, wp.element.createElement("div", {
      class: "body"
    }, wp.element.createElement("div", {
      class: "label",
      onClick: function onClick(e) {
        ref.current.dispatchEvent(new Event('click'));
      }
    }, roles[role].label), wp.element.createElement("input", {
      type: "text",
      className: "text",
      value: tmp,
      onChange: function onChange(e) {
        if (/^#[\dA-Fa-f]{6}$/.test(e.currentTarget.value)) {
          console.log('text color update');

          _onChange(_objectSpread(_objectSpread({}, value), {}, babelHelpers.defineProperty({}, role, e.currentTarget.value)));
        }

        setTmp(e.currentTarget.value);
      }
    })), wp.element.createElement("div", {
      class: "bg",
      onClick: function onClick(e) {
        ref.current.dispatchEvent(new Event('click'));
      },
      style: {
        backgroundColor: value[role]
      }
    }), wp.element.createElement("input", {
      ref: ref,
      className: "input input_color",
      type: "color",
      value: value[role],
      onChange: function onChange(e) {
        _onChange(_objectSpread(_objectSpread({}, value), {}, babelHelpers.defineProperty({}, role, e.currentTarget.value)));
      }
    }));
  }, []);

  if (value === null) {
    return false;
  }

  return wp.element.createElement("div", {
    className: "ColorSet"
  }, wp.element.createElement("div", {
    class: "panes"
  }, Object.keys(roles).map(function (role) {
    return wp.element.createElement(Pane, {
      role: role,
      value: value
    });
  })));
};
