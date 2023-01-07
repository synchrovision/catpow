(() => {
  // ../components/Finder/Focused/component.jsx
  Catpow.Finder.Focused = (props) => {
    const { useState, useCallback, useContext } = wp.element;
    const { __, sprintf } = wp.i18n;
    const { state, dispatch, info } = useContext(Catpow.FinderContext);
    const { roleGroups } = info;
    const { cols } = state.index;
    const flagsToWords = useCallback((classes) => Object.keys(classes).filter((key) => classes[key]).join(" "), []);
    const hasRoleGroup = useCallback((group) => {
      return !roleGroups[group].every((role) => !state.colsByRole[role] || !state.colsByRole[role].length);
    }, [state.colsByRole, roleGroups]);
    const ucfirst = useCallback((str) => str.charAt(0).toUpperCase() + str.slice(1), []);
    const flags = { FinderFocused: true };
    Object.keys(roleGroups).map((group) => {
      flags["has" + ucfirst(group)] = hasRoleGroup(group);
    });
    return /* @__PURE__ */ React.createElement("div", { className: flagsToWords(flags) }, /* @__PURE__ */ React.createElement("table", { class: "items" }, Object.keys(roleGroups).map((group) => {
      if (!hasRoleGroup(group)) {
        return false;
      }
      return roleGroups[group].map((role) => {
        if (!state.colsByRole[role] || !state.colsByRole[role].length) {
          return false;
        }
        return state.colsByRole[role].map((col) => /* @__PURE__ */ React.createElement("tr", { class: "item" }, /* @__PURE__ */ React.createElement("th", { class: "label" }, col.label), /* @__PURE__ */ React.createElement("td", { class: "value" }, /* @__PURE__ */ React.createElement(Catpow.Output, { conf: col, ...state.focused[col.name] }))));
      });
    })));
  };
})();
