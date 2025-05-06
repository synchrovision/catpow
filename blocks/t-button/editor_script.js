(() => {
  // react-global:react
  var react_default = window.wp.element;

  // modules/src/component/Bem.jsx
  var applyBem = (component, { ...ctx }) => {
    if (Array.isArray(component)) {
      component.forEach((child) => {
        applyBem(child, ctx);
      });
      return;
    }
    if (component == null || component.props == null) {
      return;
    }
    const {
      props: { className, children }
    } = component;
    if (className) {
      component.props.className = className.split(" ").map((className2) => {
        if (className2.slice(0, 2) === "--") {
          return ctx.element + className2;
        }
        if (className2[0] === "-") {
          return ctx.block = ctx.element = ctx.block + className2;
        }
        if (className2[0] === "_") {
          return ctx.element = ctx.element + (ctx.element === ctx.block ? "__" : "-") + className2.slice(1);
        }
        if (className2.slice(-1) === "-") {
          return ctx.block = ctx.element = ctx.prefix + "-" + className2.slice(0, -1);
        }
        if (className2.slice(-1) === "_") {
          return ctx.element = ctx.block + "__" + className2.slice(0, -1);
        }
        return className2;
      }).join(" ");
      if (component.props.className === className) {
        const matches = className.match(/\b(([a-z]+)\-[a-z]+(\-[a-z]+)*)(__[a-z]+(\-[a-z]+)*)?\b/);
        if (!matches) {
          return;
        }
        ctx.prefix = matches[2];
        ctx.block = matches[1];
        ctx.element = matches[0];
      }
    } else if (typeof component.type === "string") {
      component.props.className = ctx.element = ctx.element + (ctx.element === ctx.block ? "__" : "-") + component.type;
    } else {
      return;
    }
    if (children == null) {
      return;
    }
    if (Array.isArray(children)) {
      children.forEach((child) => {
        applyBem(child, ctx);
      });
    } else {
      applyBem(children, ctx);
    }
  };
  var Bem = ({ prefix = "cp", block, element, children }) => {
    const ctx = { prefix, block, element };
    applyBem(children, ctx);
    return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, children);
  };

  // react-global:react-dom
  var react_dom_default = window.wp.element;

  // modules/src/hooks/useAgent.jsx
  var { useMemo: useMemo2, useState, useCallback, useRef, useEffect, createContext, useContext } = react_default;
  var AgentContext = createContext();

  // ../blocks/t-button/editor_script.jsx
  var blockClassName = "wp-block-catpow-t-button";
  wp.blocks.registerBlockType("catpow/t-button", {
    title: "\u{1F43E} T-Button",
    description: "HTML\u30E1\u30FC\u30EB\u7528\u306E\u30C6\u30FC\u30D6\u30EB\u30EC\u30A4\u30A2\u30A6\u30C8\u306E\u30DC\u30BF\u30F3\u3067\u3059\u3002",
    icon: "editor-code",
    category: "catpow-mail",
    parent: ["catpow/t-body", "catpow/t-box", "catpow/t-loop"],
    attributes: {
      classes: { type: "string", default: "medium" },
      title: { source: "html", selector: "a", default: "Title" },
      url: { source: "attribute", selector: "a", attribute: "href", default: wpinfo.home_url }
    },
    example: CP.example,
    edit({ attributes, className, setAttributes }) {
      const { useState: useState2, useMemo: useMemo3 } = wp.element;
      const { InspectorControls, RichText } = wp.blockEditor;
      const { PanelBody, TextareaControl } = wp.components;
      const { classes, title } = attributes;
      var states = CP.wordsToFlags(classes);
      const selectiveClasses = useMemo3(() => {
        const selectiveClasses2 = ["color", { name: "size", type: "buttons", label: "\u30B5\u30A4\u30BA", values: ["large", "medium", "small"] }, { name: "url", input: "text", label: "URL", key: "url" }];
        wp.hooks.applyFilters("catpow.blocks.t-button.selectiveClasses", CP.finderProxy(selectiveClasses2));
        return selectiveClasses2;
      }, []);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(Bem, { block: blockClassName }, /* @__PURE__ */ wp.element.createElement("table", { className: "table_ " + classes, width: "100%" }, /* @__PURE__ */ wp.element.createElement("tbody", null, /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "spacer_", colspan: "3" })), /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "spacer_" }), /* @__PURE__ */ wp.element.createElement("td", { className: "button_" }, /* @__PURE__ */ wp.element.createElement("a", { className: "_link" }, /* @__PURE__ */ wp.element.createElement(
        RichText,
        {
          onChange: (title2) => {
            setAttributes({ title: title2 });
          },
          value: title
        }
      ))), /* @__PURE__ */ wp.element.createElement("td", { className: "spacer_" })), /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "spacer_", colspan: "3" }))))), /* @__PURE__ */ wp.element.createElement(InspectorControls, null, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", set: setAttributes, attr: attributes, selectiveClasses }), /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "CLASS", icon: "admin-generic", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: "\u30AF\u30E9\u30B9", onChange: (classes2) => setAttributes({ classes: classes2 }), value: classes }))));
    },
    save({ attributes, className, setAttributes }) {
      const { RichText } = wp.blockEditor;
      const { classes, title, url } = attributes;
      return /* @__PURE__ */ wp.element.createElement(Bem, { block: blockClassName }, /* @__PURE__ */ wp.element.createElement("table", { className: "table_ " + classes, width: "100%" }, /* @__PURE__ */ wp.element.createElement("tbody", null, /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "spacer_", colspan: "3" })), /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "spacer_" }), /* @__PURE__ */ wp.element.createElement("td", { className: "button_" }, /* @__PURE__ */ wp.element.createElement("a", { className: "_link", href: url }, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: title }))), /* @__PURE__ */ wp.element.createElement("td", { className: "spacer_" })), /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { className: "spacer_", colspan: "3" })))));
    }
  });
})();
