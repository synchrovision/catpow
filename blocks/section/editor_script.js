(() => {
  // ../blocks/section/editor_script.jsx
  var { __ } = wp.i18n;
  CP.config.section = {
    devices: ["sp", "tb"],
    imageKeys: {
      navIcon: { src: "navIcon" },
      image: { mime: "imageMime", src: "imageSrc", alt: "imageAlt", srcset: "imageSrcset" },
      titleImage: { mime: "titleImageMime", src: "titleImageSrc", alt: "titleImageAlt", srcset: "titleImageSrcset", sources: "titleImageSources" },
      headerImage: { mime: "headerImageMime", src: "headerImageSrc", alt: "headerImageAlt", srcset: "headerImageSrcset" },
      headerBackgroundImage: { mime: "headerBackgroundImageMime", src: "headerBackgroundImageSrc", alt: "headerBackgroundImageAlt", srcset: "headerBackgroundImageSrcset", sources: "headerBackgroundImageSources" },
      backgroundImage: { src: "backgroundImageSrc", srcset: "backgroundImageSrcset", sources: "backgroundImageSources" },
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
      const { InnerBlocks, BlockControls, InspectorControls, RichText } = wp.blockEditor;
      const { PanelBody, TextareaControl, TextControl } = wp.components;
      const { attributes, className, setAttributes } = props;
      const { useMemo, useState } = wp.element;
      const {
        SectionTag,
        HeadingTag,
        color,
        anchor,
        classes,
        prefix,
        title,
        lead,
        headerImageMime,
        headerImageSrc,
        headerImageSrcset,
        headerImageAlt,
        headerImageCode,
        headerBackgroundImageCode,
        imageMime,
        imageSrc,
        imageSrcset,
        imageAlt,
        imageCode,
        backgroundImageSrc,
        backgroundImageCode,
        headerPatternImageCss,
        patternImageCss,
        frameImageCss,
        borderImageCss,
        iconSrc,
        iconAlt
      } = attributes;
      const states = CP.wordsToFlags(classes);
      const { devices, imageKeys, imageSizes } = CP.config.section;
      const [mainBlock, setMainBlock] = useState();
      CP.inheritColor(props, ["iconSrc", "patternImageCss", "headerPatternImageCss", "frameImageCss", "borderImageCss"]);
      CP.manageStyleData(props, ["patternImageCss", "headerPatternImageCss", "frameImageCss", "borderImageCss"]);
      const selectiveClasses = useMemo(() => {
        const { devices: devices2, imageKeys: imageKeys2, imageSizes: imageSizes2 } = CP.config.section;
        const selectiveClasses2 = [
          { name: "sectionTag", input: "buttons", key: "SectionTag", label: __("\u30BB\u30AF\u30B7\u30E7\u30F3\u30BF\u30B0", "catpow"), values: ["article", "section", "aside", "div"] },
          { name: "headingTag", input: "buttons", key: "HeadingTag", label: __("\u898B\u51FA\u3057\u30BF\u30B0", "catpow"), values: ["h1", "h2", "h3", "h4"], effect: (val, states2, { set }) => {
            for (const key in states2) {
              if (key.substr(0, 5) === "level") {
                states2[key] = false;
              }
            }
            if (/^h\d$/.test(val)) {
              states2["level" + val[1]] = true;
            }
            set({ classes: CP.flagsToWords(states2) });
          } },
          {
            name: "type",
            label: __("\u30BF\u30A4\u30D7", "catpow"),
            type: "gridbuttons",
            values: [
              "scene",
              "article",
              "column"
            ],
            sub: {
              scene: [
                "color",
                { name: "prefix", label: __("\u30D7\u30EC\u30D5\u30A3\u30AF\u30B9", "catpow"), values: "hasPrefix" },
                { name: "titleImage", label: __("\u30BF\u30A4\u30C8\u30EB\u753B\u50CF", "catpow"), values: "hasTitleImage", sub: [
                  { input: "picture", keys: imageKeys2.titleImage, devices: devices2 }
                ] },
                { name: "headerImage", label: __("\u30D8\u30C3\u30C0\u753B\u50CF", "catpow"), values: "hasHeaderImage", sub: [
                  { input: "image", keys: imageKeys2.headerImage, size: imageSizes2.headerImage }
                ] },
                { name: "headerBackgroundImage", label: __("\u30D8\u30C3\u30C0\u80CC\u666F\u753B\u50CF", "catpow"), values: "hasHeaderBackgroundImage", sub: [
                  { input: "picture", label: __("\u80CC\u666F\u753B\u50CF", "catpow"), keys: imageKeys2.headerBackgroundImage, devices: devices2 },
                  { label: __("\u8584\u304F", "catpow"), values: "paleHeaderBG" }
                ] },
                { name: "inverseText", label: __("\u629C\u304D\u8272\u6587\u5B57", "catpow"), values: "inverseText", sub: [
                  { label: __("\u30D8\u30C3\u30C0\u80CC\u666F\u8272", "catpow"), values: "hasHeaderBackgroundColor", sub: [
                    { label: __("\u30D1\u30BF\u30FC\u30F3\u753B\u50CF", "catpow"), values: "hasHeaderPatternImage", sub: [
                      { input: "pattern", css: "headerPatternImageCss", sel: ({ attr }) => "#" + attr.anchor + " > .contents > .header" }
                    ] }
                  ] }
                ] },
                { name: "lead", label: __("\u30EA\u30FC\u30C9", "catpow"), values: "hasLead" },
                { name: "backgroundImage", label: __("\u80CC\u666F\u753B\u50CF", "catpow"), values: "hasBackgroundImage", sub: [
                  { input: "picture", label: __("\u80CC\u666F\u753B\u50CF", "catpow"), keys: imageKeys2.backgroundImage, devices: devices2 },
                  { name: "paleBG", label: __("\u8584\u304F", "catpow"), values: "paleBG" }
                ] },
                { name: "backgroundColor", label: __("\u80CC\u666F\u8272", "catpow"), values: "hasBackgroundColor" },
                { name: "navIcon", label: __("\u30E1\u30CB\u30E5\u30FC\u30A2\u30A4\u30B3\u30F3", "catpow"), values: "hasNavIcon", sub: [
                  { input: "image", label: __("\u30A2\u30A4\u30B3\u30F3", "catpow"), keys: imageKeys2.navIcon, size: "thumbnail" }
                ] },
                { name: "decoration", label: __("\u30C7\u30B3\u30EC\u30FC\u30B7\u30E7\u30F3", "catpow"), values: "hasDecoration" },
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
              article: [
                "color",
                { name: "level", type: "buttons", label: __("\u30EC\u30D9\u30EB", "catpow"), values: { level1: "1", level2: "2", level3: "3", level4: "4" } },
                { name: "headingType", type: "gridbuttons", label: __("\u898B\u51FA\u3057\u30BF\u30A4\u30D7", "catpow"), filter: "heading_type", values: ["header", "headline", "catch"] },
                { name: "headerImage", label: __("\u30D8\u30C3\u30C0\u753B\u50CF", "catpow"), values: "hasHeaderImage", sub: [
                  {
                    input: "image",
                    keys: imageKeys2.headerImage,
                    size: imageSizes2.headerImage,
                    cond: (states2, { attr }) => !states2.isTemplate || !attr.headerImageCode
                  }
                ] },
                { name: "lead", label: __("\u30EA\u30FC\u30C9", "catpow"), values: "hasLead" },
                { name: "backgroundImage", label: __("\u80CC\u666F\u753B\u50CF", "catpow"), values: "hasBackgroundImage", sub: [
                  { input: "picture", keys: imageKeys2.backgroundImage, devices: devices2, cond: (states2, { attr }) => !states2.isTemplate || !attr.backgroundImageCode },
                  { label: __("\u8584\u304F", "catpow"), values: "paleBG" }
                ] },
                { name: "backgroundColor", label: __("\u80CC\u666F\u8272", "catpow"), values: "hasBackgroundColor" },
                { name: "navIcon", label: __("\u30E1\u30CB\u30E5\u30FC\u30A2\u30A4\u30B3\u30F3", "catpow"), values: "hasNavIcon", sub: [
                  { input: "image", label: __("\u30A2\u30A4\u30B3\u30F3", "catpow"), keys: imageKeys2.navIcon, size: "thumbnail" }
                ] },
                { name: "patternImage", label: __("\u30D1\u30BF\u30FC\u30F3\u753B\u50CF", "catpow"), values: "hasPatternImage", sub: [
                  { input: "pattern", css: "patternImageCss", sel: ({ attr }) => `#${attr.anchor}`, color }
                ] },
                { name: "frameImage", label: __("\u30D5\u30EC\u30FC\u30E0\u753B\u50CF", "catpow"), values: "hasFrameImage", sub: [
                  { input: "frame", css: "frameImageCss", sel: ({ attr }) => `#${attr.anchor}`, color }
                ] },
                { name: "borderImage", label: __("\u30DC\u30FC\u30C0\u30FC\u753B\u50CF", "catpow"), values: "hasBorderImage", sub: [
                  { input: "border", css: "borderImageCss", sel: ({ attr }) => `#${attr.anchor} > .contents`, color }
                ] },
                { name: "decoration", label: __("\u30C7\u30B3\u30EC\u30FC\u30B7\u30E7\u30F3", "catpow"), values: "hasDecoration" },
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
              column: [
                "color",
                "pattern",
                { name: "icon", label: __("\u30A2\u30A4\u30B3\u30F3", "catpow"), values: "hasIcon", sub: [
                  { input: "icon", color }
                ] },
                { name: "image", label: __("\u753B\u50CF", "catpow"), values: "hasImage", sub: [
                  { input: "image", keys: imageKeys2.image }
                ] },
                { name: "backgroundImage", label: __("\u80CC\u666F\u753B\u50CF", "catpow"), values: "hasBackgroundImage", sub: [
                  { input: "picture", keys: imageKeys2.backgroundImage, devices: devices2, cond: (states2, { attr }) => !states2.isTemplate || !attr.backgroundImageCode },
                  { label: __("\u8584\u304F", "catpow"), values: "paleBG" }
                ] },
                { name: "border", label: __("\u7DDA", "catpow"), values: { no_border: __("\u306A\u3057", "catpow"), thin_border: __("\u7D30", "catpow"), bold_border: __("\u592A", "catpow") } },
                { name: "round", label: __("\u89D2\u4E38", "catpow"), values: "round" },
                { name: "shadow", label: __("\u5F71", "catpow"), values: "shadow", sub: [{ label: __("\u5185\u5074", "catpow"), values: "inset" }] },
                { name: "navIcon", label: __("\u30E1\u30CB\u30E5\u30FC\u30A2\u30A4\u30B3\u30F3", "catpow"), values: "hasNavIcon", sub: [
                  { input: "image", label: __("\u30A2\u30A4\u30B3\u30F3", "catpow"), keys: imageKeys2.navIcon, size: "thumbnail" }
                ] },
                { name: "borderImage", label: __("\u30DC\u30FC\u30C0\u30FC\u753B\u50CF", "catpow"), values: "hasBorderImage", sub: [
                  { input: "border", css: "borderImageCss", sel: ({ attr }) => `#${attr.anchor} > .contents`, color }
                ] },
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
              scene: ["level2"],
              column: ["level3"]
            }
          }
        ];
        wp.hooks.applyFilters("catpow.blocks.section.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      var level = CP.getNumberClass({ attr: attributes }, "level");
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(CP.AlignClassToolbar, { set: setAttributes, attr: attributes })), /* @__PURE__ */ wp.element.createElement(SectionTag, { id: anchor, className: classes, ref: setMainBlock }, states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, states.isTemplate && imageCode ? /* @__PURE__ */ wp.element.createElement(CP.DummyImage, { text: imageCode }) : /* @__PURE__ */ wp.element.createElement(
        CP.SelectResponsiveImage,
        {
          attr: attributes,
          set: setAttributes,
          keys: imageKeys.image,
          size: imageSizes.image
        }
      )), /* @__PURE__ */ wp.element.createElement("div", { className: "contents" }, states.hasDecoration && /* @__PURE__ */ wp.element.createElement(
        CP.PlacedPictures.Edit,
        {
          className: "decoration",
          set: setAttributes,
          attr: attributes,
          keys: imageKeys.decoration
        }
      ), /* @__PURE__ */ wp.element.createElement("header", { className: "header" }, /* @__PURE__ */ wp.element.createElement("div", { className: "title" }, states.hasIcon && /* @__PURE__ */ wp.element.createElement(CP.OutputIcon, { item: attributes }), states.hasPrefix && /* @__PURE__ */ wp.element.createElement("div", { className: "prefix" }, /* @__PURE__ */ wp.element.createElement(RichText, { tagName: "div", value: prefix, onChange: (prefix2) => setAttributes({ prefix: prefix2 }) })), states.hasHeaderImage && /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, states.isTemplate && headerImageCode ? /* @__PURE__ */ wp.element.createElement(CP.DummyImage, { text: headerImageCode }) : /* @__PURE__ */ wp.element.createElement(
        CP.SelectResponsiveImage,
        {
          set: setAttributes,
          attr: attributes,
          keys: imageKeys.headerImage,
          size: imageSizes.headerImage
        }
      )), states.hasTitleImage ? /* @__PURE__ */ wp.element.createElement(HeadingTag, { className: "titleImage" }, states.isTemplate && titleImageCode ? /* @__PURE__ */ wp.element.createElement(CP.DummyImage, { text: titleImageCode }) : /* @__PURE__ */ wp.element.createElement(
        CP.SelectResponsiveImage,
        {
          set: setAttributes,
          attr: attributes,
          keys: imageKeys.titleImage,
          devices
        }
      )) : /* @__PURE__ */ wp.element.createElement(RichText, { tagName: HeadingTag, className: "heading", value: title, onChange: (title2) => setAttributes({ title: title2 }) }), states.hasLead && /* @__PURE__ */ wp.element.createElement(RichText, { tagName: "div", className: "lead", value: lead, onChange: (lead2) => setAttributes({ lead: lead2 }) })), states.hasHeaderBackgroundImage && /* @__PURE__ */ wp.element.createElement("div", { className: "background" }, states.isTemplate && headerBackgroundImageCode ? /* @__PURE__ */ wp.element.createElement(CP.DummyImage, { text: headerBackgroundImageCode }) : /* @__PURE__ */ wp.element.createElement(
        CP.SelectResponsiveImage,
        {
          set: setAttributes,
          attr: attributes,
          keys: imageKeys.headerBackgroundImage
        }
      ))), /* @__PURE__ */ wp.element.createElement("div", { className: "text" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks, null))), states.hasBackgroundImage && /* @__PURE__ */ wp.element.createElement("div", { className: "background" }, states.isTemplate && backgroundImageCode ? /* @__PURE__ */ wp.element.createElement(CP.DummyImage, { text: backgroundImageCode }) : /* @__PURE__ */ wp.element.createElement(
        CP.SelectResponsiveImage,
        {
          set: setAttributes,
          attr: attributes,
          keys: imageKeys.backgroundImage
        }
      )), states.hasPatternImage && /* @__PURE__ */ wp.element.createElement("style", null, patternImageCss), states.hasHeaderPatternImage && /* @__PURE__ */ wp.element.createElement("style", null, headerPatternImageCss), states.hasBorderImage && /* @__PURE__ */ wp.element.createElement("style", null, borderImageCss), states.hasFrameImage && /* @__PURE__ */ wp.element.createElement("style", null, frameImageCss)), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.ColorVarTracer, { target: mainBlock }, /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: __("\u30AF\u30E9\u30B9", "catpow"),
          icon: "art",
          set: setAttributes,
          attr: attributes,
          selectiveClasses,
          filters: CP.filters.section || {}
        }
      ), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "ID", icon: "admin-links", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(
        TextControl,
        {
          label: "ID",
          onChange: (anchor2) => {
            setAttributes({ anchor: anchor2 });
          },
          value: anchor
        }
      )), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(
        TextareaControl,
        {
          label: __("\u30AF\u30E9\u30B9", "catpow"),
          onChange: (classes2) => setAttributes({ classes: classes2 }),
          value: classes
        }
      )))));
    },
    save({ attributes, className }) {
      const { InnerBlocks, RichText } = wp.blockEditor;
      const {
        SectionTag,
        HeadingTag,
        anchor,
        navIcon,
        classes,
        prefix,
        title,
        lead,
        headerImageSrc,
        headerImageSrcset,
        headerImageAlt,
        headerImageCode,
        headerBackgroundImageCode,
        imageSrc,
        imageSrcset,
        imageAlt,
        imageCode,
        backgroundImageSrc,
        backgroundImageCode,
        headerPatternImageCss,
        patternImageCss,
        frameImageCss,
        borderImageCss,
        iconSrc,
        iconAlt
      } = attributes;
      var level = CP.getNumberClass({ attr: attributes }, "level");
      const states = CP.wordsToFlags(classes);
      const { devices, imageKeys, imageSizes } = CP.config.section;
      return /* @__PURE__ */ wp.element.createElement(SectionTag, { id: anchor, className: classes, "data-icon": navIcon }, states.hasImage && /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, states.isTemplate && imageCode ? imageCode : /* @__PURE__ */ wp.element.createElement(
        CP.ResponsiveImage,
        {
          attr: attributes,
          keys: imageKeys.image,
          size: "medium_large"
        }
      )), /* @__PURE__ */ wp.element.createElement("div", { className: "contents" }, states.hasDecoration && /* @__PURE__ */ wp.element.createElement(
        CP.PlacedPictures,
        {
          className: "decoration",
          attr: attributes,
          keys: imageKeys.decoration
        }
      ), /* @__PURE__ */ wp.element.createElement("header", { className: "header" }, /* @__PURE__ */ wp.element.createElement("div", { className: "title" }, states.hasIcon && /* @__PURE__ */ wp.element.createElement(CP.OutputIcon, { item: attributes }), states.hasPrefix && /* @__PURE__ */ wp.element.createElement("div", { className: "prefix" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: prefix })), states.hasHeaderImage && /* @__PURE__ */ wp.element.createElement("div", { className: "image" }, states.isTemplate && headerImageCode ? headerImageCode : /* @__PURE__ */ wp.element.createElement(
        CP.ResponsiveImage,
        {
          attr: attributes,
          keys: imageKeys.headerImage
        }
      )), states.hasTitleImage ? /* @__PURE__ */ wp.element.createElement(HeadingTag, { className: "titleImage" }, states.isTemplate && titleImageCode ? titleImageCode : /* @__PURE__ */ wp.element.createElement(
        CP.ResponsiveImage,
        {
          attr: attributes,
          keys: imageKeys.titleImage,
          devices
        }
      )) : /* @__PURE__ */ wp.element.createElement(HeadingTag, { className: "heading" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: title })), states.hasLead && /* @__PURE__ */ wp.element.createElement("div", { className: "lead" }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: lead }))), states.hasHeaderBackgroundImage && /* @__PURE__ */ wp.element.createElement("div", { className: "background" }, states.isTemplate && headerBackgroundImageCode ? headerBackgroundImageCode : /* @__PURE__ */ wp.element.createElement(
        CP.ResponsiveImage,
        {
          attr: attributes,
          keys: imageKeys.headerBackgroundImage,
          devices
        }
      ))), /* @__PURE__ */ wp.element.createElement("div", { className: "text" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null))), states.hasBackgroundImage && /* @__PURE__ */ wp.element.createElement("div", { className: "background" }, states.isTemplate && backgroundImageCode ? backgroundImageCode : /* @__PURE__ */ wp.element.createElement(
        CP.ResponsiveImage,
        {
          attr: attributes,
          keys: imageKeys.backgroundImage,
          devices
        }
      )), states.hasPatternImage && /* @__PURE__ */ wp.element.createElement("style", { className: "patternImageCss" }, patternImageCss), states.hasHeaderPatternImage && /* @__PURE__ */ wp.element.createElement("style", { className: "headerPatternImageCss" }, headerPatternImageCss), states.hasBorderImage && /* @__PURE__ */ wp.element.createElement("style", { className: "borderImageCss" }, borderImageCss), states.hasFrameImage && /* @__PURE__ */ wp.element.createElement("style", { className: "frameImageCss" }, frameImageCss));
    }
  });
})();
