function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { babelHelpers.defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

Catpow.UI.PhoneNumber = function (props) {
  var _wp$element = wp.element,
      useState = _wp$element.useState,
      useMemo = _wp$element.useMemo,
      useRef = _wp$element.useRef,
      useCallback = _wp$element.useCallback,
      useReducer = _wp$element.useReducer;
  var init = useCallback(function (state) {
    var value = state.value;
    var secs = [];
    return {
      value: value,
      secs: value.split('-'),
      isComposing: false
    };
  }, []);
  var reducer = useCallback(function (state, action) {
    switch (action.type) {
      case 'SET_SEC':
        {
          var i = action.i,
              val = action.val;

          if (!val.match(/^\d*$/)) {
            return state;
          }

          var secs = state.value.split('-');

          if (val.length === 10) {
            secs[0] = val.substring(0, 2);
            secs[1] = val.substring(2, 6);
            secs[2] = val.substring(6);
          } else if (val.length === 11) {
            secs[0] = val.substring(0, 3);
            secs[1] = val.substring(3, 7);
            secs[2] = val.substring(7);
          } else {
            secs[i] = val;

            if (val.length > 3 && i < 2 || i == 0 && val.match(/^0\d0$/)) {
              if (!state.isComposing) {
                refs[i + 1].current.focus();
              }
            }
          }

          return _objectSpread(_objectSpread({}, state), {}, {
            secs: secs,
            value: secs.join('-')
          });
        }

      case 'START_COMPOSE':
        return _objectSpread(_objectSpread({}, state), {}, {
          isComposing: true
        });

      case 'END_COMPOSE':
        return _objectSpread(_objectSpread({}, state), {}, {
          isComposing: false
        });
    }

    return state;
  }, []);

  var _useReducer = useReducer(reducer, {
    value: props.value
  }, init),
      _useReducer2 = babelHelpers.slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var Input = useCallback(function (_ref) {
    var i = _ref.i,
        refs = _ref.refs,
        state = _ref.state,
        dispatch = _ref.dispatch;
    return wp.element.createElement("input", {
      type: "text",
      className: "sec" + i,
      size: "4",
      autocomplete: ['tel-area-code', 'tel-local-prefix', 'tel-local-suffix'][i],
      onChange: function onChange(e) {
        var val = e.target.value;
        dispatch({
          type: 'SET_SEC',
          i: i,
          val: val
        });
      },
      onCompositionStart: function onCompositionStart(e) {
        dispatch({
          type: 'START_COMPOSE'
        });
      },
      onCompositionEnd: function onCompositionEnd(e) {
        var val = e.target.value;
        dispatch({
          type: 'SET_SEC',
          i: i,
          val: val
        });
        dispatch({
          type: 'END_COMPOSE'
        });
      },
      ref: refs[i],
      value: state.secs[i]
    });
  }, []);
  var refs = [useRef({}), useRef({}), useRef({})];
  return wp.element.createElement("div", {
    className: 'PhoneNumber'
  }, wp.element.createElement(Input, {
    i: 0,
    refs: refs,
    state: state,
    dispatch: dispatch
  }), wp.element.createElement("span", {
    class: "sep"
  }, "-"), wp.element.createElement(Input, {
    i: 1,
    refs: refs,
    state: state,
    dispatch: dispatch
  }), wp.element.createElement("span", {
    class: "sep"
  }, "-"), wp.element.createElement(Input, {
    i: 2,
    refs: refs,
    state: state,
    dispatch: dispatch
  }), wp.element.createElement(Catpow.UI.HiddenValues, {
    name: props.name,
    value: state.value
  }));
};
