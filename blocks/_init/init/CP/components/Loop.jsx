export const Loop = (props) => {
	const { current = 0, Component = "div", loop = false, ...otherProps } = props;
	const { useState, useMemo, useCallback, useEffect, useRef } = wp.element;
	const items = (() => {
		const items = Array.isArray(props.items) ? props.items : Number.isInteger(props.items) ? [...Array(props.items).keys()] : Array.from(props.items);
		items.forEach((value, index) => {
			if (typeof value !== "object") {
				items[index] = { value };
			}
		});
		return items;
	})();
	return (() => {
		const l = items.length;
		const h = l >> 1;
		return items.map((item, index) => {
			return <Component {...otherProps} {...item} index={index} position={loop ? ((index - current + l + h) % l) - h : index - current} key={index} />;
		});
	})();
};
