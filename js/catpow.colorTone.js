/* global console Catpow Reflect Proxy*/

Catpow.colorTone = {
	extractColorToneValue: (classes) => Catpow.colorTone.generateColorToneValue(Catpow.colorTone.extractColorToneValues(classes)),
	extractColorToneValues: (classes) => {
		if (!Array.isArray(classes)) {
			classes = classes.split(" ");
		}
		const rtn = {};
		classes.find((c) => {
			const matches = c.match(Catpow.colorTone.colorToneClassPattern);
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
	},
	parseColorToneValue: (value) => {
		if (value) {
			const matches = value.match(Catpow.colorTone.colorToneValuePattern);
			if (matches) {
				return { h: matches[1], s: matches[5], l: matches[7] };
			}
		}
		return { h: "0" };
	},
	colorToneValueToClasses: (value) => Catpow.colorTone.generateColorToneClasses(Catpow.colorTone.parseColorToneValue(value)),
	generateColorToneValue: (values) => (values.h || "0") + (values.s ? "s" + values.s : "") + (values.l ? "l" + values.l : ""),
	generateColorToneClasses: (values) => {
		const classes = [];
		if (values.h) {
			classes.push("color" + values.h);
		}
		if (values.s) {
			classes.push("tone-s" + values.s);
		}
		if (values.l) {
			classes.push("tone-l" + values.l);
		}
		return classes;
	},
	colorToneValuePattern: /^((|_|\-\-)(\-?\d+))?(s(\-?\d+))?(l(\-?\d+))?$/,
	colorToneClassPattern: /^(color((|_|\-\-)(\-?\d+)))|(tone\-((s|l)(\-?\d+)))$/,
	parseColorClass: (colorClass) => {
		if (colorClass) {
			const matches = colorClass.match(Catpow.colorTone.colorClassPattern);
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
	},
	generateColorClass: (data) => "color" + (data.fixed ? "--" : data.relative ? "_" : "") + data.value,
	colorClassPattern: /^color((|_|\-\-)(\-?\d+))$/,
	parseToneClass: (toneClass) => {
		if (toneClass) {
			const matches = toneClass.match(Catpow.colorTone.toneClassPattern);
			if (matches) {
				return {
					s: matches[2] === "s",
					l: matches[2] === "l",
					value: matches[3],
				};
			}
		}
		return { s: false, l: false, value: 0 };
	},
	generateToneClass: (data) => "tone-" + (data.s ? "s" : "l") + data.value,
	toneClassPattern: /^tone\-((s|l)(\-?\d+))$/,
	colorClassProxy: (state) => {
		if (typeof state === "string" || Array.isArray(state)) {
			state = Catpow.util.wordsToFlags(state);
		}
		return new Proxy(state, Catpow.colorTone.colorClassProxyHandler);
	},
	colorClassProxyHandler: {
		get(state, prop) {
			switch (prop) {
				case "classes": {
					return Catpow.util.flagsToWords(state);
				}
				case "value": {
					return Catpow.colorTone.extractColorToneValue(Object.keys(state).filter((c) => state[c]));
				}
				case "h": {
					return Object.keys(state).find((c) => Catpow.colorTone.colorClassPattern.test(c));
				}
				case "s":
				case "l": {
					return Object.keys(state).find((c) => {
						const match = c.match(Catpow.colorTone.toneClassPattern);
						return match && match[2] === prop;
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
						Catpow.util.filterFlags(state, (c) => !Catpow.colorTone.colorClassPattern.test(c));
					} else {
						Catpow.util.filterFlags(state, (c) => {
							const match = c.match(Catpow.colorTone.toneClassPattern);
							return !(match && match[2] === prop);
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
	},
};
