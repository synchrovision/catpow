(() => {
  // ../components/JsonEditor/MenuItem/component.jsx
  window.Catpow.JsonEditor.MenuItem = (props) => {
    const { className = "cp-jsoneditor-input-menuitem", onUpdate } = props;
    return /* @__PURE__ */ wp.element.createElement("div", { className }, /* @__PURE__ */ wp.element.createElement(Catpow.SelectMenuItem, { onChange: onUpdate }));
  };
})();
