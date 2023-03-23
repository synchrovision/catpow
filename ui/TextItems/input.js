(() => {
  // ../ui/InputTextItems/input.jsx
  Catpow.UI.TextItems = (props) => {
    const { name, defaultLabel, options, multiple = false } = props;
    const { useState } = wp.element;
    const [value, setValue] = useState(props.value);
    return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(
      Catpow.InputTextItems,
      {
        items: value,
        onChange: setValue
      }
    ), /* @__PURE__ */ wp.element.createElement(Catpow.UI.HiddenValues, { name, value }));
  };
})();
