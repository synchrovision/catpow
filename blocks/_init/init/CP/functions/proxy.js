export const finderProxy = (obj) => new Proxy(obj, finderProxyHandler);
const finderProxyHandler = {
	get: (obj, prop) => {
		if (prop === "isFinderProxy") {
			return true;
		}
		if (prop === "finderProxyTarget") {
			return obj;
		}
		var rtn;
		if (Array.isArray(obj) && !/^\d+$/.test(prop)) {
			rtn = obj.find((item) => typeof item === "object" && item.hasOwnProperty("name") && item.name === prop);
			if (!rtn && prop in obj) {
				return obj[prop];
			}
		} else {
			rtn = obj[prop];
		}
		if (typeof rtn === "object") {
			return new Proxy(rtn, finderProxyHandler);
		}
		return rtn;
	},
	set: (obj, prop, val) => {
		if (typeof val === "object" && val.isFinderProxy) {
			val = val.finderProxyTarget;
		}
		if (Array.isArray(obj) && !/^\d+$/.test(prop) && !(prop in obj)) {
			if (typeof val !== "object") {
				return false;
			}
			val.name = prop;
			const index = obj.findIndex((item) => typeof item === "object" && item.hasOwnProperty("name") && item.name === prop);
			if (index < 0) {
				obj.push(val);
			} else {
				obj[index] = val;
			}
		} else {
			obj[prop] = val;
		}
		return true;
	},
	deleteProperty: (obj, prop) => {
		if (Array.isArray(obj) && !/^\d+$/.test(prop)) {
			prop = obj.findIndex((item) => item === prop || (typeof item === "object" && item.hasOwnProperty("name") && item.name === prop));
			if (prop < 0) {
				return;
			}
		}
		delete obj[prop];
	},
};
