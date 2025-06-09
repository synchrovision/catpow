export const extractEventDispatcherAttributes = (blockTypeName, item) => {
	const blockType = wp.data.select("core/blocks").getBlockType(blockTypeName);
	const eventDispatcherAttributes = {};
	if (blockType.attributes.items.eventDispatcherAttributes) {
		blockType.attributes.items.eventDispatcherAttributes.map((attr_name) => {
			eventDispatcherAttributes[blockType.attributes.items.query[attr_name].attribute] = item[attr_name];
		});
	}
	return eventDispatcherAttributes;
};
