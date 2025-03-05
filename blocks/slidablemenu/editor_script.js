(() => {
  // ../blocks/slidablemenu/editor_script.jsx
  CP.config.slidablemenu = {
    imageKeys: {
      image: { src: "src", alt: "alt", code: "imageCode", items: "items" }
    }
  };
  wp.blocks.registerBlockType("catpow/slidablemenu", {
    title: "\u{1F43E} Slidable Menu",
    description: "\u30B9\u30AF\u30ED\u30FC\u30EB\u53EF\u80FD\u306A\u30E1\u30CB\u30E5\u30FC\u3002",
    icon: "list-view",
    category: "catpow",
    transforms: {
      from: [
        {
          type: "block",
          blocks: CP.listedConvertibles,
          transform: (attributes) => {
            attributes.classes = "wp-block-catpow-slidablemenu medium";
            return wp.blocks.createBlock("catpow/slidablemenu", attributes);
          }
        }
      ]
    },
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useState, useMemo } = wp.element;
      const { BlockControls, InnerBlocks, InspectorControls, RichText } = wp.blockEditor;
      const { Icon, PanelBody, TextareaControl, TextControl, ToolbarGroup } = wp.components;
      const {
        items = [],
        classes,
        columnsCount,
        loopCount,
        doLoop,
        AltMode = false
      } = attributes;
      const primaryClassName = "wp-block-catpow-slidablemenu";
      var classArray = _.uniq((className + " " + classes).split(" "));
      const states = CP.wordsToFlags(classes);
      const { imageKeys } = CP.config.slidablemenu;
      const selectiveClasses = useMemo(() => {
        const { imageKeys: imageKeys2 } = CP.config.slidablemenu;
        const selectiveClasses2 = [
          {
            name: "size",
            type: "buttons",
            label: "\u30B5\u30A4\u30BA",
            values: ["small", "medium", "large"]
          },
          {
            name: "columnsCount",
            input: "range",
            label: "\u30AB\u30E9\u30E0\u6570",
            key: "columnsCount",
            min: 2,
            max: 10
          },
          {
            name: "template",
            label: "\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8",
            values: "isTemplate",
            sub: [
              {
                name: "loop",
                input: "bool",
                label: "\u30EB\u30FC\u30D7",
                key: "doLoop",
                sub: [
                  {
                    name: "contentPath",
                    label: "content path",
                    input: "text",
                    key: "content_path"
                  },
                  {
                    name: "query",
                    label: "query",
                    input: "textarea",
                    key: "query"
                  },
                  {
                    name: "loopCount",
                    label: "\u30D7\u30EC\u30D3\u30E5\u30FC\u30EB\u30FC\u30D7\u6570",
                    input: "range",
                    key: "loopCount",
                    min: 1,
                    max: 64
                  }
                ]
              }
            ]
          }
        ];
        wp.hooks.applyFilters(
          "catpow.blocks.slidablemenu.selectiveClasses",
          CP.finderProxy(selectiveClasses2)
        );
        return selectiveClasses2;
      }, []);
      let rtn = [];
      const save = () => {
        setAttributes({ items: JSON.parse(JSON.stringify(items)) });
      };
      [...Array(Math.max(items.length, loopCount)).keys()].forEach((i) => {
        const index = i % items.length;
        const item = items[index];
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
              key: i
            },
            /* @__PURE__ */ wp.element.createElement("div", { className: "contents" }, /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement(
              CP.SelectResponsiveImage,
              {
                attr: attributes,
                set: setAttributes,
                keys: imageKeys.image,
                index,
                size: "vga",
                isTemplate: states.isTemplate
              }
            )), /* @__PURE__ */ wp.element.createElement("div", { className: "texts" }, /* @__PURE__ */ wp.element.createElement(
              RichText,
              {
                tagName: "h4",
                className: "title",
                onChange: (title) => {
                  items[index].title = title;
                  save();
                },
                value: item.title,
                placeholder: "Title",
                onFocus: () => {
                  attributes.blockState.enableBlockFormat = false;
                }
              }
            ), /* @__PURE__ */ wp.element.createElement(
              RichText,
              {
                tagName: "div",
                className: "text",
                onChange: (text) => {
                  items[index].text = text;
                  save();
                },
                value: item.text,
                placeholder: "Text",
                onFocus: () => {
                  attributes.blockState.enableBlockFormat = false;
                }
              }
            ))),
            isSelected && /* @__PURE__ */ wp.element.createElement("div", { className: "link" }, /* @__PURE__ */ wp.element.createElement(
              "p",
              {
                contentEditable: true,
                suppressContentEditableWarning: true,
                onBlur: (e) => {
                  item.linkUrl = e.currentTarget.innerHTML;
                  save();
                }
              },
              item.linkUrl
            ))
          )
        );
      });
      if (attributes.EditMode === void 0) {
        attributes.EditMode = false;
      }
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.SelectModeToolbar, { set: setAttributes, attr: attributes }), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(
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
      )), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), attributes.EditMode ? /* @__PURE__ */ wp.element.createElement("div", { className: "cp-altcontent" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "edit" })), /* @__PURE__ */ wp.element.createElement(
        CP.EditItemsTable,
        {
          set: setAttributes,
          attr: attributes,
          columns: [
            { type: "image", label: "image", keys: imageKeys.image },
            { type: "text", key: "imageCode", cond: states.isTemplate },
            { type: "text", key: "title" },
            { type: "text", key: "text" },
            { type: "text", key: "linkUrl" }
          ],
          isTemplate: states.isTemplate
        }
      )) : /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, AltMode && doLoop ? /* @__PURE__ */ wp.element.createElement("div", { className: "cp-altcontent" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "welcome-comments" })), /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)) : /* @__PURE__ */ wp.element.createElement("div", { className: classes, style: { "--columns": columnsCount } }, /* @__PURE__ */ wp.element.createElement("ul", { className: "items" }, rtn))));
    },
    save({ attributes, className }) {
      const { InnerBlocks, RichText } = wp.blockEditor;
      const { items = [], classes = "", columnsCount, doLoop } = attributes;
      var classArray = _.uniq(classes.split(" "));
      const states = CP.wordsToFlags(classes);
      const { imageKeys } = CP.config.slidablemenu;
      let rtn = [];
      items.map((item, index) => {
        rtn.push(
          /* @__PURE__ */ wp.element.createElement("li", { className: item.classes, key: index }, /* @__PURE__ */ wp.element.createElement("div", { className: "contents" }, /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement(
            CP.ResponsiveImage,
            {
              attr: attributes,
              keys: imageKeys.image,
              index,
              size: "vga",
              isTemplate: states.isTemplate
            }
          )), /* @__PURE__ */ wp.element.createElement("div", { className: "texts" }, /* @__PURE__ */ wp.element.createElement(
            RichText.Content,
            {
              tagName: "h4",
              className: "title",
              value: item.title
            }
          ), /* @__PURE__ */ wp.element.createElement(
            RichText.Content,
            {
              tagName: "div",
              className: "text",
              value: item.text
            }
          )), /* @__PURE__ */ wp.element.createElement("a", { className: "link", href: item.linkUrl }, " ")))
        );
      });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { className: classes, style: "--columns:" + columnsCount }, /* @__PURE__ */ wp.element.createElement("ul", { className: "items" }, rtn)), doLoop && /* @__PURE__ */ wp.element.createElement("onEmpty", null, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
