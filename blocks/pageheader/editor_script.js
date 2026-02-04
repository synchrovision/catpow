(() => {
  // ../blocks/pageheader/editor_script.jsx
  var { __ } = wp.i18n;
  CP.config.pageheader = {
    devices: ["sp", "tb"]
  };
  wp.blocks.registerBlockType("catpow/pageheader", {
    title: "\u{1F43E} PageHeader",
    description: __("\u30DA\u30FC\u30B8\u306E\u6700\u521D\u306B\u8868\u793A\u3059\u308B\u30D8\u30C3\u30C0\u306E\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002", "catpow"),
    icon: "welcome-widgets-menus",
    category: "catpow-parts",
    example: CP.example,
    edit({ attributes, setAttributes }) {
      const { vars } = attributes;
      const { useMemo } = wp.element;
      const { InspectorControls, RichText } = wp.blockEditor;
      const states = CP.classNamesToFlags(attributes.classes);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          "size",
          { name: "breadcrumb", label: __("\u30D1\u30F3\u304F\u305A\u30EA\u30B9\u30C8", "catpow"), values: "hasBreadcrumb" },
          "color",
          "colorScheme",
          "backgroundColor",
          "backgroundImage",
          "backgroundPattern"
        ];
        wp.hooks.applyFilters("catpow.blocks.pageheader.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", set: setAttributes, attr: attributes, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { className: attributes.classes, style: CP.convertCssVarsForPreview(vars) }, /* @__PURE__ */ wp.element.createElement("div", { className: "_body" }, /* @__PURE__ */ wp.element.createElement(
        RichText,
        {
          tagName: "h1",
          className: "_title",
          onChange: (title) => {
            setAttributes({ title });
          },
          value: attributes.title
        }
      ), states.hasBreadcrumb && /* @__PURE__ */ wp.element.createElement(CP.ServerSideRenderPart.Preview, { name: "breadcrumb", className: "_breadcrumb", container_class: "wp-block-catpow-pageheader__body-breadcrumb-body" })))));
    },
    save({ attributes }) {
      const { vars } = attributes;
      const { RichText } = wp.blockEditor;
      const states = CP.classNamesToFlags(attributes.classes);
      return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { className: attributes.classes, style: vars }, /* @__PURE__ */ wp.element.createElement("div", { className: "_body" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "h1", className: "_title", value: attributes.title }), states.hasBreadcrumb && /* @__PURE__ */ wp.element.createElement(CP.ServerSideRenderPart, { name: "breadcrumb", className: "_breadcrumb", container_class: "wp-block-catpow-pageheader__body-breadcrumb-body" }))));
    }
  });
})();
