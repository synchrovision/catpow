const { useMemo } = wp.element;

export const AlignClassToolbar = (props) => {
	const { BlockAlignmentToolbar } = wp.blockEditor;
	const { aligns = { isAlignLeft: "left", isAlignCenter: "center", isAlignRight: "right" } } = props;

	const options = useMemo(() => {
		const options = {};
		if (Array.isArray(aligns)) {
			for (const val of aligns) {
				options[val] = val;
			}
		} else {
			for (const [key, val] of Object.entries(aligns)) {
				options[val] = key;
			}
		}
		return options;
	}, [aligns]);

	return (
		<BlockAlignmentToolbar
			value={CP.getSelectiveClassLabel(props, aligns)}
			controls={Object.keys(options)}
			onChange={(align) => {
				CP.switchSelectiveClass(props, Object.values(options), options[align], props.key);
			}}
		/>
	);
};
