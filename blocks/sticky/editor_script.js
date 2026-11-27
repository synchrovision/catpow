(() => {
  // ../blocks/sticky/editor_script.jsx
  var { __ } = wp.i18n;
  CP.config.sticky = {
    imageKeys: {
      openButtonImage: { src: "openButtonImageSrc" },
      closeButtonImage: { src: "closeButtonImageSrc" }
    },
    imageSizes: {
      image: "vga"
    }
  };
  wp.blocks.registerBlockType("catpow/sticky", {
    icon: "menu",
    category: "catpow",
    example: CP.example,
    edit({ attributes, className, setAttributes }) {
      const { useState, useMemo } = wp.element;
      const { InnerBlocks: InnerBlocks2, InspectorControls, RichText: RichText2, useBlockProps } = wp.blockEditor;
      const { PanelBody, TextareaControl } = wp.components;
      const { classes, labelText } = attributes;
      const states = CP.classNamesToFlags(classes);
      const { imageKeys } = CP.config.sticky;
      const selectiveClasses = useMemo(() => {
        const { imageKeys: imageKeys2 } = CP.config.sticky;
        const selectiveClasses2 = [
          { name: "position", label: __("\u4F4D\u7F6E", "catpow"), input: "position", disable: ["left", "center", "right"] },
          { name: "size", label: __("\u30B5\u30A4\u30BA", "catpow"), filter: "size", values: { full: __("\u5168\u9762", "catpow"), large: __("\u5927", "catpow"), medium: __("\u4E2D", "catpow"), small: __("\u5C0F", "catpow") } },
          {
            name: "type",
            label: __("\u30BF\u30A4\u30D7", "catpow"),
            filter: "type",
            values: { label: __("\u30E9\u30D9\u30EB", "catpow"), container: __("\u30B3\u30F3\u30C6\u30CA", "catpow"), collapsible: __("\u6298\u308A\u7573\u307F", "catpow") },
            sub: {
              label: ["color"],
              collapsible: [
                "color",
                {
                  name: "button",
                  label: __("\u30DC\u30BF\u30F3", "catpow"),
                  values: { pullButton: __("\u5F15\u304D\u51FA\u3057", "catpow"), menuButton: __("\u30E1\u30CB\u30E5\u30FC", "catpow"), labelButton: __("\u30E9\u30D9\u30EB", "catpow"), imageButton: __("\u753B\u50CF", "catpow") },
                  sub: {
                    imageButton: [
                      { label: "open", input: "image", keys: imageKeys2.openButtonImage, size: "thumbnail" },
                      { label: "close", input: "image", keys: imageKeys2.closeButtonImage, size: "thumbnail" }
                    ]
                  }
                }
              ]
            }
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.sticky.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps({ className: classes }) }, states.collapsible && /* @__PURE__ */ wp.element.createElement("div", { className: "stickyButton" }, /* @__PURE__ */ wp.element.createElement("div", { className: "stickyButtonIcon" }, states.labelButton && /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(
        RichText2,
        {
          onChange: (labelText2) => {
            setAttributes({ labelText: labelText2 });
          },
          value: labelText
        }
      )), states.imageButton && [
        /* @__PURE__ */ wp.element.createElement(ResponsiveImage, { className: "open", attributes, keys: imageKeys.openButtonImage }),
        /* @__PURE__ */ wp.element.createElement(ResponsiveImage, { className: "close", attributes, keys: imageKeys.closeButtonImage })
      ])), /* @__PURE__ */ wp.element.createElement("div", { className: "content" }, states.label && /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(
        RichText2,
        {
          onChange: (labelText2) => {
            setAttributes({ labelText: labelText2 });
          },
          value: labelText
        }
      )), (states.container || states.collapsible) && /* @__PURE__ */ wp.element.createElement(InnerBlocks2, null))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: __("\u30AF\u30E9\u30B9", "catpow"), icon: "art", ...{ setAttributes, attributes }, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: __("\u30AF\u30E9\u30B9", "catpow"), onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes }))));
    },
    save({ attributes, className, setAttributes }) {
      const { InnerBlocks: InnerBlocks2, RichText: RichText2, useBlockProps } = wp.blockEditor;
      const { classes = "", labelText } = attributes;
      const states = CP.classNamesToFlags(classes);
      const { imageKeys } = CP.config.sticky;
      return /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps.save({ className: classes }) }, states.collapsible && /* @__PURE__ */ wp.element.createElement("div", { className: "stickyButton" }, /* @__PURE__ */ wp.element.createElement("div", { className: "stickyButtonIcon" }, states.labelButton && /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(RichText2.Content, { value: labelText })), states.imageButton && [
        /* @__PURE__ */ wp.element.createElement(ResponsiveImage, { className: "open", attributes, keys: imageKeys.openButtonImage }),
        /* @__PURE__ */ wp.element.createElement(ResponsiveImage, { className: "close", attributes, keys: imageKeys.closeButtonImage })
      ])), /* @__PURE__ */ wp.element.createElement("div", { className: "content" }, states.label && /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(RichText2.Content, { value: labelText })), (states.container || states.collapsible) && /* @__PURE__ */ wp.element.createElement(InnerBlocks2.Content, null)));
    },
    deplicated: [
      {
        save({ attributes, className, setAttributes }) {
          const { useBlockProps } = wp.blockEditor;
          const { classes = "", labelText } = attributes;
          const states = CP.classNamesToFlags(classes);
          const { imageKeys } = CP.config.sticky;
          return /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps.save({ className: classes }) }, states.collapsible && /* @__PURE__ */ wp.element.createElement("div", { className: "stickyMenuButton" }, /* @__PURE__ */ wp.element.createElement("div", { className: "stickyMenuButtonIcon" }, states.labelButton && /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: labelText })), states.imageButton && [
            /* @__PURE__ */ wp.element.createElement(ResponsiveImage, { className: "open", attributes, keys: imageKeys.openButtonImage }),
            /* @__PURE__ */ wp.element.createElement(ResponsiveImage, { className: "close", attributes, keys: imageKeys.closeButtonImage })
          ])), /* @__PURE__ */ wp.element.createElement("div", { className: "content" }, states.label && /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: labelText })), (states.container || states.collapsible) && /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
        }
      }
    ]
  });
  wp.blocks.registerBlockType("catpow/stickycontent", {
    apiVersion: 3,
    icon: "editor-code",
    category: "catpow",
    edit({ attributes, className, setAttributes }) {
      const { InnerBlocks: InnerBlocks2, useBlockProps } = wp.blockEditor;
      return [
        /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps({ className: "sticky_content" }) }, /* @__PURE__ */ wp.element.createElement(InnerBlocks2, { template: [["core/paragraph"]], templateLock: false }))
      ];
    },
    save({ attributes, className, setAttributes }) {
      const { InnerBlocks: InnerBlocks2, useBlockProps } = wp.blockEditor;
      return /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps.save({ className: "sticky_content" }) }, /* @__PURE__ */ wp.element.createElement(InnerBlocks2.Content, null));
    }
  });
})();
