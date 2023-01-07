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
    return /* @__PURE__ */ React.createElement("div", { className: "FinderControl FinderSelectLayout" }, /* @__PURE__ */ React.createElement("ul", { className: "items" }, selections.map((sel) => {
      return /* @__PURE__ */ React.createElement(
        "li",
        {
          className: "item" + (state.layout === sel.value ? " active" : ""),
          onClick: () => {
            dispatch({ type: "setLayout", layout: sel.value });
          }
        },
        /* @__PURE__ */ React.createElement("div", { class: "icon dashicons dashicons-" + sel.icon })
      );
    })));
  };
})();
