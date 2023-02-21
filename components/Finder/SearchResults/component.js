(() => {
  // ../components/Finder/SearchResults/component.jsx
  Catpow.Finder.SearchResults = (props) => {
    const { useContext, useCallback, createElement: el, Fragment } = wp.element;
    const { __ } = wp.i18n;
    const { state, dispatch, info } = useContext(Catpow.FinderContext);
    const { roleGroups } = info;
    const flagsToWords = useCallback((classes) => Object.keys(classes).filter((key) => classes[key]).join(" "), []);
    const hasRoleGroup = useCallback((group) => {
      return !roleGroups[group].every((role) => !state.colsToShowByRole[role] || !state.colsToShowByRole[role].length);
    }, [state.colsToShowByRole, roleGroups]);
    const ucfirst = useCallback((str) => str.charAt(0).toUpperCase() + str.slice(1), []);
    const ListView = props.listView || useCallback(({ state: state2, info: info2 }) => {
      const { colsToShowByRole } = state2;
      const flags = { list: true };
      Object.keys(info2.roleGroups).map((group) => {
        flags["has" + ucfirst(group)] = hasRoleGroup(group);
      });
      return /* @__PURE__ */ wp.element.createElement("ul", { className: flagsToWords(flags) }, state2.itemsInPage.map((row) => {
        return /* @__PURE__ */ wp.element.createElement("li", { className: "item" + (row._selected ? " selected" : ""), key: "row" + row._id }, /* @__PURE__ */ wp.element.createElement("div", { className: "contents" }, /* @__PURE__ */ wp.element.createElement("div", { className: "control" }, /* @__PURE__ */ wp.element.createElement(Catpow.CheckBox, { selected: row._selected, onChange: (selected) => dispatch({ type: selected ? "selectRow" : "deselectRow", row }) })), flags.hasImages && /* @__PURE__ */ wp.element.createElement("div", { className: "images" }, roleGroups.images.map((role) => {
          if (!colsToShowByRole[role] || !colsToShowByRole[role].length) {
            return false;
          }
          return colsToShowByRole[role].map((col) => /* @__PURE__ */ wp.element.createElement(Catpow.Output, { conf: col, ...row[col.name], key: col.name }));
        })), /* @__PURE__ */ wp.element.createElement("div", { className: "texts" }, Object.keys(roleGroups).map((group) => {
          if (!hasRoleGroup(group) || group === "images") {
            return false;
          }
          return /* @__PURE__ */ wp.element.createElement("div", { className: group, key: group }, roleGroups[group].map((role) => {
            if (!colsToShowByRole[role] || !colsToShowByRole[role].length) {
              return false;
            }
            return colsToShowByRole[role].map((col) => /* @__PURE__ */ wp.element.createElement(Catpow.Output, { conf: col, ...row[col.name], key: col.name }));
          }));
        }), /* @__PURE__ */ wp.element.createElement("div", { className: "focus", onClick: () => dispatch({ type: "focusItem", row }) }, __("\u8A73\u7D30\u3092\u898B\u308B", "catpow")))));
      }), [...Array(10).keys()].map((i) => /* @__PURE__ */ wp.element.createElement("li", { className: "spacer", key: "spacer" + i })));
    }, []);
    const TableView = props.tableView || useCallback(({ state: state2 }) => {
      return /* @__PURE__ */ wp.element.createElement("table", { className: "table" }, /* @__PURE__ */ wp.element.createElement("thead", { className: "header" }, /* @__PURE__ */ wp.element.createElement("tr", { className: "row" }, /* @__PURE__ */ wp.element.createElement("th", { className: "control" }, /* @__PURE__ */ wp.element.createElement(
        Catpow.CheckBox,
        {
          selected: state2.itemsInPage.every((item) => item._selected),
          onChange: (selected) => dispatch({ type: selected ? "selectAllRowsInPage" : "deselectAllRowsInPage" })
        }
      )), /* @__PURE__ */ wp.element.createElement("th", { className: "focus" }), state2.colsToShow.map((col) => /* @__PURE__ */ wp.element.createElement("th", { className: "cell", key: col.name }, col.label, /* @__PURE__ */ wp.element.createElement("span", { className: "sort sort-" + (state2.sort[col.name] || "none"), onClick: () => {
        dispatch({ type: "switchSort", key: col.name });
      } }))))), /* @__PURE__ */ wp.element.createElement("tbody", { className: "body" }, state2.itemsInPage.map((row) => /* @__PURE__ */ wp.element.createElement("tr", { className: "row" + (row._selected ? " selected" : ""), key: row._id }, /* @__PURE__ */ wp.element.createElement("th", { className: "control" }, /* @__PURE__ */ wp.element.createElement(Catpow.CheckBox, { selected: row._selected, onChange: (selected) => dispatch({ type: selected ? "selectRow" : "deselectRow", row }) })), /* @__PURE__ */ wp.element.createElement("th", { className: "focus" }, /* @__PURE__ */ wp.element.createElement("div", { className: "icon dashicons dashicons-admin-page", onClick: () => dispatch({ type: "focusItem", row }) })), state2.colsToShow.map((col) => /* @__PURE__ */ wp.element.createElement("td", { className: "cell", key: col.name }, /* @__PURE__ */ wp.element.createElement(Catpow.Output, { conf: col, ...row[col.name] })))))));
    }, [props]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: "FinderSearchResults" }, /* @__PURE__ */ wp.element.createElement(Catpow.Transition, { type: state.transition }, state.items.length > 0 ? /* @__PURE__ */ wp.element.createElement("div", { className: "FinderSearchResultsItems " + state.layout + "-view", depth: 1, page: state.page, view: state.layout }, el(state.layout === "table" ? TableView : ListView, { state, dispatch, info })) : /* @__PURE__ */ wp.element.createElement("div", { className: "message", depth: 1, page: 1, view: "message" }, __("\u691C\u7D22\u7D50\u679C\u306A\u3057", "catpow"))));
  };
})();
