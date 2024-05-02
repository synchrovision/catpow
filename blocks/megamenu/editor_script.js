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
        const props = attributes.props || config.defaultProps;
        if (props) {
          wp.apiFetch({
            path: "/cp/v1/blocks/config/megamenu/resolve",
            method: "POST",
            data: { props }
          }).then((res) => {
            setAttributes({ resolvedPropsJson: res.props });
          }).catch((e) => {
            console.error(e);
          });
        }
      }, [attributes.props, config]);
      const resolvedProps = useMemo(() => {
        if (!resolvedPropsJson) {
          return null;
        }
        return JSON.parse(resolvedPropsJson);
      }, [resolvedPropsJson]);
      const getAdditionalInputComponent = useCallback((schema) => {
        if (schema.hasOwnProperty("@type")) {
          switch (schema["@type"]) {
            case "MenuItemAction":
              return (props) => {
              };
          }
        }
        return null;
      }, []);
      const onChangeHandle = useCallback((props) => {
        setAttributes({ props });
      }, []);
      if (!config || !resolvedProps) {
        return /* @__PURE__ */ wp.element.createElement(Catpow.Spinner, null);
      }
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(
        CP.SelectModeToolbar,
        {
          set: setAttributes,
          attr: attributes
        }
      ), EditMode ? /* @__PURE__ */ wp.element.createElement(
        Catpow.JsonEditor,
        {
          json: attributes.props,
          debug: true,
          schema: config.schema,
          onChange: onChangeHandle
        }
      ) : /* @__PURE__ */ wp.element.createElement("div", { className: attributes.classes }, /* @__PURE__ */ wp.element.createElement(Catpow.MegaMenu, { ...resolvedProps })));
    },
    save({ attributes, className, setAttributes }) {
      return /* @__PURE__ */ wp.element.createElement("div", { className: attributes.classes });
    }
  });
})();
