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
		const { classes, bodyClasses, vars, params, HeadingTag, title, text, buttons, images, element: Element = "div", EditMode = false } = attributes;
		const { useState, useMemo, useEffect, useRef } = wp.element;
		const { InspectorControls, RichText, useBlockProps } = wp.blockEditor;
		const states = CP.classNamesToFlags(attributes.classes);
		const [ref, setRef] = useState(null);
		const { devices, imageKeys } = CP.config.heroheader;

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				"headingTag",
				"level",
				"color",
				"colorScheme",
				{ name: "hasButtons", label: __("ボタン", "catow"), values: "hasButtons" },
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
				"backgroundImage",
				{ preset: "hasContentWidth", classKey: "bodyClasses" },
				{ preset: "hasPadding", classKey: "bodyClasses" },
				{ preset: "textAlign", classKey: "bodyClasses" },
				{ preset: "alignContent", classKey: "bodyClasses" },
				{ preset: "itemSize", label: "ボタンサイズ", classKey: "bodyClasses" },
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
					<CP.SelectClassPanel title="クラス" icon="art" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} />
				</InspectorControls>
				<CP.SelectModeToolbar set={setAttributes} attr={attributes} />
				{EditMode ? (
					<div {...blockProps}>
						<CP.Label icon="edit" />
						<CP.EditItemsTable
							set={setAttributes}
							attr={attributes}
							itemsKey="buttons"
							columns={[
								{ type: "icon", label: "icon" },
								{ type: "text", key: "text" },
							]}
							isTemplate={states.isTemplate}
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
									<div className="_buttons">
										{buttons.map((button, index) => (
											<CP.Item tag="li" className="_button" set={setAttributes} attr={attributes} items={buttons} itemsKey="buttons" index={index} indexKey="currentButtonIndex" key={index}>
												<CP.Link.Edit className="_link" set={setAttributes} attr={attributes} keys={{ items: "buttons", href: "linkUrl" }} index={index}>
													<CP.OutputIcon className="_icon" item={button} />
													<RichText
														tagName="span"
														className="_text"
														placeholder={__("テキストを入力", "catpow")}
														onChange={(text) => {
															button.text = text;
															setAttributes({ buttons: [...buttons] });
														}}
														value={button.text}
													/>
												</CP.Link.Edit>
											</CP.Item>
										))}
									</div>
								)}
							</div>
							<Element class="wp-block-catpow-heroheader__bg" className="_bg" {...params}>
								{images.map((image, index) => (
									<CP.ResponsiveImage className="_picture" attr={attributes} keys={imageKeys.bgImages} index={index} devices={devices} key={index} />
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
										<li className="_button" key={index}>
											<CP.Link className="_link" attr={attributes} keys={{ items: "buttons", href: "linkUrl" }} index={index}>
												<CP.OutputIcon className="_icon" item={button} />
												<RichText.Content tagName="span" className="_text" value={button.text} />
											</CP.Link>
										</li>
									))}
								</ul>
							)}
						</div>
						<Element className="_bg" {...params}>
							{images.map((image, index) => (
								<CP.ResponsiveImage className="_picture" attr={attributes} keys={imageKeys.bgImages} index={index} devices={devices} />
							))}
						</Element>
					</div>
				</CP.Bem>
			</>
		);
	},
});
