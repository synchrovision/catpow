(() => {
  // ../ui/PanelSelect/input.jsx
  Catpow.UI.PanelSelect = (props) => {
    var classes = "PanelSelect";
    const { useState } = wp.element;
    const [value, setValue] = useState(props.value);
    const limit = props.limit || false;
    return /* @__PURE__ */ React.createElement("div", { className: "PanelSelect" }, /* @__PURE__ */ React.createElement("ul", { class: "items" }, props.items.map((item) => {
      const isActive = value.indexOf(item.value) > 0;
    })), /* @__PURE__ */ React.createElement(Catpow.UI.HiddenValues, { name: props.name, value }));
  };
})();
