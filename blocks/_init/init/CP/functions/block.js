export const createBlocks = (blocks) => {
	return blocks.map((block) => {
		if (block[2]) {
			block[2] = CP.createBlocks(block[2]);
		}
		return wp.blocks.createBlock(...block);
	});
};
