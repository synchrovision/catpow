const { __ } = wp.i18n;
const { BlockControls, RichTextToolbarButton, RichTextShortcut } = wp.blockEditor;
const { Popover, BaseControl, TextControl, RangeControl, Card, CardBody, ToolbarGroup } = wp.components;
const { useState, useMemo, useCallback, useReducer, useEffect } = wp.element;
const { removeFormat, applyFormat, toggleFormat, insert, create, slice } = wp.richText;

const textColorClasses = {
	"has-text-color-text": "通常",
	"has-text-color-highlight": "強調",
	"has-text-color-gradient": "グラデーション",
};
const textColorClassSet = new Set(Object.keys(textColorClasses));

const fontSizeClasses = {
	"has-font-size-relative-x-small": "極小",
	"has-font-size-relative-small": "小",
	"has-font-size-relative-medium": "中",
	"has-font-size-relative-large": "大",
	"has-font-size-relative-x-large": "極大",
};
const fontSizeClassSet = new Set(Object.keys(fontSizeClasses));
const fontWeightClasses = {
	"has-font-weight-specific-x-light": "極細",
	"has-font-weight-specific-light": "細",
	"has-font-weight-specific-regular": "中",
	"has-font-weight-specific-bold": "太",
	"has-font-weight-specific-x-bold": "極太",
};
const fontWeightClassSet = new Set(Object.keys(fontWeightClasses));
const fontFamilyClasses = {
	"has-font-family-gothic": "ゴシック",
	"has-font-family-mincho": "明朝",
	"has-font-family-english": "英数",
	"has-font-family-code": "コード",
	"has-font-family-decoration": "装飾",
	"has-font-family-script": "手書き",
};
const fontFamilyClassSet = new Set(Object.keys(fontFamilyClasses));

const toggleClass = (classes, targetClass, classSet) => {
	if (!classes) {
		return targetClass;
	}
	const currentClassSet = new Set(classes.split(" "));
	if (currentClassSet.has(targetClass)) {
		currentClassSet.delete(targetClass);
		return [...currentClassSet].join(" ");
	}
	if (classSet) {
		return [...currentClassSet.difference(classSet).add(targetClass)].join(" ");
	}
	return [...currentClassSet.add(targetClass)].join(" ");
};
const getClassInSet = (classes, classSet) => {
	if (!classes) {
		return undefined;
	}
	return classes.split(" ").find((c) => classSet.has(c));
};

import { translateColor } from "catpow/scssc";

wp.richText.registerFormatType("catpow/title", {
	title: "Title",
	tagName: "span",
	className: "cp-rtf-title",
	attributes: {
		type: "class",
	},
	edit(props) {
		const { isActive, value, onChange, activeAttributes, contentRef } = props;

		const onToggle = () => {
			return onChange(
				toggleFormat(value, {
					type: "catpow/title",
					attributes: { type: "is-header" },
				}),
			);
		};
		const setAttributes = useCallback(
			(attr) => {
				onChange(
					applyFormat(value, {
						type: "catpow/title",
						attributes: Object.assign(activeAttributes, attr),
					}),
				);
			},
			[value, activeAttributes],
		);

		const icon = (
			<svg role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
				<g>
					<path d="M6.9,15.9V2.6h2.7v5.2h5.3V2.6h2.7v13.3h-2.7v-5.8H9.6v5.8H6.9z" />
				</g>
				<rect x="1" y="1" width="4" height="18" />
				<rect x="5" y="18" width="14" height="1" />
			</svg>
		);

		return (
			<>
				{isActive && (
					<Popover anchor={contentRef.current} position="bottom center" focusOnMount={false}>
						<Card>
							<CardBody>
								<CP.SelectButtons
									options={[
										{ label: "header", value: "is-header" },
										{ label: "headline", value: "is-headline" },
										{ label: "catch", value: "is-catch" },
									]}
									selected={activeAttributes["type"]}
									onChange={(type) => setAttributes({ type })}
								/>
							</CardBody>
						</Card>
					</Popover>
				)}
				<BlockControls>
					<ToolbarGroup controls={[{ icon, onClick: onToggle, isActive }]} />
				</BlockControls>
			</>
		);
	},
});
wp.richText.registerFormatType("catpow/annotation", {
	title: "annotation",
	tagName: "small",
	className: "cp-rtf-annotation",
	edit({ isActive, value, onChange }) {
		const onToggle = () => onChange(toggleFormat(value, { type: "catpow/annotation" }));

		const icon = (
			<svg role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
				<path
					d="M2.99,2.01l7.04,7.04l7.04-7.04l0.62,0.62l-7.04,7.04l7.04,7.04l-0.62,0.62l-7.04-7.04l-7.06,7.06l-0.62-0.62l7.06-7.06
		L2.37,2.62L2.99,2.01z M3.95,11.26c-0.87,0-1.6-0.73-1.6-1.6s0.73-1.6,1.6-1.6s1.6,0.73,1.6,1.6C5.55,10.58,4.78,11.26,3.95,11.26z
		 M8.43,3.58c0-0.87,0.73-1.6,1.6-1.6s1.6,0.73,1.6,1.6s-0.73,1.6-1.6,1.6C9.11,5.18,8.43,4.42,8.43,3.58z M11.63,15.74
		c0,0.87-0.73,1.6-1.6,1.6s-1.6-0.73-1.6-1.6c0-0.88,0.73-1.6,1.6-1.6C10.94,14.14,11.63,14.91,11.63,15.74z M16.11,8.06
		c0.87,0,1.6,0.73,1.6,1.6s-0.73,1.6-1.6,1.6c-0.88,0-1.6-0.73-1.6-1.6C14.51,8.75,15.28,8.06,16.11,8.06z"
				/>
			</svg>
		);

		return (
			<>
				<BlockControls>
					<ToolbarGroup controls={[{ icon, onClick: onToggle, isActive }]} />
				</BlockControls>
			</>
		);
	},
});

wp.richText.registerFormatType("catpow/u", {
	title: "underline",
	tagName: "u",
	className: "cp-rtf-u",
	edit({ isActive, value, onChange }) {
		const onToggle = () => onChange(toggleFormat(value, { type: "catpow/u" }));

		const icon = (
			<svg role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
				<path d="M7.3,3.1v7.2c0,.6,0,1,.3,1.4.3.7.9,1,1.8,1,1.2,0,2.1-.6,2.5-1.7.2-.6.4-1.4.4-2.5V3.1h1.8v10.9h-1.7v-1.6c-.2.4-.5.8-.8,1-.7.6-1.5.9-2.5.9-1.5,0-2.6-.5-3.1-1.6-.3-.6-.4-1.3-.4-2.2V3.1h1.9Z" />
				<rect x="4.5" y="15.8" width="10.8" height="1.2" />
			</svg>
		);

		return (
			<>
				<RichTextShortcut type={"primary"} character={"_"} onUse={onToggle} />
				<BlockControls>
					<ToolbarGroup controls={[{ icon, onClick: onToggle, isActive }]} />
				</BlockControls>
			</>
		);
	},
});
wp.richText.registerFormatType("catpow/mark", {
	title: "Mark",
	tagName: "mark",
	className: "cp-rtf-mark",
	attributes: {
		color: "class",
	},
	edit(props) {
		const { isActive, value, onChange, activeAttributes, contentRef } = props;

		const onToggle = () => {
			return onChange(
				toggleFormat(value, {
					type: "catpow/mark",
					attributes: { color: "has-color0" },
				}),
			);
		};
		const setAttributes = useCallback(
			(attr) => {
				onChange(
					applyFormat(value, {
						type: "catpow/mark",
						attributes: Object.assign(activeAttributes, attr),
					}),
				);
			},
			[value, activeAttributes],
		);

		const icon = (
			<svg role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
				<rect fillOpacity="0.2" x="1.7" y="10.2" width="16.8" height="5.9" />
				<path d="M3.5,4.1h1.6v1.4c.4-.5.7-.8,1.1-1,.5-.4,1.2-.6,1.8-.6s1.4.2,1.9.6c.3.2.5.5.7,1,.4-.5.8-.9,1.3-1.2.5-.3,1-.4,1.7-.4,1.3,0,2.2.5,2.7,1.4.3.5.4,1.2.4,2.1v6.5h-1.7v-6.8c0-.6-.2-1.1-.5-1.3-.3-.2-.7-.4-1.2-.4s-1.2.2-1.7.6c-.5.4-.7,1.1-.7,2.2v5.7h-1.7v-6.4c0-.7,0-1.1-.2-1.4-.2-.5-.7-.7-1.4-.7s-1.2.2-1.7.7c-.5.5-.8,1.3-.8,2.6v5.2h-1.6V4.1Z" />
			</svg>
		);

		return (
			<>
				{isActive && (
					<Popover anchor={contentRef.current} position="bottom center" focusOnMount={false}>
						<Card size="small">
							<CardBody>
								<CP.ColorVarTracer target={contentRef.current}>
									<CP.SelectThemeColor onChange={(proxy) => setAttributes({ color: proxy.classes })} selected={activeAttributes["color"]} />
								</CP.ColorVarTracer>
							</CardBody>
						</Card>
					</Popover>
				)}
				<BlockControls>
					<ToolbarGroup controls={[{ icon, onClick: onToggle, isActive }]} />
				</BlockControls>
			</>
		);
	},
});
wp.richText.registerFormatType("catpow/tag", {
	title: "tag",
	tagName: "a",
	className: "cp-rtf-tag",
	attributes: {
		url: "href",
		color: "class",
	},
	edit(props) {
		const { isActive, value, onChange, onFocus, activeAttributes, activeObject, contentRef } = props;

		const onToggle = () => {
			return onChange(
				toggleFormat(value, {
					type: "catpow/tag",
					attributes: { class: "has-color0" },
				}),
			);
		};
		const setAttributes = useCallback(
			(attr) => {
				onChange(
					applyFormat(value, {
						type: "catpow/tag",
						attributes: Object.assign(activeAttributes, attr),
					}),
				);
			},
			[value, activeAttributes],
		);

		return (
			<>
				{isActive && (
					<Popover anchor={contentRef.current} position="bottom center" focusOnMount={false}>
						<Card>
							<CardBody>
								<TextControl label="URL" value={activeAttributes["url"]} onChange={(url) => setAttributes({ url })} />
							</CardBody>
						</Card>
						<Card size="small">
							<CardBody>
								<CP.ColorVarTracer target={contentRef.current}>
									<CP.SelectThemeColor onChange={(proxy) => setAttributes({ color: proxy.classes })} selected={activeAttributes["color"]} />
								</CP.ColorVarTracer>
							</CardBody>
						</Card>
					</Popover>
				)}
				<BlockControls>
					<ToolbarGroup controls={[{ icon: "tag", onClick: onToggle, isActive }]} />
				</BlockControls>
			</>
		);
	},
});
wp.richText.registerFormatType("catpow/small", {
	title: "small",
	tagName: "small",
	className: "cp-rtf-small",
	edit({ isActive, value, onChange }) {
		const onToggle = () => onChange(toggleFormat(value, { type: "catpow/small" }));

		const icon = (
			<svg role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
				<path d="M10,14.8c.4,0,.7,0,.9-.1.4-.2.7-.5.7-.9s-.1-.4-.3-.6c-.2-.1-.6-.3-1-.4l-.8-.2c-.8-.2-1.3-.4-1.6-.6-.5-.4-.8-.9-.8-1.6s.2-1.2.7-1.7,1.2-.7,2.2-.7,1.5.2,2,.6.9,1,.9,1.8h-1.5c0-.5-.2-.8-.6-1-.2-.1-.6-.2-.9-.2s-.7,0-1,.2-.4.4-.4.7.1.5.4.6c.2,0,.5.2,1,.3l1.3.3c.6.1,1,.3,1.3.6.5.4.7.9.7,1.6s-.3,1.3-.8,1.7-1.3.7-2.3.7-1.8-.2-2.3-.7-.9-1.1-.9-1.9h1.5c0,.3.1.6.3.8.3.3.7.5,1.3.5Z" />
			</svg>
		);

		return (
			<>
				<RichTextShortcut type={"primary"} character={"-"} onUse={onToggle} />
				<BlockControls>
					<ToolbarGroup controls={[{ icon, onClick: onToggle, isActive }]} />
				</BlockControls>
			</>
		);
	},
});

wp.richText.registerFormatType("catpow/ruby", {
	title: "Ruby",
	tagName: "ruby",
	className: "cp-rtf-ruby",
	edit({ isActive, value, onChange }) {
		const onToggle = () => {
			if (isActive) {
				return onChange(toggleFormat(value, { type: "catpow/ruby" }));
			}
			if (wp.richText.isCollapsed(value)) {
				alert(__("ルビをつけたいテキストを選択してください"));
				return;
			}
			let rt = prompt(__("ルビを入力"));
			if (rt === null) {
				return;
			}
			return onChange(
				wp.richText.insert(
					value,
					wp.richText.create({
						html: `<ruby class="rtf-ruby">${wp.richText.slice(value).text}<rt class="rtf-ruby__rt">${rt}</rt></ruby>`,
					}),
					value.start,
					value.end,
				),
			);
		};

		const icon = (
			<svg role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
				<path d="M4.9,5.6h6.2c1,0,1.9.2,2.5.5,1.2.6,1.9,1.6,1.9,3.2s-.2,1.5-.5,2c-.3.5-.8.9-1.4,1.2.5.2.9.5,1.2.8.3.4.4.9.4,1.7v1.8c0,.5.1.9.2,1.2.1.4.3.7.6.8v.3h-2.3c0-.1-.1-.3-.1-.5,0-.2,0-.5,0-1.1v-2.3c-.2-.9-.5-1.5-1.1-1.8-.3-.2-.9-.2-1.6-.2h-4.1v5.8h-1.8V5.6ZM10.9,11.9c.8,0,1.5-.2,2-.5.5-.3.7-1,.7-1.9s-.3-1.6-1-2c-.4-.2-.9-.3-1.5-.3h-4.4v4.6h4.1Z" />
				<g>
					<path d="M6.3,2.4c-.3,0-.5,0-.6.3,0,.1,0,.3,0,.5v1.3h-.7V1.7h.7v.5c.1-.2.2-.3.3-.4.1-.1.3-.2.5-.2s0,0,0,0c0,0,0,0,0,0v.7s0,0-.1,0,0,0,0,0Z" />
					<path d="M8.6,4s0,0,0,0,0,0,0,.1c-.1,0-.2.2-.3.2-.1,0-.2,0-.4,0-.4,0-.7-.1-.8-.4,0-.2-.1-.4-.1-.7v-1.6h.7v1.6c0,.2,0,.3,0,.3,0,.1.2.2.4.2s.4,0,.5-.3c0-.1,0-.2,0-.4v-1.4h.7v2.7h-.7v-.4Z" />
					<path d="M11.4,4.5c-.2,0-.4,0-.5-.1,0,0-.2-.1-.3-.3v.3h-.7V.8h.7v1.3c0-.1.2-.2.3-.3.1,0,.3-.1.5-.1.3,0,.6.1.8.4.2.3.3.6.3,1s0,.8-.3,1c-.2.3-.5.4-.8.4ZM11.8,3.1c0-.2,0-.3,0-.5,0-.2-.3-.4-.5-.4s-.4.1-.5.3c0,.1,0,.3,0,.5s0,.4.2.6c.1.1.3.2.5.2s.3,0,.4-.2c0-.1.1-.3.1-.6Z" />
					<path d="M14.1,3.7l.5-2h.7l-.9,2.6c-.2.5-.3.8-.4.9s-.3.2-.6.2-.1,0-.1,0,0,0-.2,0v-.6h0c0,0,.1,0,.2,0,0,0,.1,0,.2,0,0,0,0,0,.1-.2,0,0,0-.1,0-.2l-1-2.8h.8l.6,2Z" />
				</g>
			</svg>
		);

		return (
			<>
				<RichTextShortcut type={"primary"} character={"r"} onUse={onToggle} />
				<BlockControls>
					<ToolbarGroup controls={[{ icon, onClick: onToggle, isActive }]} />
				</BlockControls>
			</>
		);
	},
});
wp.richText.registerFormatType("catpow/rt", {
	title: "RubyText",
	tagName: "rt",
	className: "cp-rtf-ruby__rt",
});

wp.richText.registerFormatType("catpow/strong", {
	title: "Strong",
	tagName: "strong",
	className: "cp-rtf-strong-text",
	attributes: {
		strength: "class",
	},
	edit(props) {
		const { isActive, value, onChange, activeAttributes, contentRef } = props;

		const onToggle = () => {
			return onChange(
				toggleFormat(value, {
					type: "catpow/strong",
					attributes: { strength: "cp-rtf-strong" },
				}),
			);
		};
		const setAttributes = useCallback(
			(attr) => {
				onChange(
					applyFormat(value, {
						type: "catpow/strong",
						attributes: Object.assign(activeAttributes, attr),
					}),
				);
			},
			[value, activeAttributes],
		);

		const icon = (
			<svg role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
				<path d="M1,12.5c.5.8,1.5,1.6,2.5,1.6s1.2-.3,1.2-1-.1-.6-.3-.8c-.2-.2-.4-.4-.7-.6-.8-.6-1.4-1.2-1.9-1.8-.5-.7-.8-1.5-.8-2.5,0-1.7,1.1-4.8,4.4-4.8s2,.3,2.8.7v4.4c-.5-.7-1.4-1.6-2.3-1.6s-1,.3-1,.9.2.6.4.8c.2.2.5.4.7.6.8.6,1.5,1.1,1.9,1.8.5.7.7,1.4.7,2.5,0,2.7-1.9,4.8-4.6,4.8s-2-.2-2.9-.6v-4.5Z" />
				<path d="M13.9,7.7c-.5-.4-1.1-.8-1.7-.8s-1.2.4-1.2,1.2c0,2,3.6,2.1,3.6,5.4s-1.2,3.8-3.5,3.8-1.5-.2-2.1-.6v-2.3c.6.4,1.1.6,1.8.6s1.4-.5,1.4-1.3-.7-1.3-1.4-1.8c-1.4-.9-2.2-1.8-2.2-3.6s1.1-3.6,3.2-3.6,1.5.2,2.1.6v2.3Z" />
				<path d="M18.5,8.8c-.3-.2-.7-.4-1.1-.4-.7,0-1.2.6-1.2,1.3s.1.7.4,1.1l1,1.1c.9.9,1.4,1.5,1.4,2.9s-.9,2.5-2.3,2.5-1-.1-1.4-.5v-1.3c.4.3.8.5,1.3.5.8,0,1.1-.6,1.1-1.4,0-1.9-2.7-2.3-2.7-4.9s.7-2.5,2.2-2.5,1,0,1.4.3v1.3Z" />
			</svg>
		);
		const { options } = useMemo(
			() =>
				CP.parseSelections({
					"cp-rtf-strong": "小強",
					"cp-rtf-stronger": "中強",
					"cp-rtf-strongest": "大強",
				}),

			[],
		);

		return (
			<>
				{isActive && (
					<Popover anchor={contentRef.current} position="bottom center" focusOnMount={false}>
						<Card size="small">
							<CardBody>
								<CP.SelectButtons onChange={(strength) => setAttributes({ strength })} selected={activeAttributes["strength"]} options={options} />
							</CardBody>
						</Card>
					</Popover>
				)}
				<BlockControls>
					<ToolbarGroup controls={[{ icon, onClick: onToggle, isActive }]} />
				</BlockControls>
			</>
		);
	},
});
wp.richText.registerFormatType("catpow/fontsize", {
	title: "FontSize",
	tagName: "span",
	className: "has-font-size-relative",
	attributes: {
		size: "class",
	},
	edit(props) {
		const { isActive, value, onChange, activeAttributes, contentRef } = props;

		const onToggle = () => {
			return onChange(
				toggleFormat(value, {
					type: "catpow/fontsize",
					attributes: { size: "has-font-size-relative-medium" },
				}),
			);
		};
		const setAttributes = useCallback(
			(attr) => {
				onChange(
					applyFormat(value, {
						type: "catpow/fontsize",
						attributes: Object.assign(activeAttributes, attr),
					}),
				);
			},
			[value, activeAttributes],
		);
		const { options } = useMemo(
			() => CP.parseSelections(fontSizeClasses),

			[],
		);

		const icon = (
			<svg role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
				<path d="M8.3.7v2.9c-.2,0-.5,0-1,0s-.8,0-1,.3c-.2.2-.3.5-.3.7v1.2h2.4v2.5h-2.4v11.1h-3.6v-11.1H.5v-2.5h2v-.9c0-1.5.2-2.5.7-3,.5-.8,1.8-1.2,3.8-1.2s.4,0,.6,0c.2,0,.4,0,.8,0Z" />
				<path d="M14.4,4.8v2.3c-.2,0-.4,0-.8,0s-.6,0-.8.2c-.1.2-.2.4-.2.6v.9h1.8v2h-1.8v8.7h-2.8v-8.7h-1.6v-2h1.5v-.7c0-1.2.2-1.9.6-2.4.4-.6,1.4-1,3-1s.3,0,.5,0c.1,0,.3,0,.6,0Z" />
				<path d="M19.2,8.7v1.7c-.1,0-.3,0-.6,0s-.5,0-.6.2c-.1.1-.2.3-.2.4v.7h1.4v1.5h-1.4v6.4h-2.1v-6.4h-1.2v-1.5h1.1v-.5c0-.8.1-1.4.4-1.7.3-.5,1-.7,2.2-.7s.2,0,.4,0c.1,0,.3,0,.4,0Z" />
			</svg>
		);

		return (
			<>
				{isActive && (
					<Popover anchor={contentRef.current} position="bottom center" focusOnMount={false}>
						<Card size="small">
							<CardBody>
								<CP.ColorVarTracer target={contentRef.current}>
									<CP.SelectButtons onChange={(size) => setAttributes({ size })} selected={activeAttributes["size"]} options={options} />
								</CP.ColorVarTracer>
							</CardBody>
						</Card>
					</Popover>
				)}
				<BlockControls>
					<ToolbarGroup controls={[{ icon, onClick: onToggle, isActive }]} />
				</BlockControls>
			</>
		);
	},
});
wp.richText.registerFormatType("catpow/fontweight", {
	title: "FontWeight",
	tagName: "span",
	className: "has-font-weight",
	attributes: {
		weight: "class",
	},
	edit(props) {
		const { isActive, value, onChange, activeAttributes, contentRef } = props;

		const onToggle = () => {
			return onChange(
				toggleFormat(value, {
					type: "catpow/fontweight",
					attributes: { weight: "has-font-weight-specific-regular" },
				}),
			);
		};
		const setAttributes = useCallback(
			(attr) => {
				onChange(
					applyFormat(value, {
						type: "catpow/fontweight",
						attributes: Object.assign(activeAttributes, attr),
					}),
				);
			},
			[value, activeAttributes],
		);
		const { options } = useMemo(
			() => CP.parseSelections(fontWeightClasses),

			[],
		);

		const icon = (
			<svg role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
				<path d="M6.8,3.5v2.1c-.2,0-.4,0-.8,0-.4,0-.6,0-.7.2-.1.2-.2.3-.2.5v.8h1.8v1.8h-1.8v8.1h-2.7v-8.1H.8v-1.8h1.5v-.6c0-1.1.2-1.8.6-2.2.4-.6,1.4-.9,2.9-.9s.3,0,.5,0,.3,0,.6,0Z" />
				<path d="M10.2,4.3c.4-.6,1.2-.8,2.3-.8s.2,0,.3,0c.1,0,.2,0,.4,0v1.5c-.2,0-.3,0-.4,0,0,0-.2,0-.2,0-.5,0-.8.1-.9.4-.1.3-.2.9-.2,2h1.7v1.3h-1.7v8.5h-1.7v-8.5h-1.4v-1.3h1.4v-1.5c0-.7.2-1.2.4-1.5Z" />
				<path d="M14.4,8.3v-.9h1.5v-1.5c0-.8.2-1.4.5-1.8.3-.5.9-.7,1.7-.7s.4,0,.5,0c.2,0,.3,0,.5,0v1c-.3,0-.5,0-.7,0-.3,0-.5,0-.7.2-.2.1-.3.2-.4.4,0,.2-.1.4-.1.6s0,.4,0,.7v1.2h2v.9h-2v8.8h-1.2v-8.8h-1.5Z" />
			</svg>
		);

		return (
			<>
				{isActive && (
					<Popover anchor={contentRef.current} position="bottom center" focusOnMount={false}>
						<Card size="small">
							<CardBody>
								<CP.ColorVarTracer target={contentRef.current}>
									<CP.SelectButtons onChange={(weight) => setAttributes({ weight })} selected={activeAttributes["weight"]} options={options} />
								</CP.ColorVarTracer>
							</CardBody>
						</Card>
					</Popover>
				)}
				<BlockControls>
					<ToolbarGroup controls={[{ icon, onClick: onToggle, isActive }]} />
				</BlockControls>
			</>
		);
	},
});

wp.richText.registerFormatType("catpow/compose", {
	title: "compose",
	tagName: "span",
	className: "cp-rtf-compose",
	attributes: {
		classes: "class",
		vars: "style",
	},
	edit(props) {
		const { isActive, value, onChange, activeAttributes, contentRef } = props;

		const onToggle = () => {
			return onChange(
				toggleFormat(value, {
					type: "catpow/compose",
					attributes: { classes: "has-text-color-hilight has-color0" },
				}),
			);
		};
		const setAttributes = useCallback(
			(attr) => {
				onChange(
					applyFormat(value, {
						type: "catpow/compose",
						attributes: Object.assign(activeAttributes, attr),
					}),
				);
			},
			[value, activeAttributes],
		);

		return (
			<>
				{isActive && (
					<Popover anchor={contentRef.current} position="bottom center" focusOnMount={false}>
						<Card size="medium">
							<CardBody>
								<CP.ColorVarTracer target={contentRef.current}>
									<BaseControl label="色">
										<CP.SelectButtons
											onChange={(targetClass) => setAttributes({ classes: toggleClass(activeAttributes.classes, targetClass, textColorClassSet) })}
											selected={getClassInSet(activeAttributes.classes, textColorClassSet)}
											options={CP.parseSelections(textColorClasses).options}
										/>
									</BaseControl>
									<BaseControl>
										<Catpow.SelectColorToneClass onChange={({ classes }) => setAttributes({ classes })} selected={activeAttributes.classes} />
									</BaseControl>
									<BaseControl label="フォント">
										<CP.SelectButtons
											onChange={(targetClass) => setAttributes({ classes: toggleClass(activeAttributes.classes, targetClass, fontFamilyClassSet) })}
											selected={getClassInSet(activeAttributes.classes, fontFamilyClassSet)}
											options={CP.parseSelections(fontFamilyClasses).options}
										/>
									</BaseControl>
									<BaseControl label="ウェイト">
										<CP.SelectButtons
											onChange={(targetClass) => setAttributes({ classes: toggleClass(activeAttributes.classes, targetClass, fontWeightClassSet) })}
											selected={getClassInSet(activeAttributes.classes, fontWeightClassSet)}
											options={CP.parseSelections(fontWeightClasses).options}
										/>
									</BaseControl>
									<BaseControl label="サイズ">
										<CP.SelectButtons
											onChange={(targetClass) => setAttributes({ classes: toggleClass(activeAttributes.classes, targetClass, fontSizeClassSet) })}
											selected={getClassInSet(activeAttributes.classes, fontSizeClassSet)}
											options={CP.parseSelections(fontSizeClasses).options}
										/>
									</BaseControl>
								</CP.ColorVarTracer>
							</CardBody>
						</Card>
					</Popover>
				)}
				<BlockControls>
					<ToolbarGroup controls={[{ icon: "admin-settings", onClick: onToggle, isActive }]} />
				</BlockControls>
			</>
		);
	},
});
wp.richText.registerFormatType("catpow/custom", {
	title: "custom",
	tagName: "span",
	className: "cp-rtf-custom",
	attributes: {
		vars: "style",
	},
	edit(props) {
		const { isActive, value, onChange, onFocus, activeAttributes, activeObject, contentRef } = props;

		const onToggle = () => {
			return onChange(
				toggleFormat(value, {
					type: "catpow/custom",
					attributes: { vars: "font-size:1em;" },
				}),
			);
		};
		const setAttributes = useCallback(
			(attr) => {
				onChange(
					applyFormat(value, {
						type: "catpow/custom",
						attributes: Object.assign(activeAttributes, attr),
					}),
				);
			},
			[value, activeAttributes],
		);

		const extractStateFromVars = useCallback((vars) => {
			const state = {};
			if (!vars) {
				return state;
			}
			const map = {
				color: "color",
				"background-color": "bgcolor",
				"font-size": "size",
				"font-weight": "weight",
			};
			vars.split(";").forEach((chunk) => {
				const [key, val] = chunk.split(":");
				state[map[key]] = val;
			});
			return state;
		}, []);
		const extractVarsFromState = useCallback((state) => {
			let vars = "";
			const map = {
				color: "color:$;",
				bgcolor: "background-color:$;",
				size: "font-size:$em;",
				weight: "font-weight:$;",
			};
			Object.keys(map).forEach((key) => {
				if (state.hasOwnProperty(key)) {
					vars += map[key].replace("$", "" + state[key]);
				}
			});
			return vars;
		}, []);
		const init = useCallback((state) => {
			if (state.vars) {
				const { vars } = state;
				return { vars, ...extractStateFromVars(vars) };
			}
			return { color: "inherit", size: 1, weight: 400, vars: "font-size:1em;" };
		}, []);
		const reducer = useCallback((state, action) => {
			if (action.hasOwnProperty("vars")) {
				const { vars } = action;
				return { vars, ...extractStateFromVars(vars) };
			} else {
				const newState = { ...state, ...action };
				newState.vars = extractVarsFromState(newState);
				return newState;
			}
		}, []);
		const [state, update] = useReducer(reducer, { vars: activeAttributes.vars }, init);
		useEffect(() => {
			if (isActive) {
				onChange(
					applyFormat(value, {
						type: "catpow/custom",
						attributes: { vars: state.vars },
					}),
				);
			}
		}, [state.vars]);
		useEffect(() => {
			update({ vars: activeAttributes.vars });
		}, [activeAttributes.vars]);

		return (
			<>
				{isActive && (
					<Popover anchor={contentRef.current} position="bottom center" focusOnMount={false}>
						<Card>
							<CardBody style={{ width: "20rem" }}>
								<TextControl label="色" onChange={(color) => update({ color })} value={state.color || ""} />
								<TextControl label="背景色" onChange={(bgcolor) => update({ bgcolor })} value={state.bgcolor || ""} />
								<RangeControl label="サイズ" onChange={(size) => update({ size })} value={parseFloat(state.size || 1)} min={0.1} max={10} step={0.1} />
								<RangeControl label="太さ" onChange={(weight) => update({ weight })} value={parseFloat(state.weight || 400)} min={100} max={1000} step={100} />
							</CardBody>
						</Card>
					</Popover>
				)}
				<BlockControls>
					<ToolbarGroup controls={[{ icon: "admin-generic", onClick: onToggle, isActive }]} />
				</BlockControls>
			</>
		);
	},
});

wp.richText.registerFormatType("catpow/clear", {
	title: "clear",
	tagName: "div",
	className: null,
	edit({ isActive, value, onChange }) {
		return <RichTextToolbarButton icon={"dismiss"} title={"🧹全てのスタイルをクリア"} onClick={() => onChange(create({ html: value.text }))} isActive={false} />;
	},
});
