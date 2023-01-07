(() => {
  // ../components/Spinner/component.jsx
  Catpow.Spinner = (props) => {
    const { type = "circle" } = props;
    return /* @__PURE__ */ React.createElement("div", { className: `Spinner Spinner-${type}` }, /* @__PURE__ */ React.createElement("div", { className: "graphics" }, /* @__PURE__ */ React.createElement("div", { className: "graphic graphic1" }), /* @__PURE__ */ React.createElement("div", { className: "graphic graphic2" }), /* @__PURE__ */ React.createElement("div", { className: "graphic graphic3" })));
  };
})();
