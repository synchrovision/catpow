(() => {
  // ../components/JsonEditor/MenuItems/component.jsx
  window.Catpow.JsonEditor.MenuItems = (props) => {
    const { className = "cp-jsoneditor-input-menuitems", agent, onUpdate } = props;
    return /* @__PURE__ */ wp.element.createElement("div", { className }, /* @__PURE__ */ wp.element.createElement(Catpow.SelectMenuItem, { name: "icon", value: agent.getValue(), onChange: onUpdate }));
  };
})();
