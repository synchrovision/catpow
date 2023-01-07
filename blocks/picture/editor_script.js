(() => {
  // blocks/picture/editor_script.jsx
  CP.config.picture = {
    devices: ["sp", "tb"],
    imageKeys: {
      image: { sources: "sources", src: "src", alt: "alt", code: "code" }
    }
  };
  wp.blocks.registerBlockType("catpow/picture", {
    title: "\u{1F43E} Picture",
    description: "\u753B\u9762\u30B5\u30A4\u30BA\u306B\u5FDC\u3058\u3066\u5207\u308A\u66FF\u308F\u308B\u753B\u50CF\u3002",
    icon: "id-alt",
    category: "catpow",
    attributes: {
      classes: { source: "attribute", selector: "div", attribute: "class", default: "wp-block-catpow-picture" },
      sources: CP.getPictureSoucesAttributesForDevices(CP.config.picture.devices),
      mime: { source: "attribute", selector: "[src]", attribute: "data-mime" },
      src: { source: "attribute", selector: "[src]", attribute: "src", default: wpinfo.theme_url + "/images/dummy.jpg" },
      alt: { source: "attribute", selector: "[src]", attribute: "alt" },
      code: { source: "text" }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { classes, sources, src, srcset, alt, code, device } = attributes;
      const states = CP.wordsToFlags(classes);
      const { devices, imageKeys } = CP.config.picture;
      const selectiveClasses = [
        { input: "picture", label: "\u753B\u50CF", keys: imageKeys.image, devices, isTemplate: states.isTemplate },
        {
          label: "\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8",
          values: "isTemplate",
          sub: [
            {
              input: "text",
              label: "\u753B\u50CF\u30B3\u30FC\u30C9",
              key: "code",
              cond: true
            }
          ]
        }
      ];
      return /* @__PURE__ */ wp.element.createElement(Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.SelectDeviceToolbar, { attr: attributes, set: setAttributes, devices }), /* @__PURE__ */ wp.element.createElement("div", { className: classes + (device ? " alt_content " + device : "") }, device && /* @__PURE__ */ wp.element.createElement("div", { class: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: CP.devices[device].icon })), /* @__PURE__ */ wp.element.createElement(
        CP.SelectResponsiveImage,
        {
          attr: attributes,
          set: setAttributes,
          keys: imageKeys.image,
          device,
          devices,
          isTemplate: states.isTemplate
        }
      )), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30AF\u30E9\u30B9",
          icon: "art",
          set: setAttributes,
          attr: attributes,
          selectiveClasses,
          filters: CP.filters.picture || {}
        }
      )));
    },
    save({ attributes, className, setAttributes }) {
      const { classes, srouces, src, srcset, alt, code } = attributes;
      const states = CP.wordsToFlags(classes);
      const { devices, imageKeys } = CP.config.picture;
      return /* @__PURE__ */ wp.element.createElement("div", { className: classes }, /* @__PURE__ */ wp.element.createElement(
        CP.ResponsiveImage,
        {
          attr: attributes,
          keys: imageKeys.image,
          devices,
          isTemplate: states.isTemplate
        }
      ));
    }
  });
})();
