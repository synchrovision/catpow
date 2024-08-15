(() => {
  // ../components/JsonEditor/MenuItems/component.jsx
  window.Catpow.JsonEditor.MenuItems = (props) => {
    const { className = "JsonEditor-Input-MenuItems", agent, onChange, onUpdate } = props;
    const { useState, useMemo, useCallback, useEffect } = wp.element;
    const { bem } = Catpow.util;
    const classes = useMemo(() => bem(className), []);
    const { __, sprintf } = wp.i18n;
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement(Catpow.SelectMenuItem, { name: "icon", value: agent.getValue(), onChange: onUpdate }));
  };
})();
