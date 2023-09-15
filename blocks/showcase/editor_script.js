(() => {
  // ../blocks/showcase/editor_script.jsx
  CP.config.showcase = {
    imageKeys: {
      image: { src: "src", alt: "alt", code: "imageCode", items: "items" }
    },
    linkKeys: {
      link: { href: "linkUrl", items: "items" }
    }
  };
  wp.blocks.registerBlockType("catpow/showcase", {
    title: "\u{1F43E} showcase",
    description: "\u753B\u50CF\u3068\u30C6\u30AD\u30B9\u30C8\u3092\u4E26\u3079\u3066\u8868\u793A\u3057\u307E\u3059\u3002",
    icon: "columns",
    category: "catpow",
    transforms: {
      from: [
        {
          type: "block",
          blocks: CP.listedConvertibles,
          transform: (attributes) => {
            attributes.classes = "wp-block-catpow-showcase hasCounter";
            return wp.blocks.createBlock("catpow/showcase", attributes);
          }
        }
      ]
    },
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useState, useMemo } = wp.element;
      const { BlockControls, InspectorControls, RichText } = wp.blockEditor;
      const { Icon, PanelBody, TextareaControl, TextControl, ToolbarGroup } = wp.components;
      const { items = [], classes, TitleTag, countPrefix, countSuffix } = attributes;
      const primaryClass = "wp-block-catpow-showcase";
      var classArray = _.uniq((className + " " + classes).split(" "));
      const states = CP.wordsToFlags(classes);
      const { imageKeys, linkKeys } = CP.config.showcase;
      const selectiveClasses = useMemo(() => {
        const { imageKeys: imageKeys2 } = CP.config.showcase;
        const selectiveClasses2 = [
          "color",
          "textColor",
          { name: "counter", label: "\u756A\u53F7", values: "hasCounter", sub: [
            { name: "countPrefix", input: "text", label: "\u756A\u53F7\u524D\u7F6E\u30C6\u30AD\u30B9\u30C8", key: "countPrefix" },
            { name: "countSuffix", input: "text", label: "\u756A\u53F7\u5F8C\u7F6E\u30C6\u30AD\u30B9\u30C8", key: "countSuffix" }
          ] },
          { name: "titleCaption", label: "\u30BF\u30A4\u30C8\u30EB\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3", values: "hasTitleCaption" },
          { name: "size", type: "buttons", label: "\u30B5\u30A4\u30BA", values: ["small", "medium", "large"] },
          { name: "link", label: "\u30EA\u30F3\u30AF", values: "hasLink" }
        ];
        wp.hooks.applyFilters("catpow.blocks.showcase.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const selectiveItemClasses = useMemo(() => {
        const { imageKeys: imageKeys2 } = CP.config.showcase;
        const selectiveItemClasses2 = [
          "color",
          { name: "image", input: "image", label: "\u753B\u50CF", keys: imageKeys2.image },
          "event"
        ];
        wp.hooks.applyFilters("catpow.blocks.showcase.selectiveItemClasses", CP.finderProxy(selectiveItemClasses2));
        return selectiveItemClasses2;
      }, []);
      let rtn = [];
      const save = () => {
        setAttributes({ items: JSON.parse(JSON.stringify(items)) });
      };
      items.map((item, index) => {
        if (!item.controlClasses) {
          item.controlClasses = "control";
        }
        rtn.push(
          /* @__PURE__ */ wp.element.createElement(
            CP.Item,
            {
              tag: "li",
              set: setAttributes,
              attr: attributes,
              items,
              index,
              isSelected,
              key: index
            },
            /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement(
              CP.SelectResponsiveImage,
              {
                attr: attributes,
                set: setAttributes,
                keys: imageKeys.image,
                index,
                size: "full"
              }
            )),
            /* @__PURE__ */ wp.element.createElement("div", { className: "texts" }, states.hasCounter && /* @__PURE__ */ wp.element.createElement("div", { className: "counter" }, countPrefix && /* @__PURE__ */ wp.element.createElement("span", { className: "prefix" }, countPrefix), /* @__PURE__ */ wp.element.createElement("span", { className: "number" }, index + 1), countSuffix && /* @__PURE__ */ wp.element.createElement("span", { className: "suffix" }, countSuffix)), /* @__PURE__ */ wp.element.createElement(
              RichText,
              {
                tagName: TitleTag,
                className: "title",
                onChange: (text) => {
                  items[index].title = text;
                  save();
                },
                value: item.title
              }
            ), states.hasTitleCaption && /* @__PURE__ */ wp.element.createElement(
              RichText,
              {
                tagName: "p",
                className: "titleCaption",
                onChange: (text) => {
                  items[index].titleCaption = text;
                  save();
                },
                value: item.titleCaption
              }
            ), /* @__PURE__ */ wp.element.createElement("div", { className: "text", onFocus: () => {
              attributes.blockState.enableBlockFormat = true;
            } }, /* @__PURE__ */ wp.element.createElement(
              RichText,
              {
                onChange: (text) => {
                  items[index].text = text;
                  save();
                },
                value: item.text
              }
            )), states.hasLink && /* @__PURE__ */ wp.element.createElement(
              CP.Link.Edit,
              {
                className: "link",
                attr: attributes,
                set: setAttributes,
                keys: linkKeys.link,
                index,
                isSelected
              },
              /* @__PURE__ */ wp.element.createElement(
                RichText,
                {
                  onChange: (linkText) => {
                    items[index].linkText = linkText;
                    save();
                  },
                  value: item.linkText
                }
              )
            ))
          )
        );
      });
      if (attributes.EditMode === void 0) {
        attributes.EditMode = false;
      }
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(
        ToolbarGroup,
        {
          controls: [
            {
              icon: "edit",
              title: "EditMode",
              isActive: attributes.EditMode,
              onClick: () => setAttributes({ EditMode: !attributes.EditMode })
            }
          ]
        }
      )), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30AF\u30E9\u30B9",
          icon: "art",
          set: setAttributes,
          attr: attributes,
          selectiveClasses,
          filters: CP.filters.showcase || {}
        }
      ), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(
        TextareaControl,
        {
          label: "\u30AF\u30E9\u30B9",
          onChange: (classes2) => setAttributes({ classes: classes2 }),
          value: classes
        }
      )), states.isTemplate ? /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8",
          icon: "edit",
          set: setAttributes,
          attr: attributes,
          items,
          index: attributes.currentItemIndex,
          selectiveClasses: itemTemplateSelectiveClasses,
          filters: CP.filters.showcase || {}
        }
      ) : /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30A2\u30A4\u30C6\u30E0",
          icon: "edit",
          set: setAttributes,
          attr: attributes,
          items,
          index: attributes.currentItemIndex,
          selectiveClasses: selectiveItemClasses,
          filters: CP.filters.showcase || {}
        }
      ), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), attributes.EditMode ? /* @__PURE__ */ wp.element.createElement("div", { className: "alt_content" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "edit" })), /* @__PURE__ */ wp.element.createElement(
        CP.EditItemsTable,
        {
          set: setAttributes,
          attr: attributes,
          columns: [
            { type: "image", label: "image", keys: imageKeys.image },
            { type: "text", key: "title" },
            { type: "text", key: "titleCaption", cond: states.hasTitleCaption },
            { type: "text", key: "text" },
            { type: "text", key: "linkText", cond: states.hasLink },
            { type: "text", key: "linkUrl", cond: states.hasLink }
          ],
          isTemplate: states.isTemplate
        }
      )) : /* @__PURE__ */ wp.element.createElement("ul", { className: classes }, rtn));
    },
    save({ attributes, className }) {
      const { RichText } = wp.blockEditor;
      const { items = [], classes = "", TitleTag, countPrefix, countSuffix } = attributes;
      var classArray = _.uniq(classes.split(" "));
      const states = CP.wordsToFlags(classes);
      const { imageKeys, linkKeys } = CP.config.showcase;
      let rtn = [];
      items.forEach((item, index) => {
        rtn.push(
          /* @__PURE__ */ wp.element.createElement("li", { className: item.classes, key: index }, /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement(
            CP.ResponsiveImage,
            {
              attr: attributes,
              keys: imageKeys.image,
              index,
              isTemplate: states.isTemplate
            }
          )), /* @__PURE__ */ wp.element.createElement("div", { className: "texts" }, states.hasCounter && /* @__PURE__ */ wp.element.createElement("div", { className: "counter" }, countPrefix && /* @__PURE__ */ wp.element.createElement("span", { className: "prefix" }, countPrefix), /* @__PURE__ */ wp.element.createElement("span", { className: "number" }, index + 1), countSuffix && /* @__PURE__ */ wp.element.createElement("span", { className: "suffix" }, countSuffix)), /* @__PURE__ */ wp.element.createElement(
            RichText.Content,
            {
              tagName: TitleTag,
              className: "title",
              value: item.title
            }
          ), states.hasTitleCaption && /* @__PURE__ */ wp.element.createElement(
            RichText.Content,
            {
              tagName: "p",
              className: "titleCaption",
              value: item.titleCaption
            }
          ), /* @__PURE__ */ wp.element.createElement("div", { className: "text" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.text })), states.hasLink && /* @__PURE__ */ wp.element.createElement(
            CP.Link,
            {
              className: "link",
              attr: attributes,
              keys: linkKeys.link,
              index,
              ...CP.extractEventDispatcherAttributes("catpow/banners", item)
            },
            /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.linkText })
          )))
        );
      });
      return /* @__PURE__ */ wp.element.createElement("ul", { className: classes }, rtn);
    }
  });
})();
