Catpow.External = function (props) {
	var children = props.children,
	    trace = props.trace;
	var _wp$element = wp.element,
	    render = _wp$element.render,
	    useState = _wp$element.useState,
	    useMemo = _wp$element.useMemo,
	    useCallback = _wp$element.useCallback,
	    useEffect = _wp$element.useEffect,
	    useRef = _wp$element.useRef;


	var ref = useRef({ contents: false, setContents: function setContents() {} });

	var el = useMemo(function () {
		var el = document.createElement('div');
		el.className = props.className;
		document.body.appendChild(el);
		return el;
	}, []);

	var ExternalContents = useCallback(function (props) {
		var _useState = useState(children);

		var _useState2 = babelHelpers.slicedToArray(_useState, 2);

		ref.current.contents = _useState2[0];
		ref.current.setContents = _useState2[1];

		return ref.current.contents;
	}, []);

	useEffect(function () {
		render(wp.element.createElement(ExternalContents, null), el);
		return function () {
			return el.remove();
		};
	}, []);
	useEffect(function () {
		ref.current.setContents(children);
	}, [children]);

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

	return false;
};
