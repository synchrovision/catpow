(() => {
  // ../blocks/materials/editor_script.jsx
  wp.blocks.registerBlockType("catpow/materials", {
    title: "\u{1F43E} Materials",
    description: "\u6750\u6599\u30FB\u6210\u5206\u4E00\u89A7\u306E\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002",
    icon: "editor-ul",
    category: "catpow",
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useState, useMemo } = wp.element;
      const { InnerBlocks, InspectorControls, RichText } = wp.blockEditor;
      const { Icon, PanelBody, TextareaControl } = wp.components;
      const { items = [], classes, loopParam, loopCount, doLoop, EditMode = false, AltMode = false, currentItemIndex } = attributes;
      const primaryClass = "wp-block-catpow-materials";
      var states = CP.wordsToFlags(classes);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
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
                    max: 16
                  }
                ]
              }
            ]
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.materials.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const selectiveItemClasses = useMemo(() => {
        const selectiveItemClasses2 = ["color", { name: "label", label: "\u30E9\u30D9\u30EB", values: "hasLabel" }];
        wp.hooks.applyFilters("catpow.blocks.materials.selectiveItemClasses", CP.finderProxy(selectiveItemClasses2));
        return selectiveItemClasses2;
      }, []);
      let rtn = [];
      const imageKeys = {
        image: {
          src: "imageSrc",
          alt: "imageAlt",
          code: "imageCode",
          items: "items"
        }
      };
      const save = () => {
        setAttributes({ items: JSON.parse(JSON.stringify(items)) });
      };
      items.map((item, index) => {
        if (!item.controlClasses) {
          item.controlClasses = "control";
        }
        const itemStates = CP.wordsToFlags(item.classes);
        rtn.push(
          /* @__PURE__ */ wp.element.createElement(CP.Item, { tag: "li", set: setAttributes, attr: attributes, items, index, isSelected: isSelected && currentItemIndex == index, key: index }, itemStates.hasLabel && /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(
            RichText,
            {
              onChange: (label) => {
                item.label = label;
                save();
              },
              value: item.label
            }
          )), /* @__PURE__ */ wp.element.createElement("ul", { className: "items" }, item.items.map((subItem, subIndex) => {
            const subItemStates = CP.wordsToFlags(subItem.classes);
            return /* @__PURE__ */ wp.element.createElement(
              CP.Item,
              {
                tag: "li",
                set: () => {
                  item.currentItemIndex = subIndex;
                  save();
                },
                attr: item,
                items: item.items,
                index: subIndex,
                isSelected: isSelected && currentItemIndex == index && item.currentItemIndex == subIndex
              },
              /* @__PURE__ */ wp.element.createElement("div", { className: "text" }, /* @__PURE__ */ wp.element.createElement("div", { className: "title" }, /* @__PURE__ */ wp.element.createElement(
                RichText,
                {
                  onChange: (title) => {
                    subItem.title = title;
                    save();
                  },
                  value: subItem.title
                }
              )), /* @__PURE__ */ wp.element.createElement("div", { className: "line" }), /* @__PURE__ */ wp.element.createElement("div", { className: "amount" }, /* @__PURE__ */ wp.element.createElement(
                RichText,
                {
                  onChange: (amount) => {
                    subItem.amount = amount;
                    save();
                  },
                  value: subItem.amount
                }
              )), subItemStates.hasCaption && /* @__PURE__ */ wp.element.createElement("div", { className: "caption" }, /* @__PURE__ */ wp.element.createElement(
                RichText,
                {
                  onChange: (caption) => {
                    subItem.caption = caption;
                    save();
                  },
                  value: subItem.caption
                }
              )))
            );
          })))
        );
      });
      if (attributes.EditMode === void 0) {
        attributes.EditMode = false;
      }
      if (rtn.length < loopCount) {
        let len = rtn.length;
        while (rtn.length < loopCount) {
          rtn.push(rtn[rtn.length % len]);
        }
      }
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.SelectModeToolbar, { set: setAttributes, attr: attributes }), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", set: setAttributes, attr: attributes, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: "\u30AF\u30E9\u30B9", onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes })), /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30EA\u30B9\u30C8\u30A2\u30A4\u30C6\u30E0", icon: "edit", set: setAttributes, attr: attributes, items, index: attributes.currentItemIndex, selectiveClasses: selectiveItemClasses }), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, EditMode ? /* @__PURE__ */ wp.element.createElement("div", { className: "cp-altcontent" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "edit" })), /* @__PURE__ */ wp.element.createElement(
        CP.EditItemsTable,
        {
          set: setAttributes,
          attr: attributes,
          columns: [
            { type: "text", key: "label", cond: true },
            {
              type: "items",
              key: "items",
              columns: [
                { type: "text", key: "title", cond: true },
                { type: "text", key: "amount", cond: true },
                { type: "text", key: "caption", cond: true }
              ],
              cond: true
            }
          ],
          isTemplate: states.isTemplate
        }
      )) : /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, AltMode && doLoop ? /* @__PURE__ */ wp.element.createElement("div", { className: "cp-altcontent" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "welcome-comments" })), /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)) : /* @__PURE__ */ wp.element.createElement("ul", { className: classes }, rtn))));
    },
    save({ attributes, className }) {
      const { InnerBlocks, RichText } = wp.blockEditor;
      const { items = [], classes = "", loopParam, loopCount, doLoop } = attributes;
      var classArray = _.uniq(classes.split(" "));
      var states = CP.wordsToFlags(classes);
      let rtn = [];
      items.map((item, index) => {
        const itemStates = CP.wordsToFlags(item.classes);
        rtn.push(
          /* @__PURE__ */ wp.element.createElement("li", { className: item.classes, key: index }, itemStates.hasLabel && /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.label })), /* @__PURE__ */ wp.element.createElement("ul", { className: "items" }, item.items.map((subItem, subIndex) => {
            const subItemStates = CP.wordsToFlags(subItem.classes);
            return /* @__PURE__ */ wp.element.createElement("li", { className: subItem.classes }, /* @__PURE__ */ wp.element.createElement("div", { className: "text" }, /* @__PURE__ */ wp.element.createElement("div", { className: "title" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: subItem.title })), /* @__PURE__ */ wp.element.createElement("div", { className: "line" }), /* @__PURE__ */ wp.element.createElement("div", { className: "amount" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: subItem.amount })), subItemStates.hasCaption && /* @__PURE__ */ wp.element.createElement("div", { className: "caption" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: subItem.caption }))));
          })))
        );
      });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("ul", { className: classes }, rtn), doLoop && /* @__PURE__ */ wp.element.createElement("onEmpty", null, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
