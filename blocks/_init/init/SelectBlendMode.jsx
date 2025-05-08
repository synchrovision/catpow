import { CP } from "./CP.jsx";

CP.SelectBlendMode = (props) => {
	const { BlockControls } = wp.blockEditor;
	const { SelectControl } = wp.components;

	const {
		set,
		attr,
		options = [
			{ value: "normal", label: "通常" },
			{ value: "multiply", label: "乗算" },
			{ value: "screen", label: "スクリーン" },
			{ value: "overlay", label: "オーバーレイ" },
			{ value: "darken", label: "比較（暗）" },
			{ value: "lighten", label: "比較（明）" },
			{ value: "color-dodge", label: "覆い焼き" },
			{ value: "color-burn", label: "焼き込み" },
			{ value: "hard-light", label: "ハードライト" },
			{ value: "soft-light", label: "ソフトライト" },
			{ value: "difference", label: "差の絶対値" },
			{ value: "exclusion", label: "除外" },
			{ value: "hue", label: "色相" },
			{ value: "saturation", label: "彩度" },
			{ value: "color", label: "カラー" },
			{ value: "luminosity", label: "明度" },
		],
	} = props;
	return <SelectControl label={props.label} onChange={props.onChange} value={props.value} options={options} />;
};
