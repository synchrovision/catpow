(() => {
  // ../blocks/pricelist/editor_script.jsx
  wp.blocks.registerBlockType("catpow/pricelist", {
    title: "\u{1F43E} PriceList",
    description: "\u4FA1\u683C\u8868\u306E\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002",
    icon: "editor-ul",
    category: "catpow",
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useState, useMemo } = wp.element;
      const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
      const { Icon, PanelBody, TextareaControl } = wp.components;
      const { items = [], classes, HeadingTag, vars, loopParam, loopCount, doLoop, EditMode = false, AltMode = false } = attributes;
      const primaryClass = "wp-block-catpow-pricelist";
      var states = CP.classNamesToFlags(classes);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = ["hasContentWidth", "hasMargin", "isTemplate"];
        wp.hooks.applyFilters("catpow.blocks.pricelist.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const selectiveItemClasses = useMemo(() => {
        const selectiveItemClasses2 = [
          { name: "heading", label: "\u898B\u51FA\u3057", values: "isHeading" },
          "level",
          { name: "indent", label: "\u30A4\u30F3\u30C7\u30F3\u30C8", type: "buttons", values: { hasIndent1: "1", hasIndent2: "2", hasIndent3: "3" } },
          { name: "image", label: "\u753B\u50CF", values: "hasImage" },
          { name: "caption", label: "\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3", values: "hasCaption" }
        ];
        wp.hooks.applyFilters("catpow.blocks.pricelist.selectiveItemClasses", CP.finderProxy(selectiveItemClasses2));
        return selectiveItemClasses2;
      }, []);
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
      const blockProps = useBlockProps({ className: EditMode || AltMode && doLoop ? "cp-altcontent" : classes, style: vars });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.SelectModeToolbar, { setAttributes, attributes }), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", ...{ setAttributes, attributes }, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: "\u30AF\u30E9\u30B9", onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes })), /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30EA\u30B9\u30C8\u30A2\u30A4\u30C6\u30E0", icon: "edit", ...{ setAttributes, attributes }, itemKeys: ["items", attributes.currentItemIndex], selectiveClasses: selectiveItemClasses }), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, EditMode ? /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(CP.Label, { icon: "edit" }), /* @__PURE__ */ wp.element.createElement(
        CP.EditItemsTable,
        {
          setAttributes,
          attributes,
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
            { type: "text", key: "title", cond: true },
            { type: "text", key: "caption", cond: true },
            { type: "text", key: "price", cond: true }
          ],
          isTemplate: states.isTemplate
        }
      )) : /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, AltMode && doLoop ? /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(CP.Label, { icon: "welcome-comments" }), /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)) : /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("ul", { ...blockProps }, [...Array(Math.max(items.length, loopCount)).keys()].map((i) => {
        const index = i % items.length;
        const item = items[index];
        const itemStates = CP.classNamesToFlags(item.classes);
        return /* @__PURE__ */ wp.element.createElement(CP.Item, { tag: "li", className: item.classes, ...{ setAttributes, attributes }, itemKeys: ["items", index], key: index }, itemStates.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement(CP.SelectResponsiveImage, { attr: attributes, set: setAttributes, keys: imageKeys.image, index, size: "vga" })), /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: "div",
            className: "_title",
            onChange: (title) => {
              item.title = title;
              save();
            },
            value: item.title,
            placeholder: "Title"
          }
        ), !itemStates.isHeading && /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { className: "_line" }), /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: "div",
            className: "_price",
            onChange: (price) => {
              item.price = price;
              save();
            },
            value: item.price,
            placeholder: "\xA50,000"
          }
        )), itemStates.hasCaption && /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: "div",
            className: "_caption",
            onChange: (caption) => {
              item.caption = caption;
              save();
            },
            value: item.caption,
            placeholder: "Caption"
          }
        ));
      }))))));
    },
    save({ attributes, className }) {
      const { InnerBlocks, RichText } = wp.blockEditor;
      const { items = [], classes = "", loopParam, loopCount, doLoop } = attributes;
      var classArray = _.uniq(classes.split(" "));
      var states = CP.classNamesToFlags(classes);
      const imageKeys = {
        image: { src: "imageSrc", alt: "imageAlt", items: "items" }
      };
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("ul", { className: classes }, items.map((item, index) => {
        const itemStates = CP.classNamesToFlags(item.classes);
        return /* @__PURE__ */ wp.element.createElement("li", { className: item.classes, key: index }, itemStates.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { attr: attributes, keys: imageKeys.image })), /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "div", className: "_title", value: item.title }), !itemStates.isHeading && /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { className: "_line" }), /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "div", className: "_price", value: item.price })), itemStates.hasCaption && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "div", className: "_caption", value: item.caption }));
      }))), doLoop && /* @__PURE__ */ wp.element.createElement("on-empty", null, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
