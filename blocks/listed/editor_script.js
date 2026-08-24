(() => {
  // node_modules/clsx/dist/clsx.mjs
  function r(e) {
    var t, f, n = "";
    if ("string" == typeof e || "number" == typeof e) n += e;
    else if ("object" == typeof e) if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else for (f in e) e[f] && (n && (n += " "), n += f);
    return n;
  }
  function clsx() {
    for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
    return n;
  }

  // ../blocks/listed/editor_script.jsx
  var { __ } = wp.i18n;
  CP.config.listed = {
    imageKeys: {
      image: { src: "src", alt: "alt", code: "imageCode", items: "items" },
      headerImage: {
        src: "headerImageSrc",
        alt: "headerImageAlt",
        code: "headerImageCode",
        items: "items"
      },
      subImage: {
        src: "subImageSrc",
        alt: "subImageAlt",
        code: "subImageCode",
        items: "items"
      }
    },
    linkKeys: {
      link: { href: "linkUrl", items: "items" }
    }
  };
  wp.blocks.registerBlockType("catpow/listed", {
    description: __("\u30B3\u30F3\u30C6\u30F3\u30C4\u4E00\u89A7\u306E\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002", "catpow"),
    transforms: {
      from: [
        {
          type: "block",
          blocks: CP.listedConvertibles,
          transform: (attributes) => {
            attributes.classes = "wp-block-catpow-listed menu medium hasHeader hasTitle hasTitleCaption hasImage hasText";
            return wp.blocks.createBlock("catpow/listed", attributes);
          }
        },
        {
          type: "block",
          blocks: ["catpow/datatable"],
          isMatch: ({ rows }) => {
            const block = wp.data.select("core/blocks").getBlockType("catpow/listed");
            return CP.isRowsConvertibleToItems(rows, block.attributes.items);
          },
          transform: (attributes) => {
            attributes.classes = "wp-block-catpow-listed menu medium hasHeader hasTitle hasTitleCaption hasImage hasText";
            const block = wp.data.select("core/blocks").getBlockType("catpow/listed");
            attributes.items = CP.convertRowsToItems(attributes.rows, block.attributes.items);
            return wp.blocks.createBlock("catpow/listed", attributes);
          }
        }
      ]
    },
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useState, useMemo } = wp.element;
      const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
      const { Icon, PanelBody, TextareaControl } = wp.components;
      const {
        isTemplate,
        vars,
        items = [],
        HeadingTag,
        classes = "",
        commonItemClasses = "",
        commonItemHeaderClasses = "",
        countPrefix,
        countSuffix,
        subCountPrefix,
        subCountSuffix,
        loopCount,
        doLoop,
        EditMode = false,
        AltMode = false
      } = attributes;
      const states = CP.classNamesToFlags(classes);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          {
            name: "type",
            label: __("\u30BF\u30A4\u30D7", "catpow"),
            filter: "type",
            type: "gridbuttons",
            values: { isTypeCard: __("\u30AB\u30FC\u30C9", "catpow"), isTypeFlat: __("\u30D5\u30E9\u30C3\u30C8", "catpow") },
            sub: {
              isTypeCard: [
                {
                  preset: "colorScheme",
                  label: __("\u30D8\u30C3\u30C0\u914D\u8272", "catpow"),
                  classKey: "commonItemHeaderClasses"
                },
                {
                  preset: "backgroundColor",
                  label: __("\u30D8\u30C3\u30C0\u80CC\u666F\u8272", "catpow"),
                  classKey: "commonItemHeaderClasses"
                },
                {
                  preset: "backgroundImage",
                  label: __("\u30A2\u30A4\u30C6\u30E0\u80CC\u666F\u753B\u50CF", "catpow"),
                  classKey: "commonItemClasses"
                }
              ]
            }
          },
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
          {
            name: "image",
            type: "buttons",
            label: __("\u753B\u50CF", "catpow"),
            values: {
              hasImage: __("\u5927", "catpow"),
              hasHeaderImage: __("\u5C0F", "catpow")
            }
          },
          {
            name: "titleCaption",
            label: __("\u30BF\u30A4\u30C8\u30EB\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3", "catpow"),
            values: "hasTitleCaption"
          },
          { name: "text", label: __("\u30C6\u30AD\u30B9\u30C8", "catpow"), values: "hasText" },
          { name: "hasLink", label: __("\u30EA\u30F3\u30AF", "catpow"), values: "hasLink" },
          "isTemplate"
        ];
        wp.hooks.applyFilters("catpow.blocks.listed.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const selectiveItemTemplateClasses = useMemo(() => {
        const selectiveItemTemplateClasses2 = [
          "color",
          {
            name: "imageCode",
            input: "text",
            label: __("\u753B\u50CF\u30B3\u30FC\u30C9", "catpow"),
            key: "imageCode",
            cond: "hasImage"
          },
          {
            name: "headerImageCode",
            input: "text",
            label: __("\u30D8\u30C3\u30C0\u753B\u50CF\u30B3\u30FC\u30C9", "catpow"),
            key: "headerImageCode",
            cond: "hasHeaderImage"
          },
          {
            name: "subImageCode",
            input: "text",
            label: __("\u30B5\u30D6\u753B\u50CF\u30B3\u30FC\u30C9", "catpow"),
            key: "subImageCode",
            cond: "hasSubImage"
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.listed.selectiveItemTemplateClasses", CP.finderProxy(selectiveItemTemplateClasses2));
        return selectiveItemTemplateClasses2;
      }, []);
      const save = () => {
        setAttributes({ items: JSON.parse(JSON.stringify(items)) });
      };
      const { imageKeys, linkKeys } = CP.config.listed;
      const blockProps = useBlockProps({ className: EditMode || AltMode && doLoop ? "cp-altcontent" : classes, style: vars });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.SelectModeToolbar, { setAttributes, attributes }), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: __("\u30B9\u30BF\u30A4\u30EB", "catpow"), icon: "art", ...{ setAttributes, attributes }, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: __("\u30EA\u30B9\u30C8\u30A2\u30A4\u30C6\u30E0", "catpow"),
          icon: "edit",
          ...{ setAttributes, attributes },
          itemKeys: ["items", attributes.currentItemIndex],
          selectiveClasses: [{ preset: "buttonParams", cond: states.hasLink }]
        }
      ), isTemplate && /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: __("\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8", "catpow"),
          icon: "edit",
          ...{ setAttributes, attributes },
          itemKeys: ["items", attributes.currentItemIndex],
          selectiveClasses: selectiveItemTemplateClasses
        }
      )), EditMode ? /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(CP.Label, { icon: "edit" }), /* @__PURE__ */ wp.element.createElement(
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
              cond: isTemplate && states.hasImage
            },
            {
              type: "image",
              label: "sub",
              keys: imageKeys.subImage,
              cond: states.hasSubImage
            },
            {
              type: "text",
              key: "subImageCode",
              cond: isTemplate && states.hasSubImage
            },
            {
              type: "image",
              label: "header",
              keys: imageKeys.headerImage,
              cond: states.hasHeaderImage
            },
            {
              type: "text",
              key: "headerImageCode",
              cond: isTemplate && states.hasHeaderImage
            },
            { type: "text", key: "title", cond: states.hasTitle },
            {
              type: "text",
              key: "titleCaption",
              cond: states.hasTitleCaption
            },
            { type: "text", key: "subTitle", cond: states.hasSubTitle },
            { type: "text", key: "text", cond: states.hasText },
            { type: "text", key: "linkText", cond: states.hasLink },
            { type: "text", key: "linkUrl", cond: states.hasLink }
          ],
          isTemplate
        }
      )) : /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, AltMode && doLoop ? /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(CP.Label, { icon: "welcome-comments" }), /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)) : /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("ul", { ...blockProps }, [...Array(Math.max(items.length, loopCount)).keys()].map((i) => {
        const index = i % items.length;
        const item = items[index];
        if (!item.controlClasses) {
          item.controlClasses = "control";
        }
        return /* @__PURE__ */ wp.element.createElement(CP.Item, { tag: "li", className: clsx("_item", item.classes, commonItemClasses), ...{ setAttributes, attributes }, itemKeys: ["items", index], key: i }, states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement(
          CP.SelectResponsiveImage,
          {
            className: "_img",
            attributes,
            setAttributes,
            keys: imageKeys.image,
            itemKeys: ["items", index],
            size: "vga",
            isTemplate
          }
        )), states.hasHeader && /* @__PURE__ */ wp.element.createElement("header", { className: clsx("_header", commonItemHeaderClasses) }, states.hasCounter && /* @__PURE__ */ wp.element.createElement("div", { className: "_counter" }, countPrefix && /* @__PURE__ */ wp.element.createElement("span", { className: "_prefix" }, countPrefix), /* @__PURE__ */ wp.element.createElement("span", { className: "_number" }, index + 1), countSuffix && /* @__PURE__ */ wp.element.createElement("span", { className: "_suffix" }, countSuffix)), states.hasHeaderImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement(
          CP.SelectResponsiveImage,
          {
            className: "_img",
            attributes,
            setAttributes,
            keys: imageKeys.headerImage,
            itemKeys: ["items", index],
            size: "thumbnail",
            isTemplate
          }
        )), /* @__PURE__ */ wp.element.createElement("div", { className: "_text" }, states.hasTitle && /* @__PURE__ */ wp.element.createElement(
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
        ), states.hasTitle && states.hasTitleCaption && /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: "p",
            className: "_caption",
            onChange: (titleCaption) => {
              item.titleCaption = titleCaption;
              save();
            },
            value: item.titleCaption
          }
        ))), (states.hasSubImage || states.hasSubTitle || states.hasText || states.hasLink) && /* @__PURE__ */ wp.element.createElement("div", { className: "_contents" }, states.hasSubCounter && /* @__PURE__ */ wp.element.createElement("div", { className: "_subcounter" }, subCountPrefix && /* @__PURE__ */ wp.element.createElement("span", { className: "_prefix" }, subCountPrefix), /* @__PURE__ */ wp.element.createElement("span", { className: "_number" }, index + 1), subCountSuffix && /* @__PURE__ */ wp.element.createElement("span", { className: "_suffix" }, subCountSuffix)), states.hasSubImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement(
          CP.SelectResponsiveImage,
          {
            className: "_img",
            attributes,
            setAttributes,
            keys: imageKeys.subImage,
            itemKeys: ["items", index],
            size: "medium",
            isTemplate
          }
        )), states.hasSubTitle && /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: "p",
            className: "_subtitle",
            onChange: (subTitle) => {
              item.subTitle = subTitle;
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
              item.text = text;
              save();
            },
            value: item.text
          }
        ), states.hasLink && /* @__PURE__ */ wp.element.createElement(CP.Button.Edit, { blockTypeName: "catpow/listed", ...{ setAttributes, attributes }, itemKeys: ["items", index] })));
      })))));
    },
    save({ attributes, className }) {
      const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;
      const { isTemplate, vars, items = [], HeadingTag, classes = "", commonItemClasses, commonItemHeaderClasses, countPrefix, countSuffix, subCountPrefix, subCountSuffix, doLoop } = attributes;
      const states = CP.classNamesToFlags(classes);
      const { imageKeys, linkKeys } = CP.config.listed;
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("ul", { ...useBlockProps.save({ className: classes, style: vars }) }, items.map((item, index) => /* @__PURE__ */ wp.element.createElement("li", { className: clsx("_item", item.classes, commonItemClasses), "data-class": item.classes, key: index }, states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { className: "_img", attributes, keys: imageKeys.image, itemKeys: ["items", index], isTemplate })), states.hasHeader && /* @__PURE__ */ wp.element.createElement("header", { className: clsx("_header", commonItemHeaderClasses) }, states.hasCounter && /* @__PURE__ */ wp.element.createElement("div", { className: "_counter" }, countPrefix && /* @__PURE__ */ wp.element.createElement("span", { className: "_prefix" }, countPrefix), /* @__PURE__ */ wp.element.createElement("span", { className: "_number" }, index + 1), countSuffix && /* @__PURE__ */ wp.element.createElement("span", { className: "_suffix" }, countSuffix)), states.hasHeaderImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { className: "_img", attributes, keys: imageKeys.headerImage, itemKeys: ["items", index], isTemplate })), /* @__PURE__ */ wp.element.createElement("div", { className: "_text" }, states.hasTitle && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: HeadingTag, className: "_title", value: item.title }), states.hasTitle && states.hasTitleCaption && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "p", className: "_caption", value: item.titleCaption }))), (states.hasSubImage || states.hasSubTitle || states.hasText || states.hasLink) && /* @__PURE__ */ wp.element.createElement("div", { className: "_contents" }, states.hasSubCounter && /* @__PURE__ */ wp.element.createElement("div", { className: "_subcounter" }, subCountPrefix && /* @__PURE__ */ wp.element.createElement("span", { className: "_prefix" }, subCountPrefix), /* @__PURE__ */ wp.element.createElement("span", { className: "_number" }, index + 1), subCountSuffix && /* @__PURE__ */ wp.element.createElement("span", { className: "_suffix" }, subCountSuffix)), states.hasSubImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { attributes, keys: imageKeys.subImage, itemKeys: ["items", index], isTemplate })), states.hasSubTitle && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "p", className: "_subtitle", value: item.subTitle }), states.hasText && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "p", className: "_text", value: item.text }), states.hasLink && /* @__PURE__ */ wp.element.createElement(CP.Button, { blockTypeName: "catpow/listed", attributes, keys: linkKeys.link, itemKeys: ["items", index] })))))), doLoop && /* @__PURE__ */ wp.element.createElement("on-empty", null, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
