(() => {
  // ../blocks/siteheader/editor_script.jsx
  var { __ } = wp.i18n;
  var { useMemo } = wp.element;
  var { InspectorControls, useBlockProps } = wp.blockEditor;
  wp.blocks.registerBlockType("catpow/siteheader", {
    icon: "welcome-widgets-menus",
    category: "catpow-parts",
    example: CP.example,
    edit({ attributes, setAttributes }) {
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          {
            label: __("\u30ED\u30B4", "catpow"),
            sub: [{ label: __("\u30AD\u30E3\u30C3\u30C1\u30D5\u30EC\u30FC\u30BA", "catpow"), values: "hasCatchPhrase" }]
          },
          {
            label: __("\u30E1\u30A4\u30F3\u30E1\u30CB\u30E5\u30FC", "catpow"),
            sub: [
              { label: __("\u30B5\u30D6\u30BF\u30A4\u30C8\u30EB", "catpow"), values: "hasSubTitleInMainMenu" },
              { label: __("\u30A2\u30A4\u30B3\u30F3", "catpow"), values: "hasIconInMainMenu" }
            ]
          },
          {
            label: __("\u30D7\u30E9\u30A4\u30DE\u30EA\u30E1\u30CB\u30E5\u30FC", "catpow"),
            sub: [
              { label: __("\u30B5\u30D6\u30BF\u30A4\u30C8\u30EB", "catpow"), values: "hasSubTitleInPrimaryMenu" },
              { label: __("\u30A2\u30A4\u30B3\u30F3", "catpow"), values: "hasIconInPrimaryMenu" }
            ]
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.siteheader.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: __("\u30B9\u30BF\u30A4\u30EB", "catpow"), icon: "art", ...{ setAttributes, attributes }, selectiveClasses })), /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps() }, /* @__PURE__ */ wp.element.createElement(CP.ServerSideRender, { block: "catpow/siteheader", attributes })));
    },
    save() {
      return null;
    }
  });
})();
