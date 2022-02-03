Catpow.External = function (props) {
  var children = props.children,
      trace = props.trace;
  var _wp$element = wp.element,
      render = _wp$element.render,
      useState = _wp$element.useState,
      useMemo = _wp$element.useMemo,
      useCallback = _wp$element.useCallback,
      useEffect = _wp$element.useEffect,
      useRef = _wp$element.useRef,
      createPortal = _wp$element.createPortal;
  var ref = useRef({
    contents: false,
    setContents: function setContents() {}
  });
  var el = useMemo(function () {
    if (props.id) {
      var exEl = document.getElementById(props.id);

      if (exEl) {
        return exEl;
      }
    }

    var el = document.createElement('div');

    if (props.id) {
      el.id = props.id;
    }

    el.className = props.className;
    document.body.appendChild(el);
    return el;
  }, []);

  if (trace) {
    useEffect(function () {
      el.style.position = 'absolute';
      var timer = setInterval(function () {
        if (trace.getBoundingClientRect) {
          var bnd = trace.getBoundingClientRect();
          el.style.left = window.scrollX + bnd.left + 'px';
          el.style.top = window.scrollY + bnd.top + 'px';
          el.style.width = bnd.width + 'px';
          el.style.height = bnd.height + 'px';
        }
      }, 50);
      return function () {
        return clearInterval(timer);
      };
    }, [trace]);
  }

  return createPortal(children, el);
};
