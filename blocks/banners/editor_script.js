(() => {
  // ../blocks/banners/editor_script.jsx
  var { __ } = wp.i18n;
  CP.config.banners = {
    devices: ["tb", "sp"],
    imageKeys: {
      image: {
        src: "src",
        alt: "alt",
        code: "imageCode",
        items: "items",
        sources: "sources"
      }
    },
    linkKeys: {
      link: { href: "linkUrl", items: "items" }
    }
  };
  wp.blocks.registerBlockType("catpow/banners", {
    title: "\u{1F43E} Banners",
    description: __("\u30EA\u30F3\u30AF\u4ED8\u304D\u306E\u30D0\u30CA\u30FC\u753B\u50CF\u3092\u4E26\u3079\u3066\u8868\u793A\u3059\u308B\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002", "catpow"),
    icon: "images-alt",
    category: "catpow",
    transforms: {
      from: [
        {
          type: "block",
          blocks: CP.listedConvertibles,
          transform: (attributes) => {
            attributes.classes = "wp-block-catpow-banners has-title";
            return wp.blocks.createBlock("catpow/banners", attributes);
          }
        }
      ]
    },
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useMemo } = wp.element;
      const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
      const { Icon, PanelBody, TextareaControl } = wp.components;
      const { isTemplate, classes, HeadingTag, vars, items = [], loopCount, imageCode, doLoop, device, EditMode = false, AltMode = false } = attributes;
      const states = CP.classNamesToFlags(classes);
      const { devices, imageKeys, linkKeys } = CP.config.banners;
      const selectiveClasses = useMemo(() => {
        var selectiveClasses2 = ["hasItemGap", { label: __("\u30BF\u30A4\u30C8\u30EB", "catpow"), values: "hasTitle" }, "isTemplate"];
        wp.hooks.applyFilters("catpow.blocks.banners.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const selectiveItemClasses = useMemo(() => {
        const { imageKeys: imageKeys2 } = CP.config.banners;
        const selectiveItemClasses2 = [
          {
            name: "image",
            input: "picture",
            label: __("\u753B\u50CF", "catpow"),
            keys: imageKeys2.image,
            devices
          },
          { name: "alt", input: "text", label: "alt", key: "alt" },
          { name: "target", input: "text", label: "target", key: "target" }
        ];
        wp.hooks.applyFilters("catpow.blocks.banners.selectiveItemClasses", CP.finderProxy(selectiveItemClasses2));
        return selectiveItemClasses2;
      }, []);
      const itemTemplateSelectiveClasses = [{ input: "text", label: __("\u753B\u50CF", "catpow"), key: "imageCode" }];
      const save = () => {
        setAttributes({ items: JSON.parse(JSON.stringify(items)) });
      };
      const blockProps = useBlockProps({ className: EditMode || AltMode && doLoop ? "cp-altcontent" : classes, style: vars });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.SelectModeToolbar, { setAttributes, attributes }), /* @__PURE__ */ wp.element.createElement(CP.SelectDeviceToolbar, { attributes, setAttributes, devices }), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: __("\u30B9\u30BF\u30A4\u30EB", "catpow"), icon: "art", ...{ setAttributes, attributes }, selectiveClasses }), isTemplate ? /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: __("\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8", "catpow"),
          icon: "edit",
          ...{ setAttributes, attributes },
          itemKeys: ["items", attributes.currentItemIndex],
          selectiveClasses: itemTemplateSelectiveClasses
        }
      ) : /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: __("\u30D0\u30CA\u30FC", "catpow"),
          icon: "edit",
          ...{ setAttributes, attributes },
          itemKeys: ["items", attributes.currentItemIndex],
          selectiveClasses: selectiveItemClasses
        }
      ), /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: __("\u30A4\u30D9\u30F3\u30C8", "catpow"), icon: "flag", ...{ setAttributes, attributes }, itemKeys: ["items", attributes.currentItemIndex], selectiveClasses: ["event"] })), EditMode ? /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(CP.Label, { icon: "edit" }), /* @__PURE__ */ wp.element.createElement(
        CP.EditItemsTable,
        {
          setAttributes,
          attributes,
          columns: [
            { type: "text", key: "title", cond: states.hasTitle },
            {
              type: "image",
              label: "image",
              keys: imageKeys.image,
              cond: true
            },
            { type: "text", key: "imageCode", cond: isTemplate },
            { type: "text", key: "alt", cond: true },
            { type: "text", key: "linkUrl", cond: true },
            { type: "text", key: "target", cond: true }
          ],
          isTemplate
        }
      )) : /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, AltMode && doLoop ? /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(CP.Label, { icon: "welcome-comments" }), /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)) : /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("ul", { ...blockProps }, [...Array(Math.max(items.length, loopCount)).keys()].map((i) => {
        const index = i % items.length;
        const item = items[index];
        if (!item.controlClasses) {
          item.controlClasses = "control";
        }
        return /* @__PURE__ */ wp.element.createElement(CP.Item, { className: "_item", tag: "li", ...{ setAttributes, attributes }, itemKeys: ["items", index], key: index }, states.hasTitle && /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: HeadingTag,
            className: "_title",
            onChange: (title) => {
              item.title = title;
              save();
            },
            value: item.title
          }
        ), /* @__PURE__ */ wp.element.createElement(CP.Link.Edit, { blockTypeName: "catpow/banners", className: "_link", attributes, setAttributes, keys: linkKeys.link, itemKeys: ["items", index] }, /* @__PURE__ */ wp.element.createElement(
          CP.SelectResponsiveImage,
          {
            className: "_image",
            attributes,
            setAttributes,
            keys: imageKeys.image,
            itemKeys: ["items", index],
            devices,
            device: device === "pc" ? null : device,
            isTemplate
          }
        )));
      })))));
    },
    save({ attributes }) {
      const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;
      const { isTemplate, classes, HeadingTag, vars, items = [], loopParam, doLoop } = attributes;
      const states = CP.classNamesToFlags(classes);
      const { devices, imageKeys, linkKeys } = CP.config.banners;
      const blockProps = useBlockProps.save({
        className: classes,
        style: vars
      });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("ul", { ...blockProps }, items.map((item, index) => {
        return /* @__PURE__ */ wp.element.createElement("li", { className: item.classes, key: index }, states.hasTitle && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: HeadingTag, className: "_title", value: item.title }), /* @__PURE__ */ wp.element.createElement(CP.Link, { blockTypeName: "catpow/banners", className: "_link", attributes, keys: linkKeys.link, itemKeys: ["items", index] }, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { className: "_image", size: "regular_banner", attributes, keys: imageKeys.image, itemKeys: ["items", index], devices, isTemplate })));
      }))), doLoop && /* @__PURE__ */ wp.element.createElement("on-empty", null, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
