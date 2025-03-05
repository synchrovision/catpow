(() => {
  // ../blocks/lightbox/editor_script.jsx
  CP.config.lightbox = {
    imageKeys: {
      image: { src: "src", alt: "alt", code: "imageCode", items: "items" },
      headerImage: {
        src: "headerImageSrc",
        alt: "headerImageAlt",
        code: "headerImageCode",
        items: "items"
      }
    }
  };
  wp.blocks.registerBlockType("catpow/lightbox", {
    title: "\u{1F43E} Lightbox",
    description: "\u30AF\u30EA\u30C3\u30AF\u3067\u30DD\u30C3\u30D7\u30A2\u30C3\u30D7\u8868\u793A\u3059\u308B\u753B\u50CF\u3067\u3059\u3002",
    icon: "editor-ul",
    category: "catpow",
    transforms: {
      from: [
        {
          type: "block",
          blocks: CP.listedConvertibles,
          transform: (attributes) => {
            attributes.classes = "wp-block-catpow-lightbox medium hasTitle hasImage hasText";
            return wp.blocks.createBlock("catpow/lightbox", attributes);
          }
        }
      ]
    },
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useState, useMemo } = wp.element;
      const { InnerBlocks, InspectorControls, RichText } = wp.blockEditor;
      const { Icon, PanelBody, TextareaControl } = wp.components;
      const {
        items = [],
        classes,
        boxClasses,
        blockState,
        loopCount,
        doLoop,
        EditMode = false,
        AltMode = false,
        OpenMode = false,
        currentItemIndex = 0
      } = attributes;
      const { imageKeys } = CP.config.lightbox;
      var states = CP.wordsToFlags(classes);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          { name: "size", label: "\u30B5\u30A4\u30BA", values: ["small", "medium", "large"] },
          {
            name: "headerImage",
            label: "\u30B5\u30E0\u30CD\u30FC\u30EB\u753B\u50CF",
            values: "hasHeaderImage"
          },
          { name: "title", label: "\u30BF\u30A4\u30C8\u30EB", values: "hasTitle" },
          {
            name: "titleCaption",
            label: "\u30BF\u30A4\u30C8\u30EB\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3",
            values: "hasTitleCaption"
          },
          { name: "image", label: "\u753B\u50CF", values: "hasImage" },
          { name: "subTitle", label: "\u30BF\u30A4\u30C8\u30EB", values: "hasSubTitle" },
          { name: "text", label: "\u30C6\u30AD\u30B9\u30C8", values: "hasText" },
          {
            name: "boxSize",
            label: "\u30DC\u30C3\u30AF\u30B9\u30B5\u30A4\u30BA",
            values: ["small", "medium", "large"],
            key: "boxClasses"
          },
          {
            name: "template",
            label: "\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8",
            values: "isTemplate",
            sub: [
              {
                input: "bool",
                label: "\u30EB\u30FC\u30D7",
                key: "doLoop",
                sub: [
                  { label: "content path", input: "text", key: "content_path" },
                  { label: "query", input: "textarea", key: "query" },
                  {
                    label: "\u30D7\u30EC\u30D3\u30E5\u30FC\u30EB\u30FC\u30D7\u6570",
                    input: "range",
                    key: "loopCount",
                    min: 1,
                    max: 16
                  }
                ]
              }
            ]
          }
        ];
        wp.hooks.applyFilters(
          "catpow.blocks.lightbox.selectiveClasses",
          CP.finderProxy(selectiveClasses2)
        );
        return selectiveClasses2;
      }, []);
      const selectiveItemClasses = useMemo(() => {
        const selectiveItemClasses2 = [
          {
            name: "image",
            input: "image",
            label: "\u753B\u50CF",
            keys: imageKeys.image,
            cond: states.hasImage,
            isTemplate: states.isTemplate
          },
          {
            name: "imageCode",
            input: "text",
            label: "\u753B\u50CF\u30B3\u30FC\u30C9",
            key: "imageCode",
            cond: states.hasImage && states.isTemplate
          },
          {
            name: "",
            input: "image",
            label: "\u30B5\u30E0\u30CD\u30FC\u30EB\u753B\u50CF",
            keys: imageKeys.headerImage,
            cond: states.hasHeaderImage,
            isTemplate: states.isTemplate
          },
          {
            name: "headerImageCode",
            input: "text",
            label: "\u30B5\u30E0\u30CD\u30FC\u30EB\u753B\u50CF\u30B3\u30FC\u30C9",
            key: "headerImageCode",
            cond: states.hasHeaderImage && states.isTemplate
          }
        ];
        wp.hooks.applyFilters(
          "catpow.blocks.lightbox.selectiveItemClasses",
          CP.finderProxy(selectiveItemClasses2)
        );
        return selectiveItemClasses2;
      }, []);
      const save = () => {
        setAttributes({ items: JSON.parse(JSON.stringify(items)) });
      };
      let rtn = [];
      items.map((item, index) => {
        rtn.push(
          /* @__PURE__ */ wp.element.createElement(
            CP.Item,
            {
              tag: "li",
              set: setAttributes,
              attr: attributes,
              items,
              index,
              key: index
            },
            /* @__PURE__ */ wp.element.createElement("header", null, states.hasHeaderImage && /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement(
              CP.SelectResponsiveImage,
              {
                attr: attributes,
                set: setAttributes,
                keys: imageKeys.headerImage,
                index,
                size: "vga",
                isTemplate: states.isTemplate
              }
            )), states.hasTitle && /* @__PURE__ */ wp.element.createElement("div", { className: "text" }, /* @__PURE__ */ wp.element.createElement("h3", null, /* @__PURE__ */ wp.element.createElement(
              RichText,
              {
                onChange: (text) => {
                  item.title = text;
                  save();
                },
                value: item.title
              }
            )), states.hasTitleCaption && /* @__PURE__ */ wp.element.createElement("p", null, /* @__PURE__ */ wp.element.createElement(
              RichText,
              {
                onChange: (text) => {
                  item.titleCaption = text;
                  save();
                },
                value: item.titleCaption
              }
            ))))
          )
        );
      });
      if (rtn.length < loopCount) {
        let len = rtn.length;
        while (rtn.length < loopCount) {
          rtn.push(rtn[rtn.length % len]);
        }
      }
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(
        CP.SelectModeToolbar,
        {
          set: setAttributes,
          attr: attributes,
          modes: ["EditMode", "AltMode", "OpenMode"]
        }
      ), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(
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
      ), /* @__PURE__ */ wp.element.createElement(
        TextareaControl,
        {
          label: "\u30DC\u30C3\u30AF\u30B9\u30AF\u30E9\u30B9",
          onChange: (boxClasses2) => setAttributes({ boxClasses: boxClasses2 }),
          value: boxClasses
        }
      )), /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30EA\u30B9\u30C8\u30A2\u30A4\u30C6\u30E0",
          icon: "edit",
          set: setAttributes,
          attr: attributes,
          items,
          index: attributes.currentItemIndex,
          selectiveClasses: selectiveItemClasses
        }
      ), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), !OpenMode ? /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, EditMode ? /* @__PURE__ */ wp.element.createElement("div", { className: "cp-altcontent" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "edit" })), /* @__PURE__ */ wp.element.createElement(
        CP.EditItemsTable,
        {
          set: setAttributes,
          attr: attributes,
          columns: [
            {
              type: "image",
              label: "image",
              keys: imageKeys.image,
              cond: states.hasImage
            },
            {
              type: "text",
              key: "imageCode",
              cond: states.isTemplate && states.hasImage
            },
            {
              type: "image",
              label: "header",
              keys: imageKeys.headerImage,
              cond: states.hasHeaderImage
            },
            {
              type: "text",
              key: "headerImageCode",
              cond: states.isTemplate && states.hasHeaderImage
            },
            { type: "text", key: "title", cond: states.hasTitle },
            {
              type: "text",
              key: "titleCaption",
              cond: states.hasTitleCaption
            },
            { type: "text", key: "subTitle", cond: states.hasSubTitle },
            { type: "text", key: "text", cond: states.hasText }
          ],
          isTemplate: states.isTemplate
        }
      )) : /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, AltMode && doLoop ? /* @__PURE__ */ wp.element.createElement("div", { className: "cp-altcontent" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "welcome-comments" })), /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)) : /* @__PURE__ */ wp.element.createElement("ul", { className: classes }, rtn))) : /* @__PURE__ */ wp.element.createElement("div", { className: "lightbox_preview" }, /* @__PURE__ */ wp.element.createElement("div", { id: "cp_lightbox", className: "cp-lightbox__container active" }, /* @__PURE__ */ wp.element.createElement("div", { className: "cp-lightbox__content" }, /* @__PURE__ */ wp.element.createElement("div", { className: "group active" }, /* @__PURE__ */ wp.element.createElement("ul", { className: "items" }, items.map((item, index) => {
        var isActive = currentItemIndex == index;
        return /* @__PURE__ */ wp.element.createElement(
          "li",
          {
            className: isActive ? "item active" : "item",
            key: index
          },
          /* @__PURE__ */ wp.element.createElement("div", { className: boxClasses }, states.hasSubTitle && /* @__PURE__ */ wp.element.createElement("header", { className: "title" }, /* @__PURE__ */ wp.element.createElement("h4", null, /* @__PURE__ */ wp.element.createElement(
            RichText,
            {
              onChange: (subTitle) => {
                items[index].subTitle = subTitle;
                setAttributes({ items });
              },
              value: item.subTitle,
              placeholder: "SubTitle"
            }
          ))), states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement(
            CP.SelectResponsiveImage,
            {
              attr: attributes,
              set: setAttributes,
              keys: imageKeys.image,
              index,
              size: "full",
              isTemplate: states.isTemplate
            }
          )), states.hasText && /* @__PURE__ */ wp.element.createElement("div", { className: "text" }, /* @__PURE__ */ wp.element.createElement(
            "div",
            {
              onFocus: () => {
                blockState.enableBlockFormat = true;
              },
              onBlur: () => {
                blockState.enableBlockFormat = false;
              }
            },
            /* @__PURE__ */ wp.element.createElement(
              RichText,
              {
                onChange: (text) => {
                  items[index].text = text;
                  setAttributes({ items });
                },
                value: item.text
              }
            )
          )))
        );
      })), /* @__PURE__ */ wp.element.createElement("div", { className: "cp-lightbox__control" }, /* @__PURE__ */ wp.element.createElement("div", { className: "prev active" }), /* @__PURE__ */ wp.element.createElement("ul", { className: "dots active" }, items.map((item, index) => {
        var isActive = currentItemIndex == index;
        return /* @__PURE__ */ wp.element.createElement(
          "li",
          {
            className: isActive ? "dot active" : "dot",
            "data-index": index
          }
        );
      })), /* @__PURE__ */ wp.element.createElement("div", { className: "next active" }), /* @__PURE__ */ wp.element.createElement("div", { className: "close" })))))));
    },
    save({ attributes, className }) {
      const { InnerBlocks, RichText } = wp.blockEditor;
      const {
        items = [],
        classes = "",
        boxClasses,
        blockState,
        doLoop
      } = attributes;
      var states = CP.wordsToFlags(classes);
      const { imageKeys } = CP.config.lightbox;
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("ul", { className: classes }, items.map((item, index) => {
        return /* @__PURE__ */ wp.element.createElement("li", { className: item.classes, key: index }, /* @__PURE__ */ wp.element.createElement("header", null, states.hasHeaderImage && /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement(
          CP.ResponsiveImage,
          {
            attr: attributes,
            keys: imageKeys.headerImage,
            index,
            isTemplate: states.isTemplate
          }
        )), states.hasTitle && /* @__PURE__ */ wp.element.createElement("div", { className: "text" }, /* @__PURE__ */ wp.element.createElement("h3", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.title })), states.hasTitleCaption && /* @__PURE__ */ wp.element.createElement("p", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.titleCaption })))), /* @__PURE__ */ wp.element.createElement("div", { className: boxClasses }, states.hasSubTitle && /* @__PURE__ */ wp.element.createElement("header", { className: "title" }, /* @__PURE__ */ wp.element.createElement("h4", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.subTitle }))), states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement(
          CP.ResponsiveImage,
          {
            attr: attributes,
            keys: imageKeys.image,
            index,
            isTemplate: states.isTemplate
          }
        )), states.hasText && /* @__PURE__ */ wp.element.createElement("div", { className: "text" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.text }))));
      })), doLoop && /* @__PURE__ */ wp.element.createElement("onEmpty", null, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
