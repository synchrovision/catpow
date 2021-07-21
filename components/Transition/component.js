Catpow.Transition = function (props) {
  var _wp$element = wp.element,
      useState = _wp$element.useState,
      useCallback = _wp$element.useCallback,
      useEffect = _wp$element.useEffect,
      useRef = _wp$element.useRef;
  var children = props.children,
      _props$fitHeight = props.fitHeight,
      fitHeight = _props$fitHeight === void 0 ? false : _props$fitHeight;

  var _useState = useState(children),
      _useState2 = babelHelpers.slicedToArray(_useState, 2),
      contents = _useState2[0],
      setContents = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = babelHelpers.slicedToArray(_useState3, 2),
      ready = _useState4[0],
      setReady = _useState4[1];

  var refContainer = useRef();
  var refPrev = useRef();
  var refCurrent = useRef();

  var _useState5 = useState(props.type || 'init'),
      _useState6 = babelHelpers.slicedToArray(_useState5, 2),
      type = _useState6[0],
      setType = _useState6[1];

  var getTransitionType = useCallback(function (prev, next) {
    if (!prev.props || !next.props) {
      return 'none';
    }

    var _next$props = next.props,
        _next$props$depth = _next$props.depth,
        depth = _next$props$depth === void 0 ? 1 : _next$props$depth,
        _next$props$page = _next$props.page,
        page = _next$props$page === void 0 ? 1 : _next$props$page,
        _next$props$view = _next$props.view,
        view = _next$props$view === void 0 ? 'normal' : _next$props$view;
    var _prev$props = prev.props,
        _prev$props$depth = _prev$props.depth,
        prevDeps = _prev$props$depth === void 0 ? 1 : _prev$props$depth,
        _prev$props$page = _prev$props.page,
        prevPage = _prev$props$page === void 0 ? 1 : _prev$props$page,
        _prev$props$view = _prev$props.view,
        prevView = _prev$props$view === void 0 ? 'normal' : _prev$props$view;

    if (depth !== prevDeps) {
      return depth > prevDeps ? 'focus' : 'blur';
    } else if (page !== prevPage) {
      return page > prevPage ? 'next' : 'prev';
    } else {
      return view !== prevView ? 'mod' : 'none';
    }

    return 'none';
  }, []);
  useEffect(function () {
    var transitionType = getTransitionType(contents, children);

    if (transitionType === 'none') {
      setContents(children);

      if (fitHeight) {
        setTimeout(function () {
          refContainer.current.style.height = refCurrent.current.clientHeight + 'px';
        }, 1);
      }
    } else {
      setType(transitionType);
      setReady(true);
      setTimeout(function () {
        setContents(children);
        setTimeout(function () {
          if (fitHeight) {
            refContainer.current.style.height = refCurrent.current.clientHeight + 'px';
          }

          setReady(false);
        }, 1);
      }, 1);
    }

    return function () {
      refPrev.current.innerHTML = refCurrent.current.innerHTML;
    };
  }, [children]);
  return wp.element.createElement("div", {
    className: "transition transition-".concat(type),
    ref: refContainer
  }, wp.element.createElement("div", {
    className: "transition_prev transition_prev-" + (ready ? "from" : "to"),
    ref: refPrev
  }), wp.element.createElement("div", {
    className: "transition_current transition_current-" + (ready ? "from" : "to"),
    ref: refCurrent
  }, contents));
};
