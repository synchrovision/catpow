var CP = {
	filters: {},
	cache: {},
	config: {},

	listedConvertibles: ['catpow/listed', 'catpow/flow', 'catpow/faq', 'catpow/ranking', 'catpow/dialog', 'catpow/sphere', 'catpow/slider', 'catpow/banners', 'catpow/lightbox', 'catpow/panes'],
	tableConvertibles: ['catpow/simpletable', 'catpow/datatable', 'catpow/layouttable'],

	example: {
		attributes: {
			title: ['吾輩は猫である。'],
			headerText: ['吾輩は猫である。'],
			footerText: ['『吾輩は猫である』（わがはいはねこである）　夏目漱石　著'],
			read: ['名前はまだない。どこで生れたか頓と見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。'],
			text: ['名前はまだない。どこで生れたか頓と見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。']
		},
		innerBlocks: [{
			name: 'core/paragraph',
			attributes: {
				content: '名前はまだない。どこで生れたか頓と見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。'
			}
		}]
	},

	selectImage: function selectImage(keys, set, size, devices) {
		if (CP.uploder === undefined) {
			CP.uploader = wp.media({
				title: 'Select Image',
				button: { text: 'Select' },
				multiple: false
			});
		}
		CP.uploader.off('select').on('select', function () {
			var image = CP.uploader.state().get('selection').first().toJSON();
			var data = {};
			if (keys.mime) {
				data[keys.mime] = image.mime;
			}
			if (keys.alt) {
				data[keys.alt] = image.alt;
			}
			if (size && image.sizes && image.sizes[size]) {
				data[keys.src] = image.sizes[size].url;
			} else {
				data[keys.src] = image.url;
			}
			if (keys.sources && image.sizes) {
				devices = devices || ['sp'];
				data[keys.sources] = devices.map(function (device) {
					var sizeData = CP.devices[device];
					return { srcset: image.sizes[sizeData.media_size].url, device: device };
				});
			}
			if (keys.srcset && image.sizes) {
				devices = devices || ['sp', 'pc'];
				data[keys.srcset] = '';
				devices.map(function (device) {
					var sizeData = CP.devices[device];
					data[keys.srcset] += image.sizes[sizeData.media_size].url + sizeData.rep;
				});
			}
			if (keys.data) {
				data[keys.data] = image;
			}
			set(data);
		}).open();
	},
	imageSrcOrDummy: function imageSrcOrDummy(src) {
		if (!src) {
			return cp.theme_url + '/images/dummy.jpg';
		}
		if (src[0] == '[') {
			return cp.plugins_url + '/catpow/callee/dummy_image.php?text=' + src;
		}
		return src;
	},

	parseCSV: function parseCSV(csv) {
		var tmp = [];
		csv = csv.replace(/("[^"]*")+/g, function (match) {
			tmp.push(match.slice(1, -1).replace(/""/g, '"'));return '[TMP]';
		});
		return csv.split("\r\n").map(function (row) {
			return row.split(',').map(function (val) {
				return val === '[TMP]' ? tmp.shift() : val;
			});
		});
	},

	switchNumberClass: function switchNumberClass(_ref, label, value) {
		var set = _ref.set,
		    attr = _ref.attr;

		var classArray = (attr.classes || '').split(' ');
		var i = classArray.findIndex(function (cls) {
			return cls.substr(0, label.length) === label;
		});
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
		set({ classes: classArray.join(' ') });
	},
	getNumberClass: function getNumberClass(_ref2, label) {
		var attr = _ref2.attr;

		var value = (attr.classes || '').split(' ').find(function (cls) {
			return cls.substr(0, label.length) === label;
		});
		if (!value) {
			return 0;
		}
		return parseInt(value.substr(label.length));
	},

	switchColor: function switchColor(props, value) {
		CP.switchNumberClass(props, 'color', value);
	},
	getColor: function getColor(props) {
		return CP.getNumberClass(props, 'color');
	},

	switchPattern: function switchPattern(props, value) {
		CP.switchNumberClass(props, 'pattern', value);
	},
	getPattern: function getPattern(props) {
		return CP.getNumberClass(props, 'pattern');
	},

	switchSelectiveClass: function switchSelectiveClass(_ref3, values, value, key) {
		var set = _ref3.set,
		    attr = _ref3.attr;

		if (key === undefined) {
			key = 'classes';
		}
		var classArray = attr[key].split(' ');
		if (!Array.isArray(values) && _.isObject(values)) {
			values = Object.keys(values);
		}
		classArray = _.difference(classArray, values);
		if (Array.isArray(value)) {
			classArray = classArray.concat(value);
		} else {
			classArray.push(value);
		}
		var data = {};
		data[key] = classArray.join(' ');
		set(data);
	},
	getSelectiveClass: function getSelectiveClass(_ref4, values, key) {
		var attr = _ref4.attr;

		if (key === undefined) {
			key = 'classes';
		}
		if (attr[key] === undefined) {
			attr[key] = '';
		}
		var classArray = attr[key].split(' ');
		if (!Array.isArray(values) && _.isObject(values)) {
			values = Object.keys(values);
		}
		return _.intersection(classArray, values).shift();
	},

	getSubClasses: function getSubClasses(prm) {
		var rtn = {};
		var values = void 0;
		if (Array.isArray(prm.values)) {
			values = prm.values;
		} else {
			values = Object.keys(prm.values);
		}
		values.map(function (val) {
			if (prm.sub && prm.sub[val]) {
				rtn[val] = CP.getAllSubClasses(prm.sub[val]);
			} else {
				rtn[val] = [];
			}
		});
		return rtn;
	},
	getAllSubClasses: function getAllSubClasses(prms) {
		var rtn = [];
		prms.map(function (prm) {
			if ((typeof prm === 'undefined' ? 'undefined' : babelHelpers.typeof(prm)) === 'object') {
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
						Object.keys(prm.sub).map(function (key) {
							rtn = rtn.concat(CP.getAllSubClasses(prm.sub[key]));
						});
					}
				}
			}
		});
		return rtn;
	},
	getBindClasses: function getBindClasses(prm) {
		var rtn = {};
		var values = void 0;
		if (Array.isArray(prm.values)) {
			values = prm.values;
		} else {
			values = Object.keys(prm.values);
		}
		values.map(function (val) {
			if (prm.bind && prm.bind[val]) {
				rtn[val] = prm.bind[val];
			} else {
				rtn[val] = [];
			}
		});
		return rtn;
	},

	toggleClass: function toggleClass(_ref5, value, key) {
		var attr = _ref5.attr,
		    set = _ref5.set;

		if (key === undefined) {
			key = 'classes';
		}
		if (attr[key] === undefined) {
			attr[key] = '';
		}
		var classArray = attr[key].split(' ');
		var i = classArray.indexOf(value);
		if (i === -1) {
			classArray.push(value);
		} else {
			classArray.splice(i, 1);
		}
		var data = {};
		data[key] = classArray.join(' ');
		set(data);
	},
	hasClass: function hasClass(_ref6, value, key) {
		var attr = _ref6.attr;

		if (key === undefined) {
			key = 'classes';
		}
		if (attr[key] === undefined) {
			attr[key] = '';
		}
		return attr[key].split(' ').indexOf(value) !== -1;
	},

	selectPrevItem: function selectPrevItem(tag) {
		jQuery(window.getSelection().anchorNode).closest(tag).prev().find('[contentEditable]').get(0).focus();
	},
	selectNextItem: function selectNextItem(tag) {
		jQuery(window.getSelection().anchorNode).closest(tag).next().find('[contentEditable]').get(0).focus();
	},
	saveItem: function saveItem(_ref7) {
		var items = _ref7.items,
		    itemsKey = _ref7.itemsKey,
		    set = _ref7.set;

		set(babelHelpers.defineProperty({}, itemsKey || 'items', JSON.parse(JSON.stringify(items))));
	},
	deleteItem: function deleteItem(props) {
		var items = props.items,
		    index = props.index;

		items.splice(index, 1);
		CP.saveItem(props);
	},
	cloneItem: function cloneItem(props) {
		var tag = props.tag,
		    items = props.items,
		    index = props.index;

		items.splice(index, 0, JSON.parse(JSON.stringify(items[index])));
		CP.saveItem(props);
		CP.selectNextItem(tag);
	},
	upItem: function upItem(props) {
		var tag = props.tag,
		    items = props.items,
		    index = props.index;

		if (!items[index - 1]) return false;
		items.splice(index - 1, 2, items[index], items[index - 1]);
		CP.saveItem(props);
		CP.selectPrevItem(tag);
	},
	downItem: function downItem(props) {
		var tag = props.tag,
		    items = props.items,
		    index = props.index;

		if (!items[index + 1]) return false;
		items.splice(index, 2, items[index + 1], items[index]);
		CP.saveItem(props);
		CP.selectNextItem(tag);
	},

	switchItemColor: function switchItemColor(_ref8, color, itemsKey) {
		var items = _ref8.items,
		    index = _ref8.index,
		    set = _ref8.set;

		if (itemsKey === undefined) {
			itemsKey = 'items';
		}
		var classArray = (items[index].classes || '').split(' ');
		var i = classArray.findIndex(function (cls) {
			return cls.substr(0, 5) === 'color';
		});
		if (i === -1) {
			if (color) {
				classArray.push('color' + color);
			}
		} else {
			if (color) {
				classArray.splice(i, 1, 'color' + color);
			} else {
				classArray.splice(i, 1);
			}
		}
		items[index].classes = classArray.join(' ');
		set(babelHelpers.defineProperty({}, itemsKey, JSON.parse(JSON.stringify(items))));
	},
	getItemColor: function getItemColor(_ref9) {
		var items = _ref9.items,
		    index = _ref9.index;

		var c = (items[index].classes || '').split(' ').find(function (cls) {
			return cls.substr(0, 5) === 'color';
		});
		if (!c) {
			return 0;
		}
		return parseInt(c.substr(5));
	},

	switchItemPattern: function switchItemPattern(_ref10, pattern, itemsKey) {
		var items = _ref10.items,
		    index = _ref10.index,
		    set = _ref10.set;

		if (itemsKey === undefined) {
			itemsKey = 'items';
		}
		var classArray = (items[index].classes || '').split(' ');
		var i = classArray.findIndex(function (cls) {
			return cls.substr(0, 7) === 'pattern';
		});
		if (i === -1) {
			if (pattern) {
				classArray.push('pattern' + pattern);
			}
		} else {
			if (pattern) {
				classArray.splice(i, 1, 'pattern' + pattern);
			} else {
				classArray.splice(i, 1);
			}
		}
		items[index].classes = classArray.join(' ');
		set(babelHelpers.defineProperty({}, itemsKey, JSON.parse(JSON.stringify(items))));
	},
	getItemPattern: function getItemPattern(_ref11) {
		var items = _ref11.items,
		    index = _ref11.index;

		var p = (items[index].classes || '').split(' ').find(function (cls) {
			return cls.substr(0, 7) === 'pattern';
		});
		if (!p) {
			return 0;
		}
		return parseInt(p.substr(7));
	},

	switchItemSelectiveClass: function switchItemSelectiveClass(_ref12, values, value, itemsKey) {
		var items = _ref12.items,
		    index = _ref12.index,
		    set = _ref12.set;

		if (itemsKey === undefined) {
			itemsKey = 'items';
		}
		var classArray = (items[index].classes || '').split(' ');
		if (!Array.isArray(values) && _.isObject(values)) {
			values = Object.keys(values);
		}
		classArray = _.difference(classArray, values);
		if (Array.isArray(value)) {
			classArray = classArray.concat(value);
		} else {
			classArray.push(value);
		}
		items[index].classes = classArray.join(' ');
		set(babelHelpers.defineProperty({}, itemsKey, JSON.parse(JSON.stringify(items))));
	},
	getItemSelectiveClass: function getItemSelectiveClass(_ref13, values) {
		var items = _ref13.items,
		    index = _ref13.index;

		if (!items[index].classes) {
			return false;
		}
		var classArray = (items[index].classes || '').split(' ');
		if (!Array.isArray(values) && _.isObject(values)) {
			values = Object.keys(values);
		}
		return _.intersection(classArray, values).shift();
	},

	toggleItemClass: function toggleItemClass(_ref14, value, itemsKey) {
		var items = _ref14.items,
		    index = _ref14.index,
		    set = _ref14.set;

		if (itemsKey === undefined) {
			itemsKey = 'items';
		}
		var classArray = (items[index].classes || '').split(' ');
		var i = classArray.indexOf(value);
		if (i === -1) {
			classArray.push(value);
		} else {
			classArray.splice(i, 1);
		}
		items[index].classes = classArray.join(' ');
		set(babelHelpers.defineProperty({}, itemsKey, JSON.parse(JSON.stringify(items))));
	},
	hasItemClass: function hasItemClass(_ref15, value) {
		var items = _ref15.items,
		    index = _ref15.index;

		var classArray = (items[index].classes || '').split(' ');
		return classArray.indexOf(value) !== -1;
	},

	getJsonValue: function getJsonValue(_ref16, json, key) {
		var attr = _ref16.attr;

		if (!attr[json]) {
			return null;
		}
		return JSON.parse(attr[json])[key];
	},
	hasJsonValue: function hasJsonValue(prop, json, key, value) {
		var values = CP.getJsonValue(prop, json, key);
		if (!values) {
			return false;
		}
		return values.indexOf(value) !== -1;
	},
	setJsonValue: function setJsonValue(_ref17, json, key, value) {
		var attr = _ref17.attr,
		    set = _ref17.set;

		var data = {};
		var jsonData = JSON.parse(attr[json]);
		jsonData[key] = value;
		data[json] = JSON.stringify(jsonData);
		set(data);
	},
	switchJsonValue: function switchJsonValue(prop, json, key, value) {
		var values = CP.getJsonValue(prop, json, key);
		if (!values) {
			values = [];
		}
		var i = values.indexOf(value);
		if (i === -1) {
			values.push(value);
		} else {
			values.splice(i, 1);
		}
		CP.setJsonValue(prop, json, key, values);
	},

	parseStyleString: function parseStyleString(css) {
		if (css instanceof Object) {
			return css;
		}
		if (!css) {
			return {};
		}
		var obj = {};
		css.split(';').map(function (pair) {
			var match = pair.match(/^([^:]+?):(.+)$/);
			if (!match) {
				return;
			}
			obj[match[1]] = match[2];
		});
		return obj;
	},
	createStyleString: function createStyleString(data) {
		if (!data) {
			return '';
		}
		return Object.keys(data).map(function (key) {
			return key + ':' + data[key] + ';';
		}).join('');
	},
	parseStyleCode: function parseStyleCode(code) {
		var rtn = {};
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = code.matchAll(/(\S.+?){([^}]+)}/g)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var match = _step.value;

				rtn[match[1]] = CP.parseStyleString(match[2]);
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		return rtn;
	},
	createStyleCode: function createStyleCode(data) {
		if (!data) {
			return '';
		}
		return Object.keys(data).map(function (sel) {
			return sel + '{' + CP.createStyleString(data[sel]) + '}';
		}).join('');
	},
	parseStyleCodeWithMediaQuery: function parseStyleCodeWithMediaQuery(code) {
		if (!code) {
			return {};
		}
		var rtn = {};
		var reg = /@media\s*\((.+?)\)\s*{([^}]+})\s*}/;
		var defaultCode = code.replaceAll(new RegExp(reg, 'g'), function (str) {
			var matches = str.match(reg);
			rtn[matches[1]] = CP.parseStyleCode(matches[2]);
			return '';
		});
		rtn['default'] = CP.parseStyleCode(defaultCode);
		return rtn;
	},
	createStyleCodeWithMediaQuery: function createStyleCodeWithMediaQuery(data) {
		var rtn = '';
		return Object.keys(data).map(function (media) {
			if (media === 'default') {
				return { p: -10000, media: media };
			}
			var matches = media.match(/(min|max)\-width:(\d+)px/);
			return { p: parseInt(matches[2]) * { min: 1, max: -1 }[matches[1]], media: media };
		}).sort(function (a, b) {
			return a.p - b.p;
		}).map(function (d) {
			return d.media;
		}).map(function (media) {
			if (media === 'default') {
				return CP.createStyleCode(data[media]);
			}
			return '@media(' + media + '){' + CP.createStyleCode(data[media]) + '}';
		}).join('');
	},

	createGridStyleCode: function createGridStyleCode(sel, bnd) {
		return sel + '{' + CP.createStyleString(CP.createGridStyleCodeData(bnd)) + '}';
	},
	createGridStyleCodeData: function createGridStyleCodeData(bnd) {
		var rtn = {
			"display": "grid",
			" display": "-ms-grid",
			"-ms-grid-columns": "1fr ".repeat(bnd[0]),
			"grid-template-columns": "repeat(" + bnd[0] + ",1fr)",
			"-ms-grid-rows": "1fr ".repeat(bnd[1]),
			"grid-template-rows": "repeat(" + bnd[1] + ",1fr)"
		};
		return rtn;
	},
	createGridItemStyleCode: function createGridItemStyleCode(sel, bnd) {
		return sel + '{' + CP.createStyleString(CP.createGridItemStyleCodeData(bnd)) + '}';
	},
	createGridItemStyleCodeData: function createGridItemStyleCodeData(bnd) {
		var rtn = {
			"-ms-grid-column": bnd[0],
			"-ms-grid-row": bnd[1],
			"grid-column": bnd[0],
			"grid-row": bnd[1]
		};
		if (bnd[2] && bnd[2] > 1) {
			rtn["grid-column"] += " / span " + bnd[2];
			rtn["-ms-grid-column-span"] = bnd[2];
		}
		if (bnd[3] && bnd[3] > 1) {
			rtn["grid-row"] += " / span " + bnd[3];
			rtn["-ms-grid-row-span"] = bnd[3];
		}
		return rtn;
	},

	wordsToFlags: function wordsToFlags(words) {
		var rtn = {};
		if (undefined === words) {
			return {};
		}
		words.split(' ').map(function (word) {
			rtn[word] = true;
		});
		return rtn;
	},
	flagsToWords: function flagsToWords(flags) {
		if (undefined === flags) {
			return '';
		}
		return Object.keys(flags).filter(function (word) {
			return flags[word];
		}).join(' ');
	},

	filterFlags: function filterFlags(flags, callback) {
		Object.keys(flags).map(function (key) {
			if (!callback(key)) {
				delete flags[key];
			}
		});
		return flags;
	},

	createBlocks: function createBlocks(blocks) {
		return blocks.map(function (block) {
			if (block[2]) {
				block[2] = CP.createBlocks(block[2]);
			}
			return createBlock.apply(undefined, babelHelpers.toConsumableArray(block));
		});
	},

	devices: {
		sp: {
			icon: 'smartphone',
			width: 480,
			media_query: '(max-width:640px)',
			sizes: '(max-width:640px) 480px',
			sizes_value: '480px',
			media_size: 'medium_large',
			reg: /[^,]+ 480w,/,
			rep: ' 480w,'
		},
		tb: {
			icon: 'tablet',
			width: 960,
			media_query: '(max-width:1280px)',
			sizes: '(max-width:1280px) 960px',
			sizes_value: '960px',
			media_size: 'full',
			reg: /[^,]+ 960w,/,
			rep: ' 960w,'
		},
		lt: {
			icon: 'laptop',
			width: 1440,
			media_query: '(max-width:1920px)',
			sizes: '(max-width:1920px) 1440px',
			sizes_value: '1440px',
			media_size: 'full',
			reg: /[^,]+ 1440w,/,
			rep: ' 1440w,'
		},
		pc: {
			icon: 'desktop',
			width: 1920,
			media_query: false,
			sizes: '100vw',
			sizes_value: '100vw',
			media_size: 'full',
			reg: /[^,]+$/,
			rep: ''
		}
	},
	getImageSizesForDevices: function getImageSizesForDevices(devices) {
		return Object.keys(CP.devices).filter(function (device) {
			return devices.includes(device);
		}).map(function (device) {
			return CP.devices[device].sizes;
		}).join(',');
	},
	getPictureSoucesAttributes: function getPictureSoucesAttributes(selector) {
		return {
			source: 'query',
			selector: (selector || 'picture') + ' source',
			query: {
				srcset: { source: 'attribute', attribute: 'srcset' },
				device: { source: 'attribute', 'attribute': 'data-device' }
			}
		};
	},
	getPictureSoucesAttributesForDevices: function getPictureSoucesAttributesForDevices(devices, selector, image) {
		var attr = CP.getPictureSoucesAttributes(selector);
		attr.default = CP.getPictureSoucesAttributesDefaultValueForDevices(devices, image);
		return attr;
	},
	getPictureSoucesAttributesDefaultValueForDevices: function getPictureSoucesAttributesDefaultValueForDevices(devices, image) {
		return devices.map(function (device) {
			return { srcset: cp.theme_url + '/images/' + (image || 'dummy.jpg'), device: device };
		});
	},
	getMediaQueryKeyForDevice: function getMediaQueryKeyForDevice(device) {
		if (!CP.devices[device].media_query) {
			return 'default';
		}
		return CP.devices[device].media_query.slice(1, -1);
	},

	selectiveClassesPreset: {
		isTemplate: {
			label: 'テンプレート',
			values: 'isTemplate',
			sub: [{ input: 'bool', label: 'ループ', key: 'doLoop', sub: [{ label: 'content path', input: 'text', key: 'content_path' }, { label: 'query', input: 'textarea', key: 'query' }, { label: 'プレビューループ数', input: 'range', key: 'loopCount', min: 1, max: 16 }] }]
		}
	}
};
var SelectResponsiveImage = function SelectResponsiveImage(props) {
	var className = props.className,
	    attr = props.attr,
	    set = props.set,
	    _props$keys = props.keys,
	    keys = _props$keys === undefined ? {} : _props$keys,
	    index = props.index,
	    size = props.size,
	    devices = props.devices,
	    device = props.device,
	    isTemplate = props.isTemplate,
	    otherProps = babelHelpers.objectWithoutProperties(props, ['className', 'attr', 'set', 'keys', 'index', 'size', 'devices', 'device', 'isTemplate']);
	var sizes = props.sizes;

	var type = void 0,
	    onClick = void 0,
	    item = void 0,
	    items = void 0;
	if (keys.items) {
		items = attr[keys.items];
		if (keys.subItems) {
			item = items[index][keys.subItems][subIndex];
		} else {
			item = items[index];
		}
	} else {
		item = attr;
	}
	if (device) {
		var sizeData = CP.devices[device];
		onClick = function onClick(e) {
			return CP.selectImage({ src: 'src' }, function (data) {
				if (keys.sources) {
					item[keys.sources].map(function (source) {
						if (source.device === device) {
							source.srcset = src;
						}
						return source;
					});
					if (items) {
						set(babelHelpers.defineProperty({}, keys.items, JSON.parse(JSON.stringify(items))));
					} else {
						set(babelHelpers.defineProperty({}, keys.sources, JSON.parse(JSON.stringify(item[keys.sources]))));
					}
				} else {
					if (items) {
						item[keys.srcset] = item[keys.srcset].replace(sizeData.reg, src + sizeData.rep);
						set(babelHelpers.defineProperty({}, keys.items, JSON.parse(JSON.stringify(items))));
					} else {
						set(babelHelpers.defineProperty({}, keys.srcset, item[keys.srcset].replace(sizeData.reg, src + sizeData.rep)));
					}
				}
			}, sizeData.media_size);
		};
	} else {
		onClick = function onClick(e) {
			return CP.selectImage(keys, function (data) {
				if (keys.items) {
					Object.assign(item, data);
					set(babelHelpers.defineProperty({}, keys.items, JSON.parse(JSON.stringify(items))));
				} else {
					set(data);
				}
			}, size, devices);
		};
	}
	if (isTemplate && keys.code && item[keys.code]) {
		return wp.element.createElement(DummyImage, { text: item[keys.code] });
	}
	if (item[keys.mime]) {
		type = item[keys.mime].split('/')[0];
	} else {
		type = 'image';
	}
	if (type == 'audio') {
		return wp.element.createElement('audio', babelHelpers.extends({
			className: 'selectImage ' + className,
			src: item[keys.src],
			'data-mime': item[keys.mime],
			onClick: onClick
		}, otherProps));
	}
	if (item[keys.srcset] && !sizes) {
		if (device) {
			sizes = CP.devices[device].sizes_value;
		} else {
			sizes = CP.getImageSizesForDevices(devices || ['sp', 'pc']);
		}
	}
	if (type == 'video') {
		return wp.element.createElement('video', babelHelpers.extends({
			className: 'selectImage ' + className,
			src: item[keys.src],
			'data-mime': item[keys.mime],
			onClick: onClick,
			autoplay: 1,
			loop: 1,
			playsinline: 1,
			muted: 1
		}, otherProps));
	}
	var src = CP.imageSrcOrDummy(item[keys.src]);
	if (keys.sources) {
		if (device) {
			console.log(item[keys.sources]);
			var source = item[keys.sources].find(function (source) {
				return source.device === device;
			}) || { srcset: cp.theme_url + '/images/dummy.jpg' };
			return wp.element.createElement(
				'picture',
				babelHelpers.extends({
					className: 'selectImage ' + className,
					onClick: onClick
				}, otherProps),
				wp.element.createElement('img', {
					src: source.srcset,
					alt: item[keys.alt]
				})
			);
		}
		return wp.element.createElement(
			'picture',
			babelHelpers.extends({
				className: 'selectImage ' + className,
				onClick: onClick
			}, otherProps),
			item[keys.sources].map(function (source) {
				return wp.element.createElement('source', { srcset: source.srcset, media: CP.devices[source.device].media_query, 'data-device': source.device });
			}),
			wp.element.createElement('img', {
				src: src,
				alt: item[keys.alt]
			})
		);
	}
	return wp.element.createElement('img', babelHelpers.extends({
		className: 'selectImage ' + className,
		src: src,
		alt: item[keys.alt],
		srcset: item[keys.srcset],
		sizes: sizes,
		'data-mime': item[keys.mime],
		onClick: onClick
	}, otherProps));
};
var ResponsiveImage = function ResponsiveImage(_ref18) {
	var className = _ref18.className,
	    attr = _ref18.attr,
	    keys = _ref18.keys,
	    index = _ref18.index,
	    sizes = _ref18.sizes,
	    devices = _ref18.devices,
	    device = _ref18.device,
	    isTemplate = _ref18.isTemplate;

	var type = void 0,
	    item = void 0;
	if (keys.items) {
		item = attr[keys.items][index];
	} else {
		item = attr;
	}
	if (isTemplate && keys.code && item[keys.code]) {
		return item[keys.code];
	}
	if (item[keys.mime]) {
		type = item[keys.mime].split('/')[0];
	} else {
		type = 'image';
	}
	if (type == 'audio') {
		return wp.element.createElement('audio', {
			src: item[keys.src],
			'data-mime': item[keys.mime]
		});
	}
	if (item[keys.srcset] && !sizes) {
		devices = devices || ['sp', 'pc'];
		sizes = CP.getImageSizesForDevices(devices);
	}
	if (type == 'video') {
		return wp.element.createElement('video', {
			className: className,
			src: item[keys.src],
			srcset: item[keys.srcset],
			sizes: sizes,
			'data-mime': item[keys.mime],
			autoplay: 1,
			loop: 1,
			playsinline: 1,
			muted: 1
		});
	}
	if (keys.sources && item[keys.sources] && item[keys.sources].length) {
		if (device) {
			var source = item[keys.sources].find(function (source) {
				return source.device === device;
			});
			return wp.element.createElement(
				'picture',
				{ className: 'selectImage ' + className },
				wp.element.createElement('img', {
					src: source.srcset,
					alt: item[keys.alt]
				})
			);
		}
		return wp.element.createElement(
			'picture',
			{ className: 'selectImage ' + className },
			item[keys.sources].map(function (source) {
				return wp.element.createElement('source', { srcset: source.srcset, media: CP.devices[source.device].media_query, 'data-device': source.device });
			}),
			wp.element.createElement('img', {
				src: item[keys.src],
				alt: item[keys.alt]
			})
		);
	}
	return wp.element.createElement('img', {
		className: className,
		src: item[keys.src],
		alt: item[keys.alt],
		srcset: item[keys.srcset],
		sizes: sizes,
		'data-mime': item[keys.mime]
	});
};

var SelectPictureSources = function SelectPictureSources(props) {
	var devices = props.devices;

	return wp.element.createElement(
		'table',
		{ className: 'SelectPictureSources' },
		wp.element.createElement(
			'tbody',
			null,
			wp.element.createElement(
				'tr',
				null,
				wp.element.createElement(
					'td',
					{ colspan: devices.length },
					wp.element.createElement(SelectResponsiveImage, props)
				)
			),
			wp.element.createElement(
				'tr',
				null,
				devices.map(function (device) {
					return wp.element.createElement(
						'td',
						null,
						wp.element.createElement(
							'div',
							{ className: 'label' },
							wp.element.createElement(Icon, { icon: CP.devices[device].icon })
						),
						wp.element.createElement(SelectResponsiveImage, babelHelpers.extends({
							device: device
						}, props))
					);
				})
			)
		)
	);
};

var SelectPreparedImage = function SelectPreparedImage(_ref19) {
	var className = _ref19.className,
	    name = _ref19.name,
	    value = _ref19.value,
	    onChange = _ref19.onChange,
	    otherProps = babelHelpers.objectWithoutProperties(_ref19, ['className', 'name', 'value', 'onChange']);

	var onClick = void 0;

	var _wp$element$useState = wp.element.useState(null),
	    _wp$element$useState2 = babelHelpers.slicedToArray(_wp$element$useState, 2),
	    images = _wp$element$useState2[0],
	    setImages = _wp$element$useState2[1];

	CP.cache.PreparedImage = CP.cache.PreparedImage || {};

	if (images === null) {
		if (CP.cache.PreparedImage[name]) {
			setImages(CP.cache.PreparedImage[name]);
		} else {
			wp.apiFetch({ path: 'cp/v1/images/' + name }).then(function (data) {
				CP.cache.PreparedImage[name] = data;
				setImages(data);
			});
		}
		return false;
	}

	return wp.element.createElement(
		'ul',
		babelHelpers.extends({ className: 'selectPreparedImage ' + name + ' ' + className }, otherProps),
		images.map(function (image) {
			return wp.element.createElement(
				'li',
				{ className: 'item ' + (value == image.url ? 'active' : '') },
				wp.element.createElement('img', {
					src: image.url,
					alt: image.alt,
					onClick: function onClick() {
						return onChange(image);
					}
				})
			);
		})
	);
};
var SelectPreparedImageSet = function SelectPreparedImageSet(_ref20) {
	var className = _ref20.className,
	    name = _ref20.name,
	    value = _ref20.value,
	    onChange = _ref20.onChange,
	    otherProps = babelHelpers.objectWithoutProperties(_ref20, ['className', 'name', 'value', 'onChange']);

	var onClick = void 0;

	var _wp$element$useState3 = wp.element.useState(null),
	    _wp$element$useState4 = babelHelpers.slicedToArray(_wp$element$useState3, 2),
	    imagesets = _wp$element$useState4[0],
	    setImagesets = _wp$element$useState4[1];

	CP.cache.PreparedImageSets = CP.cache.PreparedImageSets || {};

	if (imagesets === null) {
		if (CP.cache.PreparedImageSets[name]) {
			setImagesets(CP.cache.PreparedImageSets[name]);
		} else {
			wp.apiFetch({ path: 'cp/v1/imageset/' + name }).then(function (data) {
				CP.cache.PreparedImageSets[name] = data;
				setImagesets(data);
			});
		}
		return false;
	}
	return wp.element.createElement(
		'ul',
		babelHelpers.extends({ className: 'selectPreparedImageSet ' + name + ' ' + className }, otherProps),
		Object.keys(imagesets).map(function (key) {
			var imageset = imagesets[key];
			return wp.element.createElement(
				'li',
				{ className: 'item ' + (value == imageset[0].url ? 'active' : '') },
				wp.element.createElement('img', {
					src: imageset[0].url,
					alt: imageset[0].alt,
					onClick: function onClick() {
						return onChange(imageset);
					}
				})
			);
		})
	);
};

var Item = function Item(props) {
	var tag = props.tag,
	    items = props.items,
	    itemsKey = props.itemsKey,
	    index = props.index,
	    set = props.set,
	    attr = props.attr,
	    triggerClasses = props.triggerClasses,
	    children = props.children;
	var itemClasses = props.itemClasses;

	if (!items[index].classes) {
		items[index].classes = 'item';
	} else if (items[index].classes.search(/\bitem\b/) === -1) {
		items[index].classes += ' item';
	}
	var classes = items[index].classes;
	if (props.className) {
		classes += ' ' + props.className;
	}

	var _attr$currentItemInde = attr.currentItemIndex,
	    currentItemIndex = _attr$currentItemInde === undefined ? 0 : _attr$currentItemInde;


	var isSelected = props.isSelected === undefined ? index == currentItemIndex : props.isSelected;

	return wp.element.createElement(tag, {
		className: classes,
		"data-index": index,
		"data-refine-cond": items[index]['cond'],
		onKeyDown: function onKeyDown(e) {
			if (e.ctrlKey || e.metaKey) {
				switch (e.key) {
					case 's':
						CP.saveItem(props);e.preventDefault();break;
					case 'd':
						CP.cloneItem(props);e.preventDefault();break;
					case 'Backspace':
						CP.deleteItem(props);e.preventDefault();break;
					case 'ArrowUp':
						CP.upItem(props);e.preventDefault();break;
					case 'ArrowDown':
						CP.downItem(props);e.preventDefault();break;
				}
			}
		},
		onClick: function onClick(e) {
			set({ currentItemIndex: index });
		}
	}, wp.element.createElement(
		Fragment,
		null,
		children,
		isSelected && wp.element.createElement(
			'div',
			{ className: 'itemControl' },
			wp.element.createElement('div', { className: 'btn delete', onClick: function onClick(e) {
					return CP.deleteItem(props);
				} }),
			wp.element.createElement('div', { className: 'btn clone', onClick: function onClick(e) {
					return CP.cloneItem(props);
				} }),
			wp.element.createElement('div', { className: 'btn up', onClick: function onClick(e) {
					return CP.upItem(props);
				} }),
			wp.element.createElement('div', { className: 'btn down', onClick: function onClick(e) {
					return CP.downItem(props);
				} })
		)
	));
};
var ItemControlInfoPanel = function ItemControlInfoPanel() {
	return wp.element.createElement(
		PanelBody,
		{ title: '\u64CD\u4F5C', initialOpen: false, icon: 'info' },
		wp.element.createElement(
			'table',
			null,
			wp.element.createElement(
				'tbody',
				null,
				wp.element.createElement(
					'tr',
					null,
					wp.element.createElement(
						'th',
						null,
						'\u2318/Ctrl + S'
					),
					wp.element.createElement(
						'td',
						null,
						'\u4FDD\u5B58'
					)
				),
				wp.element.createElement(
					'tr',
					null,
					wp.element.createElement(
						'th',
						null,
						'\u2318/Ctrl + D'
					),
					wp.element.createElement(
						'td',
						null,
						'\u8907\u88FD'
					)
				),
				wp.element.createElement(
					'tr',
					null,
					wp.element.createElement(
						'th',
						null,
						'\u2318/Ctrl + delete'
					),
					wp.element.createElement(
						'td',
						null,
						'\u524A\u9664'
					)
				),
				wp.element.createElement(
					'tr',
					null,
					wp.element.createElement(
						'th',
						null,
						'\u2318/Ctrl + \u2191'
					),
					wp.element.createElement(
						'td',
						null,
						'\u524D\u306E\u30A2\u30A4\u30C6\u30E0\u3068\u5165\u308C\u66FF\u3048'
					)
				),
				wp.element.createElement(
					'tr',
					null,
					wp.element.createElement(
						'th',
						null,
						'\u2318/Ctrl + \u2193'
					),
					wp.element.createElement(
						'td',
						null,
						'\u6B21\u306E\u30A2\u30A4\u30C6\u30E0\u3068\u5165\u308C\u66FF\u3048'
					)
				)
			)
		)
	);
};

var EditItems = function EditItems(props) {
	var atts = props.atts,
	    set = props.set;

	var key = props.key || 'item';
	var items = atts[key];
	var save = function save() {
		set(babelHelpers.defineProperty({}, key, JSON.parse(JSON.stringify(items))));
	};
	return wp.element.createElement(
		'ul',
		{ className: 'EditItems' },
		props.items.map(function (item) {
			return wp.element.createElement('li', { className: 'item' });
		})
	);
};

var SelectClassPanel = function SelectClassPanel(props) {
	var _props$key = props.key,
	    key = _props$key === undefined ? 'classes' : _props$key,
	    items = props.items,
	    index = props.index,
	    subItemsKey = props.subItemsKey,
	    subIndex = props.subIndex,
	    set = props.set,
	    attr = props.attr,
	    triggerClasses = props.triggerClasses;
	var itemsKey = props.itemsKey,
	    itemClasses = props.itemClasses;

	var item = void 0;
	if (items) {
		itemsKey = itemsKey || 'items';
		if (subItemsKey) {
			if (!items[index]) {
				return false;
			}
			item = items[index][subItemsKey][subIndex];
		} else {
			item = items[index];
		}

		if (!item) {
			return false;
		}
	} else {
		item = attr;
	}
	var states = CP.wordsToFlags(item[key]);
	var styleDatas = {};

	var save = function save(data) {
		if (items) {
			Object.assign(item, data);
			set(babelHelpers.defineProperty({}, itemsKey, JSON.parse(JSON.stringify(items))));
		} else {
			set(data);
		}
	};
	var saveClasses = function saveClasses() {
		save(babelHelpers.defineProperty({}, key, CP.flagsToWords(states)));
	};
	var saveCss = function saveCss(cssKey) {
		set(babelHelpers.defineProperty({}, cssKey, CP.createStyleCodeWithMediaQuery(styleDatas[cssKey])));
	};
	var SelectClass = function SelectClass(prm) {
		if (prm.hasOwnProperty('cond') && !prm.cond) {
			return false;
		}
		var rtn = [];
		if (prm.filter && props.filters && props.filters[prm.filter]) {
			props.filters[prm.filter](prm);
		}
		if (prm.keys) {
			if (items) {
				prm.keys.items = prm.keys.items || itemsKey;
				if (subItemsKey) {
					prm.keys.subItems = prm.keys.subItems || subItemsKey;
				}
			}
		}

		if (prm.json) {
			if (prm.input) {
				switch (prm.input) {
					case 'text':
						rtn.push(wp.element.createElement(TextControl, {
							label: prm.label,
							value: JSON.parse(props.attr[prm.json])[prm.key],
							onChange: function onChange(val) {
								CP.setJsonValue(props, prm.json, prm.key, val);
							}
						}));
						break;
					case 'range':
						if (!prm.coef) {
							prm.coef = 1;
						}
						rtn.push(wp.element.createElement(RangeControl, {
							label: prm.label,
							value: CP.getJsonValue(props, prm.json, prm.key) / prm.coef,
							onChange: function onChange(val) {
								CP.setJsonValue(props, prm.json, prm.key, val * prm.coef);
							},
							min: prm.min,
							max: prm.max,
							step: prm.step
						}));
						break;
					case 'bool':
						rtn.push(wp.element.createElement(ToggleControl, {
							label: prm.label,
							checked: JSON.parse(props.attr[prm.json])[prm.key],
							onChange: function onChange(val) {
								CP.setJsonValue(props, prm.json, prm.key, val);
							}
						}));
						if (prm.sub) {
							if (JSON.parse(props.attr[prm.json])[prm.key]) {
								var sub = [];
								prm.sub.map(function (prm) {
									sub.push(SelectClass(prm));
								});
								rtn.push(wp.element.createElement(
									'div',
									{ className: 'sub' },
									sub
								));
							}
						}
						break;
					case 'flag':
						var value = CP.getJsonValue(props, prm.json, prm.key) || 0;
						if (prm.label) {
							rtn.push(wp.element.createElement(
								'h5',
								null,
								prm.label
							));
						}
						Object.keys(prm.values).map(function (key) {
							rtn.push(wp.element.createElement(CheckboxControl, {
								label: key,
								onChange: function onChange(flag) {
									value |= prm.values[key];
									if (!flag) {
										value ^= prm.values[key];
									}
									CP.setJsonValue(props, prm.json, prm.key, value);
								},
								checked: value & prm.values[key]
							}));
						});
						break;
				}
			} else if (_.isObject(prm.values)) {
				var options = void 0,
				    values = void 0;
				if (Array.isArray(prm.values)) {
					values = prm.values;
					options = prm.values.map(function (cls) {
						return { label: cls, value: cls };
					});
				} else {
					values = Object.keys(prm.values);
					options = values.map(function (cls) {
						return { label: prm.values[cls], value: cls };
					});
				}
				rtn.push(wp.element.createElement(SelectControl, {
					label: prm.label,
					value: CP.getJsonValue(props, prm.json, prm.key),
					onChange: function onChange(val) {
						CP.setJsonValue(props, prm.json, prm.key, val);
					},
					options: options
				}));
			} else if (prm.values) {
				rtn.push(wp.element.createElement(CheckboxControl, {
					label: prm.label,
					onChange: function onChange() {
						CP.switchJsonValue(props, prm.json, prm.key, prm.values);
					},
					checked: CP.hasJsonValue(props, prm.json, prm.key, prm.values)
				}));
			} else {
				rtn.push(wp.element.createElement(TextControl, {
					label: prm.label,
					value: JSON.parse(props.attr[prm.json])[prm.key],
					onChange: function onChange(val) {
						CP.setJsonValue(props, prm.json, prm.key, val);
					}
				}));
			}
		} else if (prm.css) {
			if (!styleDatas[prm.css]) {
				styleDatas[prm.css] = CP.parseStyleCodeWithMediaQuery(attr[prm.css]);
			}
			var _prm$device = prm.device,
			    device = _prm$device === undefined ? 'pc' : _prm$device;

			var media = CP.getMediaQueryKeyForDevice(device);
			styleDatas[prm.css][media] = styleDatas[prm.css][media] || {};
			styleDatas[prm.css][media][prm.sel] = styleDatas[prm.css][media][prm.sel] || {};
			var tgt = styleDatas[prm.css][media][prm.sel];
			if (prm.input) {
				switch (prm.input) {
					case 'border':
						rtn.push(wp.element.createElement(SelectPreparedImage, {
							name: 'border',
							value: tgt['border-image'] && tgt['border-image'].match(/url\((.+?)\)/)[1] || false,
							onChange: function onChange(image) {
								var _image$conf = image.conf,
								    slice = _image$conf.slice,
								    width = _image$conf.width,
								    repeat = _image$conf.repeat;

								tgt['border-style'] = 'solid';
								tgt['border-image'] = 'url(' + image.url + ') fill ' + slice + ' / ' + width + ' ' + repeat;
								saveCss(prm.css);
							}
						}));
						break;
					case 'frame':
						rtn.push(wp.element.createElement(SelectPreparedImageSet, {
							name: 'frame',
							value: tgt['border-image'] && tgt['border-image'].match(/url\((.+?)\)/)[1] || false,
							onChange: function onChange(imageset) {
								imageset.map(function (image) {
									var _image$conf2 = image.conf,
									    device = _image$conf2.device,
									    slice = _image$conf2.slice,
									    width = _image$conf2.width,
									    repeat = _image$conf2.repeat;

									var media = CP.getMediaQueryKeyForDevice(device);
									styleDatas[prm.css][media] = styleDatas[prm.css][media] || {};
									styleDatas[prm.css][media][prm.sel] = styleDatas[prm.css][media][prm.sel] || {};
									styleDatas[prm.css][media][prm.sel]['border-style'] = 'solid';
									styleDatas[prm.css][media][prm.sel]['border-image'] = 'url(' + image.url + ') fill ' + slice + ' / ' + width + ' ' + repeat;
								});
								saveCss(prm.css);
							}
						}));
						break;
				}
			} else {
				rtn.push(wp.element.createElement(TextControl, {
					label: prm.label,
					value: tgt[prm.attr],
					onChange: function onChange(val) {
						tgt[prm.attr] = val;
						saveCss(prm.css);
					}
				}));
			}
		} else {
			if (prm === 'color') {
				rtn.push(wp.element.createElement(SelectColorClass, {
					label: '\u8272',
					set: props.set,
					attr: props.attr,
					selected: Object.keys(states).find(function (key) {
						return (/^color\d+/.test(key)
						);
					}),
					onChange: function onChange(color) {
						CP.filterFlags(states, function (key) {
							return !/^color\d+/.test(key);
						});
						states[color] = true;
						saveClasses();
					}
				}));
			} else if (prm === 'pattern') {
				rtn.push(wp.element.createElement(SelectPatternClass, {
					label: '\u30D1\u30BF\u30FC\u30F3',
					set: props.set,
					attr: props.attr,
					selected: Object.keys(states).find(function (key) {
						return (/^pattern\d+/.test(key)
						);
					}),
					onChange: function onChange(pattern) {
						CP.filterFlags(states, function (key) {
							return !/^pattern\d+/.test(key);
						});
						states[pattern] = true;
						saveClasses();
					}
				}));
			} else if (prm === 'cond') {
				rtn.push(wp.element.createElement(TextareaControl, {
					label: '\u8868\u793A\u6761\u4EF6',
					value: item['cond'],
					onChange: function onChange(cond) {
						return save({ cond: cond });
					}
				}));
			} else if (prm === 'event') {
				if (cp.use_functions.indexOf('ga') > -1) {
					var _window$Catpow$ga = window.Catpow.ga,
					    parseEventString = _window$Catpow$ga.parseEventString,
					    createEventString = _window$Catpow$ga.createEventString;

					var event = parseEventString(item['event']);
					var params = { event: 'イベント', action: 'アクション', category: 'カテゴリ', label_name: 'ラベル名', label: 'ラベル', value: '値' };
					rtn.push(wp.element.createElement(
						BaseControl,
						{ label: 'Google Analitics Event' },
						wp.element.createElement(
							'table',
							null,
							Object.keys(params).map(function (key) {
								return wp.element.createElement(
									'tr',
									null,
									wp.element.createElement(
										'th',
										{ width: '80' },
										params[key]
									),
									wp.element.createElement(
										'td',
										null,
										wp.element.createElement(TextControl, {
											value: event[key],
											type: key == 'value' ? 'number' : 'text',
											onChange: function onChange(val) {
												event[key] = val;
												save({ event: createEventString(event) });
											}
										})
									)
								);
							})
						)
					));
				}
			} else if (prm.input) {
				switch (prm.input) {
					case 'text':
						rtn.push(wp.element.createElement(TextControl, {
							label: prm.label,
							value: item[prm.key],
							onChange: function onChange(val) {
								save(babelHelpers.defineProperty({}, prm.key, val));
							}
						}));
						break;
					case 'textarea':
						rtn.push(wp.element.createElement(TextareaControl, {
							label: prm.label,
							value: item[prm.key],
							onChange: function onChange(val) {
								save(babelHelpers.defineProperty({}, prm.key, val));
							}
						}));
						break;
					case 'range':
						if (!prm.coef) {
							prm.coef = 1;
						}
						rtn.push(wp.element.createElement(RangeControl, {
							label: prm.label,
							value: item[prm.key] / prm.coef,
							onChange: function onChange(val) {
								save(babelHelpers.defineProperty({}, prm.key, val * prm.coef));
							},
							min: prm.min,
							max: prm.max,
							step: prm.step
						}));
						break;
					case 'bool':
						rtn.push(wp.element.createElement(ToggleControl, {
							label: prm.label,
							checked: item[prm.key],
							onChange: function onChange(val) {
								save(babelHelpers.defineProperty({}, prm.key, val));
							}
						}));
						if (prm.sub) {
							if (item[prm.key]) {
								var _sub = [];
								prm.sub.map(function (prm) {
									_sub.push(SelectClass(prm));
								});
								rtn.push(wp.element.createElement(
									'div',
									{ className: 'sub' },
									_sub
								));
							}
						}
						break;
					case 'image':
						if (prm.label) {
							rtn.push(wp.element.createElement(
								'h5',
								null,
								prm.label
							));
						}
						rtn.push(wp.element.createElement(SelectResponsiveImage, {
							index: index,
							set: props.set,
							attr: props.attr,
							keys: prm.keys,
							size: prm.size,
							sizes: prm.sizes,
							device: prm.device,
							devices: prm.devices,
							isTemplate: prm.isTemplate
						}));
						break;
					case 'picture':
						if (prm.label) {
							rtn.push(wp.element.createElement(
								'h5',
								null,
								prm.label
							));
						}
						rtn.push(wp.element.createElement(SelectPictureSources, {
							index: index,
							set: props.set,
							attr: props.attr,
							keys: prm.keys,
							sizes: prm.sizes,
							devices: prm.devices,
							isTemplate: prm.isTemplate
						}));
						break;
					case 'position':
						rtn.push(wp.element.createElement(SelectPositionClass, {
							set: props.set,
							attr: props.attr,
							label: prm.label,
							key: prm.key,
							help: prm.help,
							disable: prm.disable,
							itemsKey: itemsKey,
							index: index
						}));
					case 'icon':
					case 'symbol':
					case 'pattern':
						prm.keys = prm.keys || {};
						prm.keys.src = prm.keys.src || prm.input + 'Src';
						prm.keys.alt = prm.keys.alt || prm.input + 'Alt';
						if (prm.label) {
							rtn.push(wp.element.createElement(
								'h5',
								null,
								prm.label
							));
						}
						console.log('icon');
						rtn.push(wp.element.createElement(SelectPreparedImage, {
							name: prm.input,
							value: item[prm.keys.src],
							onChange: function onChange(image) {
								var _save6;

								save((_save6 = {}, babelHelpers.defineProperty(_save6, prm.keys.src, image.url), babelHelpers.defineProperty(_save6, prm.keys.alt, image.alt), _save6));
							}
						}));
						break;
				}
			} else if (_.isObject(prm.values)) {
				var subClasses = CP.getSubClasses(prm);
				var bindClasses = CP.getBindClasses(prm);

				var _options = void 0,
				    _values = void 0;
				if (Array.isArray(prm.values)) {
					_values = prm.values;
					_options = prm.values.map(function (cls) {
						return { label: cls, value: cls };
					});
				} else {
					_values = Object.keys(prm.values);
					_options = _values.map(function (cls) {
						return { label: prm.values[cls], value: cls };
					});
				}
				var currentClass = _values.find(function (value) {
					return states[value];
				});

				var onChangeCB = function onChangeCB(newClass) {
					if (currentClass) {
						states[currentClass] = false;

						var currentSels = [];
						if (subClasses[currentClass]) {
							currentSels = currentSels.concat(subClasses[currentClass]);
						}
						if (bindClasses[currentClass]) {
							currentSels = currentSels.concat(bindClasses[currentClass]);
						}

						var newSels = [];
						if (subClasses[newClass]) {
							newSels = newSels.concat(subClasses[newClass]);
						}
						if (bindClasses[newClass]) {
							newSels = newSels.concat(bindClasses[newClass]);
						}
						currentSels.map(function (value) {
							if (!newSels.includes(value)) {
								states[value] = false;
							}
						});
					}
					bindClasses[newClass].map(function (value) {
						states[value] = true;
					});
					states[newClass] = true;

					saveClasses();
				};

				switch (prm.type) {
					case 'radio':
						rtn.push(wp.element.createElement(RadioControl, {
							label: prm.label,
							onChange: onChangeCB,
							selected: currentClass,
							options: _options
						}));
						break;
					default:
						rtn.push(wp.element.createElement(SelectControl, {
							label: prm.label,
							onChange: onChangeCB,
							value: currentClass,
							options: _options
						}));
				}

				if (prm.sub) {
					var _currentClass = CP.getSelectiveClass(props, prm.values, prm.key);
					if (_currentClass && prm.sub[_currentClass]) {
						var _sub2 = [];
						prm.sub[_currentClass].map(function (prm) {
							_sub2.push(SelectClass(prm));
						});
						rtn.push(wp.element.createElement(
							'div',
							{ className: 'sub' },
							_sub2
						));
					}
				}
			} else {
				rtn.push(wp.element.createElement(CheckboxControl, {
					label: prm.label,
					onChange: function onChange() {
						states[prm.values] = !states[prm.values];
						saveClasses();
					},
					checked: states[prm.values]
				}));
				if (prm.sub) {
					if (states[prm.values]) {
						var _sub3 = [];
						prm.sub.map(function (prm) {
							_sub3.push(SelectClass(prm));
						});
						rtn.push(wp.element.createElement(
							'div',
							{ className: 'sub' },
							_sub3
						));
					}
				}
			}
		}
		return rtn;
	};
	if (triggerClasses && triggerClasses.item) {
		var blockStates = CP.wordsToFlags(attr.classes);
		itemClasses = triggerClasses.item[Object.keys(triggerClasses.item).find(function (value) {
			return blockStates[value];
		})];
		if (!itemClasses || Array.isArray(itemClasses) && itemClasses.length === 0) {
			return false;
		}
		return wp.element.createElement(
			PanelBody,
			{ title: props.title, initialOpen: props.initialOpen || false, icon: props.icon },
			itemClasses.map(SelectClass)
		);
	}
	return wp.element.createElement(
		PanelBody,
		{ title: props.title, initialOpen: props.initialOpen || false, icon: props.icon },
		props.selectiveClasses.map(SelectClass)
	);
};

var AlignClassToolbar = function AlignClassToolbar(props) {
	var aligns = ['left', 'center', 'right'];
	return wp.element.createElement(BlockAlignmentToolbar, {
		value: CP.getSelectiveClass(props, aligns),
		controls: props.aligns || aligns,
		onChange: function onChange(align) {
			CP.switchSelectiveClass(props, aligns, align, props.key);
		}
	});
};
var VerticalAlignClassToolbar = function VerticalAlignClassToolbar(props) {
	var aligns = ['top', 'center', 'bottom'];
	return wp.element.createElement(BlockVerticalAlignmentToolbar, {
		value: CP.getSelectiveClass(props, aligns),
		controls: props.aligns || aligns,
		onChange: function onChange(align) {
			CP.switchSelectiveClass(props, aligns, align, props.key);
		}
	});
};
var SelectColorClass = function SelectColorClass(props) {
	var label = props.label,
	    help = props.help,
	    selected = props.selected,
	    onChange = props.onChange;


	var items = Array.from(Array(13), function (v, i) {
		var classes = 'fillColor' + i;
		var value = 'color' + i;
		if (value == selected) {
			classes += ' active';
		}
		return wp.element.createElement(
			'li',
			{
				className: classes,
				onClick: function onClick() {
					return onChange(value);
				}
			},
			' '
		);
	});

	return wp.element.createElement(
		BaseControl,
		{ label: label, help: help },
		wp.element.createElement(
			'ul',
			{ 'class': 'selectColor' },
			items
		)
	);
};
var SelectPatternClass = function SelectPatternClass(props) {
	var label = props.label,
	    help = props.help,
	    selected = props.selected,
	    onChange = props.onChange;


	var items = Array.from(Array(6), function (v, i) {
		var classes = 'bgPattern' + i;
		var value = 'pattern' + i;
		if (value == selected) {
			classes += ' active';
		}
		return wp.element.createElement(
			'li',
			{
				className: classes,
				onClick: function onClick() {
					return onChange(value);
				}
			},
			' '
		);
	});

	return wp.element.createElement(
		BaseControl,
		{ label: label, help: help },
		wp.element.createElement(
			'ul',
			{ 'class': 'selectPattern' },
			items
		)
	);
};

var SelectPositionClass = function SelectPositionClass(props) {
	var rows = [['topLeft', 'top', 'topRight'], ['left', 'center', 'right'], ['bottomLeft', 'bottom', 'bottomRight']];
	var values = _.flatten(rows);
	var label = props.label,
	    help = props.help,
	    itemsKey = props.itemsKey,
	    index = props.index,
	    disable = props.disable;

	var value = itemsKey ? CP.getItemSelectiveClass(props, values) : CP.getSelectiveClass(props, values);

	return wp.element.createElement(
		BaseControl,
		{ label: label, help: help },
		wp.element.createElement(
			'table',
			{ className: 'selectPosition' },
			wp.element.createElement(
				'tbody',
				null,
				rows.map(function (cols) {
					return wp.element.createElement(
						'tr',
						null,
						cols.map(function (col) {
							var isChecked = value == col;
							if (disable && disable.includes(col)) {
								return wp.element.createElement(
									'td',
									{ className: 'disable' },
									' '
								);
							}
							return wp.element.createElement(
								'td',
								{
									className: isChecked ? "active" : "",
									onClick: function onClick() {
										if (itemsKey) {
											CP.switchItemSelectiveClass(props, values, col, props.key);
										} else {
											CP.switchSelectiveClass(props, values, col, props.key);
										}
									}
								},
								' '
							);
						})
					);
				})
			)
		)
	);
};

var ImporterCSVPanel = function ImporterCSVPanel(props) {
	var reader = new FileReader();
	reader.onload = function (e) {
		props.callback(CP.parseCSV(e.target.result));
	};
	return wp.element.createElement(
		PanelBody,
		{ title: props.title, initialOpen: false, icon: props.icon },
		wp.element.createElement(FormFileUpload, {
			label: 'CSV',
			accept: 'text/csv',
			onChange: function onChange(e) {
				reader.readAsText(e.target.files[0]);
			}
		})
	);
};

var SelectBreakPointToolbar = function SelectBreakPointToolbar(props) {
	return wp.element.createElement(Toolbar, {
		controls: props.breakpoints.map(function (bp) {
			var title = bp == "0" ? 'ー' : bp;
			return {
				icon: wp.element.createElement(
					'svg',
					{ viewBox: '0 0 100 100' },
					wp.element.createElement(
						'text',
						{ style: { "font-size": "50px" }, x: 50, y: 50, textAnchor: 'middle', dominantBaseline: 'middle' },
						title
					)
				),
				isActive: props.value == bp,
				onClick: function onClick() {
					return props.onChange(bp);
				}
			};
		})
	});
};
var SelectModeToolbar = function SelectModeToolbar(props) {
	var set = props.set,
	    attr = props.attr,
	    _props$modes = props.modes,
	    modes = _props$modes === undefined ? ['EditMode', 'AltMode'] : _props$modes;

	var SomeMode = modes.some(function (mode) {
		return attr[mode];
	});
	var icons = {
		EditMode: 'edit',
		OpenMode: 'video-alt3',
		AltMode: 'welcome-comments',
		TextMode: 'media-text'
	};
	var cond = {
		AltMode: 'doLoop'
	};
	return wp.element.createElement(
		BlockControls,
		null,
		modes.map(function (mode) {
			if (!attr[mode] && SomeMode) {
				return false;
			}
			if (cond[mode] && !attr[cond[mode]]) {
				return false;
			}
			return wp.element.createElement(Toolbar, {
				controls: [{
					icon: icons[mode],
					title: mode,
					isActive: attr[mode],
					onClick: function onClick() {
						return set(babelHelpers.defineProperty({}, mode, !attr[mode]));
					}
				}]
			});
		})
	);
};

var SelectDeviceToolbar = function SelectDeviceToolbar(props) {
	var set = props.set,
	    attr = props.attr,
	    _props$devices = props.devices,
	    devices = _props$devices === undefined ? ['sp', 'pc'] : _props$devices;

	return wp.element.createElement(
		BlockControls,
		null,
		devices.map(function (device) {
			return wp.element.createElement(Toolbar, {
				controls: [{
					icon: CP.devices[device].icon,
					title: device,
					isActive: attr.device === device,
					onClick: function onClick() {
						if (attr.device === device) {
							set({ device: null });
						} else {
							set({ device: device });
						}
					}
				}]
			});
		})
	);
};

var EditItemsTable = function EditItemsTable(props) {
	var set = props.set,
	    attr = props.attr,
	    _props$itemsKey = props.itemsKey,
	    itemsKey = _props$itemsKey === undefined ? 'items' : _props$itemsKey,
	    columns = props.columns,
	    isTemplate = props.isTemplate;

	var items = attr[itemsKey] || [];
	var save = function save() {
		set(babelHelpers.defineProperty({}, itemsKey, JSON.parse(JSON.stringify(items))));
	};
	return wp.element.createElement(
		'table',
		{ className: 'editItemsTable' },
		wp.element.createElement(
			'thead',
			null,
			wp.element.createElement(
				'tr',
				null,
				columns.map(function (col) {
					return col.cond ? wp.element.createElement(
						'th',
						null,
						col.label || col.key
					) : false;
				}),
				wp.element.createElement('th', null)
			)
		),
		wp.element.createElement(
			'tbody',
			null,
			items.map(function (item, index) {
				var propsForControl = { tag: 'tr', set: set, itemsKey: itemsKey, items: items, index: index };
				return wp.element.createElement(
					'tr',
					{
						onClick: function onClick(e) {
							set({ currentItemIndex: index });
						}
					},
					columns.map(function (col) {
						if (!col.cond) {
							return false;
						}
						switch (col.type) {
							case 'text':
								return wp.element.createElement(
									'td',
									null,
									wp.element.createElement(RichText, {
										value: item[col.key],
										onChange: function onChange(value) {
											item[col.key] = value;
											save();
										}
									})
								);
							case 'image':
								return wp.element.createElement(
									'td',
									null,
									wp.element.createElement(SelectResponsiveImage, {
										attr: attr,
										set: set,
										keys: babelHelpers.extends({ items: itemsKey }, col.keys),
										index: index,
										size: col.size || 'vga',
										isTemplate: isTemplate
									})
								);
							case 'picture':
								return wp.element.createElement(
									'td',
									null,
									wp.element.createElement(SelectPictureSources, {
										index: index,
										attr: attr,
										set: set,
										keys: babelHelpers.extends({ items: itemsKey }, col.keys),
										sizes: col.sizes,
										devices: col.devices,
										isTemplate: isTemplate
									})
								);
							case 'items':
								col.columns.map(function (subCol) {
									if (subCol.keys) {
										subCol.keys.subItems = col.key;
									}
								});
								return wp.element.createElement(
									'td',
									null,
									wp.element.createElement(EditItemsTable, {
										set: function set() {
											save();
										},
										attr: item,
										itemsKey: col.itemsKey,
										columns: col.columns,
										isTemplate: isTemplate
									})
								);
						}
					}),
					wp.element.createElement(
						'td',
						null,
						wp.element.createElement(
							'div',
							{ className: 'itemControl' },
							wp.element.createElement('div', { className: 'btn delete', onClick: function onClick(e) {
									return CP.deleteItem(propsForControl);
								} }),
							wp.element.createElement('div', { className: 'btn clone', onClick: function onClick(e) {
									return CP.cloneItem(propsForControl);
								} }),
							wp.element.createElement('div', { className: 'btn up', onClick: function onClick(e) {
									return CP.upItem(propsForControl);
								} }),
							wp.element.createElement('div', { className: 'btn down', onClick: function onClick(e) {
									return CP.downItem(propsForControl);
								} })
						)
					)
				);
			})
		)
	);
};

var DummyImage = function DummyImage(_ref21) {
	var text = _ref21.text;

	return wp.element.createElement('img', { src: cp.plugins_url + '/catpow/callee/dummy_image.php?text=' + text });
};
