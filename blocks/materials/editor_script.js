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
      const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
      const { Icon, PanelBody, TextareaControl } = wp.components;
      const { items = [], classes, HeadingTag, SubHeadingTag, loopParam, loopCount, doLoop, EditMode = false, AltMode = false, currentItemIndex } = attributes;
      const primaryClass = "wp-block-catpow-materials";
      var states = CP.classNamesToFlags(classes);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = ["headingTag", "level", "subHeadingTag", "hasMargin", "hasContentWidth", "itemSize", "isTemplate"];
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
      const blockProps = useBlockProps({ className: EditMode || AltMode && doLoop ? "cp-altcontent" : classes });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.SelectModeToolbar, { set: setAttributes, attr: attributes }), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", ...{ setAttributes, attributes }, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: "\u30AF\u30E9\u30B9", onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes })), /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30B0\u30EB\u30FC\u30D7", icon: "edit", ...{ setAttributes, attributes }, itemKeys: ["items", attributes.currentItemIndex], selectiveClasses: selectiveItemClasses }), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, EditMode ? /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(CP.Label, { icon: "edit" }), /* @__PURE__ */ wp.element.createElement(
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
      )) : /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, AltMode && doLoop ? /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(CP.Label, { icon: "welcome-comments" }), /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)) : /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("ul", { ...blockProps }, [...Array(Math.max(items.length, loopCount)).keys()].map((i) => {
        const index = i % items.length;
        const item = items[index];
        if (!item.controlClasses) {
          item.controlClasses = "control";
        }
        const itemStates = CP.classNamesToFlags(item.classes);
        return /* @__PURE__ */ wp.element.createElement(CP.Item, { tag: "li", className: item.classes, ...{ setAttributes, attributes }, itemKeys: ["items", index], key: index }, itemStates.hasLabel && /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: HeadingTag,
            className: "_label",
            onChange: (label) => {
              item.label = label;
              save();
            },
            value: item.label
          }
        ), /* @__PURE__ */ wp.element.createElement("ul", { className: "_items" }, item.items.map((subItem, subIndex) => {
          const subItemStates = CP.classNamesToFlags(subItem.classes);
          return /* @__PURE__ */ wp.element.createElement(
            CP.Item,
            {
              tag: "li",
              className: subItem.classes,
              set: () => {
                item.currentItemIndex = subIndex;
                save();
              },
              attr: item,
              items: item.items,
              index: subIndex,
              isSelected: isSelected && currentItemIndex == index && item.currentItemIndex == subIndex
            },
            /* @__PURE__ */ wp.element.createElement(
              RichText,
              {
                className: "_title",
                onChange: (title) => {
                  subItem.title = title;
                  save();
                },
                value: subItem.title
              }
            ),
            /* @__PURE__ */ wp.element.createElement("div", { className: "_line" }),
            /* @__PURE__ */ wp.element.createElement(
              RichText,
              {
                tagName: "div",
                className: "_amount",
                onChange: (amount) => {
                  subItem.amount = amount;
                  save();
                },
                value: subItem.amount
              }
            ),
            subItemStates.hasCaption && /* @__PURE__ */ wp.element.createElement(
              RichText,
              {
                tagName: "div",
                className: "_caption",
                onChange: (caption) => {
                  subItem.caption = caption;
                  save();
                },
                value: subItem.caption
              }
            )
          );
        })));
      }))))));
    },
    save({ attributes, className }) {
      const { InnerBlocks, RichText } = wp.blockEditor;
      const { items = [], classes = "", HeadingTag, SubHeadingTag, loopParam, loopCount, doLoop } = attributes;
      var classArray = _.uniq(classes.split(" "));
      var states = CP.classNamesToFlags(classes);
      let rtn = [];
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("ul", { className: classes }, items.map((item, index) => {
        const itemStates = CP.classNamesToFlags(item.classes);
        return /* @__PURE__ */ wp.element.createElement("li", { className: item.classes, key: index }, itemStates.hasLabel && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: HeadingTag, className: "_label", value: item.label }), /* @__PURE__ */ wp.element.createElement("ul", { className: "_items" }, item.items.map((subItem, subIndex) => {
          const subItemStates = CP.classNamesToFlags(subItem.classes);
          return /* @__PURE__ */ wp.element.createElement("li", { className: subItem.classes }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: SubHeadingTag, className: "_title", value: subItem.title }), /* @__PURE__ */ wp.element.createElement("div", { className: "_line" }), /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "div", className: "_amount", value: subItem.amount }), subItemStates.hasCaption && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "div", className: "caption", value: subItem.caption }));
        })));
      }))), doLoop && /* @__PURE__ */ wp.element.createElement("on-empty", null, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
