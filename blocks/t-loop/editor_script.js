(() => {
  // ../blocks/t-loop/editor_script.jsx
  wp.blocks.registerBlockType("catpow/t-loop", {
    icon: "editor-code",
    category: "catpow-functional",
    parent: CP.mailContensContainer,
    example: CP.example,
    edit({ attributes, setAttributes, className }) {
      const { InnerBlocks, BlockControls, InspectorControls, useBlockProps } = wp.blockEditor;
      const { Icon, PanelBody, TextareaControl, TextControl, ToolbarGroup } = wp.components;
      const { content_path, query, AltMode = false } = attributes;
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(
        ToolbarGroup,
        {
          controls: [
            {
              icon: "welcome-comments",
              title: "AltMode",
              isActive: AltMode,
              onClick: () => setAttributes({ AltMode: !AltMode })
            }
          ]
        }
      )), /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps({ className: AltMode ? "cp-altcontent altMode" : "embedded_content" }) }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, AltMode ? /* @__PURE__ */ wp.element.createElement(Icon, { icon: "welcome-comments" }) : content_path), /* @__PURE__ */ wp.element.createElement(InnerBlocks, { template: [["catpow/t-loopcontent"], ["catpow/t-loopcontent", { name: "on_empty" }]], templateLock: "all" })), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "Query" }, /* @__PURE__ */ wp.element.createElement(
        TextControl,
        {
          label: "content path",
          value: content_path,
          onChange: (content_path2) => {
            setAttributes({ content_path: content_path2 });
          }
        }
      ), /* @__PURE__ */ wp.element.createElement(
        TextareaControl,
        {
          label: "query",
          value: query,
          onChange: (query2) => {
            setAttributes({ query: query2 });
          }
        }
      ))));
    },
    save({ attributes, className, setAttributes }) {
      const { InnerBlocks } = wp.blockEditor;
      return /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null);
    }
  });
  wp.blocks.registerBlockType("catpow/t-loopcontent", {
    apiVersion: 3,
    icon: "editor-code",
    category: "catpow",
    parent: ["catpow/t-loop"],
    edit({ attributes, className, setAttributes, clientId }) {
      const { InnerBlocks, useBlockProps } = wp.blockEditor;
      const { name } = attributes;
      const template = name == "on_empty" ? [["catpow/t-paragraph", { align: "center", content: "Not Found" }]] : [["catpow/t-paragraph"]];
      return /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps() }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, { template, templateLock: false }));
    },
    save({ attributes, className, setAttributes }) {
      const { InnerBlocks } = wp.blockEditor;
      const { name } = attributes;
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("t-loop-content", { name }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
