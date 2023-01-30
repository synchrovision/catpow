(() => {
  // blocks/sidebar/editor_script.jsx
  wp.blocks.registerBlockType("catpow/sidebar", {
    title: "\u{1F43E} Sidebar",
    description: "\u30B5\u30A4\u30C9\u30D0\u30FC\u306E\u3042\u308B\u30B3\u30F3\u30C6\u30F3\u30C4\u9818\u57DF\u306E\u30B3\u30F3\u30C6\u30CA\u3067\u3059\u3002",
    icon: "editor-code",
    category: "catpow",
    attributes: {
      classes: { source: "attribute", selector: "div", attribute: "class", default: "wp-block-catpow-sidebar left" }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes }) {
      const { InnerBlocks: InnerBlocks2, BlockControls, InspectorControls } = wp.blockEditor;
      const { PanelBody, TextareaControl } = wp.components;
      const { classes } = attributes;
      const primaryClass = "wp-block-catpow-sidebar";
      var classArray = _.uniq((className + " " + classes).split(" "));
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { className: classes }, /* @__PURE__ */ wp.element.createElement(
        InnerBlocks2,
        {
          template: [
            ["catpow/maincolumn"],
            ["catpow/sidecolumn"]
          ],
          templateLock: "all"
        }
      )), /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(CP.AlignClassToolbar, { set: setAttributes, attr: attributes })), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(
        TextareaControl,
        {
          label: "\u30AF\u30E9\u30B9",
          onChange: (classes2) => setAttributes({ classes: classes2 }),
          value: classArray.join(" ")
        }
      ))));
    },
    save({ attributes, className, setAttributes }) {
      const { InnerBlocks: InnerBlocks2 } = wp.blockEditor;
      const { classes } = attributes;
      return /* @__PURE__ */ wp.element.createElement("div", { className: classes }, /* @__PURE__ */ wp.element.createElement(InnerBlocks2.Content, null));
    }
  });
  wp.blocks.registerBlockType("catpow/sidecolumn", {
    title: "\u{1F43E} SideColumn",
    icon: "editor-code",
    category: "catpow",
    parent: ["catpow/sidebar"],
    edit({ attributes, className, setAttributes }) {
      const { InnerBlocks: InnerBlocks2 } = wp.blockEditor;
      return /* @__PURE__ */ wp.element.createElement("div", { className: "column column_side" }, /* @__PURE__ */ wp.element.createElement("div", { className: "column_side_container" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks2, { template: [["catpow/articlenav"]], templateLock: false })), /* @__PURE__ */ wp.element.createElement("div", { className: "sidebar_button" }));
    },
    save({ attributes, className, setAttributes }) {
      const { InnerBlocks: InnerBlocks2 } = wp.blockEditor;
      return /* @__PURE__ */ wp.element.createElement("div", { className: "column column_side" }, /* @__PURE__ */ wp.element.createElement("div", { className: "column_side_container" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks2.Content, null)), /* @__PURE__ */ wp.element.createElement("div", { className: "sidebar_button" }));
    },
    deprecated: [
      {
        save({ attributes, className, setAttributes }) {
          return /* @__PURE__ */ wp.element.createElement("div", { className: "column column_side" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null), /* @__PURE__ */ wp.element.createElement("div", { className: "sidebar_button" }));
        }
      }
    ]
  });
  wp.blocks.registerBlockType("catpow/maincolumn", {
    title: "\u{1F43E} MainColumn",
    icon: "editor-code",
    category: "catpow",
    attributes: {
      columnType: { type: "string", default: "main" }
    },
    parent: ["catpow/sidebar"],
    edit({ attributes, className, setAttributes }) {
      const { InnerBlocks: InnerBlocks2 } = wp.blockEditor;
      return /* @__PURE__ */ wp.element.createElement("div", { className: "column column_main" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks2, { template: [["catpow/section"]], templateLock: false }));
    },
    save({ attributes, className, setAttributes }) {
      const { InnerBlocks: InnerBlocks2 } = wp.blockEditor;
      return /* @__PURE__ */ wp.element.createElement("div", { className: "column column_main" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks2.Content, null));
    }
  });
  wp.blocks.registerBlockType("catpow/articlenav", {
    title: "\u{1F43E} ArticelNav",
    icon: "editor-ul",
    category: "catpow",
    parent: ["catpow/sidecolumn"],
    edit({ attributes, className, setAttributes, clientId }) {
      const { useEffect } = wp.element;
      const { RichText } = wp.blockEditor;
      const parentClientId = wp.data.select("core/block-editor").getBlockParentsByBlockName(clientId, "catpow/sidebar")[0];
      const mainContents = wp.data.select("core/block-editor").getBlock(parentClientId).innerBlocks[0].innerBlocks;
      const getSectionTitles = (innerBlocks) => {
        return innerBlocks.filter((block) => block.name == "catpow/section").map((block) => {
          return block.attributes.title;
        });
      };
      return /* @__PURE__ */ wp.element.createElement("div", { className }, /* @__PURE__ */ wp.element.createElement("ul", { className: "article_nav" }, getSectionTitles(mainContents).map((title, index) => {
        return /* @__PURE__ */ wp.element.createElement("li", { key: index }, /* @__PURE__ */ wp.element.createElement("h3", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: title })));
      })));
    },
    save({ attributes, className, setAttributes }) {
      return /* @__PURE__ */ wp.element.createElement("div", { className });
    }
  });
})();
