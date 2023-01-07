(() => {
  // ../components/SelectBox/component.jsx
  Catpow.SelectBox = (props) => {
    const { label, value, options, onChange } = props;
    return /* @__PURE__ */ React.createElement("select", { className: "SelectBox", value, onChange: (e) => onChange(event.target.value) }, label && /* @__PURE__ */ React.createElement("option", { value: false }, label), typeof options === "object" && (Array.isArray(options) ? options.map((val) => /* @__PURE__ */ React.createElement("option", { value: val }, val)) : Object.keys(options).map((label2) => /* @__PURE__ */ React.createElement("option", { value: options[label2] }, label2))));
  };
})();
