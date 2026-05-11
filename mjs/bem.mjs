export const bem = (className) => {
	const children = {};
	const firstClass = className.split(" ")[0];
	return new Proxy(
		function () {
			if (arguments.length > 0) {
				const classes = [];
				let i;
				for (i = 0; i < arguments.length; i++) {
					if (!arguments[i]) {
						continue;
					}
					if (typeof arguments[i] === "string") {
						classes.push(arguments[i]);
						continue;
					}
					classes.push.apply(classes, Array.isArray(arguments[i]) ? arguments[i] : Object.keys(arguments[i]).filter((c) => arguments[i][c]));
				}
				if (classes.length > 0) {
					return (className + " " + classes.join(" ")).replace(" --", " " + firstClass + "--");
				}
			}
			return className;
		},
		{
			get: (target, prop) => {
				if (undefined === children[prop]) {
					children[prop] = bem(firstClass + (prop[0] === "_" ? "_" : "-") + prop);
				}
				return children[prop];
			},
		},
	);
};

export const applyBem = (el, { ...ctx } = {}) => {
	if (Array.isArray(el)) {
		el.forEach((el) => {
			applyBem(el, ctx);
		});
		return el;
	}
	if (!(el instanceof Element)) {
		return el;
	}
	let { className } = el;
	if (el instanceof SVGElement && className instanceof SVGAnimatedString) {
		className = className.baseVal;
	}
	if (className) {
		el.setAttribute(
			"class",
			className
				.split(" ")
				.map((className) => {
					if (className.slice(0, 2) === "--") {
						return ctx.element + className;
					}
					if (className[0] === "-") {
						return (ctx.block = ctx.element = ctx.block + className);
					}
					if (className[0] === "_") {
						return (ctx.element = ctx.element + (ctx.element === ctx.block ? "__" : "-") + className.slice(1));
					}
					if (className.slice(-1) === "-") {
						return (ctx.block = ctx.element = ctx.prefix + "-" + className.slice(0, -1));
					}
					if (className.slice(-1) === "_") {
						return (ctx.element = ctx.block + "__" + className.slice(0, -1));
					}
					return className;
				})
				.join(" "),
		);
		if (el.className === className) {
			const matches = className.match(/\b(([a-z]+)\-[a-z]+(\-[a-z]+)*)(__[a-z]+(\-[a-z]+)*)?\b/);
			if (!matches) {
				return el;
			}
			if (!matches[1].startsWith(ctx.prefix)) {
				ctx.prefix = matches[2];
			}
			ctx.block = matches[1];
			ctx.element = matches[0];
		}
	} else {
		el.setAttribute("class", (ctx.element = ctx.element + (ctx.element === ctx.block ? "__" : "-") + el.tagName.toLowerCase()));
	}
	for (let i = 0; i < el.children.length; i++) {
		applyBem(el.children[i], ctx);
	}
	return el;
};
