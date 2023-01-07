(() => {
  // ../blocks/container/editor_script.jsx
  wp.blocks.registerBlockType("catpow/container", {
    title: "\u{1F43E} Container",
    description: "\u30B9\u30AF\u30ED\u30FC\u30EB\u53EF\u80FD\u9818\u57DF\u3092\u4F5C\u6210\u3067\u304D\u308B\u30B3\u30F3\u30C6\u30CA\u3067\u3059\u3002",
    icon: "editor-code",
    category: "catpow",
    transforms: {
      from: [
        {
          type: "block",
          blocks: ["core/group"],
          transform: (attributes, innerBlocks) => {
            return createBlock("catpow/container", { classes: "wp-block-catpow-container " }, innerBlocks);
          }
        }
      ]
    },
    attributes: {
      color: { default: "0" },
      id: { source: "attribute", selector: ".wp-block-catpow-container", attribute: "id" },
      classes: { source: "attribute", selector: "container", attribute: "class", default: "wp-block-catpow-container" }
    },
    example: CP.example,
    edit(props) {
      const { useState, useMemo } = wp.element;
      const { attributes, className, setAttributes, context } = props;
      const { id, classes, color } = attributes;
      const states = CP.wordsToFlags(classes);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          { name: "scrollX", label: __("\u30B9\u30AF\u30ED\u30FC\u30EBX", "catpow"), values: "hasScrollX", sub: [
            { name: "contentWidth", type: "gridbuttons", label: __("\u30B3\u30F3\u30C6\u30F3\u30C4\u306E\u5E45", "catpow"), values: { hasSmallContents: "\u5C0F", hasMiddleContents: "\u4E2D", hasLargeContents: "\u5927" } }
          ] },
          { name: "scrollY", label: __("\u30B9\u30AF\u30ED\u30FC\u30EBY", "catpow"), values: "hasScrollY", sub: [
            { name: "containerHeight", type: "gridbuttons", label: __("\u30B3\u30F3\u30C6\u30CA\u306E\u9AD8\u3055", "catpow"), values: { isSmallContainer: "\u5C0F", isMiddleContainer: "\u4E2D", isLargeContainer: "\u5927" } }
          ] },
          "color"
        ];
        wp.hooks.applyFilters("catpow.blocks.container.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return [
        /* @__PURE__ */ wp.element.createElement("div", { className: classes }, /* @__PURE__ */ wp.element.createElement("div", { className: "body" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, { template: [["core/paragraph", { content: CP.dummyText.text }]], templateLock: false }))),
        /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(
          CP.SelectClassPanel,
          {
            title: "\u30AF\u30E9\u30B9",
            icon: "art",
            set: setAttributes,
            attr: attributes,
            selectiveClasses,
            filters: CP.filters.container || {}
          }
        ), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(
          TextareaControl,
          {
            label: "\u30AF\u30E9\u30B9",
            onChange: (classes2) => setAttributes({ classes: classes2 }),
            value: classes
          }
        )))
      ];
    },
    save({ attributes, className, setAttributes }) {
      const { id, classes = "", color } = attributes;
      const states = CP.wordsToFlags(classes);
      return /* @__PURE__ */ wp.element.createElement("div", { className: classes }, /* @__PURE__ */ wp.element.createElement("div", { className: "body" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
