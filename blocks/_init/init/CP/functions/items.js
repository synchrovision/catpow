export const selectPrevItem = (tag) => {
	window.getSelection().anchorNode.parentNode.closest(tag).previousElementSibling.querySelector("[contentEditable]").focus();
};
export const selectNextItem = (tag) => {
	window.getSelection().anchorNode.parentNode.closest(tag).nextElementSibling.querySelector("[contentEditable]").focus();
};
export const getTheItemIndex = (props) => {
	const { items, index, attributes, itemKeys = [] } = props;
	if (items) return index;
	const [itemsKey, itemIndex, subItemsKey, subItemIndex] = itemKeys;
	if (subItemsKey) return subItemIndex;
	return itemIndex;
};
export const getTheItem = (props) => {
	var { items, index, attributes, itemKeys = [] } = props;
	if (items) return items[index];
	const [itemsKey, itemIndex, subItemsKey, subItemIndex] = itemKeys;
	if (subItemsKey) return attributes?.[itemsKey]?.[itemIndex]?.[subItemsKey][subItemIndex];
	return attributes?.[itemsKey]?.[itemIndex];
};
export const getTheItems = (props) => {
	var { items, attributes, itemKeys = [] } = props;
	if (items) return items;
	const [itemsKey, itemIndex, subItemsKey] = itemKeys;
	if (subItemsKey) return attributes?.[itemsKey]?.[itemIndex]?.[subItemsKey];
	return attributes?.[itemsKey];
};
export const saveItem = ({ items, itemsKey, set, attributes, setAttributes, itemKeys }) => {
	if (items) return set({ [itemsKey || "items"]: JSON.parse(JSON.stringify(items)) });
	setAttributes({ [itemKeys[0]]: JSON.parse(JSON.stringify(attributes[itemKeys[0]])) });
};
export const deleteItem = (props) => {
	getTheItems(props).splice(getTheItemIndex(props), 1);
	saveItem(props);
};
export const cloneItem = (props) => {
	const { tag } = props;
	getTheItems(props).splice(getTheItemIndex(props), 0, JSON.parse(JSON.stringify(getTheItem(props))));
	saveItem(props);
	selectNextItem(tag);
};
export const upItem = (props) => {
	const items = getTheItems(props);
	const index = getTheItemIndex(props);
	if (index <= 0) return false;
	getTheItems(props).splice(index - 1, 2, items[index], items[index - 1]);
	saveItem(props);
};
export const downItem = (props) => {
	const items = getTheItems(props);
	const index = getTheItemIndex(props);
	if (index > items.length - 2) return false;
	items.splice(index, 2, items[index + 1], items[index]);
	saveItem(props);
};

export const getItemByKeyAndIndex = ({ attr }, keys, index) => {
	let item = attr || {};
	if (keys) {
		if (Array.isArray(keys)) {
			console.assert(Array.isArray(index) && index.length === keys.length, "index and keys should be same length");
			for (let i in keys) {
				item = item?.[keys[i]]?.[index[i]];
			}
			return item || {};
		} else {
			const items = item[keys] || [];
			item = items[index] || {};
		}
	}
	return item;
};
export const updateItemByKeyAndIndex = ({ attr, set }, keys, index, item) => {
	if (keys) {
		if (Array.isArray(keys)) {
			console.assert(Array.isArray(index) && index.length === keys.length, "index and keys should be same length");
			let oldItem = attr;
			for (let i in keys) {
				if (!oldItem[keys[i]]) {
					oldItem[keys[i]] = [];
				}
				if (!oldItem[keys[i]][index[i]]) {
					oldItem[keys[i]][index[i]] = {};
				}
				oldItem = oldItem[keys[i]][index[i]];
			}
			Object.assign(oldItem, item);
			set({ [keys[0]]: JSON.parse(JSON.stringify(attr[keys[0]])) });
		} else {
			set({ [keys]: Object.assign({}, attr[keys] || {}, item) });
		}
	}
};

export const switchItemColor = ({ items, index, set }, color, itemsKey) => {
	if (itemsKey === undefined) {
		itemsKey = "items";
	}
	let classArray = (items[index].classes || "").split(" ");
	let i = classArray.findIndex((cls) => cls.slice(0, 5) === "color");
	if (i === -1) {
		if (color) {
			classArray.push("color" + color);
		}
	} else {
		if (color) {
			classArray.splice(i, 1, "color" + color);
		} else {
			classArray.splice(i, 1);
		}
	}
	items[index].classes = classArray.join(" ");
	set({ [itemsKey]: JSON.parse(JSON.stringify(items)) });
};
export const getItemColor = ({ items, index }) => {
	let c = (items[index].classes || "").split(" ").find((cls) => cls.slice(0, 5) === "color");
	if (!c) {
		return 0;
	}
	return parseInt(c.slice(5));
};

export const switchItemPattern = ({ items, index, set }, pattern, itemsKey) => {
	if (itemsKey === undefined) {
		itemsKey = "items";
	}
	let classArray = (items[index].classes || "").split(" ");
	let i = classArray.findIndex((cls) => cls.slice(0, 7) === "pattern");
	if (i === -1) {
		if (pattern) {
			classArray.push("pattern" + pattern);
		}
	} else {
		if (pattern) {
			classArray.splice(i, 1, "pattern" + pattern);
		} else {
			classArray.splice(i, 1);
		}
	}
	items[index].classes = classArray.join(" ");
	set({ [itemsKey]: JSON.parse(JSON.stringify(items)) });
};
export const getItemPattern = ({ items, index }) => {
	let p = (items[index].classes || "").split(" ").find((cls) => cls.slice(0, 7) === "pattern");
	if (!p) {
		return 0;
	}
	return parseInt(p.slice(7));
};

export const switchItemSelectiveClass = ({ items, index, set }, values, value, itemsKey) => {
	if (itemsKey === undefined) {
		itemsKey = "items";
	}
	let classArray = (items[index].classes || "").split(" ");
	if (!Array.isArray(values) && _.isObject(values)) {
		values = Object.keys(values);
	}
	classArray = _.difference(classArray, values);
	if (Array.isArray(value)) {
		classArray = classArray.concat(value);
	} else {
		classArray.push(value);
	}
	items[index].classes = classArray.join(" ");
	set({ [itemsKey]: JSON.parse(JSON.stringify(items)) });
};
export const getItemSelectiveClass = ({ items, index }, values) => {
	if (!items[index].classes) {
		return false;
	}
	let classArray = (items[index].classes || "").split(" ");
	if (!Array.isArray(values) && _.isObject(values)) {
		values = Object.keys(values);
	}
	return _.intersection(classArray, values).shift();
};

export const toggleItemClass = ({ items, index, set }, value, itemsKey) => {
	if (itemsKey === undefined) {
		itemsKey = "items";
	}
	let classArray = (items[index].classes || "").split(" ");
	let i = classArray.indexOf(value);
	if (i === -1) {
		classArray.push(value);
	} else {
		classArray.splice(i, 1);
	}
	items[index].classes = classArray.join(" ");
	set({ [itemsKey]: JSON.parse(JSON.stringify(items)) });
};
export const hasItemClass = ({ items, index }, value) => {
	let classArray = (items[index].classes || "").split(" ");
	return classArray.indexOf(value) !== -1;
};
