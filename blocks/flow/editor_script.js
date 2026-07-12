(() => {
  // ../blocks/flow/editor_script.jsx
  CP.config.flow = {
    imageKeys: {
      image: { src: "src", alt: "alt", items: "items" }
    },
    linkKeys: {
      link: { href: "linkUrl", items: "items" }
    }
  };
  wp.blocks.registerBlockType("catpow/flow", {
    title: "\u{1F43E} Flow",
    description: "\u624B\u9806\u3084\u9806\u756A\u306E\u4E00\u89A7\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002",
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
    attributes: {
      version: { type: "number", default: 0 },
      classes: {
        source: "attribute",
        selector: "ul",
        attribute: "class",
        default: "wp-block-catpow-flow is-type-flat has-counter"
      },
      vars: { type: "object", default: {} },
      HeadingTag: { type: "string", default: "h3" },
      SubHeadingTag: { type: "string", default: "h4" },
      items: {
        source: "query",
        selector: ".wp-block-catpow-flow__item",
        query: {
          classes: { source: "attribute", attribute: "class" },
          title: { source: "html", selector: ".wp-block-catpow-flow__item-texts-header-text-title" },
          titleCaption: { source: "html", selector: " .wp-block-catpow-flow__item-texts-header-text-caption" },
          src: {
            source: "attribute",
            selector: ".wp-block-catpow-flow__item-image [src]",
            attribute: "src"
          },
          alt: {
            source: "attribute",
            selector: ".wp-block-catpow-flow__item-image [src]",
            attribute: "alt"
          },
          subTitle: { source: "html", selector: ".wp-block-catpow-flow__item-texts-contents-subtitle" },
          text: { source: "html", selector: ".wp-block-catpow-flow__item-texts-contents-text" },
          linkUrl: {
            source: "attribute",
            selector: ".wp-block-catpow-flow__item-link",
            attribute: "href"
          }
        },
        default: [...Array(3)].map(() => {
          return {
            classes: "wp-block-catpow-flow__item",
            title: ["Title"],
            titleCaption: ["Caption"],
            subTitle: ["SubTitle"],
            src: wpinfo.theme_url + "/images/dummy.jpg",
            alt: "dummy",
            text: ["Text"],
            linkUrl: wpinfo.home_url
          };
        })
      },
      countPrefix: { source: "text", selector: ".wp-block-catpow-flow__item-texts-header-counter-prefix", default: "" },
      countSuffix: { source: "text", selector: ".wp-block-catpow-flow__item-texts-header-counter-suffix", default: "" },
      contentsClasses: { source: "attribute", selector: ".wp-block-catpow-flow__item-texts-contents", attribute: "class", default: "wp-block-catpow-flow__item-texts-contents is-level4" }
    },
    example: CP.example,
    edit({ attributes, setAttributes, isSelected }) {
      const { useMemo } = wp.element;
      const { BlockControls, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
      const { PanelBody, TextareaControl, ToolbarGroup } = wp.components;
      const { HeadingTag, SubHeadingTag, items = [], classes, vars, contentsClasses, countPrefix, countSuffix, EditMode } = attributes;
      const states = CP.classNamesToFlags(classes);
      const { imageKeys, linkKeys: linkKeys2 } = CP.config.flow;
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          {
            name: "type",
            type: "buttons",
            label: "\u30BF\u30A4\u30D7",
            values: { isTypeFlat: "\u30D5\u30E9\u30C3\u30C8", isTypeCard: "\u30AB\u30FC\u30C9", isTypeTimeline: "\u30BF\u30A4\u30E0\u30E9\u30A4\u30F3" }
          },
          "hasContentWidth",
          "hasMargin",
          { preset: "itemSize", cond: (states2) => states2.isTypeFlat || states2.isTypeTimeline },
          "headingTag",
          { name: "subHeadingTag", preset: "headingTag", key: "SubHeadingTag", label: "\u526F\u898B\u51FA\u3057\u30BF\u30B0", classKey: "contentsClasses", cond: "hasSubTitle" },
          "level",
          { name: "contentsLevel", preset: "level", label: "\u30B3\u30F3\u30C6\u30F3\u30C4\u30EC\u30D9\u30EB", classKey: "contentsClasses" },
          {
            name: "counter",
            label: "\u756A\u53F7",
            values: "hasCounter",
            sub: [
              {
                name: "countPrefix",
                input: "text",
                label: "\u756A\u53F7\u524D\u7F6E\u30C6\u30AD\u30B9\u30C8",
                key: "countPrefix"
              },
              {
                name: "countSuffix",
                input: "text",
                label: "\u756A\u53F7\u5F8C\u7F6E\u30C6\u30AD\u30B9\u30C8",
                key: "countSuffix"
              }
            ]
          },
          { name: "image", label: "\u753B\u50CF", values: "hasImage" },
          {
            name: "titleCaption",
            label: "\u30BF\u30A4\u30C8\u30EB\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3",
            values: "hasTitleCaption"
          },
          { name: "subTitle", label: "\u30B5\u30D6\u30BF\u30A4\u30C8\u30EB", values: "hasSubTitle" },
          { name: "link", label: "\u30EA\u30F3\u30AF", values: "hasLink" }
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
      )), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", ...{ setAttributes, attributes }, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: "\u30AF\u30E9\u30B9", onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes })), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), EditMode ? /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(CP.Label, { icon: "edit" }), /* @__PURE__ */ wp.element.createElement(
        CP.EditItemsTable,
        {
          set: setAttributes,
          attr: attributes,
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
          isTemplate: states.isTemplate
        }
      )) : /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("ul", { ...blockProps }, items.map((item, index) => {
        if (!item.controlClasses) {
          item.controlClasses = "control";
        }
        return /* @__PURE__ */ wp.element.createElement(CP.Item, { tag: "li", className: "_item", ...{ setAttributes, attributes }, itemKeys: ["items", index], key: index }, states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement(CP.SelectResponsiveImage, { attr: attributes, set: setAttributes, keys: imageKeys.image, index, size: "vga" })), /* @__PURE__ */ wp.element.createElement("div", { className: "_texts" }, /* @__PURE__ */ wp.element.createElement("header", { className: "_header" }, states.hasCounter && /* @__PURE__ */ wp.element.createElement("div", { className: "_counter" }, countPrefix && /* @__PURE__ */ wp.element.createElement("span", { className: "_prefix" }, countPrefix), /* @__PURE__ */ wp.element.createElement("span", { className: "_number" }, index + 1), countSuffix && /* @__PURE__ */ wp.element.createElement("span", { className: "_suffix" }, countSuffix)), /* @__PURE__ */ wp.element.createElement("div", { className: "_text" }, /* @__PURE__ */ wp.element.createElement(
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
        )), states.hasLink && /* @__PURE__ */ wp.element.createElement(CP.Link.Edit, { className: "_link", attr: attributes, set: setAttributes, keys: linkKeys2.link, index })));
      }))));
    },
    save({ attributes }) {
      const { RichText, useBlockProps } = wp.blockEditor;
      const { HeadingTag, SubHeadingTag, items = [], classes = "", vars, contentsClasses = "", countPrefix, countSuffix } = attributes;
      const states = CP.classNamesToFlags(classes);
      return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("ul", { ...useBlockProps.save({ className: classes, style: vars }) }, items.map((item, index) => {
        return /* @__PURE__ */ wp.element.createElement("li", { className: item.classes, key: index }, states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement("img", { src: item.src, alt: item.alt })), /* @__PURE__ */ wp.element.createElement("div", { className: "_texts" }, /* @__PURE__ */ wp.element.createElement("header", { className: "_header" }, states.hasCounter && /* @__PURE__ */ wp.element.createElement("div", { className: "_counter" }, countPrefix && /* @__PURE__ */ wp.element.createElement("span", { className: "_prefix" }, countPrefix), /* @__PURE__ */ wp.element.createElement("span", { className: "_number" }, index + 1), countSuffix && /* @__PURE__ */ wp.element.createElement("span", { className: "_suffix" }, countSuffix)), /* @__PURE__ */ wp.element.createElement("div", { className: "_text" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: HeadingTag, className: "_title", value: item.title }), states.hasTitleCaption && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "p", className: "_caption", value: item.titleCaption }))), /* @__PURE__ */ wp.element.createElement("div", { className: contentsClasses }, states.hasSubTitle && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: SubHeadingTag, className: "_subtitle", value: item.subTitle }), /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "p", className: "_text", value: item.text })), states.hasLink && item.linkUrl && /* @__PURE__ */ wp.element.createElement(CP.Link, { className: "_link", attr: attributes, keys: linkKeys.link, index })));
      })));
    }
  });
})();
