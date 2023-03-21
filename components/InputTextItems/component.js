(() => {
  // ../components/InputTextItems/component.jsx
  Catpow.InputTextItems = (props) => {
    const { className = "InputTextItems", value, onChange } = props;
    const { useState, useMemo, useCallback, useEffect, useReducer } = wp.element;
    const { bem } = Catpow.util;
    const classes = bem(className);
    const [isComposing, setIsComposing] = useState(false);
    const [ref, setRef] = useState(false);
    const reducer = useCallback((state2, action) => {
      switch (action.type) {
        case "INPUT": {
          const chunks = action.input.split(",");
          if (chunks.length > 1) {
            const input = chunks.pop();
            const items = state2.items.concat(chunks);
            return { ...state2, items, input };
          }
          return { ...state2, input: action.input };
        }
        case "ENTER": {
          console.log("ENTER");
          if (state2.isComposing) {
            return state2;
          }
          const chunks = state2.input.split(",").filter((chunk) => chunk);
          const items = state2.items.concat(chunks);
          return { ...state2, input: "", items };
        }
        case "REMOVE": {
          const items = state2.items.filter((item) => item !== action.item);
          return { ...state2, items };
        }
        case "START_COMPOSE": {
          console.log("START_COMPOSE");
          return { ...state2, isComposing: true };
        }
        case "END_COMPOSE": {
          console.log("END_COMPOSE");
          return { ...state2, isComposing: false };
        }
      }
    }, []);
    const [state, dispatch] = useReducer(reducer, { items: props.items || [], input: "", isComposing: false });
    useEffect(() => {
      if (ref) {
        const cb = (e) => e.code === "Enter" && dispatch({ type: "ENTER" });
        ref.addEventListener("keydown", cb, true);
        return () => ref.removeEventListener("keydown", cb, true);
      }
      ;
    }, [ref, dispatch]);
    useEffect(() => {
      onChange(state.items);
    }, [state.items]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, state.items.map((item, index) => /* @__PURE__ */ wp.element.createElement("span", { className: classes.item(), key: index }, /* @__PURE__ */ wp.element.createElement("span", { className: classes.item.text() }, item), /* @__PURE__ */ wp.element.createElement("span", { className: classes.item.remove(), onClick: (e) => dispatch({ type: "REMOVE", item }) }, "\xD7"))), /* @__PURE__ */ wp.element.createElement(
      "input",
      {
        type: "text",
        className: classes.input(),
        value: state.input,
        onChange: (e) => dispatch({ type: "INPUT", input: e.target.value }),
        onBlur: (e) => dispatch({ type: "ENTER" }),
        onCompositionStart: (e) => dispatch({ type: "START_COMPOSE" }),
        onCompositionEnd: (e) => setTimeout(() => dispatch({ type: "END_COMPOSE" }), 100),
        ref: setRef
      }
    ));
  };
})();
