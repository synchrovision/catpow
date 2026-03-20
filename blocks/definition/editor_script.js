(() => {
  // ../blocks/definition/editor_script.jsx
  var { __ } = wp.i18n;
  wp.blocks.registerBlockType("catpow/definition", {
    title: "\u{1F43E} Definition",
    description: "\u5B9A\u7FA9\u30EA\u30B9\u30C8\u306E\u30D6\u30ED\u30C3\u30AF\u3067\u3059",
    icon: "editor-ul",
    category: "catpow",
    transforms: {
      from: [
        {
          type: "block",
          blocks: CP.listedConvertibles,
          transform: (attributes) => {
            attributes.classes = "wp-block-catpow-definition";
            return wp.blocks.createBlock("catpow/definition", attributes);
          }
        }
      ]
    },
    example: CP.example,
    edit({ attributes, setAttributes, isSelected }) {
      const { useMemo } = wp.element;
      const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
      const { PanelBody, TextareaControl } = wp.components;
      const { items = [], classes = "", loopCount, doLoop, EditMode = false, AltMode = false } = attributes;
      var states = CP.classNamesToFlags(classes);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          "level",
          {
            name: "type",
            label: __("\u30BF\u30A4\u30D7", "catpow"),
            type: "gridbuttons",
            values: { isTypeIndex: "index", isTypeSpec: "spec", isTypeInfo: "info" },
            required: true
          },
          "hasContentWidth",
          "hasMargin",
          "isTemplate"
        ];
        wp.hooks.applyFilters("catpow.blocks.definition.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const save = () => {
        setAttributes({ items: JSON.parse(JSON.stringify(items)) });
      };
      const blockProps = useBlockProps({ className: EditMode || AltMode && doLoop ? "cp-altcontent" : classes });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.SelectModeToolbar, { set: setAttributes, attr: attributes }), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", set: setAttributes, attr: attributes, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: "\u30AF\u30E9\u30B9", onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes })), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), EditMode ? /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(CP.Label, { icon: "edit" }), /* @__PURE__ */ wp.element.createElement(
        CP.EditItemsTable,
        {
          set: setAttributes,
          attr: attributes,
          columns: [
            { type: "text", key: "title", cond: states.hasTitle },
            { type: "text", key: "text", cond: states.hasText }
          ],
          isTemplate: states.isTemplate
        }
      )) : /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, AltMode && doLoop ? /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(CP.Label, { icon: "welcome-comments" }), /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)) : /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, [...Array(Math.max(items.length, loopCount)).keys()].map((i) => {
        const index = i % items.length;
        const item = items[index];
        if (!item.controlClasses) {
          item.controlClasses = "control";
        }
        return /* @__PURE__ */ wp.element.createElement(CP.Item, { tag: "dl", className: "_item", set: setAttributes, attr: attributes, items, index, isSelected, key: index }, /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: "dt",
            className: "_title",
            onChange: (title) => {
              item.title = title;
              save();
            },
            value: item.title
          }
        ), /* @__PURE__ */ wp.element.createElement(
          RichText,
          {
            tagName: "dd",
            className: "_text",
            onChange: (text) => {
              item.text = text;
              save();
            },
            value: item.text
          }
        ));
      })))));
    },
    save({ attributes, className }) {
      const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;
      const { items = [], classes = "", loopCount, doLoop } = attributes;
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...useBlockProps.save({ className: classes }) }, items.map((item, index) => /* @__PURE__ */ wp.element.createElement("dl", { className: "_item", key: index }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "dt", className: "_title", value: item.title }), /* @__PURE__ */ wp.element.createElement(RichText.Content, { tagName: "dd", className: "_text", value: item.text }))))), doLoop && /* @__PURE__ */ wp.element.createElement("on-empty", null, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
