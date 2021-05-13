Catpow.Spinner = function (props) {
	var _props$type = props.type,
	    type = _props$type === undefined ? 'circle' : _props$type;


	return wp.element.createElement(
		"div",
		{ className: "Spinner Spinner-" + type },
		wp.element.createElement(
			"div",
			{ className: "graphics" },
			wp.element.createElement("div", { className: "graphic graphic1" }),
			wp.element.createElement("div", { className: "graphic graphic2" }),
			wp.element.createElement("div", { className: "graphic graphic3" })
		)
	);
};
