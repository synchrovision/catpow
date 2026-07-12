import { clsx } from "clsx";

CP.config.lightbox = {
	imageKeys: {
		thumbnail: {
			src: "thumbnailSrc",
			alt: "thumbnailAlt",
			code: "thumbnailCode",
			items: "items",
		},
		sliderImage: { src: "src", alt: "alt", code: "imageCode", items: "items" },
	},
};

wp.blocks.registerBlockType("catpow/lightbox", {
	title: "🐾 Lightbox",
	description: "クリックでポップアップ表示する画像です。",
	icon: "editor-ul",
	category: "catpow",
	transforms: {
		from: [
			{
				type: "block",
				blocks: CP.listedConvertibles,
				transform: (attributes) => {
					attributes.classes = "wp-block-catpow-lightbox is-level3 is-type-flat has-title has-caption";
					return wp.blocks.createBlock("catpow/lightbox", attributes);
				},
			},
		],
	},
	example: CP.example,
	edit({ attributes, className, setAttributes, isSelected }) {
		const { useState, useMemo } = wp.element;
		const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
		const { Icon, PanelBody, TextareaControl } = wp.components;
		const {
			items = [],
			classes,
			vars,
			sliderVars,
			HeadingTag,
			SliderHeadingTag,
			sliderClasses,
			blockState,
			loopCount,
			doLoop,
			EditMode = false,
			AltMode = false,
			OpenMode = false,
			currentItemIndex = 0,
		} = attributes;
		const { imageKeys } = CP.config.lightbox;

		const states = CP.classNamesToFlags(classes);
		const sliderStates = CP.classNamesToFlags(sliderClasses);

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				"headingTag",
				"level",
				"color",
				"colorScheme",
				"hasContentWidth",
				"hasMargin",
				{
					name: "type",
					type: "buttons",
					label: "タイプ",
					values: { isTypeThumbnail: "サムネール", isTypeFlat: "フラット", isTypeCard: "カード" },
					sub: {
						isTypeFlat: ["itemSize"],
						isTypeCard: ["itemSize"],
					},
				},
				{ name: "title", label: "タイトル", values: "hasTitle" },
				{
					name: "hasCaption",
					label: "キャプション",
					values: "hasCaption",
				},
				{ preset: "hasContentWidth", label: "スライダー幅", classKey: "sliderClasses", vars: "sliderVars" },
				{ preset: "level", label: "スライダーレベル", classKey: "sliderClasses" },
				{ name: "sliderTitle", label: "スライダータイトル", classKey: "sliderClasses", values: "hasTitle", sub: [{ preset: "headingTag", key: "SliderHeadingTag", classKey: "sliderClasses" }] },
				{ name: "sliderImage", label: "スライダー画像", classKey: "sliderClasses", values: "hasImage" },
				{ name: "sliderText", label: "スライダーテキスト", classKey: "sliderClasses", values: "hasText" },
				"isTemplate",
			];
			wp.hooks.applyFilters("catpow.blocks.lightbox.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);
		const selectiveItemClasses = useMemo(() => {
			const selectiveItemClasses = [
				{
					name: "image",
					input: "image",
					label: "画像",
					keys: imageKeys.sliderIimage,
					isTemplate: states.isTemplate,
				},
				{
					name: "imageCode",
					input: "text",
					label: "画像コード",
					key: "imageCode",
					cond: states.isTemplate,
				},
				{
					name: "",
					input: "image",
					label: "サムネール画像",
					keys: imageKeys.thumbnail,
					isTemplate: states.isTemplate,
				},
				{
					name: "thumbnailCode",
					input: "text",
					label: "サムネール画像コード",
					key: "thumbnailCode",
					cond: states.isTemplate,
				},
			];
			wp.hooks.applyFilters("catpow.blocks.lightbox.selectiveItemClasses", CP.finderProxy(selectiveItemClasses));
			return selectiveItemClasses;
		}, []);

		const save = () => {
			setAttributes({ items: JSON.parse(JSON.stringify(items)) });
		};
		const goto = (index) => {
			setAttributes({ currentItemIndex: Math.max(0, Math.min(index, items.length - 1)) });
		};

		const blockProps = useBlockProps({ className: OpenMode ? "cp-lightbox-preview" : EditMode || (AltMode && doLoop) ? "cp-altcontent" : classes });

		return (
			<>
				<CP.SelectModeToolbar set={setAttributes} attr={attributes} modes={["EditMode", "AltMode", "OpenMode"]} />
				<InspectorControls>
					<CP.SelectClassPanel title="クラス" icon="art" {...{ setAttributes, attributes }} selectiveClasses={selectiveClasses} />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label="クラス" onChange={(classes) => setAttributes({ classes })} value={classes} />
						<TextareaControl label="ボックスクラス" onChange={(sliderClasses) => setAttributes({ sliderClasses })} value={sliderClasses} />
					</PanelBody>
					<CP.SelectClassPanel title="リストアイテム" icon="edit" {...{ setAttributes, attributes }} itemKeys={["items", attributes.currentItemIndex]} selectiveClasses={selectiveItemClasses} />
					<CP.ItemControlInfoPanel />
				</InspectorControls>
				{!OpenMode ? (
					<>
						{EditMode ? (
							<div {...blockProps}>
								<div className="label">
									<Icon icon="edit" />
								</div>
								<CP.EditItemsTable
									set={setAttributes}
									attr={attributes}
									columns={[
										{
											type: "image",
											label: "thumbnail",
											keys: imageKeys.thumbnail,
										},
										{
											type: "text",
											key: "thumbnailCode",
											cond: states.isTemplate,
										},
										{ type: "text", key: "title", cond: states.hasTitle },
										{
											type: "text",
											key: "caption",
											cond: states.hasCaption,
										},
										{
											type: "image",
											label: "image",
											keys: imageKeys.sliderImage,
											cond: sliderStates.hasImage,
										},
										{
											type: "text",
											key: "imageCode",
											cond: states.isTemplate && sliderStates.hasImage,
										},
										{ type: "text", key: "sliderTitle", cond: sliderStates.hasTitle },
										{ type: "text", key: "sliderText", cond: sliderStates.hasText },
									]}
									isTemplate={states.isTemplate}
								/>
							</div>
						) : (
							<>
								{AltMode && doLoop ? (
									<div {...blockProps}>
										<div className="label">
											<Icon icon="welcome-comments" />
										</div>
										<InnerBlocks />
									</div>
								) : (
									<CP.Bem prefix="wp-block-catpow">
										<div {...blockProps}>
											<ul className="_items">
												{[...Array(Math.max(items.length, loopCount)).keys()].map((i) => {
													const index = i % items.length;
													const item = items[index];
													if (!item.controlClasses) {
														item.controlClasses = "control";
													}
													return (
														<CP.Item tag="li" className={item.classes} {...{ setAttributes, attributes }} itemKeys={["items", index]} key={index}>
															<div className="_image">
																<CP.SelectResponsiveImage className="_img" attr={attributes} set={setAttributes} keys={imageKeys.thumbnail} index={index} size="vga" isTemplate={states.isTemplate} />
															</div>
															{states.hasTitle && (
																<div className="_text">
																	<RichText
																		tagName={HeadingTag}
																		className="_title"
																		onChange={(text) => {
																			item.title = text;
																			save();
																		}}
																		value={item.title}
																	/>
																	{states.hasCaption && (
																		<RichText
																			tagName="p"
																			className="_caption"
																			onChange={(text) => {
																				item.caption = text;
																				save();
																			}}
																			value={item.caption}
																		/>
																	)}
																</div>
															)}
														</CP.Item>
													);
												})}
											</ul>
										</div>
									</CP.Bem>
								)}
							</>
						)}
					</>
				) : (
					<CP.Bem prefix="wp-block-catpow">
						<div {...blockProps}>
							<div className={sliderClasses} style={sliderVars}>
								<ul className="_items">
									{items.map((item, index) => {
										var isActive = currentItemIndex == index;
										return (
											<li className={clsx("_item", { "is-active": isActive })} key={index}>
												<div className="wp-block-catpow-lightbox__contents">
													{sliderStates.hasTitle && (
														<RichText
															className="_title"
															tagName={SliderHeadingTag}
															onChange={(subTitle) => {
																items[index].subTitle = subTitle;
																setAttributes({ items: items });
															}}
															value={item.subTitle}
															placeholder="SubTitle"
														/>
													)}
													{sliderStates.hasImage && (
														<div className="_image">
															<CP.SelectResponsiveImage className="_img" attr={attributes} set={setAttributes} keys={imageKeys.sliderImage} index={index} size="full" isTemplate={states.isTemplate} />
														</div>
													)}
													{sliderStates.hasText && (
														<RichText
															tagName="div"
															className="_text"
															onChange={(text) => {
																items[index].text = text;
																setAttributes({ items: items });
															}}
															value={item.text}
														/>
													)}
												</div>
											</li>
										);
									})}
								</ul>
								<div className="_control">
									<div className={clsx("_prev", { "is-active": currentItemIndex > 0 })} onClick={() => goto(currentItemIndex - 1)}></div>
									<ul className="_dots is-active">
										{items.map((item, index) => (
											<li className={clsx("_dot", { "is-active": currentItemIndex == index })} data-index={index} onClick={() => goto(index)}></li>
										))}
									</ul>
									<div className={clsx("_next", { "is-active": currentItemIndex < items.length - 1 })} onClick={() => goto(currentItemIndex + 1)}></div>
									<div className="_close"></div>
								</div>
							</div>
						</div>
					</CP.Bem>
				)}
			</>
		);
	},
	save({ attributes, className }) {
		const { InnerBlocks, RichText } = wp.blockEditor;
		const { items = [], classes = "", vars, sliderVars, HeadingTag, SliderHeadingTag, sliderClasses, blockState, doLoop } = attributes;

		var states = CP.classNamesToFlags(classes);
		var sliderStates = CP.classNamesToFlags(sliderClasses);

		const { imageKeys } = CP.config.lightbox;
		const context = {
			blockId: "{$uid}",
			length: items.length,
		};

		return (
			<>
				<CP.Bem prefix="wp-block-catpow">
					<div
						className={classes}
						data-wp-interactive="catpow/lightbox"
						data-wp-context={JSON.stringify(context)}
						data-wp-init="callbacks.initBlock"
						data-wp-style----current="callbacks.getCurrentIndex"
						style={{ ...vars, "--length": items.length, "--current": -1 }}
					>
						<ul className="_items">
							{items.map((item, index) => {
								return (
									<li
										className={item.classes}
										data-index={index}
										data-wp-on--click="actions.open"
										data-wp-class--is-active="callbacks.isCurrent"
										aria-controls={`{$uid}-slide-${index}`}
										data-wp-bind--aria-selected="callbacks.isCurrent"
										key={index}
									>
										<div className="_image">
											<CP.ResponsiveImage className="_img" attr={attributes} keys={imageKeys.thumbnail} index={index} isTemplate={states.isTemplate} />
										</div>
										{states.hasTitle && (
											<div className="_text">
												<RichText.Content tagName={HeadingTag} className="_title" value={item.title} />
												{states.hasCaption && <RichText.Content tagName="p" className="_caption" value={item.caption} />}
											</div>
										)}
										<div className="contents_">
											{sliderStates.hasTitle && <RichText.Content tagName={SliderHeadingTag} className="_title" value={item.subTitle} />}
											{sliderStates.hasImage && (
												<div className="_image">
													<CP.ResponsiveImage className="_img" attr={attributes} keys={imageKeys.sliderImage} index={index} isTemplate={states.isTemplate} />
												</div>
											)}
											{sliderStates.hasText && <RichText.Content tagName="div" className="_text" value={item.text} />}
										</div>
									</li>
								);
							})}
						</ul>
						<div id="{$uid}" className={sliderClasses} style={sliderVars}>
							<ul className="_items">
								{items.map((item, index) => {
									return (
										<li id={`{$uid}-slide-${index}`} className="_item" data-index={index} data-wp-class--is-active="callbacks.isCurrent" data-wp-bind--inert="!callbacks.isCurrent" key={index}></li>
									);
								})}
							</ul>
							<div className="_control">
								<div className="_prev" data-wp-class--is-active="callbacks.hasPrev" data-wp-on--click="actions.prev"></div>
								<ul className="_dots" data-wp-class--is-active="callbacks.hasDots">
									{items.map((item, index) => (
										<li
											className="_dot"
											data-index={index}
											data-wp-class--is-active="callbacks.isCurrent"
											data-wp-on--click="actions.goto"
											aria-controls={`{$uid}-slide-${index}`}
											data-wp-bind--aria-selected="callbacks.isCurrent"
											style={{ "--index": index }}
											key={index}
										></li>
									))}
								</ul>
								<div className="_next" data-wp-class--is-active="callbacks.hasNext" data-wp-on--click="actions.next"></div>
							</div>
						</div>
					</div>
				</CP.Bem>
				{doLoop && (
					<on-empty>
						<InnerBlocks.Content />
					</on-empty>
				)}
			</>
		);
	},
});
