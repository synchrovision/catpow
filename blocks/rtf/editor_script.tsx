declare var wp: any, CP: any, React: any;

import { SelectiveClassConfig } from "cpdev/type";

wp.blocks.registerBlockType("catpow/rtf", {
	title: "🐾 RTF",
	description: "MarkDownに似た記法でHTMLを書けるブロック",
	icon: "editor-code",
	category: "catpow",
	attributes: {
		classes: { type: "string", default: "" },
		vars: { type: "object", default: [] },
		text: { type: "string", default: "" },
	},
	example: CP.example,
	edit({ attributes, setAttributes, isSelected }) {
		const { classes, vars } = attributes;
		const { useMemo } = wp.element;
		const { InspectorControls } = wp.blockEditor;

		const selectiveClasses = useMemo(() => {
			const selectiveClasses: SelectiveClassConfig[] = [
				"customMargin",
				"customContentWidth",
			];
			wp.hooks.applyFilters(
				"catpow.blocks.rtf.selectiveClasses",
				CP.finderProxy(selectiveClasses)
			);
			return selectiveClasses;
		}, []);

		return (
			<>
				<CP.RTF.Edit
					className={"wp-block-catpow-rtf" + classes}
					set={setAttributes}
					attr={attributes}
					isSelected={isSelected}
					style={vars}
				/>
				<InspectorControls>
					<CP.SelectClassPanel
						title="クラス"
						icon="art"
						set={setAttributes}
						attr={attributes}
						selectiveClasses={selectiveClasses}
					/>
				</InspectorControls>
			</>
		);
	},
	save({ attributes }) {
		const { classes, vars } = attributes;
		return <CP.RTF className={classes} attr={attributes} style={vars} />;
	},
});
