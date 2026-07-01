(() => {
  // ../blocks/sidebar-articlenav/editor_script.jsx
  var { __ } = wp.i18n;
  var { useMemo, useCallback } = wp.element;
  var { RichText, InnerBlocks, BlockControls, InspectorControls, useBlockProps } = wp.blockEditor;
  var { PanelBody, TextareaControl } = wp.components;
  wp.blocks.registerBlockType("catpow/sidebar-articlenav", {
    apiVersion: 3,
    title: "\u{1F43E} SideArticelNav",
    icon: "editor-ul",
    category: "catpow",
    attributes: {
      classes: { source: "attribute", selector: ".wp-block-catpow-sidebar-articlenav", attribute: "class", default: "wp-block-catpow-sidebar-articlenav" }
    },
    parent: ["catpow/sidecolumn", "catpow/side-section"],
    edit({ attributes, className, setAttributes, clientId }) {
      const { classes } = attributes;
      const { useEffect } = wp.element;
      const { RichText: RichText2, useBlockProps: useBlockProps2 } = wp.blockEditor;
      const parentClientId = wp.data.select("core/block-editor").getBlockParentsByBlockName(clientId, "catpow/sidebar")[0];
      const mainContents = wp.data.select("core/block-editor").getBlock(parentClientId).innerBlocks[0].innerBlocks;
      const getTargetSections = useCallback((innerBlocks) => {
        return innerBlocks.filter((block) => block.name == "catpow/section" && !!block.attributes.anchor).map((block) => {
          return {
            title: block.attributes.title,
            items: getTargetSections(block.innerBlocks)
          };
        });
      }, []);
      const targetSections = useMemo(() => getTargetSections(mainContents), [mainContents]);
      const blockProps = useBlockProps2({ className: classes });
      return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement("ul", { className: "_items" }, targetSections.map((section) => /* @__PURE__ */ wp.element.createElement("li", { className: "_item" }, /* @__PURE__ */ wp.element.createElement("a", { className: "_link" }, section.title), /* @__PURE__ */ wp.element.createElement("ul", { className: "_subitems" }, section.items.map((subitem) => /* @__PURE__ */ wp.element.createElement("li", { className: "_item" }, /* @__PURE__ */ wp.element.createElement("a", { className: "_link" }, subitem.title), /* @__PURE__ */ wp.element.createElement("ul", { className: "_enditems" }, subitem.items.map((enditem) => /* @__PURE__ */ wp.element.createElement("li", { className: "_item" }, /* @__PURE__ */ wp.element.createElement("a", { className: "_link" }, enditem.title))))))))))));
    },
    save({ attributes, className, setAttributes }) {
      const { classes } = attributes;
      const blockProps = useBlockProps.save({
        className: classes,
        "data-wp-interactive": "catpow/sidebar-articlenav",
        "data-wp-context": JSON.stringify({
          activeItems: {},
          items: []
        }),
        "data-wp-init": "callbacks.initBlock"
      });
      return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement("ul", { className: "_items" }, /* @__PURE__ */ wp.element.createElement("template", { "data-wp-each": "context.items" }, /* @__PURE__ */ wp.element.createElement("li", { className: "_item" }, /* @__PURE__ */ wp.element.createElement(
        "a",
        {
          className: "_link",
          "data-wp-bind--href": "context.item.href",
          "data-wp-bind--data-section-id": "context.item.id",
          "data-wp-on--click": "actions.onClickItem",
          "data-wp-class--is-active": "callbacks.isItemActive",
          "data-wp-text": "context.item.label"
        }
      ), /* @__PURE__ */ wp.element.createElement("ul", { className: "_subitems" }, /* @__PURE__ */ wp.element.createElement("template", { "data-wp-each--subitem": "context.item.items" }, /* @__PURE__ */ wp.element.createElement("li", { className: "_item" }, /* @__PURE__ */ wp.element.createElement(
        "a",
        {
          className: "_link",
          "data-wp-bind--href": "context.subitem.href",
          "data-wp-bind--data-section-id": "context.subitem.id",
          "data-wp-on--click": "actions.onClickItem",
          "data-wp-class--is-active": "callbacks.isItemActive",
          "data-wp-text": "context.subitem.label"
        }
      ), /* @__PURE__ */ wp.element.createElement("ul", { className: "_enditems" }, /* @__PURE__ */ wp.element.createElement("template", { "data-wp-each--enditem": "context.subitem.items" }, /* @__PURE__ */ wp.element.createElement("li", { className: "_item" }, /* @__PURE__ */ wp.element.createElement(
        "a",
        {
          className: "_link",
          "data-wp-bind--href": "context.enditem.href",
          "data-wp-bind--data-section-id": "context.enditem.id",
          "data-wp-on--click": "actions.onClickItem",
          "data-wp-class--is-active": "callbacks.isItemActive",
          "data-wp-text": "context.enditem.label"
        }
      ))))))))))));
    }
  });
})();
