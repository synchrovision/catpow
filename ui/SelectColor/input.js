(() => {
  // ui/SelectColor/input.jsx
  Catpow.UI.SelectColor = (props) => {
    const { useMemo, useState, useCallback } = wp.element;
    const { name } = props;
    const [value, setValue] = useState(props.value);
    const { bem } = Catpow.util;
    const classes = bem("SelectColor");
    const parseColorClass = useCallback((colorClass) => {
      if (colorClass) {
        const matches = colorClass.match(/^color((|_|\-\-)(\-?\d+))$/);
        if (matches) {
          return {
            fixed: matches[2] === "--",
            absolute: matches[2] === "",
            relative: matches[2] === "_",
            value: matches[3]
          };
        }
      }
      return { fixed: false, absolute: false, relative: false, value: 0 };
    });
    const generateColorClass = useCallback((data2) => "color" + (data2.fixed ? "--" : data2.relative ? "_" : "") + data2.value, []);
    const data = useMemo(() => parseColorClass(value), [value]);
    const Selections = useCallback((props2) => {
      const { fixed = false, absolute = false, relative = false, active = false, selected } = props2;
      return /* @__PURE__ */ wp.element.createElement("ul", { className: classes.items({ fixed, absolute, relative, active }) }, Array.from(Array(13), (v, value2) => {
        const colorClass = generateColorClass({ fixed, absolute, relative, value: value2 });
        return /* @__PURE__ */ wp.element.createElement(
          "li",
          {
            className: classes.items.item(colorClass, { active: colorClass == selected, fixed, absolute, relative }),
            onClick: () => setValue(colorClass),
            key: colorClass
          },
          " "
        );
      }));
    }, []);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement(Selections, { selected: value, fixed: true, active: data.fixed }), /* @__PURE__ */ wp.element.createElement(Selections, { selected: value, absolute: true, active: data.absolute }), /* @__PURE__ */ wp.element.createElement(Selections, { selected: value, relative: true, active: data.relative }), /* @__PURE__ */ wp.element.createElement(Catpow.UI.HiddenValues, { name, value }));
  };
})();
