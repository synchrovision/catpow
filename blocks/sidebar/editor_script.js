(() => {
  // ../blocks/sidebar/editor_script.jsx
  var { __ } = wp.i18n;
  var { useMemo } = wp.element;
  var { RichText, InnerBlocks, BlockControls, InspectorControls, useBlockProps } = wp.blockEditor;
  var { PanelBody, TextareaControl } = wp.components;
  wp.blocks.registerBlockType("catpow/sidebar", {
    title: "\u{1F43E} Sidebar",
    description: "\u30B5\u30A4\u30C9\u30D0\u30FC\u306E\u3042\u308B\u30B3\u30F3\u30C6\u30F3\u30C4\u9818\u57DF\u306E\u30B3\u30F3\u30C6\u30CA\u3067\u3059\u3002",
    icon: "editor-code",
    category: "catpow",
    attributes: {
      classes: { source: "attribute", selector: "div", attribute: "class", default: "wp-block-catpow-sidebar is-align-left is-stuck is-stuck-bottom has-item-size-small" },
      vars: { type: "object" },
      sidebarClases: { type: "string" }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes }) {
      const { classes, vars, sidebarClases } = attributes;
      const primaryClass = "wp-block-catpow-sidebar";
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          { name: "align", type: "buttons", label: __("PC\u30EC\u30A4\u30A2\u30A6\u30C8", "catpow"), values: { isAlignLeft: __("\u5DE6", "catpow"), isAlignRight: __("\u53F3", "catpow") } },
          {
            name: "mobileLayout",
            type: "buttons",
            label: __("SP\u30EC\u30A4\u30A2\u30A6\u30C8", "catpow"),
            values: { isStuck: __("\u7A4D\u4E0A", "ctapow"), isSticky: __("\u8FFD\u5F93", "ctapow") },
            sub: {
              isStuck: [{ name: "stuckDirection", type: "buttons", values: { isStuckTop: __("\u4E0A", "catpow"), isStuckBottom: __("\u4E0B", "catpow") } }]
            }
          },
          "itemSize"
        ];
        const proxy = CP.finderProxy(selectiveClasses2);
        wp.hooks.applyFilters("catpow.blocks.sidebar.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps({ className: classes, style: vars }) }, /* @__PURE__ */ wp.element.createElement(CP.Label, { icon: "columns" }), /* @__PURE__ */ wp.element.createElement(InnerBlocks, { template: [["catpow/maincolumn"], ["catpow/sidecolumn", { classes: sidebarClases }]], templateLock: "all" })), /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(CP.AlignClassToolbar, { set: setAttributes, attr: attributes })), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", set: setAttributes, attr: attributes, selectiveClasses, initialOpen: true }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: "\u30AF\u30E9\u30B9", onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes }))));
    },
    save({ attributes, className, setAttributes }) {
      const { InnerBlocks: InnerBlocks2 } = wp.blockEditor;
      const { classes, vars } = attributes;
      const blockProps = useBlockProps.save({
        id: "{$uid}",
        className: classes,
        style: vars,
        "data-wp-interactive": "catpow/sidebar",
        "data-wp-context": JSON.stringify({ isOpen: false, isViewing: false }),
        "data-wp-init": "callbacks.initBlock",
        "data-wp-class--is-open": "callbacks.isOpen",
        "data-wp-class--is-viewing": "callbacks.isViewing"
      });
      return /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(InnerBlocks2.Content, null));
    }
  });
  wp.blocks.registerBlockType("catpow/sidecolumn", {
    apiVersion: 3,
    title: "\u{1F43E} SideColumn",
    icon: "editor-code",
    category: "catpow",
    attributes: {
      classes: { source: "attribute", attribute: "class", selector: ".wp-block-catpow-sidebar-column", default: "wp-block-catpow-sidebar-column is-column-side has-background-color" }
    },
    parent: ["catpow/sidebar"],
    edit({ attributes, className, setAttributes }) {
      const { classes } = attributes;
      const allowedBlocks = useMemo(() => wp.hooks.applyFilters("catpow.blocks.sidebar.allowedBlocks", ["catpow/sidebar-section"]), []);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = ["level", "color", "colorScheme", "backgroundColor"];
        const proxy = CP.finderProxy(selectiveClasses2);
        wp.hooks.applyFilters("catpow.blocks.sidecolumn.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps({ className: classes }) }, /* @__PURE__ */ wp.element.createElement(CP.Label, { icon: "excerpt-view" }), /* @__PURE__ */ wp.element.createElement("div", { className: "_container" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, { template: [["catpow/sidebar-section"]], allowedBlocks, templateLock: false })), /* @__PURE__ */ wp.element.createElement("div", { className: "_button" }, /* @__PURE__ */ wp.element.createElement("span", { className: "_icon" })))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", set: setAttributes, attr: attributes, selectiveClasses, initialOpen: true }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: "\u30AF\u30E9\u30B9", onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes }))));
    },
    save({ attributes, className, setAttributes }) {
      const { classes } = attributes;
      const { InnerBlocks: InnerBlocks2 } = wp.blockEditor;
      return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { className: classes }, /* @__PURE__ */ wp.element.createElement("div", { className: "_container" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks2.Content, null)), /* @__PURE__ */ wp.element.createElement("div", { className: "_button", "data-wp-on--click": "actions.toggle", "aria-controls": "{$uid}", "data-wp-bind--aria-expanded": "context.isOpen" }, /* @__PURE__ */ wp.element.createElement("span", { className: "_icon" }))));
    }
  });
  wp.blocks.registerBlockType("catpow/maincolumn", {
    apiVersion: 3,
    title: "\u{1F43E} MainColumn",
    icon: "editor-code",
    category: "catpow",
    attributes: {
      columnType: { type: "string", default: "main" }
    },
    parent: ["catpow/sidebar"],
    edit({ attributes, className, setAttributes }) {
      return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps({ className: "sidebar-column- is-column-main" }) }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, { template: [["catpow/section"]], templateLock: false })));
    },
    save({ attributes, className, setAttributes }) {
      return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { className: "sidebar-column- is-column-main" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
  wp.blocks.registerBlockType("catpow/sidebar-section", {
    apiVersion: 3,
    title: "\u{1F43E} SideSection",
    icon: "editor-ul",
    category: "catpow",
    attributes: {
      classes: { source: "attribute", attribute: "class", default: "wp-block-catpow-sidebar-section is-level3" },
      HeadingTag: { type: "string", default: "h3" },
      title: { source: "html", selector: ".wp-block-catpow-sidebar-section__header-title" }
    },
    parent: ["catpow/sidecolumn", "catpow/sidebar-section"],
    edit({ attributes, className, setAttributes, clientId }) {
      const { classes, HeadingTag, title } = attributes;
      const allowedBlocks = useMemo(() => wp.hooks.applyFilters("catpow.blocks.sidebar.allowedBlocks", ["catpow/sidebar-section"]), []);
      const selectiveClasses = useMemo(() => {
        const { devices, imageKeys } = CP.config.div;
        const selectiveClasses2 = ["level", "headingTag"];
        const proxy = CP.finderProxy(selectiveClasses2);
        wp.hooks.applyFilters("catpow.blocks.sideSection.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps({ className: classes }) }, /* @__PURE__ */ wp.element.createElement("header", { className: "_header" }, /* @__PURE__ */ wp.element.createElement(RichText, { tagName: HeadingTag, className: "_title", value: title, placeholder: "Title", onChange: (title2) => setAttributes({ title: title2 }) })), /* @__PURE__ */ wp.element.createElement("div", { className: "_contents" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, { allowedBlocks, templateLock: false })))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", set: setAttributes, attr: attributes, selectiveClasses, initialOpen: true }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: "\u30AF\u30E9\u30B9", onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes }))));
    },
    save({ attributes, className, setAttributes }) {
      const { classes, HeadingTag, title } = attributes;
      return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps.save({ className: classes }) }, /* @__PURE__ */ wp.element.createElement("header", { className: "_header" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: HeadingTag, className: "_title", value: title })), /* @__PURE__ */ wp.element.createElement("div", { className: "_contents" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null))));
    }
  });
})();
