function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { babelHelpers.defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

Catpow.UI.TaskProcess = function (props) {
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
  var __ = wp.i18n.__;
  var files = props.files || [null];
  var reducer = useCallback(function (state, action) {
    switch (action.type) {
      case 'SAVE':
        {
          return _objectSpread({}, state);
        }
    }

    return state;
  }, []);

  var _useReducer = useReducer(reducer, {
    value: props.value || {}
  }),
      _useReducer2 = babelHelpers.slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var save = useCallback(function (key, value, result) {
    dispatch({
      type: 'SAVE'
    });
  }, [dispatch]);
  var processOptions = useMemo(function () {
    var _ref;

    return _ref = {}, babelHelpers.defineProperty(_ref, __("セーブ"), 'save'), babelHelpers.defineProperty(_ref, __("ロード"), 'load'), babelHelpers.defineProperty(_ref, __("接続承認"), 'check'), babelHelpers.defineProperty(_ref, __("接続承認確認"), 'is_checked'), babelHelpers.defineProperty(_ref, __("タスク完了"), 'complete'), babelHelpers.defineProperty(_ref, __("タスク完了確認"), 'is_completed'), _ref;
  }, []);
  return wp.element.createElement("div", {
    className: 'TaskProcess'
  }, files.map(function (file) {
    return wp.element.createElement("div", {
      className: "TaskProcess__content"
    }, wp.element.createElement(CheckBoxes, {
      options: processOptions,
      value: state.value,
      onChange: save
    }), wp.element.createElement(CheckBox, {
      label: __("タスク発行"),
      selected: state.value.create,
      onChange: function onChange(value) {
        state.value.create = value ? {} : false;
        save();
      }
    }), state.value.create && wp.element.createElement("dl", {
      class: "inputs"
    }, wp.element.createElement("dt", {
      class: "label"
    }, __('アクション')), wp.element.createElement("dd", {
      class: "input"
    }, wp.element.createElement("input", {
      type: "text",
      value: state.value.create.action,
      onChange: function onChange(e) {
        state.value.create.action = e.target.value;
        save();
      }
    })), wp.element.createElement("dt", {
      class: "label"
    }, __('有効期限')), wp.element.createElement("dd", {
      class: "input"
    }, wp.element.createElement("input", {
      type: "text",
      value: state.value.create.expire,
      onChange: function onChange(e) {
        state.value.create.expire = e.target.value;
        save();
      }
    })), wp.element.createElement("dt", {
      class: "label"
    }, __('有効回数')), wp.element.createElement("dd", {
      class: "input"
    }, wp.element.createElement("input", {
      type: "number",
      value: state.value.create.limit,
      onChange: function onChange(e) {
        state.value.create.limit = e.target.value;
        save();
      }
    }))), wp.element.createElement(Catpow.UI.HiddenValues, {
      name: props.name,
      value: state.value
    }));
  }));
};
