(() => {
  // ../components/SelectTable/component.jsx
  Catpow.SelectTable = function({ selections, value, onChange, spacer, col }) {
    var i, items, values, fontSize, className = "SelectTable", rows = [];
    spacer = spacer || 0;
    col = col || 5;
    if (Array.isArray(selections)) {
      values = selections;
      items = selections.map((val) => /* @__PURE__ */ wp.element.createElement("td", { className: val === value ? "item active" : "item", onClick: () => {
        onChange(val);
      }, key: val }, val));
    } else {
      values = Object.values(selections);
      items = Object.keys(selections).map((key) => /* @__PURE__ */ wp.element.createElement("td", { className: selections[key] === value ? "item active" : "item", onClick: () => {
        onChange(selections[key]);
      }, key }, key));
    }
    fontSize = (360 / col - 5) / Math.max(...values.map((val) => val.toString().length));
    if (fontSize > 20) {
      className += " hasLargeFontSize";
    } else if (fontSize > 10) {
      className += " hasRegularFontSize";
    } else {
      className += " hasSmallFontSize";
    }
    for (i = 0; i < spacer; i++) {
      items.unshift(/* @__PURE__ */ wp.element.createElement("td", { className: "spacer", key: `start-spacer-${i}` }));
    }
    for (i = (col - items.length % col) % col; i > 0; i--) {
      items.push(/* @__PURE__ */ wp.element.createElement("td", { className: "spacer", key: `end-spacer-${i}` }));
    }
    for (i = 0; i < items.length; i += col) {
      rows.push(items.slice(i, i + col));
    }
    return /* @__PURE__ */ wp.element.createElement("table", { className }, /* @__PURE__ */ wp.element.createElement("tbody", null, rows.map((row, index) => /* @__PURE__ */ wp.element.createElement("tr", { key: index }, row))));
  };
})();
