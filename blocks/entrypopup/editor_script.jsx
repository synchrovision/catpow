const { __ } = wp.i18n;
import { classNamesToFlags, flagsToClassNames } from "catpow/util";

wp.blocks.registerBlockType("catpow/entrypopup", {
	edit({ attributes, className, setAttributes }) {
		const { classes, vars } = attributes;
		const { useMemo, useCallback } = wp.element;
		const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;

		const states = classNamesToFlags(classes);

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [{ input: "buttons", name: "target", label: "表示条件", values: { site: "サイトで一回", page: "ページで一回", every: "毎回表示" }, key: "target" }, "contentWidth"];
			wp.hooks.applyFilters("catpow.blocks.entrypopup.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		return (
			<>
				<CP.Collapsible title="🐾 EntryPopup">
					<CP.Bem prefix="wp-block-catpow">
						<div {...useBlockProps({ className: flagsToClassNames({ ...states, isOpen: true }), style: vars })}>
							<div className="_body">
								<div className="_contents">
									<InnerBlocks />
								</div>
								<div className="_close" onClick={() => setOpen(false)}></div>
							</div>
							<div className="_bg"></div>
						</div>
					</CP.Bem>
				</CP.Collapsible>
				<InspectorControls>
					<CP.SelectClassPanel title={__("クラス", "catpow")} icon="art" {...{ setAttributes, attributes }} selectiveClasses={selectiveClasses} />
				</InspectorControls>
			</>
		);
	},

	save({ attributes, className, setAttributes }) {
		const { classes, vars } = attributes;
		const { InnerBlocks, useBlockProps } = wp.blockEditor;
		const blockProps = useBlockProps.save({
			className: classes,
			style: vars,
			"data-wp-interactive": "catpow/entrypopup",
			"data-wp-context": JSON.stringify({
				isOpen: true,
			}),
			"data-wp-class--is-open": "context.isOpen",
			"data-wp-bind--hidden": "!context.isOpen",
		});
		return (
			<CP.Bem prefix="wp-block-catpow">
				<div {...blockProps}>
					<div className="_body">
						<div className="_contents">
							<InnerBlocks.Content />
						</div>
						<div className="_close" data-wp-on--click="actions.close"></div>
					</div>
					<div className="_bg" data-wp-on--click="actions.close"></div>
				</div>
			</CP.Bem>
		);
	},
});
