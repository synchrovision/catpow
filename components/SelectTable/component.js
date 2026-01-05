(() => {
  // ../components/SelectTable/component.jsx
  Catpow.SelectTable = (props) => {
    const { className = "cp-selecttable", selections, value, onChange, spacer = 0, col = 5, multipe = false } = props;
    var i, items, values, fontSize, rows = [];
    const { useMemo, useCallback } = wp.element;
    const { bem } = Catpow.util;
    const classes = bem(className);
    const itemClasses = classes.tbody.tr.td;
    const isActiveValue = useCallback(
      (val) => {
        if (Array.isArray(value)) {
          return value.includes(val);
        }
        return value === val;
      },
      [value]
    );
    if (Array.isArray(selections)) {
      items = selections.map((val) => /* @__PURE__ */ wp.element.createElement(
        "td",
        {
          className: itemClasses({ "is-active": isActiveValue(val) }),
          onClick: () => {
            onChange(val);
          },
          key: val
        },
        val
      ));
    } else {
      items = Object.keys(selections).map((key) => /* @__PURE__ */ wp.element.createElement(
        "td",
        {
          className: itemClasses({ "is-active": isActiveValue(selections[key]) }),
          onClick: () => {
            onChange(selections[key]);
          },
          key
        },
        key
      ));
    }
    const allLabels = useMemo(() => Array.isArray(selections) ? selections : Object.keys(selections), [selections]);
    const fontSizeClass = useMemo(() => {
      const fontSize2 = (360 / col - 5) / Math.max(...allLabels.map((label) => label.toString().length));
      if (fontSize2 > 20) {
        return "hasLargeFontSize";
      }
      if (fontSize2 > 10) {
        return "hasRegularFontSize";
      }
      return "hasSmallFontSize";
    }, [col, allLabels]);
    for (i = 0; i < spacer; i++) {
      items.unshift(/* @__PURE__ */ wp.element.createElement("td", { className: "spacer", key: `start-spacer-${i}` }));
    }
    for (i = (col - items.length % col) % col; i > 0; i--) {
      items.push(/* @__PURE__ */ wp.element.createElement("td", { className: "spacer", key: `end-spacer-${i}` }));
    }
    for (i = 0; i < items.length; i += col) {
      rows.push(items.slice(i, i + col));
    }
    return /* @__PURE__ */ wp.element.createElement("table", { className: classes(fontSizeClass) }, /* @__PURE__ */ wp.element.createElement("tbody", { className: classes.tbody() }, rows.map((row, index) => /* @__PURE__ */ wp.element.createElement("tr", { className: classes.tbody.tr(), key: index }, row))));
  };
})();
