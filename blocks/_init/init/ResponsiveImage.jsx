import { CP } from "./CP.jsx";

//@todo: Getting item by subItems and subIndex is fallback features for the old code.
// They should be removed when the old code is removed.
export const getItemByKeyAndIndex = (attr, keys, index, subIndex) => {
	let item = attr || {};
	if (keys.items) {
		if (Array.isArray(keys.items)) {
			console.assert(Array.isArray(index) && index.length === keys.items.length, "index and keys.items should be same length");
			for (let i in keys.items) {
				item = item?.[keys.items[i]]?.[index[i]];
			}
			return item || {};
		} else {
			const items = item[keys.items] || [];
			item = items[index] || {};
			//@deprecated: subItems and subIndex are fallback features for the old code.
			if (keys.subItems) {
				console.assert(subIndex !== undefined, "subIndex should be defined if keys.subItems is defined");
				const subItems = item[keys.subItems] || [];
				item = item?.[keys.subItems]?.[subIndex];
			}
		}
	}
	return item;
};

CP.ResponsiveImage = (props) => {
	const { className = "cp-responsiveimage", attr, set, keys, index, subIndex, sizes, devices, device, isTemplate, ...otherProps } = props;
	let item = getItemByKeyAndIndex(attr, keys, index, subIndex);

	if (isTemplate && keys.code && item[keys.code]) {
		return item[keys.code];
	}
	return <ResponsiveImageBody {...props} className={className} item={item} />;
};

export const ResponsiveImageBody = (props) => {
	const { className = "cp-responsiveimage", attr, set, keys, index, subIndex, devices, device, isTemplate, item, ...otherProps } = props;
	let { sizes } = props;
	const primaryClassName = className.split(" ")[0];
	const type = item[keys.mime] ? item[keys.mime].split("/")[0] : "image";
	if (type == "audio") {
		return <audio className={className + " is-audio"} src={item[keys.src]} data-mime={item[keys.mime]} {...otherProps}></audio>;
	}
	if (item[keys.srcset] && !sizes) {
		if (device) {
			sizes = CP.devices[device].sizes_value;
		} else {
			sizes = CP.getImageSizesForDevices(devices || ["sp", "pc"]);
		}
	}
	if (type == "video") {
		const videoAtts = {
			"data-mime": item[keys.mime],
			autoplay: 1,
			loop: 1,
			playsinline: 1,
			muted: 1,
		};
		if (keys.sources) {
			if (device) {
				const source = (item[keys.sources] && item[keys.sources].find((source) => source.device === device)) || {
					srcset: wpinfo.theme_url + "/images/dummy.mp4",
				};
				return <video className={className + " is-video"} src={source.srcset} {...videoAtts} {...otherProps}></video>;
			}
			return (
				<video className={className + " is-picture"} {...videoAtts} {...otherProps}>
					{item[keys.sources] && item[keys.sources].map((source) => <source src={source.srcset} media={CP.devices[source.device].media_query} data-device={source.device} key={source.device} />)}
					<source src={item[keys.src]} />
				</video>
			);
		}
		return <video className={className + " is-video"} src={item[keys.src]} {...videoAtts} {...otherProps}></video>;
	}
	var src = CP.imageSrcOrDummy(keys.src ? item[keys.src] : keys.url && item[keys.url] ? item[keys.url].slice(4, -1) : null);
	if (keys.sources) {
		if (device) {
			const source = (item[keys.sources] && item[keys.sources].find((source) => source.device === device)) || {
				srcset: wpinfo.theme_url + "/images/dummy.jpg",
			};
			return (
				<picture className={className + " is-picture"} {...otherProps}>
					<img className={primaryClassName + "-img"} src={source.srcset} alt={item[keys.alt]} />
				</picture>
			);
		}
		return (
			<picture className={className + " is-picture"} {...otherProps}>
				{item[keys.sources] && item[keys.sources].map((source) => <source srcSet={source.srcset} media={CP.devices[source.device].media_query} data-device={source.device} key={source.device} />)}
				<img className={primaryClassName + "-img"} src={src} alt={item[keys.alt]} />
			</picture>
		);
	}
	return <img className={className + " is-img"} src={src} alt={item[keys.alt]} srcSet={item[keys.srcset]} sizes={sizes} data-mime={item[keys.mime]} {...otherProps} />;
};
