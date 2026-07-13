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
export const updateBlockAttributesColor = (block, colorNumber) => {
	const { attributes, clientId } = block;
	const modifiedAttributes = Object.keys(attributes)
		.filter((key) => key.match(/^(\w+V|v)ars$/))
		.reduce((p, c) => {
			const value = attributes[c];
			if (typeof value !== "object") {
				return p;
			}
			const newValues = Object.keys(value).reduce((newValues, key) => {
				const matches = value[key].match(/url\("(.+)?"\)/);
				if (matches) {
					const url = new URL(matches[1]);
					if (url.searchParams.has("c") && url.searchParams.get("c") !== colorNumber) {
						url.searchParams.set("c", colorNumber);
						newValues[key] = value[key].replace(matches[0], `url("${url.toString()}")`);
					}
				}
				return newValues;
			}, {});
			if (Object.keys(newValues).length) {
				p[c] = { ...value, ...newValues };
			}
			return p;
		}, {});
	if (Object.keys(modifiedAttributes).length) {
		wp.data.dispatch("core/block-editor").updateBlockAttributes(clientId, modifiedAttributes);
	}
};
