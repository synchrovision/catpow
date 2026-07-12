const { useState, useMemo, useEffect } = wp.element;

const getElementsHasColor = (el) => [...el.querySelectoryAll("[class]")].filter((el) => getColorNumber(el.className));
const getColorNumber = (classNames) => classNames?.match(/\bis\-color((\-|__)?\d+)\b/)?.[1];

const getClosestContainer = (el, containers) => {
	if (!el) {
		return null;
	}
	if (containers.has(el)) {
		return el;
	}
	return getClosestContainer(el.parentNode);
};

const observer = new MutationObserver((entries) => {
	for (const entry of entries) {
		const bodyEl = entry.target.ownerDocument.body;
		const targets = targetsByBody.get(bodyEl);
		const containers = containersByBody.get(bodyEl);
		if (entry.type === "attributes") {
			const colorNumber = getColorNumber(entry.target.className);
			if (colorNumber) {
				const oldColorNumber = getColorNumber(entry.oldValue);
				if (colorNumber !== oldColorNumber) {
					containers.set(entry.target, colorNumber);
					targets.forEach((el) => {
						if (entry.target.contains(el) && entry.target === getClosestContainer(el, containers)) {
							el.dispatchEvent(new CustomEvent("updateColorNumber", { detail: { colorNumber } }));
						}
					});
				}
			} else {
				containers.delete(entry.target);
			}
		} else if (entry.type === "childList") {
		}
	}
});

const targetsByBody = new WeakMap();
const containersByBody = new WeakMap();

const registerTarget = (target) => {
	const bodyEl = target.ownerDocument.body;
	targetsByBody.getOrInsert(bodyEl, new Set()).add(target);
	containersByBody.getOrInsertComputed(bodyEl, () => {
		const containers = new WeakMap();
		observer.observe(bodyEl, { subtree: true, childList: true, attributes: true, attributeFilter: ["class"], attributeOldValue: true });
		return new WeakMap(
			(function* (bodyEl) {
				for (const el of [...bodyEl.querySelectoryAll("[class]")]) {
					const colorNumber = getColorNumber(el.className);
					if (colorNumber) {
						yield [el, colorNumber];
					}
				}
			})(bodyEl),
		);
	});
};

export const useColorNumber = (ref) => {
	const [colorNumber, setColorNumber] = useState(false);

	useEffect(() => {
		if (ref == null) {
			return;
		}
		registerTarget(ref);
		ref.addEventListener("updateColorNumber", ({ detail: { colorNumber } }) => {
			setColorNumber(colorNumber);
		});
		const containsers = containersByBody.get(ref.ownerDocument.body);
		setColorNumber(containsers.get(getClosestContainer(ref)));
	}, [ref]);
	return colorNumber;
};
