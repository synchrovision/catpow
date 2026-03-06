(() => {
  // node_modules-included/catpow/src/util/string/case.js
  var camelToKebab = (str) => str.replace(/(?=\w)([A-Z])/g, "-$1").toLowerCase();
  var kebabToCamel = (str) => str.replace(/\-([a-z])/g, (m) => m[1].toUpperCase());

  // node_modules-included/catpow/src/util/string/classNamesToFlags.js
  var classNamesToFlags = (classNames) => classNames && classNames.split(" ").map(kebabToCamel).reduce((p, c) => {
    p[c] = true;
    return p;
  }, {}) || {};

  // node_modules-included/catpow/src/util/string/flagsToClassNames.js
  var flagsToClassNames = (flags) => flags && Object.keys(flags).filter((f) => flags[f]).map(camelToKebab).join(" ");

  // ../blocks/popup/editor_script.jsx
  var { __ } = wp.i18n;
  wp.blocks.registerBlockType("catpow/popup", {
    title: "\u{1F43E} Popup",
    description: "\u30A2\u30F3\u30AB\u30FC\u30EA\u30F3\u30AF\u3067\u958B\u304F\u30DD\u30C3\u30D7\u30A2\u30C3\u30D7\u3002",
    icon: "admin-comments",
    category: "catpow",
    edit({ attributes, className, setAttributes, clientId }) {
      const { classes, anchor, vars } = attributes;
      const { useState, useMemo, useCallback } = wp.element;
      const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
      const [open, setOpen] = useState(false);
      const states = classNamesToFlags(classes);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [{ input: "text", name: "anchor", label: "\u30A2\u30F3\u30AB\u30FC\u540D", key: "anchor" }, "contentWidth"];
        wp.hooks.applyFilters("catpow.blocks.popup.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const selectThisBlock = useCallback(() => {
        wp.data.dispatch("core/block-editor").selectBlock(clientId);
      }, [clientId]);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { className: "cp-collapsiblecontent " + (open ? "is-open" : "is-close"), onClick: selectThisBlock }, /* @__PURE__ */ wp.element.createElement("div", { className: "cp-collapsiblecontent__label", onClick: () => setOpen(!open) }, "\u{1F43E} Popup #", attributes.anchor), /* @__PURE__ */ wp.element.createElement("div", { className: "cp-collapsiblecontent__body" }, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps({ className: flagsToClassNames({ ...states, isHidden: false, isClose: false, isOpen: true }), style: vars }) }, /* @__PURE__ */ wp.element.createElement("div", { className: "_body" }, /* @__PURE__ */ wp.element.createElement("div", { className: "_contents" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)), /* @__PURE__ */ wp.element.createElement("div", { className: "_close", onClick: () => setOpen(false) })), /* @__PURE__ */ wp.element.createElement("div", { className: "_bg" }))))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: __("\u30AF\u30E9\u30B9", "catpow"), icon: "art", set: setAttributes, attr: attributes, selectiveClasses })));
    },
    save({ attributes, className, setAttributes }) {
      const { classes, anchor, vars } = attributes;
      const { InnerBlocks, useBlockProps } = wp.blockEditor;
      const blockProps = useBlockProps.save({
        className: classes,
        style: vars,
        id: anchor,
        "data-wp-interactive": "catpow/popup",
        "data-wp-context": JSON.stringify({
          anchor
        }),
        "data-wp-init": "callbacks.initBlock",
        "data-wp-class--is-open": "callbacks.isOpen",
        "data-wp-bind--hidden": "!callbacks.isOpen"
      });
      return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement("div", { className: "_body" }, /* @__PURE__ */ wp.element.createElement("div", { className: "_contents" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)), /* @__PURE__ */ wp.element.createElement("div", { className: "_close" })), /* @__PURE__ */ wp.element.createElement("div", { className: "_bg", "data-wp-on--click": "actions.close" })));
    }
  });
})();
