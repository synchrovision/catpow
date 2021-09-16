Catpow.InputDateTime = function (props) {
  var value = props.value,
      onChange = props.onChange;
  var _wp$element = wp.element,
      useState = _wp$element.useState,
      useMemo = _wp$element.useMemo,
      useCallback = _wp$element.useCallback;
  var date = useMemo(function () {
    var date = new Date();

    if (value) {
      date.setTime(value);
    }

    return date;
  }, []);
  var update = useCallback(function () {
    onChange(date.getTime());
  }, []);
  var getDateString = useCallback(function (date) {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000).toISOString().split('.')[0];
  }, []);
  return wp.element.createElement("div", {
    className: "InputDateTime"
  }, wp.element.createElement("input", {
    type: "datetime-local",
    className: "InputDateTime__date",
    value: getDateString(date),
    onChange: function onChange(e) {
      date.setTime(Date.parse(e.target.value));
      update();
    }
  }));
};
