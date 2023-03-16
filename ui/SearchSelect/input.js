(() => {
  // ../ui/SearchSelect/input.jsx
  Catpow.UI.SearchSelect = (props) => {
    const { name, defaultLabel, options, multiple = false } = props;
    const { useState } = wp.element;
    const [value, setValue] = useState(props.value);
    return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(
      Catpow.SearchSelect,
      {
        options,
        value,
        multiple,
        onChange: setValue,
        defaultLabel
      }
    ), /* @__PURE__ */ wp.element.createElement(Catpow.UI.HiddenValues, { name, value }));
  };
})();
