(() => {
  // react-global:react
  var react_default = window.wp.element;

  // modules/src/component/Bem.jsx
  var applyBem = (component, { ...ctx }) => {
    const { props: { className, children } } = component;
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
        const matches = className.match(/\b((\w+)\-\w+(\-\w+)*)(__\w+(\-\w+)*)?\b/);
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
    if (Array.isArray(children)) {
      children.forEach((child) => {
        applyBem(child, ctx);
      });
    } else {
      applyBem(children, ctx);
    }
    return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, children);
  };

  // react-global:react-dom
  var react_dom_default = window.wp.element;

  // modules/src/hooks/useAgent.jsx
  var { useMemo: useMemo2, useState, useCallback, useRef, useEffect, createContext, useContext } = react_default;
  var AgentContext = createContext();

  // ../components/Bem/component.jsx
  Catpow.Bem = Bem;
})();
