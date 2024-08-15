(() => {
  // ../components/TabPanel/component.jsx
  Catpow.TabPanel = (props) => {
    const { className = "TabPanel", useState, useMemo } = wp.element;
    const { size = "medium", onChange } = props;
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
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes(`is-size-${size}`) }, /* @__PURE__ */ wp.element.createElement("ul", { className: classes.tabs() }, options.map((option) => {
      const selected = option.value === value;
      return /* @__PURE__ */ wp.element.createElement(
        "li",
        {
          className: classes.tabs.tab({ "is-selected": selected }),
          onClick: (e) => {
            setValue(option.value);
            onChange(option.value);
          },
          role: "checkbox",
          "aria-checked": selected,
          key: option.label
        },
        option.label
      );
    })), /* @__PURE__ */ wp.element.createElement("div", { className: classes.contents() }, props.children));
  };
})();
