(() => {
  // ../default/config/template/app/config.json
  var config_default = {
    name: "SampleApp",
    options: [
      { input: "text", label: "Title", key: "title", default: "SampleApp" }
    ],
    deps: ["catpow"]
  };

  // ../default/config/template/app/app/App.jsx
  var { useState, useMemo, useCallback, useReducer, createContext, useEffect } = wp.element;
  var { bem } = Catpow.util;
  var PropsContext = createContext({});
  var StateContext = createContext({});
  var App = (props) => {
    const { className = "cp-app-sample" } = props;
    const classes = bem(className);
    const init = useCallback((state2) => {
      return state2;
    }, []);
    const reducer = useCallback((state2, action) => {
      const { type, ...params } = action;
      switch (action.type) {
        case "INIT": {
          return { ...state2, ...params };
        }
      }
      return state2;
    }, []);
    const [state, dispatch] = useReducer(reducer, {}, init);
    useEffect(() => {
      wp.apiFetch({ path: "/cp/v1/" + props.path }).then((res) => {
        dispatch({ type: "INIT", ...res });
      }).catch(console.error);
    }, []);
    return /* @__PURE__ */ wp.element.createElement(PropsContext.Provider, { value: props }, /* @__PURE__ */ wp.element.createElement(StateContext.Provider, { value: { state, dispatch } }, /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement("div", { className: classes.header() }, props.title), /* @__PURE__ */ wp.element.createElement("div", { className: classes.body() }, /* @__PURE__ */ wp.element.createElement("ul", { className: classes.body.items() }, state.items && state.items.map((item) => {
      return /* @__PURE__ */ wp.element.createElement("li", { className: classes.body.items._item() }, item.title);
    }))), /* @__PURE__ */ wp.element.createElement("div", { className: classes.footer() }))));
  };

  // ../default/config/template/app/app/index.jsx
  window[config_default.name] = App;
})();
