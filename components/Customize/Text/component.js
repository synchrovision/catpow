Catpow.Customize.Text = function (props) {
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
  return wp.element.createElement("input", {
    type: param.type || 'text',
    value: value,
    onChange: function onChange(e) {
      _onChange(e.currentTarget.value);
    }
  });
};
