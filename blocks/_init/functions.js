var _excluded = ["className", "attr", "set", "keys", "index", "size", "devices", "device", "isTemplate"],
    _excluded2 = ["className", "name", "value", "color", "onChange"],
    _excluded3 = ["className", "name", "value", "color", "onChange"],
    _excluded4 = ["label"],
    _excluded5 = ["label"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { babelHelpers.defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var CP = {
  filters: {},
  cache: {},
  config: {},
  listedConvertibles: ['catpow/listed', 'catpow/flow', 'catpow/faq', 'catpow/ranking', 'catpow/dialog', 'catpow/sphere', 'catpow/slider', 'catpow/banners', 'catpow/lightbox', 'catpow/panes'],
  tableConvertibles: ['catpow/simpletable', 'catpow/datatable', 'catpow/layouttable'],
  dummyText: {
    title: '吾輩は猫である。',
    lead: '名前はまだない。どこで生れたか頓と見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。',
    text: '名前はまだない。どこで生れたか頓と見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。',
    footer: '『吾輩は猫である』（わがはいはねこである）　夏目漱石　著'
  },
  selectImage: function selectImage(keys, set, size, devices) {
    if (CP.uploder === undefined) {
      CP.uploader = wp.media({
        title: 'Select Image',
        button: {
          text: 'Select'
        },
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
          return {
            srcset: image.sizes[sizeData.media_size].url,
            device: device
          };
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
      tmp.push(match.slice(1, -1).replace(/""/g, '"'));
      return '[TMP]';
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

    set({
      classes: classArray.join(' ')
    });
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
    var values;

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
      if (babelHelpers.typeof(prm) === 'object') {
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
    var values;

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
    css.replace('&amp;', '&').split(';').map(function (pair) {
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

    var _iterator = _createForOfIteratorHelper(code.matchAll(/(\S.+?){([^}]+)}/g)),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var match = _step.value;
        rtn[match[1]] = CP.parseStyleString(match[2]);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
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
    var defaultCode = code.replace(new RegExp(reg, 'g'), function (str) {
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
        return {
          p: -10000,
          media: media
        };
      }

      var matches = media.match(/(min|max)\-width:(\d+)px/);
      return {
        p: parseInt(matches[2]) * {
          min: 1,
          max: -1
        }[matches[1]],
        media: media
      };
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
  getUrlInStyleCode: function getUrlInStyleCode(code) {
    if (!code || code.indexOf('url(') === -1) {
      return false;
    }

    var m = code.match(/url\((.+?)\)/);
    return m ? m[1] : '';
  },
  parseGradientStyleValue: function parseGradientStyleValue(gradient) {
    var match = gradient.match(/^(linear|radial)\-gradient\((\d+deg),(.+)\)$/);
    return {
      type: match[1],
      angle: match[2],
      colors: match[3].match(/rgba?\([\d,]+?\) \d+%/g).map(function (color) {
        var match = color.match(/((rgba?)\((\d+),(\d+),(\d+)(,(\d+))?\)) (\d+%)/);
        return {
          color: match[1],
          type: match[2],
          r: match[3],
          g: match[4],
          b: match[5],
          a: match[7] === undefined ? 1 : match[7],
          position: match[8]
        };
      })
    };
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
  parseSelections: function parseSelections(sels) {
    var options, values;

    if (Array.isArray(sels)) {
      values = sels;
      options = sels.map(function (cls) {
        return {
          label: cls,
          value: cls
        };
      });
    } else {
      values = Object.keys(sels);
      options = values.map(function (cls) {
        return {
          label: sels[cls],
          value: cls
        };
      });
    }

    return {
      options: options,
      values: values
    };
  },
  createBlocks: function createBlocks(blocks) {
    return blocks.map(function (block) {
      if (block[2]) {
        block[2] = CP.createBlocks(block[2]);
      }

      return createBlock.apply(void 0, babelHelpers.toConsumableArray(block));
    });
  },
  devices: Catpow.util.devices,
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
        srcset: {
          source: 'attribute',
          attribute: 'srcset'
        },
        device: {
          source: 'attribute',
          'attribute': 'data-device'
        }
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
      return {
        srcset: cp.theme_url + '/images/' + (image || 'dummy.jpg'),
        device: device
      };
    });
  },
  getMediaQueryKeyForDevice: function getMediaQueryKeyForDevice(device) {
    if (!CP.devices[device].media_query) {
      return 'default';
    }

    return CP.devices[device].media_query.slice(1, -1);
  },
  translateCssVal: function translateCssVal(type, val) {
    switch (type) {
      case 'background-size':
        switch (val) {
          case 'c':
            return 'cover';

          case 'i':
            return 'contain';

          case 'f':
            return '100% 100%';

          default:
            return val;
        }

      case 'background-repeat':
        switch (val) {
          case 'n':
            return 'no-repeat';

          case 'x':
          case 'y':
            return 'repeat-' + val;

          default:
            return val;
        }

    }
  },
  selectiveClassesPreset: {
    isTemplate: {
      label: 'テンプレート',
      values: 'isTemplate',
      sub: [{
        input: 'bool',
        label: 'ループ',
        key: 'doLoop',
        sub: [{
          label: 'content path',
          input: 'text',
          key: 'content_path'
        }, {
          label: 'query',
          input: 'textarea',
          key: 'query'
        }, {
          label: 'プレビューループ数',
          input: 'range',
          key: 'loopCount',
          min: 1,
          max: 16
        }]
      }]
    }
  },

  /*datalist*/
  getDataListId: function getDataListId(name, values) {
    var id = 'datalist-' + name;

    if (!document.getElementById(id)) {
      if (!values) {
        if (!CP.dataListPresets.hasOwnProperty(name)) {
          return null;
        }

        values = CP.dataListPresets[name];
      }

      var datalist = document.createElement('datalist');
      datalist.id = id;
      values.map(function (value) {
        var option = document.createElement('option');
        option.value = value;
        datalist.appendChild(option);
      });
      document.body.appendChild(datalist);
    }

    return id;
  },
  dataListPresets: {
    currency: ['AUD', 'CAD', 'CNY', 'DKK', 'HKD', 'INR', 'IDR', 'JPY', 'KRW', 'MYR', 'NOK', 'PHP', 'RUB', 'SGD', 'VND', 'SEK', 'CHF', 'THB', 'GBP', 'USD', 'TWD', 'EUR', 'BRL'],
    mouseEvent: ['click', 'dblclick', 'mouseup', 'mousedown', 'mouseenter', 'mouseleave', 'mouseover', 'mouseout', 'contextmenu'],
    playerEvent: ['canplay', 'canplaythrough', 'complete', 'durationchange', 'emptied', 'ended', 'loadeddata', 'loadedmetadata', 'pause', 'play', 'playing', 'progress', 'ratechange', 'seeked', 'seeking', 'stalled', 'suspend', 'timeupdate', 'volumechange', 'waiting']
  },

  /*richtext helper*/
  getSelecedFormatElement: function getSelecedFormatElement() {
    var sel = window.getSelection();
    if (!sel.rangeCount) return null;
    var con = sel.getRangeAt(0).startContainer;
    return con.nextElementSibling || con.parentElement;
  },

  /*color inherit*/
  inheritColor: function inheritColor(props, images) {
    var attributes = props.attributes,
        className = props.className,
        setAttributes = props.setAttributes,
        context = props.context;
    var setURLparams = Catpow.util.setURLparams;
    var classes = attributes.classes,
        color = attributes.color,
        inheritColor = attributes.inheritColor;
    var useEffect = wp.element.useEffect;

    if (undefined === inheritColor) {
      setAttributes({
        inheritColor: color === "0" || context['catpow/color'] === color
      });
    }

    wp.element.useEffect(function () {
      if (inheritColor && context['catpow/color'] !== "0") {
        setAttributes({
          color: context['catpow/color']
        });
      }

      setAttributes({
        inheritColor: color === context['catpow/color']
      });
    }, [context['catpow/color']]);
    wp.element.useEffect(function () {
      var atts = {
        inheritColor: color == context['catpow/color'],
        classes: classes.replace(/color\d+\s*/, '') + ' color' + color
      };
      images.map(function (key) {
        if (!attributes[key]) {
          return;
        }

        if (attributes[key].indexOf('url(') !== -1) {
          atts[key] = attributes[key].replace(/url\((.+?)\)/, function (m, p1) {
            return 'url(' + setURLparams(p1, {
              c: color,
              theme: cp.theme
            }) + ')';
          });
          return;
        }

        atts[key] = setURLparams(attributes[key], {
          c: color,
          theme: cp.theme
        });
      });
      setAttributes(atts);
    }, [color]);
  },

  /*id reflection*/
  manageStyleData: function manageStyleData(props, csss) {
    var attributes = props.attributes,
        className = props.className,
        setAttributes = props.setAttributes;
    var id = attributes.id,
        prevId = attributes.prevId,
        styleDatas = attributes.styleDatas;
    var useEffect = wp.element.useEffect;

    if (!id) {
      setAttributes({
        id: 's' + new Date().getTime().toString(16)
      });
    }

    if (undefined === styleDatas) {
      var _styleDatas = {};
      csss.map(function (key) {
        _styleDatas[key] = CP.parseStyleCodeWithMediaQuery(attributes[key]);
      });
      setAttributes({
        styleDatas: _styleDatas
      });
    }

    wp.element.useEffect(function () {
      if (id && id.length > 2) {
        if (document.querySelectorAll('#' + id).length > 1) {
          setAttributes({
            id: 's' + new Date().getTime().toString(16)
          });
        }

        var atts = {};
        atts.prevId = id;
        atts.styleDatas = {};
        csss.map(function (key) {
          if (!attributes[key]) {
            return;
          }

          atts[key] = attributes[key].replace('#' + prevId, '#' + id);
          atts.styleDatas[key] = CP.parseStyleCodeWithMediaQuery(atts[key]);
        });
        setAttributes(atts);
      }
    }, [id]);
  },

  /*compornents*/
  SelectThemeColor: function SelectThemeColor(props) {
    var selected = props.selected,
        onChange = props.onChange;
    var items = Array.from(Array(13), function (v, i) {
      var classes = 'fillColor' + i;
      var value = 'color' + i;

      if (value == selected) {
        classes += ' active';
      }

      return wp.element.createElement("li", {
        className: classes,
        onClick: function onClick() {
          return onChange(value);
        }
      }, " ");
    });
    return wp.element.createElement("ul", {
      class: "selectColor"
    }, items);
  },
  SelectColors: function SelectColors(props) {
    var _wp$element = wp.element,
        useState = _wp$element.useState,
        useRef = _wp$element.useRef;
    var _wp$components = wp.components,
        ColorPicker = _wp$components.ColorPicker,
        ColorPalette = _wp$components.ColorPalette,
        Popover = _wp$components.Popover;
    var onChange = props.onChange;

    var _useState = useState(-1),
        _useState2 = babelHelpers.slicedToArray(_useState, 2),
        index = _useState2[0],
        setIndex = _useState2[1];

    var colorValues = props.colors.map(function (color) {
      if (typeof color === 'string') {
        return color;
      }

      if ('h' in color) {
        if ('a' in color) {
          return "hsla(".concat(color.h, ",").concat(color.s, ",").concat(color.l, ",").concat(color.a, ")");
        }

        return "hsl(".concat(color.h, ",").concat(color.s, ",").concat(color.l, ")");
      }

      if ('a' in color) {
        return "rgba(".concat(color.r, ",").concat(color.g, ",").concat(color.b, ",").concat(color.a, ")");
      }

      return "rgba(".concat(color.r, ",").concat(color.g, ",").concat(color.b, ")");
    });
    var colors = colorValues.map(function (color) {
      return {
        name: color,
        color: color
      };
    });
    return wp.element.createElement("div", null, wp.element.createElement(ColorPalette, {
      colors: colors,
      color: index > -1 && colors[index].color,
      onChange: function onChange(colorValue) {
        setIndex(colorValues.indexOf(colorValue));
      }
    }), index > -1 && wp.element.createElement(Popover, null, wp.element.createElement(ColorPicker, {
      color: colors[index].color,
      onChangeComplete: function onChangeComplete(value) {
        colors[index].color = value.hex;
        onChange(index, value);
      }
    })));
  },
  SelectButtons: function SelectButtons(props) {
    var _wp$components2 = wp.components,
        Button = _wp$components2.Button,
        ButtonGroup = _wp$components2.ButtonGroup;
    return wp.element.createElement(BaseControl, {
      label: props.label,
      help: props.help,
      id: 'CP-SelectButtons-' + wp.compose.useInstanceId(CP.SelectButtons)
    }, wp.element.createElement("div", {
      className: "selectButtons"
    }, wp.element.createElement(ButtonGroup, null, props.options.map(function (option) {
      return wp.element.createElement(Button, {
        onClick: function onClick() {
          return props.onChange(option.value);
        },
        isPrimary: props.selected === option.value
      }, option.label);
    }))));
  },
  SelectGridButtons: function SelectGridButtons(props) {
    var maxStrlen = props.options.reduce(function (acc, cur) {
      return Math.max(acc, cur.label.length + cur.label.replace(/[ -~]+/, '').length);
    }, 3);
    var colNum = Math.min(6, Math.floor(36 / (maxStrlen + 2)));
    return wp.element.createElement(BaseControl, {
      label: props.label,
      help: props.help,
      id: 'CP-SelectGridButtons-' + wp.compose.useInstanceId(CP.SelectGridButtons)
    }, wp.element.createElement("ul", {
      className: "selectGridButtons col" + colNum
    }, props.options.map(function (option) {
      return wp.element.createElement("li", {
        onClick: function onClick() {
          return props.onChange(option.value);
        },
        className: 'item' + (props.selected === option.value ? ' active' : '')
      }, option.label);
    })));
  },
  SelectResponsiveImage: function SelectResponsiveImage(props) {
    var className = props.className,
        attr = props.attr,
        set = props.set,
        _props$keys = props.keys,
        keys = _props$keys === void 0 ? {} : _props$keys,
        index = props.index,
        size = props.size,
        devices = props.devices,
        device = props.device,
        isTemplate = props.isTemplate,
        otherProps = babelHelpers.objectWithoutProperties(props, _excluded);
    var sizes = props.sizes;
    var type, onClick, item, items;

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
        return CP.selectImage({
          src: 'src'
        }, function (_ref18) {
          var src = _ref18.src;

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
            babelHelpers.extends(item, data);
            set(babelHelpers.defineProperty({}, keys.items, JSON.parse(JSON.stringify(items))));
          } else {
            set(data);
          }
        }, size, devices);
      };
    }

    if (isTemplate && keys.code && item[keys.code]) {
      return wp.element.createElement(CP.DummyImage, {
        text: item[keys.code]
      });
    }

    if (item[keys.mime]) {
      type = item[keys.mime].split('/')[0];
    } else {
      type = 'image';
    }

    if (type == 'audio') {
      return wp.element.createElement("audio", babelHelpers.extends({
        className: 'selectImage ' + className,
        src: item[keys.src],
        "data-mime": item[keys.mime],
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
      return wp.element.createElement("video", babelHelpers.extends({
        className: 'selectImage ' + className,
        src: item[keys.src],
        "data-mime": item[keys.mime],
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
        var source = item[keys.sources].find(function (source) {
          return source.device === device;
        }) || {
          srcset: cp.theme_url + '/images/dummy.jpg'
        };
        return wp.element.createElement("picture", babelHelpers.extends({
          className: 'selectImage ' + className,
          onClick: onClick
        }, otherProps), wp.element.createElement("img", {
          src: source.srcset,
          alt: item[keys.alt]
        }));
      }

      return wp.element.createElement("picture", babelHelpers.extends({
        className: 'selectImage ' + className,
        onClick: onClick
      }, otherProps), item[keys.sources].map(function (source) {
        return wp.element.createElement("source", {
          srcset: source.srcset,
          media: CP.devices[source.device].media_query,
          "data-device": source.device
        });
      }), wp.element.createElement("img", {
        src: src,
        alt: item[keys.alt]
      }));
    }

    return wp.element.createElement("img", babelHelpers.extends({
      className: 'selectImage ' + className,
      src: src,
      alt: item[keys.alt],
      srcset: item[keys.srcset],
      sizes: sizes,
      "data-mime": item[keys.mime],
      onClick: onClick
    }, otherProps));
  },
  ResponsiveImage: function ResponsiveImage(_ref19) {
    var className = _ref19.className,
        attr = _ref19.attr,
        keys = _ref19.keys,
        index = _ref19.index,
        sizes = _ref19.sizes,
        devices = _ref19.devices,
        device = _ref19.device,
        isTemplate = _ref19.isTemplate;
    var type, item;

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
      return wp.element.createElement("audio", {
        src: item[keys.src],
        "data-mime": item[keys.mime]
      });
    }

    if (item[keys.srcset] && !sizes) {
      devices = devices || ['sp', 'pc'];
      sizes = CP.getImageSizesForDevices(devices);
    }

    if (type == 'video') {
      return wp.element.createElement("video", {
        className: className,
        src: item[keys.src],
        srcset: item[keys.srcset],
        sizes: sizes,
        "data-mime": item[keys.mime],
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
        return wp.element.createElement("picture", {
          className: 'selectImage ' + className
        }, wp.element.createElement("img", {
          src: source.srcset,
          alt: item[keys.alt]
        }));
      }

      return wp.element.createElement("picture", {
        className: 'selectImage ' + className
      }, item[keys.sources].map(function (source) {
        return wp.element.createElement("source", {
          srcset: source.srcset,
          media: CP.devices[source.device].media_query,
          "data-device": source.device
        });
      }), wp.element.createElement("img", {
        src: item[keys.src],
        alt: item[keys.alt]
      }));
    }

    return wp.element.createElement("img", {
      className: className,
      src: item[keys.src],
      alt: item[keys.alt],
      srcset: item[keys.srcset],
      sizes: sizes,
      "data-mime": item[keys.mime]
    });
  },
  SelectPictureSources: function SelectPictureSources(props) {
    var devices = props.devices;
    return wp.element.createElement("table", {
      className: "SelectPictureSources"
    }, wp.element.createElement("tbody", null, wp.element.createElement("tr", null, wp.element.createElement("td", {
      colspan: devices.length
    }, wp.element.createElement(CP.SelectResponsiveImage, props))), wp.element.createElement("tr", null, devices.map(function (device) {
      return wp.element.createElement("td", null, wp.element.createElement("div", {
        className: "label"
      }, wp.element.createElement(Icon, {
        icon: CP.devices[device].icon
      })), wp.element.createElement(CP.SelectResponsiveImage, babelHelpers.extends({
        device: device
      }, props)));
    }))));
  },
  SelectPreparedImage: function SelectPreparedImage(_ref20) {
    var className = _ref20.className,
        name = _ref20.name,
        value = _ref20.value,
        color = _ref20.color,
        onChange = _ref20.onChange,
        otherProps = babelHelpers.objectWithoutProperties(_ref20, _excluded2);
    var onClick;
    var _Catpow$util = Catpow.util,
        getURLparam = _Catpow$util.getURLparam,
        setURLparam = _Catpow$util.setURLparam,
        setURLparams = _Catpow$util.setURLparams,
        removeURLparam = _Catpow$util.removeURLparam;

    var _wp$element$useReduce = wp.element.useReducer(function (state, action) {
      switch (action.type) {
        case 'nextPage':
          state.page--;
          break;

        case 'prevPage':
          state.page++;
          break;

        case 'gotoPage':
          state.page = action.page;
          break;

        case 'update':
          if (action.images) {
            state.images = action.images;
            var bareURL = removeURLparam(value, 'c');
            state.image = state.images.find(function (image) {
              return image.url === bareURL;
            });
          }

          if (action.image) {
            state.image = action.image;
          }

          onChange(_objectSpread(_objectSpread({}, state.image), {}, {
            url: setURLparams(state.image ? state.image.url : value, {
              c: color,
              theme: cp.theme
            })
          }));
      }

      return _objectSpread({}, state);
    }, {
      page: 0,
      images: null,
      image: null
    }),
        _wp$element$useReduce2 = babelHelpers.slicedToArray(_wp$element$useReduce, 2),
        state = _wp$element$useReduce2[0],
        dispatch = _wp$element$useReduce2[1];

    CP.cache.PreparedImage = CP.cache.PreparedImage || {};

    if (state.images === null) {
      if (CP.cache.PreparedImage[name]) {
        dispatch({
          type: 'update',
          images: CP.cache.PreparedImage[name]
        });
      } else {
        wp.apiFetch({
          path: 'cp/v1/images/' + name
        }).then(function (images) {
          CP.cache.PreparedImage[name] = images;
          dispatch({
            type: 'update',
            images: images
          });
        });
      }

      return false;
    }

    return wp.element.createElement("ul", babelHelpers.extends({
      className: 'selectPreparedImage ' + name + ' ' + className
    }, otherProps), state.images.map(function (image) {
      var url = setURLparams(image.url, {
        c: color,
        theme: cp.theme
      });
      return wp.element.createElement("li", {
        className: 'item ' + (value == url ? 'active' : '')
      }, wp.element.createElement("img", {
        src: url,
        alt: image.alt,
        onClick: function onClick() {
          return dispatch({
            type: 'update',
            image: image
          });
        }
      }));
    }));
  },
  SelectPreparedImageSet: function SelectPreparedImageSet(_ref21) {
    var className = _ref21.className,
        name = _ref21.name,
        value = _ref21.value,
        color = _ref21.color,
        onChange = _ref21.onChange,
        otherProps = babelHelpers.objectWithoutProperties(_ref21, _excluded3);
    var onClick;
    var _Catpow$util2 = Catpow.util,
        getURLparam = _Catpow$util2.getURLparam,
        setURLparam = _Catpow$util2.setURLparam,
        setURLparams = _Catpow$util2.setURLparams,
        removeURLparam = _Catpow$util2.removeURLparam;

    var _wp$element$useReduce3 = wp.element.useReducer(function (state, action) {
      switch (action.type) {
        case 'update':
          if (action.imagesets) {
            state.imagesets = action.imagesets;
            var bareURL = removeURLparam(value, 'c');

            for (var key in state.imagesets) {
              if (state.imagesets[key].url === bareURL) {
                state.imageset = state.imagesets[key];
                break;
              }
            }
          }

          if (action.imageset) {
            state.imageset = action.imageset;
          }

          if (state.imageset) {
            onChange(state.imageset.map(function (item) {
              return _objectSpread(_objectSpread({}, item), {}, {
                url: setURLparams(item.url, {
                  c: color,
                  theme: cp.theme
                })
              });
            }));
          }

      }

      return _objectSpread({}, state);
    }, {
      page: 0,
      imagesets: null,
      imageset: null
    }),
        _wp$element$useReduce4 = babelHelpers.slicedToArray(_wp$element$useReduce3, 2),
        state = _wp$element$useReduce4[0],
        dispatch = _wp$element$useReduce4[1];

    CP.cache.PreparedImageSets = CP.cache.PreparedImageSets || {};

    if (state.imagesets === null) {
      if (CP.cache.PreparedImageSets[name]) {
        dispatch({
          type: 'update',
          imagesets: CP.cache.PreparedImageSets[name]
        });
      } else {
        wp.apiFetch({
          path: 'cp/v1/imageset/' + name
        }).then(function (imagesets) {
          CP.cache.PreparedImageSets[name] = imagesets;
          dispatch({
            type: 'update',
            imagesets: imagesets
          });
        });
      }

      return false;
    }

    return wp.element.createElement("ul", babelHelpers.extends({
      className: 'selectPreparedImageSet ' + name + ' ' + className
    }, otherProps), Object.keys(state.imagesets).map(function (key) {
      var imageset = state.imagesets[key];
      var url = setURLparams(imageset[0].url, {
        c: color,
        theme: cp.theme
      });
      return wp.element.createElement("li", {
        className: 'item ' + (value == url ? 'active' : '')
      }, wp.element.createElement("img", {
        src: url,
        alt: imageset[0].alt,
        onClick: function onClick() {
          return dispatch({
            type: 'update',
            imageset: imageset
          });
        }
      }));
    }));
  },
  DataInputTable: function DataInputTable(props) {
    var cols = props.cols,
        value = props.value,
        _onChange2 = props.onChange;
    var _wp$element2 = wp.element,
        useCallback = _wp$element2.useCallback,
        useMemo = _wp$element2.useMemo;
    var el = wp.element.createElement;
    var Row = useCallback(function (props) {
      var cols = props.cols,
          value = props.value,
          _onChange = props.onChange;
      return wp.element.createElement("tr", {
        className: "DataInputTable__body__row"
      }, Object.keys(cols).map(function (c) {
        return wp.element.createElement("td", {
          className: "DataInputTable__body__row__cell"
        }, wp.element.createElement(CP.DynamicInput, {
          value: value[c],
          onChange: function onChange(val) {
            value[c] = val;

            _onChange(value);
          },
          param: cols[c]
        }));
      }));
    }, []);
    var defaultRowValues = useMemo(function () {
      var rowValue = {};
      Object.keys(cols).map(function (c) {
        rowValue[c] = cols[c].default || '';
      });
      return [rowValue];
    }, [cols]);
    var colsWithoutLabel = useMemo(function () {
      var colsWithoutLabel = {};
      Object.keys(cols).map(function (c) {
        var _cols$c = cols[c],
            label = _cols$c.label,
            otherParams = babelHelpers.objectWithoutProperties(_cols$c, _excluded4);
        colsWithoutLabel[c] = otherParams;
      });
      return colsWithoutLabel;
    }, [cols]);
    return wp.element.createElement("table", {
      className: "DataInputTable"
    }, wp.element.createElement("thead", {
      class: "DataInputTable__head"
    }, wp.element.createElement("tr", {
      class: "DataInputTable__head__row"
    }, Object.keys(cols).map(function (c) {
      return wp.element.createElement("th", {
        className: "DataInputTable__head__row__cell"
      }, cols[c].label || c);
    }))), wp.element.createElement("tbody", {
      class: "DataInputTable__body"
    }, (value || defaultRowValues).map(function (rowValue, index) {
      return wp.element.createElement(Row, {
        cols: colsWithoutLabel,
        value: rowValue,
        onChange: function onChange(rowValue) {
          if (!value) {
            _onChange2([rowValue]);

            return;
          }

          value[index] = rowValue;

          _onChange2(value);
        },
        onDelete: function onDelete() {
          if (!value) {
            _onChange2([]);

            return;
          }

          value.splice(index, 1);

          _onChange2(value);
        },
        onClone: function onClone() {
          if (!value) {
            _onChange2([defaultRowValues]);

            return;
          }

          value.splice(index, 0, JSON.parse(JSON.stringify(rowValue)));

          _onChange2(value);
        }
      });
    })));
  },
  DynamicInput: function DynamicInput(props) {
    var param = props.param,
        value = props.value,
        onChange = props.onChange;

    switch (param.type) {
      case 'radio':
        {
          var _CP$parseSelections = CP.parseSelections(param.options),
              options = _CP$parseSelections.options;

          return wp.element.createElement(RadioControl, {
            label: param.label || null,
            onChange: onChange,
            selected: value,
            options: options
          });
        }

      case 'select':
        {
          var _CP$parseSelections2 = CP.parseSelections(param.options),
              _options = _CP$parseSelections2.options;

          return wp.element.createElement(SelectControl, {
            label: param.label || null,
            onChange: onChange,
            value: value,
            options: _options
          });
        }

      case 'buttons':
        {
          var _CP$parseSelections3 = CP.parseSelections(param.options),
              _options2 = _CP$parseSelections3.options;

          return wp.element.createElement(CP.SelectButtons, {
            onChange: onChange,
            selected: value,
            options: _options2
          });
        }

      case 'gridbuttons':
        {
          var _CP$parseSelections4 = CP.parseSelections(param.options),
              _options3 = _CP$parseSelections4.options;

          return wp.element.createElement(CP.SelectGridButtons, {
            onChange: onChange,
            selected: value,
            options: _options3
          });
        }

      case 'range':
        {
          return wp.element.createElement(RangeControl, {
            label: param.label || null,
            onChange: onChange,
            value: value,
            min: param.min || 0,
            max: param.max || 10,
            step: param.step || 1
          });
        }

      case 'bool':
        {
          return wp.element.createElement(ToggleControl, {
            label: param.label || null,
            checked: value,
            onChange: onChange
          });
        }

      case 'data':
        {
          return wp.element.createElement(CP.DataInputTable, {
            cols: param.cols,
            value: value,
            onChange: onChange
          });
        }

      default:
        {
          return wp.element.createElement(TextControl, {
            label: param.label || null,
            type: param.type,
            value: value,
            onChange: onChange,
            list: param.list && CP.getDataListId(param.list, param.values)
          });
        }
    }
  },
  Item: function Item(props) {
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
        currentItemIndex = _attr$currentItemInde === void 0 ? 0 : _attr$currentItemInde;
    var isSelected = props.isSelected === undefined ? index == currentItemIndex : props.isSelected;
    return wp.element.createElement(tag, {
      className: classes,
      "data-index": index,
      "data-refine-cond": items[index]['cond'],
      onKeyDown: function onKeyDown(e) {
        if (e.ctrlKey || e.metaKey) {
          switch (e.key) {
            case 's':
              CP.saveItem(props);
              e.preventDefault();
              break;

            case 'd':
              CP.cloneItem(props);
              e.preventDefault();
              break;

            case 'Backspace':
              CP.deleteItem(props);
              e.preventDefault();
              break;

            case 'ArrowUp':
              CP.upItem(props);
              e.preventDefault();
              break;

            case 'ArrowDown':
              CP.downItem(props);
              e.preventDefault();
              break;
          }
        }
      },
      onClick: function onClick(e) {
        set({
          currentItemIndex: index
        });
      }
    }, wp.element.createElement(Fragment, null, children, isSelected && wp.element.createElement("div", {
      className: "itemControl"
    }, wp.element.createElement("div", {
      className: "btn delete",
      onClick: function onClick(e) {
        return CP.deleteItem(props);
      }
    }), wp.element.createElement("div", {
      className: "btn clone",
      onClick: function onClick(e) {
        return CP.cloneItem(props);
      }
    }), wp.element.createElement("div", {
      className: "btn up",
      onClick: function onClick(e) {
        return CP.upItem(props);
      }
    }), wp.element.createElement("div", {
      className: "btn down",
      onClick: function onClick(e) {
        return CP.downItem(props);
      }
    }))));
  },
  ItemControlInfoPanel: function ItemControlInfoPanel() {
    return wp.element.createElement(PanelBody, {
      title: "\u64CD\u4F5C",
      initialOpen: false,
      icon: "info"
    }, wp.element.createElement("table", null, wp.element.createElement("tbody", null, wp.element.createElement("tr", null, wp.element.createElement("th", null, "\u2318/Ctrl + S"), wp.element.createElement("td", null, "\u4FDD\u5B58")), wp.element.createElement("tr", null, wp.element.createElement("th", null, "\u2318/Ctrl + D"), wp.element.createElement("td", null, "\u8907\u88FD")), wp.element.createElement("tr", null, wp.element.createElement("th", null, "\u2318/Ctrl + delete"), wp.element.createElement("td", null, "\u524A\u9664")), wp.element.createElement("tr", null, wp.element.createElement("th", null, "\u2318/Ctrl + \u2191"), wp.element.createElement("td", null, "\u524D\u306E\u30A2\u30A4\u30C6\u30E0\u3068\u5165\u308C\u66FF\u3048")), wp.element.createElement("tr", null, wp.element.createElement("th", null, "\u2318/Ctrl + \u2193"), wp.element.createElement("td", null, "\u6B21\u306E\u30A2\u30A4\u30C6\u30E0\u3068\u5165\u308C\u66FF\u3048")))));
  },
  SelectClassPanel: function SelectClassPanel(props) {
    var _wp$components3 = wp.components,
        ColorPicker = _wp$components3.ColorPicker,
        GradientPicker = _wp$components3.__experimentalGradientPicker;

    var _wp$hooks$applyFilter = wp.hooks.applyFilters('catpow.SelectClassPanelProps', props),
        _wp$hooks$applyFilter2 = _wp$hooks$applyFilter.classKey,
        classKey = _wp$hooks$applyFilter2 === void 0 ? 'classes' : _wp$hooks$applyFilter2,
        items = _wp$hooks$applyFilter.items,
        index = _wp$hooks$applyFilter.index,
        subItemsKey = _wp$hooks$applyFilter.subItemsKey,
        subIndex = _wp$hooks$applyFilter.subIndex,
        set = _wp$hooks$applyFilter.set,
        attr = _wp$hooks$applyFilter.attr,
        triggerClasses = _wp$hooks$applyFilter.triggerClasses;

    var itemsKey = props.itemsKey,
        itemClasses = props.itemClasses;
    var item;

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

    var states = CP.wordsToFlags(item[classKey]);
    var styleDatas = attr.styleDatas;

    var save = function save(data) {
      if (items) {
        babelHelpers.extends(item, data);
        set(babelHelpers.defineProperty({}, itemsKey, JSON.parse(JSON.stringify(items))));
      } else {
        set(data);
      }
    };

    var saveClasses = function saveClasses() {
      save(babelHelpers.defineProperty({}, classKey, CP.flagsToWords(states)));
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
                  rtn.push(wp.element.createElement("div", {
                    className: "sub"
                  }, sub));
                }
              }

              break;

            case 'flag':
              var value = CP.getJsonValue(props, prm.json, prm.key) || 0;

              if (prm.label) {
                rtn.push(wp.element.createElement("h5", null, prm.label));
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

            case 'color':
              if (prm.label) {
                rtn.push(wp.element.createElement("h5", null, prm.label));
              }

              rtn.push(wp.element.createElement(ColorPicker, {
                color: CP.getJsonValue(props, prm.json, prm.key) || '#FFFFFF',
                onChangeComplete: function onChangeComplete(value) {
                  CP.setJsonValue(props, prm.json, prm.key, value.hex);
                }
              }));
              break;

            case 'colors':
              if (prm.label) {
                rtn.push(wp.element.createElement("h5", null, prm.label));
              }

              rtn.push(wp.element.createElement(CP.SelectColors, {
                colors: CP.getJsonValue(props, prm.json, prm.key) || [{
                  h: '40',
                  s: '80%',
                  l: '50%'
                }, {
                  h: '60',
                  s: '80%',
                  l: '50%'
                }],
                onChange: function onChange(colors) {
                  CP.setJsonValue(props, prm.json, prm.key, colors);
                }
              }));
              break;

            case 'gradient':
              if (prm.label) {
                rtn.push(wp.element.createElement("h5", null, prm.label));
              }

              rtn.push(wp.element.createElement(GradientPicker, {
                onChange: function onChange(value) {
                  console.log(CP.parseGradientStyleValue(value));
                }
              }));
              break;
          }
        } else if (_.isObject(prm.values)) {
          var _CP$parseSelections5 = CP.parseSelections(prm.values),
              _options4 = _CP$parseSelections5.options,
              _values = _CP$parseSelections5.values;

          rtn.push(wp.element.createElement(SelectControl, {
            label: prm.label,
            value: CP.getJsonValue(props, prm.json, prm.key),
            onChange: function onChange(val) {
              CP.setJsonValue(props, prm.json, prm.key, val);
            },
            options: _options4
          }));

          if (prm.sub) {
            var currentValue = CP.getJsonValue(props, prm.json, prm.key);

            if (currentValue && prm.sub[currentValue]) {
              var _sub = [];
              prm.sub[currentValue].map(function (prm) {
                _sub.push(SelectClass(prm));
              });
              rtn.push(wp.element.createElement("div", {
                className: "sub"
              }, _sub));
            }
          }
        } else if (prm.values) {
          rtn.push(wp.element.createElement(CheckboxControl, {
            label: prm.label,
            onChange: function onChange() {
              CP.switchJsonValue(props, prm.json, prm.key, prm.values);
            },
            checked: CP.hasJsonValue(props, prm.json, prm.key, prm.values)
          }));

          if (prm.sub) {
            if (CP.getJsonValue(props, prm.json, prm.key)) {
              var _sub2 = [];
              prm.sub.map(function (prm) {
                _sub2.push(SelectClass(prm));
              });
              rtn.push(wp.element.createElement("div", {
                className: "sub"
              }, _sub2));
            }
          }
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
        var _prm$device = prm.device,
            device = _prm$device === void 0 ? 'pc' : _prm$device;
        var media = CP.getMediaQueryKeyForDevice(device);
        styleDatas[prm.css] = styleDatas[prm.css] || {};
        styleDatas[prm.css][media] = styleDatas[prm.css][media] || {};
        styleDatas[prm.css][media][prm.sel] = styleDatas[prm.css][media][prm.sel] || {};
        var tgt = styleDatas[prm.css][media][prm.sel];

        if (prm.input) {
          switch (prm.input) {
            case 'border':
              rtn.push(wp.element.createElement(CP.SelectPreparedImage, {
                name: "border",
                value: CP.getUrlInStyleCode(tgt['border-image']),
                color: prm.color || 0,
                onChange: function onChange(image) {
                  if (!image.conf) {
                    return;
                  }

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

            case 'pattern':
              rtn.push(wp.element.createElement(CP.SelectPreparedImage, {
                name: "pattern",
                value: CP.getUrlInStyleCode(tgt['background-image']),
                color: prm.color || 0,
                onChange: function onChange(image) {
                  if (!image.conf) {
                    return;
                  }

                  var _image$conf2 = image.conf,
                      size = _image$conf2.size,
                      width = _image$conf2.width,
                      height = _image$conf2.height,
                      repeat = _image$conf2.repeat,
                      x = _image$conf2.x,
                      y = _image$conf2.y;
                  tgt['background-image'] = 'url(' + image.url + ')';

                  if (width && height) {
                    tgt['background-size'] = width + 'px ' + height + 'px';
                  } else if (size) {
                    tgt['background-size'] = CP.translateCssVal('background-size', size);
                  } else {
                    delete tgt['background-size'];
                  }

                  if (repeat) {
                    tgt['background-repeat'] = CP.translateCssVal('background-repeat', repeat);
                  } else {
                    delete tgt['background-repeat'];
                  }

                  if (x && y) {
                    tgt['background-position'] = x + '% ' + y + '%';
                  } else {
                    delete tgt['background-position'];
                  }

                  saveCss(prm.css);
                }
              }));
              break;

            case 'frame':
              rtn.push(wp.element.createElement(CP.SelectPreparedImageSet, {
                name: "frame",
                value: CP.getUrlInStyleCode(tgt['border-image']),
                color: prm.color || 0,
                onChange: function onChange(imageset) {
                  imageset.map(function (image) {
                    if (!image.conf) {
                      return;
                    }

                    var _image$conf3 = image.conf,
                        device = _image$conf3.device,
                        slice = _image$conf3.slice,
                        width = _image$conf3.width,
                        repeat = _image$conf3.repeat;
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
          rtn.push(wp.element.createElement(CP.SelectColorClass, {
            label: "\u8272",
            set: props.set,
            attr: props.attr,
            selected: Object.keys(states).find(function (key) {
              return /^color\d+/.test(key);
            }),
            onChange: function onChange(color) {
              CP.filterFlags(states, function (key) {
                return !/^color\d+/.test(key);
              });
              states[color] = true;

              if (!items) {
                set({
                  color: color.substr(5)
                });
              }

              saveClasses();
            }
          }));
        } else if (prm === 'pattern') {
          rtn.push(wp.element.createElement(CP.SelectPatternClass, {
            label: "\u30D1\u30BF\u30FC\u30F3",
            set: props.set,
            attr: props.attr,
            selected: Object.keys(states).find(function (key) {
              return /^pattern\d+/.test(key);
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
            label: "\u8868\u793A\u6761\u4EF6",
            value: item['cond'],
            onChange: function onChange(cond) {
              return save({
                cond: cond
              });
            }
          }));
        } else if (prm === 'event') {
          wp.hooks.applyFilters('catpow.EventInputs', [], {
            item: item,
            save: save
          }).map(function (EventInput) {
            rtn.push(EventInput);
          });
        } else if (prm.input) {
          switch (prm.input) {
            case 'select':
              var _CP$parseSelections6 = CP.parseSelections(prm.values),
                  options = _CP$parseSelections6.options,
                  values = _CP$parseSelections6.values;

              rtn.push(wp.element.createElement(SelectControl, {
                label: prm.label,
                onChange: function onChange(val) {
                  save(babelHelpers.defineProperty({}, prm.key, val));

                  if (prm.effect) {
                    prm.effect(val);
                  }

                  i;
                },
                value: item[prm.key],
                options: options
              }));
              break;

            case 'buttons':
              var _CP$parseSelections7 = CP.parseSelections(prm.values),
                  options = _CP$parseSelections7.options,
                  values = _CP$parseSelections7.values;

              rtn.push(wp.element.createElement(CP.SelectButtons, {
                label: prm.label,
                onChange: function onChange(val) {
                  save(babelHelpers.defineProperty({}, prm.key, val));

                  if (prm.effect) {
                    prm.effect(val);
                  }
                },
                selected: item[prm.key],
                options: options
              }));
              break;

            case 'gridbuttons':
              var _CP$parseSelections8 = CP.parseSelections(prm.values),
                  options = _CP$parseSelections8.options,
                  values = _CP$parseSelections8.values;

              rtn.push(wp.element.createElement(CP.SelectGridButtons, {
                label: prm.label,
                onChange: function onChange(val) {
                  save(babelHelpers.defineProperty({}, prm.key, val));

                  if (prm.effect) {
                    prm.effect(val);
                  }
                },
                selected: item[prm.key],
                options: options
              }));
              break;

            case 'text':
              rtn.push(wp.element.createElement(TextControl, {
                label: prm.label,
                value: item[prm.key],
                onChange: function onChange(val) {
                  save(babelHelpers.defineProperty({}, prm.key, val));

                  if (prm.effect) {
                    prm.effect(val);
                  }
                }
              }));
              break;

            case 'textarea':
              rtn.push(wp.element.createElement(TextareaControl, {
                label: prm.label,
                value: item[prm.key],
                onChange: function onChange(val) {
                  save(babelHelpers.defineProperty({}, prm.key, val));

                  if (prm.effect) {
                    prm.effect(val);
                  }
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
                  val *= prm.coef;
                  save(babelHelpers.defineProperty({}, prm.key, val));

                  if (prm.effect) {
                    prm.effect(val);
                  }
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

                  if (prm.effect) {
                    prm.effect(val);
                  }
                }
              }));
              break;

            case 'image':
              if (prm.label) {
                rtn.push(wp.element.createElement("h5", null, prm.label));
              }

              rtn.push(wp.element.createElement(CP.SelectResponsiveImage, {
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
                rtn.push(wp.element.createElement("h5", null, prm.label));
              }

              rtn.push(wp.element.createElement(CP.SelectPictureSources, {
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
              rtn.push(wp.element.createElement(CP.SelectPositionClass, {
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
                rtn.push(wp.element.createElement("h5", null, prm.label));
              }

              rtn.push(wp.element.createElement(CP.SelectPreparedImage, {
                name: prm.input,
                value: item[prm.keys.src],
                color: prm.color || CP.getColor({
                  attr: item
                }) || 0,
                onChange: function onChange(image) {
                  var _save9;

                  save((_save9 = {}, babelHelpers.defineProperty(_save9, prm.keys.src, image.url), babelHelpers.defineProperty(_save9, prm.keys.alt, image.alt), _save9));
                }
              }));
              break;
          }

          switch (prm.input) {
            case 'select':
            case 'buttons':
            case 'gridbuttons':
              if (prm.sub && prm.sub[item[prm.key]]) {
                var _sub3 = [];
                prm.sub[item[prm.key]].map(function (prm) {
                  _sub3.push(SelectClass(prm));
                });
                rtn.push(wp.element.createElement("div", {
                  className: "sub"
                }, _sub3));
              }

              break;

            case 'bool':
              if (prm.sub && item[prm.key]) {
                var _sub4 = [];
                prm.sub.map(function (prm) {
                  _sub4.push(SelectClass(prm));
                });
                rtn.push(wp.element.createElement("div", {
                  className: "sub"
                }, _sub4));
              }

              break;
          }
        } else if (_.isObject(prm.values)) {
          var subClasses = CP.getSubClasses(prm);
          var bindClasses = CP.getBindClasses(prm);

          var _CP$parseSelections9 = CP.parseSelections(prm.values),
              options = _CP$parseSelections9.options,
              values = _CP$parseSelections9.values;

          var currentClass = values.find(function (value) {
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

            if (prm.effect) {
              prm.effect(currentClass, newClass);
            }
          };

          switch (prm.type) {
            case 'radio':
              rtn.push(wp.element.createElement(RadioControl, {
                label: prm.label,
                onChange: onChangeCB,
                selected: currentClass,
                options: options
              }));
              break;

            case 'buttons':
              rtn.push(wp.element.createElement(CP.SelectButtons, {
                label: prm.label,
                onChange: onChangeCB,
                selected: currentClass,
                options: options
              }));
              break;

            case 'gridbuttons':
              rtn.push(wp.element.createElement(CP.SelectGridButtons, {
                label: prm.label,
                onChange: onChangeCB,
                selected: currentClass,
                options: options
              }));
              break;

            default:
              rtn.push(wp.element.createElement(SelectControl, {
                label: prm.label,
                onChange: onChangeCB,
                value: currentClass,
                options: options
              }));
          }

          if (prm.sub) {
            var _currentClass = CP.getSelectiveClass(props, prm.values, prm.key);

            if (_currentClass && prm.sub[_currentClass]) {
              var _sub5 = [];

              prm.sub[_currentClass].map(function (prm) {
                _sub5.push(SelectClass(prm));
              });

              rtn.push(wp.element.createElement("div", {
                className: "sub"
              }, _sub5));
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
              var _sub6 = [];
              prm.sub.map(function (prm) {
                _sub6.push(SelectClass(prm));
              });
              rtn.push(wp.element.createElement("div", {
                className: "sub"
              }, _sub6));
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

      return wp.element.createElement(PanelBody, {
        title: props.title,
        initialOpen: props.initialOpen || false,
        icon: props.icon
      }, itemClasses.map(SelectClass));
    }

    return wp.element.createElement(PanelBody, {
      title: props.title,
      initialOpen: props.initialOpen || false,
      icon: props.icon
    }, props.selectiveClasses.map(SelectClass), props.children);
  },
  AlignClassToolbar: function AlignClassToolbar(props) {
    var aligns = ['left', 'center', 'right'];
    return wp.element.createElement(BlockAlignmentToolbar, {
      value: CP.getSelectiveClass(props, aligns),
      controls: props.aligns || aligns,
      onChange: function onChange(align) {
        CP.switchSelectiveClass(props, aligns, align, props.key);
      }
    });
  },
  VerticalAlignClassToolbar: function VerticalAlignClassToolbar(props) {
    var aligns = ['top', 'center', 'bottom'];
    return wp.element.createElement(BlockVerticalAlignmentToolbar, {
      value: CP.getSelectiveClass(props, aligns),
      controls: props.aligns || aligns,
      onChange: function onChange(align) {
        CP.switchSelectiveClass(props, aligns, align, props.key);
      }
    });
  },
  SelectColorClass: function SelectColorClass(props) {
    var label = props.label,
        help = props.help;
    return wp.element.createElement(BaseControl, {
      label: label,
      help: help
    }, wp.element.createElement(CP.SelectThemeColor, {
      onChange: props.onChange,
      selected: props.selected
    }));
  },
  SelectPatternClass: function SelectPatternClass(props) {
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

      return wp.element.createElement("li", {
        className: classes,
        onClick: function onClick() {
          return onChange(value);
        }
      }, " ");
    });
    return wp.element.createElement(BaseControl, {
      label: label,
      help: help
    }, wp.element.createElement("ul", {
      class: "selectPattern"
    }, items));
  },
  SelectPositionClass: function SelectPositionClass(props) {
    var rows = [['topLeft', 'top', 'topRight'], ['left', 'center', 'right'], ['bottomLeft', 'bottom', 'bottomRight']];

    var values = _.flatten(rows);

    var label = props.label,
        help = props.help,
        itemsKey = props.itemsKey,
        index = props.index,
        disable = props.disable;
    var value = itemsKey ? CP.getItemSelectiveClass(props, values) : CP.getSelectiveClass(props, values);
    return wp.element.createElement(BaseControl, {
      label: label,
      help: help
    }, wp.element.createElement("table", {
      className: "selectPosition"
    }, wp.element.createElement("tbody", null, rows.map(function (cols) {
      return wp.element.createElement("tr", null, cols.map(function (col) {
        var isChecked = value == col;

        if (disable && disable.includes(col)) {
          return wp.element.createElement("td", {
            className: "disable"
          }, " ");
        }

        return wp.element.createElement("td", {
          className: isChecked ? "active" : "",
          onClick: function onClick() {
            if (itemsKey) {
              CP.switchItemSelectiveClass(props, values, col, props.key);
            } else {
              CP.switchSelectiveClass(props, values, col, props.key);
            }
          }
        }, " ");
      }));
    }))));
  },
  ImporterCSVPanel: function ImporterCSVPanel(props) {
    var reader = new FileReader();

    reader.onload = function (e) {
      props.callback(CP.parseCSV(e.target.result));
    };

    return wp.element.createElement(PanelBody, {
      title: props.title,
      initialOpen: false,
      icon: props.icon
    }, wp.element.createElement(FormFileUpload, {
      label: "CSV",
      accept: "text/csv",
      onChange: function onChange(e) {
        reader.readAsText(e.target.files[0]);
      }
    }));
  },
  SelectBreakPointToolbar: function SelectBreakPointToolbar(props) {
    return wp.element.createElement(Toolbar, {
      controls: props.breakpoints.map(function (bp) {
        var title = bp == "0" ? 'ー' : bp;
        return {
          icon: wp.element.createElement("svg", {
            viewBox: "0 0 100 100"
          }, wp.element.createElement("text", {
            style: {
              "font-size": "50px"
            },
            x: 50,
            y: 50,
            textAnchor: "middle",
            dominantBaseline: "middle"
          }, title)),
          isActive: props.value == bp,
          onClick: function onClick() {
            return props.onChange(bp);
          }
        };
      })
    });
  },
  SelectModeToolbar: function SelectModeToolbar(props) {
    var set = props.set,
        attr = props.attr,
        _props$modes = props.modes,
        modes = _props$modes === void 0 ? ['EditMode', 'AltMode'] : _props$modes;
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
    return wp.element.createElement(BlockControls, null, modes.map(function (mode) {
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
    }));
  },
  SelectDeviceToolbar: function SelectDeviceToolbar(props) {
    var set = props.set,
        attr = props.attr,
        _props$devices = props.devices,
        devices = _props$devices === void 0 ? ['sp', 'pc'] : _props$devices;
    return wp.element.createElement(BlockControls, null, devices.map(function (device) {
      return wp.element.createElement(Toolbar, {
        controls: [{
          icon: CP.devices[device].icon,
          title: device,
          isActive: attr.device === device,
          onClick: function onClick() {
            if (attr.device === device) {
              set({
                device: null
              });
            } else {
              set({
                device: device
              });
            }
          }
        }]
      });
    }));
  },
  EditItemsTable: function EditItemsTable(props) {
    var set = props.set,
        attr = props.attr,
        _props$itemsKey = props.itemsKey,
        itemsKey = _props$itemsKey === void 0 ? 'items' : _props$itemsKey,
        columns = props.columns,
        isTemplate = props.isTemplate;
    var items = attr[itemsKey] || [];

    var save = function save() {
      set(babelHelpers.defineProperty({}, itemsKey, JSON.parse(JSON.stringify(items))));
    };

    return wp.element.createElement("table", {
      className: "editItemsTable"
    }, wp.element.createElement("thead", null, wp.element.createElement("tr", null, columns.map(function (col) {
      return !('cond' in col) || col.cond ? wp.element.createElement("th", null, col.label || col.key) : false;
    }), wp.element.createElement("th", null))), wp.element.createElement("tbody", null, items.map(function (item, index) {
      var propsForControl = {
        tag: 'tr',
        set: set,
        itemsKey: itemsKey,
        items: items,
        index: index
      };
      return wp.element.createElement("tr", {
        onClick: function onClick(e) {
          set({
            currentItemIndex: index
          });
        }
      }, columns.map(function (col) {
        if ('cond' in col && !col.cond) {
          return false;
        }

        switch (col.type) {
          case 'text':
            return wp.element.createElement("td", null, wp.element.createElement(RichText, {
              value: item[col.key],
              onChange: function onChange(value) {
                item[col.key] = value;
                save();
              }
            }));

          case 'image':
            return wp.element.createElement("td", null, wp.element.createElement(CP.SelectResponsiveImage, {
              attr: attr,
              set: set,
              keys: _objectSpread({
                items: itemsKey,
                src: col.key
              }, col.keys),
              index: index,
              size: col.size || 'vga',
              isTemplate: isTemplate
            }));

          case 'picture':
            return wp.element.createElement("td", null, wp.element.createElement(CP.SelectPictureSources, {
              index: index,
              attr: attr,
              set: set,
              keys: _objectSpread({
                items: itemsKey
              }, col.keys),
              sizes: col.sizes,
              devices: col.devices,
              isTemplate: isTemplate
            }));

          case 'items':
            col.columns.map(function (subCol) {
              if (subCol.keys) {
                subCol.keys.subItems = col.key;
              }
            });
            return wp.element.createElement("td", null, wp.element.createElement(CP.EditItemsTable, {
              set: function set() {
                save();
              },
              attr: item,
              itemsKey: col.itemsKey,
              columns: col.columns,
              isTemplate: isTemplate
            }));
        }
      }), wp.element.createElement("td", null, wp.element.createElement("div", {
        className: "itemControl"
      }, wp.element.createElement("div", {
        className: "btn delete",
        onClick: function onClick(e) {
          return CP.deleteItem(propsForControl);
        }
      }), wp.element.createElement("div", {
        className: "btn clone",
        onClick: function onClick(e) {
          return CP.cloneItem(propsForControl);
        }
      }), wp.element.createElement("div", {
        className: "btn up",
        onClick: function onClick(e) {
          return CP.upItem(propsForControl);
        }
      }), wp.element.createElement("div", {
        className: "btn down",
        onClick: function onClick(e) {
          return CP.downItem(propsForControl);
        }
      }))));
    })));
  },
  DummyImage: function DummyImage(_ref22) {
    var text = _ref22.text;
    return wp.element.createElement("img", {
      src: cp.plugins_url + '/catpow/callee/dummy_image.php?text=' + text
    });
  },
  DataStructure: function DataStructure(props) {
    return wp.element.createElement("ul", {
      className: "dataStructure"
    }, props.children);
  },
  DataStructureItem: function DataStructureItem(props) {
    var useState = wp.element.useState;

    var _useState3 = useState(false),
        _useState4 = babelHelpers.slicedToArray(_useState3, 2),
        open = _useState4[0],
        setOpen = _useState4[1];

    return wp.element.createElement("li", {
      className: "item " + (props.children ? 'hasChildren ' + (open ? 'open' : 'close') : 'noChildren')
    }, wp.element.createElement("h5", {
      className: "title",
      onClick: function onClick() {
        return setOpen(!open);
      }
    }, props.title, undefined !== props.name && wp.element.createElement("span", {
      className: "name"
    }, props.name)), !!open && !!props.children && wp.element.createElement("div", {
      className: "children"
    }, props.children));
  },
  EventInputCards: function EventInputCards(props) {
    var title = props.title,
        onChange = props.onChange;
    var _wp$element3 = wp.element,
        useState = _wp$element3.useState,
        useReducer = _wp$element3.useReducer,
        useCallback = _wp$element3.useCallback,
        useEffect = _wp$element3.useEffect,
        useMemo = _wp$element3.useMemo;
    var _wp$components4 = wp.components,
        Card = _wp$components4.Card,
        CardHeader = _wp$components4.CardHeader,
        CardBody = _wp$components4.CardBody,
        Flex = _wp$components4.Flex,
        FlexItem = _wp$components4.FlexItem,
        FlexBlock = _wp$components4.FlexBlock,
        Icon = _wp$components4.Icon;
    var _props$processer = props.processer,
        processerId = _props$processer.processerId,
        eventTypes = _props$processer.eventTypes,
        parseEventValue = _props$processer.parseEventValue,
        createEventValue = _props$processer.createEventValue,
        eventParams = _props$processer.eventParams;
    var reducer = useCallback(function (state, action) {
      switch (action.type) {
        case 'UPDATE':
          {
            state.events[action.index] = _objectSpread(_objectSpread({}, state.events[action.index]), action.event);
            var value = createEventValue(state.events);
            onChange(value);
            return _objectSpread(_objectSpread({}, state), {}, {
              value: value
            });
          }

        case 'CLONE':
          {
            state.events.splice(action.index, 0, _objectSpread({}, state.events[action.index]));

            var _value = createEventValue(state.events);

            onChange(_value);
            return _objectSpread(_objectSpread({}, state), {}, {
              value: _value
            });
          }

        case 'REMOVE':
          {
            state.events.splice(action.index, 1);

            var _value2 = createEventValue(state.events);

            onChange(_value2);
            return _objectSpread(_objectSpread({}, state), {}, {
              value: _value2
            });
          }
      }

      return state;
    }, []);

    var _useReducer = useReducer(reducer, {
      value: props.value,
      events: parseEventValue(props.value)
    }),
        _useReducer2 = babelHelpers.slicedToArray(_useReducer, 2),
        state = _useReducer2[0],
        dispatch = _useReducer2[1];

    var eventParamsWithoutLabel = useMemo(function () {
      var eventParamsWithoutLabel = {};
      Object.keys(eventParams).map(function (name) {
        var _eventParams$name = eventParams[name],
            label = _eventParams$name.label,
            otherParams = babelHelpers.objectWithoutProperties(_eventParams$name, _excluded5);
        eventParamsWithoutLabel[name] = otherParams;
      });
      return eventParamsWithoutLabel;
    }, [eventParams]);
    var EventInputCard = useCallback(function (props) {
      var event = props.event,
          index = props.index;
      var activeEventParamNames = useMemo(function () {
        if (eventTypes && event.eventType && eventTypes[event.eventType]) {
          return Object.keys(eventParams).filter(function (paramName) {
            return eventParams[paramName].common || eventTypes[event.eventType].options.indexOf(paramName) >= 0;
          });
        }

        return Object.keys(eventParams).filter(function (paramName) {
          return !eventParams[paramName].limited;
        });
      }, [eventTypes, eventParams, event.eventType]);
      return wp.element.createElement(Card, {
        className: "EventInputCard"
      }, wp.element.createElement(CardHeader, {
        className: "EventInputCard__header"
      }, wp.element.createElement(Flex, null, wp.element.createElement(FlexBlock, null, title), wp.element.createElement(FlexItem, null, wp.element.createElement(Icon, {
        icon: "insert",
        onClick: function onClick() {
          dispatch({
            type: 'CLONE',
            index: index
          });
        }
      }), state.events.length > 1 && wp.element.createElement(Icon, {
        icon: "remove",
        onClick: function onClick() {
          dispatch({
            type: 'REMOVE',
            index: index
          });
        }
      })))), wp.element.createElement(CardBody, {
        className: "EventInputCard__body"
      }, eventTypes && wp.element.createElement("div", {
        className: "EventInputCard__item"
      }, wp.element.createElement("div", {
        className: "EventInputCard__item__inputs"
      }, wp.element.createElement(TextControl, {
        value: event.eventType,
        onChange: function onChange(val) {
          dispatch({
            type: 'UPDATE',
            event: {
              eventType: val
            },
            index: index
          });
        },
        list: CP.getDataListId(processerId + 'EventTypes', Object.keys(eventTypes))
      }))), wp.element.createElement("div", {
        className: "EventInputCard__item"
      }, wp.element.createElement("div", {
        className: "EventInputCard__item__pref"
      }, "@"), wp.element.createElement("div", {
        className: "EventInputCard__item__inputs"
      }, wp.element.createElement(TextControl, {
        value: event.event,
        onChange: function onChange(val) {
          dispatch({
            type: 'UPDATE',
            event: {
              event: val
            },
            index: index
          });
        },
        list: CP.getDataListId(props.eventList || 'mouseEvent')
      }))), activeEventParamNames.map(function (paramName) {
        var param = eventParams[paramName];
        return wp.element.createElement("div", {
          className: "EventInputCard__item is-type-" + (param.type || 'text'),
          key: paramName
        }, wp.element.createElement("div", {
          className: "EventInputCard__item__title"
        }, param.label), wp.element.createElement("div", {
          className: "EventInputCard__item__inputs"
        }, wp.element.createElement(CP.DynamicInput, {
          param: eventParamsWithoutLabel[paramName],
          value: event[paramName],
          onChange: function onChange(val) {
            dispatch({
              type: 'UPDATE',
              event: babelHelpers.defineProperty({}, paramName, val),
              index: index
            });
          }
        })));
      })));
    }, []);
    return wp.element.createElement(BaseControl, null, state.events.length > 0 ? state.events.map(function (event, index) {
      return wp.element.createElement(EventInputCard, {
        event: event,
        index: index
      });
    }) : wp.element.createElement(EventInputCard, {
      event: {},
      index: 0
    }));
  }
};
CP.example = {
  attributes: {
    title: [CP.dummyText.title],
    headerText: [CP.dummyText.title],
    footerText: [CP.dummyText.footer],
    read: [CP.dummyText.lead],
    text: [CP.dummyText.text]
  },
  innerBlocks: [{
    name: 'core/paragraph',
    attributes: {
      content: CP.dummyText.text
    }
  }]
};
