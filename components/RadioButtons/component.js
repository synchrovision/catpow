(() => {
  // ../components/RadioButtons/component.jsx
  Catpow.RadioButtons = (props) => {
    const { useMemo } = wp.element;
    const { value, onChange } = props;
    const options = useMemo(() => {
      if (Array.isArray(props.options)) {
        return props.options.map((option) => {
          if (typeof option === "object") {
            return option;
          }
          return { label: option, value: option };
        });
      }
      return Object.keys(props.options).map((label) => {
        return { label, value: props.options[label] };
      });
    }, [props.options]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: "RadioButtons" }, options.map((option) => {
      const selected = option.value === value;
      return /* @__PURE__ */ wp.element.createElement(
        "div",
        {
          className: "RadioButton" + (selected ? " selected" : ""),
          onClick: (e) => {
            onChange(option.value);
          },
          role: "checkbox",
          "aria-checked": selected,
          key: option.label
        },
        /* @__PURE__ */ wp.element.createElement("div", { className: "RadioButtonIcon" + (selected ? " selected" : "") }, " "),
        option.label
      );
    }));
  };
})();
