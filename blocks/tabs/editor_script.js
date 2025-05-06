(() => {
  // ../blocks/tabs/editor_script.jsx
  wp.blocks.registerBlockType("catpow/tabs", {
    title: "\u{1F43E} Tabs",
    description: "\u30BF\u30D6\u306B\u3088\u308B\u8868\u793A\u5207\u308A\u66FF\u3048\u306E\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002",
    icon: "editor-code",
    category: "catpow",
    attributes: {
      classes: { source: "attribute", selector: "div", attribute: "class", default: "wp-block-catpow-tabs left" },
      items: {
        source: "query",
        selector: "ul.tab li.item",
        query: {
          title: { source: "html", selector: "h3" }
        },
        default: [...Array(3)].map(() => {
          return { title: ["title"] };
        })
      }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { InnerBlocks, RichText } = wp.blockEditor;
      const { classes, items } = attributes;
      const primaryClass = "wp-block-catpow-tabs";
      var template = [], realTabs = [];
      for (var i = 0; i < items.length; i++) {
        template.push(["catpow/tabscontent"]);
      }
      let itemsCopy = items.map((obj) => jQuery.extend(true, {}, obj));
      let rtn = [];
      var currentIndex = attributes.currentIndex || 0;
      itemsCopy.map((item, index) => {
        var className2 = currentIndex == index ? "active" : currentIndex > index ? "before" : "after";
        rtn.push(
          /* @__PURE__ */ wp.element.createElement(CP.Item, { tag: "li", className: className2, set: setAttributes, attr: attributes, items: itemsCopy, index, isSelected, key: index }, /* @__PURE__ */ wp.element.createElement(
            RichText,
            {
              tagName: "h3",
              className: "title",
              onClick: () => {
                setAttributes({ currentIndex: index });
              },
              onChange: (title) => {
                itemsCopy[index].title = title;
                setAttributes({ items: itemsCopy });
              },
              value: item.title
            }
          ))
        );
      });
      return /* @__PURE__ */ wp.element.createElement("div", { className: classes, "data-current-index": currentIndex }, /* @__PURE__ */ wp.element.createElement("ul", { className: "tab" }, rtn), /* @__PURE__ */ wp.element.createElement("div", { className: "contents" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, { template, templateLock: "all" })));
    },
    save({ attributes, className, setAttributes }) {
      const { InnerBlocks, RichText } = wp.blockEditor;
      const { classes, items } = attributes;
      let rtn = [];
      items.map((item, index) => {
        rtn.push(
          /* @__PURE__ */ wp.element.createElement("li", { className: "item", key: index }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "h3", className: "title", value: item.title }))
        );
      });
      return /* @__PURE__ */ wp.element.createElement("div", { className: classes }, /* @__PURE__ */ wp.element.createElement("ul", { className: "tab" }, rtn), /* @__PURE__ */ wp.element.createElement("div", { className: "contents" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
  wp.blocks.registerBlockType("catpow/tabscontent", {
    title: "\u{1F43E} TabsContent",
    icon: "editor-code",
    category: "catpow",
    parent: ["catpow/tabs"],
    edit({ attributes, className, setAttributes }) {
      const { InnerBlocks } = wp.blockEditor;
      return /* @__PURE__ */ wp.element.createElement("div", { className: "tabs_content" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, { template: [["catpow/section"]], templateLock: false }));
    },
    save({ attributes, className, setAttributes }) {
      const { InnerBlocks } = wp.blockEditor;
      return /* @__PURE__ */ wp.element.createElement("div", { className: "tabs_content" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null));
    }
  });
})();
