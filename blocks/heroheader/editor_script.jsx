import { useChangeEffect } from "catpow/hooks";
const { __ } = wp.i18n;

CP.config.heroheader = {
	devices: ["tb", "sp"],
	linkKeys: {
		link: { href: "href", items: "buttons" },
	},
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
		const { devices, imageKeys, linkKeys } = CP.config.heroheader;

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				{
					name: "layout",
					label: __("レイアウト", "catpow"),
					type: "gridbuttons",
					values: { hasLayoutSplitted: __("分割", "catpow"), hasLayoutOverlay: __("上掛", "catpow") },
					sub: {
						hasLayoutSplitted: [
							{ name: "sp", type: "buttons", label: __("テキスト位置（SP）", "catpow"), values: { hasTextTop: __("上", "catpow"), hasTextBottom: __("下", "catpow") } },
							{ name: "pc", type: "buttons", label: __("テキスト位置（PC）", "catpow"), values: { hasTextLeft: __("左", "catpow"), hasTextRight: __("右", "catpow") } },
							{
								name: "imageBorder",
								type: "buttons",
								label: __("画像境界", "catpow"),
								values: { hasImageBorderFade: __("ぼかし", "catpow"), hasImageBorderSlope: __("傾斜", "catpow"), hasImageBorderEllipse: __("楕円", "catpow") },
							},
							{ name: "amount", input: "range", min: -100, max: 100, step: 10, vars: "vars", key: "--cp-image-border-amount" },
						],
						hasLayoutOverlay: [
							{
								name: "hasTextBackground",
								label: __("テキスト背景", "catpow"),
								values: "hasTextBackground",
								sub: [
									{
										name: "textBackground",
										type: "buttons",
										values: { hasTextBackgroundFade: __("ぼかし", "catpow"), hasTextBackgroundSlope: __("傾斜", "catpow"), hasTextBackgroundEllipse: __("楕円", "catpow") },
									},
								],
							},
						],
					},
				},

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

		const blockProps = useBlockProps({ className: EditMode ? "cp-altcontent" : classes, style: CP.convertCssVarsForPreview(vars) });

		return (
			<>
				<InspectorControls>
					<CP.SelectClassPanel title={__("スタイル", "catpow")} icon="art" {...{ setAttributes, attributes }} selectiveClasses={selectiveClasses} />
					{states.hasButtons && (
						<CP.SelectClassPanel
							title={__("ボタン", "catpow")}
							icon="edit"
							{...{ setAttributes, attributes }}
							itemKeys={["buttons", attributes.currentItemIndex]}
							selectiveClasses={["buttonParams"]}
						/>
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
						<div {...blockProps}>
							<div className={bodyClasses} ref={setRef}>
								<div className="_texts">
									<RichText
										tagName={HeadingTag}
										className="_title"
										placeholder={__("タイトルを入力", "catpow")}
										onChange={(title) => {
											setAttributes({ title });
										}}
										value={title}
									/>
									<RichText
										tagName="p"
										className="_text"
										placeholder={__("テキストを入力", "catpow")}
										onChange={(text) => {
											setAttributes({ text });
										}}
										value={text}
									/>
								</div>
								{states.hasButtons && (
									<div className="_buttons cp-buttons">
										{buttons.map((button, index) => (
											<CP.Button.Edit tag="li" isItem={true} {...{ setAttributes, attributes }} itemKeys={["buttons", index]} keys={linkKeys} key={index} />
										))}
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
		const states = CP.classNamesToFlags(classes);
		const { devices, imageKeys, linkKeys } = CP.config.heroheader;

		return (
			<>
				<script type="module" src={heroheaderSelectiveClasses.mjs[Element]} />
				<CP.Bem prefix="wp-block-catpow">
					<div {...useBlockProps.save({ className: classes, style: vars })}>
						<div className={bodyClasses}>
							<div className="_texts">
								<RichText.Content tagName={HeadingTag} className="_title" value={title} />
								<RichText.Content tagName="p" className="_text" value={text} />
							</div>
							{states.hasButtons && (
								<ul className="_buttons">
									{buttons.map((button, index) => (
										<CP.Button tag="li" blockTypeName="catpow/buttons" {...{ attributes }} itemKeys={["buttons", index]} keys={linkKeys} key={index} />
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
