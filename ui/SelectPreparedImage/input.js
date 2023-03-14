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
    const [search, setSearch] = useState("");
    useEffect(() => {
      wp.apiFetch({ path: "cp/v1/images/" + props.type }).then(setImages);
    }, [setImages]);
    const filteredImages = useMemo(() => images.filter((image) => !search || image.url.indexOf(search) !== -1), [images, search]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement("div", { className: classes.icon() }, /* @__PURE__ */ wp.element.createElement(
      "img",
      {
        className: classes.icon.img(),
        src: value,
        alt: "Selected Image",
        onClick: () => setIsOpen(!isOpen)
      }
    )), /* @__PURE__ */ wp.element.createElement(Catpow.Popover, { open: isOpen, onClose: () => setIsOpen(false) }, /* @__PURE__ */ wp.element.createElement("div", { className: classes.popover() }, /* @__PURE__ */ wp.element.createElement("div", { className: classes.popover.search() }, /* @__PURE__ */ wp.element.createElement(
      "input",
      {
        type: "text",
        className: classes.popover.search.input(),
        onChange: (e) => setSearch(e.target.value),
        value: search
      }
    )), /* @__PURE__ */ wp.element.createElement("div", { className: classes.popover.list() }, filteredImages.map((image) => {
      const url = setURLparams(image.url, { c: color });
      const thisValue = valueKey === "url" ? url : image[valueKey];
      return /* @__PURE__ */ wp.element.createElement("div", { className: classes.popover.list.item({ "is-active": value == thisValue }), key: thisValue }, /* @__PURE__ */ wp.element.createElement(
        "img",
        {
          className: classes.popover.list.item.img(),
          src: url,
          alt: image.alt,
          onClick: () => {
            setValue(thisValue);
          }
        }
      ));
    })))), /* @__PURE__ */ wp.element.createElement(Catpow.UI.HiddenValues, { name, value }));
  };
})();
