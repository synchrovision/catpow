(() => {
  // ../blocks/flow/editor_script.jsx
  var { __ } = wp.i18n;
  CP.config.flow = {
    imageKeys: {
      image: { src: "src", alt: "alt", items: "items" }
    },
    linkKeys: {
      link: { href: "linkUrl", items: "items" }
    }
  };
  wp.blocks.registerBlockType("catpow/flow", {
    icon: "editor-ol",
    category: "catpow",
    transforms: {
      from: [
        {
          type: "block",
          blocks: CP.listedConvertibles,
          transform: (attributes) => {
            attributes.classes = "wp-block-catpow-flow is-size-medium has-counter is-level3";
            if (!attributes.countPrefix) {
              attributes.countPrefix = "Step.";
            }
            return wp.blocks.createBlock("catpow/flow", attributes);
          }
        }
      ]
    },
    example: CP.example,
    edit({ attributes, setAttributes, isSelected }) {
      const { useMemo } = wp.element;
      const { BlockControls, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
      const { PanelBody, TextareaControl, ToolbarGroup } = wp.components;
      const { isTemplate, HeadingTag, SubHeadingTag, items = [], classes, vars, contentsClasses, countPrefix, countSuffix, EditMode } = attributes;
      const states = CP.classNamesToFlags(classes);
      const { imageKeys, linkKeys: linkKeys2 } = CP.config.flow;
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          {
            name: "type",
            type: "buttons",
            label: __("\u30BF\u30A4\u30D7", "catpow"),
            values: { isTypeFlat: __("\u30D5\u30E9\u30C3\u30C8", "catpow"), isTypeCard: __("\u30AB\u30FC\u30C9", "catpow"), isTypeTimeline: __("\u30BF\u30A4\u30E0\u30E9\u30A4\u30F3", "catpow") }
          },
          { preset: "itemSize", cond: (states2) => states2.isTypeFlat || states2.isTypeTimeline },
          { name: "subHeadingTag", preset: "headingTag", key: "SubHeadingTag", label: __("\u526F\u898B\u51FA\u3057\u30BF\u30B0", "catpow"), classKey: "contentsClasses", cond: "hasSubTitle" },
          { name: "contentsLevel", preset: "level", label: __("\u30B3\u30F3\u30C6\u30F3\u30C4\u30EC\u30D9\u30EB", "catpow"), classKey: "contentsClasses" },
          {
            name: "counter",
            label: __("\u756A\u53F7", "catpow"),
            values: "hasCounter",
            sub: [
              {
                name: "countPrefix",
                input: "text",
                label: __("\u756A\u53F7\u524D\u7F6E\u30C6\u30AD\u30B9\u30C8", "catpow"),
                key: "countPrefix"
              },
              {
                name: "countSuffix",
                input: "text",
                label: __("\u756A\u53F7\u5F8C\u7F6E\u30C6\u30AD\u30B9\u30C8", "catpow"),
                key: "countSuffix"
              }
            ]
          },
          { name: "image", label: __("\u753B\u50CF", "catpow"), values: "hasImage" },
          {
            name: "titleCaption",
            label: __("\u30BF\u30A4\u30C8\u30EB\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3", "catpow"),
            values: "hasTitleCaption"
          },
          { name: "subTitle", label: __("\u30B5\u30D6\u30BF\u30A4\u30C8\u30EB", "catpow"), values: "hasSubTitle" },
          { name: "link", label: __("\u30EA\u30F3\u30AF", "catpow"), values: "hasLink" }
        ];
        wp.hooks.applyFilters("catpow.blocks.flow.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const save = () => {
        setAttributes({ items: JSON.parse(JSON.stringify(items)) });
      };
      if (attributes.EditMode === void 0) {
        attributes.EditMode = false;
      }
      const blockProps = useBlockProps({ className: EditMode ? "cp-altcontent" : classes, style: vars });
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
      )), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: __("\u30AF\u30E9\u30B9", "catpow"), icon: "art", ...{ setAttributes, attributes }, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: __("\u30AF\u30E9\u30B9", "catpow"), onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes })), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), EditMode ? /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(CP.Label, { icon: "edit" }), /* @__PURE__ */ wp.element.createElement(
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
            { type: "text", key: "title" },
            {
              type: "text",
              key: "titleCaption",
              cond: states.hasTitleCaption
            },
            { type: "text", key: "subTitle", cond: states.hasSubTitle },
            { type: "text", key: "text" },
            { type: "text", key: "linkUrl", cond: states.hasLink }
          ],
          isTemplate
        }
      )) : /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("ul", { ...blockProps }, items.map((item, index) => {
        if (!item.controlClasses) {
          item.controlClasses = "control";
        }
        return /* @__PURE__ */ wp.element.createElement(CP.Item, { tag: "li", className: "_item", ...{ setAttributes, attributes }, itemKeys: ["items", index], key: index }, states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement(CP.SelectResponsiveImage, { attributes, setAttributes, keys: imageKeys.image, itemKeys: ["items", index], size: "vga" })), /* @__PURE__ */ wp.element.createElement("div", { className: "_texts" }, /* @__PURE__ */ wp.element.createElement("header", { className: "_header" }, states.hasCounter && /* @__PURE__ */ wp.element.createElement("div", { className: "_counter" }, countPrefix && /* @__PURE__ */ wp.element.createElement("span", { className: "_prefix" }, countPrefix), /* @__PURE__ */ wp.element.createElement("span", { className: "_number" }, index + 1), countSuffix && /* @__PURE__ */ wp.element.createElement("span", { className: "_suffix" }, countSuffix)), /* @__PURE__ */ wp.element.createElement("div", { className: "_text" }, /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            className: "_title",
            tagName: HeadingTag,
            onChange: (text) => {
              items[index].title = text;
              save();
            },
            value: item.title
          }
        ), states.hasTitleCaption && /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            className: "_caption",
            tagName: "p",
            onChange: (text) => {
              items[index].titleCaption = text;
              save();
            },
            value: item.titleCaption
          }
        ))), /* @__PURE__ */ wp.element.createElement("div", { className: contentsClasses }, states.hasSubTitle && /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            className: "_subtitle",
            tagName: SubHeadingTag,
            onChange: (subTitle) => {
              items[index].subTitle = subTitle;
              save();
            },
            value: item.subTitle,
            placeholder: "SubTitle"
          }
        ), /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: "p",
            className: "_text",
            onChange: (text) => {
              items[index].text = text;
              save();
            },
            value: item.text
          }
        )), states.hasLink && /* @__PURE__ */ wp.element.createElement(CP.Link.Edit, { className: "_link", attributes, setAttributes, keys: linkKeys2.link, itemKeys: ["items", index] })));
      }))));
    },
    save({ attributes }) {
      const { RichText, useBlockProps } = wp.blockEditor;
      const { HeadingTag, SubHeadingTag, items = [], classes = "", vars, contentsClasses = "", countPrefix, countSuffix } = attributes;
      const states = CP.classNamesToFlags(classes);
      return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("ul", { ...useBlockProps.save({ className: classes, style: vars }) }, items.map((item, index) => {
        return /* @__PURE__ */ wp.element.createElement("li", { className: item.classes, key: index }, states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement("img", { src: item.src, alt: item.alt })), /* @__PURE__ */ wp.element.createElement("div", { className: "_texts" }, /* @__PURE__ */ wp.element.createElement("header", { className: "_header" }, states.hasCounter && /* @__PURE__ */ wp.element.createElement("div", { className: "_counter" }, countPrefix && /* @__PURE__ */ wp.element.createElement("span", { className: "_prefix" }, countPrefix), /* @__PURE__ */ wp.element.createElement("span", { className: "_number" }, index + 1), countSuffix && /* @__PURE__ */ wp.element.createElement("span", { className: "_suffix" }, countSuffix)), /* @__PURE__ */ wp.element.createElement("div", { className: "_text" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: HeadingTag, className: "_title", value: item.title }), states.hasTitleCaption && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "p", className: "_caption", value: item.titleCaption }))), /* @__PURE__ */ wp.element.createElement("div", { className: contentsClasses }, states.hasSubTitle && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: SubHeadingTag, className: "_subtitle", value: item.subTitle }), /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "p", className: "_text", value: item.text })), states.hasLink && item.linkUrl && /* @__PURE__ */ wp.element.createElement(CP.Link, { className: "_link", attributes, keys: linkKeys.link, itemKeys: ["items", index] })));
      })));
    }
  });
})();
