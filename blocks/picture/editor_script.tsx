declare var wp: any, CP: any, React: any;

import { SelectiveClassConfig, CatpowBlockConfig } from "cpdev/type";
import { clsx } from "clsx";

const blockConfig: CatpowBlockConfig = {
	devices: ["sp", "tb"],
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
	edit({ attributes, className, setAttributes, isSelected }) {
		const { InspectorControls, useBlockProps } = wp.blockEditor;
		const { Icon } = wp.components;
		const { classes, vars, sources, src, srcset, alt, code, device } = attributes;

		const states = CP.classNamesToFlags(classes);
		const { devices, imageKeys } = blockConfig;

		const selectiveClasses: SelectiveClassConfig[] = [
			{
				input: "picture",
				label: "画像",
				keys: imageKeys.image,
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
			className: clsx("picture-", classes, device, { "cp-altcontent": device }),
			style: vars,
		});

		return (
			<>
				<CP.SelectDeviceToolbar attr={attributes} set={setAttributes} devices={devices} />
				<CP.Bem prefix="wp-block-catpow">
					<div {...blockProps}>
						{device && (
							<div className="label">
								<Icon icon={CP.devices[device].icon} />
							</div>
						)}
						<CP.SelectResponsiveImage
							className="_picture"
							attr={attributes}
							set={setAttributes}
							keys={imageKeys.image}
							device={device}
							devices={devices}
							isTemplate={states.isTemplate}
							showSelectPictureSources={isSelected}
						/>
					</div>
				</CP.Bem>
				<InspectorControls>
					<CP.SelectClassPanel title="クラス" icon="art" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} />
				</InspectorControls>
			</>
		);
	},
	save({ attributes, className, setAttributes }) {
		const { useBlockProps } = wp.blockEditor;
		const { classes, vars, srouces, src, srcset, alt, code } = attributes;

		const states = CP.classNamesToFlags(classes);
		const { devices, imageKeys } = CP.config.picture;
		const blockProps = useBlockProps.save({
			className: clsx("picture-", classes),
			style: vars,
		});

		return (
			<>
				<CP.Bem prefix="wp-block-catpow">
					<div {...blockProps}>
						<CP.ResponsiveImage className="_picture" attr={attributes} keys={imageKeys.image} devices={devices} isTemplate={states.isTemplate} />
					</div>
				</CP.Bem>
			</>
		);
	},
});
