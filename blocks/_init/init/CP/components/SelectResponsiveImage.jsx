import { clsx } from "clsx";

const { useState, useMemo } = wp.element;

export const SelectResponsiveImage = (props) => {
	const {
		className = "cp-selectresponsiveimage",
		controlClassName = "cp-selectresponsiveimage-controls",
		type,
		attributes,
		setAttributes,
		itemKeys,
		keys = {},
		size,
		devices,
		device,
		showSelectPictureSources = false,
		isTemplate,
		...otherProps
	} = props;
	const { Icon } = wp.components;
	const [isOpen, setIsOpen] = useState(false);

	let onClick;

	const item = (itemKeys ? CP.getTheItem(props) : attributes) || {};
	const save = (data) => {
		if (itemKeys) {
			const targetItem = CP.getTheItem(props);
			if (!targetItem) {
				return;
			}
			Object.assign(targetItem, data);
			CP.saveItem(props);
		} else {
			setAttributes(data);
		}
	};

	if (device) {
		const sizeData = CP.devices[device];
		onClick = (e) =>
			CP.selectImage(
				function ({ src }) {
					if (keys.sources) {
						const sources = item[keys.sources] || [];
						const source = sources.find((source) => source.device === device);
						if (source) {
							source.srcset = src;
						} else {
							sources.push({ device, srcset: src });
						}
						save({ [keys.sources]: JSON.parse(JSON.stringify(sources)) });
					} else {
						const srcset = item[keys.srcset] || "";
						if (srcset.match(sizeData.reg)) {
							item[keys.srcset] = srcset.replace(sizeData.reg, src + sizeData.rep);
						} else {
							item[keys.srcset] = srcset ? srcset + "," + src + sizeData.rep : src + sizeData.rep;
						}
						save({ [keys.srcset]: item[keys.srcset] });
					}
				},
				{ keys: { src: "src" }, type, size: sizeData.media_size },
			);
	} else {
		onClick = (e) => {
			CP.selectImage(
				function (data) {
					save(data);
				},
				{ keys, type, size, devices },
			);
		};
	}
	if (isTemplate && keys?.code && item?.[keys.code]) {
		return <CP.DummyImage text={item[keys.code]} />;
	}
	return (
		<>
			{showSelectPictureSources ? (
				<>
					<CP.ResponsiveImageBody {...props} className={className} item={item} keys={keys} />
					<CP.Bem>
						<div className={clsx(controlClassName, { "is-open": isOpen })}>
							<Icon icon="edit" onClick={() => setIsOpen(!isOpen)} />
							<div className="_body" {...{ inert: isOpen ? null : "" }}>
								<CP.SelectPictureSources {...{ attributes, setAttributes, itemKeys, keys, size, devices }} />
							</div>
						</div>
					</CP.Bem>
				</>
			) : (
				<CP.ResponsiveImageBody {...props} className={className} item={item} keys={keys} style={{ pointerEvents: "auto" }} onClick={onClick} />
			)}
		</>
	);
};
