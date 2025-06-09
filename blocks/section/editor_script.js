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

  // ../blocks/section/editor_script.jsx
  var { __ } = wp.i18n;
  CP.config.section = {
    devices: ["sp", "tb"],
    imageKeys: {
      navIcon: { src: "navIcon" },
      image: { mime: "imageMime", src: "imageSrc", alt: "imageAlt", srcset: "imageSrcset" },
      titleImage: { mime: "titleImageMime", src: "titleImageSrc", alt: "titleImageAlt", srcset: "titleImageSrcset", sources: "titleImageSources" },
      headerImage: { mime: "headerImageMime", src: "headerImageSrc", alt: "headerImageAlt", srcset: "headerImageSrcset" },
      decoration: { pictures: "decoration" }
    },
    imageSizes: {
      image: "medium",
      headerImage: "medium_large"
    }
  };
  wp.blocks.registerBlockType("catpow/section", {
    example: CP.example,
    edit(props) {
      const { InnerBlocks, BlockControls, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
      const { PanelBody, TextareaControl, TextControl } = wp.components;
      const { attributes, setAttributes } = props;
      const { useMemo, useState } = wp.element;
      const {
        SectionTag,
        HeadingTag,
        color,
        anchor,
        classes,
        bodyClasses,
        headerClasses,
        titleClasses,
        vars,
        headerVars,
        prefix,
        title,
        lead,
        titleImageCode,
        headerImageCode,
        headerPatternImageCss,
        patternImageCss,
        frameImageCss,
        borderImageCss
      } = attributes;
      const states = CP.classNamesToFlags(classes);
      const { devices, imageKeys, imageSizes } = CP.config.section;
      const [mainBlock, setMainBlock] = useState();
      CP.useInheritColor(props, ["iconSrc", "patternImageCss", "headerPatternImageCss", "frameImageCss", "borderImageCss"]);
      CP.useManageStyleData(props, ["patternImageCss", "headerPatternImageCss", "frameImageCss", "borderImageCss"]);
      const selectiveClasses = useMemo(() => {
        const { devices: devices2, imageKeys: imageKeys2, imageSizes: imageSizes2 } = CP.config.section;
        const selectiveClasses2 = [
          { name: "sectionTag", input: "buttons", key: "SectionTag", label: __("\u30BB\u30AF\u30B7\u30E7\u30F3\u30BF\u30B0", "catpow"), values: ["article", "section", "aside", "div"] },
          {
            name: "headingTag",
            input: "buttons",
            key: "HeadingTag",
            label: __("\u898B\u51FA\u3057\u30BF\u30B0", "catpow"),
            values: ["h1", "h2", "h3", "h4"],
            effect: (val, states2, { set }) => {
              for (const key in states2) {
                if (key.slice(0, 5) === "level") {
                  states2[key] = false;
                }
              }
              if (/^h\d$/.test(val)) {
                states2["level" + val[1]] = true;
              }
              set({ classes: CP.flagsToWords(states2) });
            }
          },
          {
            name: "type",
            label: __("\u30BF\u30A4\u30D7", "catpow"),
            type: "gridbuttons",
            values: { isTypeScene: "scene", isTypeArticle: "aticle", isTypeColumn: "column" },
            sub: {
              isTypeScene: [
                {
                  name: "headerContentWidth",
                  preset: "customContentWidth",
                  label: __("\u30D8\u30C3\u30C0\u30B3\u30F3\u30C6\u30F3\u30C4\u5E45", "catpow"),
                  vars: "headerVars",
                  classKey: "headerClasses",
                  bind: {
                    titleClasses: ["hasContentWidth"]
                  }
                },
                { name: "prefix", label: __("\u30D7\u30EC\u30D5\u30A3\u30AF\u30B9", "catpow"), values: "hasPrefix" },
                { name: "titleImage", label: __("\u30BF\u30A4\u30C8\u30EB\u753B\u50CF", "catpow"), values: "hasTitleImage", sub: [{ input: "picture", keys: imageKeys2.titleImage, devices: devices2 }] },
                { name: "headerImage", label: __("\u30D8\u30C3\u30C0\u753B\u50CF", "catpow"), values: "hasHeaderImage", sub: [{ input: "image", keys: imageKeys2.headerImage, size: imageSizes2.headerImage }] },
                { name: "lead", label: __("\u30EA\u30FC\u30C9", "catpow"), values: "hasLead" },
                { preset: "backgroundColor", label: __("\u30D8\u30C3\u30C0\u80CC\u666F\u8272", "catpow"), name: "headerBackgroundColor", classKey: "headerClasses" },
                { preset: "backgroundImage", label: __("\u30D8\u30C3\u30C0\u80CC\u666F\u753B\u50CF", "catpow"), name: "headerBackgroundImage", classKey: "headerClasses", vars: "headerVars" },
                { preset: "backgroundPattern", label: __("\u30D8\u30C3\u30C0\u80CC\u666F\u30D1\u30BF\u30FC\u30F3", "catpow"), name: "headerBackgroundPattern", classKey: "headerClasses", vars: "headerVars" },
                {
                  name: "navIcon",
                  label: __("\u30E1\u30CB\u30E5\u30FC\u30A2\u30A4\u30B3\u30F3", "catpow"),
                  values: "hasNavIcon",
                  sub: [{ input: "image", label: __("\u30A2\u30A4\u30B3\u30F3", "catpow"), keys: imageKeys2.navIcon, size: "thumbnail" }]
                },
                { name: "decoration", label: __("\u30C7\u30B3\u30EC\u30FC\u30B7\u30E7\u30F3", "catpow"), values: "hasDecoration" },
                "clipPath",
                "customPadding",
                "customMargin",
                {
                  name: "template",
                  label: __("\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8", "catpow"),
                  values: "isTemplate",
                  sub: [
                    {
                      name: "headerImageCode",
                      input: "text",
                      label: __("\u30D8\u30C3\u30C0\u753B\u50CF\u30B3\u30FC\u30C9", "catpow"),
                      key: "headerImageCode",
                      cond: "hasHeaderImage"
                    },
                    {
                      name: "headerBackgroundImageCode",
                      input: "text",
                      label: __("\u30D8\u30C3\u30C0\u80CC\u666F\u753B\u50CF\u30B3\u30FC\u30C9", "catpow"),
                      key: "headerBackgroundImageCode",
                      cond: "hasHeaderBackgroundImage"
                    },
                    {
                      name: "backgroundImageCode",
                      input: "text",
                      label: __("\u80CC\u666F\u753B\u50CF\u30B3\u30FC\u30C9", "catpow"),
                      key: "backgroundImageCode",
                      cond: "hasBackgroundImage"
                    }
                  ]
                }
              ],
              isTypeArticle: [
                { name: "level", type: "buttons", label: __("\u30EC\u30D9\u30EB", "catpow"), values: { level1: "1", level2: "2", level3: "3", level4: "4" } },
                { name: "headingType", type: "gridbuttons", label: __("\u898B\u51FA\u3057\u30BF\u30A4\u30D7", "catpow"), filter: "heading_type", values: ["header", "headline", "catch"] },
                { name: "headerImage", label: __("\u30D8\u30C3\u30C0\u753B\u50CF", "catpow"), values: "hasHeaderImage", sub: [{ input: "image", keys: imageKeys2.headerImage, size: imageSizes2.headerImage }] },
                { name: "lead", label: __("\u30EA\u30FC\u30C9", "catpow"), values: "hasLead" },
                {
                  name: "navIcon",
                  label: __("\u30E1\u30CB\u30E5\u30FC\u30A2\u30A4\u30B3\u30F3", "catpow"),
                  values: "hasNavIcon",
                  sub: [{ input: "image", label: __("\u30A2\u30A4\u30B3\u30F3", "catpow"), keys: imageKeys2.navIcon, size: "thumbnail" }]
                },
                {
                  name: "patternImage",
                  label: __("\u30D1\u30BF\u30FC\u30F3\u753B\u50CF", "catpow"),
                  values: "hasPatternImage",
                  sub: [{ input: "pattern", css: "patternImageCss", sel: ({ attr }) => `#${attr.anchor}`, color }]
                },
                { name: "frameImage", label: __("\u30D5\u30EC\u30FC\u30E0\u753B\u50CF", "catpow"), values: "hasFrameImage", sub: [{ input: "frame", css: "frameImageCss", sel: ({ attr }) => `#${attr.anchor}`, color }] },
                {
                  name: "borderImage",
                  label: __("\u30DC\u30FC\u30C0\u30FC\u753B\u50CF", "catpow"),
                  values: "hasBorderImage",
                  sub: [{ input: "border", css: "borderImageCss", sel: ({ attr }) => `#${attr.anchor} > .contents`, color }]
                },
                { name: "decoration", label: __("\u30C7\u30B3\u30EC\u30FC\u30B7\u30E7\u30F3", "catpow"), values: "hasDecoration" },
                "clipPath",
                "customPadding",
                "customMargin",
                {
                  name: "template",
                  label: __("\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8", "catpow"),
                  values: "isTemplate",
                  sub: [
                    {
                      input: "text",
                      label: __("\u30D8\u30C3\u30C0\u753B\u50CF\u30B3\u30FC\u30C9", "catpow"),
                      key: "headerImageCode",
                      cond: "hasHeaderImage"
                    },
                    {
                      input: "text",
                      label: __("\u80CC\u666F\u753B\u50CF\u30B3\u30FC\u30C9", "catpow"),
                      key: "backgroundImageCode",
                      cond: "hasBackgroundImage"
                    }
                  ]
                }
              ],
              isTypeColumn: [
                { name: "icon", label: __("\u30A2\u30A4\u30B3\u30F3", "catpow"), values: "hasIcon", sub: [{ input: "icon", color }] },
                { name: "image", label: __("\u753B\u50CF", "catpow"), values: "hasImage", sub: [{ input: "image", keys: imageKeys2.image }] },
                { name: "border", label: __("\u7DDA", "catpow"), values: { no_border: __("\u306A\u3057", "catpow"), thin_border: __("\u7D30", "catpow"), bold_border: __("\u592A", "catpow") } },
                { name: "round", label: __("\u89D2\u4E38", "catpow"), values: "round" },
                { name: "shadow", label: __("\u5F71", "catpow"), values: "shadow", sub: [{ label: __("\u5185\u5074", "catpow"), values: "inset" }] },
                {
                  name: "navIcon",
                  label: __("\u30E1\u30CB\u30E5\u30FC\u30A2\u30A4\u30B3\u30F3", "catpow"),
                  values: "hasNavIcon",
                  sub: [{ input: "image", label: __("\u30A2\u30A4\u30B3\u30F3", "catpow"), keys: imageKeys2.navIcon, size: "thumbnail" }]
                },
                {
                  name: "borderImage",
                  label: __("\u30DC\u30FC\u30C0\u30FC\u753B\u50CF", "catpow"),
                  values: "hasBorderImage",
                  sub: [{ input: "border", css: "borderImageCss", sel: ({ attr }) => `#${attr.anchor} > .contents`, color }]
                },
                { name: "decoration", label: __("\u30C7\u30B3\u30EC\u30FC\u30B7\u30E7\u30F3", "catpow"), values: "hasDecoration" },
                {
                  name: "template",
                  label: __("\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8", "catpow"),
                  values: "isTemplate",
                  sub: [
                    {
                      input: "text",
                      label: __("\u753B\u50CF\u30B3\u30FC\u30C9", "catpow"),
                      key: "imageCode",
                      cond: "hasImage"
                    },
                    {
                      input: "text",
                      label: __("\u80CC\u666F\u753B\u50CF\u30B3\u30FC\u30C9", "catpow"),
                      key: "backgroundImageCode",
                      cond: "hasBackgroundImage"
                    }
                  ]
                }
              ]
            },
            bind: {
              isTypeScene: {
                _: ["level2"]
              },
              isTypeArticle: {
                _: ["level3"],
                bodyClasses: ["hasContentWidth"]
              },
              isTypeColumn: {
                _: ["level3"],
                bodyClasses: ["hasContentWidth"]
              }
            }
          },
          "color",
          "colorScheme",
          "backgroundColor",
          "backgroundImage",
          "backgroundPattern",
          "customContentWidth"
        ];
        wp.hooks.applyFilters("catpow.blocks.section.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const blockProps = useBlockProps({
        id: anchor,
        className: clsx("section-", classes),
        style: vars
      });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(CP.AlignClassToolbar, { set: setAttributes, attr: attributes })), /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement(SectionTag, { ref: setMainBlock, ...blockProps }, /* @__PURE__ */ wp.element.createElement("div", { className: clsx("body_", bodyClasses) }, states.hasDecoration && /* @__PURE__ */ wp.element.createElement(CP.PlacedPictures.Edit, { className: "decoration_", set: setAttributes, attr: attributes, devices, keys: imageKeys.decoration }), /* @__PURE__ */ wp.element.createElement("header", { className: clsx("header_", headerClasses), style: headerVars }, /* @__PURE__ */ wp.element.createElement("div", { className: clsx("_title", titleClasses) }, states.hasIcon && /* @__PURE__ */ wp.element.createElement(CP.OutputIcon, { className: "_icon", item: attributes }), states.hasPrefix && /* @__PURE__ */ wp.element.createElement("div", { className: "_prefix" }, /* @__PURE__ */ wp.element.createElement(RichText, { tagName: "div", value: prefix, onChange: (prefix2) => setAttributes({ prefix: prefix2 }) })), states.hasHeaderImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, states.isTemplate && headerImageCode ? /* @__PURE__ */ wp.element.createElement(CP.DummyImage, { text: headerImageCode }) : /* @__PURE__ */ wp.element.createElement(CP.SelectResponsiveImage, { className: "_image", set: setAttributes, attr: attributes, keys: imageKeys.headerImage, size: imageSizes.headerImage })), states.hasTitleImage ? /* @__PURE__ */ wp.element.createElement(HeadingTag, { className: "_titleimage" }, states.isTemplate && titleImageCode ? /* @__PURE__ */ wp.element.createElement(CP.DummyImage, { text: titleImageCode }) : /* @__PURE__ */ wp.element.createElement(CP.SelectResponsiveImage, { className: "_image", set: setAttributes, attr: attributes, keys: imageKeys.titleImage, devices })) : /* @__PURE__ */ wp.element.createElement(RichText, { tagName: HeadingTag, className: "_heading", value: title, onChange: (title2) => setAttributes({ title: title2 }) }), states.hasLead && /* @__PURE__ */ wp.element.createElement(RichText, { tagName: "div", className: "_lead", value: lead, onChange: (lead2) => setAttributes({ lead: lead2 }) }))), /* @__PURE__ */ wp.element.createElement("div", { className: "contents_" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, null))), states.hasPatternImage && /* @__PURE__ */ wp.element.createElement("style", null, patternImageCss), states.hasHeaderPatternImage && /* @__PURE__ */ wp.element.createElement("style", null, headerPatternImageCss), states.hasBorderImage && /* @__PURE__ */ wp.element.createElement("style", null, borderImageCss), states.hasFrameImage && /* @__PURE__ */ wp.element.createElement("style", null, frameImageCss))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.ColorVarTracer, { target: mainBlock }, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: __("\u30AF\u30E9\u30B9", "catpow"), icon: "art", set: setAttributes, attr: attributes, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "ID", icon: "admin-links", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(
        TextControl,
        {
          label: "ID",
          onChange: (anchor2) => {
            setAttributes({ anchor: anchor2 });
          },
          value: anchor
        }
      )), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: __("\u30AF\u30E9\u30B9", "catpow"), onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes })))));
    },
    save({ attributes, className }) {
      const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;
      const {
        SectionTag,
        HeadingTag,
        anchor,
        navIcon,
        classes,
        bodyClasses,
        headerClasses,
        titleClasses,
        vars,
        headerVars,
        prefix,
        title,
        lead,
        titleImageCode,
        headerImageCode,
        headerPatternImageCss,
        patternImageCss,
        frameImageCss,
        borderImageCss
      } = attributes;
      const states = CP.classNamesToFlags(classes);
      const { devices, imageKeys, imageSizes } = CP.config.section;
      const blockProps = useBlockProps.save({
        id: anchor,
        className: clsx("section-", classes),
        style: vars
      });
      return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement(SectionTag, { "data-icon": navIcon, ...blockProps }, /* @__PURE__ */ wp.element.createElement("div", { className: clsx("body_", bodyClasses) }, states.hasDecoration && /* @__PURE__ */ wp.element.createElement(CP.PlacedPictures, { className: "decoration_", attr: attributes, keys: imageKeys.decoration }), /* @__PURE__ */ wp.element.createElement("header", { className: clsx("header_", headerClasses), style: headerVars }, /* @__PURE__ */ wp.element.createElement("div", { className: clsx("_title", titleClasses) }, states.hasIcon && /* @__PURE__ */ wp.element.createElement(CP.OutputIcon, { className: "_icon", item: attributes }), states.hasPrefix && /* @__PURE__ */ wp.element.createElement("div", { className: "_prefix" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: prefix })), states.hasHeaderImage && /* @__PURE__ */ wp.element.createElement("div", { className: "_image" }, states.isTemplate && headerImageCode ? headerImageCode : /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { className: "_image", attr: attributes, keys: imageKeys.headerImage })), states.hasTitleImage ? /* @__PURE__ */ wp.element.createElement(HeadingTag, { className: "_titleimage" }, states.isTemplate && titleImageCode ? titleImageCode : /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { className: "_image", attr: attributes, keys: imageKeys.titleImage, devices })) : /* @__PURE__ */ wp.element.createElement(HeadingTag, { className: "_heading" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: title })), states.hasLead && /* @__PURE__ */ wp.element.createElement("div", { className: "_lead" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: lead })))), /* @__PURE__ */ wp.element.createElement("div", { className: "contents_" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null))), states.hasPatternImage && /* @__PURE__ */ wp.element.createElement("style", { className: "patternImageCss" }, patternImageCss), states.hasHeaderPatternImage && /* @__PURE__ */ wp.element.createElement("style", { className: "headerPatternImageCss" }, headerPatternImageCss), states.hasBorderImage && /* @__PURE__ */ wp.element.createElement("style", { className: "borderImageCss" }, borderImageCss), states.hasFrameImage && /* @__PURE__ */ wp.element.createElement("style", { className: "frameImageCss" }, frameImageCss)));
    }
  });
})();
