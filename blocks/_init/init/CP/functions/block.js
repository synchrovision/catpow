export const createBlocks = (blocks) => {
	return blocks.map((block) => {
		if (block[2]) {
			block[2] = CP.createBlocks(block[2]);
		}
		return wp.blocks.createBlock(...block);
	});
};
export const getClosestBlockAttributesComputed = (callback, block, itemKeys) => {
	const [itemsKey, index, subItemsKey, subIndex] = itemKeys || [];
	if (itemsKey && block.attributes[itemsKey][index]) {
		if (subItemsKey && block.attributes[itemsKey][index][subItemsKey][subIndex]) {
			const result = callback(block.attributes[itemsKey][index][subItemsKey][subIndex]);
			if (result != null) return result;
		}
		const result = callback(block.attributes[itemsKey][index]);
		if (result != null) return result;
	}
	const result = callback(block.attributes);
	if (result != null) return result;
	const { getBlockParents, getBlockAttributes } = wp.data.select("core/block-editor");
	for (const parentBlockClientId of getBlockParents(block.clientId, true)) {
		const parentBlockAttributes = getBlockAttributes(parentBlockClientId);
		if (parentBlockAttributes) {
			const result = callback(parentBlockAttributes);
			if (result != null) return result;
		}
	}
	return null;
};
export const walkBlocksRecursive = (blocks, callback) => {
	blocks.forEach((block) => {
		if (callback(block) !== false && block.innerBlocks) block.innerBlocks.forEach(callback);
	});
};
