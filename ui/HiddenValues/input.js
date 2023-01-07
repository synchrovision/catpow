(() => {
  // ../ui/HiddenValues/input.jsx
  Catpow.UI.HiddenValues = (props) => {
    const { useCallback } = wp.element;
    const hiddenInput = useCallback((name, val) => {
      if (val instanceof Object) {
        return Object.keys(val).map((k) => hiddenInput(name + "[" + k + "]", val[k]));
      } else {
        return /* @__PURE__ */ React.createElement("input", { type: "hidden", name, value: val });
      }
    }, [props]);
    return /* @__PURE__ */ React.createElement("div", { className: "hiddenValues" }, hiddenInput(props.name, props.value));
  };
})();
