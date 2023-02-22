// ../default/config/template/manage/app.mjs.jsx
var app_mjs_default = (props) => {
  const { useCallback } = wp.element;
  const App = useCallback((props2) => {
    const { useContext, useCallback: useCallback2, Fragment } = wp.element;
    const { Nav, Spacer, Main, SelectLayout, SelectColumns, BulkControl, FilterControl, Download, PerPage, Status, SearchResults, Focused, Pagenate } = Catpow.Finder;
    const { state, dispatch, info } = useContext(Catpow.FinderContext);
    const Phase = useCallback2((props3) => props3.children, []);
    return /* @__PURE__ */ wp.element.createElement(Catpow.Transition, null, state.wait ? /* @__PURE__ */ wp.element.createElement(Phase, { depth: 0 }, /* @__PURE__ */ wp.element.createElement(Catpow.Spinner, null)) : state.focused ? /* @__PURE__ */ wp.element.createElement(Phase, { depth: 2 }, /* @__PURE__ */ wp.element.createElement("div", { className: "icon dashicons dashicons-arrow-left-alt", onClick: () => dispatch({ type: "blurItem" }) }), /* @__PURE__ */ wp.element.createElement(Focused, null)) : /* @__PURE__ */ wp.element.createElement(Phase, { depth: 1 }, /* @__PURE__ */ wp.element.createElement(Nav, null, /* @__PURE__ */ wp.element.createElement(BulkControl, null), /* @__PURE__ */ wp.element.createElement(SelectLayout, null), /* @__PURE__ */ wp.element.createElement(SelectColumns, null), /* @__PURE__ */ wp.element.createElement(FilterControl, null), /* @__PURE__ */ wp.element.createElement(Download, null), /* @__PURE__ */ wp.element.createElement(Spacer, null), /* @__PURE__ */ wp.element.createElement(PerPage, null), /* @__PURE__ */ wp.element.createElement(Status, null)), /* @__PURE__ */ wp.element.createElement(Main, null, /* @__PURE__ */ wp.element.createElement(SearchResults, null)), /* @__PURE__ */ wp.element.createElement(Pagenate, null)));
  }, []);
  return /* @__PURE__ */ wp.element.createElement(Catpow.Finder, { ...props }, /* @__PURE__ */ wp.element.createElement(App, null));
};
export {
  app_mjs_default as default
};
