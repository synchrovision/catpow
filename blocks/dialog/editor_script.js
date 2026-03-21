(() => {
  // ../blocks/dialog/editor_script.jsx
  var { __ } = wp.i18n;
  wp.blocks.registerBlockType("catpow/dialog", {
    title: "\u{1F43E} Dialog",
    description: "\u30D5\u30AD\u30C0\u30B7\u3067\u4F1A\u8A71\u3092\u8868\u73FE\u3059\u308B\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002",
    icon: "format-chat",
    category: "catpow",
    transforms: {
      from: [
        {
          type: "block",
          blocks: CP.listedConvertibles,
          transform: (attributes) => {
            attributes.classes = "wp-block-catpow-dialog";
            return wp.blocks.createBlock("catpow/dialog", attributes);
          }
        }
      ]
    },
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useState, useMemo, useEffect } = wp.element;
      const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
      const { PanelBody, TextareaControl } = wp.components;
      const { items = [], classes = "", loopCount, doLoop, EditMode = false, AltMode = false } = attributes;
      var states = CP.classNamesToFlags(classes);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = ["level", "hasContentWidth", "isTemplate"];
        wp.hooks.applyFilters("catpow.blocks.dialog.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const selectiveItemClasses = useMemo(() => {
        const selectiveItemClasses2 = [{ name: "type", label: "\u30BF\u30A4\u30D7", type: "buttons", values: { isTypeTalk: "talk", isTypeShout: "shout", isTypeThink: "think" } }, "itemAlign", "color"];
        wp.hooks.applyFilters("catpow.blocks.dialog.selectiveItemClasses", CP.finderProxy(selectiveItemClasses2));
        return selectiveItemClasses2;
      }, []);
      const imageKeys = {
        headerImage: {
          src: "headerImageSrc",
          alt: "headerImageAlt",
          code: "headerImageCode",
          items: "items"
        }
      };
      const blockProps = useBlockProps({ className: EditMode || AltMode && doLoop ? "cp-altcontent" : classes });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.SelectModeToolbar, { set: setAttributes, attr: attributes }), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: "\u30AF\u30E9\u30B9", onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes })), /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", set: setAttributes, attr: attributes, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30EA\u30B9\u30C8\u30A2\u30A4\u30C6\u30E0", icon: "edit", set: setAttributes, attr: attributes, items, index: attributes.currentItemIndex, selectiveClasses: selectiveItemClasses }), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, EditMode ? /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(CP.Label, { icon: "edit" }), /* @__PURE__ */ wp.element.createElement(
        CP.EditItemsTable,
        {
          set: setAttributes,
          attr: attributes,
          columns: [
            {
              type: "image",
              label: "header",
              keys: imageKeys.headerImage,
              cond: true
            },
            {
              type: "text",
              key: "headerImageCode",
              cond: states.isTemplate
            },
            { type: "text", key: "title", cond: true },
            { type: "text", key: "text", cond: true }
          ],
          isTemplate: states.isTemplate
        }
      )) : /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, AltMode && doLoop ? /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(CP.Label, { icon: "welcome-comments" }), /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)) : /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("ul", { ...blockProps }, [...Array(Math.max(items.length, loopCount)).keys()].map((i) => {
        const index = i % items.length;
        const item = items[index];
        if (!item.controlClasses) {
          item.controlClasses = "control";
        }
        return /* @__PURE__ */ wp.element.createElement(CP.Item, { tag: "li", className: item.classes, set: setAttributes, attr: attributes, items, index, isSelected, key: index }, /* @__PURE__ */ wp.element.createElement("header", { className: "_header" }, /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement(
          CP.SelectResponsiveImage,
          {
            className: "_img",
            attr: attributes,
            set: setAttributes,
            keys: imageKeys.headerImage,
            index,
            size: "thumbnail",
            isTemplate: states.isTemplate
          }
        )), /* @__PURE__ */ wp.element.createElement("div", { className: "_text" }, /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: "h3",
            className: "_heading",
            onChange: (text) => {
              items[index].title = text;
              setAttributes({ items: [...items] });
            },
            value: item.title
          }
        ))), /* @__PURE__ */ wp.element.createElement("div", { className: "_contents" }, /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: "p",
            className: "_text",
            onChange: (text) => {
              items[index].text = text;
              setAttributes({ items: [...items] });
            },
            value: item.text
          }
        )));
      }))))));
    },
    save({ attributes }) {
      const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;
      const { items = [], classes = "", doLoop } = attributes;
      var states = CP.classNamesToFlags(classes);
      const imageKeys = {
        headerImage: {
          src: "headerImageSrc",
          alt: "headerImageAlt",
          code: "headerImageCode",
          items: "items"
        }
      };
      let rtn = [];
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("ul", { ...useBlockProps.save({ className: classes }) }, items.map((item, index) => {
        return /* @__PURE__ */ wp.element.createElement("li", { className: item.classes, key: index }, /* @__PURE__ */ wp.element.createElement("header", { className: "_header" }, /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { className: "_img", attr: attributes, keys: imageKeys.headerImage, index, isTemplate: states.isTemplate })), /* @__PURE__ */ wp.element.createElement("div", { className: "_text" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "h3", className: "_heading", value: item.title }))), /* @__PURE__ */ wp.element.createElement("div", { className: "_contents" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "p", className: "_text", value: item.text })));
      }))), doLoop && /* @__PURE__ */ wp.element.createElement("on-empty", null, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
