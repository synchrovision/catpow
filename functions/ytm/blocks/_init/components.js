function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { babelHelpers.defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

CP.YssEventInput = function (props) {
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
  var _window$Catpow$yss = window.Catpow.yss,
      parseEventString = _window$Catpow$yss.parseEventString,
      createEventString = _window$Catpow$yss.createEventString;
  var eventParams = [{
    type: 'text',
    label: 'ラベル',
    name: 'label'
  }, {
    type: 'number',
    label: '値',
    name: 'value'
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

  return wp.element.createElement(BaseControl, null, wp.element.createElement(Card, null, wp.element.createElement(CardHeader, null, "Yahoo Listing Event"), wp.element.createElement(CardBody, null, wp.element.createElement("table", null, eventParams.map(function (param) {
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
  })))));
};
