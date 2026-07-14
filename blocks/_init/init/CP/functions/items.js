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
export const updateItem = (props, values) => {
	const { attributes, setAttributes, itemKeys } = props;
	if (itemKeys) {
		console.log({ props, values });
		Object.assign(getTheItem(props), values);
		saveItem(props);
	} else {
		setAttributes(values);
	}
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
