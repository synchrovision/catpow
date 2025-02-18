(() => {
  // ../components/Output/component.jsx
  Catpow.Output = (props) => {
    const { conf, value } = props;
    const { createElemnt: el } = wp.element;
    if (!value) return "";
    switch (conf.output_type) {
      case "group":
        return /* @__PURE__ */ wp.element.createElement("ul", { className: "cp-output-group" }, Object.keys(value).map((key) => {
          const row = value[key];
          return /* @__PURE__ */ wp.element.createElement("li", { className: "item", key }, Object.keys(conf.meta).map((name) => /* @__PURE__ */ wp.element.createElement("dl", { key: name }, /* @__PURE__ */ wp.element.createElement("dt", null, conf.meta[name].label), /* @__PURE__ */ wp.element.createElement("dd", null, /* @__PURE__ */ wp.element.createElement(Catpow.Output, { conf: conf.meta[name], value: row[name] })))));
        }));
      case "select":
      case "radio":
      case "checkbox": {
        const labels = (Array.isArray(value) ? value : [value]).filter((val) => !!val).map((val) => conf.dict ? conf.dict[val] : val);
        if (!labels.length) {
          return false;
        }
        return /* @__PURE__ */ wp.element.createElement("ul", { className: "cp-output-labels" }, labels.map((label, index) => /* @__PURE__ */ wp.element.createElement("li", { className: "item", key: index }, label)));
      }
      case "image":
        return /* @__PURE__ */ wp.element.createElement("ul", { className: "cp-output-images" }, /* @__PURE__ */ wp.element.createElement("li", { className: "item" }, props.images.map((image, index) => /* @__PURE__ */ wp.element.createElement("img", { className: "image", src: image.url, key: index }))));
      default:
        return value.join(",");
    }
  };
})();
