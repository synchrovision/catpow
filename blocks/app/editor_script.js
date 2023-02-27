(() => {
  // ../blocks/app/editor_script.jsx
  wp.blocks.registerBlockType("catpow/app", {
    title: "\u{1F43E} App",
    icon: "editor-code",
    category: "catpow-embed",
    example: CP.example,
    supports: {
      customClassName: false
    },
    edit({ attributes, setAttributes, className }) {
      const { content_path, props, options } = attributes;
      const { useEffect } = wp.element;
      const { InspectorControls } = wp.blockEditor;
      const { PanelBody, TreeSelect } = wp.components;
      const { useSelect } = wp.data;
      if (!options && content_path) {
        const path = content_path.substr(0, content_path.lastIndexOf("/"));
        wp.apiFetch({ path: "/cp/v1/blocks/config/app/options?path=" + path }).catch((res) => {
          console.log(res);
        }).then((options2) => {
          const newProps = JSON.parse(props);
          const initOption = (option) => {
            option.json = "props";
            if (option.hasOwnProperty("default") && !newProps.hasOwnProperty(option.key)) {
              newProps[option.key] = option.default;
            }
            if (option.sub) {
              if (Array.isArray(option.sub)) {
                option.sub.forEach(initOption);
              } else {
                Object.keys(option.sub).forEach((key) => initOption(option.sub[key]));
              }
            }
          };
          options2.forEach(initOption);
          setAttributes({ options: options2, props: JSON.stringify(newProps) });
        });
      }
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { className: "embedded_content" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, content_path), /* @__PURE__ */ wp.element.createElement(CP.ServerSideRender, { block: "catpow/app", attributes })), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "Path" }, /* @__PURE__ */ wp.element.createElement(
        TreeSelect,
        {
          label: "path",
          selectedId: content_path,
          tree: Object.values(cpEmbeddablesTree.app),
          onChange: (content_path2) => {
            const path = content_path2.substr(0, content_path2.lastIndexOf("/"));
            setAttributes({ content_path: content_path2, options: false, props: JSON.stringify({ path }) });
          }
        }
      )), options && /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u8A2D\u5B9A",
          icon: "edit",
          set: setAttributes,
          attr: attributes,
          selectiveClasses: options,
          initialOpen: true
        }
      )));
    },
    save({ attributes, className, setAttributes }) {
      return "null";
    }
  });
})();
