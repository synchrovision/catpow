(() => {
  // ../components/SelectMedia/component.jsx
  Catpow.SelectMedia = (props) => {
    const { useCallback, useMemo } = wp.element;
    const { className = "SelectImage", mime, src, onChange, ...otherProps } = props;
    const onClick = useCallback(() => {
      if (void 0 === Catpow.uploader) {
        Catpow.uploader = wp.media({
          title: "Select Image",
          button: { text: "Select" },
          multiple: false
        });
      }
      Catpow.uploader.off("select").on("select", () => {
        onChange(Catpow.uploader.state().get("selection").first().toJSON());
      }).open();
    }, [onChange]);
    const type = useMemo(() => !mime ? "image" : mime.split("/")[0], [mime]);
    if (type === "audio") {
      return /* @__PURE__ */ React.createElement(
        "audio",
        {
          className,
          src: item[keys.src],
          onClick,
          ...otherProps
        }
      );
    }
    if (type === "video") {
      return /* @__PURE__ */ React.createElement(
        "video",
        {
          className,
          src: item[keys.src],
          onClick,
          autoplay: 1,
          loop: 1,
          playsinline: 1,
          muted: 1,
          ...otherProps
        }
      );
    }
    return /* @__PURE__ */ React.createElement(
      "img",
      {
        className,
        src,
        onClick,
        ...otherProps
      }
    );
  };
})();
