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
    edit({ attributes, className, setAttributes }) {
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
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Collapsible, { title: `\u{1F43E} Popup #${attributes.anchor}` }, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps({ className: flagsToClassNames({ ...states, isOpen: true }), style: vars }) }, /* @__PURE__ */ wp.element.createElement("div", { className: "_body" }, /* @__PURE__ */ wp.element.createElement("div", { className: "_contents" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)), /* @__PURE__ */ wp.element.createElement("div", { className: "_close", onClick: () => setOpen(false) })), /* @__PURE__ */ wp.element.createElement("div", { className: "_bg" })))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: __("\u30AF\u30E9\u30B9", "catpow"), icon: "art", set: setAttributes, attr: attributes, selectiveClasses })));
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
      return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement("div", { className: "_body" }, /* @__PURE__ */ wp.element.createElement("div", { className: "_contents" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)), /* @__PURE__ */ wp.element.createElement("div", { className: "_close", "data-wp-on--click": "actions.close" })), /* @__PURE__ */ wp.element.createElement("div", { className: "_bg", "data-wp-on--click": "actions.close" })));
    }
  });
})();
