﻿import { CP } from "./CP.jsx";
import { ResponsiveImageBody } from "./ResponsiveImage.jsx";

CP.SelectResponsiveImage = (props) => {
	const { className = "cp-selectresponsiveimage", attr, set, keys = {}, index = 0, subIndex = 0, size, devices, device, showSelectPictureSources = false, isTemplate, ...otherProps } = props;

	let onClick, item, items, subItems;

	item = attr || {};
	if (keys.items) {
		items = item[keys.items] || [];
		item = items[index] || {};
		if (keys.subItems) {
			subItems = item[keys.subItems] || [];
			item = subItems[subIndex];
		}
	}

	if (device) {
		const sizeData = CP.devices[device];
		onClick = (e) =>
			CP.selectImage(
				{ src: "src" },
				function ({ src }) {
					if (keys.sources) {
						const source = item[keys.sources].find((source) => source.device === device);
						if (source) {
							source.srcset = src;
						} else {
							item[keys.sources].push({ device, srcset: src });
						}
						if (items) {
							set({ [keys.items]: JSON.parse(JSON.stringify(items)) });
						} else {
							set({
								[keys.sources]: JSON.parse(JSON.stringify(item[keys.sources])),
							});
						}
					} else {
						if (item[keys.srcset].match(sizeData.reg)) {
							item[keys.srcset] = item[keys.srcset].replace(sizeData.reg, src + sizeData.rep);
						} else {
							item[keys.srcset] += "," + src + sizeData.rep;
						}
						if (items) {
							set({ [keys.items]: JSON.parse(JSON.stringify(items)) });
						} else {
							set({ [keys.srcset]: item[keys.srcset] });
						}
					}
				},
				sizeData.media_size
			);
	} else {
		onClick = (e) => {
			CP.selectImage(
				keys,
				function (data) {
					if (keys.items) {
						Object.assign(item, data);
						set({ [keys.items]: JSON.parse(JSON.stringify(items)) });
					} else {
						set(data);
					}
				},
				size,
				devices
			);
		};
	}
	if (isTemplate && keys.code && item[keys.code]) {
		return <CP.DummyImage text={item[keys.code]} />;
	}
	return (
		<>
			{showSelectPictureSources ? (
				<>
					<ResponsiveImageBody {...props} className={className} item={item} keys={keys} />
					<div className="cp-selectresponsiveimage__controls">
						<CP.SelectPictureSources attr={attr} set={set} keys={keys} index={index} subIndex={subIndex} size={size} devices={devices} />
					</div>
				</>
			) : (
				<ResponsiveImageBody {...props} className={className} item={item} keys={keys} onClick={onClick} />
			)}
		</>
	);
};
