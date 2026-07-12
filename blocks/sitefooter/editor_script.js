(() => {
  // ../blocks/sitefooter/editor_script.jsx
  var { __ } = wp.i18n;
  wp.blocks.registerBlockType("catpow/sitefooter", {
    title: "\u{1F43E} SiteFooter",
    description: __("\u30B5\u30A4\u30C8\u5171\u901A\u30D5\u30C3\u30BF\u306E\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002", "catpow"),
    icon: "welcome-widgets-menus",
    category: "catpow-parts",
    attributes: {
      classes: { source: "attribute", selector: ".wp-block-catpow-sitefooter", attribute: "class", default: "wp-block-catpow-sitefooter is-level3" },
      contentsClasses: { source: "attribute", selector: ".wp-block-catpow-sitefooter__contents", attribute: "class", default: "wp-block-catpow-sitefooter__contents" },
      copyrightClasses: { source: "attribute", selector: ".wp-block-catpow-sitefooter__copyright", attribute: "class", default: "wp-block-catpow-sitefooter__copyright" },
      copyright: { source: "text", selector: ".wp-block-catpow-sitefooter__copyright", default: "powered by wordpress" }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes, context }) {
      const { useState, useMemo } = wp.element;
      const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
      const { classes = "", contentsClasses, copyrightClasses } = attributes;
      const { Fragment } = wp.element;
      const states = CP.classNamesToFlags(classes);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          "level",
          { preset: "colorScheme", label: "\u30B3\u30F3\u30C6\u30F3\u30C4\u914D\u8272", classKey: "contentsClasses" },
          { preset: "backgroundColor", label: "\u30B3\u30F3\u30C6\u30F3\u30C4\u80CC\u666F\u8272", classKey: "contentsClasses" },
          { preset: "colorScheme", label: "\u30B3\u30D4\u30FC\u30E9\u30A4\u30C8\u914D\u8272", classKey: "copyrightClasses" },
          { preset: "backgroundColor", label: "\u30B3\u30D4\u30FC\u30E9\u30A4\u30C8\u80CC\u666F\u8272", classKey: "copyrightClasses" }
        ];
        wp.hooks.applyFilters("catpow.blocks.sitefooter.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps({ id: "SiteFooter", className: classes }) }, /* @__PURE__ */ wp.element.createElement("div", { className: contentsClasses }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, { template: [["core/paragraph", { content: CP.dummyText.text }]], templateLock: false })), /* @__PURE__ */ wp.element.createElement(RichText, { tagName: "div", className: copyrightClasses, value: attributes.copyright, onChange: (copyright) => setAttributes({ copyright }) }))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", ...{ setAttributes, attributes }, selectiveClasses })));
    },
    save({ attributes, className, setAttributes }) {
      const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;
      const { classes = "", contentsClasses, copyrightClasses } = attributes;
      const states = CP.classNamesToFlags(classes);
      return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps.save({ id: "SiteFooter", className: classes }) }, /* @__PURE__ */ wp.element.createElement("div", { className: contentsClasses }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)), /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "div", className: copyrightClasses, value: attributes.copyright })));
    }
  });
})();
