(() => {
  // ui/ZipCode/input.jsx
  Catpow.UI.ZipCode = (props) => {
    const { useState, useCallback, useReducer, useMemo, useEffect, useRef } = wp.element;
    const [isComposing, setIsComposing] = useState(false);
    const ref0 = useRef(), ref1 = useRef();
    const refs = useMemo(() => [ref0, ref1], [ref0, ref1]);
    const reducer = useCallback((state2, action) => {
      const secs = [...state2.secs];
      if (!action.value.match(/^\d+$/)) {
        action.value = "";
      }
      if (action.value.length === 7) {
        secs[0] = action.value.substring(0, 3);
        secs[1] = action.value.substring(3);
      } else {
        secs[action.index] = action.value;
      }
      return { value: secs.join("-"), secs };
    }, []);
    const [state, update] = useReducer(reducer, {
      value: props.value,
      secs: props.value.split("-").slice(0, 2)
    });
    useEffect(() => {
      if ("AjaxZip3" in window) {
        AjaxZip3.zip2addr(ref0.current, ref1.current, props.pref, props.addr);
      }
    }, [state.value]);
    useEffect(() => {
      if (state.secs[0].length > 2 && !isComposing) {
        ref1.current.focus();
      }
    }, [state.secs[0].length, isComposing]);
    const Input = useCallback((props2) => {
      const { index, value } = props2;
      return /* @__PURE__ */ wp.element.createElement(
        "input",
        {
          type: "text",
          size: ["3", "4"][index],
          className: "sec" + index,
          onChange: (e) => {
            update({ index, value: e.target.value });
          },
          onCompositionStart: (e) => {
            setIsComposing(true);
          },
          onCompositionEnd: (e) => {
            setIsComposing(false);
            update({ index, value: e.target.value });
          },
          ref: refs[index],
          value
        }
      );
    }, [update, refs]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: "ZipCode" }, /* @__PURE__ */ wp.element.createElement(Input, { index: 0, value: state.secs[0] }), /* @__PURE__ */ wp.element.createElement("span", { class: "sep" }, "-"), /* @__PURE__ */ wp.element.createElement(Input, { index: 1, value: state.secs[1] }), /* @__PURE__ */ wp.element.createElement(
      Catpow.UI.HiddenValues,
      {
        name: props.name,
        value: state.value
      }
    ));
  };
})();
