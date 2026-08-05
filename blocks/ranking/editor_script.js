(() => {
  // ../blocks/ranking/editor_script.jsx
  var { __ } = wp.i18n;
  var blockClass = "wp-block-catpow-ranking";
  var config = CP.config.ranking = {
    imageKeys: {
      image: { src: "src", alt: "alt", items: "items" }
    },
    linkKeys: {
      link: { items: "items", href: "linkUrl" }
    }
  };
  wp.blocks.registerBlockType("catpow/ranking", {
    title: "\u{1F43E} Ranking",
    description: __("\u30E9\u30F3\u30AD\u30F3\u30B0\u306E\u4E00\u89A7\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002", "catpow"),
    icon: "awards",
    category: "catpow",
    transforms: {
      from: [
        {
          type: "block",
          blocks: CP.listedConvertibles,
          transform: (attributes) => {
            attributes.classes = "wp-block-catpow-ranking";
            if (!attributes.rankPrefix) {
              attributes.rankPrefix = "Step.";
            }
            return wp.blocks.createBlock("catpow/ranking", attributes);
          }
        }
      ]
    },
    attributes: {
      version: { type: "number", default: 0 },
      classes: { source: "attribute", selector: `.${blockClass}`, attribute: "class", default: `${blockClass} is-level3 has-content-width has-item-size-medium is-type-card has-rank has-rate` },
      contentsClasses: { source: "attribute", selector: `.${blockClass}__item-contents`, attribute: "class", default: `${blockClass}__item-contents is-level4` },
      vars: { type: "object" },
      HeadingTag: { type: "string", default: "h3" },
      SubHeadingTag: { type: "string", default: "h4" },
      items: {
        source: "query",
        selector: `.${blockClass}__item`,
        query: {
          classes: { source: "attribute", attribute: "class" },
          title: { source: "html", selector: `.${blockClass}__item-header-text-title` },
          titleCaption: { source: "html", selector: `.${blockClass}__item-header-text-caption` },
          rate: { source: "attribute", attribute: "value", selector: `.${blockClass}__item-header-rate-data` },
          src: { source: "attribute", selector: `.${blockClass}__item-image [src]`, attribute: "src" },
          alt: { source: "attribute", selector: `.${blockClass}__item-image [src]`, attribute: "alt" },
          lead: { source: "html", selector: `.${blockClass}__item-contents-lead` },
          text: { source: "html", selector: `.${blockClass}__item-contents-text` },
          linkUrl: { source: "attribute", selector: `.${blockClass}__item-contents-link`, attribute: "href" },
          linkText: { source: "text", selector: `.${blockClass}__item-contents-link` }
        },
        default: [...Array(3)].map(() => {
          return {
            classes: `${blockClass}__item`,
            title: ["Title"],
            titleCaption: ["Caption"],
            rate: 3,
            lead: ["Lead"],
            src: wpinfo.theme_url + "/images/dummy.jpg",
            alt: "dummy",
            text: ["Text"],
            linkUrl: wpinfo.home_url,
            linkText: "Read More"
          };
        })
      },
      rankPrefix: { source: "text", selector: `.${blockClass}__item-header-rank-prefix`, default: __("\u7B2C", "catpow") },
      rankStart: { source: "attribute", attribute: "value", selector: `.${blockClass}__item-header-rank-number`, default: "1" },
      rankSuffix: { source: "text", selector: `.${blockClass}__item-header-rank-suffix`, default: __("\u4F4D", "catpow") },
      rateLabel: { source: "text", selector: `.${blockClass}__item-header-rate-label`, default: __("\u8A55\u4FA1", "catpow") }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useState, useMemo } = wp.element;
      const { BlockControls, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
      const { PanelBody, TextControl, TextareaControl, ToolbarGroup } = wp.components;
      const { items = [], classes = "", contentsClasses, vars, HeadingTag, SubHeadingTag, rankStart, rankPrefix, rankSuffix, rateLabel } = attributes;
      const primaryClass = "wp-block-catpow-ranking";
      const states = CP.classNamesToFlags(classes);
      const { imageKeys } = CP.config.ranking;
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          { name: "subHeadingTag", preset: "headingTag", key: "SubHeadingTag", label: __("\u526F\u898B\u51FA\u3057\u30BF\u30B0", "catpow"), classKey: "contentsClasses", cond: "hasLead" },
          { name: "contentsLevel", preset: "level", label: __("\u30B3\u30F3\u30C6\u30F3\u30C4\u30EC\u30D9\u30EB", "catpow"), classKey: "contentsClasses" },
          {
            name: "type",
            type: "buttons",
            label: __("\u30BF\u30A4\u30D7", "catpow"),
            values: { isTypeFlat: __("\u30D5\u30E9\u30C3\u30C8", "catpow"), isTypeCard: __("\u30AB\u30FC\u30C9", "catpow") }
          },
          {
            label: __("\u30E9\u30F3\u30AF", "catpow"),
            values: "hasRank",
            sub: [
              { label: __("\u524D\u7F6E\u30C6\u30AD\u30B9\u30C8", "catpow"), input: "text", key: "rankPrefix" },
              { label: __("\u958B\u59CB\u30E9\u30F3\u30AF", "catpow"), input: "text", key: "rankStart" },
              { label: __("\u5F8C\u7F6E\u30C6\u30AD\u30B9\u30C8", "catpow"), input: "text", key: "rankSuffix" }
            ]
          },
          { label: __("\u30EC\u30FC\u30C8", "catpow"), values: "hasRate", sub: [{ label: __("\u30E9\u30D9\u30EB", "catpow"), input: "text", key: "rateLabel" }] },
          { label: __("\u30BF\u30A4\u30C8\u30EB\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3", "catpow"), values: "hasTitleCaption" },
          { label: __("\u30EA\u30FC\u30C9\u6587", "catpow"), values: "hasLead" },
          { label: __("\u30EA\u30F3\u30AF", "catpow"), values: "hasLink" }
        ];
        wp.hooks.applyFilters("catpow.blocks.ranking.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const selectiveItemClasses = useMemo(() => {
        const selectiveItemClasses2 = ["color", { name: "rate", label: __("\u30EC\u30FC\u30C8", "catpow"), input: "range", key: "rate", min: 0, max: 5, step: 0.1 }];
        wp.hooks.applyFilters("catpow.blocks.ranking.selectiveItemClasses", CP.finderProxy(selectiveItemClasses2));
        return selectiveItemClasses2;
      }, []);
      const save = () => {
        setAttributes({ items: JSON.parse(JSON.stringify(items)) });
      };
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
      )), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: __("\u30B9\u30BF\u30A4\u30EB", "catpow"), icon: "art", ...{ setAttributes, attributes }, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: __("\u30A2\u30A4\u30C6\u30E0", "catpow"), icon: "edit", ...{ setAttributes, attributes }, itemKeys: ["items", attributes.currentItemIndex], selectiveClasses: selectiveItemClasses }), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("ul", { ...useBlockProps({ className: classes, style: vars }) }, items.map((item, index) => {
        return /* @__PURE__ */ wp.element.createElement(CP.Item, { tag: "li", className: item.classes, ...{ setAttributes, attributes }, itemKeys: ["items", index], key: index }, /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement(CP.SelectResponsiveImage, { attributes, setAttributes, keys: imageKeys.image, itemKeys: ["items", index], size: "vga" })), /* @__PURE__ */ wp.element.createElement("header", { className: "_header" }, states.hasRank && /* @__PURE__ */ wp.element.createElement("div", { className: "_rank" }, rankPrefix && /* @__PURE__ */ wp.element.createElement("span", { className: "_prefix" }, rankPrefix), /* @__PURE__ */ wp.element.createElement("data", { className: "_number", value: index + parseInt(rankStart) }, index + parseInt(rankStart)), rankSuffix && /* @__PURE__ */ wp.element.createElement("span", { className: "_suffix" }, rankSuffix)), states.hasRate && /* @__PURE__ */ wp.element.createElement("div", { className: "_rate" }, rateLabel && /* @__PURE__ */ wp.element.createElement("span", { className: "_label" }, rateLabel), /* @__PURE__ */ wp.element.createElement("data", { className: "_data", value: item.rate, style: { "--rate": item.rate } }, /* @__PURE__ */ wp.element.createElement("span", { className: "_number" }, parseFloat(item.rate).toFixed(1)), /* @__PURE__ */ wp.element.createElement("span", { className: "_stars" }))), /* @__PURE__ */ wp.element.createElement("div", { className: "_text" }, /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: HeadingTag,
            className: "_title",
            onChange: (text) => {
              items[index].title = text;
              save();
            },
            value: item.title
          }
        ), states.hasTitleCaption && /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: "p",
            className: "_caption",
            onChange: (text) => {
              items[index].titleCaption = text;
              save();
            },
            value: item.titleCaption
          }
        ))), /* @__PURE__ */ wp.element.createElement("div", { className: contentsClasses }, states.hasLead && /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: SubHeadingTag,
            className: "_lead",
            onChange: (lead) => {
              items[index].lead = lead;
              save();
            },
            value: item.lead,
            placeholder: "lead"
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
        ), states.hasLink && /* @__PURE__ */ wp.element.createElement(CP.Link.Edit, { className: "_link", setAttributes, attributes, keys: config.linkKeys.link, itemKeys: ["items", index] }, /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            onChange: (linkText) => {
              items[index].linkText = linkText;
              save();
            },
            value: item.linkText
          }
        ))));
      }))));
    },
    save({ attributes, className }) {
      const { RichText } = wp.blockEditor;
      const { items = [], classes = "", contentsClasses, HeadingTag, SubHeadingTag, vars, rankStart, rankPrefix, rankSuffix, rateLabel } = attributes;
      const states = CP.classNamesToFlags(classes);
      const { imageKeys } = CP.config.ranking;
      return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("ul", { className: classes, style: vars }, items.map((item, index) => /* @__PURE__ */ wp.element.createElement("li", { className: item.classes, key: index }, /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement("img", { src: item.src, alt: item.alt })), /* @__PURE__ */ wp.element.createElement("header", { className: "_header" }, states.hasRank && /* @__PURE__ */ wp.element.createElement("div", { className: "_rank" }, rankPrefix && /* @__PURE__ */ wp.element.createElement("span", { className: "_prefix" }, rankPrefix), /* @__PURE__ */ wp.element.createElement("data", { className: "_number", value: index + parseInt(rankStart) }, index + parseInt(rankStart)), rankSuffix && /* @__PURE__ */ wp.element.createElement("span", { className: "_suffix" }, rankSuffix)), states.hasRate && /* @__PURE__ */ wp.element.createElement("div", { className: "_rate" }, rateLabel && /* @__PURE__ */ wp.element.createElement("span", { className: "_label" }, rateLabel), /* @__PURE__ */ wp.element.createElement("data", { className: "_data", value: item.rate, style: { "--rate": item.rate } }, /* @__PURE__ */ wp.element.createElement("span", { className: "_number" }, parseFloat(item.rate).toFixed(1)), /* @__PURE__ */ wp.element.createElement("span", { className: "_stars" }))), /* @__PURE__ */ wp.element.createElement("div", { className: "_text" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: HeadingTag, className: "_title", value: item.title }), states.hasTitleCaption && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "p", className: "_caption", value: item.titleCaption }))), /* @__PURE__ */ wp.element.createElement("div", { className: contentsClasses }, states.hasLead && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: SubHeadingTag, className: "_lead", value: item.lead }), /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "p", className: "_text", value: item.text }), states.hasLink && item.linkUrl && /* @__PURE__ */ wp.element.createElement(CP.Link, { className: "_link", attributes, keys: config.linkKeys.link, itemKeys: ["items", index] }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.linkText })))))));
    }
  });
})();
