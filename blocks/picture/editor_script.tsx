const { __ } = wp.i18n;

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
	description: __("画面サイズに応じて切り替わる画像。", "catpow"),
	icon: "id-alt",
	category: "catpow",
	example: CP.example,
	edit({ attributes, setAttributes, isSelected }) {
		const { InspectorControls, useBlockProps } = wp.blockEditor;
		const { Icon } = wp.components;
		const { isTemplate, classes, vars, sources, src, srcset, alt, code, device } = attributes;

		const states = CP.classNamesToFlags(classes);
		const { devices, imageKeys } = blockConfig;

		const selectiveClasses: SelectiveClassConfig[] = [
			{
				input: "picture",
				label: __("画像", "catpow"),
				keys: imageKeys?.image,
				devices,
				isTemplate,
			},
			{
				label: __("テンプレート", "catpow"),
				input: "bool",
				key: "isTemplate",
				sub: [
					{
						input: "text",
						label: __("画像コード", "catpow"),
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
						<CP.SelectResponsiveImage className="_picture" {...panelProps} keys={imageKeys?.image} device={device} devices={devices} isTemplate={isTemplate} showSelectPictureSources={isSelected} />
					</div>
				</CP.Bem>
				<InspectorControls>
					<CP.SelectClassPanel title={__("クラス", "catpow")} icon="art" {...panelProps} selectiveClasses={selectiveClasses} />
				</InspectorControls>
			</>
		);
	},
	save({ attributes }) {
		const { useBlockProps } = wp.blockEditor;
		const { isTemplate, classes, vars, srouces, src, srcset, alt, code } = attributes;

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
						<CP.ResponsiveImage className="_picture" attributes={attributes} keys={imageKeys.image} devices={devices} isTemplate={isTemplate} />
					</div>
				</CP.Bem>
			</>
		);
	},
});
