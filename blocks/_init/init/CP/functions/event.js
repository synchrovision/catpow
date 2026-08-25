export const extractEventDispatcherAttributes = (blockTypeName, attributes, itemKeys) => {
	if (!blockTypeName) {
		console.error(`extractEventDispatcherAttributes : blockTypeName required`);
		return {};
	}
	const blockType = wp.data.select("core/blocks").getBlockType(blockTypeName);
	if (!blockType?.attributes) {
		console.error(`extractEventDispatcherAttributes : attempt to get not existing blockType ${blockTypeName}`);
		return {};
	}
	const [itemsKey, , subItemsKey] = itemKeys;
	const item = CP.getTheItem({ attributes, itemKeys });
	const atts = subItemsKey ? blockType.attributes[itemsKey]?.query?.[subItemsKey] : blockType.attributes[itemsKey];
	const eventDispatcherAttributes = {};
	if (atts?.eventDispatcherAttributes) {
		atts.eventDispatcherAttributes.map((attr_name) => {
			eventDispatcherAttributes[atts.query[attr_name].attribute] = item[attr_name];
		});
	}
	return eventDispatcherAttributes;
};
