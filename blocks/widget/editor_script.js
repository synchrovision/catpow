(() => {
  // ../blocks/widget/editor_script.jsx
  var { __ } = wp.i18n;
  wp.blocks.registerBlockType("catpow/widget", {
    icon: "editor-code",
    category: "catpow-embed",
    example: CP.example,
    edit({ attributes, setAttributes, className }) {
      const { InspectorControls, useBlockProps } = wp.blockEditor;
      const { PanelBody, TreeSelect } = wp.components;
      const { serverSideRender: ServerSideRender } = wp;
      const { func, param } = attributes;
      const statesClasses = func ? cpEmbeddablesTree.widget[func].conf : false;
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps({ className: "cp-embeddedcontent" }) }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, func), /* @__PURE__ */ wp.element.createElement(ServerSideRender, { block: "catpow/widget", attributes })), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "Path" }, /* @__PURE__ */ wp.element.createElement(
        TreeSelect,
        {
          label: "path",
          selectedId: func,
          tree: Object.values(cpEmbeddablesTree.widget),
          onChange: (func2) => {
            setAttributes({ func: func2 });
          }
        }
      )), statesClasses && /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { initialOpen: true, title: __("\u8A2D\u5B9A", "catpow"), icon: "admin-appearance", ...{ setAttributes, attributes }, selectiveClasses: statesClasses })));
    },
    save({ attributes, className, setAttributes }) {
      return "null";
    }
  });
})();
