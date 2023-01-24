(() => {
  // blocks/aquarium/editor_script.jsx
  wp.blocks.registerBlockType("catpow/aquarium", {
    title: "\u{1F43E} aquarium",
    description: "\u753B\u50CF\u3068\u30C6\u30AD\u30B9\u30C8\u3092\uFF13\u6B21\u5143\u306B\u30EC\u30A4\u30A2\u30A6\u30C8\u3057\u307E\u3059\u3002",
    icon: /* @__PURE__ */ wp.element.createElement("svg", { role: "img", focusable: "false", xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 20 20", "aria-hidden": "true" }, /* @__PURE__ */ wp.element.createElement("path", { d: "M18.5,19C18.5,19,18.5,19,18.5,19l0-17.9c0,0,0,0,0,0c0,0,0-0.1,0-0.1c0,0,0-0.1,0-0.1c0,0,0-0.1-0.1-0.1\n				c0,0,0-0.1-0.1-0.1c0,0,0,0,0,0c0,0,0,0,0,0c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1,0c0,0,0,0,0,0H2c0,0,0,0,0,0c0,0-0.1,0-0.1,0\n				c0,0-0.1,0-0.1,0c0,0,0,0,0,0c0,0,0,0,0,0c0,0-0.1,0-0.1,0.1c0,0,0,0-0.1,0.1c0,0,0,0.1,0,0.1c0,0,0,0.1,0,0.1c0,0,0,0,0,0.1v17.9\n				c0,0,0,0,0,0.1c0,0,0,0.1,0,0.1c0,0,0,0.1,0,0.1c0,0,0,0.1,0.1,0.1c0,0,0.1,0,0.1,0.1c0,0,0,0,0,0c0,0,0,0,0,0\n				c0.1,0,0.1,0.1,0.2,0.1c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0,0,0,0H18c0.1,0,0.2,0,0.2-0.1c0,0,0,0,0,0c0,0,0,0,0,0c0,0,0.1,0,0.1-0.1\n				c0,0,0-0.1,0.1-0.1c0,0,0-0.1,0-0.1C18.5,19.1,18.5,19,18.5,19z M2.5,2.8L4,5.1v9.2L2.5,17V2.8z M15,10.3c-0.3-0.8-1.1-1.4-2.1-1.4\n				c-1.2,0-2.2,1-2.2,2.2s1,2.2,2.2,2.2c0.9,0,1.7-0.6,2.1-1.4v2H5V5.4h10V10.3z M14.1,11c0,0.7-0.5,1.2-1.2,1.2\n				c-0.7,0-1.2-0.5-1.2-1.2c0-0.7,0.5-1.2,1.2-1.2C13.6,9.8,14.1,10.4,14.1,11z M15.2,4.4H4.7L2.9,1.6h14.2L15.2,4.4z M4.8,14.9h8.2\n				h2.3l2,3.6H2.8L4.8,14.9z M16,14.2V5.1l1.6-2.4V17L16,14.2z" }), /* @__PURE__ */ wp.element.createElement("path", { d: "M11.5,16.3c0,0.8,0.6,1.4,1.4,1.4c0.8,0,1.4-0.6,1.4-1.4s-0.6-1.4-1.4-1.4C12.1,14.9,11.5,15.5,11.5,16.3z M12.9,15.9\n				c0.2,0,0.4,0.2,0.4,0.4c0,0.2-0.2,0.4-0.4,0.4c-0.2,0-0.4-0.2-0.4-0.4C12.5,16.1,12.7,15.9,12.9,15.9z" })),
    category: "catpow",
    attributes: {
      classes: { source: "attribute", selector: ".wp-block-catpow-aquarium", attribute: "class", default: "wp-block-catpow-aquarium" },
      layers: {
        source: "query",
        selector: ".layer",
        query: {
          classes: { source: "attribute", attribute: "class" },
          items: {
            source: "query",
            selector: ".item",
            query: {
              classes: { source: "attribute", attribute: "class" },
              images: {
                source: "query",
                selector: ".image",
                query: {
                  classes: { source: "attribute", attribute: "class" },
                  src: { source: "attribute", attribute: "src", selector: "img" },
                  srcset: { source: "attribute", attribute: "srcset", selector: "img" },
                  alt: { source: "attribute", attribute: "alt", selector: "img" }
                }
              },
              texts: {
                source: "query",
                selector: ".text",
                query: {
                  classes: { source: "attribute", attribute: "class" },
                  title: { source: "html", selector: "h3" },
                  text: { source: "html", selector: "p" }
                }
              }
            }
          }
        },
        default: [
          { classes: "layer h_120", items: [
            { classes: "item center middle w_50 h_50 t_40 l_30", images: [], texts: [
              { classes: "text top left w_100 h_100 t_0 l_0 hasTitle hasText", title: "Title", text: "Text" }
            ] }
          ] },
          { classes: "layer h_160", items: [
            { classes: "item center middle w_50 h_50 t_60 l_70", images: [], texts: [
              { classes: "text top left w_100 h_100 t_0 l_0 hasTitle hasText", title: "Title", text: "Text" }
            ] }
          ] }
        ]
      }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes }) {
      const { useState, useMemo } = wp.element;
      const { InnerBlocks: InnerBlocks2, InspectorControls } = wp.blockEditor;
      const { classes, layers = [] } = attributes;
      const primaryClass = "wp-block-catpow-aquarium";
      var classArray = _.uniq((className + " " + classes).split(" "));
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = ["color"];
        wp.hooks.applyFilters("catpow.blocks.aquarium.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { className: classes }, layers.map((layer) => {
        return /* @__PURE__ */ wp.element.createElement("div", { className: layer.classes }, layer.items.map((item, index) => {
          return /* @__PURE__ */ wp.element.createElement("div", { className: item.classes, key: index }, item.images.length > 0 && item.images.map((image) => {
            return /* @__PURE__ */ wp.element.createElement("div", { className: image.classes }, /* @__PURE__ */ wp.element.createElement("img", { src: image.src, srcSet: image.srcset, alt: image.alt }));
          }), item.texts.length > 0 && item.texts.map((text) => {
            return /* @__PURE__ */ wp.element.createElement("div", { className: text.classes }, /* @__PURE__ */ wp.element.createElement("h3", null, text.title), /* @__PURE__ */ wp.element.createElement("p", null, text.text));
          }));
        }));
      }), /* @__PURE__ */ wp.element.createElement("div", { className: "contents" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks2, null))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: "\u30AF\u30E9\u30B9",
          icon: "art",
          set: setAttributes,
          attr: attributes,
          selectiveClasses,
          filters: CP.filters.aquarium || {}
        }
      )));
    },
    save({ attributes, className, setAttributes }) {
      const { classes, layers = [] } = attributes;
      return /* @__PURE__ */ wp.element.createElement("div", { className: classes }, layers.map((layer) => {
        return /* @__PURE__ */ wp.element.createElement("div", { className: layer.classes }, layer.items.map((item, index) => {
          return /* @__PURE__ */ wp.element.createElement("div", { className: item.classes, key: index }, item.images.length > 0 && item.images.map((image) => {
            return /* @__PURE__ */ wp.element.createElement("div", { className: image.classes }, /* @__PURE__ */ wp.element.createElement("img", { src: image.src, srcSet: image.srcset, alt: image.alt }));
          }), item.texts.length > 0 && item.texts.map((text) => {
            return /* @__PURE__ */ wp.element.createElement("div", { className: text.classes }, /* @__PURE__ */ wp.element.createElement("h3", null, text.title), /* @__PURE__ */ wp.element.createElement("p", null, text.text));
          }));
        }));
      }), /* @__PURE__ */ wp.element.createElement("div", { className: "contents" }, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
