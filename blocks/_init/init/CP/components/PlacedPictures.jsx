import { bem } from "catpow/util";

export const PlacedPictures = (props) => {
	const { className, attr, keys, index } = props;
	const item = keys.items ? attr[keys.items][index] : attr;
	const pictures = item[keys.pictures];
	return (
		<div className={className}>
			{pictures &&
				pictures.map((picture, index) => {
					const { style, code, sources, src, alt } = picture;
					return (
						<div className="item" style={CP.parseStyleString(style)} key={index}>
							{code || (
								<picture className="picture">
									{sources && sources.map((source) => <source srcSet={source.srcset} media={CP.devices[source.device].media_query} data-device={source.device} key={source.device} />)}
									<img className="img" src={src} alt={alt} />
								</picture>
							)}
						</div>
					);
				})}
		</div>
	);
};

PlacedPictures.Edit = (props) => {
	const { className, set, attr, keys, index, devices } = props;
	const { useState, useMemo, useCallback, useRef, useEffect } = wp.element;
	const { BlockControls, InspectorControls } = wp.blockEditor;
	const { BaseControl, Icon, PanelBody, RangeControl, TextControl, Toolbar, ToolbarGroup, ToolbarButton, ToolbarDropdownMenu } = wp.components;
	const item = keys.items ? attr[keys.items][index] : attr;
	const pictures = item[keys.pictures];
	const classes = useMemo(() => bem("cp-placedpictures " + className), [className]);
	const [editMode, setEditMode] = useState(false);

	const [currentItemNodes, setCurrentItemNodes] = useState([]);
	const [currentItemIndexes, setCurrentItemIndexes] = useState([]);
	const [containerNode, setContainerNode] = useState(false);

	const targetRefs = useRef([]);
	useEffect(() => {
		setCurrentItemNodes(currentItemIndexes.sort().map((index) => targetRefs.current[index]));
	}, [currentItemIndexes, targetRefs, setCurrentItemNodes]);

	const remPx = useMemo(() => parseFloat(getComputedStyle(document.documentElement).fontSize), []);
	const getPlaceStyle = useCallback((bnd, tgtBnd) => {
		const style = {
			position: "absolute",
			width: Math.pround(tgtBnd.width / remPx, 2) + "rem",
			height: Math.pround(tgtBnd.height / remPx, 2) + "rem",
		};
		const px = (tgtBnd.left - bnd.left + tgtBnd.width / 2) / bnd.width;
		const py = (tgtBnd.top - bnd.top + tgtBnd.height / 2) / bnd.height;
		if (px < 0.35) {
			style.left = Math.pround((tgtBnd.left - bnd.left) / remPx, 4) + "rem";
		} else if (px > 0.65) {
			style.right = Math.pround((bnd.right - tgtBnd.right) / remPx, 4) + "rem";
		} else {
			style.left = "calc(50% + " + Math.pround((tgtBnd.left - bnd.left - bnd.width / 2) / remPx, 4) + "rem)";
		}
		if (py < 0.35) {
			style.top = Math.pround((tgtBnd.top - bnd.top) / remPx, 4) + "rem";
		} else if (py > 0.65) {
			style.bottom = Math.pround((bnd.bottom - tgtBnd.bottom) / remPx, 4) + "rem";
		} else {
			style.top = "calc(50% + " + Math.pround((tgtBnd.top - bnd.top - bnd.height / 2) / remPx, 4) + "rem)";
		}
		return style;
	}, []);

	const onClickItem = useCallback(
		(e) => {
			const index = parseInt(e.currentTarget.dataset.index);
			const selected = currentItemIndexes.includes(index);
			if (e.shiftKey) {
				if (selected) {
					setCurrentItemIndexes(currentItemIndexes.filter((i) => i !== index));
				} else {
					setCurrentItemIndexes(currentItemIndexes.concat([index]));
				}
			} else if (!selected) {
				setCurrentItemIndexes([index]);
			}
		},
		[currentItemIndexes, setCurrentItemIndexes]
	);

	const save = useCallback(() => {
		if (keys.items) {
			items[index][keys.pictures] = JSON.parse(JSON.stringify(pictures));
			set({ [keys.items]: [...items] });
		} else {
			set({ [keys.pictures]: JSON.parse(JSON.stringify(pictures)) });
		}
	}, [set, pictures]);

	useEffect(() => {
		set({
			lock: {
				move: editMode,
				remove: false,
			},
		});
	}, [editMode]);

	return (
		<div className={classes({ "is-edit-mode": editMode })} ref={setContainerNode}>
			<BlockControls>
				<ToolbarButton icon="images-alt" label="edit decoration" isActive={editMode} onClick={() => setEditMode(!editMode)} />
				{editMode && (
					<ToolbarButton
						icon="welcome-add-page"
						label="add item"
						onClick={() => {
							pictures.push({
								style: {
									width: "4rem",
									height: "4rem",
									top: "0rem",
									left: "0rem",
								},
								code: false,
								sources: devices.map((device) => {
									return { device, srcset: CP.imageSrcOrDummy() };
								}),
								src: CP.imageSrcOrDummy(),
								alt: "",
							});
							save();
						}}
					/>
				)}
				{editMode && currentItemIndexes.length > 0 && (
					<ToolbarButton
						icon="insert"
						label="insert"
						onClick={() => {
							pictures.push.apply(
								pictures,
								pictures.filter((item, index) => currentItemIndexes.includes(index))
							);
							save();
						}}
					/>
				)}
				{editMode && currentItemIndexes.length > 0 && pictures.length > currentItemIndexes.length && (
					<ToolbarButton
						icon="remove"
						label="remove"
						onClick={() => {
							currentItemIndexes
								.sort()
								.reverse()
								.forEach((index) => pictures.splice(index, 1));
							save();
						}}
					/>
				)}
			</BlockControls>
			{pictures &&
				pictures.map((picture, index) => {
					const { style, code, sources, src, alt } = picture;
					return (
						<div className="item" style={CP.parseStyleString(style)} onClick={(e) => editMode && onClickItem(e)} data-index={index} ref={(el) => (targetRefs.current[index] = el)} key={index}>
							{code ? (
								<CP.DummyImage text={code} />
							) : (
								<picture
									className="picture"
									onClick={(e) =>
										editMode &&
										currentItemIndexes.includes(index) &&
										CP.selectImage(
											function (data) {
												Object.assign(picture, data);
												save();
											},
											{ keys: { sources: "sources", src: "src", alt: "alt" }, size: "full", devices }
										)
									}
								>
									{sources && sources.map((source) => <source srcSet={source.srcset} media={CP.devices[source.device].media_query} data-device={source.device} key={source.device} />)}
									<img className="img" src={src} alt={alt} />
								</picture>
							)}
						</div>
					);
				})}
			{editMode && (
				<CP.BoundingBox
					targets={currentItemNodes}
					container={containerNode}
					onChange={() => {
						const bnd = containerNode.getBoundingClientRect();
						currentItemNodes.forEach((el) => {
							pictures[el.dataset.index].style = getPlaceStyle(bnd, el.getBoundingClientRect());
						});
						save();
					}}
					onDeselect={() => {
						setCurrentItemIndexes([]);
					}}
					onDuplicate={() => {
						pictures.push.apply(
							pictures,
							pictures.filter((item, index) => currentItemIndexes.includes(index))
						);
						save();
					}}
					onDelete={() => {
						currentItemIndexes
							.sort()
							.reverse()
							.forEach((index) => pictures.splice(index, 1));
						save();
					}}
				/>
			)}
		</div>
	);
};
