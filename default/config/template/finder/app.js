var app = function app(props) {
	var _Catpow = Catpow,
	    Finder = _Catpow.Finder;
	var SelectLayout = Finder.SelectLayout;

	return wp.element.createElement(
		Finder,
		props,
		wp.element.createElement(SelectLayout, null)
	);
};
