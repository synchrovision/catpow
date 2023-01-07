(() => {
  // ../ui/SelectPreparedImage/input.jsx
  Catpow.UI.SelectPreparedImage = (props) => {
    const { setURLparams } = Catpow.util;
    const { useState, useEffect } = wp.element;
    const { name, color = "i", valueKey = "url" } = props;
    const [value, setValue] = useState(props.value);
    const [images, setImages] = useState([]);
    useEffect(() => {
      wp.apiFetch({ path: "cp/v1/images/" + props.type }).then(setImages);
    }, [setImages]);
    return /* @__PURE__ */ React.createElement("div", { className: "SelectPreparedImage" }, /* @__PURE__ */ React.createElement("ul", null, images.map((image) => {
      const url = setURLparams(image.url, { c: color, theme: cp.theme });
      const thisValue = valueKey === "url" ? url : image[valueKey];
      return /* @__PURE__ */ React.createElement("li", { className: "item " + (value == thisValue ? "active" : ""), key: thisValue }, /* @__PURE__ */ React.createElement(
        "img",
        {
          src: url,
          alt: image.alt,
          onClick: () => {
            setValue(thisValue);
          }
        }
      ));
    })), /* @__PURE__ */ React.createElement(Catpow.UI.HiddenValues, { name, value }));
  };
})();
