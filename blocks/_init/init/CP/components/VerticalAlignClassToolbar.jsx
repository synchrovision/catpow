const { useMemo } = wp.element;

export const VerticalAlignClassToolbar = (props) => {
	const { set, attr, classKey = "classes", aligns = { top: "has-vertical-align-top", center: "has-vertical-align-middle", bottom: "has-vertical-align-bottom" } } = props;
	const { BlockVerticalAlignmentToolbar } = wp.blockEditor;

	const classSet = useMemo(() => new Set(attr[classKey]?.split(" ") || []), [attr[classKey]]);
	const alignClassSet = useMemo(() => new Set(Object.values(aligns)), [aligns]);

	return (
		<BlockVerticalAlignmentToolbar
			value={Object.entries(aligns).find(([key, val]) => classSet.has(val))?.[0] || "top"}
			controls={Object.keys(aligns)}
			onChange={(align) => {
				set({ [classKey]: [...classSet.difference(alignClassSet).add(aligns[align])].join(" ") });
			}}
		/>
	);
};
