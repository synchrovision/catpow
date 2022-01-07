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
      CardBody = _wp$components.CardBody,
      Flex = _wp$components.Flex,
      FlexItem = _wp$components.FlexItem,
      FlexBlock = _wp$components.FlexBlock,
      Icon = _wp$components.Icon;
  var _window$Catpow$yss = window.Catpow.yss,
      parseEventValue = _window$Catpow$yss.parseEventValue,
      createEventValue = _window$Catpow$yss.createEventValue;
  var eventParams = [{
    type: 'text',
    label: 'イベント',
    name: 'event'
  }, {
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
          state.events[action.index] = _objectSpread(_objectSpread({}, state.events[action.index]), action.event);
          var value = createEventValue(state.events);
          onChange(value);
          return _objectSpread(_objectSpread({}, state), {}, {
            value: value
          });
        }

      case 'CLONE':
        {
          state.events.splice(action.index, 0, _objectSpread({}, state.events[action.index]));

          var _value = createEventValue(state.events);

          onChange(_value);
          return _objectSpread(_objectSpread({}, state), {}, {
            value: _value
          });
        }

      case 'REMOVE':
        {
          state.events.splice(action.index, 1);

          var _value2 = createEventValue(state.events);

          onChange(_value2);
          return _objectSpread(_objectSpread({}, state), {}, {
            value: _value2
          });
        }
    }

    return state;
  }, []);

  var _useReducer = useReducer(reducer, {
    value: props.value,
    events: parseEventValue(props.value)
  }),
      _useReducer2 = babelHelpers.slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var EventInputCard = useCallback(function (props) {
    var event = props.event,
        index = props.index;
    return wp.element.createElement(Card, null, wp.element.createElement(CardHeader, null, wp.element.createElement(Flex, null, wp.element.createElement(FlexBlock, null, "Yahoo SS conversion"), wp.element.createElement(FlexItem, null, wp.element.createElement(Icon, {
      icon: "insert",
      onClick: function onClick() {
        dispatch({
          type: 'CLONE',
          index: index
        });
      }
    }), state.events.length > 1 && wp.element.createElement(Icon, {
      icon: "remove",
      onClick: function onClick() {
        dispatch({
          type: 'REMOVE',
          index: index
        });
      }
    })))), wp.element.createElement(CardBody, null, wp.element.createElement("table", null, eventParams.map(function (param) {
      return wp.element.createElement("tr", null, wp.element.createElement("th", {
        width: "80"
      }, param.label), wp.element.createElement("td", null, wp.element.createElement(TextControl, {
        value: event[param.name],
        type: param.type,
        onChange: function onChange(val) {
          dispatch({
            type: 'UPDATE',
            event: babelHelpers.defineProperty({}, param.name, val),
            index: index
          });
        }
      })));
    }))));
  }, []);
  return wp.element.createElement(BaseControl, null, state.events.length > 0 ? state.events.map(function (event, index) {
    return wp.element.createElement(EventInputCard, {
      event: event,
      index: index
    });
  }) : wp.element.createElement(EventInputCard, {
    event: {},
    index: 0
  }));
};
