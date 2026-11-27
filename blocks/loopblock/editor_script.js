(() => {
  // node_modules/clsx/dist/clsx.mjs
  function r(e) {
    var t, f, n = "";
    if ("string" == typeof e || "number" == typeof e) n += e;
    else if ("object" == typeof e) if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else for (f in e) e[f] && (n && (n += " "), n += f);
    return n;
  }
  function clsx() {
    for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
    return n;
  }

  // ../blocks/loopblock/editor_script.jsx
  var { InnerBlocks, BlockControls, InspectorControls, useBlockProps } = wp.blockEditor;
  var { Icon, PanelBody, TextareaControl, TextControl, ToolbarGroup } = wp.components;
  wp.blocks.registerBlockType("catpow/loopblock", {
    icon: "editor-code",
    category: "catpow-functional",
    example: CP.example,
    edit({ attributes, setAttributes, className }) {
      const { content_path, query, AltMode = false } = attributes;
      const blockProps = useBlockProps({
        className: clsx("loop-block", AltMode ? "cp-altcontent" : "cp-embeddedcontent")
      });
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
      )), /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(CP.Label, { icon: "welcome-comments" }, content_path), /* @__PURE__ */ wp.element.createElement(InnerBlocks, { template: [["catpow/loopblockcontent"], ["catpow/loopblockcontent", { name: "on_empty" }]], templateLock: "all" })), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "Query" }, /* @__PURE__ */ wp.element.createElement(
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
      return /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null);
    }
  });
  wp.blocks.registerBlockType("catpow/loopblockcontent", {
    apiVersion: 3,
    icon: "editor-code",
    category: "catpow",
    parent: ["catpow/loopblock"],
    edit({ attributes, className, setAttributes, clientId }) {
      const { name } = attributes;
      const template = name == "on_empty" ? [["core/paragraph", { align: "center", content: "Not Found" }]] : [["catpow/section"]];
      return /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps({ className: "loop-block-content" }) }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, { template, templateLock: false }));
    },
    save({ attributes, className, setAttributes }) {
      const { name } = attributes;
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("loop-block-content", { name }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
