(() => {
  // ../blocks/formbuttons/editor_script.jsx
  var { __ } = wp.i18n;
  var blockConfig = {
    linkKeys: {
      link: { href: "action", items: "items" }
    }
  };
  CP.config.formbuttons = blockConfig;
  wp.blocks.registerBlockType("catpow/formbuttons", {
    title: "\u{1F43E} FormButtons",
    description: __("\u30D5\u30A9\u30FC\u30E0\u7528\u306E\u30DC\u30BF\u30F3\u3067\u3059\u3002", "catpow"),
    icon: "upload",
    category: "catpow",
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { useMemo } = wp.element;
      const { BlockControls, InspectorControls, useBlockProps } = wp.blockEditor;
      const { Icon, PanelBody, TextareaControl } = wp.components;
      const { isTemplate, items = [], classes = "", vars, EditMode = false } = attributes;
      const { linkKeys } = blockConfig;
      const states = CP.classNamesToFlags(classes);
      const selectiveClasses = useMemo(() => {
        var selectiveClasses2 = [];
        wp.hooks.applyFilters("catpow.blocks.formbuttons.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const selectiveItemClasses = useMemo(() => {
        const selectiveItemClasses2 = ["buttonParams"];
        wp.hooks.applyFilters("catpow.blocks.formbuttons.selectiveItemClasses", CP.finderProxy(selectiveItemClasses2));
        return selectiveItemClasses2;
      }, []);
      const saveItems = () => {
        setAttributes({ items: JSON.parse(JSON.stringify(items)) });
      };
      const blockProps = useBlockProps({ className: EditMode ? "cp-altcontent" : classes, style: vars });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.SelectModeToolbar, { setAttributes, attributes }), EditMode ? /* @__PURE__ */ wp.element.createElement("div", { ...blockProps }, /* @__PURE__ */ wp.element.createElement(CP.Label, { icon: "edit" }), /* @__PURE__ */ wp.element.createElement(
        CP.EditItemsTable,
        {
          setAttributes,
          attributes,
          columns: [
            { type: "text", key: "copy", cond: states.hasMicroCopy },
            { type: "text", key: "text", cond: true },
            { type: "text", key: "caption", cond: states.hasCaption },
            { type: "text", key: "action", cond: true }
          ],
          isTemplate
        }
      )) : /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("ul", { ...blockProps }, items.map((item, index) => {
        return /* @__PURE__ */ wp.element.createElement(CP.Button.Edit, { tag: "li", className: item.classes, isItem: true, ...{ setAttributes, attributes }, itemKeys: ["items", index], keys: linkKeys.link, key: index });
      }))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: __("\u30AF\u30E9\u30B9", "catpow"), icon: "art", ...{ setAttributes, attributes }, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: __("\u30DC\u30BF\u30F3", "catpow"),
          icon: "edit",
          ...{ setAttributes, attributes },
          itemKeys: ["items", attributes.currentItemIndex],
          selectiveClasses: selectiveItemClasses
        }
      ), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(CP.AlignClassToolbar, { setAttributes, attributes })));
    },
    save({ attributes }) {
      const { useBlockProps } = wp.blockEditor;
      const { items = [], classes = "", vars } = attributes;
      const blockType = wp.data.select("core/blocks").getBlockType("catpow/formbuttons");
      return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("ul", { ...useBlockProps.save({ className: classes, style: vars }) }, items.map((item, index) => /* @__PURE__ */ wp.element.createElement(
        CP.Button,
        {
          tag: "li",
          className: item.classes,
          isLink: false,
          ...{ attributes },
          itemKeys: ["items", index],
          keys: blockConfig.linkKeys.link,
          "data-action": item.action,
          "data-callback": item.callback,
          "data-target": item.target,
          "ignore-message": item.ignoreMessage,
          ...CP.extractEventDispatcherAttributes("catpow/formbuttons", item),
          key: index
        }
      ))));
    }
  });
})();
