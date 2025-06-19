import { useChangeEffect } from "catpow/hooks";

wp.blocks.registerBlockType("catpow/artframe", {
	title: "🐾 ArtFrame",
	description: "切り抜きと装飾アートのブロックです。",
	icon: "images-alt",
	category: "catpow",
	transforms: {
		from: [
			{
				type: "block",
				blocks: ["core/group"],
				transform: (attributes, innerBlocks) => {
					return wp.blocks.createBlock("catpow/artframe", { classes: "wp-block-catpow-artframe" }, innerBlocks);
				},
			},
		],
	},
	example: CP.example,
	edit(props) {
		const { useMemo } = wp.element;
		const { InnerBlocks, InspectorControls } = wp.blockEditor;
		const { attributes, setAttributes } = props;
		const { params, element: Element = "div" } = attributes;

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = ["color", "colorScheme", artframeSelectiveClasses];
			wp.hooks.applyFilters("catpow.blocks.artframe.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		useChangeEffect(() => {
			setAttributes({ params: { ...artframeSelectiveClasses.sub[Element][0].default, ...params } });
		}, [Element]);

		return (
			<>
				<Element {...params}>
					<InnerBlocks template={[["core/paragraph", { content: CP.dummyText.text }]]} templateLock={false} />
				</Element>
				<InspectorControls>
					<CP.SelectClassPanel title="クラス" icon="art" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} />
				</InspectorControls>
			</>
		);
	},

	save({ attributes }) {
		const { InnerBlocks } = wp.blockEditor;
		const { params, element: Element = "div" } = attributes;
		return (
			<>
				<script type="module" src={artframeSelectiveClasses.mjs[Element]} />
				<Element {...params}>
					<InnerBlocks.Content />
				</Element>
			</>
		);
	},
});
