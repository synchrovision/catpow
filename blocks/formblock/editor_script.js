(() => {
  // blocks/formblock/editor_script.jsx
  wp.blocks.registerBlockType("catpow/formblock", {
    title: "\u{1F43E} FormBlock",
    description: "\u30C6\u30FC\u30DE\u306B\u5B9A\u7FA9\u3055\u308C\u305F\u7DE8\u96C6\u53EF\u80FD\u306A\u30D5\u30A9\u30FC\u30E0\u3092\u8868\u793A\u3057\u307E\u3059\u3002",
    icon: "editor-code",
    category: "catpow-embed",
    example: CP.example,
    edit({ attributes, setAttributes, className, isSelected, clientId }) {
      const { InnerBlocks, BlockControls, InspectorControls } = wp.blockEditor;
      const { PanelBody: PanelBody2, TreeSelect, TextareaControl, TextControl: TextControl2 } = wp.components;
      const { content_path, inputs, data_id, values, actions, EditMode = false } = attributes;
      let postDataSelection = false;
      if (!actions && content_path) {
        const path = content_path.substr(0, content_path.lastIndexOf("/"));
        wp.apiFetch({ path: "cp/v1/" + path + "/actions" }).then((actions2) => {
          Object.keys(actions2).map((key) => actions2[key].json = "action");
          setAttributes({ actions: actions2 });
        });
      }
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(
        Toolbar,
        {
          controls: [
            {
              icon: "edit",
              title: "EditMode",
              isActive: EditMode,
              onClick: () => setAttributes({ EditMode: !EditMode })
            }
          ]
        }
      )), /* @__PURE__ */ wp.element.createElement("div", { className: "formBlock embedded_content" + (EditMode ? " editMode" : "") }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, content_path || "not selected"), /* @__PURE__ */ wp.element.createElement(
        InnerBlocks,
        {
          allowedBlocks: ["catpow/formblockcontent"]
        }
      )), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(PanelBody2, { title: "\u30D5\u30A9\u30FC\u30E0" }, /* @__PURE__ */ wp.element.createElement(
        TreeSelect,
        {
          label: "path",
          selectedId: content_path,
          tree: Object.values(cpEmbeddablesTree.formblock),
          onChange: (content_path2) => {
            const path = content_path2.substr(0, content_path2.lastIndexOf("/"));
            wp.apiFetch({ path: "cp/v1/" + path + "/template" }).then((template) => {
              wp.data.dispatch("core/block-editor").replaceInnerBlocks(
                clientId,
                CP.createBlocks(template)
              );
            });
            setAttributes({ content_path: content_path2, actions: null });
          }
        }
      )), /* @__PURE__ */ wp.element.createElement(PanelBody2, { title: "\u5165\u529B\u5024", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(
        TextControl2,
        {
          label: "\u5165\u529B\u540D",
          value: inputs,
          onChange: (inputs2) => {
            setAttributes({ inputs: inputs2 });
          }
        }
      ), /* @__PURE__ */ wp.element.createElement(
        TextControl2,
        {
          label: "\u30C7\u30FC\u30BFID",
          value: data_id,
          onChange: (data_id2) => {
            setAttributes({ data_id: data_id2 });
          }
        }
      ), /* @__PURE__ */ wp.element.createElement(
        TextareaControl,
        {
          label: "\u521D\u671F\u5024",
          value: values,
          onChange: (values2) => {
            setAttributes({ values: values2 });
          }
        }
      ))));
    },
    save({ attributes, className, setAttributes }) {
      const { InnerBlocks } = wp.blockEditor;
      return /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null);
    }
  });
  wp.blocks.registerBlockType("catpow/formblockcontent", {
    title: "\u{1F43E} FormBlockContent",
    icon: "editor-code",
    category: "catpow",
    parent: ["catpow/formblock"],
    attributes: {
      name: { type: "attribute", label: "\u540D\u524D", selector: "formBlockContent", attribute: "name", default: "edit" },
      action: { type: "attribute", label: "\u30A2\u30AF\u30B7\u30E7\u30F3", selector: "formBlockContent", attribute: "action", default: "{}" }
    },
    edit({ attributes, className, setAttributes, clientId }) {
      const { InnerBlocks, InspectorControls } = wp.blockEditor;
      const { name } = attributes;
      const parentClientId = wp.data.select("core/block-editor").getBlockParentsByBlockName(clientId, "catpow/formblock")[0];
      const parentBlock = wp.data.select("core/block-editor").getBlock(parentClientId);
      const actions = parentBlock.attributes.actions;
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { className: "formBlockContent embedded_content" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, name), /* @__PURE__ */ wp.element.createElement(InnerBlocks, { template: [["catpow/section"]], templateLock: false })), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "\u8A2D\u5B9A", initialOpen: true }, /* @__PURE__ */ wp.element.createElement(
        TextControl,
        {
          label: "\u540D\u524D",
          value: name,
          onChange: (name2) => {
            setAttributes({ name: name2 });
          }
        }
      )), actions && /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30A2\u30AF\u30B7\u30E7\u30F3",
          icon: "edit",
          set: setAttributes,
          attr: attributes,
          selectiveClasses: actions,
          initialOpen: true
        }
      )));
    },
    save({ attributes, className, setAttributes }) {
      const { InnerBlocks } = wp.blockEditor;
      const { name, action } = attributes;
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("formBlockContent", { name, action }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
