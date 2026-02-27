(() => {
  // ../blocks/loop/editor_script.jsx
  var { InnerBlocks, BlockControls, InspectorControls, useBlockProps } = wp.blockEditor;
  var { Icon, PanelBody, TreeSelect, TextareaControl, ToolbarGroup } = wp.components;
  wp.blocks.registerBlockType("catpow/loop", {
    title: "\u{1F43E} Loop",
    description: "\u30C6\u30FC\u30DE\u306B\u5B9A\u7FA9\u3055\u308C\u305F\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3067\u6295\u7A3F\u3092\u8868\u793A\u3057\u307E\u3059\u3002",
    icon: "editor-code",
    category: "catpow-embed",
    example: CP.example,
    edit({ attributes, setAttributes, className, clientId }) {
      const { serverSideRender: ServerSideRender } = wp;
      const { content_path, deps = {}, query, config, EditMode = false } = attributes;
      const { useMemo, useEffect } = wp.element;
      const itemMap = useMemo(() => {
        const map = {};
        Object.keys(cpEmbeddablesTree.loop).map((label) => {
          cpEmbeddablesTree.loop[label].children.map((item2) => {
            map[item2.id] = item2;
          });
        });
        return map;
      }, []);
      const item = useMemo(() => content_path && itemMap[content_path], [itemMap, content_path]);
      useEffect(() => {
        if (content_path && itemMap[content_path].has_config) {
          const path = content_path.slice(0, content_path.lastIndexOf("/"));
          wp.apiFetch({ path: "/cp/v1/" + path + "/config" }).then((config2) => {
            if (config2.slots != null) {
              config2.template = Object.keys(config2.slots).map((name) => ["catpow/loopcontent", { name }, config2.slots[name]]);
            }
            console.log({ config: config2 });
            setAttributes({ config: config2 });
          }).catch((res) => {
            setAttributes({ props: {}, config: null });
          });
        } else {
          setAttributes({ props: {}, config: null });
        }
      }, [content_path]);
      const blockProps = useBlockProps({ className: config?.template && EditMode ? "cp-altcontent loop-contents" : "" });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, config?.template && /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(
        ToolbarGroup,
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
      )), config?.template && EditMode ? /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(CP.Label, { icon: "edit" }), /* @__PURE__ */ wp.element.createElement(InnerBlocks, { allowedBlocks: ["catpow/loopcontent"], template: config.template, templateLock: "ALL" })) : /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(CP.Label, null, content_path), /* @__PURE__ */ wp.element.createElement(ServerSideRender, { block: "catpow/loop", attributes, httpMethod: "POST" })), item?.deps?.css && /* @__PURE__ */ wp.element.createElement("link", { rel: "stylesheet", href: item.deps.css }), item?.deps?.js && /* @__PURE__ */ wp.element.createElement("script", { type: "text/javascript", src: item.deps.js }), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "Query" }, /* @__PURE__ */ wp.element.createElement(
        TreeSelect,
        {
          label: "content path",
          selectedId: content_path,
          tree: Object.values(cpEmbeddablesTree.loop),
          onChange: (content_path2) => {
            const path = content_path2.slice(0, content_path2.lastIndexOf("/"));
            const { has_template } = itemMap[content_path2];
            if (has_template) {
              wp.apiFetch({ path: "/cp/v1/" + path + "/template" }).then((template) => {
                wp.data.dispatch("core/block-editor").replaceInnerBlocks(clientId, CP.createBlocks(template));
              });
            }
            setAttributes({ content_path: content_path2, config: null });
          }
        }
      ), content_path && content_path.slice(-8) === "loop.php" && /* @__PURE__ */ wp.element.createElement(
        TextareaControl,
        {
          label: "query",
          value: query,
          onChange: (query2) => {
            setAttributes({ query: query2 });
          }
        }
      )), config?.schema && /* @__PURE__ */ wp.element.createElement(
        Catpow.JsonEditor,
        {
          json: attributes.props,
          debug: false,
          schema: config.schema,
          autoSave: 100,
          showHeader: false,
          onChange: (props) => {
            setAttributes({ props: { ...props } });
          }
        }
      )));
    },
    save() {
      return /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null);
    },
    deprecated: [
      {
        save() {
          return "null";
        }
      }
    ]
  });
  wp.blocks.registerBlockType("catpow/loopcontent", {
    apiVersion: 3,
    title: "\u{1F43E} LoopContent",
    icon: "editor-code",
    category: "catpow",
    parent: ["catpow/loop"],
    attributes: {
      name: {
        type: "attribute",
        label: "\u540D\u524D",
        selector: "loop-content",
        attribute: "name",
        default: "content"
      }
    },
    edit({ attributes }) {
      const { name } = attributes;
      const template = name == "on_empty" ? [["core/paragraph", { align: "center", content: "Not Found" }]] : [["catpow/section"]];
      return /* @__PURE__ */ wp.element.createElement("div", { className: "loop-content" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, { template, templateLock: false }));
    },
    save({ attributes }) {
      const { name } = attributes;
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("loop-content", { name }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
