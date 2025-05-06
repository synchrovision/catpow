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
		const { InspectorControls } = wp.blockEditor;
		const { target } = attributes;
		const classes = useMemo(() => Catpow.util.bem(attributes.classes), [attributes.classes]);

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				{ name: "target", label: "目標日時", key: "target", input: "text", placeholder: "2099-12-31 23:59:59" },
				{ name: "size", label: "サイズ", type: "buttons", values: { "is-size-small": "小", "is-size-medium": "中", "is-size-large": "大" } },
			];
			wp.hooks.applyFilters("catpow.blocks.countdown.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		console.log(attributes);

		return (
			<>
				<div className={classes()}>
					<Catpow.CountDown className={classes.body()} target={target} />
				</div>
				<InspectorControls>
					{selectiveClasses && <CP.SelectClassPanel title="設定" icon="edit" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} initialOpen={true} />}
				</InspectorControls>
			</>
		);
	},

	save({ attributes, className, setAttributes }) {
		const { classes = "", target } = attributes;

		return <div className={classes} data-target={target}></div>;
	},
});
