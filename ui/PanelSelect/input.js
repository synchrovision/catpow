(() => {
  // ui/PanelSelect/input.jsx
  Catpow.UI.PanelSelect = (props) => {
    var classes = "PanelSelect";
    const { useState } = wp.element;
    const [value, setValue] = useState(props.value);
    const limit = props.limit || false;
    return /* @__PURE__ */ wp.element.createElement("div", { className: "PanelSelect" }, /* @__PURE__ */ wp.element.createElement("ul", { className: "items" }, props.items.map((item) => {
      const isActive = value.indexOf(item.value) > 0;
    })), /* @__PURE__ */ wp.element.createElement(Catpow.UI.HiddenValues, { name: props.name, value }));
  };
})();
