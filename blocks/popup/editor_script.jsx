const { __ } = wp.i18n;

wp.blocks.registerBlockType("catpow/popup", {
	title: "🐾 Popup",
	description: "アンカーリンクで開くポップアップ。",
	icon: "admin-comments",
	category: "catpow",
	edit({ attributes, className, setAttributes }) {
		const { anchor, vars } = attributes;
		const { useState, useMemo } = wp.element;
		const { InnerBlocks, InspectorControls } = wp.blockEditor;
		const [open, setOpen] = useState(false);

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				{ input: "text", name: "anchor", label: "アンカー名", key: "anchor" },
				{ name: "size", label: __("サイズ", "catpow"), vars: "vars", key: "--cp-popup-size", input: "range", min: 300, max: 1200, step: 10 },
			];
			wp.hooks.applyFilters("catpow.blocks.popup.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		return (
			<>
				<div className={"cp-collapsiblecontent " + (open ? "is-open" : "is-close")}>
					<div className="cp-collapsiblecontent__label" onClick={() => setOpen(!open)}>
						🐾 Popup #{attributes.anchor}
					</div>
					<div className="wp-block-catpow-popup is-open" style={vars}>
						<div className="body">
							<div className="contents">
								<InnerBlocks />
							</div>
							<div className="close" onClick={() => setOpen(false)}></div>
						</div>
						<div className="bg"></div>
					</div>
				</div>
				<InspectorControls>
					<CP.SelectClassPanel title={__("クラス", "catpow")} icon="art" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} />
				</InspectorControls>
			</>
		);
	},

	save({ attributes, className, setAttributes }) {
		const { anchor, vars } = attributes;
		const { InnerBlocks } = wp.blockEditor;
		return (
			<div id={anchor} className={attributes.classes} style={vars}>
				<div className="body">
					<div className="contents">
						<InnerBlocks.Content />
					</div>
					<div className="close"></div>
				</div>
				<div className="bg"></div>
			</div>
		);
	},
});
