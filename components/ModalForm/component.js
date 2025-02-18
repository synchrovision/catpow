(() => {
  // ../components/ModalForm/component.jsx
  Catpow.ModalFormContext = wp.element.createContext({});
  Catpow.ModalForm = (props) => {
    const { useCallback, useReducer } = wp.element;
    const { className, children, onComplete } = props;
    const reducer = useCallback((state2, action) => {
      switch (action.type) {
        case "update":
          return { ...state2, ...action.data || {} };
        case "setValue": {
          const values = { ...state2.values, [action.name]: action.value };
          return { ...state2, values };
        }
        case "complete": {
          const values = { ...state2.values, [action.name]: action.value };
          return { ...state2, values, open: false };
        }
      }
    }, []);
    const [state, dispatch] = useReducer(reducer, { open: true, values: {} });
    return /* @__PURE__ */ wp.element.createElement(Catpow.Popup, { open: state.open, closeOnClickAway: false, onClosed: () => onComplete(state.values) }, /* @__PURE__ */ wp.element.createElement(Catpow.ModalFormContext.Provider, { value: { state, dispatch } }, /* @__PURE__ */ wp.element.createElement("div", { className: "cp-modalform" }, children)));
  };
  Catpow.ModalForm.Input = (props) => {
    const { useCallback, useContext } = wp.element;
    const { type = "CheckBox", name = "accept", children, ...otherProps } = props;
    const { state, dispatch } = useContext(Catpow.ModalFormContext);
    const InputComponent = Catpow[type];
    const onChange = props.onChange || useCallback(({ state: state2, dispatch: dispatch2, name: name2, value }) => {
      dispatch2({ type: "setValue", name: name2, value });
    });
    return /* @__PURE__ */ wp.element.createElement(InputComponent, { value: state.values[name], onChange: (value) => onChange({ state, dispatch, name, value }), ...otherProps }, children);
  };
  Catpow.ModalForm.Button = (props) => {
    const { __ } = wp.i18n;
    const { useCallback, useContext } = wp.element;
    const { className = "button", name = "", value = "", label = __("\u9001\u4FE1", "catpow") } = props;
    const { state, dispatch } = useContext(Catpow.ModalFormContext);
    const onClick = props.onClick || useCallback(({ state: state2, dispatch: dispatch2, name: name2, value: value2 }) => {
      dispatch2({ type: "complete", name: name2, value: value2 });
    });
    return /* @__PURE__ */ wp.element.createElement(Catpow.Button, { className, onClick: () => {
      onClick({ state, dispatch, name, value });
    }, label });
  };
})();
