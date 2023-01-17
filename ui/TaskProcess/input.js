(() => {
  // ui/TaskProcess/input.jsx
  Catpow.UI.TaskProcess = (props) => {
    const { Fragment, useCallback, useMemo, useState, useReducer } = wp.element;
    const { RadioButtons, CheckBoxes, CheckBox, SelectNumber } = Catpow;
    const { __ } = wp.i18n;
    const files = props.files || [null];
    const reducer = useCallback((state2, action) => {
      switch (action.type) {
        case "SAVE": {
          return { ...state2 };
        }
      }
      return state2;
    }, []);
    const [state, dispatch] = useReducer(reducer, {
      value: props.value || {}
    });
    const save = useCallback((key, value, result) => {
      dispatch({ type: "SAVE" });
    }, [dispatch]);
    const processOptions = useMemo(() => {
      return {
        [__("\u30BB\u30FC\u30D6")]: "save",
        [__("\u30ED\u30FC\u30C9")]: "load",
        [__("\u63A5\u7D9A\u627F\u8A8D")]: "check",
        [__("\u63A5\u7D9A\u627F\u8A8D\u78BA\u8A8D")]: "is_checked",
        [__("\u30BF\u30B9\u30AF\u5B8C\u4E86")]: "complete",
        [__("\u30BF\u30B9\u30AF\u5B8C\u4E86\u78BA\u8A8D")]: "is_completed"
      };
    }, []);
    return /* @__PURE__ */ wp.element.createElement("div", { className: "TaskProcess" }, files.map((file) => /* @__PURE__ */ wp.element.createElement("div", { className: "TaskProcess__content" }, /* @__PURE__ */ wp.element.createElement(CheckBoxes, { options: processOptions, value: state.value, onChange: save }), /* @__PURE__ */ wp.element.createElement(CheckBox, { label: __("\u30BF\u30B9\u30AF\u767A\u884C"), selected: state.value.create, onChange: (value) => {
      state.value.create = value ? {} : false;
      save();
    } }), state.value.create && /* @__PURE__ */ wp.element.createElement("dl", { className: "inputs" }, /* @__PURE__ */ wp.element.createElement("dt", { className: "label" }, __("\u30A2\u30AF\u30B7\u30E7\u30F3")), /* @__PURE__ */ wp.element.createElement("dd", { className: "input" }, /* @__PURE__ */ wp.element.createElement("input", { type: "text", value: state.value.create.action, onChange: (e) => {
      state.value.create.action = e.target.value;
      save();
    } })), /* @__PURE__ */ wp.element.createElement("dt", { className: "label" }, __("\u6709\u52B9\u671F\u9650")), /* @__PURE__ */ wp.element.createElement("dd", { className: "input" }, /* @__PURE__ */ wp.element.createElement("input", { type: "text", value: state.value.create.expire, onChange: (e) => {
      state.value.create.expire = e.target.value;
      save();
    } })), /* @__PURE__ */ wp.element.createElement("dt", { className: "label" }, __("\u6709\u52B9\u56DE\u6570")), /* @__PURE__ */ wp.element.createElement("dd", { className: "input" }, /* @__PURE__ */ wp.element.createElement("input", { type: "number", value: state.value.create.limit, onChange: (e) => {
      state.value.create.limit = e.target.value;
      save();
    } }))), /* @__PURE__ */ wp.element.createElement(Catpow.UI.HiddenValues, { name: props.name, value: state.value }))));
  };
})();
