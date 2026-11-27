(() => {
  // ../blocks/nav/editor_script.jsx
  var { __ } = wp.i18n;
  wp.blocks.registerBlockType("catpow/nav", {
    icon: "welcome-widgets-menus",
    category: "catpow-parts",
    edit({ attributes, setAttributes, className, clientId }) {
      const { useMemo } = wp.element;
      const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
      const { classes, vars, nav_name } = attributes;
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [navSelectiveClasses];
        wp.hooks.applyFilters("catpow.blocks.nav.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const blockProps = useBlockProps({ className: classes, style: vars });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(CP.ServerSideRender, { block: "catpow/nav", attributes })), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: __("\u30AF\u30E9\u30B9", "catpow"), initialOpen: true, icon: "art", ...{ setAttributes, attributes }, selectiveClasses })));
    },
    save({ attributes, className, setAttributes }) {
      return null;
    }
  });
})();
