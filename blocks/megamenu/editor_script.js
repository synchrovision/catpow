(() => {
  // ../blocks/megamenu/editor_script.jsx
  wp.blocks.registerBlockType("catpow/megamenu", {
    title: "\u{1F43E} MegaMenu",
    icon: "clock",
    category: "catpow-embed",
    example: CP.example,
    supports: {
      customClassName: false
    },
    edit({ attributes, setAttributes, className }) {
      const { useState, useCallback, useMemo, useEffect } = wp.element;
      const { InspectorControls } = wp.blockEditor;
      const { config, resolvedPropsJson = null, EditMode = false } = attributes;
      useEffect(() => {
        wp.apiFetch({
          path: "/cp/v1/blocks/config/megamenu/config"
        }).then((res) => {
          setAttributes({ config: res });
        }).catch((e) => {
          console.error(e);
        });
      }, []);
      useEffect(() => {
        if (!config) {
          return;
        }
        const props2 = attributes.props || config.defaultProps;
        if (props2) {
          wp.apiFetch({
            path: "/cp/v1/blocks/config/megamenu/resolve",
            method: "POST",
            data: { props: props2 }
          }).then((res) => {
            setAttributes({ resolvedPropsJson: res.props });
          }).catch((e) => {
            console.error(e);
          });
        }
      }, [attributes.props, config]);
      const props = useMemo(() => {
        if (!resolvedPropsJson) {
          return null;
        }
        return JSON.parse(resolvedPropsJson);
      }, [resolvedPropsJson]);
      const getAdditionalInputComponent = useCallback((schema) => {
        if (schema.hasOwnProperty("@type")) {
          switch (schema["@type"]) {
            case "MenuItemAction":
              return (props2) => {
              };
          }
        }
        return null;
      }, []);
      const onChangeHandle = useCallback((props2) => {
        setAttributes({ props: props2 });
      }, []);
      if (!config || !props) {
        return /* @__PURE__ */ wp.element.createElement(Catpow.Spinner, null);
      }
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(
        CP.SelectModeToolbar,
        {
          set: setAttributes,
          attr: attributes
        }
      ), EditMode ? /* @__PURE__ */ wp.element.createElement(Catpow.JsonEditor, { json: props, debug: true, schema: config.schema, onChange: onChangeHandle }) : /* @__PURE__ */ wp.element.createElement("div", { className: attributes.classes }, /* @__PURE__ */ wp.element.createElement(Catpow.MegaMenu, { ...props })));
    },
    save({ attributes, className, setAttributes }) {
      return /* @__PURE__ */ wp.element.createElement("div", { className: attributes.classes });
    }
  });
})();
