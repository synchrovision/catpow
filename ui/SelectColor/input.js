(() => {
  // ../ui/SelectColor/input.jsx
  Catpow.UI.SelectColor = (props) => {
    const { useState } = wp.element;
    const { name } = props;
    const [value, setValue] = useState(props.value);
    return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(Catpow.SelectColorToneClass, { selected: value, onChange: (proxy) => setValue(proxy.classes.split(" ")) }), /* @__PURE__ */ wp.element.createElement(Catpow.UI.HiddenValues, { name, value }));
  };
})();
