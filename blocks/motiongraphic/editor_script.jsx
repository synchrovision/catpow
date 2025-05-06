/*
 * 現在の投稿を規定のテンプレートを用いて表示する
 * APIを用いて様々な操作を行うcomponentを表示する
 */
CP.config.motiongraphic = {};
wp.blocks.registerBlockType("catpow/motiongraphic", {
	title: "🐾 MotionGraphic",
	icon: "video-alt3",
	category: "catpow-embed",
	example: CP.example,
	supports: {
		customClassName: false,
	},
	edit({ attributes, setAttributes, className }) {
		const { useCallback } = wp.element;
		const { InnerBlocks, InspectorControls } = wp.blockEditor;
		const { classes = "", component, props } = attributes;
		const { selections } = CP.config.motiongraphic;

		const initSelectionItems = useCallback(
			(items) => {
				if (Array.isArray(items)) {
					items.map((item) => {
						item.json = "props";
						if (item.sub) {
							initSelectionItems(item.sub);
						}
					});
				} else {
					Object.keys(items).map((key) => {
						initSelectionItems(items[key]);
					});
				}
			},
			[attributes]
		);

		if (!selections) {
			wp.apiFetch({
				path: "/cp/v1/blocks/config/motiongraphic/selections",
			}).then((res) => {
				initSelectionItems(res.items[0].sub);
				CP.config.motiongraphic.selections = res.items;
				setAttributes({ selections: res.items });
			});
			return false;
		}
		const SelectedComponent = component && Catpow.Animation[component] ? Catpow.Animation[component] : false;

		return (
			<>
				<div className="cp-embeddedcontent">
					<div className="label">{component}</div>
					<div className={classes}>
						<div className="wp-block-catpow-motiongraphic__background">
							{SelectedComponent ? (
								<Catpow.FixedBG>
									<Catpow.Animation>
										<SelectedComponent {...JSON.parse(props)} />
									</Catpow.Animation>
								</Catpow.FixedBG>
							) : (
								<p>Select Component</p>
							)}
						</div>
						<InnerBlocks />
					</div>
				</div>
				<InspectorControls>
					{selections && <CP.SelectClassPanel classKey="component" title="設定" icon="edit" set={setAttributes} attr={attributes} selectiveClasses={selections} initialOpen={true} />}
				</InspectorControls>
			</>
		);
	},

	save({ attributes, className, setAttributes }) {
		const { InnerBlocks } = wp.blockEditor;
		const { classes = "" } = attributes;
		const states = CP.wordsToFlags(classes);

		return <InnerBlocks.Content />;
	},
});
