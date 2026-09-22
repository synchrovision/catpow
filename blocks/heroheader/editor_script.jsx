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
				{ preset: "colorScheme", label: __("テキスト配色", "catpow"), classKey: "bodyClasses" },
				{
					name: "hasTextBackground",
					label: __("テキスト背景", "catpow"),
					values: "hasTextBackground",
					sub: [
						{
							name: "textBackground",
							type: "buttons",
							values: {
								hasTextBackgroundFade: __("ぼかし", "catpow"),
								hasTextBackgroundBelt: __("帯", "catpow"),
								hasTextBackgroundRect: __("矩形", "catpow"),
								hasTextBackgroundCircle: __("円", "catpow"),
							},
						},
						{
							name: "blendmode",
							label: __("ブレンドモード", "catpow"),
							vars: "vars",
							key: "--cp-text-background-blendmode",
							input: "blendmode",
						},
						{ name: "opacity", label: __("不透明度", "catpow"), input: "range", min: 0, max: 1, step: 0.1, vars: "vars", key: "--cp-text-background-opacity" },
					],
				},
				{ preset: "align", classKey: "bodyClasses" },
				{ preset: "verticalAlign", classKey: "bodyClasses" },
				{ preset: "textAlign", classKey: "bodyClasses" },
				"hasButtons",
				{ preset: "itemSize", cond: ({ hasButtons }) => hasButtons, classKey: "bodyClasses" },
			];
			wp.hooks.applyFilters("catpow.blocks.heroheader.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);
		const sliderSelectiveClasses = useMemo(() => {
			const sliderSelectiveClasses = [
				{ name: "sliderFixed", label: __("固定", "catpow"), values: "hasSliderFixed" },
				{
					name: "sliderSplit",
					label: __("切抜", "catpow"),
					values: "hasSliderSplit",
					sub: [
						{
							name: "sliderSize",
							label: __("サイズ", "catpow"),
							vars: "vars",
							key: "--cp-slider-size",
							input: "range",
							min: 0,
							max: 100,
							step: 10,
						},
						{ name: "sp", type: "buttons", label: __("位置（SP）", "catpow"), values: { hasSliderTop: __("上", "catpow"), hasSliderBottom: __("下", "catpow") } },
						{ name: "pc", type: "buttons", label: __("位置（PC）", "catpow"), values: { hasSliderLeft: __("左", "catpow"), hasSliderRight: __("右", "catpow") } },
						{
							name: "sliderBorder",
							label: __("境界効果", "catpow"),
							values: "hasSliderBorder",
							sub: [
								{
									type: "buttons",
									values: { hasSliderBorderFade: __("ぼかし", "catpow"), hasSliderBorderSlope: __("傾斜", "catpow"), hasSliderBorderEllipse: __("楕円", "catpow") },
									sub: {
										hasSliderBorderSlope: [
											{ label: __("方向（SP）", "catpow"), type: "buttons", values: { hasSliderBorderSlopeLeft: __("左", "catpow"), hasSliderBorderSlopeRight: __("右", "catpow") } },
											{ label: __("方向（PC）", "catpow"), type: "buttons", values: { hasSliderBorderSlopeTop: __("上", "catpow"), hasSliderBorderSlopeBottom: __("下", "catpow") } },
										],
										hasSliderBorderEllipse: [{ type: "buttons", values: { hasSliderBorderEllipseInside: __("内", "catpow"), hasSliderBorderEllipseOutside: __("外", "catpow") } }],
									},
								},
								{ name: "amount", input: "range", min: 0, max: 100, step: 10, vars: "vars", key: "--cp-slider-border-amount" },
							],
						},
					],
				},
				{
					name: "blendmode",
					label: __("ブレンドモード", "catpow"),
					vars: "vars",
					key: "--cp-slider-blendmode",
					input: "blendmode",
				},
				{
					name: "opacity",
					label: __("不透明度", "catpow"),
					vars: "vars",
					key: "--cp-slider-opacity",
					input: "range",
					min: 0,
					max: 1,
					step: 0.1,
				},
				heroheaderSelectiveClasses,
				{ input: "pictures", label: __("画像", "catpow"), key: "images", keys: imageKeys.bgImages },
			];
			wp.hooks.applyFilters("catpow.blocks.heroheader.sliderSelectiveClasses", CP.finderProxy(sliderSelectiveClasses));
			return sliderSelectiveClasses;
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
					<CP.SelectClassPanel title={__("スライダー", "catpow")} icon="images-alt" {...{ setAttributes, attributes }} selectiveClasses={sliderSelectiveClasses} />
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
							<Element class="wp-block-catpow-heroheader__bg" className="_bg" {...params}>
								{images.map((image, index) => (
									<CP.ResponsiveImage className="_picture" attributes={attributes} keys={imageKeys.bgImages} itemKeys={["images", index]} devices={devices} key={index} />
								))}
							</Element>
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
									{states.hasButtons && (
										<div className="_buttons cp-buttons">
											{buttons.map((button, index) => (
												<CP.Button.Edit tag="li" isItem={true} {...{ setAttributes, attributes }} itemKeys={["buttons", index]} keys={linkKeys} key={index} />
											))}
										</div>
									)}
								</div>
							</div>
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
						<Element className="_bg" {...params}>
							{images.map((image, index) => (
								<CP.ResponsiveImage className="_picture" attributes={attributes} keys={imageKeys.bgImages} itemKeys={["images", index]} devices={devices} />
							))}
						</Element>
						<div className={bodyClasses}>
							<div className="_texts">
								<RichText.Content tagName={HeadingTag} className="_title" value={title} />
								<RichText.Content tagName="p" className="_text" value={text} />
								{states.hasButtons && (
									<ul className="_buttons">
										{buttons.map((button, index) => (
											<CP.Button tag="li" blockTypeName="catpow/buttons" {...{ attributes }} itemKeys={["buttons", index]} keys={linkKeys} key={index} />
										))}
									</ul>
								)}
							</div>
						</div>
					</div>
				</CP.Bem>
			</>
		);
	},
});
