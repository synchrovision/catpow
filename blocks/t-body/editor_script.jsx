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
		classes: { source: "attribute", selector: "table", attribute: "class", default: "wp-block-catpow-t-body hasHeader hasFooter" },
		headerText: { source: "html", selector: "thead th", default: "Title" },
		footerText: { source: "html", selector: "tfoot td", default: "caption" },
		body_class: { type: "string", default: "white" },
		textMail: { source: "text", selector: "textmail" },
	},
	example: CP.example,
	edit({ attributes, className, setAttributes }) {
		const { useState, useMemo } = wp.element;
		const { InnerBlocks, BlockControls, InspectorControls, RichText } = wp.blockEditor;
		const { PanelBody, TextareaControl, ToolbarGroup } = wp.components;
		const { type, isHtmlMail, classes, headerText, footerText, body_class, textMail, TextMode = false } = attributes;
		const primaryClass = "wp-block-catpow-t-body";
		var states = CP.wordsToFlags(classes);

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
							"color",
							{ name: "header", label: "ヘッダ", values: "hasHeader" },
							{ name: "footer", label: "フッタ", values: "hasFooter" },
							{ name: "body", type: "buttons", label: "背景色", values: ["white", "gray", "black"], key: "body_class" },
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
					<div className={"mail_body " + body_class}>
						<table width="100%" align="center" valign="top" className={classes}>
							{states.hasHeader && (
								<thead className="wp-block-catpow-t-body__header">
									<tr>
										<th>
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
							<tbody className="wp-block-catpow-t-body__body">
								<tr>
									<td>
										<div className="wp-block-catpow-t-body__body__contents">
											<InnerBlocks />
										</div>
									</td>
								</tr>
							</tbody>
							{states.hasFooter && (
								<tfoot className="wp-block-catpow-t-body__footer">
									<tr>
										<td>
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
					<CP.SelectClassPanel title="クラス" icon="art" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label="クラス" onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
				</InspectorControls>
			</>
		);
	},

	save({ attributes, className, setAttributes }) {
		const { InnerBlocks, RichText } = wp.blockEditor;
		const { type, isHtmlMail, classes, headerText, textMail, footerText } = attributes;
		const primaryClass = "wp-block-catpow-t-body";
		var states = CP.wordsToFlags(classes);
		return (
			<>
				{(!isHtmlMail || textMail) && <textmail>{textMail}</textmail>}
				{isHtmlMail && (
					<table width="100%" align="center" className={classes}>
						{states.hasHeader && (
							<thead className="wp-block-catpow-t-body__header">
								<tr>
									<th>
										<RichText.Content value={headerText} />
									</th>
								</tr>
							</thead>
						)}
						<tbody className="wp-block-catpow-t-body__body">
							<tr>
								<td>
									<div className="wp-block-catpow-t-body__body__contents">
										<InnerBlocks.Content />
									</div>
								</td>
							</tr>
						</tbody>
						{states.hasFooter && (
							<tfoot className="wp-block-catpow-t-body__footer">
								<tr>
									<td>
										<RichText.Content value={footerText} />
									</td>
								</tr>
							</tfoot>
						)}
					</table>
				)}
			</>
		);
	},
});
