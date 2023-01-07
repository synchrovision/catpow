(() => {
  // ../blocks/honeycomb/editor_script.jsx
  CP.config.honeycomb = {
    imageKeys: {
      image: { src: "src", items: "items" }
    }
  };
  wp.blocks.registerBlockType("catpow/honeycomb", {
    title: "\u{1F43E} honeycomb",
    description: "\u516D\u89D2\u5F62\u306E\u30D1\u30CD\u30EB\u3092\u30EC\u30A4\u30A2\u30A6\u30C8\u3057\u307E\u3059\u3002",
    icon: /* @__PURE__ */ wp.element.createElement("svg", { viewBox: "0 0 512 512" }, /* @__PURE__ */ wp.element.createElement("path", { d: "M282.6,176.3l71.7,41.4v82.8l-71.7,41.4L211,300.4v-82.8L282.6,176.3 M282.6,168l-78.9,45.5v91.1l78.9,45.5l78.9-45.5\n				v-91.1L282.6,168L282.6,168z" }), /* @__PURE__ */ wp.element.createElement("polygon", { points: "120.9,357 120.9,448 199.7,493.6 278.6,448 278.6,357 199.7,311.5 	" }), /* @__PURE__ */ wp.element.createElement("polygon", { points: "30.9,214 30.9,305 109.7,350.6 188.6,305 188.6,214 109.7,168.5 	" }), /* @__PURE__ */ wp.element.createElement("polygon", { points: "117.9,65 117.9,156 196.7,201.6 275.6,156 275.6,65 196.7,19.5 	" }), /* @__PURE__ */ wp.element.createElement("polygon", { points: "290.4,357.9 290.4,449 369.3,494.5 448.1,449 448.1,357.9 369.3,312.4 	" })),
    category: "catpow",
    attributes: {
      id: { source: "attribute", selector: ".wp-block-catpow-honeycomb", attribute: "id", default: "" },
      classes: { source: "attribute", selector: ".wp-block-catpow-honeycomb", attribute: "class", default: "wp-block-catpow-honeycomb hasBaseImage" },
      breakpoints: { source: "attribute", selector: ".wp-block-catpow-honeycomb", "attribute": "data-breakpoints", default: "480,960" },
      grid: { source: "attribute", selector: ".wp-block-catpow-honeycomb", "attribute": "data-grid", default: "4 6,6 4,8 3" },
      items: {
        source: "query",
        selector: ".item",
        query: {
          classes: { source: "attribute", attribute: "class" },
          order: { source: "attribute", "attribute": "data-order" },
          src: { source: "attribute", selector: "svg image", attribute: "href" },
          title: { source: "children", selector: ".title" },
          text: { source: "children", selector: ".text" }
        },
        default: [
          {
            classes: "item hasImage hasTitle hasText",
            order: "2 2 2 1,2 2 2 1,2 2 2 1",
            src: cp.theme_url + "/images/dummy.jpg",
            title: ["Title"],
            text: ["Text"]
          }
        ]
      },
      bp: { source: "attribute", default: "0" }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useState, useMemo } = wp.element;
      const { id, classes, items = [] } = attributes;
      let { breakpoints, grid } = attributes;
      if (!id) {
        setAttributes({ id: "hnc" + new Date().getTime().toString(16) });
      }
      if (void 0 == attributes.bp) {
        setAttributes({ bp: breakpoints[0] });
      }
      breakpoints = breakpoints.split(",");
      breakpoints.unshift("0");
      grid = grid.split(",").map((val) => val.split(" "));
      let bpIndex = breakpoints.indexOf(attributes.bp);
      if (bpIndex < 0) {
        setAttributes({ bp: breakpoints[0] });
      }
      const currentGrid = grid[bpIndex];
      var cssDatas = {};
      breakpoints.map((bp, bpIndex2) => {
        cssDatas[bp] = {
          ["#" + id]: CP.createGridStyleCodeData(grid[bpIndex2])
        };
      });
      var states = CP.wordsToFlags(classes);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = [];
        wp.hooks.applyFilters("catpow.blocks.honeycomb.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const selectiveItemClasses = useMemo(() => {
        const { imageKeys } = CP.config.honeycomb;
        const selectiveItemClasses2 = [
          "color",
          { name: "image", label: "\u753B\u50CF", values: "hasImage", sub: [
            { input: "image", keys: imageKeys.image }
          ] },
          { name: "title", label: "\u30BF\u30A4\u30C8\u30EB", values: "hasTitle" },
          { name: "text", label: "\u30C6\u30AD\u30B9\u30C8", values: "hasText" }
        ];
        wp.hooks.applyFilters("catpow.blocks.honeycomb.selectiveItemClasses", CP.finderProxy(selectiveItemClasses2));
        return selectiveItemClasses2;
      }, []);
      var tgtItem = false;
      const itemHandler = [
        /* @__PURE__ */ wp.element.createElement("div", { className: "handler move", "data-drawaction": "move" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "move" })),
        /* @__PURE__ */ wp.element.createElement("div", { className: "handler clone", "data-drawaction": "clone" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "plus-alt" })),
        /* @__PURE__ */ wp.element.createElement("div", { className: "handler delete", "data-drawaction": "delete" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "dismiss" }))
      ];
      const save = () => {
        setAttributes({ items: JSON.parse(JSON.stringify(items)) });
      };
      return [
        /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(
          CP.SelectBreakPointToolbar,
          {
            breakpoints,
            value: attributes.bp,
            onChange: (bp) => setAttributes({ bp })
          }
        )),
        /* @__PURE__ */ wp.element.createElement(
          Catpow.DrawArea,
          {
            id,
            className: classes,
            onCatch: (e) => {
              console.log("onCatch");
            },
            onDraw: (e) => {
              e.moveItem();
            },
            onRelease: (e) => {
              e.resetItem();
              console.log(e);
              if (e.action === "delete") {
                items.splice(e.index, 1);
                save();
                return;
              }
              var order = items[e.index].order.split(",");
              if (e.action === "clone") {
                items.splice(e.index, 0, JSON.parse(JSON.stringify(items[e.index])));
              }
              order[bpIndex] = Math.max(1, Math.min(currentGrid[0] - 1, Math.ceil(e.x / e.w * currentGrid[0]))) + " " + Math.max(1, Math.min(currentGrid[1], Math.ceil(e.y / e.h * currentGrid[1]))) + " 2 1";
              items[e.index].order = order.join(",");
              save();
            },
            style: {
              width: (attributes.bp == "0" ? breakpoints[1] : attributes.bp) + "px",
              margin: "0 auto",
              border: "solid 1px #888"
            }
          },
          items.map((item, index) => {
            var itemID = id + "_item_" + index;
            var itemStates = CP.wordsToFlags(item.classes);
            var itemClasses = item.classes;
            var itemSelected = attributes.currentItemIndex == index;
            var order = item.order.split(",").map((val) => val.split(" "));
            if (itemSelected) {
              itemClasses += " selected";
            }
            breakpoints.map((bp, bpIndex2) => {
              cssDatas[bp] = cssDatas[bp] || {};
              cssDatas[bp]["#" + itemID] = CP.createGridItemStyleCodeData(order[bpIndex2]);
            });
            return /* @__PURE__ */ wp.element.createElement(
              Catpow.Hexagon,
              {
                id: itemID,
                className: itemClasses,
                "data-index": index,
                src: itemStates.hasImage ? item.src : false,
                handler: itemHandler,
                "data-index": index,
                onClick: () => {
                  setAttributes({ currentItemIndex: index });
                }
              },
              itemStates.hasTitle && /* @__PURE__ */ wp.element.createElement("h3", null, /* @__PURE__ */ wp.element.createElement(
                RichText,
                {
                  placeholder: "Title",
                  onChange: (title) => {
                    item.title = title;
                    save();
                  },
                  value: item.title
                }
              )),
              itemStates.hasText && /* @__PURE__ */ wp.element.createElement("p", null, /* @__PURE__ */ wp.element.createElement(
                RichText,
                {
                  placeholder: "Text",
                  onChange: (text) => {
                    item.text = text;
                    save();
                  },
                  value: item.text
                }
              ))
            );
          }),
          /* @__PURE__ */ wp.element.createElement("style", null, CP.createStyleCode(cssDatas[attributes.bp]))
        ),
        /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "Grid", icon: "admin-links", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(
          TextControl,
          {
            label: "BreakPoints",
            onChange: (breakpoints2) => {
              setAttributes({ breakpoints: breakpoints2 });
            },
            value: attributes.breakpoints
          }
        ), /* @__PURE__ */ wp.element.createElement(
          TextControl,
          {
            label: "Grid",
            onChange: (grid2) => {
              setAttributes({ grid: grid2 });
            },
            value: attributes.grid
          }
        )), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "ID", icon: "admin-links", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(
          TextControl,
          {
            label: "ID",
            onChange: (id2) => {
              setAttributes({ id: id2 });
            },
            value: id
          }
        )), /* @__PURE__ */ wp.element.createElement(
          CP.SelectClassPanel,
          {
            title: "\u30AF\u30E9\u30B9",
            icon: "art",
            set: setAttributes,
            attr: attributes,
            selectiveClasses,
            filters: CP.filters.buttons || {}
          }
        ), /* @__PURE__ */ wp.element.createElement(
          CP.SelectClassPanel,
          {
            title: "\u30A2\u30A4\u30C6\u30E0",
            icon: "edit",
            set: setAttributes,
            attr: attributes,
            items,
            index: attributes.currentItemIndex,
            selectiveClasses: selectiveItemClasses,
            filters: CP.filters.honeycomb || {}
          }
        ), items[attributes.currentItemIndex] && /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "ITEM CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(
          TextareaControl,
          {
            label: "\u30AF\u30E9\u30B9",
            onChange: (classes2) => {
              items[attributes.currentItemIndex].classes = classes2;
              save();
            },
            value: items[attributes.currentItemIndex].classes
          }
        )), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null))
      ];
    },
    save({ attributes, className, setAttributes }) {
      const { id, classes, items = [] } = attributes;
      let { breakpoints, grid } = attributes;
      breakpoints = breakpoints.split(",");
      breakpoints.unshift("0");
      grid = grid.split(",").map((val) => val.split(" "));
      var cssDatas = {};
      breakpoints.map((bp, bpIndex) => {
        cssDatas[bp] = {
          ["#" + id]: CP.createGridStyleCodeData(grid[bpIndex])
        };
      });
      var states = CP.wordsToFlags(classes);
      const { imageKeys } = CP.config.honeycomb;
      return /* @__PURE__ */ wp.element.createElement(
        "div",
        {
          id,
          className: classes,
          "data-breakpoints": breakpoints,
          "data-grid": grid
        },
        items.map((item, index) => {
          var itemID = id + "_item_" + index;
          var itemStates = CP.wordsToFlags(item.classes);
          item.order = item.order || "";
          var order = item.order.split(",").map((val) => val.split(" "));
          breakpoints.map((bp, bpIndex) => {
            cssDatas[bp] = cssDatas[bp] || {};
            cssDatas[bp]["#" + itemID] = CP.createGridItemStyleCodeData(order[bpIndex]);
          });
          return /* @__PURE__ */ wp.element.createElement(
            Catpow.Hexagon,
            {
              id: itemID,
              className: item.classes,
              src: itemStates.hasImage ? item.src : false,
              "data-order": item.order
            },
            itemStates.hasTitle && /* @__PURE__ */ wp.element.createElement("h3", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.title })),
            itemStates.hasText && /* @__PURE__ */ wp.element.createElement("p", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.text }))
          );
        }),
        /* @__PURE__ */ wp.element.createElement("style", null, breakpoints.map((bp) => {
          if ("0" == bp) {
            return CP.createStyleCode(cssDatas[bp]);
          }
          return "@media(min-width:" + bp + "px){" + CP.createStyleCode(cssDatas[bp]) + "}";
        }))
      );
    }
  });
})();
