(() => {
  // ../components/Spinner/component.jsx
  Catpow.Spinner = (props) => {
    const { type = "circle" } = props;
    return /* @__PURE__ */ wp.element.createElement("div", { className: `cp-spinner cp-spinner-${type}` }, /* @__PURE__ */ wp.element.createElement("div", { className: "graphics" }, /* @__PURE__ */ wp.element.createElement("div", { className: "graphic graphic1" }), /* @__PURE__ */ wp.element.createElement("div", { className: "graphic graphic2" }), /* @__PURE__ */ wp.element.createElement("div", { className: "graphic graphic3" })));
  };
})();
