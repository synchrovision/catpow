import { SelectClassPanelBlock } from "./SelectClassPanelBlock";
const { __ } = wp.i18n;

export const SelectClassPanelContext = wp.element.createContext({});

export const SelectClassPanel = (props) => {
	const { Fragment, useMemo, useCallback, createElement: el } = wp.element;
	const { PanelBody } = wp.components;
	const {
		blockClasssKey = "classes",
		classKey: primaryClassKey = "classes",
		items,
		index,
		subItemsKey,
		subIndex,
		set,
		attr,
		triggerClasses,
	} = wp.hooks.applyFilters("catpow.SelectClassPanelProps", props);
	let { itemsKey = items ? "items" : null, itemClasses } = props;
	const selectiveClasses = useMemo(() => {
		if (!triggerClasses || !triggerClasses.item) {
			if (Array.isArray(props.selectiveClasses)) {
				return CP.resolveSelectiveClassesPresets(props.selectiveClasses);
			}
			return CP.resolveSelectiveClassesPresets(Object.values(props.selectiveClasses));
		}
		const blockStates = CP.classNamesToFlags(attr[blockClasssKey]);
		return CP.resolveSelectiveClassesPresets(triggerClasses.item[Object.keys(triggerClasses.item).find((value) => blockStates[value])]);
	}, [props.selectiveClasses, triggerClasses && attr[blockClasssKey]]);

	const { styleDatas } = attr;

	const item = useMemo(() => {
		if (!items) {
			return attr;
		}
		if (!items[index]) {
			return false;
		}
		if (subItemsKey) {
			return items[index][subItemsKey][subIndex];
		}
		return items[index];
	}, [attr, items, index, subItemsKey, subIndex]);
	const states = useMemo(() => CP.classNamesToFlags(item[primaryClassKey]), [item[primaryClassKey]]);
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
		props.selectiveClasses.forEach((prm) => addClassKeyFlagsInPrm(prm, classKeyFlags));
		Object.keys(classKeyFlags).forEach((classKey) => {
			allStates[classKey] = CP.classNamesToFlags(item[classKey]);
		});
		return allStates;
	}, [props.selectiveClasses, item, states, primaryClassKey]);
	const save = useCallback(
		(data) => {
			if (items) {
				Object.assign(item, data);
				set({ [itemsKey]: JSON.parse(JSON.stringify(items)) });
			} else {
				set(data);
			}
		},
		[set, index, items, itemsKey]
	);
	const saveClasses = useCallback(
		(classKey=primaryClassKey) => {
			save({ [classKey]: CP.flagsToClassNames(allStates[classKey]) });
		},
		[primaryClassKey,save, allStates]
	);
	const saveCss = useCallback(
		(cssKey) => {
			set({ [cssKey]: CP.createStyleCodeWithMediaQuery(styleDatas[cssKey]) });
		},
		[set, styleDatas]
	);

	if (!item || !selectiveClasses) {
		return false;
	}

	return (
		<PanelBody title={props.title} initialOpen={props.initialOpen || false} icon={props.icon}>
			<CP.SelectClassPanelContext.Provider value={{ props, item, states, allStates, set, save, saveClasses, saveCss, primaryClassKey }}>
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
