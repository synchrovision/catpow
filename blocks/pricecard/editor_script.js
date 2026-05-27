(() => {
  // ../blocks/pricecard/editor_script.jsx
  CP.config.pricecard = {
    imageKeys: {
      image: { src: "src", alt: "alt", code: "imageCode", items: "items" }
    }
  };
  wp.blocks.registerBlockType("catpow/pricecard", {
    title: "\u{1F43E} PriceCard",
    description: "\u30B5\u30FC\u30D3\u30B9\u30FB\u5546\u54C1\u60C5\u5831\u306E\u4E00\u89A7\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002",
    icon: "index-card",
    category: "catpow",
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { Fragment, useMemo } = wp.element;
      const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
      const { Icon, PanelBody, TextareaControl } = wp.components;
      const {
        items = [],
        classes = "",
        headerClasses,
        contentsClasses = "",
        HeadingTag,
        SubHeadingTag,
        priceUnit,
        priceCaption,
        linkText,
        loopCount,
        doLoop,
        EditMode = false,
        AltMode = false
      } = attributes;
      const { imageKeys } = CP.config.pricecard;
      const states = CP.classNamesToFlags(classes);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          "headingTag",
          { name: "subHeadingTag", preset: "headingTag", key: "SubHeadingTag", label: "\u526F\u898B\u51FA\u3057\u30BF\u30B0", classKey: "contentsClasses", cond: "hasSubTitle" },
          "level",
          { name: "contentsLevel", preset: "level", label: "\u30B3\u30F3\u30C6\u30F3\u30C4\u30EC\u30D9\u30EB", classKey: "contentsClasses" },
          "hasContentWidth",
          "hasMargin",
          "itemSize",
          "color",
          { name: "headerColorScheme", preset: "colorScheme", label: "\u30D8\u30C3\u30C0\u914D\u8272", classKey: "headerClasses" },
          { name: "contentsColorScheme", preset: "colorScheme", label: "\u30B3\u30F3\u30C6\u30F3\u30C4\u914D\u8272", classKey: "contentsClasses" },
          { input: "text", label: "\u4FA1\u683C\u5358\u4F4D", key: "priceUnit" },
          {
            type: "radio",
            label: "\u5358\u4F4D\u306E\u4F4D\u7F6E",
            values: { hasUnitBefore: "\u524D", hasUnitAfter: "\u5F8C" }
          },
          { label: "\u30BF\u30A4\u30C8\u30EB", values: "hasTitle" },
          { label: "\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3", values: "hasTitleCaption" },
          {
            label: "\u30EA\u30F3\u30AF",
            values: "hasLink",
            sub: [{ input: "text", label: "\u30EA\u30F3\u30AF\u6587\u5B57\u5217", key: "linkText" }]
          },
          { label: "\u753B\u50CF", values: "hasImage" },
          { label: "\u30B5\u30D6\u30BF\u30A4\u30C8\u30EB", values: "hasSubTitle" },
          { label: "\u30C6\u30AD\u30B9\u30C8", values: "hasText" },
          { label: "\u30B9\u30DA\u30C3\u30AF", values: "hasSpec" },
          "isTemplate"
        ];
        wp.hooks.applyFilters("catpow.blocks.pricecard.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const itemSelectiveClasses = useMemo(() => {
        const itemSelectiveClasses2 = [
          "color",
          {
            label: "\u30BF\u30A4\u30D7",
            values: {
              isTypeNormal: "\u901A\u5E38",
              isTypeRecommended: "\u304A\u3059\u3059\u3081",
              isTypeDeprecated: "\u975E\u63A8\u5968",
              isTypeCheap: "\u5B89\u4FA1",
              isTypeExpensive: "\u9AD8\u7D1A"
            }
          },
          { label: "\u5024\u5F15\u304D", values: "isDiscount" },
          {
            label: "\u753B\u50CF\u30B3\u30FC\u30C9",
            input: "text",
            key: "imageCode",
            cond: states.isTemplate
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.pricecard.selectiveItemClasses", CP.finderProxy(itemSelectiveClasses2));
        return itemSelectiveClasses2;
      }, []);
      const save = () => {
        setAttributes({ items: JSON.parse(JSON.stringify(items)) });
      };
      const blockProps = useBlockProps({ className: EditMode || AltMode && doLoop ? "cp-altcontent" : classes });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.SelectModeToolbar, { set: setAttributes, attr: attributes }), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", set: setAttributes, attr: attributes, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30A2\u30A4\u30C6\u30E0", icon: "edit", set: setAttributes, attr: attributes, items, index: attributes.currentItemIndex, selectiveClasses: itemSelectiveClasses }), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: "\u30AF\u30E9\u30B9", onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes }))), attributes.EditMode ? /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(CP.Label, { icon: "edit" }), /* @__PURE__ */ wp.element.createElement(
        CP.EditItemsTable,
        {
          set: setAttributes,
          attr: attributes,
          columns: [
            { type: "text", key: "title", cond: states.hasTitle },
            {
              type: "text",
              key: "titleCaption",
              cond: states.hasTitleCaption
            },
            { type: "image", keys: imageKeys.image, cond: states.hasImage },
            {
              type: "text",
              key: "imageCode",
              cond: states.hasImage && states.isTemplate
            },
            { type: "text", key: "subTitle", cond: states.hasSubTitle },
            { type: "text", key: "text", cond: states.hasText },
            { type: "text", key: "listPrice", cond: true },
            { type: "text", key: "salePrice", cond: true },
            { type: "text", key: "linkUrl", cond: states.hasLink }
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
        return /* @__PURE__ */ wp.element.createElement(CP.Item, { tag: "li", className: item.classes, set: setAttributes, attr: attributes, items, index, isSelected, key: index }, states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement(CP.SelectResponsiveImage, { attr: attributes, set: setAttributes, keys: imageKeys.image, index, size: "vga", isTemplate: states.isTemplate })), /* @__PURE__ */ wp.element.createElement("header", { className: headerClasses }, /* @__PURE__ */ wp.element.createElement("div", { className: "_text" }, states.hasTitle && /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: HeadingTag,
            className: "_title",
            onChange: (text) => {
              items[index].title = text;
              save();
            },
            value: item.title,
            placeholder: "Title"
          }
        ), states.hasTitle && states.hasTitleCaption && /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: "p",
            className: "_caption",
            onChange: (text) => {
              items[index].titleCaption = text;
              save();
            },
            value: item.titleCaption,
            placeholder: "Caption"
          }
        ), /* @__PURE__ */ wp.element.createElement("div", { className: "_price" }, itemStates.isDiscount && /* @__PURE__ */ wp.element.createElement("span", { className: "_listprice" }, states.hasUnitBefore && /* @__PURE__ */ wp.element.createElement("span", { className: "_unit" }, priceUnit), /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: "span",
            className: "_number",
            onChange: (listPrice) => {
              items[index].listPrice = listPrice;
              save();
            },
            value: item.listPrice,
            placeholder: "0,000"
          }
        ), states.hasUnitAfter && /* @__PURE__ */ wp.element.createElement("span", { className: "_unit" }, priceUnit)), /* @__PURE__ */ wp.element.createElement("span", { className: "_saleprice" }, states.hasUnitBefore && /* @__PURE__ */ wp.element.createElement("span", { className: "_unit" }, priceUnit), /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: "span",
            className: "_number",
            onChange: (salePrice) => {
              items[index].salePrice = salePrice;
              save();
            },
            value: item.salePrice,
            placeholder: "0,000"
          }
        ), states.hasUnitAfter && /* @__PURE__ */ wp.element.createElement("span", { className: "_unit" }, priceUnit)), /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: "span",
            className: "_caption",
            onChange: (priceCaption2) => {
              setAttributes({ priceCaption: priceCaption2 });
            },
            value: priceCaption,
            placeholder: "Caption"
          }
        )))), (states.hasSubTitle || states.hasText || states.hasSpec || states.hasLink) && /* @__PURE__ */ wp.element.createElement("div", { className: contentsClasses }, states.hasSubTitle && /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: SubHeadingTag,
            className: "_subtitle",
            onChange: (subTitle) => {
              items[index].subTitle = subTitle;
              save();
            },
            value: item.subTitle,
            placeholder: "SubTitle"
          }
        ), states.hasText && /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: "p",
            className: "_text",
            onChange: (text) => {
              items[index].text = text;
              save();
            },
            value: item.text,
            placeholder: "Text"
          }
        ), states.hasSpec && /* @__PURE__ */ wp.element.createElement("dl", { className: "_spec" }, item.specLabels.map((label, specIndex) => {
          return /* @__PURE__ */ wp.element.createElement(Fragment, { key: specIndex }, /* @__PURE__ */ wp.element.createElement(
            RichText,
            {
              tagName: "dt",
              className: "_label",
              onChange: (text) => {
                items[index].specLabels[specIndex].text = text;
                save();
              },
              value: items[index].specLabels[specIndex].text
            }
          ), /* @__PURE__ */ wp.element.createElement(
            RichText,
            {
              tagName: "dd",
              className: "_value",
              onChange: (text) => {
                items[index].specValues[specIndex].text = text;
                save();
              },
              value: items[index].specValues[specIndex].text
            }
          ));
        })), states.hasLink && /* @__PURE__ */ wp.element.createElement(CP.Link.Edit, { className: "_link", set: setAttributes, attr: attributes, keys: { href: "linkUrl", items: "items" }, index }, linkText)));
      })))));
    },
    save({ attributes, className }) {
      const { Fragment } = wp.element;
      const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;
      const { items = [], classes = "", headerClasses, contentsClasses = "", HeadingTag, SubHeadingTag, priceUnit, priceCaption, linkText, loopCount, doLoop } = attributes;
      const { imageKeys } = CP.config.pricecard;
      const states = CP.classNamesToFlags(classes);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("ul", { ...useBlockProps.save({ className: classes }) }, items.map((item, index) => {
        console.log(item);
        const itemStates = CP.classNamesToFlags(item.classes);
        return /* @__PURE__ */ wp.element.createElement("li", { className: item.classes, key: index }, states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { attr: attributes, keys: imageKeys.image, index, size: "vga", isTemplate: states.isTemplate })), /* @__PURE__ */ wp.element.createElement("header", { className: headerClasses }, /* @__PURE__ */ wp.element.createElement("div", { className: "_text" }, states.hasTitle && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: HeadingTag, className: "_title", value: item.title }), states.hasTitle && states.hasTitleCaption && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "p", className: "_caption", value: item.titleCaption }), /* @__PURE__ */ wp.element.createElement("div", { className: "_price" }, itemStates.isDiscount && /* @__PURE__ */ wp.element.createElement("span", { className: "_listprice" }, states.hasUnitBefore && /* @__PURE__ */ wp.element.createElement("span", { className: "_unit" }, priceUnit), /* @__PURE__ */ wp.element.createElement("span", { className: "_number" }, item.listPrice), states.hasUnitAfter && /* @__PURE__ */ wp.element.createElement("span", { className: "_unit" }, priceUnit)), /* @__PURE__ */ wp.element.createElement("span", { className: "_saleprice" }, states.hasUnitBefore && /* @__PURE__ */ wp.element.createElement("span", { className: "_unit" }, priceUnit), /* @__PURE__ */ wp.element.createElement("span", { className: "_number" }, item.salePrice), states.hasUnitAfter && /* @__PURE__ */ wp.element.createElement("span", { className: "_unit" }, priceUnit)), /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "span", className: "_caption", value: priceCaption })))), (states.hasSubTitle || states.hasText || states.hasSpec || states.hasLink) && /* @__PURE__ */ wp.element.createElement("div", { className: contentsClasses }, states.hasSubTitle && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: SubHeadingTag, className: "_subtitle", value: item.subTitle }), states.hasText && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "p", className: "_text", value: item.text }), states.hasSpec && /* @__PURE__ */ wp.element.createElement("dl", { className: "_spec" }, item.specLabels.map((label, specIndex) => /* @__PURE__ */ wp.element.createElement(Fragment, { key: specIndex }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "dt", className: "_label", value: items[index].specLabels[specIndex].text }), /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "dd", className: "_value", value: items[index].specValues[specIndex].text })))), states.hasLink && /* @__PURE__ */ wp.element.createElement(CP.Link, { className: "_link", attr: attributes, keys: { href: "linkUrl", items: "items" }, index }, linkText)));
      }))), doLoop && /* @__PURE__ */ wp.element.createElement("on-empty", null, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
