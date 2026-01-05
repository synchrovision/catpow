(() => {
  // ../components/RadioButtons/component.jsx
  Catpow.RadioButtons = (props) => {
    const { className = "cp-radiobuttons", useState, useMemo } = wp.element;
    const { size = "medium", onChange, required = false } = props;
    const { bem } = Catpow.util;
    const classes = useMemo(() => bem(className), []);
    const [value, setValue] = useState(props.value ?? null);
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
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes(`is-size-${size}`) }, options.map((option) => {
      const selected = option.value === value;
      return /* @__PURE__ */ wp.element.createElement(
        "div",
        {
          className: classes.button({ "is-selected": selected }),
          onClick: (e) => {
            if (selected && !required) {
              setValue(null);
              onChange(null);
            } else {
              setValue(option.value);
              onChange(option.value);
            }
          },
          role: "checkbox",
          "aria-checked": selected,
          key: option.label
        },
        /* @__PURE__ */ wp.element.createElement("div", { className: classes.button.icon({ "is-selected": selected }) }, " "),
        option.label
      );
    }));
  };
})();
