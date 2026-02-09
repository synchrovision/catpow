(() => {
  // node_modules/clsx/dist/clsx.mjs
  function r(e) {
    var t, f, n = "";
    if ("string" == typeof e || "number" == typeof e) n += e;
    else if ("object" == typeof e) if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else for (f in e) e[f] && (n && (n += " "), n += f);
    return n;
  }
  function clsx() {
    for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
    return n;
  }

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
      classes: { source: "attribute", selector: ".wp-block-catpow-accordion", attribute: "class", default: "wp-block-catpow-accordion is-level3" },
      HeadingTag: { type: "string", default: "h3" },
      title: { source: "html", selector: ".wp-block-catpow-accordion__header-title", default: "Title" },
      imageMime: { source: "attribute", selector: ".wp-block-catpow-accordion__header-image [src]", attribute: "data-mime" },
      imageSrc: { source: "attribute", selector: ".wp-block-catpow-accordion__header-image [src]", attribute: "src", default: wpinfo.theme_url + "/images/dummy.jpg" },
      imageAlt: { source: "attribute", selector: ".wp-block-catpow-accordion__header-image [src]", attribute: "alt" },
      imageCode: { source: "text", selector: ".wp-block-catpow-accordion__header-image" }
    },
    example: CP.example,
    edit({ attributes, setAttributes }) {
      const { useMemo } = wp.element;
      const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
      const { PanelBody, TextareaControl } = wp.components;
      const { classes, HeadingTag, title, imageCode, isOpen = true } = attributes;
      const states = CP.classNamesToFlags(classes);
      const { imageKeys, imageSizes } = CP.config.accordion;
      const selectiveClasses = useMemo(() => {
        const { imageKeys: imageKeys2, imageSizes: imageSizes2 } = CP.config.accordion;
        const selectiveClasses2 = [
          "headingTag",
          "level",
          "color",
          "hasContentWidth",
          { name: "image", label: "\u753B\u50CF", values: "hasImage", sub: [{ input: "image", keys: imageKeys2.image, size: imageSizes2.image }] },
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
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps({ className: clsx(classes, { "is-open": isOpen }) }) }, /* @__PURE__ */ wp.element.createElement("div", { className: "_header", role: "button" }, states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, states.isTemplate && imageCode ? /* @__PURE__ */ wp.element.createElement(CP.DummyImage, { text: imageCode }) : /* @__PURE__ */ wp.element.createElement(CP.SelectResponsiveImage, { set: setAttributes, attr: attributes, keys: imageKeys.image, size: imageSizes.image })), /* @__PURE__ */ wp.element.createElement(RichText, { tagName: HeadingTag, className: "_title", value: title, onChange: (title2) => setAttributes({ title: title2 }) }), /* @__PURE__ */ wp.element.createElement("span", { className: "_icon", onClick: () => setAttributes({ isOpen: !isOpen }) })), /* @__PURE__ */ wp.element.createElement("div", { className: "_contents" }, /* @__PURE__ */ wp.element.createElement("div", { className: "_body" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, null))))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", set: setAttributes, attr: attributes, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: "\u30AF\u30E9\u30B9", onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes }))));
    },
    save({ attributes }) {
      const { classes, HeadingTag, title, imageCode } = attributes;
      const states = CP.classNamesToFlags(classes);
      const { imageKeys } = CP.config.accordion;
      const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;
      const blockProps = useBlockProps.save({
        id: "{$uid}",
        className: classes,
        "data-wp-interactive": "catpow/accordion",
        "data-wp-context": JSON.stringify({
          accordionId: "{$uid}"
        }),
        "data-wp-init": "callbacks.initBlock",
        "data-wp-class--is-open": "callbacks.isOpen"
      });
      return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(
        "div",
        {
          id: "{$uid}-header",
          className: "_header",
          role: "button",
          "data-wp-on--click": "actions.onClickToggle",
          "data-wp-bind--aria-expanded": "callbacks.isOpen",
          "aria-controls": "{$uid}-contents",
          tabindex: "0"
        },
        states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, states.isTemplate && imageCode ? imageCode : /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { attr: attributes, keys: imageKeys.image, size: "medium_large" })),
        /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: HeadingTag, className: "_title", value: title }),
        /* @__PURE__ */ wp.element.createElement("span", { className: "_icon" })
      ), /* @__PURE__ */ wp.element.createElement("div", { id: "{$uid}-contents", className: "_contents", "data-wp-bind--aria-hidden": "!callbacks.isOpen" }, /* @__PURE__ */ wp.element.createElement("div", { className: "_body" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)))));
    }
  });
  wp.blocks.registerBlockType("catpow/accordiongroup", {
    title: "\u{1F43E} AccordionGroup",
    description: "\u540C\u6642\u306B\u958B\u304B\u308C\u308B\u30A2\u30B3\u30FC\u30C7\u30A3\u30AA\u30F3\u3092\u5236\u9650\u3059\u308B\u30B3\u30F3\u30C6\u30CA\u3067\u3059\u3002",
    icon: "insert",
    category: "catpow",
    attributes: {
      classes: { source: "attribute", selector: ".wp-block-catpow-accordiongourp", attribute: "class", default: "wp-block-catpow-accordiongroup" },
      groupId: { type: "string", default: "accordionGroup" }
    },
    example: CP.example,
    edit({ attributes, setAttributes }) {
      const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
      const { Icon, PanelBody, TextControl } = wp.components;
      const { classes, groupId } = attributes;
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps({ className: classes }) }, /* @__PURE__ */ wp.element.createElement("div", { className: "cp-label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "excerpt-view" }), groupId), /* @__PURE__ */ wp.element.createElement(InnerBlocks, null))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "GroupId", icon: "admin-generic", initialOpen: true }, /* @__PURE__ */ wp.element.createElement(TextControl, { onChange: (groupId2) => setAttributes({ groupId: groupId2 }), value: groupId }))));
    },
    save({ attributes }) {
      const { InnerBlocks, useBlockProps } = wp.blockEditor;
      const { classes, groupId } = attributes;
      const blockProps = useBlockProps.save({
        className: classes,
        "data-wp-interactive": "catpow/accordion",
        "data-wp-context": JSON.stringify({
          groupId
        })
      });
      return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
