(() => {
	// ../blocks/dialog/editor_script.jsx
	wp.blocks.registerBlockType("catpow/dialog", {
		title: "\u{1F43E} Dialog",
		description: "\u30D5\u30AD\u30C0\u30B7\u3067\u4F1A\u8A71\u3092\u8868\u73FE\u3059\u308B\u30D6\u30ED\u30C3\u30AF\u3067\u3059\u3002",
		icon: "format-chat",
		category: "catpow",
		transforms: {
			from: [
				{
					type: "block",
					blocks: CP.listedConvertibles,
					transform: (attributes) => {
						attributes.classes = "wp-block-catpow-dialog";
						return wp.blocks.createBlock("catpow/dialog", attributes);
					},
				},
			],
		},
		example: CP.example,
		edit({ attributes, className, setAttributes, isSelected }) {
			const { useState, useMemo } = wp.element;
			const { InnerBlocks, InspectorControls, RichText: RichText2 } = wp.blockEditor;
			const { Icon, PanelBody, TextareaControl } = wp.components;
			const { items = [], classes: classes2 = "", countPrefix, countSuffix, subCountPrefix, subCountSuffix, loopCount, doLoop, EditMode = false, AltMode = false } = attributes;
			const primaryClass = "wp-block-catpow-dialog";
			var classArray = _.uniq((className + " " + classes2).split(" "));
			var classNameArray = className.split(" ");
			var states = CP.classNamesToFlags(classes2);
			const selectiveClasses = useMemo(() => {
				const selectiveClasses2 = [
					{
						name: "template",
						label: "\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8",
						values: "isTemplate",
						sub: [
							{
								name: "loop",
								input: "bool",
								label: "\u30EB\u30FC\u30D7",
								key: "doLoop",
								sub: [
									{
										name: "contentPath",
										label: "content path",
										input: "text",
										key: "content_path",
									},
									{
										name: "query",
										label: "query",
										input: "textarea",
										key: "query",
									},
									{
										name: "loopCount",
										label: "\u30D7\u30EC\u30D3\u30E5\u30FC\u30EB\u30FC\u30D7\u6570",
										input: "range",
										key: "loopCount",
										min: 1,
										max: 16,
									},
								],
							},
						],
					},
				];
				wp.hooks.applyFilters("catpow.blocks.dialog.selectiveClasses", CP.finderProxy(selectiveClasses2));
				return selectiveClasses2;
			}, []);
			const selectiveItemClasses = useMemo(() => {
				const selectiveItemClasses2 = [
					"color",
					{
						name: "position",
						type: "buttons",
						label: "position",
						values: ["left", "right"],
					},
					{
						name: "type",
						type: "gridbuttons",
						label: "type",
						filter: "type",
						values: ["say", "shout", "think", "whisper"],
					},
				];
				wp.hooks.applyFilters("catpow.blocks.dialog.selectiveItemClasses", CP.finderProxy(selectiveItemClasses2));
				return selectiveItemClasses2;
			}, []);
			let itemsCopy = items.map((obj) => jQuery.extend(true, {}, obj));
			let rtn = [];
			const imageKeys = {
				headerImage: {
					src: "headerImageSrc",
					alt: "headerImageAlt",
					code: "headerImageCode",
					items: "items",
				},
			};
			itemsCopy.map((item, index) => {
				if (!item.controlClasses) {
					item.controlClasses = "control";
				}
				rtn.push(
					/* @__PURE__ */ wp.element.createElement(
						CP.Item,
						{ tag: "li", set: setAttributes, attr: attributes, items: itemsCopy, index, isSelected, key: index },
						/* @__PURE__ */ wp.element.createElement(
							"header",
							null,
							/* @__PURE__ */ wp.element.createElement(
								"div",
								{ className: "image" },
								/* @__PURE__ */ wp.element.createElement(CP.SelectResponsiveImage, {
									attr: attributes,
									set: setAttributes,
									keys: imageKeys.headerImage,
									index,
									size: "thumbnail",
									isTemplate: states.isTemplate,
								})
							),
							/* @__PURE__ */ wp.element.createElement(
								"div",
								{ className: "text" },
								/* @__PURE__ */ wp.element.createElement(
									"h3",
									null,
									/* @__PURE__ */ wp.element.createElement(RichText2, {
										onChange: (text) => {
											itemsCopy[index].title = text;
											setAttributes({ items: itemsCopy });
										},
										value: item.title,
									})
								)
							)
						),
						/* @__PURE__ */ wp.element.createElement(
							"div",
							{ className: "contents" },
							/* @__PURE__ */ wp.element.createElement(
								"p",
								null,
								/* @__PURE__ */ wp.element.createElement(RichText2, {
									onChange: (text) => {
										itemsCopy[index].text = text;
										setAttributes({ items: itemsCopy });
									},
									value: item.text,
								})
							)
						)
					)
				);
			});
			if (rtn.length < loopCount) {
				let len = rtn.length;
				while (rtn.length < loopCount) {
					rtn.push(rtn[rtn.length % len]);
				}
			}
			return /* @__PURE__ */ wp.element.createElement(
				wp.element.Fragment,
				null,
				/* @__PURE__ */ wp.element.createElement(CP.SelectModeToolbar, { set: setAttributes, attr: attributes }),
				/* @__PURE__ */ wp.element.createElement(
					InspectorControls,
					null,
					/* @__PURE__ */ wp.element.createElement(
						PanelBody,
						{ title: "CLASS", icon: "admin-generic", initialOpen: false },
						/* @__PURE__ */ wp.element.createElement(TextareaControl, { label: "\u30AF\u30E9\u30B9", onChange: (clss) => setAttributes({ classes: clss }), value: classArray.join(" ") })
					),
					/* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, { title: "\u30AF\u30E9\u30B9", icon: "art", set: setAttributes, attr: attributes, selectiveClasses }),
					/* @__PURE__ */ wp.element.createElement(CP.SelectClassPanel, {
						title: "\u30EA\u30B9\u30C8\u30A2\u30A4\u30C6\u30E0",
						icon: "edit",
						set: setAttributes,
						attr: attributes,
						items: itemsCopy,
						index: attributes.currentItemIndex,
						selectiveClasses: selectiveItemClasses,
					}),
					/* @__PURE__ */ wp.element.createElement(CP.ItemControlInfoPanel, null)
				),
				/* @__PURE__ */ wp.element.createElement(
					wp.element.Fragment,
					null,
					EditMode
						? /* @__PURE__ */ wp.element.createElement(
								"div",
								{ className: "cp-altcontent" },
								/* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "edit" })),
								/* @__PURE__ */ wp.element.createElement(CP.EditItemsTable, {
									set: setAttributes,
									attr: attributes,
									columns: [
										{
											type: "image",
											label: "header",
											keys: imageKeys.headerImage,
											cond: true,
										},
										{
											type: "text",
											key: "headerImageCode",
											cond: states.isTemplate,
										},
										{ type: "text", key: "title", cond: true },
										{ type: "text", key: "text", cond: true },
									],
									isTemplate: states.isTemplate,
								})
						  )
						: /* @__PURE__ */ wp.element.createElement(
								wp.element.Fragment,
								null,
								AltMode && doLoop
									? /* @__PURE__ */ wp.element.createElement(
											"div",
											{ className: "cp-altcontent" },
											/* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: "welcome-comments" })),
											/* @__PURE__ */ wp.element.createElement(InnerBlocks, null)
									  )
									: /* @__PURE__ */ wp.element.createElement("ul", { className: classes2 }, rtn)
						  )
				)
			);
		},
		save({ attributes, className }) {
			const { InnerBlocks, RichText: RichText2 } = wp.blockEditor;
			const { items = [], classes: classes2 = "", countPrefix, countSuffix, subCountPrefix, subCountSuffix, linkUrl, linkText, loopParam, doLoop } = attributes;
			var classArray = _.uniq(classes2.split(" "));
			var states = CP.classNamesToFlags(classes2);
			const imageKeys = {
				headerImage: {
					src: "headerImageSrc",
					alt: "headerImageAlt",
					code: "headerImageCode",
					items: "items",
				},
			};
			let rtn = [];
			items.map((item, index) => {
				rtn.push(
					/* @__PURE__ */ wp.element.createElement(
						"li",
						{ className: item.classes, key: index },
						/* @__PURE__ */ wp.element.createElement(
							"header",
							null,
							/* @__PURE__ */ wp.element.createElement(
								"div",
								{ className: "image" },
								/* @__PURE__ */ wp.element.createElement(CP.ResponsiveImage, { attr: attributes, keys: imageKeys.headerImage, index, isTemplate: states.isTemplate })
							),
							/* @__PURE__ */ wp.element.createElement(
								"div",
								{ className: "text" },
								/* @__PURE__ */ wp.element.createElement("h3", null, /* @__PURE__ */ wp.element.createElement(RichText2.Content, { value: item.title }))
							)
						),
						/* @__PURE__ */ wp.element.createElement(
							"div",
							{ className: "contents" },
							/* @__PURE__ */ wp.element.createElement("p", null, /* @__PURE__ */ wp.element.createElement(RichText2.Content, { value: item.text }))
						)
					)
				);
			});
			return /* @__PURE__ */ wp.element.createElement(
				wp.element.Fragment,
				null,
				/* @__PURE__ */ wp.element.createElement("ul", { className: classes2 }, rtn),
				doLoop && /* @__PURE__ */ wp.element.createElement("onEmpty", null, /* @__PURE__ */ wp.element.createElement(InnerBlocks.Content, null))
			);
		},
		deprecated: [
			{
				save({ attributes, className }) {
					const { items = [], classes: classes2 = "", countPrefix, countSuffix, subCountPrefix, subCountSuffix, linkUrl, linkText, loopParam } = attributes;
					var classArray = _.uniq(classes2.split(" "));
					var states = CP.classNamesToFlags(classes2);
					let rtn = [];
					items.map((item, index) => {
						rtn.push(
							/* @__PURE__ */ wp.element.createElement(
								"li",
								{ className: item.classes },
								/* @__PURE__ */ wp.element.createElement(
									"header",
									null,
									/* @__PURE__ */ wp.element.createElement("div", { className: "image" }, /* @__PURE__ */ wp.element.createElement("img", { src: item.headerImageSrc, alt: item.headerImageAlt })),
									/* @__PURE__ */ wp.element.createElement(
										"div",
										{ className: "text" },
										/* @__PURE__ */ wp.element.createElement("h3", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.title }))
									)
								),
								/* @__PURE__ */ wp.element.createElement(
									"div",
									{ className: "contents" },
									/* @__PURE__ */ wp.element.createElement("p", null, /* @__PURE__ */ wp.element.createElement(RichText.Content, { value: item.text }))
								)
							)
						);
					});
					return /* @__PURE__ */ wp.element.createElement("ul", { className: classes2 }, states.doLoop && "[loop_template " + loopParam + "]", rtn, states.doLoop && "[/loop_template]");
				},
				migrate(attributes) {
					var states = CP.classNamesToFlags(classes);
					attributes.content_path = attributes.loopParam.split(" ")[0];
					attributes.query = attributes.loopParam.split(" ").slice(1).join("\n");
					attributes.doLoop = states.doLoop;
					return attributes;
				},
			},
		],
	});
})();
