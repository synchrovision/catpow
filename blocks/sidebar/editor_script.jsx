import { clsx } from "clsx";

const { __ } = wp.i18n;

const { useMemo } = wp.element;
const { RichText, InnerBlocks, BlockControls, InspectorControls, useBlockProps } = wp.blockEditor;
const { PanelBody, TextareaControl } = wp.components;

wp.blocks.registerBlockType("catpow/sidebar", {
	title: "🐾 Sidebar",
	description: "サイドバーのあるコンテンツ領域のコンテナです。",
	icon: "editor-code",
	category: "catpow",
	attributes: {
		classes: { source: "attribute", selector: "div", attribute: "class", default: "wp-block-catpow-sidebar is-align-left is-stuck is-stuck-bottom has-item-size-small" },
		vars: { type: "object" },
		sidebarClases: { type: "string" },
	},
	example: CP.example,
	edit({ attributes, className, setAttributes }) {
		const { classes, vars, sidebarClases } = attributes;
		const primaryClass = "wp-block-catpow-sidebar";
		const selectiveClasses = useMemo(() => {
			const selectiveClasses = [
				{ name: "align", type: "buttons", label: __("PCレイアウト", "catpow"), values: { isAlignLeft: __("左", "catpow"), isAlignRight: __("右", "catpow") } },
				{
					name: "mobileLayout",
					type: "buttons",
					label: __("SPレイアウト", "catpow"),
					values: { isStuck: __("積上", "ctapow"), isSticky: __("追従", "ctapow") },
					sub: {
						isStuck: [{ name: "stuckDirection", type: "buttons", values: { isStuckTop: __("上", "catpow"), isStuckBottom: __("下", "catpow") } }],
					},
				},
				"itemSize",
			];
			const proxy = CP.finderProxy(selectiveClasses);
			wp.hooks.applyFilters("catpow.blocks.sidebar.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		return (
			<>
				<div {...useBlockProps({ className: classes, style: vars })}>
					<CP.Label icon="columns" />
					<InnerBlocks template={[["catpow/maincolumn"], ["catpow/sidecolumn", { classes: sidebarClases }]]} templateLock="all" />
				</div>
				<BlockControls>
					<CP.AlignClassToolbar set={setAttributes} attr={attributes} />
				</BlockControls>
				<InspectorControls>
					<CP.SelectClassPanel title="クラス" icon="art" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} initialOpen={true} />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label="クラス" onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
				</InspectorControls>
			</>
		);
	},

	save({ attributes, className, setAttributes }) {
		const { InnerBlocks } = wp.blockEditor;
		const { classes, vars } = attributes;
		const blockProps = useBlockProps.save({
			id: "{$uid}",
			className: classes,
			style: vars,
			"data-wp-interactive": "catpow/sidebar",
			"data-wp-context": JSON.stringify({ isOpen: false, isViewing: false }),
			"data-wp-init": "callbacks.initBlock",
			"data-wp-class--is-open": "callbacks.isOpen",
			"data-wp-class--is-viewing": "callbacks.isViewing",
		});

		return (
			<div {...blockProps}>
				<InnerBlocks.Content />
			</div>
		);
	},
});

wp.blocks.registerBlockType("catpow/sidecolumn", {
	apiVersion: 3,
	title: "🐾 SideColumn",
	icon: "editor-code",
	category: "catpow",
	attributes: {
		classes: { source: "attribute", attribute: "class", selector: ".wp-block-catpow-sidebar-column", default: "wp-block-catpow-sidebar-column is-column-side has-background-color" },
	},
	parent: ["catpow/sidebar"],
	edit({ attributes, className, setAttributes }) {
		const { classes } = attributes;
		const allowedBlocks = useMemo(() => wp.hooks.applyFilters("catpow.blocks.sidebar.allowedBlocks", ["catpow/sidebar-section"]), []);
		const selectiveClasses = useMemo(() => {
			const selectiveClasses = ["level", "color", "colorScheme", "backgroundColor"];
			const proxy = CP.finderProxy(selectiveClasses);
			wp.hooks.applyFilters("catpow.blocks.sidecolumn.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);
		return (
			<>
				<CP.Bem prefix="wp-block-catpow">
					<div {...useBlockProps({ className: classes })}>
						<CP.Label icon="excerpt-view" />
						<div className="_container">
							<InnerBlocks template={[["catpow/sidebar-section"]]} allowedBlocks={allowedBlocks} templateLock={false} />
						</div>
						<div className="_button">
							<span className="_icon"></span>
						</div>
					</div>
				</CP.Bem>
				<InspectorControls>
					<CP.SelectClassPanel title="クラス" icon="art" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} initialOpen={true} />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label="クラス" onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
				</InspectorControls>
			</>
		);
	},
	save({ attributes, className, setAttributes }) {
		const { classes } = attributes;
		const { InnerBlocks } = wp.blockEditor;
		return (
			<CP.Bem prefix="wp-block-catpow">
				<div className={classes}>
					<div className="_container">
						<InnerBlocks.Content />
					</div>
					<div className="_button" data-wp-on--click="actions.toggle" aria-controls="{$uid}" data-wp-bind--aria-expanded="context.isOpen">
						<span className="_icon"></span>
					</div>
				</div>
			</CP.Bem>
		);
	},
});

wp.blocks.registerBlockType("catpow/maincolumn", {
	apiVersion: 3,
	title: "🐾 MainColumn",
	icon: "editor-code",
	category: "catpow",
	attributes: {
		columnType: { type: "string", default: "main" },
	},
	parent: ["catpow/sidebar"],
	edit({ attributes, className, setAttributes }) {
		return (
			<CP.Bem prefix="wp-block-catpow">
				<div {...useBlockProps({ className: "sidebar-column- is-column-main" })}>
					<InnerBlocks template={[["catpow/section"]]} templateLock={false} />
				</div>
			</CP.Bem>
		);
	},
	save({ attributes, className, setAttributes }) {
		return (
			<CP.Bem prefix="wp-block-catpow">
				<div className="sidebar-column- is-column-main">
					<InnerBlocks.Content />
				</div>
			</CP.Bem>
		);
	},
});

wp.blocks.registerBlockType("catpow/sidebar-section", {
	apiVersion: 3,
	title: "🐾 SideSection",
	icon: "editor-ul",
	category: "catpow",
	attributes: {
		classes: { source: "attribute", attribute: "class", default: "wp-block-catpow-sidebar-section is-level3" },
		HeadingTag: { type: "string", default: "h3" },
		title: { source: "html", selector: ".wp-block-catpow-sidebar-section__header-title" },
	},
	parent: ["catpow/sidecolumn", "catpow/sidebar-section"],
	edit({ attributes, className, setAttributes, clientId }) {
		const { classes, HeadingTag, title } = attributes;
		const allowedBlocks = useMemo(() => wp.hooks.applyFilters("catpow.blocks.sidebar.allowedBlocks", ["catpow/sidebar-section"]), []);

		const selectiveClasses = useMemo(() => {
			const { devices, imageKeys } = CP.config.div;
			const selectiveClasses = ["level", "headingTag"];
			const proxy = CP.finderProxy(selectiveClasses);
			wp.hooks.applyFilters("catpow.blocks.sideSection.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);

		return (
			<>
				<CP.Bem prefix="wp-block-catpow">
					<div {...useBlockProps({ className: classes })}>
						<header className="_header">
							<RichText tagName={HeadingTag} className="_title" value={title} placeholder="Title" onChange={(title) => setAttributes({ title })} />
						</header>
						<div className="_contents">
							<InnerBlocks allowedBlocks={allowedBlocks} templateLock={false} />
						</div>
					</div>
				</CP.Bem>
				<InspectorControls>
					<CP.SelectClassPanel title="クラス" icon="art" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} initialOpen={true} />
					<PanelBody title="CLASS" icon="admin-generic" initialOpen={false}>
						<TextareaControl label="クラス" onChange={(classes) => setAttributes({ classes })} value={classes} />
					</PanelBody>
				</InspectorControls>
			</>
		);
	},
	save({ attributes, className, setAttributes }) {
		const { classes, HeadingTag, title } = attributes;
		return (
			<CP.Bem prefix="wp-block-catpow">
				<div {...useBlockProps.save({ className: classes })}>
					<header className="_header">
						<RichText.Content tagName={HeadingTag} className="_title" value={title} />
					</header>
					<div className="_contents">
						<InnerBlocks.Content />
					</div>
				</div>
			</CP.Bem>
		);
	},
});
