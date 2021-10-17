Catpow.Buttons = function (props) {
  var _props$className = props.className,
      className = _props$className === void 0 ? "medium" : _props$className;

  if (props.children) {
    return wp.element.createElement("div", {
      className: "Buttons " + className
    }, props.children);
  }

  var onClick = props.onClick;
  var options = useMemo(function () {
    if (Array.isArray(props.options)) {
      return props.options.map(function (option) {
        if (babelHelpers.typeof(option) === 'object') {
          return option;
        }

        var _split = (option + ':').split(':'),
            _split2 = babelHelpers.slicedToArray(_split, 2),
            label = _split2[0],
            className = _split2[1];

        return {
          label: label,
          className: className,
          value: label
        };
      });
    }

    return Object.keys(props.options).map(function (key) {
      var _split3 = (key + ':').split(':'),
          _split4 = babelHelpers.slicedToArray(_split3, 2),
          label = _split4[0],
          className = _split4[1];

      return {
        label: label,
        className: className,
        value: props.options[label]
      };
    });
  }, [props.options]);
  return wp.element.createElement("div", {
    className: "Buttons " + className
  }, options.map(function (option, index) {
    return wp.element.createElement(Catpow.Button, babelHelpers.extends({}, option, {
      key: index
    }));
  }));
};

Catpow.Button = function (props) {
  var _props$className2 = props.className,
      className = _props$className2 === void 0 ? "secondary" : _props$className2,
      label = props.label,
      value = props.value,
      _onClick = props.onClick;
  var disabled = props.disabled || className.split(' ').indexOf('disabled') !== -1;
  return wp.element.createElement("button", {
    className: "Button " + className,
    onClick: function onClick() {
      !props.disabled && _onClick(value);
    },
    disabled: props.disabled
  }, wp.element.createElement("div", {
    className: "ButtonIcon"
  }, " "), label);
};
