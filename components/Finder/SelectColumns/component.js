(() => {
  // ../components/Finder/SelectColumns/component.jsx
  Catpow.Finder.SelectColumns = (props) => {
    const { useState, useContext } = wp.element;
    const { state, dispatch } = useContext(Catpow.FinderContext);
    const [open, setOpen] = useState(false);
    const { cols } = state.index;
    return /* @__PURE__ */ React.createElement("div", { className: "FinderControl FinderSelectColumns" }, /* @__PURE__ */ React.createElement("ul", { className: "items" }, /* @__PURE__ */ React.createElement("li", { className: "item" + (open ? " active" : "") }, /* @__PURE__ */ React.createElement("div", { className: "icon dashicons dashicons-visibility", onClick: () => setOpen(!open) }), /* @__PURE__ */ React.createElement(Catpow.Popover, { open }, /* @__PURE__ */ React.createElement("div", { className: "CheckBox__wrapper" }, Object.keys(cols).map((name) => /* @__PURE__ */ React.createElement(
      Catpow.CheckBox,
      {
        label: cols[name].label,
        selected: !cols[name].hide,
        onChange: (val) => dispatch({ type: (val ? "show" : "hide") + "Column", name })
      }
    )))))));
  };
})();
