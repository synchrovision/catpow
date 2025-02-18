(() => {
  // ../components/Finder/SelectLayout/component.jsx
  Catpow.Finder.SelectLayout = (props) => {
    const { useContext } = wp.element;
    const { state, dispatch } = useContext(Catpow.FinderContext);
    const selections = [
      { value: "list", icon: "excerpt-view" },
      { value: "grid", icon: "grid-view" },
      { value: "table", icon: "list-view" }
    ];
    return /* @__PURE__ */ wp.element.createElement("div", { className: "cp-finder-control cp-finder-selectlayout" }, /* @__PURE__ */ wp.element.createElement("ul", { className: "items" }, selections.map((sel) => {
      return /* @__PURE__ */ wp.element.createElement(
        "li",
        {
          className: "item" + (state.layout === sel.value ? " active" : ""),
          onClick: () => {
            dispatch({ type: "setLayout", layout: sel.value });
          },
          key: sel.value
        },
        /* @__PURE__ */ wp.element.createElement("div", { className: "icon dashicons dashicons-" + sel.icon })
      );
    })));
  };
})();
