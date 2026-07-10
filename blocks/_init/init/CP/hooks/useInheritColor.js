const { useState, useMemo, useEffect } = wp.element;

export const useInheritColor = (props, images) => {
	const { attributes, className, setAttributes, context } = props;
	const { setURLparams } = Catpow.util;
	const { classes, color = "0" } = attributes;
	const inheritColor = useMemo(() => {
		return color === "0" || context["catpow/color"] === color;
	}, [color, context["catpow/color"]]);
	useEffect(() => {
		if (context["catpow/color"] == null) {
			return;
		}
		if (inheritColor && context["catpow/color"] !== "0") {
			setAttributes({ color: context["catpow/color"] });
		}
		setAttributes({ inheritColor: color === context["catpow/color"] });
	}, [context["catpow/color"]]);
	useEffect(() => {
		return;
		const atts = {
			classes: classes
				.split(" ")
				.filter((str) => !CP.colorToneClassPattern.test(str))
				.concat(CP.colorToneValueToClasses(color))
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
