(() => {
  // ../ui/HiddenValues/input.jsx
  Catpow.UI.HiddenValues = (props) => {
    const { useCallback } = wp.element;
    const hiddenInput = useCallback((name, val) => {
      if (val instanceof Object) {
        return Object.keys(val).map((k) => hiddenInput(name + "[" + k + "]", val[k]));
      } else {
        return /* @__PURE__ */ wp.element.createElement("input", { type: "hidden", name, value: val, key: name });
      }
    }, [props]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: "cpui-hiddenvalues", style: { display: "none" } }, hiddenInput(props.name, props.value));
  };
})();
