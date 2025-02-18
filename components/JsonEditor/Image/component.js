(() => {
  // ../components/JsonEditor/Image/component.jsx
  window.Catpow.JsonEditor.Image = (props) => {
    const { className = "cp-jsoneditor-input-image", agent, onChange, onUpdate } = props;
    const { useState, useMemo, useCallback, useEffect } = wp.element;
    const { bem } = Catpow.util;
    const classes = useMemo(() => bem(className), []);
    const { __, sprintf } = wp.i18n;
    const onChangeHandle = useCallback((value) => {
      onUpdate(value);
    }, [onUpdate]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement(Catpow.SelectMedia, { src: agent.getValue() && agent.getValue().url, onChange: onChangeHandle }));
  };
})();
