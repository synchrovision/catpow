//@deprecated
export const switchNumberClass = ({ set, attr }, label, value) => {
	let classArray = (attr.classes || "").split(" ");
	let i = classArray.findIndex((cls) => cls.slice(0, label.length) === label);
	if (i === -1) {
		if (value) {
			classArray.push(label + value);
		}
	} else {
		if (value) {
			classArray.splice(i, 1, label + value);
		} else {
			classArray.splice(i, 1);
		}
	}
	set({ classes: classArray.join(" ") });
};
//@deprecated
export const getNumberClass = ({ attr }, label) => {
	let value = (attr.classes || "").split(" ").find((cls) => cls.slice(0, label.length) === label);
	if (!value) {
		return 0;
	}
	return parseInt(value.slice(label.length));
};
//@deprecated
export const switchColor = (props, value) => {
	CP.switchNumberClass(props, "color", value);
};
//@deprecated
export const getColor = (props) => {
	return CP.getNumberClass(props, "color");
};

//@deprecated
export const switchPattern = (props, value) => {
	CP.switchNumberClass(props, "pattern", value);
};
//@deprecated
export const getPattern = (props) => {
	return CP.getNumberClass(props, "pattern");
};

export const switchSelectiveClass = ({ set, attr }, values, value, key) => {
	if (key === undefined) {
		key = "classes";
	}
	let classArray = attr[key].split(" ");
	if (!Array.isArray(values) && _.isObject(values)) {
		values = Object.keys(values);
	}
	classArray = _.difference(classArray, values);
	if (Array.isArray(value)) {
		classArray = classArray.concat(value);
	} else {
		classArray.push(value);
	}
	let data = {};
	data[key] = classArray.join(" ");
	set(data);
};

export const getSelectiveClass = ({ attr }, values, key) => {
	if (key === undefined) {
		key = "classes";
	}
	if (attr[key] === undefined) {
		attr[key] = "";
	}
	let classArray = attr[key].split(" ");
	if (!Array.isArray(values) && _.isObject(values)) {
		values = Object.keys(values);
	}
	return _.intersection(classArray, values).shift();
};

//@deprecated
export const getSubClasses = (prm) => {
	let rtn = {};
	let values;
	if (Array.isArray(prm.values)) {
		values = prm.values;
	} else {
		values = Object.keys(prm.values);
	}
	values.forEach((val) => {
		if (prm.sub && prm.sub[val]) {
			rtn[val] = CP.getAllSubClasses(prm.sub[val]);
		} else {
			rtn[val] = [];
		}
	});
	return rtn;
};
//@deprecated
export const getAllSubClasses = (prms) => {
	let rtn = [];
	prms.forEach((prm) => {
		if (typeof prm === "object") {
			if (prm.values) {
				if (Array.isArray(prm.values)) {
					rtn = rtn.concat(prm.values);
				} else if (_.isObject(prm.values)) {
					rtn = rtn.concat(Object.keys(prm.values));
				} else {
					rtn.push(prm.values);
				}
			}
			if (prm.sub) {
				if (Array.isArray(prm.sub)) {
					rtn = rtn.concat(CP.getAllSubClasses(prm.sub));
				} else {
					Object.keys(prm.sub).forEach((key) => {
						rtn = rtn.concat(CP.getAllSubClasses(prm.sub[key]));
					});
				}
			}
		}
	});
	return rtn;
};
//@deprecated
export const getBindClasses = (prm) => {
	let rtn = {};
	let values;
	if (Array.isArray(prm.values)) {
		values = prm.values;
	} else {
		values = Object.keys(prm.values);
	}
	values.forEach((val) => {
		if (prm.bind && prm.bind[val]) {
			rtn[val] = prm.bind[val];
		} else {
			rtn[val] = [];
		}
	});
	return rtn;
};
export const getClassFlagsByValue = (prm, primaryClassKey = "classes") => {
	const cacheKeys = [CP.getClassFlagsByValue, prm, primaryClassKey];
	if (CP.cache.has(cacheKeys)) {
		return CP.cache.get(cacheKeys);
	}
	const flags = {};
	CP.cache.set(cacheKeys, flags);
	if (!prm || typeof prm !== "object" || !prm.values) {
		return flags;
	}
	const values = typeof prm.values === "string" ? [prm.values] : Array.isArray(prm.values) ? prm.values : Object.keys(prm.values);
	for (const value of values) {
		flags[value] = { [prm.classKey || primaryClassKey]: { [value]: true } };
		if (prm.sub) {
			if (Array.isArray(prm.sub)) {
				CP.addAllClassFlags(flags[value], prm.sub, primaryClassKey);
			} else if (prm.sub[value]) {
				CP.addAllClassFlags(flags[value], prm.sub[value], primaryClassKey);
			}
		}
		if (prm.bind) {
			if (Array.isArray(prm.bind)) {
				CP.addBindClassFlags(flags[value], prm.bind, primaryClassKey);
			} else if (prm.bind[value]) {
				CP.addBindClassFlags(flags[value], prm.bind[value], primaryClassKey);
			}
		}
	}
	return flags;
};
export const getAllClassFlags = (prm, primaryClassKey = "classes") => {
	const cacheKeys = [CP.getAllClassFlags, prm, primaryClassKey];
	if (CP.cache.has(cacheKeys)) {
		return CP.cache.get(cacheKeys);
	}
	const flags = {};
	CP.cache.set(cacheKeys, flags);
	if (!prm || typeof prm !== "object" || !prm.values) {
		return flags;
	}
	CP.addAllClassFlags(flags, [prm], primaryClassKey);
	return flags;
};
export const getBindClassFlagsByValue = (prm, primaryClassKey = "classes") => {
	const cacheKeys = [CP.getBindClassFlagsByValue, prm, primaryClassKey];
	if (CP.cache.has(cacheKeys)) {
		return CP.cache.get(cacheKeys);
	}
	const flags = {};
	CP.cache.set(cacheKeys, flags);
	if (!prm || typeof prm !== "object" || !prm.values) {
		return flags;
	}
	const values = typeof prm.values === "string" ? [prm.values] : Array.isArray(prm.values) ? prm.values : Object.keys(prm.values);
	for (let value of values) {
		flags[value] = { [prm.classKey || primaryClassKey]: { [value]: true } };
		if (prm.bind) {
			if (typeof prm.values === "string") {
				CP.addBindClassFlags(flags[value], prm.bind, primaryClassKey);
			} else {
				if (prm.bind[value]) {
					CP.addBindClassFlags(flags[value], prm.bind[value], primaryClassKey);
				}
			}
		}
	}
	return flags;
};
export const addAllClassFlags = (flags, prms, primaryClassKey = "classes") => {
	if (!flags[primaryClassKey]) {
		flags[primaryClassKey] = {};
	}
	for (const prm of prms) {
		if (prm.key || prm.json || prm.css || prm.vars) {
			continue;
		}
		if (prm.values) {
			const values = typeof prm.values === "string" ? [prm.values] : Array.isArray(prm.values) ? prm.values : Object.keys(prm.values);
			for (const value of values) {
				const classKey = prm.classKey || primaryClassKey;
				if (!flags[classKey]) {
					flags[classKey] = {};
				}
				flags[classKey][value] = true;
			}
		}
		if (prm.sub) {
			if (Array.isArray(prm.sub)) {
				CP.addAllClassFlags(flags, prm.sub, primaryClassKey);
			} else {
				for (const subPrm of Object.values(prm.sub)) {
					CP.addAllClassFlags(flags, subPrm, primaryClassKey);
				}
			}
		}
		if (prm.bind) {
			if (typeof prm.values === "string") {
				CP.addBindClassFlags(flags, prm.bind, primaryClassKey);
			} else {
				for (const bindClasses of Object.values(prm.bind)) {
					CP.addBindClassFlags(flags, bindClasses, primaryClassKey);
				}
			}
		}
	}
};
export const addBindClassFlags = (flags, bindClasses, primaryClassKey = "classes") => {
	if (!flags[primaryClassKey]) {
		flags[primaryClassKey] = {};
	}
	if (Array.isArray(bindClasses)) {
		for (const bindClass of bindClasses) {
			flags[primaryClassKey][bindClass] = true;
		}
	} else {
		for (const [classKey, classes] of Object.entries(bindClasses)) {
			if (classKey === "_") {
				for (const bindClass of classes) {
					flags[primaryClassKey][bindClass] = true;
				}
			} else {
				if (!flags[classKey]) {
					flags[classKey] = {};
				}
				for (const bindClass of classes) {
					flags[classKey][bindClass] = true;
				}
			}
		}
	}
};
export const getUpdatesFromStatesAndClasssFlags = ({ allStates, allClassFlags, classFlags, bindClassFlags }) => {
	const updates = {};
	for (const [classKey, allClassFlag] of Object.entries(allClassFlags)) {
		console.assert(!!allStates[classKey], `allStates should have ${classKey} states`);
		const states = allStates[classKey];
		for (const value of Object.keys(states)) {
			if (allClassFlag[value] && !classFlags?.[classKey]?.[value]) {
				states[value] = false;
			}
		}
		if (bindClassFlags?.[classKey]) {
			Object.assign(states, bindClassFlags[classKey]);
		}
		updates[classKey] = CP.flagsToClassNames(states);
	}
	return updates;
};

export const toggleClass = ({ attr, set }, value, key) => {
	if (key === undefined) {
		key = "classes";
	}
	if (attr[key] === undefined) {
		attr[key] = "";
	}
	let classArray = attr[key].split(" ");
	let i = classArray.indexOf(value);
	if (i === -1) {
		classArray.push(value);
	} else {
		classArray.splice(i, 1);
	}
	let data = {};
	data[key] = classArray.join(" ");
	set(data);
};
export const hasClass = ({ attr }, value, key) => {
	if (key === undefined) {
		key = "classes";
	}
	if (attr[key] === undefined) {
		attr[key] = "";
	}
	return attr[key].split(" ").indexOf(value) !== -1;
};

/*selectiveClass*/
export const parseSelections = (sels) => {
	let options, values;
	if (Array.isArray(sels)) {
		values = sels;
		options = sels.map((cls) => {
			return { label: cls, value: cls };
		});
	} else {
		values = Object.keys(sels);
		options = values.map((cls) => {
			return { label: sels[cls], value: cls };
		});
	}
	return { options, values };
};

export const resolveSelectiveClassesPresets = (prms) => {
	prms.forEach((prm, index) => {
		if (typeof prm === "string" && CP.selectiveClassesPresets.hasOwnProperty(prm)) {
			prms[index] = prm = { preset: prm };
		}
		if (prm.preset) {
			if (CP.selectiveClassesPresets.hasOwnProperty(prm.preset)) {
				const preset = CP.selectiveClassesPresets[prm.preset];
				if (typeof preset === "function") {
					prms[index] = preset(prm);
				} else {
					prms[index] = { ...preset, ...prm };
				}
			}
		}
		if (prm.sub) {
			if (Array.isArray(prm.sub)) {
				resolveSelectiveClassesPresets(prm.sub);
			} else {
				Object.values(prm.sub).forEach(resolveSelectiveClassesPresets);
			}
		}
	});
	return prms;
};
