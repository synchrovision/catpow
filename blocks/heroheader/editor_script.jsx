import { useChangeEffect } from "catpow/hooks";
const { __ } = wp.i18n;
CP.config.heroheader = {
	devices: ["tb", "sp"],
	imageKeys: {
		bgImages: { src: "src", alt: "alt", sources: "sources", items: "images" },
	},
};
wp.blocks.registerBlockType("catpow/heroheader", {
	title: "🐾 HeroHeader",
	description: __("ページの最初に表示するヘッダのブロックです。", "catpow"),
	icon: "welcome-widgets-menus",
	category: "catpow-parts",
	example: CP.example,
	edit({ attributes, setAttributes }) {
		const { isTemplate, classes, bodyClasses, vars, params, HeadingTag, title, text, buttons, images, element: Element = "div", EditMode = false } = attributes;
		const { useState, useMemo, useEffect, useRef } = wp.element;
		const { InspectorControls, RichText, useBlockProps } = wp.blockEditor;
		const states = CP.classNamesToFlags(attributes.classes);
		const [ref, setRef] = useState(null);
		const { devices, imageKeys } = CP.config.heroheader;

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				{ name: "hasTextBackground", label: __("テキスト背景", "catpow"), values: "hasTextBackground", classKey: "bodyClasses" },
				{ preset: "textAlign", classKey: "bodyClasses" },
				{ preset: "alignContent", classKey: "bodyClasses" },
				"hasButtons",
				{ preset: "itemSize", cond: ({ hasButtons }) => hasButtons, classKey: "bodyClasses" },
				{
					name: "blendmode",
					label: __("スライダーブレンドモード", "catpow"),
					vars: "vars",
					key: "--cp-slider-blendmode",
					input: "blendmode",
				},
				{
					name: "opacity",
					label: __("スライダー不透明度", "catpow"),
					vars: "vars",
					key: "--cp-slider-opacity",
					input: "range",
					min: 0,
					max: 1,
					step: 0.1,
				},
				heroheaderSelectiveClasses,
				{ input: "pictures", label: __("スライドショー画像", "catpow"), key: "images", keys: imageKeys.bgImages },
			];
			wp.hooks.applyFilters("catpow.blocks.heroheader.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		useEffect(() => {
			if (!Element || !ref) {
				return;
			}
			const doc = ref.ownerDocument;
			if (![...doc.scripts].find(({ src }) => src === heroheaderSelectiveClasses.mjs[Element])) {
				const script = doc.createElement("script");
				script.src = heroheaderSelectiveClasses.mjs[Element];
				script.type = "module";
				doc.head.appendChild(script);
			}
		}, [Element, ref]);

		useChangeEffect(() => {
			setAttributes({ params: { ...heroheaderSelectiveClasses.sub[Element][0].default, ...params } });
		}, [Element]);

		const blockProps = useBlockProps({ className: EditMode ? "cp-altcontent" : attributes.classes, style: CP.convertCssVarsForPreview(vars) });

		return (
			<>
				<InspectorControls>
					<CP.SelectClassPanel title={__("スタイル", "catpow")} icon="art" {...{ setAttributes, attributes }} selectiveClasses={selectiveClasses} />
					{states.hasButtons && (
						<CP.SelectClassPanel title={__("ボタン", "catpow")} icon="edit" {...{ setAttributes, attributes }} itemKeys={["buttons", attributes.currentItemIndex]} selectiveClasses={["buttonParams"]} />
					)}
				</InspectorControls>
				<CP.SelectModeToolbar setAttributes={setAttributes} attributes={attributes} />
				{EditMode ? (
					<div {...blockProps}>
						<CP.Label icon="edit" />
						<CP.EditItemsTable
							setAttributes={setAttributes}
							attributes={attributes}
							itemKeys={["buttons"]}
							columns={[
								{ type: "icon", label: "icon" },
								{ type: "text", key: "text" },
							]}
							isTemplate={isTemplate}
						/>
					</div>
				) : (
					<CP.Bem prefix="wp-block-catpow">
						<div {...blockProps} ref={setRef}>
							<div className={bodyClasses}>
								<div className="_texts">
									<RichText
										tagName={HeadingTag}
										className="_title"
										placeholder={__("タイトルを入力", "catpow")}
										onChange={(title) => {
											setAttributes({ title });
										}}
										value={attributes.title}
									/>
									<RichText
										tagName="p"
										className="_text"
										placeholder={__("テキストを入力", "catpow")}
										onChange={(text) => {
											setAttributes({ text });
										}}
										value={attributes.text}
									/>
								</div>
								{states.hasButtons && (
									<div className="_buttons cp-buttons">
										{buttons.map((button, index) => {
											const itemStates = CP.classNamesToFlags(button.classes);
											return (
												<CP.Item tag="li" className={button.classes} {...{ setAttributes, attributes }} itemKeys={["buttons", index]} key={index}>
													{states.hasMicroCopy && (
														<RichText
															tagName="span"
															className="_copy cp-button__copy"
															placeholder={__("テキストを入力", "catpow")}
															onChange={(copy) => {
																button.copy = copy;
																setAttributes({ buttons: [...buttons] });
															}}
															value={button.copy}
														/>
													)}
													<CP.Link.Edit
														className="_link cp-button__link"
														setAttributes={setAttributes}
														attributes={attributes}
														keys={{ items: "buttons", href: "linkUrl" }}
														itemKeys={["buttons", index]}
													>
														{itemStates.hasIcon && <CP.OutputIcon className="_icon cp-button__link-icon" item={button} />}
														<RichText
															tagName="span"
															className="_text cp-button__link-text"
															placeholder={__("テキストを入力", "catpow")}
															onChange={(text) => {
																button.text = text;
																setAttributes({ buttons: [...buttons] });
															}}
															value={button.text}
														/>
													</CP.Link.Edit>
													{states.hasCaption && (
														<RichText
															tagName="span"
															className="_caption cp-button__caption"
															placeholder={__("テキストを入力", "catpow")}
															onChange={(caption) => {
																button.caption = caption;
																setAttributes({ buttons: [...buttons] });
															}}
															value={button.caption}
														/>
													)}
												</CP.Item>
											);
										})}
									</div>
								)}
							</div>
							<Element class="wp-block-catpow-heroheader__bg" className="_bg" {...params}>
								{images.map((image, index) => (
									<CP.ResponsiveImage className="_picture" attributes={attributes} keys={imageKeys.bgImages} itemKeys={["images", index]} devices={devices} key={index} />
								))}
							</Element>
						</div>
					</CP.Bem>
				)}
			</>
		);
	},

	save({ attributes }) {
		const { classes, bodyClasses, vars, params, HeadingTag, title, text, buttons, images, element: Element = "div" } = attributes;
		const { RichText, useBlockProps } = wp.blockEditor;
		const states = CP.classNamesToFlags(attributes.classes);
		const { devices, imageKeys } = CP.config.heroheader;

		return (
			<>
				<script type="module" src={heroheaderSelectiveClasses.mjs[Element]} />
				<CP.Bem prefix="wp-block-catpow">
					<div {...useBlockProps.save({ className: attributes.classes, style: vars })}>
						<div className={bodyClasses}>
							<div className="_texts">
								<RichText.Content tagName={HeadingTag} className="_title" value={attributes.title} />
								<RichText.Content tagName="p" className="_text" value={attributes.text} />
							</div>
							{states.hasButtons && (
								<ul className="_buttons">
									{buttons.map((button, index) => (
										<li className={button.classes} key={index}>
											{states.hasMicroCopy && <span className="_copy cp-button__copy">{button.copy}</span>}
											<CP.Link
												className="_link cp-button__link"
												attributes={attributes}
												keys={{ items: "buttons", href: "href" }}
												itemKeys={["buttons", index]}
												{...CP.extractEventDispatcherAttributes("catpow/heroheader", button, ["buttons"])}
											>
												<CP.OutputIcon className="_icon cp-button__link-icon" item={button} />
												<RichText.Content tagName="span" className="_text cp-button__link-text" value={button.text} />
											</CP.Link>
											{states.hasCaption && <span className="_caption cp-button__caption">{button.caption}</span>}
										</li>
									))}
								</ul>
							)}
						</div>
						<Element className="_bg" {...params}>
							{images.map((image, index) => (
								<CP.ResponsiveImage className="_picture" attributes={attributes} keys={imageKeys.bgImages} itemKeys={["images", index]} devices={devices} />
							))}
						</Element>
					</div>
				</CP.Bem>
			</>
		);
	},
});
