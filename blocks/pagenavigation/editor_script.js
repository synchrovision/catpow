(() => {
  // ../blocks/pagenavigation/editor_script.tsx
  var { __ } = wp.i18n;
  wp.blocks.registerBlockType("catpow/pagenavigation", {
    description: __("\u30DA\u30FC\u30B8\u306E\u89AA\u5B50\u95A2\u4FC2\u304B\u3089\u30CA\u30D3\u30B2\u30FC\u30B7\u30E7\u30F3\u3092\u751F\u6210\u3057\u307E\u3059", "catpow"),
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useMemo } = wp.element;
      const { InspectorControls, useBlockProps } = wp.blockEditor;
      const { serverSideRender: ServerSideRender } = wp;
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          { preset: "headingTag", label: __("\u30E1\u30CB\u30E5\u30FC\u898B\u51FA\u3057", "catpow"), classKey: "menuClasses", key: "MenuHeadingTag" },
          { preset: "level", label: __("\u30E1\u30CB\u30E5\u30FC\u30EC\u30D9\u30EB", "catpow"), classKey: "menuClasses" },
          { name: "type", type: "gridbuttons", label: __("\u30BF\u30A4\u30D7", "catpow"), values: { isStyleTree: "tree", isStyleList: "list", isStyleCard: "card", isStyleGrid: "grid" } },
          { name: "hasOwnTitle", input: "bool", label: __("\u30AB\u30B9\u30BF\u30E0\u30BF\u30A4\u30C8\u30EB", "catpow"), key: "hasOwnTitle" },
          { name: "title", input: "text", label: __("\u30BF\u30A4\u30C8\u30EB", "catpow"), key: "title", cond: (states, props) => props.attr.hasOwnTitle },
          { name: "level", label: "level", input: "range", key: "level", min: 0, max: 3 },
          { name: "depth", label: "depth", input: "range", key: "depth", min: 0, max: 2 },
          { name: "query", label: "query", input: "textarea", key: "query" }
        ];
        wp.hooks.applyFilters("catpow.blocks.pagenavigation.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps() }, /* @__PURE__ */ wp.element.createElement(ServerSideRender, { block: "catpow/pagenavigation", attributes })), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: __("\u8A2D\u5B9A", "catpow"), icon: "admin-generic", set: setAttributes, attr: attributes, selectiveClasses })));
    },
    save() {
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null);
    }
  });
})();
