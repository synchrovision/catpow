(() => {
  // ../components/SelectBox/component.jsx
  Catpow.SelectBox = (props) => {
    const { useMemo } = wp.element;
    const { label, value, onChange } = props;
    const options = useMemo(() => {
      if (Array.isArray(props.options)) {
        return props.options.map((option) => {
          if (typeof option === "object") {
            return option;
          }
          return { label: option, value: option };
        });
      }
      return Object.keys(props.options).map((label2) => {
        return { label: label2, value: props.options[label2] };
      });
    }, [props.options]);
    return /* @__PURE__ */ wp.element.createElement("select", { className: "SelectBox", value, onChange: (e) => onChange(event.target.value) }, label && /* @__PURE__ */ wp.element.createElement("option", { value: false }, label), options.map((option) => /* @__PURE__ */ wp.element.createElement("option", { value: option.value, key: option.label }, option.label)));
  };
})();
