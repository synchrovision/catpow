(() => {
  // ../components/Finder/FilterControl/component.jsx
  Catpow.Finder.FilterControl = (props) => {
    const { useState, useContext } = wp.element;
    const { __ } = wp.i18n;
    const { state, dispatch } = useContext(Catpow.FinderContext);
    const [open, setOpen] = useState(false);
    const { cols } = state.index;
    return /* @__PURE__ */ React.createElement("div", { className: "FinderControl FinderFilterControl" }, /* @__PURE__ */ React.createElement("ul", { className: "items" }, /* @__PURE__ */ React.createElement("li", { className: "item" + (Object.keys(state.query).length ? " active" : "") }, /* @__PURE__ */ React.createElement("div", { className: "icon dashicons dashicons-filter", onClick: () => setOpen(!open) }), /* @__PURE__ */ React.createElement(Catpow.Popover, { open }, /* @__PURE__ */ React.createElement("table", { className: "FinderFilterControl__table" }, Object.keys(state.index.cols).map((key) => {
      const col = state.index.cols[key];
      if (col.role === "group") {
        return /* @__PURE__ */ React.createElement("tr", { className: "row" }, /* @__PURE__ */ React.createElement("th", { className: "label" }, col.label), /* @__PURE__ */ React.createElement("td", { className: "inputs" }, Object.keys(col.dict).map((val) => {
          const isActive = state.query[key] && state.query[key].indexOf(val) !== -1;
          return /* @__PURE__ */ React.createElement(
            Catpow.CheckBox,
            {
              label: col.dict[val],
              selected: isActive,
              onChange: (selected) => dispatch({ type: (selected ? "add" : "remove") + "Query", key, val })
            }
          );
        })));
      }
      return false;
    }))))));
  };
})();
