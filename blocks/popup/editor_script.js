(() => {
  // ../blocks/popup/editor_script.jsx
  var { __ } = wp.i18n;
  wp.blocks.registerBlockType("catpow/popup", {
    title: "\u{1F43E} Popup",
    description: "\u30A2\u30F3\u30AB\u30FC\u30EA\u30F3\u30AF\u3067\u958B\u304F\u30DD\u30C3\u30D7\u30A2\u30C3\u30D7\u3002",
    icon: "admin-comments",
    category: "catpow",
    edit({ attributes, className, setAttributes }) {
      const { useState, useMemo } = wp.element;
      const { InnerBlocks, InspectorControls } = wp.blockEditor;
      const [open, setOpen] = useState(false);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          { input: "text", name: "anchor", label: "\u30A2\u30F3\u30AB\u30FC\u540D", key: "anchor" }
        ];
        wp.hooks.applyFilters("catpow.blocks.popup.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { className: "collapsible_content " + (open ? "open" : "close") }, /* @__PURE__ */ wp.element.createElement("div", { className: "label", onClick: () => setOpen(!open) }, "\u{1F43E} Popup #", attributes.anchor), /* @__PURE__ */ wp.element.createElement("div", { className: "wp-block-catpow-popup is-open" }, /* @__PURE__ */ wp.element.createElement("div", { className: "body" }, /* @__PURE__ */ wp.element.createElement("div", { className: "contents" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)), /* @__PURE__ */ wp.element.createElement("div", { className: "close", onClick: () => setOpen(false) })), /* @__PURE__ */ wp.element.createElement("div", { className: "bg" }))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: __("\u30AF\u30E9\u30B9", "catpow"),
          icon: "art",
          set: setAttributes,
          attr: attributes,
          selectiveClasses
        }
      )));
    },
    save({ attributes, className, setAttributes }) {
      const { anchor } = attributes;
      const { InnerBlocks } = wp.blockEditor;
      return /* @__PURE__ */ wp.element.createElement("div", { id: anchor, className: attributes.classes }, /* @__PURE__ */ wp.element.createElement("div", { className: "body" }, /* @__PURE__ */ wp.element.createElement("div", { className: "contents" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)), /* @__PURE__ */ wp.element.createElement("div", { className: "close" })), /* @__PURE__ */ wp.element.createElement("div", { className: "bg" }));
    }
  });
})();
