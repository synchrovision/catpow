CP.config.switcher = {
	factors: {
		schedule: "日時",
		is_user_logged_in: "ログイン",
		current_user_can: "ユーザー権限",
		user_value: "ユーザー情報",
		input_value: "フォーム入力値",
		content_value: "コンテンツ情報",
		ab_test: "ABテスト",
	},
	factorFlags: {
		schedule: 4,
		is_user_logged_in: 4,
		current_user_can: 4,
		user_value: 7,
		input_value: 7,
		content_value: 7,
		ab_test: 5,
	},
	flagValues: {
		field: 1,
		compare: 2,
		values: 4,
	},
};
wp.blocks.registerBlockType("catpow/switcher", {
	title: "🐾 Switcher",
	description: "日時やログインユーザーによってコンテンツの内容が切り替わるコンテナです。",
	icon: "networking",
	category: "catpow-functional",
	example: CP.example,
	edit(props) {
		const { attributes, setAttributes, clientId } = props;
		const { useRef, useEffect, useMemo } = wp.element;
		const { Icon } = wp.components;
		const { InnerBlocks, InspectorControls } = wp.blockEditor;
		const { currentIndex = 0 } = attributes;
		const { factors, factorFlags, flagValues } = CP.config.switcher;
		const isFirstRenderRef = useRef(true);

		const selectiveClasses = useMemo(() => {
			const { factors, factorFlags, flagValues } = CP.config.switcher;
			const selectiveClasses = [
				{
					name: "factor",
					label: "ファクター",
					input: "select",
					key: "factor",
					values: factors,
				},
				{
					name: "field",
					label: "フィールド",
					input: "text",
					key: "field",
					cond: (states, { attr }) => factorFlags[attr.factor] & flagValues["field"],
				},
				{
					name: "compare",
					label: "比較",
					input: "buttons",
					key: "compare",
					values: ["=", "IN", "BETWEEN"],
					cond: (states, { attr }) => factorFlags[attr.factor] & flagValues["compare"],
				},
				{
					name: "values",
					label: "値",
					input: "textarea",
					key: "values",
					cond: (states, { attr }) => factorFlags[attr.factor] & flagValues["values"],
				},
			];
			wp.hooks.applyFilters("catpow.blocks.switcher.selectiveClasses", CP.finderProxy(selectiveClasses));
			return selectiveClasses;
		}, []);
		const values = useMemo(() => [...new Set(attributes.values.split("\n").filter((val) => val))], [attributes.values]);
		useEffect(() => {
			const editor = wp.data.dispatch("core/block-editor");
			const blocks = wp.data.select("core/block-editor").getBlock(clientId).innerBlocks;
			if (blocks.length === values.length) {
				blocks.forEach((block, index) => {
					if (block.attributes.cond !== values[index]) {
						editor.updateBlockAttributes(block.clientId, { cond: values[index] });
					}
				});
			} else {
				const blocksByCond = blocks.reduce((p, c) => Object.assign(p, { [c.attributes.cond]: c }), {});
				const remainningBlocks = blocks.filter((block) => !values.includes(block.attributes.cond));
				const newBlocks = values.map((cond, index) => {
					if (undefined === blocksByCond[cond]) {
						if (remainningBlocks.length) {
							return remainningBlocks.shift();
						}
						return wp.blocks.createBlock("catpow/switchercontent", { cond });
					}
					return blocksByCond[cond];
				});
				editor.replaceInnerBlocks(clientId, newBlocks);
			}
		}, [values]);
		useEffect(() => {
			if (isFirstRenderRef.current) {
				isFirstRenderRef.current = false;
				return;
			}
			switch (attributes.factor) {
				case "schedule":
					setAttributes({ values: "0:00~6:00\n6:00~12:00\n12:00~18:00\n18:00~24:00" });
					break;
				case "is_user_logged_in":
					setAttributes({ values: "out\nin" });
					break;
				case "current_user_can":
					setAttributes({ values: "administrator\neditor\nauthor\ncontributor\nsubscriber" });
					break;
				case "ab_test":
					setAttributes({ field: "variation", values: "A\nB" });
					break;
			}
		}, [attributes.factor]);
		const currentBlockId = "block-" + wp.data.select("core/block-editor").getBlock(clientId).innerBlocks[currentIndex]?.clientId;

		return (
			<>
				<div className="switcher-edit" data-current-index={currentIndex}>
					<ul className="tabs">
						<li className="tab icon">
							<Icon icon="networking" />
						</li>
						<li className="tab">{factors[attributes.factor]}</li>
						{factorFlags[attributes.factor] & flagValues["field"] ? (
							<li className="tab">
								{attributes.field}
								{!!(factorFlags[attributes.factor] & flagValues["compare"]) && "　" + attributes.compare}
							</li>
						) : (
							false
						)}
						{factorFlags[attributes.factor] & flagValues["values"]
							? values.map((cond, index) => (
									<li
										className={"tab" + (index === currentIndex ? " active" : "")}
										onClick={() => {
											setAttributes({ currentIndex: index });
										}}
										key={index}
									>
										{cond}
									</li>
								))
							: false}
					</ul>
					<div className="contents">
						<InnerBlocks template={values.map((cond) => ["catpow/switchercontent", { cond }])} allowedBlocks={["catpow/switchercontent"]} />
					</div>
				</div>
				{currentBlockId && <style>{CP.createStyleCode({ ["#" + currentBlockId]: { display: "block" } })}</style>}
				<InspectorControls>
					<CP.SelectClassPanel title="クラス" icon="art" classKey="factor" set={setAttributes} attr={attributes} selectiveClasses={selectiveClasses} initialOpen={true} />
				</InspectorControls>
			</>
		);
	},
	save() {
		const { InnerBlocks } = wp.blockEditor;
		return <InnerBlocks.Content />;
	},
});

wp.blocks.registerBlockType("catpow/switchercontent", {
	apiVersion: 3,
	title: "🐾 SwitcherContent",
	icon: "editor-code",
	category: "catpow",
	parent: ["catpow/switcher"],
	attributes: {
		cond: { source: "attribute", label: "条件", selector: "switcher-content", attribute: "cond", default: "content" },
	},
	edit({ attributes, setAttributes }) {
		const { InnerBlocks } = wp.blockEditor;
		const { cond } = attributes;
		const { useEffect } = wp.element;

		useEffect(() => {
			setAttributes({ anchor: cond });
		}, [cond]);

		return (
			<div className={"switcher-content"}>
				<InnerBlocks template={[["core/paragraph"]]} templateLock={false} />
			</div>
		);
	},
	save({ attributes }) {
		const { cond } = attributes;
		const { InnerBlocks } = wp.blockEditor;
		return (
			<>
				<switcher-content cond={cond}>
					<InnerBlocks.Content />
				</switcher-content>
			</>
		);
	},
});
