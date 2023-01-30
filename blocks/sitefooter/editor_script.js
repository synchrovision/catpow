(() => {
  // blocks/sitefooter/editor_script.jsx
  var { __ } = wp.i18n;
  wp.blocks.registerBlockType("catpow/sitefooter", {
    title: "\u{1F43E} SiteFooter",
    description: __("\u30B5\u30A4\u30C8\u5171\u901A\u30D5\u30C3\u30BF\u306E\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002", "catpow"),
    icon: "welcome-widgets-menus",
    category: "catpow-parts",
    attributes: {
      classes: { source: "attribute", selector: "div", attribute: "class", default: "wp-block-catpow-sitefooter" },
      copyright: { source: "text", selector: ".copyright", default: "powered by wordpress" }
    },
    example: CP.example,
    edit(props) {
      const { useState, useMemo } = wp.element;
      const { InnerBlocks, InspectorControls, RichText } = wp.blockEditor;
      const { attributes, className, setAttributes, context } = props;
      const { classes = "" } = attributes;
      const { Fragment } = wp.element;
      const states = CP.wordsToFlags(classes);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [];
        wp.hooks.applyFilters("catpow.blocks.sitefooter.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { id: "SiteFooter", className: classes }, /* @__PURE__ */ wp.element.createElement("div", { className: "contents" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, { template: [["core/paragraph", { content: CP.dummyText.text }]], templateLock: false })), /* @__PURE__ */ wp.element.createElement(RichText, { tagName: "div", className: "copyright", value: attributes.copyright, onChange: (copyright) => setAttributes({ copyright }) })), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30AF\u30E9\u30B9",
          icon: "art",
          set: setAttributes,
          attr: attributes,
          selectiveClasses
        }
      )));
    },
    save({ attributes, className, setAttributes }) {
      const { InnerBlocks, RichText } = wp.blockEditor;
      const { classes = "" } = attributes;
      const states = CP.wordsToFlags(classes);
      return /* @__PURE__ */ wp.element.createElement("div", { id: "SiteFooter", className: classes }, /* @__PURE__ */ wp.element.createElement("div", { className: "contents" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)), /* @__PURE__ */ wp.element.createElement("div", { className: "copyright" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: attributes.copyright })));
    }
  });
})();
