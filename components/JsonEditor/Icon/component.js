(() => {
  // ../components/JsonEditor/Icon/component.jsx
  window.Catpow.JsonEditor.Icon = (props) => {
    const { className = "cp-jsoneditor-input-icon", agent, onUpdate } = props;
    return /* @__PURE__ */ wp.element.createElement("div", { className }, /* @__PURE__ */ wp.element.createElement(Catpow.SelectPreparedImage, { name: "icon", value: agent.getValue(), onChange: onUpdate }));
  };
})();
