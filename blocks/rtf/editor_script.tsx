const { __ } = wp.i18n;

declare var wp: any, CP: any, React: any;

import { SelectiveClassConfig } from "cpdev/type";

wp.blocks.registerBlockType("catpow/rtf", {
	icon: "editor-code",
	category: "catpow",
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
