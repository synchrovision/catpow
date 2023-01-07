(() => {
  // ../components/Output/component.jsx
  Catpow.Output = (props) => {
    const { conf, value } = props;
    const { createElemnt: el } = wp.element;
    if (!value)
      return "";
    switch (conf.output_type) {
      case "group":
        return /* @__PURE__ */ React.createElement("ul", { className: "OutputGroup" }, Object.keys(value).map((key) => {
          const row = value[key];
          console.log(conf);
          return /* @__PURE__ */ React.createElement("li", { className: "item", key }, Object.keys(conf.meta).map((name) => /* @__PURE__ */ React.createElement("dl", { key: name }, /* @__PURE__ */ React.createElement("dt", null, conf.meta[name].label), /* @__PURE__ */ React.createElement("dd", null, /* @__PURE__ */ React.createElement(Catpow.Output, { conf: conf.meta[name], value: row[name] })))));
        }));
      case "select":
      case "radio":
      case "checkbox": {
        const labels = (Array.isArray(value) ? value : [value]).filter((val) => !!val).map((val) => conf.dict ? conf.dict[val] : val);
        if (!labels.length) {
          return false;
        }
        return /* @__PURE__ */ React.createElement("ul", { clasName: "OutputLabels" }, labels.map((label) => /* @__PURE__ */ React.createElement("li", { className: "item" }, label)));
      }
      case "image":
        return /* @__PURE__ */ React.createElement("ul", { className: "OutputImages" }, /* @__PURE__ */ React.createElement("li", { className: "item" }, props.images.map((image) => /* @__PURE__ */ React.createElement("img", { className: "image", src: image.url }))));
      default:
        return value.join(",");
    }
  };
})();
