(() => {
  // blocks/t-body/editor_script.jsx
  wp.blocks.registerBlockType("catpow/t-body", {
    title: "\u{1F43E} T-Body",
    description: "HTML\u30E1\u30FC\u30EB\u306E\u30D9\u30FC\u30B9\u3068\u306A\u308B\u30D8\u30C3\u30C0\u30FB\u30D5\u30C3\u30BF\u306E\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002",
    icon: "editor-code",
    category: "catpow-mail",
    supports: {
      multiple: false
    },
    attributes: {
      type: { type: "string", source: "meta", meta: "type", default: "html" },
      isHtmlMail: { type: "boolean", default: false },
      classes: { source: "attribute", selector: "table", attribute: "class", default: "wp-block-catpow-t-body hasHeader hasFooter" },
      headerText: { source: "html", selector: "thead th", default: "Title" },
      footerText: { source: "html", selector: "tfoot td", default: "caption" },
      body_class: { type: "string", default: "white" },
      textMail: { source: "text", selector: "textmail" }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes }) {
      const { useState, useMemo } = wp.element;
      const { InnerBlocks, BlockControls, InspectorControls, RichText } = wp.blockEditor;
      const { PanelBody, TextareaControl, ToolbarGroup } = wp.components;
      const { type, isHtmlMail, classes, headerText, footerText, body_class, textMail, TextMode = false } = attributes;
      const primaryClass = "wp-block-catpow-t-body";
      var states = CP.wordsToFlags(classes);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          { name: "type", input: "buttons", label: "\u30E1\u30FC\u30EB\u30BF\u30A4\u30D7", key: "type", values: ["plain", "html"], sub: {
            html: [
              { name: "textMode", input: "bool", label: "\u30C6\u30AD\u30B9\u30C8\u30E1\u30FC\u30EB\u7DE8\u96C6\u30E2\u30FC\u30C9", key: "TextMode" },
              "color",
              { name: "header", label: "\u30D8\u30C3\u30C0", values: "hasHeader" },
              { name: "footer", label: "\u30D5\u30C3\u30BF", values: "hasFooter" },
              { name: "body", type: "buttons", label: "\u80CC\u666F\u8272", values: ["white", "gray", "black"], key: "body_class" }
            ]
          }, effect: (val, states2, { set }) => {
            set({ isHtmlMail: val === "html" });
          } }
        ];
        wp.hooks.applyFilters("catpow.blocks.t-body.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, !isHtmlMail || TextMode ? /* @__PURE__ */ wp.element.createElement(
        TextareaControl,
        {
          value: textMail,
          onChange: (textMail2) => setAttributes({ textMail: textMail2 }),
          rows: 20
        }
      ) : /* @__PURE__ */ wp.element.createElement("div", { className: "mail_body " + body_class }, /* @__PURE__ */ wp.element.createElement("table", { width: "100%", align: "center", valign: "top", className: classes }, states.hasHeader && /* @__PURE__ */ wp.element.createElement("thead", { className: "wp-block-catpow-t-body__header" }, /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("th", null, /* @__PURE__ */ wp.element.createElement(
        RichText,
        {
          onChange: (headerText2) => {
            setAttributes({ headerText: headerText2 });
          },
          value: headerText
        }
      )))), /* @__PURE__ */ wp.element.createElement("tbody", { className: "wp-block-catpow-t-body__body" }, /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", null, /* @__PURE__ */ wp.element.createElement("div", { className: "wp-block-catpow-t-body__body__contents" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, null))))), states.hasFooter && /* @__PURE__ */ wp.element.createElement("tfoot", { className: "wp-block-catpow-t-body__footer" }, /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", null, /* @__PURE__ */ wp.element.createElement(
        RichText,
        {
          onChange: (footerText2) => {
            setAttributes({ footerText: footerText2 });
          },
          value: footerText
        }
      )))))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(
        ToolbarGroup,
        {
          controls: [
            {
              icon: "media-text",
              label: "\u30C6\u30AD\u30B9\u30C8\u30E1\u30FC\u30EB",
              isActive: TextMode,
              onClick: () => setAttributes({ TextMode: !TextMode })
            }
          ]
        }
      )), /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30AF\u30E9\u30B9",
          icon: "art",
          set: setAttributes,
          attr: attributes,
          selectiveClasses,
          filters: CP.filters["t-body"] || {}
        }
      ), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(
        TextareaControl,
        {
          label: "\u30AF\u30E9\u30B9",
          onChange: (classes2) => setAttributes({ classes: classes2 }),
          value: classes
        }
      ))));
    },
    save({ attributes, className, setAttributes }) {
      const { InnerBlocks, RichText } = wp.blockEditor;
      const { type, isHtmlMail, classes, headerText, textMail, footerText } = attributes;
      const primaryClass = "wp-block-catpow-t-body";
      var states = CP.wordsToFlags(classes);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, (!isHtmlMail || textMail) && /* @__PURE__ */ wp.element.createElement("textmail", null, textMail), isHtmlMail && /* @__PURE__ */ wp.element.createElement("table", { width: "100%", align: "center", className: classes }, states.hasHeader && /* @__PURE__ */ wp.element.createElement("thead", { className: "wp-block-catpow-t-body__header" }, /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("th", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: headerText })))), /* @__PURE__ */ wp.element.createElement("tbody", { className: "wp-block-catpow-t-body__body" }, /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", null, /* @__PURE__ */ wp.element.createElement("div", { className: "wp-block-catpow-t-body__body__contents" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null))))), states.hasFooter && /* @__PURE__ */ wp.element.createElement("tfoot", { className: "wp-block-catpow-t-body__footer" }, /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: footerText }))))));
    }
  });
})();
