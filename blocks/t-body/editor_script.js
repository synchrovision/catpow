(() => {
  // ../blocks/t-body/editor_script.jsx
  var { __ } = wp.i18n;
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
      classes: { source: "attribute", selector: "table", attribute: "class", default: "wp-block-catpow-t-body has-header has-footer" },
      headerClasses: { source: "attribute", selector: "thead", attribute: "class", default: "wp-block-catpow-t-body__thead has-color-scheme-inverted" },
      footerClasses: { source: "attribute", selector: "tfoot", attribute: "class", default: "wp-block-catpow-t-body__tfoot has-background-color-alt" },
      headerText: { source: "html", selector: "thead th.is-text-cell", default: "Title" },
      headerPaddingTop: { type: "number", default: 1 },
      headerPaddingBottom: { type: "number", default: 1 },
      footerText: { source: "html", selector: "tfoot td.is-text-cell", default: "caption" },
      footerPaddingTop: { type: "number", default: 1 },
      footerPaddingBottom: { type: "number", default: 1 },
      body_class: { type: "string", default: "has-bg-white" },
      textMail: { source: "text", selector: "textmail" }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes }) {
      const { useState, useMemo } = wp.element;
      const { InnerBlocks, BlockControls, InspectorControls, RichText } = wp.blockEditor;
      const { PanelBody, TextareaControl, ToolbarGroup } = wp.components;
      const {
        type,
        isHtmlMail,
        classes,
        headerClasses,
        footerClasses,
        headerText,
        headerPaddingTop,
        headerPaddingBottom,
        footerText,
        footerPaddingTop,
        footerPaddingBottom,
        body_class,
        textMail,
        TextMode = false
      } = attributes;
      const primaryClass = "wp-block-catpow-t-body";
      var states = CP.classNamesToFlags(classes);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          {
            name: "type",
            input: "buttons",
            label: "\u30E1\u30FC\u30EB\u30BF\u30A4\u30D7",
            key: "type",
            values: ["plain", "html"],
            sub: {
              html: [
                { name: "textMode", input: "bool", label: "\u30C6\u30AD\u30B9\u30C8\u30E1\u30FC\u30EB\u7DE8\u96C6\u30E2\u30FC\u30C9", key: "TextMode" },
                {
                  name: "body",
                  type: "gridbuttons",
                  label: "\u80CC\u666F\u8272",
                  values: { hasBgWhite: "\u767D", hasBgB: "\u80CC\u666F\u8272", hasBgS: "\u5F37\u8ABF\u80CC\u666F\u8272", hasBgBlack: "\u9ED2", hasBgM: "\u57FA\u672C\u8272", hasBgA: "\u5F37\u8ABF\u8272" },
                  classKey: "body_class"
                },
                {
                  name: "header",
                  label: "\u30D8\u30C3\u30C0",
                  values: "hasHeader",
                  sub: [
                    { preset: "colorScheme", classKey: "headerClasses" },
                    {
                      name: "headerBackgroundColor",
                      type: "buttons",
                      label: __("\u30D8\u30C3\u30C0\u80CC\u666F\u8272", "catpow"),
                      values: { hasBgNone: "\u306A\u3057", hasBgNormal: "\u901A\u5E38", hasBgStrong: "\u5F37\u8ABF", hasBgAchromatic: "\u767D\u9ED2" },
                      classKey: "headerClasses"
                    },
                    { name: "range", input: "range", label: __("\u4E0A\u4F59\u767D", "catpow"), key: "headerPaddingTop", min: 0, max: 10 },
                    { name: "range", input: "range", label: __("\u4E0B\u4F59\u767D", "catpow"), key: "headerPaddingBottom", min: 0, max: 10 }
                  ]
                },
                {
                  name: "footer",
                  label: "\u30D5\u30C3\u30BF",
                  values: "hasFooter",
                  sub: [
                    { preset: "colorScheme", classKey: "footerClasses" },
                    {
                      name: "footerBackgroundColor",
                      type: "buttons",
                      label: __("\u30D5\u30C3\u30BF\u80CC\u666F\u8272", "catpow"),
                      values: { hasBgNone: "\u306A\u3057", hasBgNormal: "\u901A\u5E38", hasBgStrong: "\u5F37\u8ABF", hasBgAchromatic: "\u767D\u9ED2" },
                      classKey: "footerClasses"
                    },
                    { name: "range", input: "range", label: __("\u4E0A\u4F59\u767D", "catpow"), key: "footerPaddingTop", min: 0, max: 10 },
                    { name: "range", input: "range", label: __("\u4E0B\u4F59\u767D", "catpow"), key: "footerPaddingBottom", min: 0, max: 10 }
                  ]
                }
              ]
            },
            effect: (val, states2, { set }) => {
              set({ isHtmlMail: val === "html" });
            }
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.t-body.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, !isHtmlMail || TextMode ? /* @__PURE__ */ wp.element.createElement(TextareaControl, { value: textMail, onChange: (textMail2) => setAttributes({ textMail: textMail2 }), rows: 20 }) : /* @__PURE__ */ wp.element.createElement("div", { className: "cp-mail-body " + body_class }, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("table", { width: "100%", align: "center", valign: "top", className: classes }, states.hasHeader && /* @__PURE__ */ wp.element.createElement("thead", { className: headerClasses }, headerPaddingTop > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${headerPaddingTop}rem` } })), /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("th", { className: "_th is-text-cell", align: "center" }, /* @__PURE__ */ wp.element.createElement(
        RichText,
        {
          onChange: (headerText2) => {
            setAttributes({ headerText: headerText2 });
          },
          value: headerText
        }
      ))), headerPaddingBottom > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${headerPaddingBottom}rem` } }))), /* @__PURE__ */ wp.element.createElement("tbody", null, /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { align: "center" }, /* @__PURE__ */ wp.element.createElement("div", { className: "-contents" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, null))))), states.hasFooter && /* @__PURE__ */ wp.element.createElement("tfoot", { className: footerClasses }, footerPaddingTop > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${footerPaddingTop}rem` } })), /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-text-cell", align: "center" }, /* @__PURE__ */ wp.element.createElement(
        RichText,
        {
          onChange: (footerText2) => {
            setAttributes({ footerText: footerText2 });
          },
          value: footerText
        }
      ))), footerPaddingBottom > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${footerPaddingBottom}rem` } })))))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(
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
      )), /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", set: setAttributes, attr: attributes, selectiveClasses, initialOpen: true }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: "\u30AF\u30E9\u30B9", onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes }))));
    },
    save({ attributes, className, setAttributes }) {
      const { InnerBlocks, RichText } = wp.blockEditor;
      const { isHtmlMail, classes, headerClasses, footerClasses, headerText, headerPaddingTop, headerPaddingBottom, footerText, footerPaddingTop, footerPaddingBottom, body_class, textMail } = attributes;
      var states = CP.classNamesToFlags(classes);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, (!isHtmlMail || textMail) && /* @__PURE__ */ wp.element.createElement("textmail", null, textMail), isHtmlMail && /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("table", { width: "100%", align: "center", className: classes }, states.hasHeader && /* @__PURE__ */ wp.element.createElement("thead", { className: headerClasses }, headerPaddingTop > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${headerPaddingTop}rem` } })), /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("th", { className: "_th is-text-cell", align: "center" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: headerText }))), headerPaddingBottom > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${headerPaddingBottom}rem` } }))), /* @__PURE__ */ wp.element.createElement("tbody", null, /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { align: "center" }, /* @__PURE__ */ wp.element.createElement("div", { className: "-contents" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null))))), states.hasFooter && /* @__PURE__ */ wp.element.createElement("tfoot", { className: footerClasses }, footerPaddingTop > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${footerPaddingTop}rem` } })), /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-text-cell", align: "center" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: footerText }))), footerPaddingBottom > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${footerPaddingBottom}rem` } }))))));
    }
  });
})();
