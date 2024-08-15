(() => {
  // ../blocks/container/editor_script.jsx
  var { __ } = wp.i18n;
  wp.blocks.registerBlockType("catpow/container", {
    title: "\u{1F43E} Container",
    description: "\u30B9\u30AF\u30ED\u30FC\u30EB\u53EF\u80FD\u9818\u57DF\u3092\u4F5C\u6210\u3067\u304D\u308B\u30B3\u30F3\u30C6\u30CA\u3067\u3059\u3002",
    icon: "editor-code",
    category: "catpow",
    transforms: {
      from: [
        {
          type: "block",
          blocks: ["core/group"],
          transform: (attributes, innerBlocks) => {
            return wp.blocks.createBlock("catpow/container", { classes: "wp-block-catpow-container " }, innerBlocks);
          }
        }
      ]
    },
    attributes: {
      boxSizeVars: { type: "object", default: { "--cp-content-width": 960, "--cp-container-height": 400 } },
      classes: { source: "attribute", selector: ".wp-block-catpow-container", attribute: "class", default: "wp-block-catpow-container" }
    },
    example: CP.example,
    edit(props) {
      const { useState, useMemo } = wp.element;
      const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
      const { PanelBody, TextareaControl } = wp.components;
      const { attributes, className, setAttributes, context } = props;
      const { boxSizeVars, classes = "" } = attributes;
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          { name: "border", label: __("\u30DC\u30FC\u30C0\u30FC", "catpow"), values: "hasBorder", sub: [
            { name: "borderWidth", label: __("\u5E45", "catpow"), vars: "boxSizeVars", key: "--cp-border-width", input: "range", min: 0, max: 16, step: 1 },
            { name: "borderRadius", label: __("\u89D2\u4E38", "catpow"), vars: "boxSizeVars", key: "--cp-border-radius", input: "range", min: 0, max: 80, step: 1 }
          ] },
          { name: "shadow", type: "buttons", label: __("\u5F71", "catpow"), values: {
            hasNoShadow: __("\u306A\u3057", "catpow"),
            hasInsetShadow: __("\u5185\u5074", "catpow"),
            hasOutsetShadow: __("\u5916\u5074", "catpow")
          } },
          { name: "scrollX", label: __("\u30B9\u30AF\u30ED\u30FC\u30EBX", "catpow"), values: "hasScrollX", sub: [
            { name: "contentWidth", label: __("\u30B3\u30F3\u30C6\u30F3\u30C4\u306E\u5E45", "catpow"), vars: "boxSizeVars", key: "--cp-content-width", input: "range", min: 400, max: 2e3, step: 10 }
          ] },
          { name: "scrollY", label: __("\u30B9\u30AF\u30ED\u30FC\u30EBY", "catpow"), values: "hasScrollY", sub: [
            { name: "containerHeight", label: __("\u30B3\u30F3\u30C6\u30CA\u306E\u9AD8\u3055", "catpow"), vars: "boxSizeVars", key: "--cp-container-height", input: "range", min: 100, max: 1e3, step: 10 }
          ] },
          { name: "margin", label: __("\u9593\u9694", "catpow"), values: "hasMargin", sub: [
            { name: "marginX", label: __("X\u9593\u9694", "catpow"), vars: "boxSizeVars", key: "--cp-margin-x", input: "range", min: 0, max: 40, step: 1 },
            { name: "marginY", label: __("Y\u9593\u9694", "catpow"), vars: "boxSizeVars", key: "--cp-margin-y", input: "range", min: 0, max: 120, step: 1 }
          ] },
          { name: "padding", label: __("\u4F59\u767D", "catpow"), values: "hasPadding", sub: [
            { name: "paddingX", label: __("X\u4F59\u767D", "catpow"), vars: "boxSizeVars", key: "--cp-padding-x", input: "range", min: 0, max: 200, step: 5 },
            { name: "paddingY", label: __("Y\u4F59\u767D", "catpow"), vars: "boxSizeVars", key: "--cp-padding-y", input: "range", min: 0, max: 200, step: 5 }
          ] }
        ];
        wp.hooks.applyFilters("catpow.blocks.container.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const blockProps = useBlockProps({ className: classes, style: boxSizeVars });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement("div", { className: "wp-block-catpow-container__body" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, { template: [["core/paragraph", { content: CP.dummyText.text }]], templateLock: false }))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30AF\u30E9\u30B9",
          icon: "art",
          set: setAttributes,
          attr: attributes,
          selectiveClasses
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
      const { InnerBlocks, useBlockProps } = wp.blockEditor;
      const { boxSizeVars, classes = "" } = attributes;
      const blockProps = useBlockProps.save({ className: classes, style: boxSizeVars });
      return /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement("div", { className: "wp-block-catpow-container__body" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
