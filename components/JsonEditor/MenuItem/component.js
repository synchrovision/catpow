(() => {
  // ../components/JsonEditor/MenuItem/component.jsx
  window.Catpow.JsonEditor.MenuItem = (props) => {
    const { className = "JsonEditor-Input-MenuItem", agent, onChange, onUpdate } = props;
    const { useState, useMemo, useCallback, useEffect } = wp.element;
    const { bem } = Catpow.util;
    const classes = useMemo(() => bem(className), []);
    const { __, sprintf } = wp.i18n;
    const schema = agent.getMergedSchemaForInput();
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement(Catpow.SelectMenuItem, { onChange: onUpdate }));
  };
})();
