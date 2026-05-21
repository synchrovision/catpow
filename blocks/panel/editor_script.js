(() => {
  // ../blocks/panel/editor_script.jsx
  CP.config.panel = {
    imageKeys: {
      icon: { src: "iconSrc", alt: "iconAlt", items: "items" },
      image: { src: "src", alt: "alt", items: "items" }
    }
  };
  wp.blocks.registerBlockType("catpow/panel", {
    title: "\u{1F43E} Panel",
    description: "\u5927\u5C0F\u306E\u77E9\u5F62\u30D1\u30CD\u30EB\u3092\u30EC\u30A4\u30A2\u30A6\u30C8\u3057\u307E\u3059\u3002",
    icon: "grid-view",
    category: "catpow",
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useState, useMemo } = wp.element;
      const { BlockControls, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
      const { PanelBody, TextareaControl, TextControl, ToolbarGroup } = wp.components;
      const { classes, HeadingTag, vars, items = [] } = attributes;
      const primaryClass = "wp-block-catpow-panel";
      const { imageKeys } = CP.config.panel;
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          "headingTag",
          "level",
          "hasContentWidth",
          "hasMargin",
          {
            name: "type",
            label: "\u30BF\u30A4\u30D7",
            type: "buttons",
            values: { isTypeTile: "\u30BF\u30A4\u30EB", isTypeMenu: "\u30E1\u30CB\u30E5\u30FC" },
            item: {
              isTypeTile: [
                "color",
                "colorScheme",
                { name: "icon", label: "\u30A2\u30A4\u30B3\u30F3", values: "hasIcon", sub: [{ input: "icon" }] },
                { name: "title", label: "\u30BF\u30A4\u30C8\u30EB", values: "hasTitle" },
                { name: "text", label: "\u6587\u7AE0", values: "hasText" },
                {
                  name: "image",
                  label: "\u753B\u50CF",
                  values: "hasImage",
                  sub: [
                    { name: "paleImage", label: "\u753B\u50CF\u3092\u8584\u304F", values: "paleImage" },
                    { name: "image", label: "\u753B\u50CF", input: "image", keys: imageKeys.image, size: "vga" }
                  ]
                },
                { name: "link", label: "\u30EA\u30F3\u30AF", values: "hasLink", sub: [{ name: "external", label: "\u5916\u90E8\u30EA\u30F3\u30AF", values: "linkExternal" }] },
                { name: "rowSpan", type: "buttons", label: "\u7E26\u30B5\u30A4\u30BA", values: { hasRspan1: "1", hasRspan2: "2", hasRspan3: "3" } },
                { name: "colSpan", type: "buttons", label: "\u6A2A\u30B5\u30A4\u30BA", values: { hasCspan1: "1", hasCspan2: "2", hasCspan3: "3" } }
              ],
              isTypeMenu: [
                "color",
                { name: "icon", label: "\u30A2\u30A4\u30B3\u30F3", values: "hasIcon", sub: [{ input: "icon" }] },
                { name: "title", label: "\u30BF\u30A4\u30C8\u30EB", values: "hasTitle" },
                { name: "text", label: "\u6587\u7AE0", values: "hasText" },
                { name: "image", label: "\u753B\u50CF", values: "hasImage", sub: [{ name: "image", label: "\u753B\u50CF", input: "image", keys: imageKeys.image, size: "vga" }] },
                { name: "link", label: "\u30EA\u30F3\u30AF", values: "hasLink", sub: [{ name: "external", label: "\u5916\u90E8\u30EA\u30F3\u30AF", values: "linkExternal" }] },
                { name: "rowSpan", type: "buttons", label: "\u7E26\u30B5\u30A4\u30BA", values: { hasRspan1: "1", hasRspan2: "2", hasRspan3: "3" } },
                { name: "colSpan", type: "buttons", label: "\u6A2A\u30B5\u30A4\u30BA", values: { hasCspan1: "1", hasCspan2: "2", hasCspan3: "3" } }
              ]
            }
          },
          {
            name: "size",
            label: "\u30B0\u30EA\u30C3\u30C9\u30B5\u30A4\u30BA",
            type: "buttons",
            values: {
              hasGridSize1: "1",
              hasGridSize2: "2",
              hasGridSize3: "3",
              hasGridSize4: "4"
            }
          },
          {
            label: "\u30AB\u30E9\u30E0\u7D04\u6570\uFF082^n\uFF09",
            type: "buttons",
            values: {
              hasGrid2n: "2",
              hasGrid4n: "4",
              hasGrid8n: "8",
              hasGrid16n: "16",
              hasGrid32n: "32"
            }
          },
          {
            label: "\u30AB\u30E9\u30E0\u7D04\u6570\uFF083^n\uFF09",
            type: "buttons",
            values: {
              hasGrid3n: "3",
              hasGrid9n: "9",
              hasGrid27n: "27"
            }
          },
          {
            label: "\u30AB\u30E9\u30E0\u7D04\u6570\uFF085^n\uFF09",
            type: "buttons",
            values: {
              hasGrid5n: "5",
              hasGrid25n: "25"
            }
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.panel.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const totalGrid = items.reduce((total, item) => {
        const itemStates = CP.classNamesToFlags(item.classes);
        const rowSpan = itemStates.hasRspan2 ? 2 : itemStates.hasRspan3 ? 3 : 1;
        const colSpan = itemStates.hasCspan2 ? 2 : itemStates.hasCspan3 ? 3 : 1;
        return total + rowSpan * colSpan;
      }, 0);
      const expectedGrid = useMemo(() => classes.match(/\bhas-grid\d+n\b/g)?.reduce((p, c) => p * parseInt(c.match(/\d+/)), 1) || 1, [classes]);
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
      )), /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps({ className: attributes.EditMode ? primaryClass + " edit" : classes }) }, /* @__PURE__ */ wp.element.createElement("ul", { className: "_items" }, items.map((item, index) => {
        const itemStates = CP.classNamesToFlags(item.classes);
        return /* @__PURE__ */ wp.element.createElement(CP.Item, { tag: "li", className: item.classes, set: setAttributes, attr: attributes, items, index, isSelected, key: index }, itemStates.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement(CP.SelectResponsiveImage, { className: "_img", attr: attributes, set: setAttributes, keys: imageKeys.image, index, size: "vga" })), /* @__PURE__ */ wp.element.createElement("div", { className: "_texts" }, itemStates.hasIcon && /* @__PURE__ */ wp.element.createElement(CP.OutputIcon, { className: "_icon", item }), itemStates.hasTitle && /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: HeadingTag,
            className: "_title",
            onChange: (title) => {
              items[index].title = title;
              setAttributes({ items: [...items] });
            },
            value: item.title
          }
        ), itemStates.hasText && /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: "p",
            className: "_text",
            placeholder: "Text",
            onChange: (text) => {
              items[index].text = text;
              setAttributes({ items: [...items] });
            },
            value: item.text
          }
        ), itemStates.hasLink && /* @__PURE__ */ wp.element.createElement("div", { className: "_link" }, /* @__PURE__ */ wp.element.createElement(
          TextControl,
          {
            onChange: (linkUrl) => {
              items[index].linkUrl = linkUrl;
              setAttributes({ items: [...items] });
            },
            value: item.linkUrl
          }
        ))));
      })))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "info", icon: "admin-generic", initialOpen: true }, /* @__PURE__ */ wp.element.createElement("p", null, "\u5408\u8A08\u30B0\u30EA\u30C3\u30C9\u6570\uFF1A", totalGrid), /* @__PURE__ */ wp.element.createElement("p", null, "\u671F\u5F85\u30B0\u30EA\u30C3\u30C9\u6570\uFF1A", expectedGrid)), /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", set: setAttributes, attr: attributes, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30D1\u30CD\u30EB", icon: "edit", set: setAttributes, attr: attributes, items, index: attributes.currentItemIndex, triggerClasses: selectiveClasses[4] }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: "\u30AF\u30E9\u30B9", onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes })), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)));
    },
    save({ attributes, className }) {
      const { RichText } = wp.blockEditor;
      const { classes, HeadingTag = "h3", vars, items = [] } = attributes;
      return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { className: classes, style: vars }, /* @__PURE__ */ wp.element.createElement("ul", { className: "_items" }, items.map((item, index) => {
        const itemStates = CP.classNamesToFlags(item.classes);
        return /* @__PURE__ */ wp.element.createElement("li", { className: item.classes, key: index }, itemStates.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, /* @__PURE__ */ wp.element.createElement("img", { className: "_img", src: item.src, alt: item.alt })), /* @__PURE__ */ wp.element.createElement("div", { className: "_texts" }, itemStates.hasIcon && /* @__PURE__ */ wp.element.createElement(CP.OutputIcon, { className: "_icon", item }), itemStates.hasTitle && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: HeadingTag, className: "_title", value: item.title }), itemStates.hasText && /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "p", className: "_text", value: item.text }), itemStates.hasLink && /* @__PURE__ */ wp.element.createElement("div", { className: "_link" }, /* @__PURE__ */ wp.element.createElement("a", { href: item.linkUrl, target: itemStates.linkExternal ? "_brank" : false, rel: itemStates.linkExternal ? "noopener noreferrer" : "bookmark" }, " "))));
      }))));
    }
  });
})();
