(() => {
  // ../components/SelectTable/component.jsx
  Catpow.SelectTable = function({ selections, value, onChange, spacer, col }) {
    var i, items, values, fontSize, className = "SelectTable", rows = [];
    spacer = spacer || 0;
    col = col || 5;
    if (Array.isArray(selections)) {
      values = selections;
      items = selections.map((val) => /* @__PURE__ */ React.createElement("td", { className: val === value ? "item active" : "item", onClick: () => {
        onChange(val);
      } }, val));
    } else {
      values = Object.values(selections);
      items = Object.keys(selections).map((key) => /* @__PURE__ */ React.createElement("td", { className: selections[key] === value ? "item active" : "item", onClick: () => {
        onChange(selections[key]);
      } }, key));
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
      items.unshift(/* @__PURE__ */ React.createElement("td", { className: "spacer" }));
    }
    for (i = (col - items.length % col) % col; i > 0; i--) {
      items.push(/* @__PURE__ */ React.createElement("td", { className: "spacer" }));
    }
    for (i = 0; i < items.length; i += col) {
      rows.push(items.slice(i, i + col));
    }
    return /* @__PURE__ */ React.createElement("table", { className }, /* @__PURE__ */ React.createElement("tbody", null, rows.map((row) => /* @__PURE__ */ React.createElement("tr", null, row))));
  };
})();
