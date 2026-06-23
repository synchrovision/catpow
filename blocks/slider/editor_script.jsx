const { __ } = wp.i18n;

import { debounce } from "catpow/util";
import { clsx } from "clsx";
import { useCallback } from "react";

CP.config.slider = {
	devices: ["tb", "sp"],
	imageKeys: {
		image: { src: "src", alt: "alt", code: "imageCode", items: "items" },
		slide: { src: "slideSrc", alt: "slideAlt", srscet: "slideSrcset", code: "slideCode", sources: "slideSources", items: "items" },
		backgroundImage: { src: "backgroundImageSrc", alt: "backgroundImageAlt", srcset: "backgroundImageSrcset", code: "backgroundImageCode", sources: "backgroundImageSources", items: "items" },
	},
	imageSizes: {
		image: "vga",
	},
	linkKeys: {
		link: { href: "linkUrl", items: "items" },
	},
};

wp.blocks.registerBlockType("catpow/slider", {
	transforms: {
		from: [
			{
				type: "block",
				blocks: CP.listedConvertibles,
				transform: (attributes) => {
					attributes.classes = "wp-block-catpow-slider is-type-card has-title has-text has-image";
					if (!attributes.config) {
						attributes.config = "{}";
					}
					return wp.blocks.createBlock("catpow/slider", attributes);
				},
			},
			{
				type: "block",
				blocks: ["catpow/datatable"],
				isMatch: ({ rows }) => {
					const block = wp.data.select("core/blocks").getBlockType("catpow/slider");
					return CP.isRowsConvertibleToItems(rows, block.attributes.items);
				},
				transform: (attributes) => {
					attributes.classes = "wp-block-catpow-slider story hasTitle hasText hasImage";
					const block = wp.data.select("core/blocks").getBlockType("catpow/slider");
					attributes.items = CP.convertRowsToItems(attributes.rows, block.attributes.items);
					return wp.blocks.createBlock("catpow/slider", attributes);
				},
			},
		],
	},

	example: CP.example,
	edit({ attributes, className, setAttributes, isSelected }) {
		const { useState, useMemo, useEffect } = wp.element;
		const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
		const { Icon, PanelBody, TextControl, TextareaControl } = wp.components;
		const { classes = "", vars, controlClasses = "", HeadingTag, config, items, doLoop, EditMode = false, AltMode = false, device } = attributes;

		const [blockEl, setBlockEl] = useState(false);

		const configData = useMemo(() => JSON.parse(config), [config]);
		if (configData.current === undefined) {
			configData.current = 0;
		}
		const { currentItemIndex = configData.current } = attributes;

		const states = CP.classNamesToFlags(classes);
		const controlStates = CP.classNamesToFlags(controlClasses);
		const { devices, imageKeys, imageSizes, linkKeys } = CP.config.slider;

		const selectiveClasses = useMemo(() => {
			const { devices, imageKeys, imageSizes } = CP.config.slider;
			const selectiveClasses = [
				"headingTag",
				"level",
				"hasContentWidth",
				"itemSize",
				"hasMargin",
				"hasPadding",
				"color",
				"colorScheme",
				{
					name: "type",
					label: "タイプ",
					values: { isTypeCarousel: "カルーセル", isTypeCard: "カード", isTypeFlat: "フラット" },
					filter: "type",
					type: "gridbuttons",
				},
				{ label: __("タイトル", "catpow"), values: "hasTitle" },
				{ label: __("キャプション", "catpow"), values: "hasCaption" },
				{ label: __("テキスト", "catpow"), values: "hasText" },
				{ label: __("リンク", "catpow"), values: "hasLink" },
				{ label: "アロー", values: "hasArrows" },
				{ label: "ドット", values: "hasDots" },
				{ input: "range", label: "初期スライド", json: "config", key: "current", min: 0, max: items.length - 1 },
				"isTemplate",
			];
			wp.hooks.applyFilters("catpow.blocks.slider.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);
		const animateClasses = [
			{
				input: "bool",
				label: "自動再生",
				json: "config",
				key: "autoPlay",
				sub: [
					{ input: "range", label: "自動再生間隔（秒）", json: "config", key: "interval", coef: 1000, min: 0.5, max: 10, step: 0.1 },
					{ input: "range", label: "手動操作後停止時間（秒）", json: "config", key: "wait", coef: 1000, min: 0, max: 60, step: 1 },
				],
			},
		];

		const save = () => {
			setAttributes({ items: JSON.parse(JSON.stringify(items)) });
		};

		const gotoItem = useCallback(
			(i) => {
				configData.current = (i + items.length) % items.length;
				setAttributes({ currentItemIndex: configData.current, config: JSON.stringify(configData) });
			},
			[configData],
		);
		const prevItem = useCallback(() => {
			gotoItem(configData.current - 1);
		}, [gotoItem]);
		const nextItem = useCallback(() => {
			gotoItem(configData.current + 1);
		}, [gotoItem]);
		const getRelativeIndex = (i, c, l) => {
			const h = l >> 1;
			return ((i - c + h + l) % l) - h;
		};
		const getPosClass = (index) => {
			const p = getRelativeIndex(index, currentItemIndex, items.length);
			if (p == 0) {
				return "is-active";
			}
			if (p == 1) {
				return "is-next";
			}
			if (p == -1) {
				return "is-prev";
			}
			if (p > 0) {
				return "is-after";
			}
			if (p < 0) {
				return "is-before";
			}
		};

		useEffect(() => {
			if (!blockEl) {
				return;
			}
			const contents = blockEl.querySelector(".wp-block-catpow-slider__contents");
			const items = [...contents.children];
			const scrollToMainItems = debounce((e) => {
				const scrollLeftMax = blockEl.scrollWidth - blockEl.clientWidth;
				const gap = contents.children[attributes.items.length].offsetLeft - contents.children[0].offsetLeft;
				const threasholdLeft = scrollLeftMax / 2 - gap / 2;
				const threasholdRight = threasholdLeft + gap;
				if (blockEl.scrollLeft < threasholdLeft) {
					blockEl.scrollTo({ left: blockEl.scrollLeft + gap, behavior: "instant" });
				} else if (blockEl.scrollLeft > threasholdRight) {
					blockEl.scrollTo({ left: blockEl.scrollLeft - gap, behavior: "instant" });
				}
			}, 160);
			const updateCssVars = () => {
				const startItem = items[0];
				const endItem = items[items.length - 1];
				const w = endItem.offsetLeft - startItem.offsetLeft;
				const u = w / (items.length - 1);
				const o = startItem.offsetLeft - blockEl.scrollLeft - (blockEl.offsetWidth - startItem.offsetWidth) / 2;
				const activeItemIndex = Math.floor((-o / w) * items.length);
				for (let i = 0; i < items.length; i++) {
					items[i].classList.toggle("is-prev", activeItemIndex === i - 1);
					items[i].classList.toggle("is-active", activeItemIndex === i);
					items[i].classList.toggle("is-next", activeItemIndex === i + 1);
					items[i].style.setProperty("--cp-slider-item-position", o + u * i);
				}
				gotoItem(activeItemIndex % attributes.items.length);
			};
			blockEl.addEventListener("scroll", scrollToMainItems);
			blockEl.addEventListener("scroll", updateCssVars);
			updateCssVars();
			return () => {
				blockEl.removeEventListener("scroll", scrollToMainItems);
				blockEl.removeEventListener("scroll", updateCssVars);
			};
		}, [blockEl, items, gotoItem]);

		const blockProps = useBlockProps({ className: EditMode || AltMode ? "cp-altcontent" : classes, style: vars });

		return (
			<>
				<CP.SelectModeToolbar set={setAttributes} attr={attributes} />
				<InspectorControls>
					<CP.SelectClassPanel title="クラス" icon="art" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} />
					<CP.SelectClassPanel title="アニメーション設定" icon="video-alt3" set={setAttributes} attr={attributes} selectiveClasses={animateClasses} />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label="クラス" onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
					<CP.SelectClassPanel
						title="スライド"
						icon="edit"
						set={setAttributes}
						attr={attributes}
						items={items}
						index={attributes.currentItemIndex}
						triggerClasses={selectiveClasses.find(({ item }) => !!item)}
					/>
					<CP.ItemControlInfoPanel />
				</InspectorControls>
				{attributes.EditMode ? (
					<div {...blockProps}>
						<CP.Label icon="edit" />
						<CP.EditItemsTable
							set={setAttributes}
							attr={attributes}
							columns={[
								{ type: "picture", label: "slide", keys: imageKeys.slide, devices, cond: states.hasSlide },
								{ type: "text", key: "slideCode", cond: states.isTemplate && states.hasSlide },
								{ type: "image", label: "image", keys: imageKeys.image, cond: states.hasImage },
								{ type: "text", key: "imageCode", cond: states.isTemplate && states.hasImage },
								{ type: "picture", label: "bg", keys: imageKeys.backgroundImage, devices, cond: states.hasBackgroundImage },
								{ type: "text", key: "backgroundImageCode", cond: states.isTemplate && states.hasBackgroundImage },
								{ type: "text", key: "title", cond: states.hasTitle },
								{ type: "text", key: "caption", cond: states.hasCaption },
								{ type: "text", key: "text", cond: states.hasText },
								{ type: "text", key: "linkText", cond: states.hasLink },
								{ type: "text", key: "linkUrl", cond: states.hasLink },
							]}
							isTemplate={states.isTemplate}
						/>
					</div>
				) : (
					<>
						{AltMode && doLoop ? (
							<div {...blockProps}>
								<CP.Label icon="welcome-comments" />
								<InnerBlocks />
							</div>
						) : (
							<CP.Bem prefix="wp-block-catpow">
								<div {...blockProps} ref={setBlockEl}>
									<ul className="_contents">
										{[0, 1, 2].map(() =>
											items.map((item, index) => {
												return (
													<CP.Item tag="li" className={clsx(item.classes, getPosClass(index))} set={setAttributes} attr={attributes} items={items} index={index} key={index}>
														<div className="_body">
															{states.hasImage && (
																<div className="_image">
																	<CP.SelectResponsiveImage className="_img" attr={attributes} set={setAttributes} keys={imageKeys.image} index={index} isTemplate={states.isTemplate} />
																</div>
															)}
															{(states.hasTitle || states.hasCaption || states.hasText || states.hasLink) && (
																<div className="_texts">
																	{states.hasTitle && (
																		<RichText
																			tagName={HeadingTag}
																			className="_title"
																			onChange={(title) => {
																				item.title = title;
																				save();
																			}}
																			value={item.title}
																			placeholder="Title"
																		/>
																	)}
																	{states.hasCaption && (
																		<RichText
																			tagName="p"
																			className="_caption"
																			onChange={(caption) => {
																				item.caption = caption;
																				save();
																			}}
																			value={item.caption}
																			placeholder="Caption"
																		/>
																	)}
																	{states.hasText && (
																		<RichText
																			tagName="p"
																			className="_text"
																			onChange={(text) => {
																				item.text = text;
																				save();
																			}}
																			value={item.text}
																			placeholder="Text"
																		/>
																	)}
																	{states.hasLink && (
																		<CP.Link.Edit className="_link" attr={attributes} set={setAttributes} keys={linkKeys.link} index={index} isSelected={isSelected}>
																			<RichText
																				onChange={(linkText) => {
																					item.linkText = linkText;
																					save();
																				}}
																				value={item.linkText}
																				placeholder="Link"
																			/>
																		</CP.Link.Edit>
																	)}
																</div>
															)}
														</div>
													</CP.Item>
												);
											}),
										)}
									</ul>
									<div className={controlClasses} data-config={config}>
										{states.hasArrows && <div className="_arrow is-arrow-prev" onClick={prevItem}></div>}
										{states.hasDots && (
											<ul className="_dots">
												{items.map((item, index) => {
													return <li className={clsx("_dot", getPosClass(index))} onClick={() => gotoItem(index)} key={index}></li>;
												})}
											</ul>
										)}
										{states.hasArrows && <div className="_arrow is-arrow-next" onClick={nextItem}></div>}
									</div>
								</div>
							</CP.Bem>
						)}
					</>
				)}
			</>
		);
	},
	save({ attributes, className }) {
		const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;
		const { vars, classes = "", controlClasses = "", HeadingTag, config, items = [], doLoop } = attributes;

		const states = CP.classNamesToFlags(classes);
		const { devices, imageKeys, imageSizes, linkKeys } = CP.config.slider;

		const blockProps = useBlockProps.save({
			className: classes,
			style: vars,
			"data-wp-interactive": "catpow/slider",
			"data-wp-context": config,
			"data-wp-init": "callbacks.initBlock",
		});

		return (
			<>
				<CP.Bem prefix="wp-block-catpow">
					<div {...blockProps}>
						<ul className="_contents">
							{items.map((item, index) => (
								<li className={item.classes} key={index}>
									<div className="_body">
										{states.hasImage && (
											<div className="_image">
												<CP.ResponsiveImage className="_img" attr={attributes} keys={imageKeys.image} index={index} isTemplate={states.isTemplate} />
											</div>
										)}
										{(states.hasTitle || states.hasCaption || states.hasText || states.hasLink) && (
											<div className="_texts">
												{states.hasTitle && <RichText.Content tagName={HeadingTag} className="_title" value={item.title} />}
												{states.hasCaption && <RichText.Content tagName="p" className="_caption" value={item.caption} />}
												{states.hasText && <RichText.Content tagName="p" className="_text" value={item.text} />}
												{states.hasLink && (
													<CP.Link className="_link" attr={attributes} keys={linkKeys.link} index={index}>
														<RichText.Content value={item.linkText} />
													</CP.Link>
												)}
											</div>
										)}
									</div>
								</li>
							))}
						</ul>
						<div className={controlClasses} data-config={config}>
							{states.hasArrows && <div className="_arrow is-arrow-prev" data-wp-on--click="actions.prev"></div>}
							{states.hasDots && (
								<ul className="_dots">
									{items.map((item, index) => (
										<li className="_dot" data-wp-on--click="actions.onClickItem" data-wp-class--is-active="callbacks.isActive" data-index={index}></li>
									))}
								</ul>
							)}
							{states.hasArrows && <div className="_arrow is-arrow-next" data-wp-on--click="actions.next"></div>}
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
