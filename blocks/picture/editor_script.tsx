declare var wp: any, CP: any, React: any;

import { SelectiveClassConfig, CatpowBlockConfig } from "cpdev/type";
import { clsx } from "clsx";

const blockConfig: CatpowBlockConfig = {
	devices: ["tb", "sp"],
	imageKeys: {
		image: { sources: "sources", src: "src", alt: "alt", code: "code" },
	},
};
CP.config.picture = blockConfig;

wp.blocks.registerBlockType("catpow/picture", {
	title: "🐾 Picture",
	description: "画面サイズに応じて切り替わる画像。",
	icon: "id-alt",
	category: "catpow",
	example: CP.example,
	edit({ attributes, setAttributes, isSelected }) {
		const { InspectorControls, useBlockProps } = wp.blockEditor;
		const { Icon } = wp.components;
		const { classes, vars, sources, src, srcset, alt, code, device } = attributes;

		const states = CP.classNamesToFlags(classes);
		const { devices, imageKeys } = blockConfig;

		const selectiveClasses: SelectiveClassConfig[] = [
			{
				input: "picture",
				label: "画像",
				keys: imageKeys?.image,
				devices,
				isTemplate: states.isTemplate,
			},
			"hasMargin",
			"hasContentWidth",
			{
				label: "テンプレート",
				values: "isTemplate",
				sub: [
					{
						input: "text",
						label: "画像コード",
						key: "code",
						cond: true,
					},
				],
			},
		];
		const blockProps = useBlockProps({
			className: clsx(classes, device, { "cp-altcontent": device }),
			style: vars,
		});
		const panelProps = { attributes, setAttributes };

		return (
			<>
				<CP.SelectDeviceToolbar {...panelProps} devices={devices} />
				<CP.Bem prefix="wp-block-catpow">
					<div {...blockProps}>
						<CP.SelectResponsiveImage
							className="_picture"
							{...panelProps}
							keys={imageKeys?.image}
							device={device}
							devices={devices}
							isTemplate={states.isTemplate}
							showSelectPictureSources={isSelected}
						/>
					</div>
				</CP.Bem>
				<InspectorControls>
					<CP.SelectClassPanel title="クラス" icon="art" {...panelProps} selectiveClasses={selectiveClasses} />
				</InspectorControls>
			</>
		);
	},
	save({ attributes }) {
		const { useBlockProps } = wp.blockEditor;
		const { classes, vars, srouces, src, srcset, alt, code } = attributes;

		const states = CP.classNamesToFlags(classes);
		const { devices, imageKeys } = CP.config.picture;
		const blockProps = useBlockProps.save({
			className: classes,
			style: vars,
		});

		return (
			<>
				<CP.Bem prefix="wp-block-catpow">
					<div {...blockProps}>
						<CP.ResponsiveImage className="_picture" attributes={attributes} keys={imageKeys.image} devices={devices} isTemplate={states.isTemplate} />
					</div>
				</CP.Bem>
			</>
		);
	},
});
