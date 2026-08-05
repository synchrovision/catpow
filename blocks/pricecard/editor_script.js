(() => {
  // ../blocks/pricecard/editor_script.jsx
  var { __ } = wp.i18n;
  CP.config.pricecard = {
    imageKeys: {
      image: { src: "src", alt: "alt", code: "imageCode", items: "items" }
    }
  };
  wp.blocks.registerBlockType("catpow/pricecard", {
    title: "\u{1F43E} PriceCard",
    description: __("\u30B5\u30FC\u30D3\u30B9\u30FB\u5546\u54C1\u60C5\u5831\u306E\u4E00\u89A7\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002", "catpow"),
    icon: "index-card",
    category: "catpow",
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { Fragment, useMemo } = wp.element;
      const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
      const { Icon, PanelBody, TextareaControl } = wp.components;
      const {
        isTemplate,
        items = [],
        classes = "",
        vars,
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
          { name: "subHeadingTag", preset: "headingTag", key: "SubHeadingTag", label: __("\u526F\u898B\u51FA\u3057\u30BF\u30B0", "catpow"), classKey: "contentsClasses", cond: "hasSubTitle" },
          { name: "contentsLevel", preset: "level", label: __("\u30B3\u30F3\u30C6\u30F3\u30C4\u30EC\u30D9\u30EB", "catpow"), classKey: "contentsClasses" },
          { name: "headerColorScheme", preset: "colorScheme", label: __("\u30D8\u30C3\u30C0\u914D\u8272", "catpow"), classKey: "headerClasses" },
          { name: "contentsColorScheme", preset: "colorScheme", label: __("\u30B3\u30F3\u30C6\u30F3\u30C4\u914D\u8272", "catpow"), classKey: "contentsClasses" },
          { input: "text", label: __("\u4FA1\u683C\u5358\u4F4D", "catpow"), key: "priceUnit" },
          {
            type: "radio",
            label: __("\u5358\u4F4D\u306E\u4F4D\u7F6E", "catpow"),
            values: { hasUnitBefore: __("\u524D", "catpow"), hasUnitAfter: __("\u5F8C", "catpow") }
          },
          { label: __("\u30BF\u30A4\u30C8\u30EB", "catpow"), values: "hasTitle" },
          { label: __("\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3", "catpow"), values: "hasTitleCaption" },
          {
            label: __("\u30EA\u30F3\u30AF", "catpow"),
            values: "hasLink",
            sub: [{ input: "text", label: __("\u30EA\u30F3\u30AF\u6587\u5B57\u5217", "catpow"), key: "linkText" }]
          },
          { label: __("\u753B\u50CF", "catpow"), values: "hasImage" },
          { label: __("\u30B5\u30D6\u30BF\u30A4\u30C8\u30EB", "catpow"), values: "hasSubTitle" },
          { label: __("\u30C6\u30AD\u30B9\u30C8", "catpow"), values: "hasText" },
          { label: __("\u30B9\u30DA\u30C3\u30AF", "catpow"), values: "hasSpec" },
          "isTemplate"
        ];
        wp.hooks.applyFilters("catpow.blocks.pricecard.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const itemSelectiveClasses = useMemo(() => {
        const itemSelectiveClasses2 = [
          "color",
          {
            label: __("\u30BF\u30A4\u30D7", "catpow"),
            values: {
              isTypeNormal: __("\u901A\u5E38", "catpow"),
              isTypeRecommended: __("\u304A\u3059\u3059\u3081", "catpow"),
              isTypeDeprecated: __("\u975E\u63A8\u5968", "catpow"),
              isTypeCheap: __("\u5B89\u4FA1", "catpow"),
              isTypeExpensive: __("\u9AD8\u7D1A", "catpow")
            }
          },
          { label: __("\u5024\u5F15\u304D", "catpow"), values: "isDiscount" },
          {
            label: __("\u753B\u50CF\u30B3\u30FC\u30C9", "catpow"),
            input: "text",
            key: "imageCode",
            cond: isTemplate
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.pricecard.selectiveItemClasses", CP.finderProxy(itemSelectiveClasses2));
        return itemSelectiveClasses2;
      }, []);
      const save = () => {
        setAttributes({ items: JSON.parse(JSON.stringify(items)) });
      };
      const blockProps = useBlockProps({ className: EditMode || AltMode && doLoop ? "cp-altcontent" : classes, style: vars });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.SelectModeToolbar, { setAttributes, attributes }), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: __("\u30AF\u30E9\u30B9", "catpow"), icon: "art", ...{ setAttributes, attributes }, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: __("\u30A2\u30A4\u30C6\u30E0", "catpow"), icon: "edit", ...{ setAttributes, attributes }, itemKeys: ["items", attributes.currentItemIndex], selectiveClasses: itemSelectiveClasses }), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: __("\u30AF\u30E9\u30B9", "catpow"), onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes }))), attributes.EditMode ? /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(CP.Label, { icon: "edit" }), /* @__PURE__ */ wp.element.createElement(
        CP.EditItemsTable,
        {
          setAttributes,
          attributes,
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
              cond: states.hasImage && isTemplate
            },
            { type: "text", key: "subTitle", cond: states.hasSubTitle },
            { type: "text", key: "text", cond: states.hasText },
            { type: "text", key: "listPrice", cond: true },
            { type: "text", key: "salePrice", cond: true },
            { type: "text", key: "linkUrl", cond: states.hasLink }
          ],
          isTemplate
        }
      )) : /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, AltMode && doLoop ? /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(CP.Label, { icon: "welcome-comments" }), /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)) : /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("ul", { ...blockProps }, [...Array(Math.max(items.length, loopCount)).keys()].map((i) => {
        const index = i % items.length;
        const item = items[index];
        const itemStates = CP.classNamesToFlags(item.classes);
        return /* @__PURE__ */ wp.element.createElement(CP.Item, { tag: "li", className: item.classes, ...{ setAttributes, attributes }, itemKeys: ["items", index], key: index }, states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement(
          CP.SelectResponsiveImage,
          {
            attributes,
            setAttributes,
            keys: imageKeys.image,
            itemKeys: ["items", index],
            size: "vga",
            isTemplate
          }
        )), /* @__PURE__ */ wp.element.createElement("header", { className: headerClasses }, /* @__PURE__ */ wp.element.createElement("div", { className: "_text" }, states.hasTitle && /* @__PURE__ */ wp.element.createElement(
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
        })), states.hasLink && /* @__PURE__ */ wp.element.createElement(CP.Link.Edit, { className: "_link", setAttributes, attributes, keys: { href: "linkUrl", items: "items" }, itemKeys: ["items", index] }, linkText)));
      })))));
    },
    save({ attributes, className }) {
      const { Fragment } = wp.element;
      const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;
      const { isTemplate, items = [], classes = "", vars, headerClasses, contentsClasses = "", HeadingTag, SubHeadingTag, priceUnit, priceCaption, linkText, loopCount, doLoop } = attributes;
      const { imageKeys } = CP.config.pricecard;
      const states = CP.classNamesToFlags(classes);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("ul", { ...useBlockProps.save({ className: classes, style: vars }) }, items.map((item, index) => {
        const itemStates = CP.classNamesToFlags(item.classes);
        return /* @__PURE__ */ wp.element.createElement("li", { className: item.classes, key: index }, states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { attributes, keys: imageKeys.image, itemKeys: ["items", index], size: "vga", isTemplate })), /* @__PURE__ */ wp.element.createElement("header", { className: headerClasses }, /* @__PURE__ */ wp.element.createElement("div", { className: "_text" }, states.hasTitle && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: HeadingTag, className: "_title", value: item.title }), states.hasTitle && states.hasTitleCaption && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "p", className: "_caption", value: item.titleCaption }), /* @__PURE__ */ wp.element.createElement("div", { className: "_price" }, itemStates.isDiscount && /* @__PURE__ */ wp.element.createElement("span", { className: "_listprice" }, states.hasUnitBefore && /* @__PURE__ */ wp.element.createElement("span", { className: "_unit" }, priceUnit), /* @__PURE__ */ wp.element.createElement("span", { className: "_number" }, item.listPrice), states.hasUnitAfter && /* @__PURE__ */ wp.element.createElement("span", { className: "_unit" }, priceUnit)), /* @__PURE__ */ wp.element.createElement("span", { className: "_saleprice" }, states.hasUnitBefore && /* @__PURE__ */ wp.element.createElement("span", { className: "_unit" }, priceUnit), /* @__PURE__ */ wp.element.createElement("span", { className: "_number" }, item.salePrice), states.hasUnitAfter && /* @__PURE__ */ wp.element.createElement("span", { className: "_unit" }, priceUnit)), /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "span", className: "_caption", value: priceCaption })))), (states.hasSubTitle || states.hasText || states.hasSpec || states.hasLink) && /* @__PURE__ */ wp.element.createElement("div", { className: contentsClasses }, states.hasSubTitle && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: SubHeadingTag, className: "_subtitle", value: item.subTitle }), states.hasText && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "p", className: "_text", value: item.text }), states.hasSpec && /* @__PURE__ */ wp.element.createElement("dl", { className: "_spec" }, item.specLabels.map((label, specIndex) => /* @__PURE__ */ wp.element.createElement(Fragment, { key: specIndex }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "dt", className: "_label", value: items[index].specLabels[specIndex].text }), /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "dd", className: "_value", value: items[index].specValues[specIndex].text })))), states.hasLink && /* @__PURE__ */ wp.element.createElement(CP.Link, { className: "_link", attributes, keys: { href: "linkUrl", items: "items" }, itemKeys: ["items", index] }, linkText)));
      }))), doLoop && /* @__PURE__ */ wp.element.createElement("on-empty", null, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
