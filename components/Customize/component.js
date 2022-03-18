/**
* CatpowのWordPressのテーマカスタマイザで用いる
* コンポーネントのベースとなるコンポーネント
*/
Catpow.Customize = function (props) {
  var _wp$element = wp.element,
      useState = _wp$element.useState,
      useCallback = _wp$element.useCallback,
      useMemo = _wp$element.useMemo,
      useEffect = _wp$element.useEffect,
      useRef = _wp$element.useRef,
      useReducer = _wp$element.useReducer;
  var id = props.id,
      _props$type = props.type,
      type = _props$type === void 0 ? 'Text' : _props$type,
      param = props.param;

  var _useState = useState(null),
      _useState2 = babelHelpers.slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  useEffect(function () {
    wp.customize(id, function (setting) {
      setValue(setting.get());
    });
  }, [id]);
  var onChange = useCallback(function (value) {
    setValue(value);
    wp.customize.control(id).setting.set(value);
  }, [id]);

  if (value === null) {
    return false;
  }

  return wp.element.createElement(Catpow.Customize[type], {
    id: id,
    value: value,
    onChange: onChange,
    param: param
  });
};
