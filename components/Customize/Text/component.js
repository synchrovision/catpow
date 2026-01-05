(() => {
  // ../components/Customize/Text/component.jsx
  Catpow.Customize.Text = (props) => {
    const { useState, useCallback, useMemo, useEffect, useRef, useReducer } = wp.element;
    const { value, onChange, param } = props;
    return /* @__PURE__ */ wp.element.createElement(
      "input",
      {
        type: param.type || "text",
        value,
        onChange: (e) => {
          onChange(e.currentTarget.value);
        }
      }
    );
  };
})();
