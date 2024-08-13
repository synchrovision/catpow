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
        if (config) {
          updateResolvedPropsJson(attributes.props || config.defaultProps);
        }
      }, [attributes.props, config]);
      const updateResolvedPropsJson = useCallback((props) => {
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
      }, []);
      const resolvedProps = useMemo(() => {
        if (!resolvedPropsJson) {
          return null;
        }
        return JSON.parse(resolvedPropsJson);
      }, [resolvedPropsJson]);
      const onChangeHandle = useCallback((props) => {
        updateResolvedPropsJson(props);
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
      ), /* @__PURE__ */ wp.element.createElement("div", { className: attributes.classes }, /* @__PURE__ */ wp.element.createElement(Catpow.MegaMenu, { ...resolvedProps })), EditMode && /* @__PURE__ */ wp.element.createElement(
        Catpow.JsonEditor,
        {
          json: attributes.props,
          debug: false,
          schema: config.schema,
          onChange: onChangeHandle
        }
      ));
    },
    save({ attributes, className, setAttributes }) {
      return /* @__PURE__ */ wp.element.createElement("div", { className: attributes.classes });
    }
  });
})();
