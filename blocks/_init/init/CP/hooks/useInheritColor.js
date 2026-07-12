import { useColorNumber } from "./useColorNumber";

const { useState, useMemo, useEffect } = wp.element;

export const useInheritColor = (props, params) => {
	const { attributes, setAttributes } = props;

	const [ref, setRef] = useState(false);

	const colorNumber = useColorNumber(ref);

	useEffect(() => {
		if (!ref || colorNumber == null) return;
		const modifiedAttributes = Object.keys(attributes)
			.filter((key) => key.match(/^(\w+V|v)ars$/))
			.reduce((p, c) => {
				const value = attributes[c];
				if (typeof value !== "object") {
					return p;
				}
				const newValues = Object.keys(value).reduce((newValues, key) => {
					const matches = value[key].match(/\burl\("(.+)?"\)\b/);
					if (matches) {
						const url = new URL(matches[1]);
						if (url.searchParams.has("c") && url.searchParams.get("c") !== colorNumber) {
							url.searchParams.set(c, colorNumber);
							newValues[key] = value[key].replace(matches[0], `url("${url}")`);
						}
					}
					return newValues;
				}, {});
				if (Object.keys(newValues).length) {
					p[c] = { ...value, newValues };
				}
				return p;
			}, {});
		if (Object.keys(modifiedAttributes).length) {
			setAttributes(modifiedAttributes);
		}
	}, [ref, colorNumber]);

	return setRef;
};
