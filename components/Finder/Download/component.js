(() => {
  // ../components/Finder/Download/component.jsx
  Catpow.Finder.Download = (props) => {
    const { useContext, useCallback } = wp.element;
    const { state, dispatch } = useContext(Catpow.FinderContext);
    const { action = "download" } = props;
    const download = useCallback(() => {
      const selectedItems = state.itemsInPage.filter((item) => item._selected);
      const items = selectedItems.length ? selectedItems : state.items;
      const rows = items.map((item) => item._id);
      console.log(rows);
      wp.apiFetch({
        path: state.apiPath + "/" + action,
        method: "POST",
        data: { rows }
      }).then((res) => {
        Catpow.util.download(res.data, res.name || state.name + ".csv", "text/csv");
      });
    }, [state.items, state.itemsInPage, dispatch]);
    return /* @__PURE__ */ React.createElement("div", { className: "FinderControl FinderDownload" }, /* @__PURE__ */ React.createElement("ul", { className: "items" }, /* @__PURE__ */ React.createElement("li", { className: "item", onClick: download }, /* @__PURE__ */ React.createElement("div", { class: "icon dashicons dashicons-download" }))));
  };
})();
