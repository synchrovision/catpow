const { __ } = wp.i18n;

const { useMemo, useCallback } = wp.element;
const { RichText, InnerBlocks, BlockControls, InspectorControls, useBlockProps } = wp.blockEditor;
const { PanelBody, TextareaControl } = wp.components;

wp.blocks.registerBlockType("catpow/sidebar-articlenav", {
	apiVersion: 3,
	title: "🐾 SideArticelNav",
	icon: "editor-ul",
	category: "catpow",
	attributes: {
		classes: { source: "attribute", selector: ".wp-block-catpow-sidebar-articlenav", attribute: "class", default: "wp-block-catpow-sidebar-articlenav" },
	},
	parent: ["catpow/sidecolumn", "catpow/side-section"],
	edit({ attributes, className, setAttributes, clientId }) {
		const { classes } = attributes;
		const { useEffect } = wp.element;
		const { RichText, useBlockProps } = wp.blockEditor;

		const parentClientId = wp.data.select("core/block-editor").getBlockParentsByBlockName(clientId, "catpow/sidebar")[0];
		const mainContents = wp.data.select("core/block-editor").getBlock(parentClientId).innerBlocks[0].innerBlocks;

		const getTargetSections = useCallback((innerBlocks) => {
			return innerBlocks
				.filter((block) => block.name == "catpow/section" && !!block.attributes.anchor)
				.map((block) => {
					return {
						title: block.attributes.title,
						items: getTargetSections(block.innerBlocks),
					};
				});
		}, []);
		const targetSections = useMemo(() => getTargetSections(mainContents), [mainContents]);

		const blockProps = useBlockProps({ className: classes });

		return (
			<CP.Bem prefix="wp-block-catpow">
				<div {...blockProps}>
					<ul className="_items">
						{targetSections.map((section) => (
							<li className="_item">
								<a className="_link">{section.title}</a>
								<ul className="_subitems">
									{section.items.map((subitem) => (
										<li className="_item">
											<a className="_link">{subitem.title}</a>
											<ul className="_enditems">
												{subitem.items.map((enditem) => (
													<li className="_item">
														<a className="_link">{enditem.title}</a>
													</li>
												))}
											</ul>
										</li>
									))}
								</ul>
							</li>
						))}
					</ul>
				</div>
			</CP.Bem>
		);
	},
	save({ attributes, className, setAttributes }) {
		const { classes } = attributes;
		const blockProps = useBlockProps.save({
			className: classes,
			"data-wp-interactive": "catpow/sidebar-articlenav",
			"data-wp-context": JSON.stringify({
				activeItems: {},
				items: [],
			}),
			"data-wp-init": "callbacks.initBlock",
		});
		return (
			<CP.Bem prefix="wp-block-catpow">
				<div {...blockProps}>
					<ul className="_items">
						<template data-wp-each="context.items">
							<li className="_item">
								<a
									className="_link"
									data-wp-bind--href="context.item.href"
									data-wp-bind--data-section-id="context.item.id"
									data-wp-on--click="actions.onClickItem"
									data-wp-class--is-active="callbacks.isItemActive"
									data-wp-text="context.item.label"
								></a>
								<ul className="_subitems">
									<template data-wp-each--subitem="context.item.items">
										<li className="_item">
											<a
												className="_link"
												data-wp-bind--href="context.subitem.href"
												data-wp-bind--data-section-id="context.subitem.id"
												data-wp-on--click="actions.onClickItem"
												data-wp-class--is-active="callbacks.isItemActive"
												data-wp-text="context.subitem.label"
											></a>

											<ul className="_enditems">
												<template data-wp-each--enditem="context.subitem.items">
													<li className="_item">
														<a
															className="_link"
															data-wp-bind--href="context.enditem.href"
															data-wp-bind--data-section-id="context.enditem.id"
															data-wp-on--click="actions.onClickItem"
															data-wp-class--is-active="callbacks.isItemActive"
															data-wp-text="context.enditem.label"
														></a>
													</li>
												</template>
											</ul>
										</li>
									</template>
								</ul>
							</li>
						</template>
					</ul>
				</div>
			</CP.Bem>
		);
	},
});
