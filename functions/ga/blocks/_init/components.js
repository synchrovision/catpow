function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { babelHelpers.defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

CP.GaEventInput = function (props) {
  var onChange = props.onChange;
  var _wp$element = wp.element,
      useState = _wp$element.useState,
      useReducer = _wp$element.useReducer,
      useCallback = _wp$element.useCallback,
      useEffect = _wp$element.useEffect;
  var _wp$components = wp.components,
      Card = _wp$components.Card,
      CardHeader = _wp$components.CardHeader,
      CardBody = _wp$components.CardBody;
  var _window$Catpow$ga = window.Catpow.ga,
      parseEventString = _window$Catpow$ga.parseEventString,
      createEventString = _window$Catpow$ga.createEventString;
  var eventParams = [{
    type: 'text',
    label: 'イベント',
    name: 'event',
    isExtended: true
  }, {
    type: 'text',
    label: 'アクション',
    name: 'action',
    isExtended: false
  }, {
    type: 'text',
    label: 'カテゴリ',
    name: 'category',
    isExtended: false
  }, {
    type: 'text',
    label: 'ラベル名',
    name: 'label_name',
    isExtended: true
  }, {
    type: 'text',
    label: 'ラベル',
    name: 'label',
    isExtended: false
  }, {
    type: 'number',
    label: '値',
    name: 'value',
    isExtended: true
  }];
  var reducer = useCallback(function (state, action) {
    switch (action.type) {
      case 'UPDATE':
        {
          var event = _objectSpread(_objectSpread({}, state.event), action.event);

          var value = createEventString(event);
          onChange(value);
          return _objectSpread(_objectSpread({}, state), {}, {
            event: event,
            value: value
          });
        }
    }

    return state;
  }, []);

  var _useReducer = useReducer(reducer, {
    value: props.value,
    event: parseEventString(props.value)
  }),
      _useReducer2 = babelHelpers.slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var _useState = useState(!!(state.event.label_name || state.event.value)),
      _useState2 = babelHelpers.slicedToArray(_useState, 2),
      useExtended = _useState2[0],
      setUseExtended = _useState2[1];

  return wp.element.createElement(BaseControl, null, wp.element.createElement(Card, null, wp.element.createElement(CardHeader, null, "Google Analitics Event"), wp.element.createElement(CardBody, null, wp.element.createElement("table", null, eventParams.map(function (param) {
    if (!useExtended && param.isExtended) {
      return false;
    }

    return wp.element.createElement("tr", null, wp.element.createElement("th", {
      width: "80"
    }, param.label), wp.element.createElement("td", null, wp.element.createElement(TextControl, {
      value: state.event[param.name],
      type: param.type,
      onChange: function onChange(val) {
        dispatch({
          type: 'UPDATE',
          event: babelHelpers.defineProperty({}, param.name, val)
        });
      }
    })));
  }), wp.element.createElement("tr", null, wp.element.createElement("th", null), wp.element.createElement("td", null, wp.element.createElement(CheckboxControl, {
    label: "\u62E1\u5F35\u8A2D\u5B9A",
    onChange: function onChange(flag) {
      setUseExtended(flag);
    },
    checked: useExtended
  })))))));
};
