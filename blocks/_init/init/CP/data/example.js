export const dummyText = {
	title: "吾輩は猫である。",
	lead: "名前はまだない。どこで生れたか頓と見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。",
	text: "名前はまだない。どこで生れたか頓と見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。",
	footer: "『吾輩は猫である』（わがはいはねこである）　夏目漱石　著",
};
export const example = {
	attributes: {
		title: [dummyText.title],
		headerText: [dummyText.title],
		footerText: [dummyText.footer],
		lead: [dummyText.lead],
		text: [dummyText.text],
	},
	innerBlocks: [
		{
			name: "core/paragraph",
			attributes: {
				content: dummyText.text,
			},
		},
	],
};

wp.domReady(() => {
	wp.hooks.applyFilters("catpow.blocks.dummyText", dummyText);
	wp.hooks.applyFilters("catpow.blocks.example", example);
});
