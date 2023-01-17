(() => {
  // ui/PhoneNumber/input.jsx
  Catpow.UI.PhoneNumber = (props) => {
    const { useState, useMemo, useRef, useCallback, useReducer } = wp.element;
    const init = useCallback((state2) => {
      const { value } = state2;
      const secs = [];
      return { value, secs: value.split("-"), isComposing: false };
    }, []);
    const reducer = useCallback((state2, action) => {
      switch (action.type) {
        case "SET_SEC": {
          const { i, val } = action;
          if (!val.match(/^\d*$/)) {
            return state2;
          }
          const secs = state2.value.split("-");
          if (val.length === 10) {
            secs[0] = val.substring(0, 2);
            secs[1] = val.substring(2, 6);
            secs[2] = val.substring(6);
          } else if (val.length === 11) {
            secs[0] = val.substring(0, 3);
            secs[1] = val.substring(3, 7);
            secs[2] = val.substring(7);
          } else {
            secs[i] = val;
            if (val.length > 3 && i < 2 || i == 0 && val.match(/^0\d0$/)) {
              if (!state2.isComposing) {
                refs[i + 1].current.focus();
              }
            }
          }
          return { ...state2, secs, value: secs.join("-") };
        }
        case "START_COMPOSE":
          return { ...state2, isComposing: true };
        case "END_COMPOSE":
          return { ...state2, isComposing: false };
      }
      return state2;
    }, []);
    const [state, dispatch] = useReducer(reducer, { value: props.value }, init);
    const Input = useCallback(({ i, refs: refs2, state: state2, dispatch: dispatch2 }) => /* @__PURE__ */ wp.element.createElement(
      "input",
      {
        type: "text",
        className: "sec" + i,
        size: "4",
        autocomplete: ["tel-area-code", "tel-local-prefix", "tel-local-suffix"][i],
        onChange: (e) => {
          const val = e.target.value;
          dispatch2({ type: "SET_SEC", i, val });
        },
        onCompositionStart: (e) => {
          dispatch2({ type: "START_COMPOSE" });
        },
        onCompositionEnd: (e) => {
          const val = e.target.value;
          dispatch2({ type: "SET_SEC", i, val });
          dispatch2({ type: "END_COMPOSE" });
        },
        ref: refs2[i],
        value: state2.secs[i]
      }
    ), []);
    const refs = [useRef({}), useRef({}), useRef({})];
    return /* @__PURE__ */ wp.element.createElement("div", { className: "PhoneNumber" }, /* @__PURE__ */ wp.element.createElement(Input, { i: 0, refs, state, dispatch }), /* @__PURE__ */ wp.element.createElement("span", { className: "sep" }, "-"), /* @__PURE__ */ wp.element.createElement(Input, { i: 1, refs, state, dispatch }), /* @__PURE__ */ wp.element.createElement("span", { className: "sep" }, "-"), /* @__PURE__ */ wp.element.createElement(Input, { i: 2, refs, state, dispatch }), /* @__PURE__ */ wp.element.createElement(
      Catpow.UI.HiddenValues,
      {
        name: props.name,
        value: state.value
      }
    ));
  };
})();
