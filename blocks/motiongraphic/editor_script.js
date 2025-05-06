(() => {
  // ../blocks/motiongraphic/editor_script.jsx
  CP.config.motiongraphic = {};
  wp.blocks.registerBlockType("catpow/motiongraphic", {
    title: "\u{1F43E} MotionGraphic",
    icon: "video-alt3",
    category: "catpow-embed",
    example: CP.example,
    supports: {
      customClassName: false
    },
    edit({ attributes, setAttributes, className }) {
      const { useCallback } = wp.element;
      const { InnerBlocks, InspectorControls } = wp.blockEditor;
      const { classes = "", component, props } = attributes;
      const { selections } = CP.config.motiongraphic;
      const initSelectionItems = useCallback(
        (items) => {
          if (Array.isArray(items)) {
            items.map((item) => {
              item.json = "props";
              if (item.sub) {
                initSelectionItems(item.sub);
              }
            });
          } else {
            Object.keys(items).map((key) => {
              initSelectionItems(items[key]);
            });
          }
        },
        [attributes]
      );
      if (!selections) {
        wp.apiFetch({
          path: "/cp/v1/blocks/config/motiongraphic/selections"
        }).then((res) => {
          initSelectionItems(res.items[0].sub);
          CP.config.motiongraphic.selections = res.items;
          setAttributes({ selections: res.items });
        });
        return false;
      }
      const SelectedComponent = component && Catpow.Animation[component] ? Catpow.Animation[component] : false;
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { className: "cp-embeddedcontent" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, component), /* @__PURE__ */ wp.element.createElement("div", { className: classes }, /* @__PURE__ */ wp.element.createElement("div", { className: "wp-block-catpow-motiongraphic__background" }, SelectedComponent ? /* @__PURE__ */ wp.element.createElement(Catpow.FixedBG, null, /* @__PURE__ */ wp.element.createElement(Catpow.Animation, null, /* @__PURE__ */ wp.element.createElement(SelectedComponent, { ...JSON.parse(props) }))) : /* @__PURE__ */ wp.element.createElement("p", null, "Select Component")), /* @__PURE__ */ wp.element.createElement(InnerBlocks, null))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, selections && /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { classKey: "component", title: "\u8A2D\u5B9A", icon: "edit", set: setAttributes, attr: attributes, selectiveClasses: selections, initialOpen: true })));
    },
    save({ attributes, className, setAttributes }) {
      const { InnerBlocks } = wp.blockEditor;
      const { classes = "" } = attributes;
      const states = CP.wordsToFlags(classes);
      return /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null);
    }
  });
})();
