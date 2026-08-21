export const extractEventDispatcherAttributes = (blockTypeName, attributes, itemKeys) => {
	const blockType = wp.data.select("core/blocks").getBlockType(blockTypeName);
	const [itemsKey, itemIndex, subItemsKey, subItemIndex] = itemKeys;
	const item = CP.getTheItem({ attributes, itemKeys });
	const atts = (subItemsKey ? blockType.attributes[itemsKey]?.query?.[subItemsKey] : blockType.attributes[itemsKey])?.eventDispatcherAttributes;
	const eventDispatcherAttributes = {};
	if (atts?.query) {
		atts.query.map((attr_name) => {
			eventDispatcherAttributes[atts.query[attr_name].attribute] = item[attr_name];
		});
	}
	return eventDispatcherAttributes;
};
