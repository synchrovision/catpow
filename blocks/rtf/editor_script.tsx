declare var wp: any, CP: any, React: any;

import { SelectiveClassConfig } from "cpdev/type";

wp.blocks.registerBlockType("catpow/rtf", {
	title: "🐾 RTF",
	description: "MarkDownに似た記法でHTMLを書けるブロック",
	icon: "editor-code",
	category: "catpow",
	attributes: {
		classes: { type: "string", default: "" },
		level: { type: "number", default: 3 },
		vars: { type: "object", default: [] },
		text: { type: "string", default: "■ 見出し\n\nテキスト[リンク](example.com)**強調**" },
	},
	example: CP.example,
	edit({ attributes, setAttributes, isSelected }) {
		const { classes, vars, level } = attributes;
		const { useMemo } = wp.element;
		const { InspectorControls, useBlockProps } = wp.blockEditor;

		const selectiveClasses = useMemo(() => {
			const selectiveClasses: SelectiveClassConfig[] = [{ input: "range", key: "level", min: 1, max: 6 }, "hasMargin", "hasContentWidth"];
			wp.hooks.applyFilters("catpow.blocks.rtf.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		return (
			<>
				<div {...useBlockProps()}>
					<CP.RTF.Edit className={"wp-block-catpow-rtf" + classes} level={level} set={setAttributes} attr={attributes} isSelected={isSelected} style={vars} />
				</div>
				<InspectorControls>
					<CP.SelectClassPanel title="クラス" icon="art" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} />
				</InspectorControls>
			</>
		);
	},
	save({ attributes }) {
		const { classes, vars, level } = attributes;
		return <CP.RTF className={classes} level={level} attr={attributes} style={vars} />;
	},
});
