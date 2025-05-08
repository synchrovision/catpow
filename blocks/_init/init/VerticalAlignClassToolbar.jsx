import { CP } from "./CP.jsx";

CP.VerticalAlignClassToolbar = (props) => {
	const { BlockVerticalAlignmentToolbar } = wp.blockEditor;
	const aligns = ["top", "center", "bottom"];
	return (
		<BlockVerticalAlignmentToolbar
			value={CP.getSelectiveClass(props, aligns)}
			controls={props.aligns || aligns}
			onChange={(align) => {
				CP.switchSelectiveClass(props, aligns, align, props.key);
			}}
		/>
	);
};
