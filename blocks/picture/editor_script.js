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

  // ../blocks/picture/editor_script.tsx
  var blockConfig = {
    devices: ["sp", "tb"],
    imageKeys: {
      image: { sources: "sources", src: "src", alt: "alt", code: "code" }
    }
  };
  CP.config.picture = blockConfig;
  wp.blocks.registerBlockType("catpow/picture", {
    title: "\u{1F43E} Picture",
    description: "\u753B\u9762\u30B5\u30A4\u30BA\u306B\u5FDC\u3058\u3066\u5207\u308A\u66FF\u308F\u308B\u753B\u50CF\u3002",
    icon: "id-alt",
    category: "catpow",
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { InspectorControls, useBlockProps } = wp.blockEditor;
      const { Icon } = wp.components;
      const { classes, vars, sources, src, srcset, alt, code, device } = attributes;
      const states = CP.classNamesToFlags(classes);
      const { devices, imageKeys } = blockConfig;
      const selectiveClasses = [
        {
          input: "picture",
          label: "\u753B\u50CF",
          keys: imageKeys.image,
          devices,
          isTemplate: states.isTemplate
        },
        "customMargin",
        "hasContentWidth",
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
      const blockProps = useBlockProps({
        className: clsx("picture-", classes, device, { "cp-altcontent": device }),
        style: vars
      });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.SelectDeviceToolbar, { attr: attributes, set: setAttributes, devices }), /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, device && /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: CP.devices[device].icon })), /* @__PURE__ */ wp.element.createElement(
        CP.SelectResponsiveImage,
        {
          className: "_picture",
          attr: attributes,
          set: setAttributes,
          keys: imageKeys.image,
          device,
          devices,
          isTemplate: states.isTemplate,
          showSelectPictureSources: isSelected
        }
      ))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", set: setAttributes, attr: attributes, selectiveClasses })));
    },
    save({ attributes, className, setAttributes }) {
      const { useBlockProps } = wp.blockEditor;
      const { classes, vars, srouces, src, srcset, alt, code } = attributes;
      const states = CP.classNamesToFlags(classes);
      const { devices, imageKeys } = CP.config.picture;
      const blockProps = useBlockProps.save({
        className: clsx("picture-", classes),
        style: vars
      });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { className: "_picture", attr: attributes, keys: imageKeys.image, devices, isTemplate: states.isTemplate }))));
    }
  });
})();
