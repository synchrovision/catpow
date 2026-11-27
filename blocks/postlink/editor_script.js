(() => {
  // ../blocks/postlink/editor_script.jsx
  var { __ } = wp.i18n;
  wp.blocks.registerBlockType("catpow/postlink", {
    icon: "editor-code",
    category: "catpow",
    example: CP.example,
    edit({ attributes, setAttributes, className }) {
      const { useMemo } = wp.element;
      const { InspectorControls, useBlockProps } = wp.blockEditor;
      const { PanelBody } = wp.components;
      const { serverSideRender: ServerSideRender } = wp;
      const { classes, vars, func, param } = attributes;
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          {
            name: "type",
            label: __("\u30BF\u30A4\u30D7", "catpow"),
            type: "buttons",
            values: { isTypeText: __("\u30C6\u30AD\u30B9\u30C8", "catpow"), isTypeButton: __("\u30DC\u30BF\u30F3", "catpow") }
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.postlink.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps({ className: classes, style: vars }) }, /* @__PURE__ */ wp.element.createElement(ServerSideRender, { block: "catpow/postlink", attributes: Object.assign({}, attributes, { preview: true }) })), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: __("\u30AF\u30E9\u30B9", "catpow"), icon: "art", ...{ setAttributes, attributes }, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "Path" })));
    },
    save({ attributes, className, setAttributes }) {
      return "null";
    }
  });
})();
