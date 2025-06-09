import { kebabToCamel, camelToKebab } from "catpow/util";

export const parseStyleString = (css) => {
	if (css instanceof Object) {
		return css;
	}
	if (!css) {
		return {};
	}
	var obj = {};
	css
		.replace("&amp;", "&")
		.split(";")
		.forEach((pair) => {
			const match = pair.match(/^((\-\-)?([^:]+?)):(.+)$/);
			if (!match) {
				return;
			}
			obj[match[2] ? match[1] : kebabToCamel(match[3])] = match[4];
		});
	return obj;
};
export const createStyleString = (data) => {
	if (!data) {
		return "";
	}
	return Object.keys(data)
		.map((key) => {
			return camelToKebab(key) + ":" + data[key] + ";";
		})
		.join("");
};
export const parseStyleCode = (code) => {
	let rtn = {};
	for (const match of code.matchAll(/(\S.+?){([^}]+)}/g)) {
		rtn[match[1]] = parseStyleString(match[2]);
	}
	return rtn;
};
export const createStyleCode = (data) => {
	if (!data) {
		return "";
	}
	return Object.keys(data)
		.map((sel) => {
			return sel + "{" + createStyleString(data[sel]) + "}";
		})
		.join("");
};
export const parseStyleCodeWithMediaQuery = (code) => {
	if (!code) {
		return {};
	}
	var rtn = {};
	const reg = /@media\s*\((.+?)\)\s*{([^}]+})\s*}/;
	const defaultCode = code.replace(new RegExp(reg, "g"), (str) => {
		const matches = str.match(reg);
		rtn[matches[1]] = parseStyleCode(matches[2]);
		return "";
	});
	rtn["default"] = parseStyleCode(defaultCode);
	return rtn;
};
export const createStyleCodeWithMediaQuery = (data) => {
	var rtn = "";
	return Object.keys(data)
		.map((media) => {
			if (media === "default") {
				return { p: -10000, media };
			}
			const matches = media.match(/(min|max)\-width:(\d+)px/);
			return { p: parseInt(matches[2]) * { min: 1, max: -1 }[matches[1]], media };
		})
		.sort((a, b) => a.p - b.p)
		.map((d) => d.media)
		.map((media) => {
			if (media === "default") {
				return createStyleCode(data[media]);
			}
			return "@media(" + media + "){" + createStyleCode(data[media]) + "}";
		})
		.join("");
};

export const createGridStyleCode = (sel, bnd) => {
	return sel + "{" + createStyleString(CP.createGridStyleCodeData(bnd)) + "}";
};
export const createGridStyleCodeData = (bnd) => {
	var rtn = {
		display: "grid",
		" display": "-ms-grid",
		"-ms-grid-columns": "1fr ".repeat(bnd[0]),
		"grid-template-columns": "repeat(" + bnd[0] + ",1fr)",
		"-ms-grid-rows": "1fr ".repeat(bnd[1]),
		"grid-template-rows": "repeat(" + bnd[1] + ",1fr)",
	};
	return rtn;
};
export const createGridItemStyleCode = (sel, bnd) => {
	return sel + "{" + createStyleString(CP.createGridItemStyleCodeData(bnd)) + "}";
};
export const createGridItemStyleCodeData = (bnd) => {
	var rtn = {
		"-ms-grid-column": bnd[0],
		"-ms-grid-row": bnd[1],
		"grid-column": bnd[0],
		"grid-row": bnd[1],
	};
	if (bnd[2] && bnd[2] > 1) {
		rtn["grid-column"] += " / span " + bnd[2];
		rtn["-ms-grid-column-span"] = bnd[2];
	}
	if (bnd[3] && bnd[3] > 1) {
		rtn["grid-row"] += " / span " + bnd[3];
		rtn["-ms-grid-row-span"] = bnd[3];
	}
	return rtn;
};

export const getUrlInStyleCode = (code) => {
	if (!code || code.indexOf("url(") === -1) {
		return false;
	}
	const m = code.match(/url\((.+?)\)/);
	return m ? m[1] : "";
};

export const parseGradientStyleValue = (gradient) => {
	const match = gradient.match(/^(linear|radial)\-gradient\((\d+deg),(.+)\)$/);
	return {
		type: match[1],
		angle: match[2],
		colors: match[3].match(/rgba?\([\d,]+?\) \d+%/g).map((color) => {
			const match = color.match(/((rgba?)\((\d+),(\d+),(\d+)(,(\d+))?\)) (\d+%)/);
			return {
				color: match[1],
				type: match[2],
				r: match[3],
				g: match[4],
				b: match[5],
				a: match[7] === undefined ? 1 : match[7],
				position: match[8],
			};
		}),
	};
};

export const translateCssVal = (type, val) => {
	switch (type) {
		case "background-size":
			switch (val) {
				case "c":
					return "cover";
				case "i":
					return "contain";
				case "f":
					return "100% 100%";
				default:
					return val;
			}
		case "background-repeat":
			switch (val) {
				case "n":
					return "no-repeat";
				case "x":
				case "y":
					return "repeat-" + val;
				default:
					return val;
			}
	}
};

export const useManageStyleData = (props, csss) => {
	const { attributes, className, setAttributes } = props;
	const { anchor, prevAnchor, styleDatas } = attributes;
	const { useEffect } = wp.element;

	useEffect(() => {
		if (!anchor) {
			setAttributes({ anchor: "s" + new Date().getTime().toString(16) });
		}
		if (undefined === styleDatas) {
			const styleDatas = {};
			csss.forEach((key) => {
				styleDatas[key] = CP.parseStyleCodeWithMediaQuery(attributes[key]);
			});
			setAttributes({ styleDatas });
		}
	}, []);
	useEffect(() => {
		if (anchor && anchor.length > 2) {
			if (document.querySelectorAll("#" + anchor).length > 1) {
				setAttributes({ anchor: "s" + new Date().getTime().toString(16) });
			}
			const atts = {};
			atts.prevAnchor = anchor;
			atts.styleDatas = {};
			csss.forEach((key) => {
				if (!attributes[key]) {
					return;
				}
				atts[key] = attributes[key].replace("#" + prevAnchor, "#" + anchor);
				atts.styleDatas[key] = CP.parseStyleCodeWithMediaQuery(atts[key]);
			});
			setAttributes(atts);
		}
	}, [anchor]);
};
