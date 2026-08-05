const { __ } = wp.i18n;

wp.blocks.registerBlockType("catpow/accessmap", {
	apiVersion: 3,
	title: "🐾 Access Map",
	description: __("地図とアクセス情報を表示", "catpow"),
	icon: "location-alt",
	category: "catpow",
	example: CP.example,
	edit({ attributes, setAttributes, isSelected }) {
		const { useMemo } = wp.element;
		const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
		const { Icon, PanelBody, TextareaControl } = wp.components;
		const { isTemplate, classes, vars, HeadingTag, items = [], z, t, hl, loopCount, doLoop, EditMode = false, AltMode = false } = attributes;

		var states = useMemo(() => CP.classNamesToFlags(classes), [classes]);

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				{
					name: "type",
					type: "buttons",
					label: __("タイプ", "catpow"),
					values: { isTypeFlat: __("フラット", "catpow"), isTypeCard: __("カード", "catpow"), isTypeFrame: __("フーレム", "catpow") },
				},
				{
					name: "mapColor",
					type: "buttons",
					label: __("地図の色", "catpow"),
					values: {
						hasMapColorNone: __("通常", "catpow"),
						hasMapColorGray: __("グレー", "catpow"),
						hasMapColorSync: __("同色", "catpow"),
					},
				},
				{ name: "hasTel", values: "hasTel", label: __("電話番号", "catpow") },
				{ name: "hasMail", values: "hasMail", label: __("メール", "catpow") },
				{ name: "hasSite", values: "hasSite", label: __("サイト", "catpow") },
				{
					name: "t",
					key: "t",
					input: "select",
					label: __("地図タイプ", "catpow"),
					values: {
						m: __("地図", "catpow"),
						k: __("航空写真", "catpow"),
						h: __("地図 + 航空写真", "catpow"),
						p: __("地形図", "catpow"),
						e: "Google Earth",
					},
				},
				{
					name: "z",
					key: "z",
					input: "range",
					label: __("ズーム", "catpow"),
					min: 0,
					max: 23,
				},
				{
					name: "hl",
					key: "hl",
					input: "buttons",
					label: __("言語", "catpow"),
					values: ["ja", "us", "zh-CN", "zh-TW"],
				},
				"isTemplate",
			];
			wp.hooks.applyFilters("catpow.blocks.accessmap.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);
		const selectiveItemClasses = useMemo(() => {
			const selectiveItemClasses = [
				"color",
				{
					name: "source",
					type: "gridbuttons",
					values: { useQuery: __("検索", "catpow"), useEmbedUrl: __("埋め込みURL", "catpow") },
					sub: {
						useQuery: [
							{ name: "q", key: "q", input: "text", label: __("検索ワード", "catpow") },
							{ name: "ll", key: "ll", input: "text", label: __("中心座標", "catpow") },
						],
						useEmbedUrl: [
							{
								name: "src",
								key: "src",
								input: "textarea",
								label: __("埋め込みURL", "catpow"),
								rows: 10,
								filter: (value, state, props) => {
									const matches = value.match(/src="(.+?)"/);
									if (matches) {
										return matches[1];
									}
									return value;
								},
							},
						],
					},
				},
			];
			wp.hooks.applyFilters("catpow.blocks.accessmap.selectiveItemClasses", CP.finderProxy(selectiveItemClasses));
			return selectiveItemClasses;
		}, []);
		const selectiveItemTemplateClasses = useMemo(() => {
			const selectiveItemTemplateClasses = [
				{
					name: "imageMapCode",
					input: "text",
					label: __("地図画像コード", "catpow"),
					key: "imageCode",
					cond: "hasImage",
				},
			];
			wp.hooks.applyFilters("catpow.blocks.accessmap.selectiveItemTemplateClasses", CP.finderProxy(selectiveItemTemplateClasses));
			return selectiveItemTemplateClasses;
		}, []);

		const save = () => {
			setAttributes({ items: JSON.parse(JSON.stringify(items)) });
		};

		const blockProps = useBlockProps({ className: EditMode || (AltMode && doLoop) ? "cp-altcontent" : classes, style: vars });

		return (
			<>
				<CP.SelectModeToolbar setAttributes={setAttributes} attributes={attributes} />
				<InspectorControls>
					<CP.SelectClassPanel title={__("スタイル", "catpow")} icon="art" {...{ setAttributes, attributes }} selectiveClasses={selectiveClasses} />
					<CP.SelectClassPanel title={__("リストアイテム", "catpow")} icon="edit" {...{ setAttributes, attributes }} itemKeys={["items", attributes.currentItemIndex]} selectiveClasses={selectiveItemClasses} />
					{isTemplate && (
						<CP.SelectClassPanel
							title={__("テンプレート", "catpow")}
							icon="edit"
							{...{ setAttributes, attributes }}
							itemKeys={["items", attributes.currentItemIndex]}
							selectiveClasses={selectiveItemTemplateClasses}
						/>
					)}
					<CP.ItemControlInfoPanel />
				</InspectorControls>
				{EditMode ? (
					<div {...blockProps}>
						<CP.Label icon="welcome-comments">{__("アクセス情報", "catpow")}</CP.Label>
						<CP.EditItemsTable
							setAttributes={setAttributes}
							attributes={attributes}
							columns={[
								{ type: "text", key: "q" },
								{ type: "text", key: "ll" },
								{ type: "text", key: "title" },
								{ type: "text", key: "zipcode" },
								{ type: "text", key: "address" },
								{ type: "text", key: "tel" },
								{ type: "text", key: "mail" },
								{ type: "text", key: "site" },
								{ type: "text", key: "info" },
							]}
							isTemplate={isTemplate}
						/>
					</div>
				) : (
					<>
						{AltMode && doLoop ? (
							<div {...blockProps}>
								<CP.Label icon="welcome-comments">{__("代替コンテンツ", "catpow")}</CP.Label>
								<InnerBlocks />
							</div>
						) : (
							<CP.Bem prefix="wp-block-catpow">
								<div {...blockProps}>
									{[...Array(Math.max(items.length, loopCount)).keys()].map((i) => {
										let url;
										const index = i % items.length;
										const item = items[index];
										const itemState = CP.classNamesToFlags(item.classes);
										if (itemState.useEmbedURL) {
											url = item.src;
										} else {
											let q = item.q || item.address.replace(/<br\/?>|\n/, " ");
											url = `https://www.google.com/maps?output=embed&z=${z}&t=${t}&hl=${hl}&q=${q}`;
											if (!!item.ll) {
												url += `&ll=${item.ll}`;
											}
										}

										if (!item.controlClasses) {
											item.controlClasses = "control";
										}
										return (
											<CP.Item tag="div" className={item.classes} {...{ setAttributes, attributes }} itemKeys={["items", index]} key={i}>
												<div className="_map">
													{isTemplate ? (
														<CP.DummyImage className="_gmap" text={item.q || item.address.replace(/<br\/?>|\n/, " ")} />
													) : (
														<iframe src={url} className="_gmap" data-ll={item.ll || false} data-q={item.q || false}></iframe>
													)}
												</div>
												<div className="_access">
													<RichText
														tagName={HeadingTag}
														className="_title"
														onChange={(title) => {
															item.title = title;
															save();
														}}
														value={item.title}
													/>
													<RichText
														tagName="div"
														className="_address"
														onChange={(address) => {
															item.address = address;
															save();
														}}
														value={item.address}
													/>
													{states.hasTel && (
														<RichText
															tagName="div"
															className="_tel"
															onChange={(tel) => {
																item.tel = tel;
																save();
															}}
															value={item.tel}
														/>
													)}
													{states.hasMail && (
														<RichText
															tagName="div"
															className="_mail"
															onChange={(mail) => {
																item.mail = mail;
																save();
															}}
															value={item.mail}
														/>
													)}
													{states.hasSite && (
														<RichText
															tagName="div"
															className="_site"
															onChange={(site) => {
																item.site = site;
																save();
															}}
															value={item.site}
														/>
													)}
													<RichText
														tagName="div"
														className="_info"
														onChange={(info) => {
															item.info = info;
															save();
														}}
														value={item.info}
													/>
												</div>
											</CP.Item>
										);
									})}
								</div>
							</CP.Bem>
						)}
					</>
				)}
			</>
		);
	},
	save({ attributes }) {
		const { InnerBlocks, RichText } = wp.blockEditor;
		const { classes, vars, HeadingTag, items = [], z, t, hl, doLoop } = attributes;
		const states = CP.classNamesToFlags(classes);

		return (
			<>
				<CP.Bem prefix="wp-block-catpow">
					<div className={classes} style={vars}>
						{items.map((item, index) => {
							let url;
							const itemState = CP.classNamesToFlags(item.classes);
							if (itemState.useEmbedURL) {
								url = item.src;
							} else {
								let q = item.q || item.address.replace(/<br\/?>|\n/, " ");
								url = `https://www.google.com/maps?output=embed&z=${z}&t=${t}&hl=${hl}&q=${q}`;
								if (!!item.ll) {
									url += `&ll=${item.ll}`;
								}
							}
							return (
								<div className={item.classes} key={index}>
									<div className="_map">
										<iframe src={url} className="_gmap" data-ll={item.ll} data-q={item.q}></iframe>
									</div>
									<div className="_access">
										<RichText.Content tagName={HeadingTag} className="_title" value={item.title} />
										<RichText.Content tagName="div" className="_address" value={item.address} />
										{states.hasTel && <RichText.Content tagName="div" className="_tel" value={item.tel} />}
										{states.hasMail && <RichText.Content tagName="div" className="_mail" value={item.mail} />}
										{states.hasSite && <RichText.Content tagName="div" className="_site" value={item.site} />}
										<RichText.Content tagName="div" className="_info" value={item.info} />
									</div>
								</div>
							);
						})}
					</div>
				</CP.Bem>
				{doLoop && (
					<on-empty>
						<InnerBlocks.Content />
					</on-empty>
				)}
			</>
		);
	},
});
