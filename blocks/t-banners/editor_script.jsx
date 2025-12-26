const { __ } = wp.i18n;
import { range, chunk } from "catpow/util";
import { Fragment } from "react";

wp.blocks.registerBlockType("catpow/t-banners", {
	title: "🐾 T-Banners",
	description: "HTMLメール用の複数バナーのブロックです。",
	icon: "editor-code",
	category: "catpow-mail",
	parent: CP.mailContensContainer,
	attributes: {
		classes: { source: "attribute", selector: "table", attribute: "class", default: "wp-block-catpow-t-banners" },
		items: {
			source: "query",
			selector: "tbody td:not(.is-spacer-cell)",
			query: {
				src: { source: "attribute", selector: "[src]", attribute: "src" },
				alt: { source: "attribute", selector: "[src]", attribute: "alt" },
				url: { source: "attribute", selector: "a", attribute: "href" },
				loopImage: { source: "text", selector: "td", default: "[output image]" },
			},
			default: [...range(4)].map(() => ({ src: wpinfo.theme_url + "/images/dummy.jpg", alt: "", url: wpinfo.home_url, loopImage: "[output image]" })),
		},
		width: { source: "attribute", selector: "table", attribute: "width", default: "100%" },
		gapX: { type: "number", default: 10 },
		gapY: { type: "number", default: 10 },
		align: { source: "attribute", selector: "table", attribute: "align", default: "center" },
		columns: { type: "number", default: 2 },
		marginTop: { type: "number", default: 1 },
		marginBottom: { type: "number", default: 1 },
	},
	example: CP.example,
	edit({ attributes, className, setAttributes, isSelected }) {
		const { useState, useMemo } = wp.element;
		const { InspectorControls } = wp.blockEditor;
		const { PanelBody, TextareaControl } = wp.components;
		const { classes, width, gapX, gapY, align, marginTop, marginBottom, items, columns } = attributes;
		var states = CP.classNamesToFlags(classes);

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				{ name: "align", input: "buttons", label: __("配置", "catpow"), key: "align", options: ["left", "center", "right"] },
				{ name: "range", input: "range", label: __("幅", "catpow"), key: "width", min: 10, max: 100, step: 5, unit: "%" },
				{ name: "marginTop", input: "range", label: "上余白", key: "marginTop", min: 0, max: 10 },
				{ name: "marginBottom", input: "range", label: "下余白", key: "marginBottom", min: 0, max: 10 },
				{ name: "gapX", input: "range", label: __("横間隔", "catpow"), key: "gapX", min: 0, max: 20 },
				{ name: "gapY", input: "range", label: __("縦間隔", "catpow"), key: "gapY", min: 0, max: 20 },
				{ name: "columns", input: "range", label: __("列数", "catpow"), key: "columns", min: 1, max: 5 },
				{
					name: "template",
					label: "テンプレート",
					values: "isTemplate",
					sub: [{ name: "loopImage", label: "画像出力コード", input: "text", key: "loopImage" }],
				},
			];
			wp.hooks.applyFilters("catpow.blocks.t-banners.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		return (
			<>
				<CP.Bem prefix="wp-block-catpow">
					<table className={classes} width={width} align={align}>
						<tbody>
							{marginTop > 0 && (
								<tr>
									<td className="_td is-spacer-cell" style={{ height: `${marginTop}rem` }} colSpan={columns * 2 - 1}></td>
								</tr>
							)}
							{[...chunk(items, columns)].map((itemGroup, gIndex) => (
								<>
									{gIndex > 0 && (
										<tr>
											<td className="_td is-spacer-cell" style={{ height: `${gapY}px` }} colSpan={columns * 2 - 1}></td>
										</tr>
									)}
									<tr>
										{itemGroup.map((item, index) => (
											<>
												{index > 0 && <td className="_td is-spacer-cell" style={{ width: `${gapX}px` }}></td>}
												<CP.Item className="_td" tag="td" set={setAttributes} attr={attributes} items={items} index={gIndex * columns + index} isSelected={isSelected} key={index}>
													<CP.Link.Edit className="_link" set={setAttributes} attr={attributes} keys={{ items: "items", href: "url" }} index={gIndex * columns + index}>
														<CP.SelectResponsiveImage
															className="_img"
															set={setAttributes}
															attr={attributes}
															keys={{ items: "items", src: "src", alt: "alt", code: "loopImage" }}
															index={gIndex * columns + index}
															size="medium"
															isTemplate={states.isTemplate}
														/>
													</CP.Link.Edit>
												</CP.Item>
											</>
										))}
										{[...Array(columns - itemGroup.length)].map((_, index) => (
											<td className="_td is-spacer-cell" key={"spacer_" + index}></td>
										))}
									</tr>
								</>
							))}
							{marginBottom > 0 && (
								<tr>
									<td className="_td is-spacer-cell" style={{ height: `${marginBottom}rem` }} colSpan={columns * 2 - 1}></td>
								</tr>
							)}
						</tbody>
					</table>
				</CP.Bem>
				<InspectorControls>
					<CP.SelectClassPanel title="クラス" icon="art" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} initialOpen={true} />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label="クラス" onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
				</InspectorControls>
			</>
		);
	},

	save({ attributes }) {
		const { classes, width, gapX, gapY, align, marginTop, marginBottom, items, columns } = attributes;
		var states = CP.classNamesToFlags(classes);
		return (
			<CP.Bem prefix="wp-block-catpow">
				<table className={classes} width={width} align={align}>
					<tbody>
						{marginTop > 0 && (
							<tr>
								<td className="_td is-spacer-cell" style={{ height: `${marginTop}rem` }} colSpan={columns * 2 - 1}></td>
							</tr>
						)}
						{[...chunk(items, columns)].map((itemGroup, gIndex) => (
							<>
								{gIndex > 0 && (
									<tr>
										<td className="_td is-spacer-cell" style={{ height: `${gapY}px` }} colSpan={columns * 2 - 1}></td>
									</tr>
								)}
								<tr>
									{itemGroup.map((item, index) => (
										<>
											{index > 0 && <td className="_td is-spacer-cell" style={{ width: `${gapX}px` }}></td>}
											<td key={index}>
												<a className="_link" href={item.url}>
													{states.isTemplate ? loopImage : <img width="100%" height="auto" src={item.src} alt={item.alt} />}
												</a>
											</td>
										</>
									))}
									{[...Array(columns - itemGroup.length)].map((_, index) => (
										<td className="_td is-spacer-cell" key={"spacer_" + index}></td>
									))}
								</tr>
							</>
						))}
						{marginBottom > 0 && (
							<tr>
								<td className="_td is-spacer-cell" style={{ height: `${marginBottom}rem` }} colSpan={columns * 2 - 1}></td>
							</tr>
						)}
					</tbody>
				</table>
			</CP.Bem>
		);
	},
});
