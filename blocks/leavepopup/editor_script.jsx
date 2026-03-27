const { __ } = wp.i18n;
import { classNamesToFlags, flagsToClassNames } from "catpow/util";

wp.blocks.registerBlockType("catpow/leavepopup", {
	edit({ attributes, setAttributes }) {
		const { classes, vars } = attributes;
		const { useMemo, useCallback } = wp.element;
		const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;

		const states = classNamesToFlags(classes);

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [{ input: "buttons", name: "target", label: "表示条件", values: { site: "サイト離脱時", page: "ページ離脱時" }, key: "target" }, "contentWidth"];
			return selectiveClasses;
		}, []);

		return (
			<>
				<CP.Collapsible title="🐾 LeavePopup">
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
					<CP.SelectClassPanel title={__("クラス", "catpow")} icon="art" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} />
				</InspectorControls>
			</>
		);
	},

	save({ attributes }) {
		const { classes, vars } = attributes;
		const { InnerBlocks, useBlockProps } = wp.blockEditor;
		const blockProps = useBlockProps.save({
			className: classes,
			style: vars,
			"data-wp-interactive": "catpow/leavepopup",
			"data-wp-context": JSON.stringify({
				isOpen: false,
			}),
			"data-wp-init": "callbacks.initBlock",
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
