export const AlignClassToolbar = (props) => {
	const { BlockAlignmentToolbar } = wp.blockEditor;
	const aligns = ["left", "center", "right"];
	return (
		<BlockAlignmentToolbar
			value={CP.getSelectiveClass(props, aligns)}
			controls={props.aligns || aligns}
			onChange={(align) => {
				CP.switchSelectiveClass(props, aligns, align, props.key);
			}}
		/>
	);
};
