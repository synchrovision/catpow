(() => {
  // ../blocks/pageheader/editor_script.jsx
  var { __ } = wp.i18n;
  CP.config.pageheader = {
    devices: ["sp", "tb"],
    imageKeys: {
      backgroundImage: { src: "backgroundImageSrc", srcset: "backgroundImageSrcset", sources: "backgroundImageSources" }
    }
  };
  wp.blocks.registerBlockType("catpow/pageheader", {
    title: "\u{1F43E} PageHeader",
    description: __("\u30DA\u30FC\u30B8\u306E\u6700\u521D\u306B\u8868\u793A\u3059\u308B\u30D8\u30C3\u30C0\u306E\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002", "catpow"),
    icon: "welcome-widgets-menus",
    category: "catpow-parts",
    example: CP.example,
    edit({ attributes, setAttributes, className, clientId }) {
      const { vars, title, backgroundImageCode } = attributes;
      const { useMemo } = wp.element;
      const { BlockControls, InspectorControls, RichText } = wp.blockEditor;
      const { serverSideRender: ServerSideRender } = wp;
      const { content_path, query, config, EditMode = false } = attributes;
      const { devices, imageKeys } = CP.config.pageheader;
      const { bem } = Catpow.util;
      const states = CP.classNamesToFlags(attributes.classes);
      const classes = useMemo(() => bem(attributes.classes), []);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          "color",
          "size",
          {
            name: "backgroundImage",
            label: __("\u80CC\u666F\u753B\u50CF", "catpow"),
            values: "hasBackgroundImage",
            sub: [
              { input: "picture", keys: imageKeys.backgroundImage, devices },
              { name: "blendmode", label: __("\u30E2\u30FC\u30C9", "catpow"), vars: "vars", key: "--cp-image-blendmode", input: "blendmode" },
              { name: "opacity", label: __("\u4E0D\u900F\u660E\u5EA6", "catpow"), vars: "vars", key: "--cp-image-opacity", input: "range", min: 0, max: 1, step: 0.1 }
            ]
          },
          { name: "breadcrumb", label: __("\u30D1\u30F3\u304F\u305A\u30EA\u30B9\u30C8", "catpow"), values: "hasBreadCrumnb" },
          {
            name: "template",
            label: __("\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8", "catpow"),
            values: "isTemplate",
            sub: [
              {
                input: "text",
                label: __("\u80CC\u666F\u753B\u50CF\u30B3\u30FC\u30C9", "catpow"),
                key: "backgroundImageCode",
                cond: "hasBackgroundImage"
              }
            ]
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.pageheader.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", set: setAttributes, attr: attributes, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), /* @__PURE__ */ wp.element.createElement("div", { className: attributes.classes, style: vars }, /* @__PURE__ */ wp.element.createElement("div", { className: classes.body() }, /* @__PURE__ */ wp.element.createElement(
        RichText,
        {
          tagName: "h1",
          className: classes.body.title(),
          onChange: (title2) => {
            setAttributes({ title: title2 });
          },
          value: attributes.title
        }
      ), states.hasBreadCrumnb && /* @__PURE__ */ wp.element.createElement(CP.ServerSideRenderPart.Preview, { name: "breadcrumb", className: classes.body.breadcrumb(), container_class: classes.body.breadcrumb.body() })), /* @__PURE__ */ wp.element.createElement("div", { className: classes.background() }, states.hasBackgroundImage && /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, states.isTemplate && backgroundImageCode ? /* @__PURE__ */ wp.element.createElement(CP.DummyImage, { text: backgroundImageCode }) : /* @__PURE__ */ wp.element.createElement(CP.SelectResponsiveImage, { attr: attributes, set: setAttributes, keys: imageKeys.backgroundImage, devices })))));
    },
    save({ attributes, className, setAttributes }) {
      const { vars, title, backgroundImageCode } = attributes;
      const { devices, imageKeys } = CP.config.pageheader;
      const { RichText } = wp.blockEditor;
      const { bem } = Catpow.util;
      const states = CP.classNamesToFlags(attributes.classes);
      const classes = bem(attributes.classes);
      return /* @__PURE__ */ wp.element.createElement("div", { className: classes(), style: vars }, /* @__PURE__ */ wp.element.createElement("div", { className: classes.body() }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "h1", className: classes.body.title(), value: attributes.title }), states.hasBreadCrumnb && /* @__PURE__ */ wp.element.createElement(CP.ServerSideRenderPart, { name: "breadcrumb", className: classes.body.breadcrumb(), container_class: classes.body.breadcrumb.body() })), /* @__PURE__ */ wp.element.createElement("div", { className: classes.background() }, states.hasBackgroundImage && /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, states.isTemplate && backgroundImageCode ? backgroundImageCode : /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { attr: attributes, keys: imageKeys.backgroundImage, devices }))));
    }
  });
})();
