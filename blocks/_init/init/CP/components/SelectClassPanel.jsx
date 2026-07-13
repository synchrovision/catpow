import { SelectClassPanelBlock } from "./SelectClassPanelBlock";
const { __ } = wp.i18n;

export const SelectClassPanelContext = wp.element.createContext({});

export const SelectClassPanel = (props) => {
	const { Fragment, useMemo, useCallback, createElement: el } = wp.element;
	const { PanelBody } = wp.components;
	const { blockClasssKey = "classes", classKey: primaryClassKey = "classes", setAttributes, attributes, itemKeys, triggerClasses } = wp.hooks.applyFilters("catpow.SelectClassPanelProps", props);
	const selectiveClasses = useMemo(() => {
		if (!triggerClasses || !triggerClasses.item) {
			if (!props.selectiveClasses) {
				return [];
			}
			if (Array.isArray(props.selectiveClasses)) {
				return CP.resolveSelectiveClassesPresets(props.selectiveClasses);
			}
			return CP.resolveSelectiveClassesPresets(Object.values(props.selectiveClasses));
		}
		const blockStates = CP.classNamesToFlags(attributes[blockClasssKey]);
		return CP.resolveSelectiveClassesPresets(triggerClasses.item[Object.keys(triggerClasses.item).find((value) => blockStates[value])]);
	}, [props.selectiveClasses, triggerClasses && attributes[blockClasssKey]]);

	const item = useMemo(() => {
		if (!itemKeys) return attributes;
		return CP.getTheItem(props);
	}, [attributes, itemKeys]);
	const states = useMemo(() => CP.classNamesToFlags(item?.[primaryClassKey]), [item?.[primaryClassKey]]);
	const allStates = useMemo(() => {
		const allStates = { [primaryClassKey]: states };
		const addClassKeyFlagsInPrm = (prm, flags) => {
			if (prm.classKey) {
				flags[prm.classKey] = true;
			}
			if (prm.sub) {
				if (Array.isArray(prm.sub)) {
					prm.sub.forEach((subPrm) => addClassKeyFlagsInPrm(subPrm, flags));
				} else {
					for (const subPrms of Object.values(prm.sub)) {
						subPrms.forEach((subPrm) => addClassKeyFlagsInPrm(subPrm, flags));
					}
				}
			}
			if (prm.bind) {
				if (typeof prm.values === "string") {
					if (!Array.isArray(prm.bind)) {
						Object.keys(prm.bind).forEach((classKey) => {
							if (classKey !== "_") {
								flags[classKey] = true;
							}
						});
					}
				} else {
					for (const bindClasses of Object.values(prm.bind)) {
						if (!Array.isArray(bindClasses)) {
							Object.keys(bindClasses).forEach((classKey) => {
								if (classKey !== "_") {
									flags[classKey] = true;
								}
							});
						}
					}
				}
			}
		};
		const classKeyFlags = {};
		if (Array.isArray(props?.selectiveClasses)) {
			props.selectiveClasses.forEach((prm) => addClassKeyFlagsInPrm(prm, classKeyFlags));
		}
		Object.keys(classKeyFlags).forEach((classKey) => {
			allStates[classKey] = CP.classNamesToFlags(item?.[classKey]);
		});
		return allStates;
	}, [props.selectiveClasses, item, states, primaryClassKey]);
	const save = useCallback(
		(data) => {
			if (itemKeys) {
				Object.assign(CP.getTheItem(props), data);
				CP.saveItem(props);
			} else {
				setAttributes(data);
			}
		},
		[setAttributes, itemKeys],
	);
	const saveClasses = useCallback(
		(classKey = primaryClassKey) => {
			save({ [classKey]: CP.flagsToClassNames(allStates[classKey]) });
		},
		[primaryClassKey, save, allStates],
	);
	const colorNumber = useMemo(() => CP.getClosestBlockAttributesComputed(({ classes }) => CP.getColorNumber(classes), wp.data.select("core/block-editor").getSelectedBlock(), itemKeys));
	const block = wp.data.select("core/block-editor").getSelectedBlock();

	if (!item || !selectiveClasses) {
		return false;
	}
	return (
		<PanelBody title={props.title} initialOpen={props.initialOpen || false} icon={props.icon}>
			<CP.SelectClassPanelContext.Provider value={{ props, item, states, allStates, save, saveClasses, primaryClassKey, block, colorNumber }}>
				{selectiveClasses.map((prm, index) => (
					<Fragment key={index}>
						<SelectClassPanelBlock prm={prm} />
					</Fragment>
				))}
				{props.children}
			</CP.SelectClassPanelContext.Provider>
		</PanelBody>
	);
};
