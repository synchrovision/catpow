(() => {
  // ../components/Finder/PerPage/component.jsx
  Catpow.Finder.PerPage = (props) => {
    const { useState, useCallback, useContext } = wp.element;
    const { __ } = wp.i18n;
    const { state, dispatch } = useContext(Catpow.FinderContext);
    const onChange = useCallback((e) => {
      const itemsPerPage = Math.max(1, parseInt(e.currentTarget.value));
      dispatch({ type: "setItemsPerPage", itemsPerPage });
    }, [dispatch]);
    return /* @__PURE__ */ React.createElement("div", { className: "FinderControl FinderPerPage" }, /* @__PURE__ */ React.createElement("ul", { className: "items" }, /* @__PURE__ */ React.createElement("li", { className: "item" }, /* @__PURE__ */ React.createElement("div", { className: "inputs" }, /* @__PURE__ */ React.createElement("input", { type: "number", value: state.itemsPerPage, min: "1", max: "1000", onChange }), __("\u4EF6/\u9801", "catpow")))));
  };
})();
