/* global ytag */
window.Catpow = window.Catpow || {};

window.Catpow.yss = {
	processerId: "yss",
	guideURL: false,
	eventParams: {
		label: { type: "text", label: "ラベル" },
		value: { type: "number", label: "値" },
	},
	parseEventValue: function (value) {
		if (!value) {
			return [];
		}
		return value.split(" + ").map(window.Catpow.yss.parseEventString);
	},
	parseEventString: function (str) {
		// label#value@event
		if (!str) {
			return {};
		}
		var matches = str.match(/^([\d\w_\-]+?)(?:#(\d+))?(?:@(\w+))?$/);
		if (!matches) {
			return {};
		}
		var rtn = {};
		if (matches[1]) {
			rtn.label = matches[1];
		}
		if (matches[2]) {
			rtn.value = matches[2];
		}
		rtn.event = matches[3] || "click";
		return rtn;
	},
	createEventValue: function (datas) {
		return datas
			.filter((data) => !!data.label)
			.map(window.Catpow.yss.createEventString)
			.join(" + ");
	},
	createEventString: function (data) {
		if (!data.label) return "";
		var rtn = data.label;
		if (data.value) {
			rtn += "#" + data.value;
		}
		if (data.event && data.event !== "click") {
			rtn += "@" + data.event;
		}
		return rtn;
	},
	send: function (data) {
		if (!data.label) {
			return false;
		}
		var config = { yahoo_conversion_id: window.primaryYssId, yahoo_conversion_label: data.label };
		if (data.value) {
			config.yahoo_conversion_value = data.value;
		}
		ytag({ type: "yss_conversion", config });
	},
};
window.Catpow.eventProcessor.register("yss", window.Catpow.yss);

window.Catpow.yjad = {
	processerId: "yjad",
	guideURL: false,
	eventParams: {
		io: { type: "text", label: "IO" },
		label: { type: "text", label: "ラベル" },
		transaction_id: { type: "text", label: "トランザクションID" },
		value: { type: "number", label: "値" },
	},
	parseEventValue: function (value) {
		if (!value) {
			return [];
		}
		return value.split(" + ").map(window.Catpow.yjad.parseEventString);
	},
	parseEventString: function (str) {
		// 【io】label«transaction_id»#value@event
		if (!str) {
			return {};
		}
		if (!window.Catpow.yjad.EventStringPattern) {
			var patternString = "^(?:【(.+?)】)?" + "([\\w\\-]+?)" + "(?:«([^»]+?)?»)?" + "(?:#(\\d+))?" + "(?:@(\\w+))?$";
			window.Catpow.yjad.EventStringPattern = new RegExp(patternString);
		}
		var matches = str.match(window.Catpow.yjad.EventStringPattern);
		if (!matches) {
			return {};
		}
		var rtn = {};
		if (matches[1]) {
			rtn.io = matches[1];
		}
		if (matches[2]) {
			rtn.label = matches[2];
		}
		if (matches[3]) {
			rtn.transaction_id = matches[3];
		}
		if (matches[4]) {
			rtn.value = matches[4];
		}
		rtn.event = matches[5] || "click";
		return rtn;
	},
	createEventValue: function (datas) {
		return datas
			.filter((data) => !!data.label)
			.map(window.Catpow.yjad.createEventString)
			.join(" + ");
	},
	createEventString: function (data) {
		if (!data.label) return "";
		var rtn = data.label;
		if (data.io) {
			rtn = `【${data.io}】${rtn}`;
		}
		if (data.transaction_id) {
			rtn += `«${data.transaction_id}»`;
		}
		if (data.value) {
			rtn += "#" + data.value;
		}
		if (data.event && data.event !== "click") {
			rtn += "@" + data.event;
		}
		return rtn;
	},
	send: function (data) {
		if (!data.label) {
			return false;
		}
		var config = { yahoo_ydn_conv_io: window.primaryYjadId, yahoo_ydn_conv_label: data.label };
		if (data.io) {
			config.yahoo_ydn_conv_io = data.io;
		}
		if (data.transaction_id) {
			config.yahoo_ydn_conv_transaction_id = data.transaction_id;
		}
		if (data.value) {
			config.yahoo_ydn_conv_value = data.value;
		}
		ytag({ type: "yjad_conversion", config });
	},
};
window.Catpow.eventProcessor.register("yjad", window.Catpow.yjad);
