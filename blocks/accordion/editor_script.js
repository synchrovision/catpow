(() => {
  // node_modules/clsx/dist/clsx.mjs
  function r(e) {
    var t, f, n = "";
    if ("string" == typeof e || "number" == typeof e) n += e;
    else if ("object" == typeof e) if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else for (f in e) e[f] && (n && (n += " "), n += f);
    return n;
  }
  function clsx() {
    for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
    return n;
  }

  // ../blocks/accordion/editor_script.jsx
  var { __ } = wp.i18n;
  CP.config.accordion = {
    devices: ["tb", "sp"],
    imageKeys: {
      image: { mime: "imageMime", src: "imageSrc", alt: "imageAlt" }
    },
    imageSizes: {
      image: "thumbnail"
    }
  };
  wp.blocks.registerBlockType("catpow/accordion", {
    icon: "insert",
    category: "catpow",
    example: CP.example,
    edit({ attributes, setAttributes }) {
      const { useMemo } = wp.element;
      const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
      const { PanelBody, TextareaControl } = wp.components;
      const { isTemplate, classes, vars, HeadingTag, title, imageCode, isOpen = true } = attributes;
      const states = CP.classNamesToFlags(classes);
      const { imageKeys, imageSizes } = CP.config.accordion;
      const selectiveClasses = useMemo(() => {
        const { imageKeys: imageKeys2, imageSizes: imageSizes2 } = CP.config.accordion;
        const selectiveClasses2 = [
          { name: "image", label: __("\u753B\u50CF", "catpow"), values: "hasImage", sub: [{ input: "image", keys: imageKeys2.image, size: imageSizes2.image }] },
          {
            name: "template",
            label: __("\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8", "catpow"),
            input: "bool",
            key: "isTemplate",
            sub: [
              {
                name: "imageCode",
                input: "text",
                label: __("\u753B\u50CF\u30B3\u30FC\u30C9", "catpow"),
                key: "imageCode",
                cond: "hasImage"
              }
            ]
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.accordion.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps({ className: clsx(classes, { "is-open": isOpen }), style: vars }) }, /* @__PURE__ */ wp.element.createElement("div", { className: "_header", role: "button" }, states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, isTemplate && imageCode ? /* @__PURE__ */ wp.element.createElement(CP.DummyImage, { text: imageCode }) : /* @__PURE__ */ wp.element.createElement(CP.SelectResponsiveImage, { setAttributes, attributes, keys: imageKeys.image, size: imageSizes.image })), /* @__PURE__ */ wp.element.createElement(RichText, { tagName: HeadingTag, className: "_title", value: title, onChange: (title2) => setAttributes({ title: title2 }) }), /* @__PURE__ */ wp.element.createElement("span", { className: "_icon", onClick: () => setAttributes({ isOpen: !isOpen }) })), /* @__PURE__ */ wp.element.createElement("div", { className: "_contents" }, /* @__PURE__ */ wp.element.createElement("div", { className: "_body" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, null))))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: __("\u30AF\u30E9\u30B9", "catpow"), icon: "art", ...{ setAttributes, attributes }, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: __("\u30AF\u30E9\u30B9", "catpow"), onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes }))));
    },
    save({ attributes }) {
      const { isTemplate, classes, vars, HeadingTag, title, imageCode } = attributes;
      const states = CP.classNamesToFlags(classes);
      const { imageKeys } = CP.config.accordion;
      const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;
      const blockProps = useBlockProps.save({
        id: "{$uid}",
        className: classes,
        style: vars,
        "data-wp-interactive": "catpow/accordion",
        "data-wp-context": JSON.stringify({
          accordionId: "{$uid}"
        }),
        "data-wp-init": "callbacks.initBlock",
        "data-wp-class--is-open": "callbacks.isOpen"
      });
      return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(
        "div",
        {
          id: "{$uid}-header",
          className: "_header",
          role: "button",
          "data-wp-on--click": "actions.onClickToggle",
          "data-wp-bind--aria-expanded": "callbacks.isOpen",
          "aria-controls": "{$uid}-contents",
          tabindex: "0"
        },
        states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, isTemplate && imageCode ? imageCode : /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { attributes, keys: imageKeys.image, size: "medium_large" })),
        /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: HeadingTag, className: "_title", value: title }),
        /* @__PURE__ */ wp.element.createElement("span", { className: "_icon" })
      ), /* @__PURE__ */ wp.element.createElement("div", { id: "{$uid}-contents", className: "_contents", "data-wp-bind--aria-hidden": "!callbacks.isOpen" }, /* @__PURE__ */ wp.element.createElement("div", { className: "_body" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)))));
    }
  });
  wp.blocks.registerBlockType("catpow/accordiongroup", {
    apiVersion: 3,
    icon: "insert",
    category: "catpow",
    example: CP.example,
    edit({ attributes, setAttributes }) {
      const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
      const { Icon, PanelBody, TextControl } = wp.components;
      const { classes, groupId } = attributes;
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps({ className: classes }) }, /* @__PURE__ */ wp.element.createElement("div", { className: "cp-label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "excerpt-view" }), groupId), /* @__PURE__ */ wp.element.createElement(InnerBlocks, null))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "GroupId", icon: "admin-generic", initialOpen: true }, /* @__PURE__ */ wp.element.createElement(TextControl, { onChange: (groupId2) => setAttributes({ groupId: groupId2 }), value: groupId }))));
    },
    save({ attributes }) {
      const { InnerBlocks, useBlockProps } = wp.blockEditor;
      const { classes, groupId } = attributes;
      const blockProps = useBlockProps.save({
        className: classes,
        "data-wp-interactive": "catpow/accordion",
        "data-wp-context": JSON.stringify({
          groupId
        })
      });
      return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
