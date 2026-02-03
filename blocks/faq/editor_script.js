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

  // ../blocks/faq/editor_script.jsx
  CP.config.faq = {
    imageKeys: {
      image: { src: "src", alt: "alt", items: "items" }
    }
  };
  wp.blocks.registerBlockType("catpow/faq", {
    transforms: {
      from: [
        {
          type: "block",
          blocks: CP.listedConvertibles,
          transform: (attributes) => {
            attributes.classes = "wp-block-catpow-faq accordion";
            return wp.blocks.createBlock("catpow/faq", attributes);
          }
        }
      ]
    },
    attributes: {
      version: { type: "number", default: 0 },
      classes: { source: "attribute", selector: "ul", attribute: "class", default: "wp-block-catpow-faq" },
      vars: { type: "object" },
      items: {
        source: "query",
        selector: ".wp-block-catpow-faq__item",
        query: {
          classes: { source: "attribute", attribute: "class" },
          src: { source: "attribute", selector: ".wp-block-catpow-faq__item-header-image [src]", attribute: "src" },
          alt: { source: "attribute", selector: ".wp-block-catpow-faq__item-header-image [src]", attribute: "alt" },
          title: { source: "html", selector: ".wp-block-catpow-faq__item-header-text-title" },
          titleCaption: { source: "html", selector: ".wp-block-catpow-faq__item-header-text-caption" },
          subTitle: { source: "html", selector: ".wp-block-catpow-faq__item-contents-body-subtitle" },
          text: { source: "html", selector: ".wp-block-catpow-faq__item-contents-body-text" }
        },
        default: [...Array(3)].map(() => {
          return {
            classes: "wp-block-catpow-faq__item",
            title: ["Title"],
            titleCaption: ["Caption"],
            subTitle: ["SubTitle"],
            src: wpinfo.theme_url + "/images/dummy.jpg",
            alt: "dummy",
            text: ["Text"]
          };
        })
      },
      counterPrefix: { source: "text", selector: ".wp-block-catpow-faq__item-header-counter-prefix", default: "" },
      counterSuffix: { source: "text", selector: ".wp-block-catpow-faq__item-header-counter-suffix", default: "" }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useMemo } = wp.element;
      const { BlockControls, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
      const { PanelBody, TextareaControl, ToolbarGroup } = wp.components;
      const { items = [], classes = "", vars, counterPrefix, counterSuffix } = attributes;
      const states = CP.classNamesToFlags(classes);
      const { imageKeys } = CP.config.faq;
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          "level",
          "hasContentWidth",
          { name: "titleCaption", label: "Q\u306B\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3", values: "hasTitleCaption" },
          { name: "subTitle", label: "A\u306B\u898B\u51FA\u3057", values: "hasSubTitle" },
          { name: "hasImage", label: "\u753B\u50CF", values: "hasImage" },
          {
            name: "counter",
            label: "\u756A\u53F7",
            values: "hasCounter",
            sub: [
              {
                name: "counterPrefix",
                input: "text",
                label: "\u756A\u53F7\u524D\u7F6E\u30C6\u30AD\u30B9\u30C8",
                key: "counterPrefix"
              },
              {
                name: "counterSuffix",
                input: "text",
                label: "\u756A\u53F7\u5F8C\u7F6E\u30C6\u30AD\u30B9\u30C8",
                key: "counterSuffix"
              }
            ]
          },
          { name: "accordion", label: "\u30A2\u30B3\u30FC\u30C7\u30A3\u30AA\u30F3", values: "isAccordion" }
        ];
        wp.hooks.applyFilters("catpow.blocks.faq.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      let rtn = [];
      const save = () => {
        setAttributes({ items: JSON.parse(JSON.stringify(items)) });
      };
      if (attributes.EditMode === void 0) {
        attributes.EditMode = false;
      }
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
      )), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", set: setAttributes, attr: attributes, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: "\u30AF\u30E9\u30B9", onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes })), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("ul", { className: clsx(classes, { edit: attributes.EditMode }), style: vars }, items.map((item, index) => {
        if (!item.controlClasses) {
          item.controlClasses = "control";
        }
        return /* @__PURE__ */ wp.element.createElement(CP.Item, { tag: "li", className: item.classes + " is-open", set: setAttributes, attr: attributes, items, index, isSelected, key: index }, /* @__PURE__ */ wp.element.createElement("header", { className: "_header" }, states.hasCounter && /* @__PURE__ */ wp.element.createElement("div", { className: "_counter" }, counterPrefix && /* @__PURE__ */ wp.element.createElement("span", { className: "_prefix" }, counterPrefix), /* @__PURE__ */ wp.element.createElement("span", { className: "_number" }, index + 1), counterSuffix && /* @__PURE__ */ wp.element.createElement("span", { className: "_suffix" }, counterSuffix)), states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement(CP.SelectResponsiveImage, { attr: attributes, set: setAttributes, keys: imageKeys.image, index, size: "vga" })), /* @__PURE__ */ wp.element.createElement("div", { className: "_text" }, /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: "h3",
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
        )), states.isAccordion && /* @__PURE__ */ wp.element.createElement("button", { className: "_button" })), /* @__PURE__ */ wp.element.createElement("div", { className: "_contents" }, /* @__PURE__ */ wp.element.createElement("div", { className: "_body" }, states.hasSubTitle && /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: "h4",
            className: "_subtitle",
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
        ))));
      }))));
    },
    save({ attributes, className }) {
      const { RichText, useBlockProps } = wp.blockEditor;
      const { items = [], classes = "", vars, counterPrefix, counterSuffix } = attributes;
      const states = CP.classNamesToFlags(classes);
      const blockProps = useBlockProps.save({
        className: classes,
        "data-wp-interactive": "faq",
        "data-wp-context": JSON.stringify({
          openItems: {}
        }),
        "data-wp-init": "callbacks.initBlock",
        style: vars
      });
      return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("ul", { ...blockProps }, items.map((item, index) => /* @__PURE__ */ wp.element.createElement("li", { id: `{$uid}-${index + 1}`, className: item.classes, "data-wp-class--is-open": "callbacks.isOpen", "data-index": index, key: index }, /* @__PURE__ */ wp.element.createElement("header", { id: `{$uid}-${index + 1}-header`, className: "_header", "data-wp-on--click": "actions.onClickToggle", "data-index": index }, states.hasCounter && /* @__PURE__ */ wp.element.createElement("div", { className: "_counter" }, counterPrefix && /* @__PURE__ */ wp.element.createElement("span", { className: "_prefix" }, counterPrefix), /* @__PURE__ */ wp.element.createElement("span", { className: "_number" }, index + 1), counterSuffix && /* @__PURE__ */ wp.element.createElement("span", { className: "_suffix" }, counterSuffix)), states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement("img", { src: item.src, alt: item.alt })), /* @__PURE__ */ wp.element.createElement("div", { className: "_text" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "h3", className: "_title", value: item.title }), states.hasTitleCaption && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "p", className: "_caption", value: item.titleCaption })), states.isAccordion && /* @__PURE__ */ wp.element.createElement(
        "button",
        {
          className: "_button",
          "data-wp-bind--aria-expanded": "callbacks.isOpen",
          "data-wp-on--click": "actions.onClickToggle",
          "aria-controls": `{$uid}-${index + 1}-contents`,
          "data-index": index
        }
      )), /* @__PURE__ */ wp.element.createElement("div", { id: `{$uid}-${index + 1}-contents`, className: "_contents", "data-wp-bind--aria-hidden": "!callbacks.isOpen", "data-index": index }, /* @__PURE__ */ wp.element.createElement("div", { className: "_body" }, states.hasSubTitle && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "h4", className: "_subtitle", value: item.subTitle }), /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "p", className: "_text", value: item.text })))))));
    }
  });
})();
