(() => {
  // blocks/widget/editor_script.jsx
  wp.blocks.registerBlockType("catpow/widget", {
    title: "\u{1F43E} Widget",
    description: "\u62E1\u5F35\u6A5F\u80FD\u306B\u5B9A\u7FA9\u3055\u308C\u305F\u57CB\u3081\u8FBC\u307F\u30B3\u30F3\u30C6\u30F3\u30C4\u3092\u8868\u793A\u3057\u307E\u3059\u3002",
    icon: "editor-code",
    category: "catpow-embed",
    example: CP.example,
    edit({ attributes, setAttributes, className }) {
      const { InspectorControls } = wp.blockEditor;
      const { PanelBody, TreeSelect, ServerSideRender } = wp.components;
      const { func, param } = attributes;
      let statesClasses, panels;
      if (func) {
        statesClasses = cpEmbeddablesTree.widget[func].conf.map((conf) => {
          conf.json = "param";
          return conf;
        });
      }
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { className: "widgetded_content" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, func), /* @__PURE__ */ wp.element.createElement(ServerSideRender, { block: "catpow/widget", attributes })), ",", /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "Path" }, /* @__PURE__ */ wp.element.createElement(
        TreeSelect,
        {
          label: "path",
          selectedId: func,
          tree: Object.values(cpEmbeddablesTree.widget),
          onChange: (func2) => {
            setAttributes({ func: func2 });
          }
        }
      )), statesClasses && /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u8A2D\u5B9A",
          icon: "admin-appearance",
          set: setAttributes,
          attr: attributes,
          selectiveClasses: statesClasses
        }
      )));
    },
    save({ attributes, className, setAttributes }) {
      return "null";
    }
  });
})();
