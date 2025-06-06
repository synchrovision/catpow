export const parseCSV = (csv) => {
	let tmp = [];
	csv = csv.replace(/("[^"]*")+/g, (match) => {
		tmp.push(match.slice(1, -1).replace(/""/g, '"'));
		return "[TMP]";
	});
	return csv.split("\r\n").map((row) => {
		return row.split(",").map((val) => (val === "[TMP]" ? tmp.shift() : val));
	});
};
