const { __ } = wp.i18n;

wp.blocks.registerBlockType("catpow/leavepopup", {
	title: "🐾 LeavePopup",
	description: "サイト・ページ離脱に表示されるポップアップ。",
	icon: "admin-comments",
	category: "catpow",
	edit({ attributes, className, setAttributes }) {
		const { useState, useMemo } = wp.element;
		const { InnerBlocks, InspectorControls } = wp.blockEditor;
		const [open, setOpen] = useState(false);

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [{ type: "buttons", name: "target", label: "表示条件", values: { isForSite: "サイト離脱時", isForPage: "ページ離脱時" } }];
			wp.hooks.applyFilters("catpow.blocks.leavepopup.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		return (
			<>
				<div className={"collapsible_content " + (open ? "open" : "close")}>
					<div className="label" onClick={() => setOpen(!open)}>
						🐾 leavePopup
					</div>
					<div className={attributes.classes.replace("is-close", "is-open")}>
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
		const { InnerBlocks } = wp.blockEditor;
		return (
			<div className={attributes.classes}>
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
