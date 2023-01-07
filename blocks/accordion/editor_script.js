(() => {
  // ../blocks/accordion/editor_script.jsx
  CP.config.accordion = {
    devices: ["sp", "tb"],
    imageKeys: {
      image: { mime: "imageMime", src: "imageSrc", alt: "imageAlt" }
    },
    imageSizes: {
      image: "thumbnail"
    }
  };
  wp.blocks.registerBlockType("catpow/accordion", {
    title: "\u{1F43E} Accordion",
    description: "\u30AF\u30EA\u30C3\u30AF\u3067\u6298\u308A\u7573\u307F\u3067\u304D\u308B\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002",
    icon: "insert",
    category: "catpow",
    attributes: {
      classes: { source: "attribute", selector: ".wp-block-catpow-accordion", attribute: "class", default: "wp-block-catpow-accordion" },
      title: { type: "array", source: "children", selector: ".title", default: ["Title"] },
      imageMime: { source: "attribute", selector: ".image [src]", attribute: "data-mime" },
      imageSrc: { source: "attribute", selector: ".image [src]", attribute: "src", default: cp.theme_url + "/images/dummy.jpg" },
      imageAlt: { source: "attribute", selector: ".image [src]", attribute: "alt" },
      imageCode: { source: "text", selector: ".image" }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes }) {
      const { useState, useMemo } = wp.element;
      const {
        classes,
        title,
        imageMime,
        imageSrc,
        imageAlt,
        imageCode
      } = attributes;
      const states = CP.wordsToFlags(classes);
      const { devices, imageKeys, imageSizes } = CP.config.accordion;
      const selectiveClasses = useMemo(() => {
        const { devices: devices2, imageKeys: imageKeys2, imageSizes: imageSizes2 } = CP.config.accordion;
        const selectiveClasses2 = [
          "color",
          { name: "image", label: "\u753B\u50CF", values: "hasImage", sub: [
            { input: "image", keys: imageKeys2.image, size: imageSizes2.image }
          ] },
          { name: "exclusive", label: "\u4ED6\u3092\u9589\u3058\u308B", values: "exclusive" },
          {
            name: "template",
            label: "\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8",
            values: "isTemplate",
            sub: [
              {
                name: "imageCode",
                input: "text",
                label: "\u753B\u50CF\u30B3\u30FC\u30C9",
                key: "imageCode",
                cond: "hasImage"
              }
            ]
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.accordion.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { className: classes }, /* @__PURE__ */ wp.element.createElement("div", { className: "header" }, states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, states.isTemplate && imageCode ? /* @__PURE__ */ wp.element.createElement(CP.DummyImage, { text: imageCode }) : /* @__PURE__ */ wp.element.createElement(
        CP.SelectResponsiveImage,
        {
          set: setAttributes,
          attr: attributes,
          keys: imageKeys.image,
          size: imageSizes.image
        }
      )), /* @__PURE__ */ wp.element.createElement("h3", { className: "title" }, /* @__PURE__ */ wp.element.createElement(RichText, { tagName: "div", value: title, onChange: (title2) => setAttributes({ title: title2 }) })), /* @__PURE__ */ wp.element.createElement("span", { className: "icon" })), /* @__PURE__ */ wp.element.createElement("div", { className: "container" }, /* @__PURE__ */ wp.element.createElement("div", { className: "contents" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30AF\u30E9\u30B9",
          icon: "art",
          set: setAttributes,
          attr: attributes,
          selectiveClasses,
          filters: CP.filters.accordion || {}
        }
      ), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(
        TextareaControl,
        {
          label: "\u30AF\u30E9\u30B9",
          onChange: (classes2) => setAttributes({ classes: classes2 }),
          value: classes
        }
      ))));
    },
    save({ attributes, className, setAttributes }) {
      const {
        classes,
        title,
        imageMime,
        imageSrc,
        imageAlt,
        imageCode
      } = attributes;
      const states = CP.wordsToFlags(classes);
      const { devices, imageKeys, imageSizes } = CP.config.accordion;
      return /* @__PURE__ */ wp.element.createElement(Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { className: classes }, /* @__PURE__ */ wp.element.createElement("div", { className: "header" }, states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { class: "image" }, states.isTemplate && imageCode ? imageCode : /* @__PURE__ */ wp.element.createElement(
        CP.ResponsiveImage,
        {
          attr: attributes,
          keys: imageKeys.image,
          size: "medium_large"
        }
      )), /* @__PURE__ */ wp.element.createElement("h3", { className: "title" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: title })), /* @__PURE__ */ wp.element.createElement("span", { className: "icon" })), /* @__PURE__ */ wp.element.createElement("div", { className: "container" }, /* @__PURE__ */ wp.element.createElement("div", { className: "contents" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)))));
    }
  });
})();
