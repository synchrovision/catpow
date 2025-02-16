(() => {
  // ../components/Buttons/component.jsx
  Catpow.Buttons = (props) => {
    const { className = "is-medium" } = props;
    const { useMemo } = wp.element;
    if (props.children) {
      return /* @__PURE__ */ wp.element.createElement("div", { className: "cp-buttons " + className }, props.children);
    }
    const { onClick } = props;
    const options = useMemo(() => {
      if (Array.isArray(props.options)) {
        return props.options.map((option) => {
          if (typeof option === "object") {
            return option;
          }
          const [label, className2] = (option + ":").split(":");
          return { label, className: className2, value: label };
        });
      }
      return Object.keys(props.options).map((key) => {
        const [label, className2] = (key + ":").split(":");
        return { label, className: className2, value: props.options[key] };
      });
    }, [props.options]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: "cp-buttons " + className }, options.map((option, index) => /* @__PURE__ */ wp.element.createElement(Catpow.Button, { onClick, ...option, key: index })));
  };
  Catpow.Button = (props) => {
    const { className = "is-secondary", label, value, onClick } = props;
    const disabled = props.disabled || className.split(" ").indexOf("is-disabled") !== -1;
    return /* @__PURE__ */ wp.element.createElement("button", { className: "cp-button " + className, onClick: () => {
      !props.disabled && onClick(value);
    }, disabled: props.disabled }, /* @__PURE__ */ wp.element.createElement("div", { className: "cp-button__icon" }, " "), label);
  };
})();
