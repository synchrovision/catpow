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

  // ../blocks/entrypopup/editor_script.jsx
  var { __ } = wp.i18n;
  wp.blocks.registerBlockType("catpow/entrypopup", {
    edit({ attributes, className, setAttributes }) {
      const { classes, vars } = attributes;
      const { useMemo, useCallback } = wp.element;
      const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
      const states = classNamesToFlags(classes);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [{ input: "buttons", name: "target", label: "\u8868\u793A\u6761\u4EF6", values: { site: "\u30B5\u30A4\u30C8\u3067\u4E00\u56DE", page: "\u30DA\u30FC\u30B8\u3067\u4E00\u56DE", every: "\u6BCE\u56DE\u8868\u793A" }, key: "target" }, "contentWidth"];
        wp.hooks.applyFilters("catpow.blocks.entrypopup.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Collapsible, { title: "\u{1F43E} EntryPopup" }, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps({ className: flagsToClassNames({ ...states, isOpen: true }), style: vars }) }, /* @__PURE__ */ wp.element.createElement("div", { className: "_body" }, /* @__PURE__ */ wp.element.createElement("div", { className: "_contents" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)), /* @__PURE__ */ wp.element.createElement("div", { className: "_close", onClick: () => setOpen(false) })), /* @__PURE__ */ wp.element.createElement("div", { className: "_bg" })))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: __("\u30AF\u30E9\u30B9", "catpow"), icon: "art", ...{ setAttributes, attributes }, selectiveClasses })));
    },
    save({ attributes, className, setAttributes }) {
      const { classes, vars } = attributes;
      const { InnerBlocks, useBlockProps } = wp.blockEditor;
      const blockProps = useBlockProps.save({
        className: classes,
        style: vars,
        "data-wp-interactive": "catpow/entrypopup",
        "data-wp-context": JSON.stringify({
          isOpen: true
        }),
        "data-wp-class--is-open": "context.isOpen",
        "data-wp-bind--hidden": "!context.isOpen"
      });
      return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement("div", { className: "_body" }, /* @__PURE__ */ wp.element.createElement("div", { className: "_contents" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)), /* @__PURE__ */ wp.element.createElement("div", { className: "_close", "data-wp-on--click": "actions.close" })), /* @__PURE__ */ wp.element.createElement("div", { className: "_bg", "data-wp-on--click": "actions.close" })));
    }
  });
})();
