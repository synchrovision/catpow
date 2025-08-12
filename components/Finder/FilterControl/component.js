(() => {
  // ../components/Finder/FilterControl/component.jsx
  Catpow.Finder.FilterControl = (props) => {
    const { useState, useContext } = wp.element;
    const { __ } = wp.i18n;
    const { state, dispatch } = useContext(Catpow.FinderContext);
    const [open, setOpen] = useState(false);
    const { cols } = state.index;
    return /* @__PURE__ */ wp.element.createElement("div", { className: "cp-finder-control cp-finder-filtercontrol" }, /* @__PURE__ */ wp.element.createElement("ul", { className: "items" }, /* @__PURE__ */ wp.element.createElement("li", { className: "item" + (Object.keys(state.query).length ? " active" : "") }, /* @__PURE__ */ wp.element.createElement("div", { className: "icon dashicons dashicons-filter", onClick: () => setOpen(!open) }), /* @__PURE__ */ wp.element.createElement(Catpow.Popover, { open }, /* @__PURE__ */ wp.element.createElement("table", { className: "cp-finder-filtercontrol__table" }, /* @__PURE__ */ wp.element.createElement("tbody", { className: "cp-finder-filtercontrol__table-tbody" }, Object.keys(state.index.cols).map((key) => {
      const col = state.index.cols[key];
      if (col.role === "group") {
        return /* @__PURE__ */ wp.element.createElement("tr", { className: "cp-finder-filtercontrol__table-tbody-tr", key }, /* @__PURE__ */ wp.element.createElement("th", { className: "cp-finder-filtercontrol__table-tbody-tr-th" }, col.label), /* @__PURE__ */ wp.element.createElement("td", { className: "cp-finder-filtercontrol__table-tbody-tr-td" }, Object.keys(col.dict).map((val) => {
          const isActive = state.query[key] && state.query[key].indexOf(val) !== -1;
          return /* @__PURE__ */ wp.element.createElement(Catpow.CheckBox, { label: col.dict[val], selected: isActive, onChange: (selected) => dispatch({ type: (selected ? "add" : "remove") + "Query", key, val }), key: val });
        })));
      }
      return false;
    })))))));
  };
})();
