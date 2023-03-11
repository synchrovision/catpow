(() => {
  // ../ui/SelectPreparedImage/input.jsx
  Catpow.UI.SelectPreparedImage = (props) => {
    const { setURLparams } = Catpow.util;
    const { useState, useMemo, useEffect } = wp.element;
    const { name, color = "i", valueKey = "url" } = props;
    const [value, setValue] = useState(props.value);
    const [images, setImages] = useState([]);
    const { bem } = Catpow.util;
    const classes = bem("SelectPreparedImage");
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
      wp.apiFetch({ path: "cp/v1/images/" + props.type }).then(setImages);
    }, [setImages]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement("div", { className: classes.icon() }, /* @__PURE__ */ wp.element.createElement(
      "img",
      {
        className: classes.icon.img(),
        src: value,
        alt: "Selected Image",
        onClick: () => setIsOpen(!isOpen)
      }
    )), /* @__PURE__ */ wp.element.createElement(Catpow.Popover, { open: isOpen, onClose: () => setIsOpen(false) }, /* @__PURE__ */ wp.element.createElement("div", { className: classes.list() }, images.map((image) => {
      const url = setURLparams(image.url, { c: color });
      const thisValue = valueKey === "url" ? url : image[valueKey];
      return /* @__PURE__ */ wp.element.createElement("div", { className: classes.list.item({ "is-active": value == thisValue }), key: thisValue }, /* @__PURE__ */ wp.element.createElement(
        "img",
        {
          className: classes.list.item.img(),
          src: url,
          alt: image.alt,
          onClick: () => {
            setValue(thisValue);
          }
        }
      ));
    }))), /* @__PURE__ */ wp.element.createElement(Catpow.UI.HiddenValues, { name, value }));
  };
})();
