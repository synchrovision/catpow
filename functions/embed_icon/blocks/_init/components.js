(() => {
  // ../functions/embed_icon/blocks/_init/components.jsx
  wp.hooks.addFilter("catpow.IconComponent", "catpow/editor", () => "EmbedIcon");
  CP.EmbedIcon = {
    Input: (props) => {
      const { item, prm, save } = props;
      const parser = new DOMParser();
      const serializer = new XMLSerializer();
      return /* @__PURE__ */ wp.element.createElement(
        CP.SelectPreparedImage,
        {
          name: "icon",
          value: item.embedIconSrc,
          color: 0,
          onChange: (image) => {
            fetch(image.url).then((res) => res.text()).then((text) => {
              const el = parser.parseFromString(text, "image/svg+xml");
              if (el.querySelector("parsererror")) {
                return;
              }
              save({
                embedIconSrc: image.url,
                embedIconCode: serializer.serializeToString(el)
              });
            });
          }
        }
      );
    },
    Output: (props) => {
      const { className = "icon", item } = props;
      return /* @__PURE__ */ wp.element.createElement("div", { className, "data-src": item.embedIconSrc, dangerouslySetInnerHTML: { __html: item.embedIconCode } });
    }
  };
})();
