﻿/*
 * $use_functionsで有効化されている機能が提供するウィジェットを埋め込み
 * Catpow\[funciton]\widget::render();を実行
 */

wp.blocks.registerBlockType("catpow/widget", {
	title: "🐾 Widget",
	description: "拡張機能に定義された埋め込みコンテンツを表示します。",
	icon: "editor-code",
	category: "catpow-embed",
	example: CP.example,
	edit({ attributes, setAttributes, className }) {
		const { InspectorControls } = wp.blockEditor;
		const { PanelBody, TreeSelect } = wp.components;
		const { serverSideRender: ServerSideRender } = wp;
		const { func, param } = attributes;
		const statesClasses = func ? cpEmbeddablesTree.widget[func].conf : false;

		return (
			<>
				<div className="cp-embeddedcontent">
					<div className="label">{func}</div>
					<ServerSideRender block="catpow/widget" attributes={attributes} />
				</div>
				<InspectorControls>
					<PanelBody title="Path">
						<TreeSelect
							label="path"
							selectedId={func}
							tree={Object.values(cpEmbeddablesTree.widget)}
							onChange={(func) => {
								setAttributes({ func: func });
							}}
						/>
					</PanelBody>
					{statesClasses && <CP.SelectClassPanel initialOpen={true} title="設定" icon="admin-appearance" set={setAttributes} attr={attributes} selectiveClasses={statesClasses} />}
				</InspectorControls>
			</>
		);
	},

	save({ attributes, className, setAttributes }) {
		return "null";
	},
});
