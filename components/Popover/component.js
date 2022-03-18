Catpow.Popover = function (props) {
  var children = props.children,
      open = props.open,
      onClose = props.onClose,
      closeButton = props.closeButton;
  var _wp$element = wp.element,
      Fragment = _wp$element.Fragment,
      useEffect = _wp$element.useEffect,
      useState = _wp$element.useState,
      useRef = _wp$element.useRef;

  var _useState = useState('closed'),
      _useState2 = babelHelpers.slicedToArray(_useState, 2),
      state = _useState2[0],
      setPopoverState = _useState2[1];

  var _useState3 = useState(''),
      _useState4 = babelHelpers.slicedToArray(_useState3, 2),
      position = _useState4[0],
      setPosition = _useState4[1];

  useEffect(function () {
    return setPopoverState(open ? 'open' : state === 'closed' ? 'closed' : 'close');
  }, [open]);
  var ref = useRef({});
  useEffect(function () {
    if (ref.current.getBoundingClientRect && open) {
      var bnd = ref.current.getBoundingClientRect();
      var x = bnd.left + bnd.width / 2;
      var ux = window.innerWidth / 8,
          cy = window.innerHeight / 2;
      var classes = '';

      if (bnd.bottom < cy) {
        classes += 'bottom';
      } else {
        classes += 'top';
      }

      if (x < ux * 3) {
        classes += ' right';
      } else if (x > ux * 5) {
        classes += ' left';
      } else {
        classes += ' center';
      }

      setPosition(classes);
    }
  }, [ref, open]);
  return wp.element.createElement(Fragment, null, wp.element.createElement("div", {
    className: "PopoverAnchor",
    ref: ref
  }), wp.element.createElement(Catpow.External, {
    className: "PopoverContainer",
    trace: ref.current
  }, wp.element.createElement("div", {
    className: "Popover ".concat(state, " ").concat(position),
    onAnimationEnd: function onAnimationEnd() {
      if (state === 'close') {
        setPopoverState('closed');
      }
    }
  }, wp.element.createElement("div", {
    class: "PopoverBody"
  }, wp.element.createElement("div", {
    class: "PopoverArrow"
  }), wp.element.createElement("div", {
    className: "PopoverContents"
  }, children), closeButton && wp.element.createElement("div", {
    className: "PopoverControl"
  }, wp.element.createElement("div", {
    className: "close",
    onClick: onClose
  }))))));
};
