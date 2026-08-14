(() => {
  // ../blocks/buttons/editor_script.jsx
  var { __ } = wp.i18n;
  var blockConfig = {
    linkKeys: {
      link: { href: "href", items: "items" }
    }
  };
  CP.config.buttons = blockConfig;
  wp.blocks.registerBlockType("catpow/buttons", {
    title: "\u{1F43E} Buttons",
    description: __("\u30DC\u30BF\u30F3\u306E\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002", "catpow"),
    icon: /* @__PURE__ */ wp.element.createElement("svg", { role: "img", focusable: "false", xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 20 20", "aria-hidden": "true" }, /* @__PURE__ */ wp.element.createElement(
      "path",
      {
        d: "M19.5,11c0,2.8-2.2,5-5,5h-9c-2.8,0-5-2.2-5-5V9c0-2.8,2.2-5,5-5h9c2.8,0,5,2.2,5,5V11z M5.5,5c-2.2,0-4,1.8-4,4\n				c0,2.2,1.8,4,4,4h9c2.2,0,4-1.8,4-4c0-2.2-1.8-4-4-4H5.5z"
      }
    )),
    category: "catpow",
    example: CP.example,
    edit(props) {
      const { useMemo } = wp.element;
      const { BlockControls, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
      const { Icon, PanelBody, TextareaControl } = wp.components;
      const { attributes, setAttributes, isSelected } = props;
      const { isTemplate, items = [], classes, vars, loopCount, doLoop, EditMode = false, AltMode = false } = attributes;
      const { linkKeys } = blockConfig;
      const states = CP.classNamesToFlags(classes);
      const selectiveClasses = useMemo(() => {
        const selectiveClasses2 = ["isTemplate"];
        wp.hooks.applyFilters("catpow.blocks.buttons.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      const selectiveItemClasses = useMemo(() => {
        const selectiveItemClasses2 = ["buttonParams"];
        wp.hooks.applyFilters("catpow.blocks.buttons.selectiveItemClasses", CP.finderProxy(selectiveItemClasses2));
        return selectiveItemClasses2;
      }, []);
      const saveItems = () => {
        setAttributes({ items: JSON.parse(JSON.stringify(items)) });
      };
      const blockProps = useBlockProps({
        className: classes,
        style: vars
      });
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(CP.AlignClassToolbar, { setAttributes, attributes })), /* @__PURE__ */ wp.element.createElement(CP.SelectModeToolbar, { setAttributes, attributes }), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: __("\u30B9\u30BF\u30A4\u30EB", "catpow"), icon: "art", ...{ setAttributes, attributes }, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(
        CP.SelectClassPanel,
        {
          title: __("\u30DC\u30BF\u30F3", "catpow"),
          icon: "edit",
          ...{ setAttributes, attributes },
          itemKeys: ["items", attributes.currentItemIndex],
          selectiveClasses: selectiveItemClasses
        }
      )), /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, EditMode ? /* @__PURE__ */ wp.element.createElement("div", { ...blockProps, className: "cp-altcontent" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "edit" })), /* @__PURE__ */ wp.element.createElement(
        CP.EditItemsTable,
        {
          setAttributes,
          attributes,
          columns: [
            { type: "text", key: "copy", cond: states.hasMicroCopy },
            { type: "text", key: "text", cond: true },
            { type: "text", key: "caption", cond: states.hasCaption },
            { type: "text", key: "url", cond: true }
          ],
          isTemplate
        }
      )) : /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, AltMode && doLoop ? /* @__PURE__ */ wp.element.createElement("div", { className: "cp-altcontent" }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "welcome-comments" })), /* @__PURE__ */ wp.element.createElement(InnerBlocks, null)) : /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("ul", { ...blockProps }, [...Array(Math.max(items.length, loopCount)).keys()].map((i) => {
        const index = i % items.length;
        const item = items[index];
        return /* @__PURE__ */ wp.element.createElement(CP.Button.Edit, { tag: "li", className: item.classes, isItem: true, ...{ setAttributes, attributes, states }, itemKeys: ["items", index], keys: linkKeys.link, key: index });
      }))))));
    },
    save(props) {
      const { InnerBlocks } = wp.blockEditor;
      const { attributes } = props;
      const { items = [], classes, vars, doLoop } = attributes;
      const states = CP.classNamesToFlags(classes);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "wp-block-catpow" }, /* @__PURE__ */ wp.element.createElement("ul", { className: classes, style: vars }, items.map((item, index) => /* @__PURE__ */ wp.element.createElement(
        CP.Button,
        {
          tag: "li",
          className: item.classes,
          ...{ attributes, states },
          itemKeys: ["items", index],
          keys: blockConfig.linkKeys.link,
          ...CP.extractEventDispatcherAttributes("catpow/buttons", item),
          key: index
        }
      )))), doLoop && /* @__PURE__ */ wp.element.createElement("on-empty", null, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null)));
    }
  });
})();
