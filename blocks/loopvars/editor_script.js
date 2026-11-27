(() => {
  // ../blocks/loopvars/editor_script.jsx
  var { __ } = wp.i18n;
  wp.blocks.registerBlockType("catpow/loopvars", {
    icon: "editor-code",
    category: "catpow-functional",
    example: CP.example,
    edit({ attributes, setAttributes, className }) {
      const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
      const { Icon, PanelBody } = wp.components;
      const { items, columns, EditMode = false } = attributes;
      const blockProps = useBlockProps({ className: EditMode ? "cp-altcontent" : "" });
      console.log({ items, columns });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.SelectModeToolbar, { setAttributes, attributes }), EditMode ? /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(CP.Label, { icon: "edit" }, "vars"), /* @__PURE__ */ wp.element.createElement(CP.EditItemsTable, { setAttributes, attributes, itemKeys: ["items"], columns })) : /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(CP.Label, { icon: "admin-generic" }, "LoopVars"), /* @__PURE__ */ wp.element.createElement(InnerBlocks, { template: [["catpow/section", { title: "[var title]" }, [["core/paragraph", { content: "[var text]" }]]]] })), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(PanelBody, { title: __("\u5909\u6570", "catpow") }, /* @__PURE__ */ wp.element.createElement(
        CP.EditItemsTable,
        {
          setAttributes,
          attributes,
          itemKeys: ["columns"],
          columns: [
            {
              type: "select",
              key: "type",
              options: [
                { label: "Text", value: "text" },
                { label: "Number", value: "number" },
                { label: "Color", value: "color" },
                { label: "Date", value: "date" }
              ]
            },
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
