const { __ } = wp.i18n;

wp.blocks.registerBlockType("catpow/t-body", {
	title: "🐾 T-Body",
	description: "HTMLメールのベースとなるヘッダ・フッタのブロックです。",
	icon: "editor-code",
	category: "catpow-mail",
	supports: {
		multiple: false,
	},
	attributes: {
		type: { type: "string", source: "meta", meta: "type", default: "html" },
		isHtmlMail: { type: "boolean", default: false },
		classes: { source: "attribute", selector: "table", attribute: "class", default: "wp-block-catpow-t-body has-header has-footer" },
		headerClasses: { source: "attribute", selector: "thead", attribute: "class", default: "wp-block-catpow-t-body__thead has-color-scheme-inverted" },
		footerClasses: { source: "attribute", selector: "tfoot", attribute: "class", default: "wp-block-catpow-t-body__tfoot has-background-color-alt" },
		headerText: { source: "html", selector: "thead th", default: "Title" },
		headerPaddingTop: { type: "number", default: 1 },
		headerPaddingBottom: { type: "number", default: 1 },
		footerText: { source: "html", selector: "tfoot td", default: "caption" },
		footerPaddingTop: { type: "number", default: 1 },
		footerPaddingBottom: { type: "number", default: 1 },
		body_class: { type: "string", default: "has-bg-white" },
		textMail: { source: "text", selector: "textmail" },
	},
	example: CP.example,
	edit({ attributes, className, setAttributes }) {
		const { useState, useMemo } = wp.element;
		const { InnerBlocks, BlockControls, InspectorControls, RichText } = wp.blockEditor;
		const { PanelBody, TextareaControl, ToolbarGroup } = wp.components;
		const {
			type,
			isHtmlMail,
			classes,
			headerClasses,
			footerClasses,
			headerText,
			headerPaddingTop,
			headerPaddingBottom,
			footerText,
			footerPaddingTop,
			footerPaddingBottom,
			body_class,
			textMail,
			TextMode = false,
		} = attributes;
		const primaryClass = "wp-block-catpow-t-body";
		var states = CP.classNamesToFlags(classes);

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				{
					name: "type",
					input: "buttons",
					label: "メールタイプ",
					key: "type",
					values: ["plain", "html"],
					sub: {
						html: [
							{ name: "textMode", input: "bool", label: "テキストメール編集モード", key: "TextMode" },
							{
								name: "body",
								type: "gridbuttons",
								label: "背景色",
								values: { hasBgWhite: "白", hasBgB: "背景色", hasBgS: "強調背景色", hasBgBlack: "黒", hasBgM: "基本色", hasBgA: "強調色" },
								classKey: "body_class",
							},
							{
								name: "header",
								label: "ヘッダ",
								values: "hasHeader",
								sub: [
									{ preset: "colorScheme", classKey: "headerClasses" },
									{
										name: "headerBackgroundColor",
										type: "buttons",
										label: __("ヘッダ背景色", "catpow"),
										values: { hasBgNone: "なし", hasBgNormal: "通常", hasBgStrong: "強調", hasBgAchromatic: "白黒" },
										classKey: "headerClasses",
									},
									{ name: "range", input: "range", label: __("上余白", "catpow"), key: "headerPaddingTop", min: 0, max: 10 },
									{ name: "range", input: "range", label: __("下余白", "catpow"), key: "headerPaddingBottom", min: 0, max: 10 },
								],
							},
							{
								name: "footer",
								label: "フッタ",
								values: "hasFooter",
								sub: [
									{ preset: "colorScheme", classKey: "footerClasses" },
									{
										name: "footerBackgroundColor",
										type: "buttons",
										label: __("フッタ背景色", "catpow"),
										values: { hasBgNone: "なし", hasBgNormal: "通常", hasBgStrong: "強調", hasBgAchromatic: "白黒" },
										classKey: "footerClasses",
									},
									{ name: "range", input: "range", label: __("上余白", "catpow"), key: "footerPaddingTop", min: 0, max: 10 },
									{ name: "range", input: "range", label: __("下余白", "catpow"), key: "footerPaddingBottom", min: 0, max: 10 },
								],
							},
						],
					},
					effect: (val, states, { set }) => {
						set({ isHtmlMail: val === "html" });
					},
				},
			];
			wp.hooks.applyFilters("catpow.blocks.t-body.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		return (
			<>
				{!isHtmlMail || TextMode ? (
					<TextareaControl value={textMail} onChange={(textMail) => setAttributes({ textMail })} rows={20} />
				) : (
					<div className={"cp-mail-body " + body_class}>
						<CP.Bem prefix="wp-block-catpow">
							<table width="100%" align="center" valign="top" className={classes}>
								{states.hasHeader && (
									<thead className={headerClasses}>
										{headerPaddingTop > 0 && (
											<tr>
												<td className="_td is-spacer-cell" style={{ height: `${headerPaddingTop}rem` }}></td>
											</tr>
										)}
										<tr>
											<th align="center">
												<RichText
													onChange={(headerText) => {
														setAttributes({ headerText });
													}}
													value={headerText}
												/>
											</th>
										</tr>
										{headerPaddingBottom > 0 && (
											<tr>
												<td className="_td is-spacer-cell" style={{ height: `${headerPaddingBottom}rem` }}></td>
											</tr>
										)}
									</thead>
								)}
								<tbody>
									<tr>
										<td align="center">
											<div className="-contents">
												<InnerBlocks />
											</div>
										</td>
									</tr>
								</tbody>
								{states.hasFooter && (
									<tfoot className={footerClasses}>
										{footerPaddingTop > 0 && (
											<tr>
												<td className="_td is-spacer-cell" style={{ height: `${footerPaddingTop}rem` }}></td>
											</tr>
										)}
										<tr>
											<td align="center">
												<RichText
													onChange={(footerText) => {
														setAttributes({ footerText });
													}}
													value={footerText}
												/>
											</td>
										</tr>
										{footerPaddingBottom > 0 && (
											<tr>
												<td className="_td is-spacer-cell" style={{ height: `${footerPaddingBottom}rem` }}></td>
											</tr>
										)}
									</tfoot>
								)}
							</table>
						</CP.Bem>
					</div>
				)}
				<InspectorControls>
					<BlockControls>
						<ToolbarGroup
							controls={[
								{
									icon: "media-text",
									label: "テキストメール",
									isActive: TextMode,
									onClick: () => setAttributes({ TextMode: !TextMode }),
								},
							]}
						/>
					</BlockControls>
					<CP.SelectClassPanel title="クラス" icon="art" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} initialOpen={true} />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label="クラス" onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
				</InspectorControls>
			</>
		);
	},

	save({ attributes, className, setAttributes }) {
		const { InnerBlocks, RichText } = wp.blockEditor;
		const { isHtmlMail, classes, headerClasses, footerClasses, headerText, headerPaddingTop, headerPaddingBottom, footerText, footerPaddingTop, footerPaddingBottom, body_class, textMail } =
			attributes;
		var states = CP.classNamesToFlags(classes);
		return (
			<>
				{(!isHtmlMail || textMail) && <textmail>{textMail}</textmail>}
				{isHtmlMail && (
					<CP.Bem prefix="wp-block-catpow">
						<table width="100%" align="center" className={classes}>
							{states.hasHeader && (
								<thead className={headerClasses}>
									{headerPaddingTop > 0 && (
										<tr>
											<td className="_td is-spacer-cell" style={{ height: `${headerPaddingTop}rem` }}></td>
										</tr>
									)}
									<tr>
										<th align="center">
											<RichText.Content value={headerText} />
										</th>
									</tr>
									{headerPaddingBottom > 0 && (
										<tr>
											<td className="_td is-spacer-cell" style={{ height: `${headerPaddingBottom}rem` }}></td>
										</tr>
									)}
								</thead>
							)}
							<tbody>
								<tr>
									<td align="center">
										<div className="-contents">
											<InnerBlocks.Content />
										</div>
									</td>
								</tr>
							</tbody>
							{states.hasFooter && (
								<tfoot className={footerClasses}>
									{footerPaddingTop > 0 && (
										<tr>
											<td className="_td is-spacer-cell" style={{ height: `${footerPaddingTop}rem` }}></td>
										</tr>
									)}
									<tr>
										<td align="center">
											<RichText.Content value={footerText} />
										</td>
									</tr>
									{footerPaddingBottom > 0 && (
										<tr>
											<td className="_td is-spacer-cell" style={{ height: `${footerPaddingBottom}rem` }}></td>
										</tr>
									)}
								</tfoot>
							)}
						</table>
					</CP.Bem>
				)}
			</>
		);
	},
});
