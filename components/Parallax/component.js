Catpow.Parallax = function (props) {
	var _wp$element = wp.element,
	    useEffect = _wp$element.useEffect,
	    useRef = _wp$element.useRef;
	var _props$className = props.className,
	    className = _props$className === undefined ? 'Parallax' : _props$className;


	var ref = useRef({});
	var bg = useRef({});

	useEffect(function () {
		var requestID;
		var update = function update() {
			requestID = window.requestAnimationFrame(update);
			var winh = window.innerHeight;
			var bnd = ref.current.getBoundingClientRect();
			var tgth = bnd.height;
			if (bnd.top > winh || bnd.top + tgth < 0) {
				return;
			}
			var p1 = bnd.top / (winh - tgth);
			var p2 = (bnd.top + tgth) / (winh + tgth);
			var chlh = bg.current.getBoundingClientRect().height;
			if (tgth > chlh ^ chlh > winh) {
				bg.current.style.transform = 'translate3d(0,' + (tgth - (tgth + chlh) * p2) + 'px,0)';
			} else {
				bg.current.style.transform = 'translate3d(0,' + (tgth - chlh) * p1 + 'px,0)';
			}
		};
		update();
		return function () {
			window.cancelAnimationFrame(requestID);
		};
	}, [props]);

	return wp.element.createElement(
		'div',
		{ className: 'Parallax', ref: ref },
		wp.element.createElement(
			'div',
			{ className: 'Parallax__contents', ref: bg },
			props.children
		)
	);
};
