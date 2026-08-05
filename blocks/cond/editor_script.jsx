const { __ } = wp.i18n;

wp.blocks.registerBlockType("catpow/cond", {
	title: "🐾 Cond",
	description: __("日時やログインユーザーによってコンテンツの表示が切り替わるコンテナです。", "catpow"),
	icon: "editor-code",
	category: "catpow-functional",
	transforms: {
		from: [
			{
				type: "block",
				blocks: ["core/group"],
				transform: (attributes, innerBlocks) => {
					return wp.blocks.createBlock("catpow/cond", {}, innerBlocks);
				},
			},
		],
	},
	example: CP.example,
	edit({ attributes, setAttributes }) {
		const { InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
		const { Icon, PanelBody, SelectControl, TextareaControl } = wp.components;
		return (
			<>
				<div {...useBlockProps({ className: "wp-block-catpow-cond" })}>
					<CP.Label icon="admin-generic">
						{__("表示条件：", "catpow")}
						{attributes.schedule}
						{attributes.is_user_logged_in != 0 && __("ログイン", "catpow") + (attributes.is_user_logged_in == 1 ? __("している", "catpow") : __("していない", "catpow"))}
						{attributes.input_value}
						{attributes.content_value}
					</CP.Label>
					<InnerBlocks />
				</div>
				<InspectorControls>
					<PanelBody title={__("表示条件", "catpow")} icon="admin-generic">
						<TextareaControl label={__("スケジュール", "catpow")} onChange={(schedule) => setAttributes({ schedule })} value={attributes.schedule} />
						<SelectControl
							label={__("ログイン", "catpow")}
							onChange={(is_user_logged_in) => {
								setAttributes({ is_user_logged_in });
							}}
							value={attributes.is_user_logged_in}
							options={[
								{ label: __("していない", "catpow"), value: "-1" },
								{ label: __("どちらでも", "catpow"), value: "0" },
								{ label: __("している", "catpow"), value: "1" },
							]}
						/>
						{attributes.is_user_logged_in == "1" && (
							<div className="sub">
								<TextareaControl label={__("権限", "catpow")} onChange={(current_user_can) => setAttributes({ current_user_can })} value={attributes.current_user_can} />
								<TextareaControl label={__("ユーザー情報", "catpow")} onChange={(user_value) => setAttributes({ user_value })} value={attributes.user_value} />
							</div>
						)}
						<TextareaControl label={__("フォーム入力値", "catpow")} onChange={(input_value) => setAttributes({ input_value })} value={attributes.input_value} />
						<TextareaControl label={__("コンテンツ情報", "catpow")} onChange={(content_value) => setAttributes({ content_value })} value={attributes.content_value} />
					</PanelBody>
				</InspectorControls>
			</>
		);
	},

	save({}) {
		const { InnerBlocks } = wp.blockEditor;
		return <InnerBlocks.Content />;
	},
});
