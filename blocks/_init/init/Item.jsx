﻿import { CP } from "./CP.jsx";

CP.Item = (props) => {
	const {
		tag,
		items,
		itemsKey,
		index,
		indexKey = "currentItemIndex",
		set,
		attr,
		triggerClasses,
		children,
	} = props;
	let { itemClasses } = props;
	if (!items[index].classes) {
		items[index].classes = "item";
	} else if (items[index].classes.search(/\bitem\b/) === -1) {
		items[index].classes += " item";
	}
	let classes = items[index].classes;
	if (props.className) {
		classes += " " + props.className;
	}

	const isSelected =
		props.isSelected === undefined ? index == attr[indexKey] : props.isSelected;

	return wp.element.createElement(
		tag,
		{
			className: classes,
			style: props.style,
			"data-index": index,
			"data-refine-cond": items[index]["cond"],
			onKeyDown: (e) => {
				if (e.ctrlKey || e.metaKey) {
					switch (e.key) {
						case "s":
							CP.saveItem(props);
							e.preventDefault();
							break;
						case "d":
							CP.cloneItem(props);
							e.preventDefault();
							break;
						case "Backspace":
							CP.deleteItem(props);
							e.preventDefault();
							break;
						case "ArrowUp":
							CP.upItem(props);
							e.preventDefault();
							break;
						case "ArrowDown":
							CP.downItem(props);
							e.preventDefault();
							break;
					}
				}
			},
			onClick: (e) => {
				set({ [indexKey]: index });
			},
		},
		<>
			{children}
			{isSelected && (
				<CP.ItemControl
					tag={tag === "tr" ? "td" : "div"}
					controls={{
						delete: (e) => CP.deleteItem(props),
						clone: (e) => CP.cloneItem(props),
						up: (e) => CP.upItem(props),
						down: (e) => CP.downItem(props),
					}}
				/>
			)}
		</>
	);
};
