(() => {
  // ../blocks/t-list/editor_script.jsx
  var { __ } = wp.i18n;
  wp.blocks.registerBlockType("catpow/t-list", {
    title: "\u{1F43E} T-List",
    description: "HTML\u30E1\u30FC\u30EB\u7528\u306E\u30EA\u30B9\u30C8\u3067\u3059\u3002",
    icon: "editor-code",
    category: "catpow-mail",
    parent: CP.mailContensContainer,
    attributes: {
      classes: { source: "attribute", selector: "table", attribute: "class", default: "wp-block-catpow-t-list has-font-weight-regular is-ordered has-font-size-middle has-marker-color-main" },
      marginTop: { type: "number", default: 0.5 },
      marginBetween: { type: "number", default: 0.5 },
      marginBottom: { type: "number", default: 0.5 },
      markerSize: { type: "string", default: "1em" },
      markerWidth: { type: "string", default: "1.5em" },
      markerMargin: { type: "string", default: "0.1em" },
      markerClasses: { source: "attribute", selector: ".wp-block-catpow-t-list__item-marker", attribute: "class", default: "wp-block-catpow-t-list__item-marker has-font-weight-regular" },
      markerIndexSize: { type: "string", default: "1em" },
      markerIndexPad: { type: "number", default: 1 },
      markerAlign: { source: "attribute", selector: ".wp-block-catpow-t-list__item-marker", attribute: "align", default: "left" },
      prefix: { source: "html", selector: ".wp-block-catpow-t-list__item-marker-prefix", default: "\u25CF" },
      sufix: { source: "html", selector: ".wp-block-catpow-t-list__item-marker-suffix", default: "" },
      items: {
        source: "query",
        selector: ".wp-block-catpow-t-list__item",
        query: {
          text: { source: "html", selector: ".wp-block-catpow-t-list__item-text" }
        },
        default: [
          {
            text: "Item 1"
          },
          {
            text: "Item 2"
          },
          {
            text: "Item 3"
          }
        ]
      }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes }) {
      const { useState, useMemo } = wp.element;
      const { InspectorControls, RichText } = wp.blockEditor;
      const { PanelBody, TextareaControl } = wp.components;
      const { classes, marginTop, marginBottom, marginBetween, markerSize, markerWidth, markerAlign, markerMargin, markerClasses, markerIndexSize, markerIndexPad, prefix, suffix, items } = attributes;
      var states = CP.classNamesToFlags(classes);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          "fontSize",
          "fontWeight",
          { name: "marginTop", input: "range", label: "\u4E0A\u9593\u9694", key: "marginTop", min: 0, max: 4, step: 0.25 },
          { name: "marginBetween", input: "range", label: "\u9593\u9694", key: "marginBetween", min: 0, max: 4, step: 0.25 },
          { name: "marginBottom", input: "range", label: "\u4E0B\u9593\u9694", key: "marginBottom", min: 0, max: 4, step: 0.25 },
          {
            name: "isOrdered",
            label: __("\u756A\u53F7\u4ED8\u304D\u30EA\u30B9\u30C8", "catpow"),
            values: "isOrdered",
            sub: [
              { name: "markerIndexSize", input: "range", label: __("\u756A\u53F7\u30B5\u30A4\u30BA", "catpow"), key: "markerIndexSize", min: 1, max: 3, step: 0.1, unit: "em" },
              { name: "markerIndexPad", input: "range", label: __("\u756A\u53F7\u306E\u6841\u6570", "catpow"), key: "markerIndexPad", min: 1, max: 4 }
            ]
          },
          {
            name: "markerColor",
            type: "buttons",
            label: "\u30DE\u30FC\u30AB\u30FC\u8272",
            values: {
              hasMarkerColorText: __("\u6587\u5B57", "catpow"),
              hasMarkerColorMain: __("\u57FA\u672C", "catpow"),
              hasMarkerColorAccent: __("\u5F37\u8ABF", "catpow"),
              hasMarkerColorHighlight: __("\u5F37\u8ABF\u6587\u5B57", "catpow")
            }
          },
          { name: "markerWeigth", preset: "fontWeight", label: "\u30DE\u30FC\u30AB\u30FC\u592A\u3055", classKey: "markerClasses" },
          { name: "markerSize", input: "range", label: "\u30DE\u30FC\u30AB\u30FC\u30B5\u30A4\u30BA", key: "markerSize", min: 1, max: 4, step: 0.1, unit: "em" },
          { name: "markerWidth", input: "range", label: "\u30DE\u30FC\u30AB\u30FC\u5E45", key: "markerWidth", min: 1, max: 8, step: 0.25, unit: "em" },
          { name: "markerMargin", input: "range", label: "\u30DE\u30FC\u30AB\u30FC\u9593\u9694", key: "markerMargin", min: 0.1, max: 2, step: 0.1, unit: "em" },
          { name: "markerAlign", input: "buttons", label: "\u30DE\u30FC\u30AB\u30FC\u4F4D\u7F6E", key: "markerAlign", options: ["left", "center", "right"] }
        ];
        wp.hooks.applyFilters("catpow.blocks.t-list.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("table", { className: classes, width: "100%", align: "center" }, /* @__PURE__ */ wp.element.createElement("tbody", null, marginTop > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginTop}em` }, colspan: "3" })), items.map((item, index) => /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, index > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginBetween}em` }, colspan: "3" })), /* @__PURE__ */ wp.element.createElement("tr", { className: "item_" }, /* @__PURE__ */ wp.element.createElement("td", { className: markerClasses, width: markerWidth, align: markerAlign, style: { width: markerWidth, textAlign: markerAlign, fontSize: markerSize } }, /* @__PURE__ */ wp.element.createElement(
        RichText,
        {
          className: "_prefix",
          tagName: "span",
          onChange: (prefix2) => {
            setAttributes({ prefix: prefix2 });
          },
          value: prefix
        }
      ), states.isOrdered && /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("span", { className: "_index", style: { fontSize: markerIndexSize } }, markerIndexPad > 1 ? (index + 1).toString().padStart(markerIndexPad, "0") : index + 1), /* @__PURE__ */ wp.element.createElement(
        RichText,
        {
          className: "_suffix",
          tagName: "span",
          onChange: (suffix2) => {
            setAttributes({ suffix: suffix2 });
          },
          value: suffix
        }
      ))), /* @__PURE__ */ wp.element.createElement("td", { className: "_spacer", width: markerMargin, style: { width: markerMargin } }), /* @__PURE__ */ wp.element.createElement(
        RichText,
        {
          className: "_text",
          tagName: "td",
          onChange: (text) => {
            items[index].text = text;
            setAttributes({ items: JSON.parse(JSON.stringify(items)) });
          },
          value: item.text
        }
      )))), marginBottom > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginBottom}em` }, colspan: "3" }))))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", set: setAttributes, attr: attributes, selectiveClasses, initialOpen: true }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: "\u30AF\u30E9\u30B9", onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes }))));
    },
    save({ attributes, className, setAttributes }) {
      const { RichText } = wp.blockEditor;
      const { classes, marginTop, marginBottom, marginBetween, markerSize, markerWidth, markerAlign, markerMargin, markerClasses, markerIndexSize, markerIndexPad, prefix, suffix, items } = attributes;
      var states = CP.classNamesToFlags(classes);
      return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("table", { className: classes, width: "100%", align: "center" }, /* @__PURE__ */ wp.element.createElement("tbody", null, marginTop > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginTop}em` }, colspan: "3" })), items.map((item, index) => /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, index > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginBetween}em` }, colspan: "3" })), /* @__PURE__ */ wp.element.createElement("tr", { className: "item_" }, /* @__PURE__ */ wp.element.createElement("td", { className: markerClasses, width: markerWidth, align: markerAlign, style: { width: markerWidth, textAlign: markerAlign, fontSize: markerSize } }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { className: "_prefix", tagName: "span", value: prefix }), states.isOrdered && /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("span", { className: "_index", style: { fontSize: markerIndexSize } }, markerIndexPad > 1 ? (index + 1).toString().padStart(markerIndexPad, "0") : index + 1), /* @__PURE__ */ wp.element.createElement(RichText.Content, { className: "_suffix", tagName: "span", value: suffix }))), /* @__PURE__ */ wp.element.createElement("td", { className: "_spacer", width: markerMargin, style: { width: markerMargin } }), /* @__PURE__ */ wp.element.createElement(RichText.Content, { className: "_text", tagName: "td", value: item.text })))), marginBottom > 0 && /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-spacer-cell", style: { height: `${marginBottom}em` }, colspan: "3" })))));
    }
  });
})();
