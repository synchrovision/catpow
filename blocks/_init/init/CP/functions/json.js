export const getJsonValue = ({ attr }, json, key) => {
	if (!attr[json]) {
		return null;
	}
	return JSON.parse(attr[json])[key];
};
export const hasJsonValue = (prop, json, key, value) => {
	let values = getJsonValue(prop, json, key);
	if (!values) {
		return false;
	}
	return values.indexOf(value) !== -1;
};
export const setJsonValue = ({ attr, set }, json, key, value) => {
	let data = {};
	let jsonData = JSON.parse(attr[json]);
	jsonData[key] = value;
	data[json] = JSON.stringify(jsonData);
	set(data);
};
export const setJsonValues = ({ attr, set }, json, keys, value) => {
	let data = {};
	let jsonData = JSON.parse(attr[json]);
	if (keys) {
		for (const key in keys) {
			jsonData[keys[key]] = value[key];
		}
	} else {
		Object.assign(jsonData, value);
	}
	data[json] = JSON.stringify(jsonData);
	set(data);
};
export const switchJsonValue = (prop, json, key, value) => {
	let values = CP.getJsonValue(prop, json, key);
	if (!values) {
		values = [];
	}
	let i = values.indexOf(value);
	if (i === -1) {
		values.push(value);
	} else {
		values.splice(i, 1);
	}
	setJsonValue(prop, json, key, values);
};
