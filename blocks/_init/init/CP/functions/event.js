export const extractEventDispatcherAttributes = (blockTypeName, item, itemKeys = ["items"]) => {
	const [itemsKey] = itemKeys;
	const blockType = wp.data.select("core/blocks").getBlockType(blockTypeName);
	const eventDispatcherAttributes = {};
	if (blockType.attributes[itemsKey].eventDispatcherAttributes) {
		blockType.attributes[itemsKey].eventDispatcherAttributes.map((attr_name) => {
			eventDispatcherAttributes[blockType.attributes[itemsKey].query[attr_name].attribute] = item[attr_name];
		});
	}
	return eventDispatcherAttributes;
};
