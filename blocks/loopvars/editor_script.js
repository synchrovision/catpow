(() => {
  // blocks/loopvars/editor_script.jsx
  wp.blocks.registerBlockType("catpow/loopvars", {
    title: "\u{1F43E} LoopVars",
    description: "\u30D6\u30ED\u30C3\u30AF\u306E\u5185\u5BB9\u3092\u5909\u6570\u306E\u30C6\u30FC\u30D6\u30EB\u3092\u30EB\u30FC\u30D7\u3057\u3066\u8868\u793A\u3057\u307E\u3059\u3002\u5404\u5909\u6570\u306F\u30D6\u30ED\u30C3\u30AF\u5185\u3067[var \u5909\u6570\u540D]\u306E\u30B7\u30E7\u30FC\u30C8\u30B3\u30FC\u30C9\u3067\u5229\u7528\u3067\u304D\u307E\u3059\u3002",
    icon: "editor-code",
    category: "catpow-functional",
    example: CP.example,
    edit({ attributes, setAttributes, className }) {
      const { InnerBlocks, InspectorControls } = wp.blockEditor;
      const { PanelBody } = wp.components;
      const { items, columns, EditMode = false } = attributes;
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(
        CP.SelectModeToolbar,
        {
          set: setAttributes,
          attr: attributes
        }
      ), EditMode ? /* @__PURE__ */ wp.element.createElement("div", { className: "alt_content" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "edit" })), /* @__PURE__ */ wp.element.createElement(
        CP.EditItemsTable,
        {
          set: setAttributes,
          attr: attributes,
          columns
        }
      )) : /* @__PURE__ */ wp.element.createElement("div", { className: "embedded_content" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, "LoopVars"), /* @__PURE__ */ wp.element.createElement(InnerBlocks, { template: [
        ["catpow/section", { title: "[var title]" }, [
          ["core/paragraph", { content: "[var text]" }]
        ]]
      ] })), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "\u5909\u6570" }, /* @__PURE__ */ wp.element.createElement(
        CP.EditItemsTable,
        {
          set: setAttributes,
          attr: attributes,
          itemsKey: "columns",
          columns: [
            { type: "text", key: "type" },
            { type: "text", key: "key" }
          ]
        }
      ))));
    },
    save({ attributes, className, setAttributes }) {
      const { InnerBlocks } = wp.blockEditor;
      return /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null);
    }
  });
})();
