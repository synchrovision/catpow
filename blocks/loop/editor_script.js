(() => {
  // ../blocks/loop/editor_script.jsx
  wp.blocks.registerBlockType("catpow/loop", {
    title: "\u{1F43E} Loop",
    description: "\u30C6\u30FC\u30DE\u306B\u5B9A\u7FA9\u3055\u308C\u305F\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\u3067\u6295\u7A3F\u3092\u8868\u793A\u3057\u307E\u3059\u3002",
    icon: "editor-code",
    category: "catpow-embed",
    example: CP.example,
    edit({ attributes, setAttributes, className, clientId }) {
      const { InnerBlocks: InnerBlocks2, BlockControls, InspectorControls } = wp.blockEditor;
      const { Icon, PanelBody, TreeSelect, TextareaControl, ToolbarGroup } = wp.components;
      const { serverSideRender: ServerSideRender } = wp;
      const { content_path, deps = {}, query, config, EditMode = false } = attributes;
      const { useMemo } = wp.element;
      let configData;
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
      if (!config) {
        if (content_path && itemMap[content_path].has_config) {
          const path = content_path.slice(0, content_path.lastIndexOf("/"));
          wp.apiFetch({ path: "/cp/v1/" + path + "/config" }).then((config2) => {
            Object.keys(config2).map((key) => config2[key].json = "config");
            setAttributes({ config: JSON.stringify(config2) });
          }).catch((res) => {
            setAttributes({ config: "{}" });
          });
        }
        configData = {};
      } else {
        configData = JSON.parse(config);
      }
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, configData.template && /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(
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
      )), configData.template && EditMode ? /* @__PURE__ */ wp.element.createElement("div", { className: "cp-altcontent loopContents" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "edit" })), /* @__PURE__ */ wp.element.createElement(InnerBlocks2, { allowedBlocks: ["catpow/loopcontent"], template: configData.template, templateLock: configData.templateLock || "ALL" })) : /* @__PURE__ */ wp.element.createElement("div", { className: "cp-embeddedcontent" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, content_path), /* @__PURE__ */ wp.element.createElement(ServerSideRender, { block: "catpow/loop", attributes })), item?.deps?.css && /* @__PURE__ */ wp.element.createElement("link", { rel: "stylesheet", href: item.deps.css }), item?.deps?.js && /* @__PURE__ */ wp.element.createElement("script", { type: "text/javascript", src: item.deps.js }), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "Query" }, /* @__PURE__ */ wp.element.createElement(
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
      ))));
    },
    save({ attributes, className, setAttributes }) {
      const { InnerBlocks: InnerBlocks2 } = wp.blockEditor;
      return /* @__PURE__ */ wp.element.createElement(InnerBlocks2.Content, null);
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
    title: "\u{1F43E} LoopContent",
    icon: "editor-code",
    category: "catpow",
    parent: ["catpow/loop"],
    attributes: {
      name: {
        type: "attribute",
        label: "\u540D\u524D",
        selector: "loopContent",
        attribute: "name",
        default: "content"
      }
    },
    edit({ attributes, className, setAttributes, clientId }) {
      const { name } = attributes;
      const template = name == "on_empty" ? [["core/paragraph", { align: "center", content: "Not Found" }]] : [["catpow/section"]];
      return /* @__PURE__ */ wp.element.createElement("div", { className: "loopContent" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, { template, templateLock: false }));
    },
    save({ attributes, className, setAttributes }) {
      const { name } = attributes;
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("loopContent", { name }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
