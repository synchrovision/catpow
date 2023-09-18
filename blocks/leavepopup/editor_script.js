(() => {
  // ../blocks/leavepopup/editor_script.jsx
  var { __ } = wp.i18n;
  wp.blocks.registerBlockType("catpow/leavepopup", {
    title: "\u{1F43E} LeavePopup",
    description: "\u30B5\u30A4\u30C8\u30FB\u30DA\u30FC\u30B8\u96E2\u8131\u306B\u8868\u793A\u3055\u308C\u308B\u30DD\u30C3\u30D7\u30A2\u30C3\u30D7\u3002",
    icon: "admin-comments",
    category: "catpow",
    edit({ attributes, className, setAttributes }) {
      const { useState, useMemo } = wp.element;
      const { InnerBlocks, InspectorControls } = wp.blockEditor;
      const [open, setOpen] = useState(false);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          { type: "buttons", name: "target", label: "\u8868\u793A\u6761\u4EF6", values: { isForSite: "\u30B5\u30A4\u30C8\u96E2\u8131\u6642", isForPage: "\u30DA\u30FC\u30B8\u96E2\u8131\u6642" } }
        ];
        wp.hooks.applyFilters("catpow.blocks.leavepopup.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { className: "collapsible_content " + (open ? "open" : "close") }, /* @__PURE__ */ wp.element.createElement("div", { className: "label", onClick: () => setOpen(!open) }, "\u{1F43E} leavePopup"), /* @__PURE__ */ wp.element.createElement("div", { className: attributes.classes.replace("is-close", "is-open") }, /* @__PURE__ */ wp.element.createElement("div", { className: "body" }, /* @__PURE__ */ wp.element.createElement("div", { className: "contents" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)), /* @__PURE__ */ wp.element.createElement("div", { className: "close", onClick: () => setOpen(false) })), /* @__PURE__ */ wp.element.createElement("div", { className: "bg" }))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(
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
      const { InnerBlocks } = wp.blockEditor;
      return /* @__PURE__ */ wp.element.createElement("div", { className: attributes.classes }, /* @__PURE__ */ wp.element.createElement("div", { className: "body" }, /* @__PURE__ */ wp.element.createElement("div", { className: "contents" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)), /* @__PURE__ */ wp.element.createElement("div", { className: "close" })), /* @__PURE__ */ wp.element.createElement("div", { className: "bg" }));
    }
  });
})();
