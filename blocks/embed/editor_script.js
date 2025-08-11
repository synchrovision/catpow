(() => {
  // ../blocks/embed/editor_script.jsx
  wp.blocks.registerBlockType("catpow/embed", {
    title: "\u{1F43E} Embed",
    description: "\u30C6\u30FC\u30DE\u306B\u5B9A\u7FA9\u3055\u308C\u305F\u57CB\u3081\u8FBC\u307F\u30B3\u30F3\u30C6\u30F3\u30C4\u3092\u8868\u793A\u3057\u307E\u3059\u3002",
    icon: "editor-code",
    category: "catpow-embed",
    example: CP.example,
    edit({ attributes, setAttributes, className }) {
      const { InspectorControls } = wp.blockEditor;
      const { PanelBody, TreeSelect } = wp.components;
      const { serverSideRender: ServerSideRender } = wp;
      const { content_path, props, options = false } = attributes;
      if (!options && content_path) {
        const path = content_path.slice(0, content_path.lastIndexOf("/"));
        wp.apiFetch({ path: "/cp/v1/blocks/config/embed/options?path=" + path }).catch((res) => {
          console.log(res);
        }).then((options2) => {
          const newProps = JSON.parse(props);
          const initOption = (option, key) => {
            option.key = key;
            option.json = "props";
            if (option.hasOwnProperty("default") && !newProps.hasOwnProperty(key)) {
              newProps[key] = option.default;
            }
            if (option.sub) {
              for (const subKey in option.sub) {
                initOption(option.sub[subKey], subKey);
              }
            }
          };
          for (const key in options2) {
            initOption(options2[key], key);
          }
          setAttributes({ options: options2, props: JSON.stringify(newProps) });
        });
      }
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { className: "cp-embeddedcontent" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, content_path), /* @__PURE__ */ wp.element.createElement(ServerSideRender, { block: "catpow/embed", attributes })), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "Path" }, /* @__PURE__ */ wp.element.createElement(
        TreeSelect,
        {
          label: "path",
          selectedId: content_path,
          tree: Object.values(cpEmbeddablesTree.embed),
          onChange: (content_path2) => {
            const path = content_path2.slice(0, content_path2.lastIndexOf("/"));
            setAttributes({
              content_path: content_path2,
              options: false,
              props: JSON.stringify({ path })
            });
          }
        }
      )), options && /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u8A2D\u5B9A", icon: "edit", set: setAttributes, attr: attributes, selectiveClasses: options, initialOpen: true })));
    },
    save({ attributes, className, setAttributes }) {
      return false;
    }
  });
})();
