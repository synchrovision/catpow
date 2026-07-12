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

  // ../blocks/tabs/editor_script.jsx
  wp.blocks.registerBlockType("catpow/tabs", {
    attributes: {
      classes: { source: "attribute", selector: "div", attribute: "class", default: "wp-block-catpow-tabs is-level3 is-type-panel is-style-flat" },
      HeadingTag: { type: "text", default: "h3" },
      vars: { type: "object", default: {} },
      items: {
        source: "query",
        selector: ".wp-block-catpow-tabs__tab-item",
        query: {
          title: { source: "html", selector: ".wp-block-catpow-tabs__tab-item-title" }
        },
        default: [...Array(3)].map((_, i) => {
          return { title: [`Tab ${i + 1}`] };
        })
      }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected, clientId }) {
      const { useMemo, useEffect } = wp.element;
      const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
      const { classes, HeadingTag, vars, items } = attributes;
      var currentIndex = attributes.currentIndex || 0;
      const selectiveClasses = useMemo(() => {
        const { devices, imageKeys, imageSizes } = CP.config.section;
        const selectiveClasses2 = [
          "headingTag",
          "level",
          "color",
          "colorScheme",
          "hasContentWidth",
          "hasMargin",
          {
            name: "type",
            type: "buttons",
            label: "\u30BF\u30A4\u30D7",
            values: { isTypeLabel: "\u30E9\u30D9\u30EB", isTypeBar: "\u30D0\u30FC", isTypePanel: "\u30D1\u30CD\u30EB" }
          },
          {
            name: "style",
            type: "buttons",
            label: "\u30B9\u30BF\u30A4\u30EB",
            values: { isStyleTable: "\u30C6\u30FC\u30D6\u30EB", isStyleFlat: "\u30D5\u30E9\u30C3\u30C8" }
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.tabs.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      useEffect(() => {
        const editor = wp.data.dispatch("core/block-editor");
        const blocks = wp.data.select("core/block-editor").getBlock(clientId).innerBlocks;
        blocks.forEach((block, index) => {
          if (block.attributes.index !== index) {
            editor.updateBlockAttributes(block.clientId, { index });
          }
        });
      }, [items.length]);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", initialOpen: true, icon: "admin-generic", ...{ setAttributes, attributes }, selectiveClasses })), /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps({ className: classes, style: { ...vars, "--current-index": currentIndex, "--length": items.length } }), "data-current-index": currentIndex }, /* @__PURE__ */ wp.element.createElement("ul", { className: "_tab" }, items.map((item, index) => {
        return /* @__PURE__ */ wp.element.createElement(
          CP.Item,
          {
            tag: "li",
            className: clsx("_item", currentIndex == index ? "is-active" : currentIndex > index ? "is-before" : "is-after"),
            ...{ setAttributes, attributes },
            itemKeys: ["items", index],
            style: { "--index": index },
            key: index
          },
          /* @__PURE__ */ wp.element.createElement(
            RichText,
            {
              tagName: HeadingTag,
              className: "_title",
              onClick: () => {
                setAttributes({ currentIndex: index });
              },
              onChange: (title) => {
                item.title = title;
                setAttributes({ items: [...items] });
              },
              value: item.title
            }
          )
        );
      })), /* @__PURE__ */ wp.element.createElement("div", { className: "_contents" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, { template: items.map((item, i) => ["catpow/tabscontent", { index: i }]), templateLock: "all" })))));
    },
    save({ attributes, className, setAttributes }) {
      const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;
      const { classes, HeadingTag, vars, items } = attributes;
      const blockProps = useBlockProps.save({
        className: classes,
        style: { ...vars, "--current-index": 0, "--length": items.length },
        "data-wp-interactive": "catpow/tabs",
        "data-wp-context": JSON.stringify({
          currentIndex: 0,
          currentTabId: "{$uid}-0",
          length: items.length
        }),
        "data-wp-init": "callbacks.initBlock"
      });
      return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement("ul", { className: "_tab", role: "tablist" }, items.map((item, index) => {
        return /* @__PURE__ */ wp.element.createElement(
          "li",
          {
            id: `{$uid}-tab-${index}`,
            className: "_item",
            "data-wp-class--is-active": "callbacks.isActiveTab",
            "aria-controls": `{$uid}-${index}`,
            "data-wp-bind--aria-selected": "callbacks.isActiveTab",
            "data-wp-on--click": "actions.onClickTab",
            style: { "--index": index },
            "data-index": index,
            role: "tab",
            key: index
          },
          /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: HeadingTag, className: "_title", value: item.title })
        );
      })), /* @__PURE__ */ wp.element.createElement("div", { className: "_contents" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null))));
    }
  });
  wp.blocks.registerBlockType("catpow/tabscontent", {
    apiVersion: 3,
    title: "\u{1F43E} TabsContent",
    icon: "editor-code",
    category: "catpow",
    parent: ["catpow/tabs"],
    attributes: {
      index: { type: "number" }
    },
    edit({ attributes, className, setAttributes }) {
      const { InnerBlocks, useBlockProps } = wp.blockEditor;
      const { index } = attributes;
      return /* @__PURE__ */ wp.element.createElement(
        "div",
        {
          ...useBlockProps({
            className: "wp-block-catpow-tabs__contents-content",
            style: { "--index": index },
            role: "tabpanel"
          })
        },
        /* @__PURE__ */ wp.element.createElement(InnerBlocks, { template: [["catpow/section", { title: `Tab Panel ${index + 1}` }]], templateLock: false })
      );
    },
    save({ attributes, className, setAttributes }) {
      const { InnerBlocks, useBlockProps } = wp.blockEditor;
      const { index } = attributes;
      return /* @__PURE__ */ wp.element.createElement(
        "div",
        {
          ...useBlockProps.save({
            id: `{$uid}-${index}`,
            className: "wp-block-catpow-tabs__contents-content",
            "data-wp-class--is-active": "callbacks.isActivePanel",
            "data-wp-bind--aria-hidden": "!callbacks.isActivePanel",
            "data-wp-bind--inert": "!callbacks.isActivePanel",
            style: { "--index": index },
            "data-index": { index },
            role: "tabpanel",
            "aria-labelledby": `{$uid}-tab-${index}`
          })
        },
        /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)
      );
    }
  });
})();
