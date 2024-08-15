(() => {
  // ../blocks/pagecontent/editor_script.jsx
  var { __ } = wp.i18n;
  wp.blocks.registerBlockType("catpow/pagecontent", {
    title: "\u{1F43E} pagecontent",
    description: "\u73FE\u5728\u306EURL\u306B\u5FDC\u3058\u305F\u30B3\u30F3\u30C6\u30F3\u30C4\u3092\u8868\u793A\u3057\u307E\u3059\u3002",
    icon: "editor-code",
    category: "catpow-embed",
    example: CP.example,
    edit({ attributes, setAttributes, className }) {
      const { content_path, post_data_path, inputs, data_id, values } = attributes;
      const { InspectorControls } = wp.blockEditor;
      const { PanelBody, TreeSelect, TextareaControl, TextControl } = wp.components;
      const { serverSideRender: ServerSideRender } = wp;
      const { __: __2 } = wp.i18n;
      return /* @__PURE__ */ wp.element.createElement(CP.Message, null, __2("\u8868\u793A\u4E2D\u306EURL\u306B\u5BFE\u5FDC\u3057\u305F\u30B3\u30F3\u30C6\u30F3\u30C4\u3092\u8868\u793A\u3057\u307E\u3059\u3002\u30C6\u30FC\u30DE\u306BURL\u306B\u5BFE\u5FDC\u3057\u305F\u30B3\u30F3\u30C6\u30F3\u30C4\u306E\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u304C\u5B9A\u7FA9\u3055\u308C\u3066\u3044\u308B\u5834\u5408\u306F\u305D\u306E\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u304C\u5229\u7528\u3055\u308C\u307E\u3059\u3002\u5B9A\u7FA9\u304C\u306A\u3044\u5834\u5408\u306F\u500B\u5225\u30DA\u30FC\u30B8\u306B\u304A\u3044\u3066\u306F\u6295\u7A3F\u3055\u308C\u305F\u30B3\u30F3\u30C6\u30F3\u30C4\u304C\u8868\u793A\u3055\u308C\u307E\u3059\u3002"));
    },
    save({ attributes, className, setAttributes }) {
      return false;
    }
  });
})();
