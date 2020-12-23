Catpow.FixedBG = function (props) {
	var _wp$element = wp.element,
	    useEffect = _wp$element.useEffect,
	    useRef = _wp$element.useRef;
	var _props$className = props.className,
	    className = _props$className === undefined ? 'FixedBG' : _props$className;


	var ref = useRef({});
	var bg = useRef({});

	useEffect(function () {
		var requestID;
		var update = function update() {
			var bnd = ref.current.parentNode.getBoundingClientRect();
			var winh = window.innerHeight;
			var t = Math.max(0, Math.min(bnd.top, winh));
			ref.current.style.top = t + 'px';
			ref.current.style.bottom = Math.max(0, winh - bnd.bottom) + 'px';
			bg.current.style.top = -t + 'px';
			requestID = window.requestAnimationFrame(update);
		};
		update();
		return function () {
			window.cancelAnimationFrame(requestID);
		};
	}, [props]);

	return wp.element.createElement(
		'div',
		{ className: 'FixedBG', ref: ref },
		wp.element.createElement(
			'div',
			{ className: 'FixedBG__contents', ref: bg },
			props.children
		)
	);
};
