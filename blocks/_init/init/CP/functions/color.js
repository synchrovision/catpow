export const useInheritColor = (props, images) => {
	const { attributes, className, setAttributes, context } = props;
	const { setURLparams } = Catpow.util;
	const { classes, color = "0" } = attributes;
	const { useEffect, useMemo } = wp.element;
	const inheritColor = useMemo(() => {
		return color === "0" || context["catpow/color"] === color;
	}, [color, context["catpow/color"]]);
	useEffect(() => {
		if (inheritColor && context["catpow/color"] !== "0") {
			setAttributes({ color: context["catpow/color"] });
		}
		setAttributes({ inheritColor: color === context["catpow/color"] });
	}, [context["catpow/color"]]);
	useEffect(() => {
		const atts = {
			classes: classes
				.split(" ")
				.filter((str) => !colorToneClassPattern.test(str))
				.concat(colorToneValueToClasses(color))
				.join(" "),
		};
		images.forEach((key) => {
			if (!attributes[key]) {
				return;
			}
			if (attributes[key].indexOf("url(") !== -1) {
				atts[key] = attributes[key].replace(/url\((.+?)\)/, (m, p1) => "url(" + setURLparams(p1, { c: color, theme: wpinfo.theme }) + ")");
				return;
			}
			atts[key] = setURLparams(attributes[key], { c: color, theme: wpinfo.theme });
		});
		setAttributes(atts);
	}, [color]);
};
export const extractColorToneValue = (classes) => generateColorToneValue(extractColorToneValues(classes));
export const extractColorToneValues = (classes) => {
	if (!Array.isArray(classes)) {
		classes = classes.split(" ");
	}
	const rtn = {};
	classes.find((c) => {
		const matches = c.match(colorToneClassPattern);
		if (matches) {
			if (matches[1]) {
				rtn.h = matches[2];
			}
			if (matches[5]) {
				rtn[matches[7]] = matches[8];
			}
			return rtn.hasOwnProperty("h") && rtn.hasOwnProperty("s") && rtn.hasOwnProperty("l");
		}
		return false;
	});
	return rtn;
};
export const parseColorToneValue = (value) => {
	if (value) {
		const matches = value.match(colorToneValuePattern);
		if (matches) {
			return { h: matches[1], s: matches[5], l: matches[7] };
		}
	}
	return { h: "0" };
};
export const colorToneValueToClasses = (value) => generateColorToneClasses(parseColorToneValue(value));
export const generateColorToneValue = (values) => (values.h || "0") + (values.s ? "s" + values.s : "") + (values.l ? "l" + values.l : "");
export const generateColorToneClasses = (values) => {
	const classes = [];
	if (values.h) {
		classes.push("has-color" + values.h);
	}
	if (values.s) {
		classes.push("has-tone-s" + values.s);
	}
	if (values.l) {
		classes.push("has-tone-l" + values.l);
	}
	return classes;
};
export const colorToneValuePattern = /^((|_|\-\-)(\-?\d+))?(s(\-?\d+))?(l(\-?\d+))?$/;
export const colorToneClassPattern = /^(has\-color((|_|\-\-)(\-?\d+)))|(tone\-((s|l)(\-?\d+)))$/;
export const parseColorClass = (colorClass) => {
	if (colorClass) {
		const matches = colorClass.match(colorClassPattern);
		if (matches) {
			return {
				fixed: matches[2] === "--",
				absolute: matches[2] === "",
				relative: matches[2] === "_",
				value: matches[3],
			};
		}
	}
	return { fixed: false, absolute: false, relative: false, value: 0 };
};
export const generateColorClass = (data) => "has-color" + (data.fixed ? "--" : data.relative ? "_" : "") + data.value;
export const colorClassPattern = /^has\-color((|_|\-\-)(\-?\d+))$/;
export const colorStatePattern = /^hasColor(_?(\-*\d+))$/;
export const parseToneClass = (toneClass) => {
	if (toneClass) {
		const matches = toneClass.match(toneClassPattern);
		if (matches) {
			return {
				s: matches[2] === "s",
				l: matches[2] === "l",
				value: matches[3],
			};
		}
	}
	return { s: false, l: false, value: 0 };
};
export const generateToneClass = (data) => "has-tone-" + (data.s ? "s" : "l") + data.value;
export const toneClassPattern = /^has\-tone\-((s|l)(\-?\d+))$/;
export const toneStatePattern = /^hasTone((S|L)(\-*\d+))$/;
export const colorClassProxy = (state) => {
	if (!state) {
		state = {};
	}
	if (typeof state === "string" || Array.isArray(state)) {
		state = CP.wordsToFlags(state);
	}
	return new Proxy(state, colorClassProxyHandler);
};
export const colorClassProxyHandler = {
	get(state, prop) {
		switch (prop) {
			case "classes": {
				return CP.flagsToWords(state);
			}
			case "value": {
				return extractColorToneValue(Object.keys(state).filter((c) => state[c]));
			}
			case "h": {
				return Object.keys(state).find((c) => colorStatePattern.test(c));
			}
			case "s":
			case "l": {
				const r = prop.toUpperCase();
				return Object.keys(state).find((c) => {
					const match = c.match(toneStatePattern);
					return match && match[2] === r;
				});
			}
		}
		return Reflect.get(...arguments);
	},
	set(state, prop, val) {
		switch (prop) {
			case "state": {
				return state;
			}
			case "h":
			case "s":
			case "l": {
				if (prop === "h") {
					CP.filterFlags(state, (c) => !colorStatePattern.test(c));
				} else {
					const r = prop.toUpperCase();
					CP.filterFlags(state, (c) => {
						const match = c.match(toneStatePattern);
						return !(match && match[2] === r);
					});
				}
				if (val) {
					state[val] = true;
				}
				return;
			}
		}
		return Reflect.set(...arguments);
	},
};
