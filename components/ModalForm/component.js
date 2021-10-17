var _excluded = ["type", "name", "children"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { babelHelpers.defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

Catpow.ModalFormContext = wp.element.createContext({});

Catpow.ModalForm = function (props) {
  var _wp$element = wp.element,
      useCallback = _wp$element.useCallback,
      useReducer = _wp$element.useReducer;
  var className = props.className,
      children = props.children,
      onComplete = props.onComplete;
  var reducer = useCallback(function (state, action) {
    switch (action.type) {
      case 'update':
        return _objectSpread(_objectSpread({}, state), action.data || {});

      case 'setValue':
        {
          var values = _objectSpread(_objectSpread({}, state.values), {}, babelHelpers.defineProperty({}, action.name, action.value));

          return _objectSpread(_objectSpread({}, state), {}, {
            values: values
          });
        }

      case 'complete':
        {
          var _values = _objectSpread(_objectSpread({}, state.values), {}, babelHelpers.defineProperty({}, action.name, action.value));

          return _objectSpread(_objectSpread({}, state), {}, {
            values: _values,
            open: false
          });
        }
    }
  }, []);

  var _useReducer = useReducer(reducer, {
    open: true,
    values: {}
  }),
      _useReducer2 = babelHelpers.slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  return wp.element.createElement(Catpow.Popup, {
    open: state.open,
    closeOnClickAway: false,
    onClosed: function onClosed() {
      return onComplete(state.values);
    }
  }, wp.element.createElement(Catpow.ModalFormContext.Provider, {
    value: {
      state: state,
      dispatch: dispatch
    }
  }, wp.element.createElement("div", {
    className: "ModalForm"
  }, children)));
};

Catpow.ModalForm.Input = function (props) {
  var _wp$element2 = wp.element,
      useCallback = _wp$element2.useCallback,
      useContext = _wp$element2.useContext;
  var _props$type = props.type,
      type = _props$type === void 0 ? 'CheckBox' : _props$type,
      _props$name = props.name,
      name = _props$name === void 0 ? 'accept' : _props$name,
      children = props.children,
      otherProps = babelHelpers.objectWithoutProperties(props, _excluded);

  var _useContext = useContext(Catpow.ModalFormContext),
      state = _useContext.state,
      dispatch = _useContext.dispatch;

  var InputComponent = Catpow[type];

  var _onChange = props.onChange || useCallback(function (_ref) {
    var state = _ref.state,
        dispatch = _ref.dispatch,
        name = _ref.name,
        value = _ref.value;
    dispatch({
      type: 'setValue',
      name: name,
      value: value
    });
  });

  return wp.element.createElement(InputComponent, babelHelpers.extends({
    value: state.values[name],
    onChange: function onChange(value) {
      return _onChange({
        state: state,
        dispatch: dispatch,
        name: name,
        value: value
      });
    }
  }, otherProps), children);
};

Catpow.ModalForm.Button = function (props) {
  var __ = wp.i18n.__;
  var _wp$element3 = wp.element,
      useCallback = _wp$element3.useCallback,
      useContext = _wp$element3.useContext;
  var _props$className = props.className,
      className = _props$className === void 0 ? 'button' : _props$className,
      _props$name2 = props.name,
      name = _props$name2 === void 0 ? '' : _props$name2,
      _props$value = props.value,
      value = _props$value === void 0 ? '' : _props$value,
      _props$label = props.label,
      label = _props$label === void 0 ? __('送信', 'catpow') : _props$label;

  var _useContext2 = useContext(Catpow.ModalFormContext),
      state = _useContext2.state,
      dispatch = _useContext2.dispatch;

  var _onClick = props.onClick || useCallback(function (_ref2) {
    var state = _ref2.state,
        dispatch = _ref2.dispatch,
        name = _ref2.name,
        value = _ref2.value;
    dispatch({
      type: 'complete',
      name: name,
      value: value
    });
  });

  return wp.element.createElement(Catpow.Button, {
    className: className,
    onClick: function onClick() {
      _onClick({
        state: state,
        dispatch: dispatch,
        name: name,
        value: value
      });
    },
    label: label
  });
};
