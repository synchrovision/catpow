export const selectImage = (set, { attr, keys, index, size, devices = ["sp", "tb"], type = "image" }) => {
	if (CP.uploder === undefined) {
		CP.uploader = wp.media({
			title: "Select Image",
			button: { text: "Select" },
			multiple: false,
			library: { type },
		});
	}
	CP.uploader
		.off("select")
		.on("select", () => {
			let image = CP.uploader.state().get("selection").first().toJSON();
			let data = {};
			if (keys.mime) {
				data[keys.mime] = image.mime;
			}
			if (keys.alt) {
				data[keys.alt] = image.alt;
			}
			if (size && image.sizes && image.sizes[size]) {
				data[keys.src] = image.sizes[size].url;
			} else if (keys.src) {
				data[keys.src] = image.url;
			} else if (keys.url) {
				data[keys.url] = `url(${image.url})`;
			}
			if (keys.sources) {
				if (image.sizes) {
					data[keys.sources] = devices.map((device) => {
						const sizeData = CP.devices[device];
						return { srcset: image.sizes[sizeData.media_size].url, device };
					});
				} else {
					data[keys.sources] = devices.map((device) => {
						return { srcset: image.url, device };
					});
				}
			}
			if (keys.srcset && image.sizes) {
				data[keys.srcset] = "";
				devices.forEach((device) => {
					const sizeData = CP.devices[device];
					data[keys.srcset] += image.sizes[sizeData.media_size].url + sizeData.rep;
				});
			}
			if (keys.data) {
				data[keys.data] = image;
			}
			if (attr && keys.items && index) {
				CP.updateItemByKeyAndIndex({ attr, set }, keys.items, index, data);
			} else {
				set(data);
			}
		})
		.off("open")
		.on("open", () => {
			const library = CP.uploader.state().get("library");
			if (library.props.get("type") !== type) {
				library.props.set({ type });
				library.reset();
			}
		})
		.open();
};
export const imageSrcOrDummy = (src) => {
	if (!src) {
		return wpinfo.theme_url + "/images/dummy.jpg";
	}
	if (src[0] == "[") {
		return wpinfo.plugins_url + "/catpow/callee/dummy_image.php?text=" + src;
	}
	return src;
};

export const getImageSizesForDevices = (devices) => {
	return Object.keys(CP.devices)
		.filter((device) => devices.includes(device))
		.map((device) => CP.devices[device].sizes)
		.join(",");
};
export const getPictureSoucesAttributes = (selector) => {
	return {
		source: "query",
		selector: (selector || "picture") + " source",
		query: {
			srcset: { source: "attribute", attribute: "srcset" },
			device: { source: "attribute", attribute: "data-device" },
		},
	};
};
export const getPictureSoucesAttributesForDevices = (devices, selector, image) => {
	let attr = CP.getPictureSoucesAttributes(selector);
	attr.default = CP.getPictureSoucesAttributesDefaultValueForDevices(devices, image);
	return attr;
};
export const getPictureSoucesAttributesDefaultValueForDevices = (devices, image) => {
	return devices.map((device) => ({ srcset: wpinfo.theme_url + "/images/" + (image || "dummy.jpg"), device }));
};
export const getMediaQueryKeyForDevice = (device) => {
	if (!CP.devices[device].media_query) {
		return "default";
	}
	return CP.devices[device].media_query.slice(1, -1);
};
