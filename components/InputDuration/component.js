(() => {
  // ../components/InputDuration/component.jsx
  Catpow.InputDuration = (props) => {
    const { value, onChange } = props;
    const { useState, useMemo, useCallback, useEffect, useReducer } = wp.element;
    const { bem } = Catpow.util;
    const classes = useMemo(() => bem("InputDuration"), []);
    const cols = useMemo(() => {
      return {
        y: { unit: "\u5E74", min: 1, max: 100 },
        m: { unit: "\u6708", min: 1, max: 11 },
        d: { unit: "\u65E5", min: 1, max: 31 },
        h: { unit: "\u6642\u9593", min: 1, max: 23 },
        i: { unit: "\u5206", min: 1, max: 59 },
        s: { unit: "\u79D2", min: 1, max: 59 }
      };
    }, []);
    const init = useCallback((state2) => {
      state2.value = props.value || "";
      return state2;
    }, []);
    const reducer = useCallback((state2, action) => {
      const newState = Object.assign({}, state2, action);
      let value2 = "P";
      if (newState.y) {
        value2 += newState.y + "Y";
      }
      if (newState.m) {
        value2 += newState.m + "M";
      }
      if (newState.d) {
        value2 += newState.d + "D";
      }
      if (newState.h || newState.i || newState.s) {
        value2 += "T";
        if (newState.h) {
          value2 += newState.h + "H";
        }
        if (newState.i) {
          value2 += newState.i + "M";
        }
        if (newState.s) {
          value2 += newState.s + "S";
        }
      }
      newState.value = value2 === "P" ? "" : value2;
      return newState;
    }, []);
    const [state, update] = useReducer(reducer, {}, init);
    useEffect(() => {
      if (state.value || props.value) {
        onChange(state.value);
      }
    }, [onChange, state.value]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, Object.keys(cols).map((key) => {
      return /* @__PURE__ */ wp.element.createElement("div", { className: classes.col("is-col-" + key), key }, /* @__PURE__ */ wp.element.createElement(
        "input",
        {
          type: "number",
          className: classes.col.input("is-input-" + key),
          min: cols[key].min,
          max: cols[key].max,
          onChange: (e) => update({ [key]: e.currentTarget.value })
        }
      ), /* @__PURE__ */ wp.element.createElement("span", { className: classes.col.unit() }, cols[key].unit));
    }));
  };
})();
