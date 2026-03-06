import { clsx } from "clsx";
import { classNamesToFlags, flagsToClassNames } from "catpow/util";
const { __ } = wp.i18n;

wp.blocks.registerBlockType("catpow/popup", {
	title: "🐾 Popup",
	description: "アンカーリンクで開くポップアップ。",
	icon: "admin-comments",
	category: "catpow",
	edit({ attributes, className, setAttributes, clientId }) {
		const { classes, anchor, vars } = attributes;
		const { useState, useMemo, useCallback } = wp.element;
		const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
		const [open, setOpen] = useState(false);

		const states = classNamesToFlags(classes);

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [{ input: "text", name: "anchor", label: "アンカー名", key: "anchor" }, "contentWidth"];
			wp.hooks.applyFilters("catpow.blocks.popup.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		const selectThisBlock = useCallback(() => {
			wp.data.dispatch("core/block-editor").selectBlock(clientId);
		}, [clientId]);

		return (
			<>
				<div className={"cp-collapsiblecontent " + (open ? "is-open" : "is-close")} onClick={selectThisBlock}>
					<div className="cp-collapsiblecontent__label" onClick={() => setOpen(!open)}>
						🐾 Popup #{attributes.anchor}
					</div>
					<div className="cp-collapsiblecontent__body">
						<CP.Bem prefix="wp-block-catpow">
							<div {...useBlockProps({ className: flagsToClassNames({ ...states, isHidden: false, isClose: false, isOpen: true }), style: vars })}>
								<div className="_body">
									<div className="_contents">
										<InnerBlocks />
									</div>
									<div className="_close" onClick={() => setOpen(false)}></div>
								</div>
								<div className="_bg"></div>
							</div>
						</CP.Bem>
					</div>
				</div>
				<InspectorControls>
					<CP.SelectClassPanel title={__("クラス", "catpow")} icon="art" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} />
				</InspectorControls>
			</>
		);
	},

	save({ attributes, className, setAttributes }) {
		const { classes, anchor, vars } = attributes;
		const { InnerBlocks, useBlockProps } = wp.blockEditor;
		const blockProps = useBlockProps.save({
			className: classes,
			style: vars,
			id: anchor,
			"data-wp-interactive": "catpow/popup",
			"data-wp-context": JSON.stringify({
				anchor,
			}),
			"data-wp-init": "callbacks.initBlock",
			"data-wp-class--is-open": "callbacks.isOpen",
			"data-wp-bind--hidden": "!callbacks.isOpen",
		});
		return (
			<CP.Bem prefix="wp-block-catpow">
				<div {...blockProps}>
					<div className="_body">
						<div className="_contents">
							<InnerBlocks.Content />
						</div>
						<div className="_close"></div>
					</div>
					<div className="_bg" data-wp-on--click="actions.close"></div>
				</div>
			</CP.Bem>
		);
	},
});
