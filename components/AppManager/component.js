(() => {
  // ../components/AppManager/component.jsx
  Catpow.AppManagerContext = wp.element.createContext({});
  Catpow.AppManager = (props) => {
    const { children } = props;
    const { Fragment, useCallback, useReducer } = wp.element;
    const reducer = useCallback((state2, action) => {
      switch (action.type) {
        case "update":
          return { ...state2, ...action.data || {} };
        case "setOuterContents": {
          const { name, children: children2 } = action;
          return { ...state2, outerContents: { ...state2.outerContents, [name]: children2 } };
        }
      }
    }, []);
    const [state, dispatch] = useReducer(reducer, { outerContents: false });
    return /* @__PURE__ */ React.createElement(Fragment, null, /* @__PURE__ */ React.createElement(Catpow.AppManagerContext.Provider, { value: { state, dispatch } }, children), Object.keys(state.outerContents).map((name) => state.outerContents[name]));
  };
  Catpow.OuterContents = (props) => {
    const { name, children } = props;
    const { useCallback, useContext, useEffect } = wp.element;
    const { state, dispatch } = useContext(Catpow.AppManagerContext);
    useEffect(() => {
      dispatch({ type: "setOuterContents", name, children });
    }, [name, children]);
    return false;
  };
})();
