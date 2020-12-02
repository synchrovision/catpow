Catpow.Contents = function (props) {
	var _wp$element = wp.element,
	    useEffect = _wp$element.useEffect,
	    useRef = _wp$element.useRef;
	var _props$className = props.className,
	    className = _props$className === undefined ? 'contents' : _props$className,
	    deps = props.deps,
	    html = props.html;


	var ref = useRef({});

	useEffect(function () {
		ref.current.innerHTML = html;
		if (deps.styles) {
			deps.styles.filter(function (href) {
				for (var i = 0; i < document.styleSheets.length; i++) {
					if (document.styleSheets[i].href === href) {
						return false;
					}
				}
				return true;
			}).map(function (href) {
				var el = document.createElement('link');
				el.setAttribute('rel', 'stylesheet');
				el.setAttribute('href', href);
				document.head.appendChild(el);
			});
		}
		if (deps.scripts) {
			deps.scripts.filter(function (src) {
				for (var i = 0; i < document.scripts.length; i++) {
					if (document.scripts[i].src === src) {
						return false;
					}
				}
				return true;
			}).map(function (src) {
				var el = document.createElement('script');
				el.setAttribute('type', 'stylesheet');
				el.setAttribute('src', src);
				document.body.appendChild(el);
			});
		}
	}, [html, deps]);

	return wp.element.createElement('div', { className: className, ref: ref });
};
