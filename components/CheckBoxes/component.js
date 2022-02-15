Catpow.CheckBoxes = function (props) {
  var useMemo = wp.element.useMemo;
  var _props$value = props.value,
      value = _props$value === void 0 ? [] : _props$value,
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
    var flags = {};
    value.map(function (val) {
      return flags[val] = true;
    });
    return wp.element.createElement("div", {
      className: "CheckBoxes"
    }, options.map(function (option) {
      return wp.element.createElement(CheckBox, {
        label: option.label,
        onChange: function onChange(selected) {
          if (selected) {
            flags[option.value] = true;
          } else {
            delete flags[option.value];
          }

          _onChange(Object.keys(flags));
        },
        selected: flags[option.value]
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
