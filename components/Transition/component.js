(() => {
  // ../components/Transition/component.jsx
  Catpow.Transition = (props) => {
    const { useState, useCallback, useEffect, useRef } = wp.element;
    const { children, fitHeight = false } = props;
    const [contents, setContents] = useState(children);
    const [ready, setReady] = useState(false);
    const refContainer = useRef();
    const refPrev = useRef();
    const refCurrent = useRef();
    const [type, setType] = useState(props.type || "init");
    const getTransitionType = useCallback((prev, next) => {
      if (!prev.props || !next.props) {
        return "none";
      }
      const { depth = 1, page = 1, view = "normal" } = next.props;
      const { depth: prevDeps = 1, page: prevPage = 1, view: prevView = "normal" } = prev.props;
      if (depth !== prevDeps) {
        return depth > prevDeps ? "focus" : "blur";
      } else if (page !== prevPage) {
        return page > prevPage ? "next" : "prev";
      } else {
        return view !== prevView ? "mod" : "none";
      }
      return "none";
    }, []);
    useEffect(() => {
      const transitionType = getTransitionType(contents, children);
      if (transitionType === "none") {
        setContents(children);
        if (fitHeight) {
          setTimeout(() => {
            refContainer.current.style.height = refCurrent.current.clientHeight + "px";
          }, 1);
        }
      } else {
        setType(transitionType);
        setReady(true);
        setTimeout(() => {
          setContents(children);
          setTimeout(() => {
            if (fitHeight) {
              refContainer.current.style.height = refCurrent.current.clientHeight + "px";
            }
            setReady(false);
          }, 1);
        }, 1);
      }
      return () => {
        refPrev.current.innerHTML = refCurrent.current.innerHTML;
      };
    }, [children]);
    return /* @__PURE__ */ React.createElement("div", { className: `transition transition-${type}`, ref: refContainer }, /* @__PURE__ */ React.createElement("div", { className: "transition_prev transition_prev-" + (ready ? "from" : "to"), ref: refPrev }), /* @__PURE__ */ React.createElement("div", { className: "transition_current transition_current-" + (ready ? "from" : "to"), ref: refCurrent }, contents));
  };
})();
