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
    }
  };
  wp.blocks.registerBlockType("catpow/listed", {
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
      const { InnerBlocks, InspectorControls, RichText: RichText2, useBlockProps } = wp.blockEditor;
      const { Icon, PanelBody, TextareaControl } = wp.components;
      const {
        vars,
        items = [],
        HeadingTag,
        classes: classes2 = "",
        commonItemClasses = "",
        countPrefix,
        countSuffix,
        subCountPrefix,
        subCountSuffix,
        loopCount,
        doLoop,
        EditMode = false,
        AltMode = false
      } = attributes;
      var classArray = _.uniq((className + " " + classes2).split(" "));
      var states = CP.classNamesToFlags(classes2);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          "headingTag",
          "level",
          {
            name: "type",
            label: "\u30BF\u30A4\u30D7",
            filter: "type",
            type: "gridbuttons",
            values: {
              isTypeOrderd: "\u9023\u756A\u30EA\u30B9\u30C8",
              isTypeNews: "\u304A\u77E5\u3089\u305B",
              isTypeIndex: "\u76EE\u6B21",
              isTypeMenu: "\u30E1\u30CB\u30E5\u30FC"
            },
            sub: {
              isTypeOrderd: [
                { name: "image", label: "\u753B\u50CF", values: "hasImage" },
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
                },
                {
                  name: "titleCaption",
                  label: "\u30BF\u30A4\u30C8\u30EB\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3",
                  values: "hasTitleCaption"
                },
                {
                  name: "subTitle",
                  label: "\u30B5\u30D6\u30BF\u30A4\u30C8\u30EB",
                  values: "hasSubTitle"
                },
                { name: "link", label: "\u30EA\u30F3\u30AF", values: "hasLink" }
              ],
              isTypeNews: [{ name: "link", label: "\u30EA\u30F3\u30AF", values: "hasLink" }],
              isTypeIndex: ["itemSize"],
              isTypeMenu: [
                "itemSize",
                "colorScheme",
                {
                  preset: "backgroundImage",
                  classKey: "commonItemClasses"
                },
                {
                  name: "image",
                  type: "buttons",
                  label: "\u753B\u50CF",
                  values: {
                    noImage: "\u306A\u3057",
                    hasImage: "\u5927",
                    hasHeaderImage: "\u5C0F"
                  }
                },
                {
                  name: "titleCaption",
                  label: "\u30BF\u30A4\u30C8\u30EB\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3",
                  values: "hasTitleCaption"
                },
                { name: "text", label: "\u30C6\u30AD\u30B9\u30C8", values: "hasText" },
                { name: "link", label: "\u30EA\u30F3\u30AF", values: "hasLink" }
              ]
            },
            bind: {
              isTypeOrderd: ["hasHeader", "hasCounter", "hasTitle", "hasText"],
              isTypeNews: ["hasText", "hasSubTitle"],
              isTypeIndex: ["hasHeader", "hasTitle", "hasText"],
              isTypeMenu: ["hasHeader", "hasTitle"]
            },
            item: {
              isTypeNews: [],
              isTypeIndex: [],
              isTypeMenu: ["color"]
            }
          },
          {
            name: "template",
            label: "\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8",
            values: "isTemplate",
            sub: [
              {
                name: "loop",
                input: "bool",
                label: "\u30EB\u30FC\u30D7",
                key: "doLoop",
                sub: [
                  {
                    name: "contentPath",
                    label: "content path",
                    input: "text",
                    key: "content_path"
                  },
                  {
                    name: "query",
                    label: "query",
                    input: "textarea",
                    key: "query"
                  },
                  {
                    name: "loopCount",
                    label: "\u30D7\u30EC\u30D3\u30E5\u30FC\u30EB\u30FC\u30D7\u6570",
                    input: "range",
                    key: "loopCount",
                    min: 1,
                    max: 16
                  }
                ]
              }
            ]
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.listed.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const selectiveItemTemplateClasses = useMemo(() => {
        const selectiveItemTemplateClasses2 = [
          {
            name: "imageCode",
            input: "text",
            label: "\u753B\u50CF\u30B3\u30FC\u30C9",
            key: "imageCode",
            cond: "hasImage"
          },
          {
            name: "headerImageCode",
            input: "text",
            label: "\u30D8\u30C3\u30C0\u753B\u50CF\u30B3\u30FC\u30C9",
            key: "headerImageCode",
            cond: "hasHeaderImage"
          },
          {
            name: "subImageCode",
            input: "text",
            label: "\u30B5\u30D6\u753B\u50CF\u30B3\u30FC\u30C9",
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
      const { imageKeys } = CP.config.listed;
      const blockProps = useBlockProps({ className: classes2, style: vars });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.SelectModeToolbar, { set: setAttributes, attr: attributes }), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", set: setAttributes, attr: attributes, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: "\u30AF\u30E9\u30B9", onChange: (clss) => setAttributes({ classes: clss }), value: classArray.join(" ") })), /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30EA\u30B9\u30C8\u30A2\u30A4\u30C6\u30E0", icon: "edit", set: setAttributes, attr: attributes, items, index: attributes.currentItemIndex, triggerClasses: selectiveClasses[2] }), states.isTemplate && /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8",
          icon: "edit",
          set: setAttributes,
          attr: attributes,
          items,
          index: attributes.currentItemIndex,
          selectiveClasses: selectiveItemTemplateClasses
        }
      ), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), EditMode ? /* @__PURE__ */ wp.element.createElement("div", { className: "_cp-altcontent" }, /* @__PURE__ */ wp.element.createElement("div", { className: "_label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "edit" })), /* @__PURE__ */ wp.element.createElement(
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
            {
              type: "text",
              key: "imageCode",
              cond: states.isTemplate && states.hasImage
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
              cond: states.isTemplate && states.hasSubImage
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
              cond: states.isTemplate && states.hasHeaderImage
            },
            { type: "text", key: "title", cond: states.hasTitle },
            {
              type: "text",
              key: "titleCaption",
              cond: states.hasTitleCaption
            },
            { type: "text", key: "subTitle", cond: states.hasSubTitle },
            { type: "text", key: "text", cond: states.hasText },
            { type: "text", key: "linkUrl", cond: states.hasLink }
          ],
          isTemplate: states.isTemplate
        }
      )) : /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, AltMode && doLoop ? /* @__PURE__ */ wp.element.createElement("div", { className: "cp-altcontent" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "welcome-comments" })), /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)) : /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("ul", { ...blockProps }, [...Array(Math.max(items.length, loopCount)).keys()].map((i) => {
        const index = i % items.length;
        const item = items[index];
        if (!item.controlClasses) {
          item.controlClasses = "control";
        }
        return /* @__PURE__ */ wp.element.createElement(CP.Item, { tag: "li", className: clsx("_item", item.classes, commonItemClasses), set: setAttributes, attr: attributes, items, index, isSelected, key: i }, states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement(CP.SelectResponsiveImage, { attr: attributes, set: setAttributes, keys: imageKeys.image, index, size: "vga", isTemplate: states.isTemplate })), states.hasHeader && /* @__PURE__ */ wp.element.createElement("header", { className: "_header" }, states.hasCounter && /* @__PURE__ */ wp.element.createElement("div", { className: "_counter" }, countPrefix && /* @__PURE__ */ wp.element.createElement("span", { className: "_prefix" }, countPrefix), /* @__PURE__ */ wp.element.createElement("span", { className: "_number" }, index + 1), countSuffix && /* @__PURE__ */ wp.element.createElement("span", { className: "_suffix" }, countSuffix)), states.hasHeaderImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement(CP.SelectResponsiveImage, { attr: attributes, set: setAttributes, keys: imageKeys.headerImage, index, size: "thumbnail", isTemplate: states.isTemplate })), /* @__PURE__ */ wp.element.createElement("div", { className: "_text" }, states.hasTitle && /* @__PURE__ */ wp.element.createElement(
          RichText2,
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
          RichText2,
          {
            tagName: "p",
            className: "_titlecaption",
            onChange: (titleCaption) => {
              item.titleCaption = titleCaption;
              save();
            },
            value: item.titleCaption
          }
        ))), (states.hasSubImage || states.hasSubTitle || states.hasText) && /* @__PURE__ */ wp.element.createElement("div", { className: "_contents" }, states.hasSubCounter && /* @__PURE__ */ wp.element.createElement("div", { className: "_subcounter" }, subCountPrefix && /* @__PURE__ */ wp.element.createElement("span", { className: "_prefix" }, subCountPrefix), /* @__PURE__ */ wp.element.createElement("span", { className: "_number" }, index + 1), subCountSuffix && /* @__PURE__ */ wp.element.createElement("span", { className: "_suffix" }, subCountSuffix)), states.hasSubImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement(CP.SelectResponsiveImage, { attr: attributes, set: setAttributes, keys: imageKeys.subImage, index, size: "medium", isTemplate: states.isTemplate })), states.hasSubTitle && /* @__PURE__ */ wp.element.createElement(
          RichText2,
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
          RichText2,
          {
            tagName: "p",
            className: "_text",
            onChange: (text) => {
              item.text = text;
              save();
            },
            value: item.text
          }
        )), states.hasLink && isSelected && /* @__PURE__ */ wp.element.createElement("div", { className: "_link" }, /* @__PURE__ */ wp.element.createElement(
          "p",
          {
            contentEditable: true,
            suppressContentEditableWarning: true,
            onBlur: (e) => {
              item.linkUrl = e.currentTarget.innerHTML;
              save();
            }
          },
          item.linkUrl
        )));
      })))));
    },
    save({ attributes, className }) {
      const { InnerBlocks, RichText: RichText2, useBlockProps } = wp.blockEditor;
      const { vars, items = [], HeadingTag, classes: classes2 = "", commonItemClasses, countPrefix, countSuffix, subCountPrefix, subCountSuffix, doLoop } = attributes;
      const states = CP.classNamesToFlags(classes2);
      const { imageKeys } = CP.config.listed;
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("ul", { ...useBlockProps.save({ className: classes2, style: vars }) }, items.map((item, index) => /* @__PURE__ */ wp.element.createElement("li", { className: clsx("_item", item.classes, commonItemClasses), "data-class": item.classes, key: index }, states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { attr: attributes, keys: imageKeys.image, index, isTemplate: states.isTemplate })), states.hasHeader && /* @__PURE__ */ wp.element.createElement("header", { className: "_header" }, states.hasCounter && /* @__PURE__ */ wp.element.createElement("div", { className: "_counter" }, countPrefix && /* @__PURE__ */ wp.element.createElement("span", { className: "_prefix" }, countPrefix), /* @__PURE__ */ wp.element.createElement("span", { className: "_number" }, index + 1), countSuffix && /* @__PURE__ */ wp.element.createElement("span", { className: "_suffix" }, countSuffix)), states.hasHeaderImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { attr: attributes, keys: imageKeys.headerImage, index, isTemplate: states.isTemplate })), /* @__PURE__ */ wp.element.createElement("div", { className: "_text" }, states.hasTitle && /* @__PURE__ */ wp.element.createElement(RichText2.Content, { tagName: HeadingTag, className: "_title", value: item.title }), states.hasTitle && states.hasTitleCaption && /* @__PURE__ */ wp.element.createElement(RichText2.Content, { tagName: "p", className: "_titlecaption", value: item.titleCaption }))), (states.hasSubImage || states.hasSubTitle || states.hasText) && /* @__PURE__ */ wp.element.createElement("div", { className: "_contents" }, states.hasSubCounter && /* @__PURE__ */ wp.element.createElement("div", { className: "_subcounter" }, subCountPrefix && /* @__PURE__ */ wp.element.createElement("span", { className: "_prefix" }, subCountPrefix), /* @__PURE__ */ wp.element.createElement("span", { className: "_number" }, index + 1), subCountSuffix && /* @__PURE__ */ wp.element.createElement("span", { className: "_suffix" }, subCountSuffix)), states.hasSubImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { attr: attributes, keys: imageKeys.subImage, index, isTemplate: states.isTemplate })), states.hasSubTitle && /* @__PURE__ */ wp.element.createElement(RichText2.Content, { tagName: "p", className: "_subtitle", value: item.subTitle }), states.hasText && /* @__PURE__ */ wp.element.createElement(RichText2.Content, { tagName: "p", className: "_text", value: item.text })), states.hasLink && item.linkUrl && /* @__PURE__ */ wp.element.createElement("div", { className: "_link" }, /* @__PURE__ */ wp.element.createElement("a", { href: item.linkUrl }, " ")))))), doLoop && /* @__PURE__ */ wp.element.createElement("on-empty", null, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    },
    deprecated: [
      {
        save({ attributes, className }) {
          const { items = [], classes: classes2 = "", countPrefix, countSuffix, subCountPrefix, subCountSuffix, linkUrl, linkText, loopParam } = attributes;
          var classArray = _.uniq(classes2.split(" "));
          var states = CP.classNamesToFlags(classes2);
          const imageKeys = {
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
            },
            backgroundImage: {
              src: "backgroundImageSrc",
              srcset: "backgroundImageSrcset",
              code: "backgroundImageCode",
              items: "items"
            }
          };
          let rtn = [];
          items.map((item, index) => {
            rtn.push(
              /* @__PURE__ */ wp.element.createElement("li", { className: item.classes }, states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { attr: attributes, keys: imageKeys.image, index, isTemplate: states.isTemplate })), states.hasHeader && /* @__PURE__ */ wp.element.createElement("header", null, states.hasCounter && /* @__PURE__ */ wp.element.createElement("div", { className: "counter" }, countPrefix && /* @__PURE__ */ wp.element.createElement("span", { className: "prefix" }, countPrefix), /* @__PURE__ */ wp.element.createElement("span", { className: "number" }, index + 1), countSuffix && /* @__PURE__ */ wp.element.createElement("span", { className: "suffix" }, countSuffix)), states.hasHeaderImage && /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { attr: attributes, keys: imageKeys.headerImage, index, isTemplate: states.isTemplate })), /* @__PURE__ */ wp.element.createElement("div", { className: "text" }, states.hasTitle && /* @__PURE__ */ wp.element.createElement("h3", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.title })), states.hasTitle && states.hasTitleCaption && /* @__PURE__ */ wp.element.createElement("p", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.titleCaption })))), (states.hasSubImage || states.hasSubTitle || states.hasText) && /* @__PURE__ */ wp.element.createElement("div", { className: "contents" }, states.hasSubCounter && /* @__PURE__ */ wp.element.createElement("div", { className: "subcounter" }, subCountPrefix && /* @__PURE__ */ wp.element.createElement("span", { className: "prefix" }, subCountPrefix), /* @__PURE__ */ wp.element.createElement("span", { className: "number" }, index + 1), subCountSuffix && /* @__PURE__ */ wp.element.createElement("span", { className: "suffix" }, subCountSuffix)), states.hasSubImage && /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { attr: attributes, keys: imageKeys.subImage, index, isTemplate: states.isTemplate })), states.hasSubTitle && /* @__PURE__ */ wp.element.createElement("h4", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.subTitle })), states.hasText && /* @__PURE__ */ wp.element.createElement("p", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.text }))), states.hasBackgroundImage && /* @__PURE__ */ wp.element.createElement("div", { className: "background" }, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { attr: attributes, keys: imageKeys.backgroundImage, index, isTemplate: states.isTemplate })), states.hasLink && item.linkUrl && /* @__PURE__ */ wp.element.createElement("div", { className: "link" }, /* @__PURE__ */ wp.element.createElement("a", { href: item.linkUrl }, " ")))
            );
          });
          return /* @__PURE__ */ wp.element.createElement("ul", { className: classes2 }, states.doLoop && "[loop_template " + (loopParam || "") + "]", rtn, states.doLoop && "[/loop_template]");
        },
        migrate(attributes) {
          var states = CP.classNamesToFlags(classes);
          attributes.content_path = attributes.loopParam.split(" ")[0];
          attributes.query = attributes.loopParam.split(" ").slice(1).join("\n");
          attributes.doLoop = states.doLoop;
          return attributes;
        }
      }
    ]
  });
})();
