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
				{ preset: "headingTag", label: __("メニュー見出し", "catpow"), classKey: "menuClasses", key: "MenuHeadingTag" },
				{ preset: "level", label: __("メニューレベル", "catpow"), classKey: "menuClasses" },
				{ name: "type", type: "gridbuttons", label: __("タイプ", "catpow"), values: { isStyleTree: "tree", isStyleList: "list", isStyleCard: "card", isStyleGrid: "grid" } },
				{ name: "hasOwnTitle", input: "bool", label: __("カスタムタイトル", "catpow"), key: "hasOwnTitle" },
				{ name: "title", input: "text", label: __("タイトル", "catpow"), key: "title", cond: (states, props) => props.attr.hasOwnTitle },
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
					<CP.SelectClassPanel title={__("設定", "catpow")} icon="admin-generic" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} />
				</InspectorControls>
			</>
		);
	},

	save() {
		return <></>;
	},
});
