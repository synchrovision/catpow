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
		footerText: { source: "html", selector: "tfoot td", default: "caption" },
		body_class: { type: "string", default: "has-bg-white" },
		textMail: { source: "text", selector: "textmail" },
	},
	example: CP.example,
	edit({ attributes, className, setAttributes }) {
		const { useState, useMemo } = wp.element;
		const { InnerBlocks, BlockControls, InspectorControls, RichText } = wp.blockEditor;
		const { PanelBody, TextareaControl, ToolbarGroup } = wp.components;
		const { type, isHtmlMail, classes, headerClasses, footerClasses, headerText, footerText, body_class, textMail, TextMode = false } = attributes;
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
									{ preset: "backgroundColor", label: __("ヘッダ背景色", "catpow"), name: "headerBackgroundColor", classKey: "headerClasses" },
								],
							},
							{
								name: "footer",
								label: "フッタ",
								values: "hasFooter",
								sub: [
									{ preset: "colorScheme", classKey: "footerClasses" },
									{ preset: "backgroundColor", label: __("フッタ背景色", "catpow"), name: "footerBackgroundColor", classKey: "footerClasses" },
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
		const { type, isHtmlMail, classes, headerClasses, footerClasses, headerText, textMail, footerText } = attributes;
		var states = CP.classNamesToFlags(classes);
		return (
			<>
				{(!isHtmlMail || textMail) && <textmail>{textMail}</textmail>}
				{isHtmlMail && (
					<CP.Bem prefix="wp-block-catpow">
						<table width="100%" align="center" className={classes}>
							{states.hasHeader && (
								<thead className={headerClasses}>
									<tr>
										<th align="center">
											<RichText.Content value={headerText} />
										</th>
									</tr>
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
									<tr>
										<td align="center">
											<RichText.Content value={footerText} />
										</td>
									</tr>
								</tfoot>
							)}
						</table>
					</CP.Bem>
				)}
			</>
		);
	},
});
