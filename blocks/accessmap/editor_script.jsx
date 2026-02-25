wp.blocks.registerBlockType("catpow/accessmap", {
	title: "🐾 Access Map",
	description: "地図とアクセス情報を表示",
	icon: "location-alt",
	category: "catpow",
	example: CP.example,
	edit({ attributes, setAttributes, isSelected }) {
		const { useMemo } = wp.element;
		const { InnerBlocks, InspectorControls, RichText, useBlockProps } = wp.blockEditor;
		const { Icon, PanelBody, TextareaControl } = wp.components;
		const { classes, vars, TitleTag, items = [], z, t, hl, loopCount, doLoop, EditMode = false, AltMode = false } = attributes;

		var states = useMemo(() => CP.classNamesToFlags(classes), [classes]);

		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				"level",
				"color",
				"colorScheme",
				"itemSize",
				{
					name: "mapColor",
					type: "buttons",
					label: "地図の色",
					values: {
						hasMapColorNone: "通常",
						hasMapColorGray: "グレー",
						hasMapColorSync: "同色",
					},
				},
				{
					name: "titleTag",
					input: "buttons",
					key: "TitleTag",
					label: "タイトルタグ",
					values: ["h2", "h3", "h4"],
				},
				{ name: "hasTel", values: "hasTel", label: "電話番号" },
				{ name: "hasMail", values: "hasMail", label: "メール" },
				{ name: "hasSite", values: "hasSite", label: "サイト" },
				{
					name: "t",
					key: "t",
					input: "select",
					label: "タイプ",
					values: {
						m: "地図",
						k: "航空写真",
						h: "地図 + 航空写真",
						p: "地形図",
						e: "Google Earth",
					},
				},
				{
					name: "z",
					key: "z",
					input: "range",
					label: "ズーム",
					min: 0,
					max: 23,
				},
				{
					name: "hl",
					key: "hl",
					input: "buttons",
					label: "言語",
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
					values: { useQuery: "検索", useEmbedUrl: "埋め込みURL" },
					sub: {
						useQuery: [
							{ name: "q", key: "q", input: "text", label: "検索ワード" },
							{ name: "ll", key: "ll", input: "text", label: "中心座標" },
						],
						useEmbedUrl: [
							{
								name: "src",
								key: "src",
								input: "textarea",
								label: "埋め込みURL",
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
					label: "地図画像コード",
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
				<CP.SelectModeToolbar set={setAttributes} attr={attributes} />
				<InspectorControls>
					<CP.SelectClassPanel title="クラス" icon="art" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label="クラス" onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
					<CP.SelectClassPanel title="リストアイテム" icon="edit" set={setAttributes} attr={attributes} items={items} index={attributes.currentItemIndex} selectiveClasses={selectiveItemClasses} />
					{states.isTemplate && (
						<CP.SelectClassPanel
							title="テンプレート"
							icon="edit"
							set={setAttributes}
							attr={attributes}
							items={items}
							index={attributes.currentItemIndex}
							selectiveClasses={selectiveItemTemplateClasses}
						/>
					)}
					<CP.ItemControlInfoPanel />
				</InspectorControls>
				{EditMode ? (
					<div {...blockProps}>
						<CP.Label icon="welcome-comments">アクセス情報</CP.Label>
						<CP.EditItemsTable
							set={setAttributes}
							attr={attributes}
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
							isTemplate={states.isTemplate}
						/>
					</div>
				) : (
					<>
						{AltMode && doLoop ? (
							<div {...blockProps}>
								<CP.Label icon="welcome-comments">代替コンテンツ</CP.Label>
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
											<CP.Item tag="div" className={item.classes} set={setAttributes} attr={attributes} items={items} index={index} isSelected={isSelected} key={i}>
												<div className="_map">
													{states.isTemplate ? (
														<CP.DummyImage className="_gmap" text={item.q || item.address.replace(/<br\/?>|\n/, " ")} />
													) : (
														<iframe src={url} className="_gmap" data-ll={item.ll || false} data-q={item.q || false}></iframe>
													)}
												</div>
												<div className="_access">
													<RichText
														tagName={TitleTag}
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
		const { classes, vars, TitleTag, items = [], z, t, hl, doLoop } = attributes;
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
										<RichText.Content tagName={TitleTag} className="_title" value={item.title} />
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
