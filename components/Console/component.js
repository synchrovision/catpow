(() => {
  // components/Console/component.jsx
  Catpow.Console = (props) => {
    const { className = "cp-console", path } = props;
    const el = wp.element.createElement;
    const { useState, useCallback, useEffect, useRef, useMemo, useReducer } = wp.element;
    const ControlItem = useCallback((props2) => {
      const { state: state2, dispatch: dispatch2 } = props2;
      const { SelectBox, CheckBoxes, RadioButtons, Buttons, Button, ModalForm } = Catpow;
      const { name, type, label, desc } = props2;
      const inputTypes = useMemo(() => ({
        text: (props3) => /* @__PURE__ */ wp.element.createElement("input", { type: "text", onChange: (e) => {
          dispatch2({ type: "setData", name, value: e.currentTarget.value });
        }, value: state2.data[name] }),
        select: (props3) => /* @__PURE__ */ wp.element.createElement(SelectBox, { onChange: (value) => {
          dispatch2({ type: "setData", name, value });
        }, options: props3.options, value: state2.data[name] }),
        checkbox: (props3) => /* @__PURE__ */ wp.element.createElement(CheckBoxes, { onChange: (value) => {
          dispatch2({ type: "setData", name, value });
        }, options: props3.options, value: state2.data[name] }),
        radio: (props3) => /* @__PURE__ */ wp.element.createElement(RadioButtons, { onChange: (value) => {
          dispatch2({ type: "setData", name, value });
        }, options: props3.options, value: state2.data[name] }),
        submit: (props3) => /* @__PURE__ */ wp.element.createElement(Buttons, { onClick: (action) => {
          submit(action, state2.data);
        }, options: props3.options })
      }), []);
      return /* @__PURE__ */ wp.element.createElement("div", { className: className + "-controls-item" }, label && /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, label), desc && /* @__PURE__ */ wp.element.createElement("div", { className: "desc" }, desc), /* @__PURE__ */ wp.element.createElement("div", { className: "body" }, el(inputTypes[type], props2)));
    }, [className]);
    const ResultItem = useCallback((props2) => {
      const { type = "log", text } = props2;
      const resultTypes = useMemo(() => ({
        success: (props3) => /* @__PURE__ */ wp.element.createElement("div", { className: "text -success" }, props3.text),
        error: (props3) => /* @__PURE__ */ wp.element.createElement("div", { className: "text -error" }, props3.text),
        warn: (props3) => /* @__PURE__ */ wp.element.createElement("div", { className: "text -warn" }, props3.text),
        notice: (props3) => /* @__PURE__ */ wp.element.createElement("div", { className: "text -notice" }, props3.text),
        log: (props3) => /* @__PURE__ */ wp.element.createElement("div", { className: "text -log" }, props3.text)
      }), []);
      return el(resultTypes[type], props2);
    }, []);
    const reducer = useCallback((state2, action) => {
      switch (action.type) {
        case "setData": {
          state2.data[action.name] = action.value;
          return { ...state2 };
        }
        case "setResults": {
          state2.results = action.results;
          return { ...state2 };
        }
      }
      return state2;
    }, []);
    const [state, dispatch] = useReducer(reducer, {
      data: {},
      results: []
    });
    const submit = useCallback((action, data) => {
      wp.apiFetch({ path: `/cp/v1/${path}/${action}`, method: "POST", data }).then((res) => {
        const { results, resubmit = false } = res;
        dispatch({ type: "setResults", results });
        if (resubmit) {
          submit(action, resubmit);
        }
      }).catch((e) => {
        dispatch({ type: "setResults", results: [{ type: "error", text: e.message }] });
      });
    }, []);
    const flagsToWords = useCallback((flags) => {
      if (void 0 === flags) {
        return "";
      }
      return Object.keys(flags).filter((word) => flags[word]).join(" ");
    }, []);
    return /* @__PURE__ */ wp.element.createElement("div", { className }, /* @__PURE__ */ wp.element.createElement("div", { className: className + "-controls" }, props.controls.map((itemProps) => el(ControlItem, { ...itemProps, state, dispatch }))), /* @__PURE__ */ wp.element.createElement("div", { className: className + "-results" }, state.results.map((itemProps) => el(ResultItem, itemProps))));
  };
})();
