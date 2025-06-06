export const getDataListId = (name, values) => {
	const id = "datalist-" + name;
	if (!document.getElementById(id)) {
		if (!values) {
			if (!CP.dataListPresets.hasOwnProperty(name)) {
				return null;
			}
			values = CP.dataListPresets[name];
		}
		const datalist = document.createElement("datalist");
		datalist.id = id;
		values.forEach((value) => {
			const option = document.createElement("option");
			option.value = value;
			datalist.appendChild(option);
		});
		document.body.appendChild(datalist);
	}
	return id;
};
