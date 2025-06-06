export const isRowsConvertibleToItems = (rows, itemsConf) => {
	for (const cell of rows[0].cells) {
		if (itemsConf.query.hasOwnProperty(cell.text)) {
			return true;
		}
	}
	return false;
};
export const convertRowsToItems = (rows, itemsConf) => {
	const keyIndex = [];
	rows[0].cells.forEach((cell, index) => {
		if (itemsConf.query.hasOwnProperty(cell.text)) {
			keyIndex.push([cell.text, index]);
		}
	});
	return rows.slice(1).map((row) => {
		const item = {};
		for (const [key, index] of keyIndex) {
			item[key] = row.cells[index].text;
		}
		return item;
	});
};
