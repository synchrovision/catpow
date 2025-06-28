import { useChangeEffect } from "catpow/hooks";

wp.blocks.registerBlockType("catpow/artframe", {
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
		const { InnerBlocks, InspectorControls,useBlockProps } = wp.blockEditor;
		const { attributes, setAttributes } = props;
		const { classes,vars,params, element: Element = "div" } = attributes;

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				"color",
				"colorScheme",
				"backgroundColor",
				"backgroundPattern",
				"customMargin",
				artframeSelectiveClasses
			];
			wp.hooks.applyFilters("catpow.blocks.artframe.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		useChangeEffect(() => {
			setAttributes({ params: { ...artframeSelectiveClasses.sub[Element][0].default, ...params } });
		}, [Element]);

		const blockProps = useBlockProps({ className: classes, style: vars });

		return (
			<>
				<div {...blockProps}>
					<Element {...params}>
						<InnerBlocks template={[["core/paragraph", { content: CP.dummyText.text }]]} templateLock={false} />
					</Element>
				</div>
				<InspectorControls>
					<CP.SelectClassPanel title="クラス" initialOpen={true} icon="art" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} />
				</InspectorControls>
			</>
		);
	},

	save({ attributes }) {
		const { InnerBlocks,useBlockProps } = wp.blockEditor;
		const { classes,vars,params, element: Element = "div" } = attributes;
		const blockProps = useBlockProps.save({ className: classes, style: vars });
		return (
			<>
				<script type="module" src={artframeSelectiveClasses.mjs[Element]} />
				<div {...blockProps}>
					<Element {...params}>
						<InnerBlocks.Content />
					</Element>
				</div>
			</>
		);
	},
});
