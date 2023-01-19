(() => {
  // blocks/t-button/editor_script.jsx
  wp.blocks.registerBlockType("catpow/t-button", {
    title: "\u{1F43E} T-Button",
    description: "HTML\u30E1\u30FC\u30EB\u7528\u306E\u30C6\u30FC\u30D6\u30EB\u30EC\u30A4\u30A2\u30A6\u30C8\u306E\u30DC\u30BF\u30F3\u3067\u3059\u3002",
    icon: "editor-code",
    category: "catpow-mail",
    parent: ["catpow/t-body", "catpow/t-box", "catpow/t-loop"],
    attributes: {
      classes: { source: "attribute", selector: "a", attribute: "class", default: "wp-block-catpow-t-button medium" },
      title: { source: "html", selector: "tbody td", default: "Title" },
      url: { source: "attribute", selector: "a", attribute: "href", default: wpinfo.home_url }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes }) {
      const { useState, useMemo } = wp.element;
      const { InspectorControls, RichText } = wp.blockEditor;
      const { PanelBody, TextareaControl } = wp.components;
      const { classes, title } = attributes;
      const primaryClass = "wp-block-catpow-t-button";
      var states = CP.wordsToFlags(classes);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          "color",
          { name: "size", label: "\u30B5\u30A4\u30BA", values: ["large", "medium", "small"] },
          { name: "url", input: "text", label: "URL", key: "url" }
        ];
        wp.hooks.applyFilters("catpow.blocks.t-button.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("a", { className: classes }, /* @__PURE__ */ wp.element.createElement("table", { width: "100%" }, /* @__PURE__ */ wp.element.createElement("tbody", null, /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", null, /* @__PURE__ */ wp.element.createElement(
        RichText,
        {
          onChange: (title2) => {
            setAttributes({ title: title2 });
          },
          value: title
        }
      )))))), ",", /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30AF\u30E9\u30B9",
          icon: "art",
          set: setAttributes,
          attr: attributes,
          selectiveClasses,
          filters: CP.filters["t-button"] || {}
        }
      ), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(
        TextareaControl,
        {
          label: "\u30AF\u30E9\u30B9",
          onChange: (classes2) => setAttributes({ classes: classes2 }),
          value: classes
        }
      ))));
    },
    save({ attributes, className, setAttributes }) {
      const { RichText } = wp.blockEditor;
      const { classes, title, url } = attributes;
      const primaryClass = "wp-block-catpow-t-button";
      return /* @__PURE__ */ wp.element.createElement("a", { className: classes, href: url }, /* @__PURE__ */ wp.element.createElement("table", { width: "100%" }, /* @__PURE__ */ wp.element.createElement("tbody", null, /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: title }))))));
    }
  });
})();
