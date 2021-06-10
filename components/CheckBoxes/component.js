Catpow.CheckBoxes = function (props) {
  var useMemo = wp.element.useMemo;
  var value = props.value,
      _onChange = props.onChange;
  var _Catpow = Catpow,
      CheckBox = _Catpow.CheckBox;
  var options = useMemo(function () {
    if (Array.isArray(props.options)) {
      return props.options.map(function (option) {
        if (babelHelpers.typeof(option) === 'object') {
          return option;
        }

        return {
          label: option,
          value: option
        };
      });
    }

    return Object.keys(props.options).map(function (label) {
      return {
        label: label,
        value: props.options[label]
      };
    });
  }, [props.options]);

  if (Array.isArray(value)) {
    return wp.element.createElement("div", {
      className: "CheckBoxes"
    }, options.map(function (option) {
      return wp.element.createElement(CheckBox, {
        label: option.label,
        onChange: function onChange(selected) {
          _onChange(option.value, selected, selected ? value.concat(value, [option.value]) : value.filter(function (val) {
            return val !== option.value;
          }));
        },
        selected: value.indexOf(option.value) !== -1
      });
    }));
  }

  return wp.element.createElement("div", {
    className: "CheckBoxes"
  }, options.map(function (option) {
    return wp.element.createElement(CheckBox, {
      label: option.label,
      onChange: function onChange(selected) {
        value[option.value] = selected;

        _onChange(option.value, selected, value);
      },
      selected: value[option.value]
    });
  }));
};
