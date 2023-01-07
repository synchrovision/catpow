(() => {
  // blocks/icons/editor_script.jsx
  wp.blocks.registerBlockType("catpow/icons", {
    title: "\u{1F43E} Icons",
    description: "\u30EA\u30F3\u30AF\u4ED8\u304D\u306E\u30A2\u30A4\u30B3\u30F3\u753B\u50CF\u3092\u4E26\u3079\u3066\u8868\u793A\u3059\u308B\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002",
    icon: "image-filter",
    category: "catpow",
    transforms: {
      from: [
        {
          type: "block",
          blocks: CP.listedConvertibles,
          transform: (attributes) => {
            attributes.classes = "wp-block-catpow-icons medium hasSubTitle hasText";
            return createBlock("catpow/icons", attributes);
          }
        }
      ]
    },
    attributes: {
      version: { type: "number", default: 0 },
      classes: { source: "attribute", selector: "ul", attribute: "class", default: "wp-block-catpow-icons" },
      items: {
        source: "query",
        selector: "li.item",
        query: {
          classes: { source: "attribute", attribute: "class" },
          src: { source: "attribute", selector: "[src]", attribute: "src" },
          alt: { source: "attribute", selector: "[src]", attribute: "alt" },
          href: { source: "attribute", selector: "a", attribute: "href" }
        },
        default: [...Array(3)].map(() => {
          return {
            classes: "item",
            src: wpinfo.theme_url + "/images/dummy_icon.svg",
            alt: "dummy",
            href: wpinfo.home_url
          };
        })
      }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useState, useMemo } = wp.element;
      const { items = [], classes, countPrefix, countSuffix } = attributes;
      const primaryClass = "wp-block-catpow-icons";
      var classArray = _.uniq((className + " " + classes).split(" "));
      var classNameArray = className.split(" ");
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [
          { name: "size", label: "\u30B5\u30A4\u30BA", filter: "size", values: ["small", "medium", "large"] },
          { name: "filled", label: "\u5857\u308A", values: "filled", sub: [
            { name: "shape", label: "\u5F62\u72B6", filter: "shape", values: { circle: "\u4E38", square: "\u56DB\u89D2" } }
          ] }
        ];
        wp.hooks.applyFilters("catpow.blocks.icons.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const selectiveItemClasses = useMemo(() => {
        const selectiveItemClasses2 = [
          { name: "image", input: "image", keys: { src: "src", alt: "alt" }, size: "thumbnail" },
          { name: "link", input: "text", key: "href", label: "\u30EA\u30F3\u30AF" },
          "color"
        ];
        wp.hooks.applyFilters("catpow.blocks.icons.selectiveItemClasses", CP.finderProxy(selectiveItemClasses2));
        return selectiveItemClasses2;
      }, []);
      let rtn = [];
      items.map((item, index) => {
        if (!item.controlClasses) {
          item.controlClasses = "control";
        }
        rtn.push(
          /* @__PURE__ */ wp.element.createElement(
            CP.Item,
            {
              tag: "li",
              set: setAttributes,
              attr: attributes,
              items,
              index,
              isSelected: attributes.currentItemIndex == index
            },
            /* @__PURE__ */ wp.element.createElement("a", null, /* @__PURE__ */ wp.element.createElement("img", { src: item.src, alt: item.alt }))
          )
        );
      });
      if (attributes.EditMode === void 0) {
        attributes.EditMode = false;
      }
      return [
        /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(
          Toolbar,
          {
            controls: [
              {
                icon: "edit",
                title: "EditMode",
                isActive: attributes.EditMode,
                onClick: () => setAttributes({ EditMode: !attributes.EditMode })
              }
            ]
          }
        ), /* @__PURE__ */ wp.element.createElement(
          CP.AlignClassToolbar,
          {
            set: setAttributes,
            attr: attributes
          }
        )),
        /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(
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
            onChange: (clss) => setAttributes({ classes: clss }),
            value: classArray.join(" ")
          }
        )), /* @__PURE__ */ wp.element.createElement(
          CP.SelectClassPanel,
          {
            title: "\u30A2\u30A4\u30C6\u30E0",
            icon: "edit",
            set: setAttributes,
            attr: attributes,
            items,
            index: attributes.currentItemIndex,
            selectiveClasses: selectiveItemClasses
          }
        ), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)),
        /* @__PURE__ */ wp.element.createElement("ul", { className: attributes.EditMode ? primaryClass + " edit" : classes }, rtn)
      ];
    },
    save({ attributes, className }) {
      const { items = [], classes, countPrefix, countSuffix } = attributes;
      let rtn = [];
      items.map((item, index) => {
        rtn.push(
          /* @__PURE__ */ wp.element.createElement("li", { className: item.classes }, /* @__PURE__ */ wp.element.createElement("a", { href: item.href }, /* @__PURE__ */ wp.element.createElement("img", { src: item.src, alt: item.alt })))
        );
      });
      return /* @__PURE__ */ wp.element.createElement("ul", { className: classes }, rtn);
    }
  });
})();
