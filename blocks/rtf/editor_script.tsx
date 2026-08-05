const { __ } = wp.i18n;

declare var wp: any, CP: any, React: any;

import { SelectiveClassConfig } from "cpdev/type";

wp.blocks.registerBlockType("catpow/rtf", {
	title: "🐾 RTF",
	description: __("MarkDownに似た記法でHTMLを書けるブロック", "catpow"),
	icon: "editor-code",
	category: "catpow",
	attributes: {
		classes: { type: "string", source: "attribute", attribute: "class", default: "wp-block-catpow-rtf" },
		level: { type: "number", default: 3 },
		vars: { type: "object", default: [] },
		text: { type: "string", default: __("■ 見出し\n\nテキスト[リンク](example.com)**強調**", "catpow") },
	},
	example: CP.example,
	edit({ attributes, setAttributes, isSelected }) {
		const { classes, vars, level } = attributes;
		const { useMemo } = wp.element;
		const { InspectorControls, useBlockProps } = wp.blockEditor;

		const selectiveClasses = useMemo(() => {
			const selectiveClasses: SelectiveClassConfig[] = [{ input: "range", key: "level", min: 1, max: 6 }];
			wp.hooks.applyFilters("catpow.blocks.rtf.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		return (
			<>
				<div {...useBlockProps()}>
					<CP.RTF.Edit className={classes} level={level} {...{ setAttributes, attributes }} isSelected={isSelected} style={vars} />
				</div>
				<InspectorControls>
					<CP.SelectClassPanel title={__("クラス", "catpow")} icon="art" {...{ setAttributes, attributes }} selectiveClasses={selectiveClasses} />
				</InspectorControls>
			</>
		);
	},
	save({ attributes }) {
		const { classes, vars, level } = attributes;
		return <CP.RTF className={classes} level={level} {...{ attributes }} style={vars} />;
	},
});
