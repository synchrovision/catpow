export const selectPrevItem = (tag) => {
	window.getSelection().anchorNode.parentNode.closest(tag).previousElementSibling.querySelector("[contentEditable]").focus();
};
export const selectNextItem = (tag) => {
	window.getSelection().anchorNode.parentNode.closest(tag).nextElementSibling.querySelector("[contentEditable]").focus();
};
export const saveItem = ({ items, itemsKey, set }) => {
	set({ [itemsKey || "items"]: JSON.parse(JSON.stringify(items)) });
};
export const deleteItem = (props) => {
	var { items, index } = props;
	items.splice(index, 1);
	saveItem(props);
};
export const cloneItem = (props) => {
	var { tag, items, index } = props;
	items.splice(index, 0, JSON.parse(JSON.stringify(items[index])));
	saveItem(props);
	selectNextItem(tag);
};
export const upItem = (props) => {
	var { items, index } = props;
	if (!items[index - 1]) return false;
	items.splice(index - 1, 2, items[index], items[index - 1]);
	saveItem(props);
};
export const downItem = (props) => {
	var { items, index } = props;
	if (!items[index + 1]) return false;
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
