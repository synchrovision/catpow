function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { babelHelpers.defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

Catpow.UI.PostSchedule = function (props) {
  var _wp$element = wp.element,
      Fragment = _wp$element.Fragment,
      useCallback = _wp$element.useCallback,
      useMemo = _wp$element.useMemo,
      useState = _wp$element.useState,
      useReducer = _wp$element.useReducer;
  var _Catpow = Catpow,
      RadioButtons = _Catpow.RadioButtons,
      CheckBoxes = _Catpow.CheckBoxes,
      CheckBox = _Catpow.CheckBox,
      SelectNumber = _Catpow.SelectNumber;
  var _props$statuses = props.statuses,
      statuses = _props$statuses === void 0 ? ['publish', 'private', 'draft', 'trash'] : _props$statuses;
  var __ = wp.i18n.__;

  var _useState = useState(!!props.value),
      _useState2 = babelHelpers.slicedToArray(_useState, 2),
      usePostSchedule = _useState2[0],
      setUsePostSchedule = _useState2[1];

  var reducer = useCallback(function (state, action) {
    switch (action.type) {
      case 'SAVE':
        {
          if (!state.value.status) {
            state.value.status = 'trash';
          }

          return _objectSpread({}, state);
        }
    }

    return state;
  }, []);

  var _useReducer = useReducer(reducer, {
    value: props.value || {
      status: 'trash',
      time: Math.floor(Date.now() / (24 * 3600 * 1000) + 3) * 24 * 3600
    }
  }),
      _useReducer2 = babelHelpers.slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var save = useCallback(function (key, value, result) {
    dispatch({
      type: 'SAVE'
    });
  }, [dispatch]);
  return wp.element.createElement("div", {
    className: 'PostSchedule'
  }, wp.element.createElement("div", {
    className: "PostSchedule__contents"
  }, wp.element.createElement(Catpow.CheckBox, {
    selected: usePostSchedule,
    onChange: function onChange() {
      return setUsePostSchedule(!usePostSchedule);
    }
  }), usePostSchedule && wp.element.createElement(Fragment, null, wp.element.createElement(Catpow.InputDateTime, {
    value: state.value.time * 1000,
    onChange: function onChange(time) {
      state.value.time = Math.floor(time / 1000);
      save();
    }
  }), wp.element.createElement(Catpow.SelectBox, {
    options: statuses,
    value: state.value.status || 'trash',
    onChange: function onChange(status) {
      state.value.status = status;
      save();
    }
  }), state.value && wp.element.createElement(Catpow.UI.HiddenValues, {
    name: props.name,
    value: state.value
  }))));
};
