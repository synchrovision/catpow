(() => {
  // ../functions/instagram/blocks/instagramfeed/editor_script.jsx
  wp.blocks.registerBlockType("catpow/instagramfeed", {
    title: "\u{1F43E} InstagramFeed",
    icon: "instagram",
    category: "catpow",
    edit({ attributes, className, setAttributes, isSelected }) {
      const { items, classes } = attributes;
      const { useMemo } = wp.element;
      const { InspectorControls } = wp.blockEditor;
      const { PanelBody, TreeSelect, TextareaControl, TextControl } = wp.components;
      const [users, serUsers] = wp.coreData.useEntityProp("root", "site", "ig_users");
      const flags = useMemo(() => Catpow.util.classNamesToFlags(attributes.classes), [attributes.classes]);
      console.log(flags);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "\u8A2D\u5B9A" }, users && users.map((user) => /* @__PURE__ */ wp.element.createElement("label", { key: user.id }, user.username)))), /* @__PURE__ */ wp.element.createElement("div", { className: Catpow.util.flagsToClassNames(flags) }, /* @__PURE__ */ wp.element.createElement(Catpow.InstagramFeed, null)));
    },
    save({ attributes, className }) {
      return /* @__PURE__ */ wp.element.createElement(
        "div",
        {
          className: attributes.classes,
          "data-users": attributes.users && attributes.users.join(",")
        },
        "instagram"
      );
    }
  });
})();
