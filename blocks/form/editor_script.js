(() => {
  // blocks/form/editor_script.jsx
  wp.blocks.registerBlockType("catpow/form", {
    title: "\u{1F43E} Form",
    description: "\u30C6\u30FC\u30DE\u306B\u5B9A\u7FA9\u3055\u308C\u305F\u30D5\u30A9\u30FC\u30E0\u3092\u8868\u793A\u3057\u307E\u3059\u3002",
    icon: "editor-code",
    category: "catpow-embed",
    example: CP.example,
    edit({ attributes, setAttributes, className }) {
      const { content_path, post_data_path, inputs, data_id, values } = attributes;
      const { InspectorControls } = wp.blockEditor;
      const { PanelBody, TreeSelect, TextareaControl, TextControl, ServerSideRender } = wp.components;
      let postDataSelection = false;
      Object.keys(cpEmbeddablesTree.form).forEach((parentKey) => {
        cpEmbeddablesTree.form[parentKey].children.map((item) => {
          if (item.id === content_path && item.post_data_paths) {
            postDataSelection = [];
            Object.keys(item.post_data_paths).forEach(function(key) {
              postDataSelection.push({ id: key, name: item.post_data_paths[key] });
            });
          }
        });
      });
      if (postDataSelection === false) {
        if (post_data_path) {
          setAttributes({ post_data_path: false });
        }
      } else {
        if (!post_data_path || !postDataSelection.some((item) => item["id"] === post_data_path)) {
          setAttributes({ post_data_path: postDataSelection[0]["id"] });
        }
      }
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { className: "embedded_content" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, content_path), /* @__PURE__ */ wp.element.createElement(ServerSideRender, { block: "catpow/form", attributes })), ",", /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "\u30D5\u30A9\u30FC\u30E0" }, /* @__PURE__ */ wp.element.createElement(
        TreeSelect,
        {
          label: "path",
          selectedId: content_path,
          tree: Object.values(cpEmbeddablesTree.form),
          onChange: (content_path2) => {
            setAttributes({ content_path: content_path2 });
          }
        }
      ), postDataSelection && /* @__PURE__ */ wp.element.createElement(
        TreeSelect,
        {
          label: "form",
          selectedId: post_data_path,
          tree: postDataSelection,
          onChange: (post_data_path2) => {
            setAttributes({ post_data_path: post_data_path2 });
          }
        }
      )), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "\u5165\u529B\u5024", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(
        TextControl,
        {
          label: "\u5165\u529B\u540D",
          value: inputs,
          onChange: (inputs2) => {
            setAttributes({ inputs: inputs2 });
          }
        }
      ), /* @__PURE__ */ wp.element.createElement(
        TextControl,
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
      return "null";
    }
  });
})();
