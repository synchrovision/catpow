export const SelectResponsiveImage = (props) => {
	const { className = "cp-selectresponsiveimage", type, attr, set, keys = {}, index = 0, size, devices, device, showSelectPictureSources = false, isTemplate, ...otherProps } = props;
	const primaryClassName = className.split(" ")[0];

	let onClick;

	const itemsKey = keys.items && Array.isArray(keys.items) ? keys.items[0] : keys.items;
	const items = itemsKey && attr[itemsKey];
	const item = CP.getItemByKeyAndIndex(props, keys?.items, index);

	if (device) {
		const sizeData = CP.devices[device];
		onClick = (e) =>
			CP.selectImage(
				function ({ src }) {
					if (keys.sources) {
						const source = item[keys.sources].find((source) => source.device === device);
						if (source) {
							source.srcset = src;
						} else {
							item[keys.sources].push({ device, srcset: src });
						}
						if (items) {
							set({ [itemsKey]: JSON.parse(JSON.stringify(items)) });
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
							set({ [itemsKey]: JSON.parse(JSON.stringify(items)) });
						} else {
							set({ [keys.srcset]: item[keys.srcset] });
						}
					}
				},
				{ keys: { src: "src" }, type, size: sizeData.media_size }
			);
	} else {
		onClick = (e) => {
			CP.selectImage(
				function (data) {
					if (itemsKey) {
						Object.assign(item, data);
						set({ [itemsKey]: JSON.parse(JSON.stringify(items)) });
					} else {
						set(data);
					}
				},
				{ keys, type, size, devices }
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
					<CP.ResponsiveImageBody {...props} className={className} item={item} keys={keys} />
					<div className={`${primaryClassName}__controls`}>
						<CP.SelectPictureSources attr={attr} set={set} keys={keys} index={index} size={size} devices={devices} />
					</div>
				</>
			) : (
				<CP.ResponsiveImageBody {...props} className={className} item={item} keys={keys} style={{ pointerEvents: "auto" }} onClick={onClick} />
			)}
		</>
	);
};
