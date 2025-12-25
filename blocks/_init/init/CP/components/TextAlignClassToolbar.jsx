const { useMemo } = wp.element;

export const TextAlignClassToolbar = (props) => {
	const { set, attr, classKey = "classes", aligns = { left: "has-text-align-left", center: "has-text-align-center", right: "has-text-align-right" } } = props;
	const { AlignmentToolbar } = wp.blockEditor;

	const classSet = useMemo(() => new Set(attr[classKey]?.split(" ") || []), [attr[classKey]]);
	const alignClassSet = useMemo(() => new Set(Object.values(aligns)), [aligns]);

	return (
		<AlignmentToolbar
			value={Object.entries(aligns).find(([key, val]) => classSet.has(val))?.[0] || "left"}
			controls={Object.keys(aligns)}
			onChange={(align) => {
				set({ [classKey]: [...classSet.difference(alignClassSet).add(aligns[align])].join(" ") });
			}}
		/>
	);
};
