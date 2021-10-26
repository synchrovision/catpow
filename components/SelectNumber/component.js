Catpow.SelectNumber = function (props) {
  var _props$min = props.min,
      min = _props$min === void 0 ? 1 : _props$min,
      _props$max = props.max,
      max = _props$max === void 0 ? 10 : _props$max,
      label = props.label,
      _props$step = props.step,
      step = _props$step === void 0 ? 1 : _props$step,
      value = props.value,
      _onChange = props.onChange;
  var _wp$element = wp.element,
      useState = _wp$element.useState,
      useMemo = _wp$element.useMemo;
  var selections = useMemo(function () {
    var selections = [];

    for (var i = parseInt(min); i <= parseInt(max); i += parseInt(step)) {
      selections.push(i);
    }

    return selections;
  }, [min, max, step]);
  return wp.element.createElement("select", {
    className: "SelectNumber",
    onChange: function onChange(e) {
      _onChange(e.currentTarget.value);
    }
  }, label && wp.element.createElement("option", {
    selected: value === undefined
  }, label), selections.map(function (i) {
    return wp.element.createElement("option", {
      value: i,
      selected: value === i,
      key: i
    }, i);
  }));
};
