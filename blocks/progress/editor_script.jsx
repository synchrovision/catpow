const { __ } = wp.i18n;

wp.blocks.registerBlockType("catpow/progress", {
	title: "🐾 Progress",
	description: __("進捗のブロックです。", "catpow"),
	icon: "editor-ul",
	category: "catpow",
	example: CP.example,
	edit({ attributes, className, setAttributes, isSelected }) {
		const { Fragment, useMemo, useCallback, useEffect } = wp.element;
		const { InspectorControls, RichText, useBlockProps } = wp.blockEditor;
		const { Flex, FlexItem, FlexBlock, PanelBody, Button, Spinner, SelectControl, CheckboxControl, TextControl } = wp.components;
		const { post, settings, selections, activeLabel, progress, isWaiting = false } = attributes;

		const selectiveClasses = useMemo(
			() => [
				{ input: "select", label: __("セット", "catpow"), key: "post", values: selections },
				{ input: "range", label: __("ステップ", "catpow"), key: "step", min: 0, max: settings ? settings.items.length - 1 : 0 },
			],
			[selections, settings],
		);
		const settingsSelectiveClasses = useMemo(
			() => [
				"level",
				"hasContentWidth",
				"hasMargin",
				{
					label: __("番号", "catpow"),
					values: "hasCounter",
					sub: [
						{ input: "text", label: __("番号前テキスト", "catpow"), key: "countPrefix" },
						{ input: "text", label: __("番号後テキスト", "catpow"), key: "countSuffix" },
					],
				},
			],
			[],
		);

		const setSettings = useCallback(
			(args) => {
				const { currentItemIndex, ...otherArgs } = args;
				if (currentItemIndex !== undefined) {
					setAttributes({ currentItemIndex });
				}
				setAttributes({ settings: { ...settings, ...otherArgs } });
			},
			[setAttributes, attributes],
		);
		const registerSettings = useCallback(() => {
			const post_id = wp.data.select("core/editor").getCurrentPostId();
			setAttributes({ isWaiting: true });
			wp.apiFetch({ path: "/cp/v1/blocks/config/progress/settings/register", method: "post", data: { post_id, settings } }).then((res) => {
				setAttributes({ post: res.post, selections: false, isWaiting: false });
			});
		}, [settings]);
		const updateSettings = useCallback(() => {
			setAttributes({ isWaiting: true });
			wp.apiFetch({ path: "/cp/v1/blocks/config/progress/settings/update", method: "post", data: { post, settings } }).then((res) => {
				setAttributes({ isWaiting: false });
			});
		}, [post, settings]);
		const deleteSettings = useCallback(() => {
			setAttributes({ isWaiting: true });
			wp.apiFetch({ path: "/cp/v1/blocks/config/progress/settings/delete", method: "post", data: { post } }).then(() => {
				setAttributes({ post: "default", settings: false, selections: false, isWaiting: false });
			});
		}, [post]);

		const Items = useCallback(
			(props) => {
				const { countPrefix, countSuffix } = settings;
				const states = CP.classNamesToFlags(settings.classes);
				return;
			},
			[setAttributes, attributes, setSettings, settings, isSelected],
		);

		if (!settings) {
			wp.apiFetch({ path: "/cp/v1/blocks/config/progress/settings", method: "post", data: { post } }).then((settings) => {
				setAttributes({ settings });
			});
		}
		if (!selections) {
			wp.apiFetch({ path: "/cp/v1/blocks/config/progress/settings/selections" }).then((selections) => {
				setAttributes({ selections });
			});
		}
		const CenterSpinner = useCallback(
			(props) => (
				<Flex justify="center">
					<FlexItem>
						<Spinner />
					</FlexItem>
				</Flex>
			),
			[],
		);
		useEffect(() => {
			setAttributes({ settings: false });
		}, [post]);

		const states = settings && settings.classes ? CP.classNamesToFlags(settings.classes) : {};
		const { countPrefix, countSuffix } = settings ?? {};

		const blockProps = useBlockProps({ className: "wp-block-catpow-progress " + settings?.classes });

		return (
			<>
				<InspectorControls>
					<CP.SelectClassPanel title={__("クラス", "catpow")} initialOpen={true} icon="admin-generic" {...{ setAttributes, attributes }} selectiveClasses={selectiveClasses} />
					{settings ? (
						<CP.SelectClassPanel title={__("セット設定", "catpow")} initialOpen={false} icon="admin-generic" setAttributes={setSettings} attributes={settings} selectiveClasses={settingsSelectiveClasses}>
							<CP.EditItemsTable setAttributes={setSettings} attributes={settings} columns={[{ type: "text", key: "label" }]} />
							{!isWaiting ? (
								post === "default" ? (
									<>
										<Flex justify="center">
											<FlexItem>
												<Button isPrimary onClick={registerSettings}>
													{__("新規登録", "catpow")}
												</Button>
											</FlexItem>
										</Flex>
									</>
								) : (
									<>
										<Flex justify="center">
											<FlexItem>
												<Button isPrimary onClick={updateSettings}>
													{__("設定を更新", "catpow")}
												</Button>
											</FlexItem>
										</Flex>
										<Flex justify="center">
											<FlexItem>
												<Button isLink onClick={registerSettings}>
													{__("新規登録", "catpow")}
												</Button>
												｜
												<Button isLink isDestructive onClick={deleteSettings}>
													{__("削除", "catpow")}
												</Button>
											</FlexItem>
										</Flex>
									</>
								)
							) : (
								<CenterSpinner />
							)}
						</CP.SelectClassPanel>
					) : (
						<CenterSpinner />
					)}
					<CP.ItemControlInfoPanel />
				</InspectorControls>
				<>
					{settings ? (
						<CP.Bem prefix="wp-block-catpow">
							<div {...blockProps}>
								<ul className="_items">
									{settings.items.map((item, index) => (
										<li
											className={"_item " + (index == attributes.step ? "is-active" : "")}
											onClick={(e) => {
												setAttributes({ step: index });
											}}
											key={index}
										>
											{states.hasCounter && (
												<div className="_counter">
													{countPrefix && <span className="_prefix">{countPrefix}</span>}
													<span className="_number">{index + 1}</span>
													{countSuffix && <span className="_suffix">{countSuffix}</span>}
												</div>
											)}
											<RichText
												tagName="div"
												className="_label"
												onChange={(label) => {
													item.label = label;
													setSettings(settings);
												}}
												value={item.label}
											/>
										</li>
									))}
								</ul>
							</div>
						</CP.Bem>
					) : (
						<CenterSpinner />
					)}
				</>
			</>
		);
	},
	save({ attributes, className }) {
		return false;
	},
});
