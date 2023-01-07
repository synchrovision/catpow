(() => {
  // blocks/t-image/editor_script.jsx
  wp.blocks.registerBlockType("catpow/t-image", {
    title: "\u{1F43E} T-Image",
    description: "HTML\u30E1\u30FC\u30EB\u7528\u306E\u753B\u50CF\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002",
    icon: "editor-code",
    category: "catpow-mail",
    parent: ["catpow/t-body", "catpow/t-box", "catpow/t-loop"],
    attributes: {
      classes: { source: "attribute", selector: "table", attribute: "class", default: "wp-block-catpow-t-image" },
      src: { source: "attribute", selector: "[src]", attribute: "src", default: wpinfo.theme_url + "/images/dummy.jpg" },
      alt: { source: "attribute", selector: "[src]", attribute: "alt" },
      loopImage: { source: "text", selector: "td", default: "[output image]" }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes }) {
      const { useState, useMemo } = wp.element;
      const { classes, src, alt, loopImage } = attributes;
      const primaryClass = "wp-block-catpow-t-image";
      var states = CP.wordsToFlags(classes);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          {
            name: "template",
            label: "\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8",
            values: "isTemplate",
            sub: [
              { name: "loopImage", label: "\u753B\u50CF\u51FA\u529B\u30B3\u30FC\u30C9", input: "text", key: "loopImage" }
            ]
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.t-image.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return [
        /* @__PURE__ */ wp.element.createElement("table", { width: "100%", className: classes }, /* @__PURE__ */ wp.element.createElement("tbody", null, /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", null, states.isTemplate ? /* @__PURE__ */ wp.element.createElement(
          "img",
          {
            src: wpinfo.plugins_url + "/catpow/callee/dummy_image.php?text=" + loopImage,
            width: "100%",
            height: "auto"
          }
        ) : /* @__PURE__ */ wp.element.createElement(
          CP.SelectResponsiveImage,
          {
            set: setAttributes,
            attr: attributes,
            keys: { src: "src", alt: "alt" },
            size: "large",
            width: "100%",
            height: "auto"
          }
        ))))),
        /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(
          CP.SelectClassPanel,
          {
            title: "\u30AF\u30E9\u30B9",
            icon: "art",
            set: setAttributes,
            attr: attributes,
            selectiveClasses,
            filters: CP.filters["t-image"] || {}
          }
        ), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(
          TextareaControl,
          {
            label: "\u30AF\u30E9\u30B9",
            onChange: (classes2) => setAttributes({ classes: classes2 }),
            value: classes
          }
        )))
      ];
    },
    save({ attributes, className, setAttributes }) {
      const { classes, src, alt, loopImage } = attributes;
      const primaryClass = "wp-block-catpow-t-image";
      var states = CP.wordsToFlags(classes);
      return /* @__PURE__ */ wp.element.createElement("table", { width: "100%", className: classes }, /* @__PURE__ */ wp.element.createElement("tbody", null, /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", null, states.isTemplate ? loopImage : /* @__PURE__ */ wp.element.createElement("img", { width: "100%", height: "auto", src, alt })))));
    }
  });
})();
