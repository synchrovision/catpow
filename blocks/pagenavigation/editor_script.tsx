declare var Catpow: any, wp: any, CP: any, React: any;

const { __ } = wp.i18n;

import { SelectiveClassConfig } from "cpdev/type";

wp.blocks.registerBlockType("catpow/pagenavigation", {
	edit({ attributes, className, setAttributes, isSelected }) {
		const { useMemo } = wp.element;
		const { InspectorControls, useBlockProps } = wp.blockEditor;
		const { serverSideRender: ServerSideRender } = wp;

		const selectiveClasses = useMemo(() => {
			const selectiveClasses: SelectiveClassConfig[] = [
				"headingTag",
				"level",
				{ preset: "headingTag", label: "メニュー見出し", classKey: "menuClasses", key: "MenuHeadingTag" },
				{ preset: "level", label: "メニューレベル", classKey: "menuClasses" },
				"hasMargin",
				"hasContentWidth",
				"itemSize",
				{ name: "type", type: "gridbuttons", label: "タイプ", values: { isStyleTree: "tree", isStyleList: "list", isStyleCard: "card", isStyleGrid: "grid" } },
				{ name: "hasOwnTitle", input: "bool", label: "カスタムタイトル", key: "hasOwnTitle" },
				{ name: "title", input: "text", label: "タイトル", key: "title", cond: (states, props) => props.attr.hasOwnTitle },
				{ name: "level", label: "level", input: "range", key: "level", min: 0, max: 3 },
				{ name: "depth", label: "depth", input: "range", key: "depth", min: 0, max: 2 },
				{ name: "query", label: "query", input: "textarea", key: "query" },
			];
			wp.hooks.applyFilters("catpow.blocks.pagenavigation.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		return (
			<>
				<div {...useBlockProps()}>
					<ServerSideRender block="catpow/pagenavigation" attributes={attributes} />
				</div>
				<InspectorControls>
					<CP.SelectClassPanel title="設定" icon="admin-generic" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} />
				</InspectorControls>
			</>
		);
	},

	save() {
		return <></>;
	},
});
