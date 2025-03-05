(() => {
  // ../blocks/rtf/editor_script.jsx
  wp.blocks.registerBlockType("catpow/rtf", {
    title: "\u{1F43E} RTF",
    description: "MarkDown\u306B\u4F3C\u305F\u8A18\u6CD5\u3067HTML\u3092\u66F8\u3051\u308B\u30D6\u30ED\u30C3\u30AF",
    icon: "editor-code",
    category: "catpow",
    attributes: {
      text: { type: "string", default: "" }
    },
    example: CP.example,
    edit({
      attributes,
      className,
      setAttributes,
      onReplace,
      mergeBlocks,
      isSelected
    }) {
      return /* @__PURE__ */ wp.element.createElement(
        CP.RTF.Edit,
        {
          set: setAttributes,
          attr: attributes,
          isSelected
        }
      );
    },
    save({ attributes, className, setAttributes }) {
      return /* @__PURE__ */ wp.element.createElement(CP.RTF, { attr: attributes });
    }
  });
})();
