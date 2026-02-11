/*
 * 指定の日時までのカウントダウンを表示します
 */
wp.blocks.registerBlockType("catpow/countdown", {
	title: "🐾 CountDown",
	icon: "clock",
	category: "catpow-embed",
	example: CP.example,
	supports: {
		customClassName: false,
	},
	edit({ attributes, setAttributes, className }) {
		const { useCallback, useMemo } = wp.element;
		const { InspectorControls, useBlockProps } = wp.blockEditor;
		const { classes, target } = attributes;

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = ["level", { name: "target", label: "目標日時", key: "target", input: "text", placeholder: "2099-12-31 23:59:59" }];
			wp.hooks.applyFilters("catpow.blocks.countdown.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		return (
			<>
				<div {...useBlockProps({ className: classes })}>
					<Catpow.CountDown target={target} />
				</div>
				<InspectorControls>
					{selectiveClasses && <CP.SelectClassPanel title="設定" icon="edit" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} initialOpen={true} />}
				</InspectorControls>
			</>
		);
	},

	save({ attributes, className, setAttributes }) {
		const { classes = "", target } = attributes;
		const { useBlockProps } = wp.blockEditor;

		return <div {...useBlockProps.save({ className: classes, "data-target": target })}></div>;
	},
});
