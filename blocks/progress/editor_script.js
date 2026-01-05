(() => {
  // ../blocks/progress/editor_script.jsx
  wp.blocks.registerBlockType("catpow/progress", {
    title: "\u{1F43E} Progress",
    description: "\u9032\u6357\u306E\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002",
    icon: "editor-ul",
    category: "catpow",
    example: CP.example,
    edit({ attributes, className, setAttributes, isSelected }) {
      const { Fragment, useMemo, useCallback, useEffect } = wp.element;
      const { InspectorControls, RichText } = wp.blockEditor;
      const { Flex, FlexItem, FlexBlock, PanelBody, Button, Spinner, SelectControl, CheckboxControl, TextControl } = wp.components;
      const { post, settings, selections, activeLabel, progress, isWaiting = false } = attributes;
      const selectiveClasses = useMemo(
        () => [
          { input: "select", key: "post", values: selections },
          { input: "range", key: "step", min: 0, max: settings ? settings.items.length - 1 : 0 }
        ],
        [selections, settings]
      );
      const settingsSelectiveClasses = useMemo(
        () => [
          { type: "buttons", label: "\u30B5\u30A4\u30BA", values: ["small", "medium", "large"] },
          {
            label: "\u756A\u53F7",
            values: "hasCounter",
            sub: [
              { input: "text", label: "\u756A\u53F7\u524D\u30C6\u30AD\u30B9\u30C8", key: "countPrefix" },
              { input: "text", label: "\u756A\u53F7\u5F8C\u30C6\u30AD\u30B9\u30C8", key: "countSuffix" }
            ]
          }
        ],
        []
      );
      const sizeSettings = useMemo(() => CP.parseSelections(["small", "medium", "large"]), []);
      const setSettings = useCallback(
        (args) => {
          const { currentItemIndex, ...otherArgs } = args;
          if (currentItemIndex !== void 0) {
            setAttributes({ currentItemIndex });
          }
          setAttributes({ settings: { ...settings, ...otherArgs } });
        },
        [setAttributes, attributes]
      );
      const registerSettings = useCallback(() => {
        const post_id = wp.data.select("core/editor").getCurrentPostId();
        setAttributes({ isWaiting: true });
        wp.apiFetch({ path: "/cp/v1/blocks/config/progress/settings/register", method: "post", data: { post_id, settings } }).then((res) => {
          setAttributes({ post: res.post, selections: false, isWaiting: false });
        });
      }, [settings]);
      const updateSettings = useCallback(() => {
        setAttributes({ isWaiting: true });
        wp.apiFetch({ path: "/cp/v1/blocks/config/progress/settings/update", method: "post", data: { post, settings } }).then((res) => {
          setAttributes({ isWaiting: false });
        });
      }, [post, settings]);
      const deleteSettings = useCallback(() => {
        setAttributes({ isWaiting: true });
        wp.apiFetch({ path: "/cp/v1/blocks/config/progress/settings/delete", method: "post", data: { post } }).then(() => {
          setAttributes({ post: "default", settings: false, selections: false, isWaiting: false });
        });
      }, [post]);
      const Items = useCallback(
        (props) => {
          const { countPrefix, countSuffix } = settings;
          const states2 = CP.classNamesToFlags(settings.classes);
          return settings.items.map((item, index) => /* @__PURE__ */ wp.element.createElement(
            "li",
            {
              className: "item " + (index == attributes.step ? "active" : ""),
              onClick: (e) => {
                setAttributes({ step: index });
              },
              key: index
            },
            states2.hasCounter && /* @__PURE__ */ wp.element.createElement("div", { className: "counter" }, countPrefix && /* @__PURE__ */ wp.element.createElement("span", { className: "prefix" }, countPrefix), /* @__PURE__ */ wp.element.createElement("span", { className: "number" }, index + 1), countSuffix && /* @__PURE__ */ wp.element.createElement("span", { className: "suffix" }, countSuffix)),
            /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(
              RichText,
              {
                onChange: (label) => {
                  item.label = label;
                  setSettings(settings);
                },
                value: item.label
              }
            ))
          ));
        },
        [setAttributes, attributes, setSettings, settings, isSelected]
      );
      if (!settings) {
        wp.apiFetch({ path: "/cp/v1/blocks/config/progress/settings", method: "post", data: { post } }).then((settings2) => {
          setAttributes({ settings: settings2 });
        });
      }
      if (!selections) {
        wp.apiFetch({ path: "/cp/v1/blocks/config/progress/settings/selections" }).then((selections2) => {
          setAttributes({ selections: selections2 });
        });
      }
      const CenterSpinner = useCallback(
        (props) => /* @__PURE__ */ wp.element.createElement(Flex, { justify: "center" }, /* @__PURE__ */ wp.element.createElement(FlexItem, null, /* @__PURE__ */ wp.element.createElement(Spinner, null))),
        []
      );
      useEffect(() => {
        setAttributes({ settings: false });
      }, [post]);
      const states = settings && settings.classes ? CP.classNamesToFlags(settings.classes) : {};
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", initialOpen: true, icon: "admin-generic", set: setAttributes, attr: attributes, selectiveClasses }), settings ? /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u8A2D\u5B9A", initialOpen: false, icon: "admin-generic", set: setSettings, attr: settings, selectiveClasses: settingsSelectiveClasses }, /* @__PURE__ */ wp.element.createElement(CP.EditItemsTable, { set: setSettings, attr: settings, columns: [{ type: "text", key: "label" }] }), !isWaiting ? /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(Flex, { justify: "center" }, /* @__PURE__ */ wp.element.createElement(FlexItem, null, /* @__PURE__ */ wp.element.createElement(Button, { isPrimary: true, onClick: updateSettings }, "\u8A2D\u5B9A\u3092\u66F4\u65B0"))), /* @__PURE__ */ wp.element.createElement(Flex, { justify: "center" }, /* @__PURE__ */ wp.element.createElement(FlexItem, null, /* @__PURE__ */ wp.element.createElement(Button, { isLink: true, onClick: registerSettings }, "\u767B\u9332"), "\uFF5C", /* @__PURE__ */ wp.element.createElement(Button, { isLink: true, isDestructive: true, onClick: deleteSettings }, "\u524A\u9664")))) : /* @__PURE__ */ wp.element.createElement(CenterSpinner, null)) : /* @__PURE__ */ wp.element.createElement(CenterSpinner, null), /* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)), /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, settings ? /* @__PURE__ */ wp.element.createElement("div", { className: "wp-block-catpow-progress " + settings.classes }, /* @__PURE__ */ wp.element.createElement("ul", { className: "items" }, /* @__PURE__ */ wp.element.createElement(Items, null))) : /* @__PURE__ */ wp.element.createElement(CenterSpinner, null)));
    },
    save({ attributes, className }) {
      return false;
    }
  });
})();
