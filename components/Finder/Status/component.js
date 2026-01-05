(() => {
  // ../components/Finder/Status/component.jsx
  Catpow.Finder.Status = (props) => {
    const { useState, useContext } = wp.element;
    const { __, sprintf } = wp.i18n;
    const { state, dispatch } = useContext(Catpow.FinderContext);
    const [open, setOpen] = useState(false);
    const { cols } = state.index;
    return /* @__PURE__ */ wp.element.createElement("div", { className: "FinderControl FinderStatus" }, sprintf(__("%d\u4EF6\u4E2D%d\u4EF6\u8868\u793A", "catpow"), state.items.length, state.itemsInPage.length), state.selectedRows.length > 0 && sprintf(__("%d\u4EF6\u9078\u629E", "catpow"), state.selectedRows.length));
  };
})();
