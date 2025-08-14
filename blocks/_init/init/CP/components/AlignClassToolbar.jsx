const { useMemo } = wp.element;

export const AlignClassToolbar = (props) => {
	const { set, attr, classKey = "classes", aligns = { left: "is-align-left", center: "is-align-center", right: "is-align-right" } } = props;
	const { BlockAlignmentToolbar } = wp.blockEditor;

	const classSet = useMemo(() => new Set(attr[classKey]?.split(" ") || []), [attr[classKey]]);
	const alignClassSet = useMemo(() => new Set(Object.values(aligns)), [aligns]);

	return (
		<BlockAlignmentToolbar
			value={Object.entries(aligns).find(([key, val]) => classSet.has(val))?.[0] || "left"}
			controls={Object.keys(aligns)}
			onChange={(align) => {
				set({ [classKey]: [...classSet.difference(alignClassSet).add(aligns[align])].join(" ") });
			}}
		/>
	);
};
