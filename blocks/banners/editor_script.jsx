﻿CP.config.banners = {
	devices: ["sp", "tb"],
	imageKeys: {
		image: {
			src: "src",
			alt: "alt",
			code: "imageCode",
			items: "items",
			sources: "sources",
		},
	},
	linkKeys: {
		link: { href: "linkUrl", items: "items" },
	},
};

wp.blocks.registerBlockType("catpow/banners", {
	title: "🐾 Banners",
	description: "リンク付きのバナー画像を並べて表示するブロックです。",
	icon: "images-alt",
	category: "catpow",
	transforms: {
		from: [
			{
				type: "block",
				blocks: CP.listedConvertibles,
				transform: (attributes) => {
					attributes.classes = "wp-block-catpow-banners medium hasTitle";
					return wp.blocks.createBlock("catpow/banners", attributes);
				},
			},
		],
	},
	example: CP.example,
	edit({ attributes, className, setAttributes, isSelected }) {
		const { useState, useMemo } = wp.element;
		const { InnerBlocks, InspectorControls, RichText } = wp.blockEditor;
		const { Icon, PanelBody, TextareaControl } = wp.components;
		const { items = [], classes, loopCount, imageCode, doLoop, device, EditMode = false, AltMode = false } = attributes;

		const states = CP.wordsToFlags(classes);
		const { devices, imageKeys, linkKeys } = CP.config.banners;

		const selectiveClasses = useMemo(() => {
			var selectiveClasses = [
				{
					label: "サイズ",
					type: "buttons",
					values: ["small", "medium", "large", "full"],
				},
				{ label: "タイトル", values: "hasTitle" },
				"isTemplate",
			];
			wp.hooks.applyFilters("catpow.blocks.banners.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);
		const selectiveItemClasses = useMemo(() => {
			const { imageKeys } = CP.config.banners;
			const selectiveItemClasses = [
				{
					name: "image",
					input: "picture",
					label: "画像",
					keys: imageKeys.image,
					devices,
				},
				{ name: "alt", input: "text", label: "alt", key: "alt" },
				{ name: "target", input: "text", label: "target", key: "target" },
				"event",
			];
			wp.hooks.applyFilters("catpow.blocks.banners.selectiveItemClasses", CP.finderProxy(selectiveItemClasses));
			return selectiveItemClasses;
		}, []);
		const itemTemplateSelectiveClasses = [{ input: "text", label: "画像", key: "imageCode" }];

		let rtn = [];
		const save = () => {
			setAttributes({ items: JSON.parse(JSON.stringify(items)) });
		};

		items.map((item, index) => {
			if (!item.controlClasses) {
				item.controlClasses = "control";
			}
			rtn.push(
				<CP.Item tag="li" set={setAttributes} attr={attributes} items={items} index={index} isSelected={isSelected} key={index}>
					{states.hasTitle && (
						<RichText
							tagName="h3"
							className="title"
							onChange={(title) => {
								item.title = title;
								save();
							}}
							value={item.title}
						/>
					)}
					<CP.Link.Edit className="link" attr={attributes} set={setAttributes} keys={linkKeys.link} index={index} isSelected={isSelected}>
						<CP.SelectResponsiveImage
							attr={attributes}
							set={setAttributes}
							keys={imageKeys.image}
							index={index}
							devices={devices}
							device={device === "pc" ? null : device}
							isTemplate={states.isTemplate}
						/>
					</CP.Link.Edit>
				</CP.Item>
			);
		});

		if (attributes.EditMode === undefined) {
			attributes.EditMode = false;
		}
		if (rtn.length < loopCount) {
			let len = rtn.length;
			while (rtn.length < loopCount) {
				rtn.push(rtn[rtn.length % len]);
			}
		}

		return (
			<>
				<CP.SelectModeToolbar set={setAttributes} attr={attributes} />
				<CP.SelectDeviceToolbar attr={attributes} set={setAttributes} devices={devices} />
				<InspectorControls>
					<CP.SelectClassPanel title="クラス" icon="art" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label="クラス" onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
					{states.isTemplate ? (
						<CP.SelectClassPanel
							title="テンプレート"
							icon="edit"
							set={setAttributes}
							attr={attributes}
							items={items}
							index={attributes.currentItemIndex}
							selectiveClasses={itemTemplateSelectiveClasses}
						/>
					) : (
						<CP.SelectClassPanel title="バナー" icon="edit" set={setAttributes} attr={attributes} items={items} index={attributes.currentItemIndex} selectiveClasses={selectiveItemClasses} />
					)}
					<CP.ItemControlInfoPanel />
				</InspectorControls>

				{EditMode ? (
					<div className="cp-altcontent">
						<div className="label">
							<Icon icon="edit" />
						</div>
						<CP.EditItemsTable
							set={setAttributes}
							attr={attributes}
							columns={[
								{ type: "text", key: "title", cond: states.hasTitle },
								{
									type: "image",
									label: "image",
									keys: imageKeys.image,
									cond: true,
								},
								{ type: "text", key: "imageCode", cond: states.isTemplate },
								{ type: "text", key: "alt", cond: true },
								{ type: "text", key: "linkUrl", cond: true },
								{ type: "text", key: "target", cond: true },
							]}
							isTemplate={states.isTemplate}
						/>
					</div>
				) : (
					<>
						{AltMode && doLoop ? (
							<div className="cp-altcontent">
								<div className="label">
									<Icon icon="welcome-comments" />
								</div>
								<InnerBlocks />
							</div>
						) : (
							<ul className={classes}>{rtn}</ul>
						)}
					</>
				)}
			</>
		);
	},
	save({ attributes, className }) {
		const { InnerBlocks, RichText } = wp.blockEditor;
		const { items = [], classes, loopParam, doLoop } = attributes;

		const states = CP.wordsToFlags(classes);
		const { devices, imageKeys, linkKeys } = CP.config.banners;

		return (
			<>
				<ul className={classes}>
					{items.map((item, index) => {
						return (
							<li className={item.classes} key={index}>
								{states.hasTitle && <RichText.Content tagName="h3" className="title" value={item.title} />}

								<CP.Link className="link" attr={attributes} keys={linkKeys.link} index={index} {...CP.extractEventDispatcherAttributes("catpow/banners", item)}>
									<CP.ResponsiveImage attr={attributes} keys={imageKeys.image} index={index} devices={devices} isTemplate={states.isTemplate} />
								</CP.Link>
							</li>
						);
					})}
				</ul>
				{doLoop && (
					<onEmpty>
						<InnerBlocks.Content />
					</onEmpty>
				)}
			</>
		);
	},
	deprecated: [
		{
			save({ attributes, className }) {
				const { items = [], classes, loopParam } = attributes;

				var states = CP.wordsToFlags(classes);
				const imageKeys = {
					image: {
						src: "src",
						srcset: "srcset",
						alt: "alt",
						code: "imageCode",
						items: "items",
					},
				};

				return (
					<ul className={classes}>
						{states.doLoop && "[loop_template " + loopParam + "]"}
						{items.map((item, index) => {
							return (
								<li className={item.classes}>
									{states.hasTitle && (
										<h3>
											<RichText.Content value={item.title} />
										</h3>
									)}
									<a href={item.linkUrl} target={item.target} data-event={item.event} rel={item.target ? "noopener noreferrer" : ""}>
										<CP.ResponsiveImage attr={attributes} keys={imageKeys.image} index={index} isTemplate={states.isTemplate} />
									</a>
								</li>
							);
						})}
						{states.doLoop && "[/loop_template]"}
					</ul>
				);
			},
			migrate(attributes) {
				var states = CP.wordsToFlags(classes);
				attributes.content_path = attributes.loopParam.split(" ")[0];
				attributes.query = attributes.loopParam.split(" ").slice(1).join("\n");
				attributes.doLoop = states.doLoop;
				return attributes;
			},
		},
	],
});
