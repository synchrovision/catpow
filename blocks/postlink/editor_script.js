(() => {
  // ../blocks/postlink/editor_script.jsx
  var { __ } = wp.i18n;
  wp.blocks.registerBlockType("catpow/postlink", {
    title: "\u{1F43E} PostLink",
    description: "\u524D\u306E\u6295\u7A3F\u30FB\u6B21\u306E\u6295\u7A3F\u3078\u306E\u30EA\u30F3\u30AF\u3092\u8868\u793A\u3057\u307E\u3059\u3002",
    icon: "editor-code",
    category: "catpow",
    example: CP.example,
    edit({ attributes, setAttributes, className }) {
      const { useMemo } = wp.element;
      const { InspectorControls, useBlockProps } = wp.blockEditor;
      const { PanelBody } = wp.components;
      const { serverSideRender: ServerSideRender } = wp;
      const { func, param } = attributes;
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          "level",
          "hasContentWidth",
          "hasMargin",
          {
            name: "type",
            label: "\u30BF\u30A4\u30D7",
            type: "buttons",
            values: { isTypeText: "\u30C6\u30AD\u30B9\u30C8", isTypeButton: "\u30DC\u30BF\u30F3" }
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.postlink.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps() }, /* @__PURE__ */ wp.element.createElement(ServerSideRender, { block: "catpow/postlink", attributes: Object.assign({}, attributes, { preview: true }) })), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: __("\u30AF\u30E9\u30B9", "catpow"), icon: "art", ...{ setAttributes, attributes }, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "Path" })));
    },
    save({ attributes, className, setAttributes }) {
      return "null";
    }
  });
})();
