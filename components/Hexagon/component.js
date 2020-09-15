Catpow.Hexagon = function (props) {
	var children = props.children,
	    id = props.id,
	    src = props.src,
	    imageBounds = props.imageBounds,
	    handler = props.handler,
	    otherProps = babelHelpers.objectWithoutProperties(props, ["children", "id", "src", "imageBounds", "handler"]);


	var hexagon = void 0;
	if (src) {
		imageBounds = imageBounds || [-30, 0, 160, 120];
		hexagon = wp.element.createElement(
			"svg",
			{ className: "Hexagon", viewBox: "0 0 100 120" },
			wp.element.createElement(
				"clipPath",
				{ id: id + '_clip' },
				wp.element.createElement("polygon", { points: "0,30 0,90 50,120 100,90 100,30 50,0" })
			),
			wp.element.createElement(
				"g",
				{ "clip-path": "url(#" + id + "_clip)" },
				wp.element.createElement("image", { x: imageBounds[0], y: imageBounds[1], width: imageBounds[2], height: imageBounds[3], href: src })
			)
		);
	} else {
		hexagon = wp.element.createElement(
			"svg",
			{ className: "Hexagon", viewBox: "0 0 100 120" },
			wp.element.createElement("polygon", { points: "0,30 0,90 50,120 100,90 100,30 50,0" })
		);
	}
	return wp.element.createElement(
		"div",
		babelHelpers.extends({ id: id }, otherProps),
		hexagon,
		children && wp.element.createElement(
			"div",
			{ className: "contents" },
			children
		),
		handler && wp.element.createElement(
			"div",
			{ className: "handlers" },
			handler
		)
	);
};
