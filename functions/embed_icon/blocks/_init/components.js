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
          color: "currentColor",
          onChange: (image) => {
            save({
              embedIconSrc: image.url
            });
          }
        }
      );
    },
    Output: (props) => {
      const { className = "icon", item } = props;
      return /* @__PURE__ */ wp.element.createElement("svg", { className, "data-src": item?.embedIconSrc, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20" }, /* @__PURE__ */ wp.element.createElement("use", { href: item?.embedIconSrc?.replace(/\?.+$/, "") + "?c=currentColor#root" }));
    }
  };
})();
