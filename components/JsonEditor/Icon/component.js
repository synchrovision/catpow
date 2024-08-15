(() => {
  // ../components/JsonEditor/Icon/component.jsx
  window.Catpow.JsonEditor.Icon = (props) => {
    const { className = "JsonEditor-Input-Icon", agent, onChange, onUpdate } = props;
    const { useState, useMemo, useCallback, useEffect } = wp.element;
    const { bem } = Catpow.util;
    const classes = useMemo(() => bem(className), []);
    const { __, sprintf } = wp.i18n;
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement(Catpow.SelectPreparedImage, { name: "icon", value: agent.getValue(), onChange: onUpdate }));
  };
})();
