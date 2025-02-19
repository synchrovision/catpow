(() => {
  // ../ui/Rating/input.jsx
  Catpow.UI.Rating = ({ name, value, max = 5 }) => {
    const { useState, useCallback } = wp.element;
    const [val, setVal] = useState(value);
    const { bem } = Catpow.util;
    const classes = bem("cpui-rating");
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes(), style: { "--rating-max": max, "--rating-value": val, "--rating-ratio": val / max } }, /* @__PURE__ */ wp.element.createElement("div", { className: classes.points() }, [...Array(max).keys()].map((rate) => /* @__PURE__ */ wp.element.createElement("div", { className: classes.points.point({ "is-active": rate + 1 <= val }), onClick: () => setVal(rate + 1), key: rate }))), /* @__PURE__ */ wp.element.createElement(Catpow.UI.HiddenValues, { name, value: val }));
  };
})();
