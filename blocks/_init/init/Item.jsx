import { CP } from "./CP.jsx";
import clsx from "clsx";

CP.Item = (props) => {
	const { tag = "div", items, index, indexKey = "currentItemIndex", set, attr, children } = props;
	const isSelected = props.isSelected === undefined ? index == attr[indexKey] : props.isSelected;

	return wp.element.createElement(
		tag,
		{
			className: clsx(props.className || items[index].classes, "cp-item"),
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
