(() => {
  // ../blocks/sticky/editor_script.jsx
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
    title: "\u{1F43E} Sticky",
    description: "\u30B9\u30AF\u30ED\u30FC\u30EB\u306B\u8FFD\u5F93\u3059\u308B\u30B3\u30F3\u30C6\u30F3\u30C4\u3092\u914D\u7F6E\u3057\u307E\u3059\u3002",
    icon: "menu",
    category: "catpow",
    attributes: {
      classes: { source: "attribute", selector: "div", attribute: "class", default: "wp-block-catpow-sticky topLeft small label" },
      labelText: { source: "html", selector: ".content>.label", defalt: "\u30E9\u30D9\u30EB" },
      openButtonImageSrc: { source: "attribute", selector: ".wp-block-catpow-sticky>.stickyButton [src].open", attribute: "src", default: wpinfo.theme_url + "/images/dummy_icon.svg" },
      closeButtonImageSrc: { source: "attribute", selector: ".wp-block-catpow-sticky>.stickyButton [src].close", attribute: "src", default: wpinfo.theme_url + "/images/dummy_icon.svg" }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes }) {
      const { useState, useMemo } = wp.element;
      const { InnerBlocks: InnerBlocks2, InspectorControls, RichText: RichText2 } = wp.blockEditor;
      const { PanelBody, TextareaControl } = wp.components;
      const { classes, labelText } = attributes;
      const states = CP.wordsToFlags(classes);
      const { imageKeys } = CP.config.sticky;
      const selectiveClasses = useMemo(() => {
        const { imageKeys: imageKeys2 } = CP.config.sticky;
        const selectiveClasses2 = [
          { name: "position", label: "\u4F4D\u7F6E", input: "position", disable: ["left", "center", "right"] },
          { name: "size", label: "\u30B5\u30A4\u30BA", filter: "size", values: { full: "\u5168\u9762", large: "\u5927", medium: "\u4E2D", small: "\u5C0F" } },
          {
            name: "type",
            label: "\u30BF\u30A4\u30D7",
            filter: "type",
            values: { label: "\u30E9\u30D9\u30EB", container: "\u30B3\u30F3\u30C6\u30CA", collapsible: "\u6298\u308A\u7573\u307F" },
            sub: {
              label: [
                "color"
              ],
              collapsible: [
                "color",
                {
                  name: "button",
                  label: "\u30DC\u30BF\u30F3",
                  values: { pullButton: "\u5F15\u304D\u51FA\u3057", menuButton: "\u30E1\u30CB\u30E5\u30FC", labelButton: "\u30E9\u30D9\u30EB", imageButton: "\u753B\u50CF" },
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
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { className: classes }, states.collapsible && /* @__PURE__ */ wp.element.createElement("div", { className: "stickyButton" }, /* @__PURE__ */ wp.element.createElement("div", { className: "stickyButtonIcon" }, states.labelButton && /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(RichText2, { onChange: (labelText2) => {
        setAttributes({ labelText: labelText2 });
      }, value: labelText })), states.imageButton && [
        /* @__PURE__ */ wp.element.createElement(
          ResponsiveImage,
          {
            className: "open",
            attr: attributes,
            keys: imageKeys.openButtonImage
          }
        ),
        /* @__PURE__ */ wp.element.createElement(
          ResponsiveImage,
          {
            className: "close",
            attr: attributes,
            keys: imageKeys.closeButtonImage
          }
        )
      ])), /* @__PURE__ */ wp.element.createElement("div", { className: "content" }, states.label && /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(RichText2, { onChange: (labelText2) => {
        setAttributes({ labelText: labelText2 });
      }, value: labelText })), (states.container || states.collapsible) && /* @__PURE__ */ wp.element.createElement(InnerBlocks2, null))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30AF\u30E9\u30B9",
          icon: "art",
          set: setAttributes,
          attr: attributes,
          selectiveClasses
        }
      ), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(
        TextareaControl,
        {
          label: "\u30AF\u30E9\u30B9",
          onChange: (classes2) => setAttributes({ classes: classes2 }),
          value: classes
        }
      ))));
    },
    save({ attributes, className, setAttributes }) {
      const { InnerBlocks: InnerBlocks2, RichText: RichText2 } = wp.blockEditor;
      const { classes = "", labelText } = attributes;
      const states = CP.wordsToFlags(classes);
      const { imageKeys } = CP.config.sticky;
      return /* @__PURE__ */ wp.element.createElement("div", { className: classes }, states.collapsible && /* @__PURE__ */ wp.element.createElement("div", { className: "stickyButton" }, /* @__PURE__ */ wp.element.createElement("div", { className: "stickyButtonIcon" }, states.labelButton && /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(RichText2.Content, { value: labelText })), states.imageButton && [
        /* @__PURE__ */ wp.element.createElement(
          ResponsiveImage,
          {
            className: "open",
            attr: attributes,
            keys: imageKeys.openButtonImage
          }
        ),
        /* @__PURE__ */ wp.element.createElement(
          ResponsiveImage,
          {
            className: "close",
            attr: attributes,
            keys: imageKeys.closeButtonImage
          }
        )
      ])), /* @__PURE__ */ wp.element.createElement("div", { className: "content" }, states.label && /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(RichText2.Content, { value: labelText })), (states.container || states.collapsible) && /* @__PURE__ */ wp.element.createElement(InnerBlocks2.Content, null)));
    },
    deplicated: [
      {
        save({ attributes, className, setAttributes }) {
          const { classes = "", labelText } = attributes;
          const states = CP.wordsToFlags(classes);
          const { imageKeys } = CP.config.sticky;
          return /* @__PURE__ */ wp.element.createElement("div", { className: classes }, states.collapsible && /* @__PURE__ */ wp.element.createElement("div", { className: "stickyMenuButton" }, /* @__PURE__ */ wp.element.createElement("div", { className: "stickyMenuButtonIcon" }, states.labelButton && /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: labelText })), states.imageButton && [
            /* @__PURE__ */ wp.element.createElement(
              ResponsiveImage,
              {
                className: "open",
                attr: attributes,
                keys: imageKeys.openButtonImage
              }
            ),
            /* @__PURE__ */ wp.element.createElement(
              ResponsiveImage,
              {
                className: "close",
                attr: attributes,
                keys: imageKeys.closeButtonImage
              }
            )
          ])), /* @__PURE__ */ wp.element.createElement("div", { className: "content" }, states.label && /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: labelText })), (states.container || states.collapsible) && /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
        }
      }
    ]
  });
  wp.blocks.registerBlockType("catpow/stickycontent", {
    title: "\u{1F43E} StickyContent",
    icon: "editor-code",
    category: "catpow",
    parent: ["catpow/sticky"],
    edit({ attributes, className, setAttributes }) {
      return [
        /* @__PURE__ */ wp.element.createElement("div", { className: "sticky_content" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, { template: [["core/paragraph"]], templateLock: false }))
      ];
    },
    save({ attributes, className, setAttributes }) {
      return /* @__PURE__ */ wp.element.createElement("div", { className: "sticky_content" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null));
    }
  });
})();
