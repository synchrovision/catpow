const { __ } = wp.i18n;

const options = [
	{ value: "normal", label: __("通常", "catpow") },
	{ value: "multiply", label: __("乗算", "catpow") },
	{ value: "screen", label: __("スクリーン", "catpow") },
	{ value: "overlay", label: __("オーバーレイ", "catpow") },
	{ value: "darken", label: __("比較（暗）", "catpow") },
	{ value: "lighten", label: __("比較（明）", "catpow") },
	{ value: "color-dodge", label: __("覆い焼き", "catpow") },
	{ value: "color-burn", label: __("焼き込み", "catpow") },
	{ value: "hard-light", label: __("ハードライト", "catpow") },
	{ value: "soft-light", label: __("ソフトライト", "catpow") },
	{ value: "difference", label: __("差の絶対値", "catpow") },
	{ value: "exclusion", label: __("除外", "catpow") },
	{ value: "hue", label: __("色相", "catpow") },
	{ value: "saturation", label: __("彩度", "catpow") },
	{ value: "color", label: __("カラー", "catpow") },
	{ value: "luminosity", label: __("明度", "catpow") },
];

export const SelectBlendMode = (props) => {
	const { SelectControl } = wp.components;
	return <SelectControl label={props.label} onChange={props.onChange} value={props.value} options={options} />;
};
