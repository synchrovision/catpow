(() => {
  // ../blocks/t-media-text/editor_script.jsx
  var { __ } = wp.i18n;
  wp.blocks.registerBlockType("catpow/t-media-text", {
    icon: "editor-code",
    category: "catpow-mail",
    parent: CP.mailContensContainer,
    example: CP.example,
    edit({ attributes, className, setAttributes }) {
      const { useState, useMemo } = wp.element;
      const { InnerBlocks, BlockControls, InspectorControls, useBlockProps } = wp.blockEditor;
      const { PanelBody, TextareaControl } = wp.components;
      const { isTemplate, classes, marginTop, marginBottom, src, alt, imageCode, width, gap } = attributes;
      var states = CP.classNamesToFlags(classes);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          "imagePosition",
          "verticalAlign",
          { name: "range", input: "range", label: __("\u753B\u50CF\u306E\u5E45", "catpow"), key: "width", min: 50, max: 400, step: 10 },
          { name: "range", input: "range", label: __("\u9593\u9694", "catpow"), key: "gap", min: 0, max: 100, step: 5 },
          { name: "marginTop", input: "range", label: __("\u4E0A\u4F59\u767D", "catpow"), key: "marginTop", min: 0, max: 10 },
          { name: "marginBottom", input: "range", label: __("\u4E0B\u4F59\u767D", "catpow"), key: "marginBottom", min: 0, max: 10 },
          {
            name: "template",
            label: __("\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8", "catpow"),
            input: "bool",
            key: "isTemplate",
            sub: [{ name: "imageCode", label: __("\u753B\u50CF\u51FA\u529B\u30B3\u30FC\u30C9", "catpow"), input: "text", key: "imageCode" }]
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.t-media-text.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("table", { ...useBlockProps({ className: classes }), width: "100%" }, /* @__PURE__ */ wp.element.createElement("tbody", null, marginTop > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginTop}rem` }, colSpan: "3" })), states.hasImageLeft ? /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-image-cell", width }, /* @__PURE__ */ wp.element.createElement(
        CP.SelectResponsiveImage,
        {
          setAttributes,
          attributes,
          keys: { src: "src", alt: "alt", code: "imageCode" },
          size: "large",
          width: "100%",
          height: "auto",
          isTemplate
        }
      )), /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { width: `${gap}px` }, width: gap }), /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-text-cell" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, null))) : /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-text-cell" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)), /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { width: `${gap}px` }, width: gap }), /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-image-cell", width }, /* @__PURE__ */ wp.element.createElement(
        CP.SelectResponsiveImage,
        {
          setAttributes,
          attributes,
          keys: { src: "src", alt: "alt", code: "imageCode" },
          size: "large",
          width: "100%",
          height: "auto",
          isTemplate
        }
      ))), marginBottom > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginBottom}rem` }, colSpan: "3" }))))), /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(CP.ImagePositionClassToolbar, { setAttributes, attributes }), /* @__PURE__ */ wp.element.createElement(CP.VerticalAlignClassToolbar, { setAttributes, attributes })), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: __("\u30AF\u30E9\u30B9", "catpow"), icon: "art", ...{ setAttributes, attributes }, selectiveClasses, initialOpen: true }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: __("\u30AF\u30E9\u30B9", "catpow"), onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes }))));
    },
    save({ attributes, className, setAttributes }) {
      const { InnerBlocks, useBlockProps } = wp.blockEditor;
      const { isTemplate, classes, marginTop, marginBottom, src, alt, imageCode, width, gap } = attributes;
      var states = CP.classNamesToFlags(classes);
      return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("table", { ...useBlockProps.save({ className: classes }), width: "100%" }, /* @__PURE__ */ wp.element.createElement("tbody", null, marginTop > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginTop}rem` }, colSpan: "3" })), states.hasImageLeft ? /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-image-cell", width }, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { attributes, keys: { src: "src", alt: "alt", code: "imageCode" }, size: "large", width: "100%", height: "auto", isTemplate })), /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { width: `${gap}px` }, width: gap }), /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-text-cell" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null))) : /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-text-cell" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)), /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { width: `${gap}px` }, width: gap }), /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-image-cell", width }, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { attributes, keys: { src: "src", alt: "alt", code: "imageCode" }, size: "large", width: "100%", height: "auto", isTemplate }))), marginBottom > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginBottom}rem` }, colSpan: "3" })))));
    }
  });
})();
