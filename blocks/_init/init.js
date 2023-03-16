(() => {
  // ../blocks/_init/init/filter.jsx
  wp.blocks.registerBlockStyle("core/heading", { name: "header", label: "header" });
  wp.blocks.registerBlockStyle("core/heading", { name: "headline", label: "headline" });
  wp.blocks.registerBlockStyle("core/heading", { name: "catch", label: "catch" });
  wp.blocks.registerBlockStyle("core/paragraph", { name: "message", label: "message" });
  wp.blocks.registerBlockStyle("core/paragraph", { name: "caption", label: "caption" });
  wp.blocks.registerBlockStyle("core/list", { name: "annotation", label: "annotation" });
  wp.blocks.registerBlockStyle("core/list", { name: "circle", label: "circle" });
  wp.blocks.registerBlockStyle("core/list", { name: "caret", label: "caret" });
  wp.blocks.registerBlockStyle("core/list", { name: "square", label: "square" });
  wp.blocks.registerBlockStyle("core/list", { name: "star", label: "star" });
  wp.blocks.registerBlockStyle("core/list", { name: "check", label: "check" });
  wp.blocks.registerBlockStyle("core/list", { name: "alert", label: "alert" });
  wp.blocks.registerBlockStyle("core/list", { name: "caution", label: "caution" });
  wp.blocks.registerBlockStyle("core/columns", { name: "regular", label: "regular" });
  wp.blocks.registerBlockStyle("core/columns", { name: "panel", label: "panel" });
  wp.blocks.registerBlockStyle("core/image", { name: "snap", label: "snap" });
  wp.blocks.registerBlockStyle("core/image", { name: "circle", label: "circle" });
  wp.blocks.registerBlockStyle("core/image", { name: "cover", label: "cover" });
  wp.blocks.registerBlockStyle("core/video", { name: "thumbnail", label: "thumbnail" });
  wp.blocks.registerBlockStyle("core/video", { name: "medium", label: "medium" });
  wp.blocks.registerBlockStyle("core/video", { name: "large", label: "large" });
  wp.blocks.registerBlockStyle("core/video", { name: "cover", label: "cover" });
  wp.blocks.registerBlockStyle("core/media-text", { name: "snap", label: "snap" });
  wp.blocks.registerBlockStyle("core/media-text", { name: "panel", label: "panel" });
  wp.blocks.registerBlockStyle("core/code", { name: "js", label: "js" });
  wp.blocks.registerBlockStyle("core/code", { name: "css", label: "css" });
  wp.blocks.registerBlockStyle("core/code", { name: "scss", label: "scss" });
  wp.blocks.registerBlockStyle("core/code", { name: "php", label: "php" });
  wp.blocks.registerBlockStyle("core/code", { name: "html", label: "html" });
  wp.hooks.addFilter(
    "blocks.registerBlockType",
    "catpow/editor",
    function(settings, name) {
      switch (name) {
        case "core/heading":
          settings.attributes.className.default = "is-style-headline";
          break;
        case "core/paragraph":
          settings.attributes.fontSize.default = "regular";
          break;
        case "core/list":
          settings.attributes.className.default = "is-style-check";
          break;
        case "core/columns":
          settings.attributes.className.default = "is-style-panel";
          break;
      }
      return settings;
    }
  );
  wp.hooks.addFilter(
    "editor.BlockEdit",
    "catpow/editor",
    wp.compose.createHigherOrderComponent(function(BlockEdit) {
      return function(props) {
        var content = wp.element.createElement(BlockEdit, props);
        if ((props.name === "core/columns" || props.name === "core/media-text") && typeof props.insertBlocksAfter === "undefined") {
          return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", null));
        }
        return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, content);
      };
    }, "allowColumnStyle")
  );

  // ../blocks/_init/init/CP.jsx
  var CP = {
    filters: {},
    cache: {},
    config: {},
    listedConvertibles: ["catpow/listed", "catpow/flow", "catpow/faq", "catpow/ranking", "catpow/dialog", "catpow/sphere", "catpow/slider", "catpow/banners", "catpow/lightbox", "catpow/panes", "catpow/slidablemenu"],
    tableConvertibles: ["catpow/simpletable", "catpow/datatable", "catpow/layouttable"],
    dummyText: {
      title: "\u543E\u8F29\u306F\u732B\u3067\u3042\u308B\u3002",
      lead: "\u540D\u524D\u306F\u307E\u3060\u306A\u3044\u3002\u3069\u3053\u3067\u751F\u308C\u305F\u304B\u9813\u3068\u898B\u5F53\u304C\u3064\u304B\u306C\u3002\u4F55\u3067\u3082\u8584\u6697\u3044\u3058\u3081\u3058\u3081\u3057\u305F\u6240\u3067\u30CB\u30E3\u30FC\u30CB\u30E3\u30FC\u6CE3\u3044\u3066\u3044\u305F\u4E8B\u3060\u3051\u306F\u8A18\u61B6\u3057\u3066\u3044\u308B\u3002",
      text: "\u540D\u524D\u306F\u307E\u3060\u306A\u3044\u3002\u3069\u3053\u3067\u751F\u308C\u305F\u304B\u9813\u3068\u898B\u5F53\u304C\u3064\u304B\u306C\u3002\u4F55\u3067\u3082\u8584\u6697\u3044\u3058\u3081\u3058\u3081\u3057\u305F\u6240\u3067\u30CB\u30E3\u30FC\u30CB\u30E3\u30FC\u6CE3\u3044\u3066\u3044\u305F\u4E8B\u3060\u3051\u306F\u8A18\u61B6\u3057\u3066\u3044\u308B\u3002\u543E\u8F29\u306F\u3053\u3053\u3067\u59CB\u3081\u3066\u4EBA\u9593\u3068\u3044\u3046\u3082\u306E\u3092\u898B\u305F\u3002\u3057\u304B\u3082\u3042\u3068\u3067\u805E\u304F\u3068\u305D\u308C\u306F\u66F8\u751F\u3068\u3044\u3046\u4EBA\u9593\u4E2D\u3067\u4E00\u756A\u7370\u60AA\u306A\u7A2E\u65CF\u3067\u3042\u3063\u305F\u305D\u3046\u3060\u3002\u3053\u306E\u66F8\u751F\u3068\u3044\u3046\u306E\u306F\u6642\u3005\u6211\u3005\u3092\u6355\u3048\u3066\u716E\u3066\u98DF\u3046\u3068\u3044\u3046\u8A71\u3067\u3042\u308B\u3002\u3057\u304B\u3057\u305D\u306E\u5F53\u6642\u306F\u4F55\u3068\u3044\u3046\u8003\u3082\u306A\u304B\u3063\u305F\u304B\u3089\u5225\u6BB5\u6050\u3057\u3044\u3068\u3082\u601D\u308F\u306A\u304B\u3063\u305F\u3002",
      footer: "\u300E\u543E\u8F29\u306F\u732B\u3067\u3042\u308B\u300F\uFF08\u308F\u304C\u306F\u3044\u306F\u306D\u3053\u3067\u3042\u308B\uFF09\u3000\u590F\u76EE\u6F31\u77F3\u3000\u8457"
    },
    selectImage: (keys, set, size, devices) => {
      if (CP.uploder === void 0) {
        CP.uploader = wp.media({
          title: "Select Image",
          button: { text: "Select" },
          multiple: false
        });
      }
      CP.uploader.off("select").on("select", () => {
        let image = CP.uploader.state().get("selection").first().toJSON();
        let data = {};
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
          devices = devices || ["sp"];
          data[keys.sources] = devices.map((device) => {
            const sizeData = CP.devices[device];
            return { srcset: image.sizes[sizeData.media_size].url, device };
          });
        }
        if (keys.srcset && image.sizes) {
          devices = devices || ["sp", "pc"];
          data[keys.srcset] = "";
          devices.forEach((device) => {
            const sizeData = CP.devices[device];
            data[keys.srcset] += image.sizes[sizeData.media_size].url + sizeData.rep;
          });
        }
        if (keys.data) {
          data[keys.data] = image;
        }
        set(data);
      }).open();
    },
    imageSrcOrDummy: (src) => {
      if (!src) {
        return wpinfo.theme_url + "/images/dummy.jpg";
      }
      if (src[0] == "[") {
        return wpinfo.plugins_url + "/catpow/callee/dummy_image.php?text=" + src;
      }
      return src;
    },
    parseCSV: (csv) => {
      let tmp = [];
      csv = csv.replace(/("[^"]*")+/g, (match) => {
        tmp.push(match.slice(1, -1).replace(/""/g, '"'));
        return "[TMP]";
      });
      return csv.split("\r\n").map((row) => {
        return row.split(",").map((val) => val === "[TMP]" ? tmp.shift() : val);
      });
    },
    switchNumberClass: ({ set, attr }, label, value) => {
      let classArray = (attr.classes || "").split(" ");
      let i = classArray.findIndex((cls) => cls.substr(0, label.length) === label);
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
    },
    getNumberClass: ({ attr }, label) => {
      let value = (attr.classes || "").split(" ").find((cls) => cls.substr(0, label.length) === label);
      if (!value) {
        return 0;
      }
      return parseInt(value.substr(label.length));
    },
    switchColor: (props, value) => {
      CP.switchNumberClass(props, "color", value);
    },
    getColor: (props) => {
      return CP.getNumberClass(props, "color");
    },
    switchPattern: (props, value) => {
      CP.switchNumberClass(props, "pattern", value);
    },
    getPattern: (props) => {
      return CP.getNumberClass(props, "pattern");
    },
    switchSelectiveClass: ({ set, attr }, values, value, key) => {
      if (key === void 0) {
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
    },
    getSelectiveClass: ({ attr }, values, key) => {
      if (key === void 0) {
        key = "classes";
      }
      if (attr[key] === void 0) {
        attr[key] = "";
      }
      let classArray = attr[key].split(" ");
      if (!Array.isArray(values) && _.isObject(values)) {
        values = Object.keys(values);
      }
      return _.intersection(classArray, values).shift();
    },
    getSubClasses: (prm) => {
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
    },
    getAllSubClasses: (prms) => {
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
    },
    getBindClasses: (prm) => {
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
    },
    toggleClass: ({ attr, set }, value, key) => {
      if (key === void 0) {
        key = "classes";
      }
      if (attr[key] === void 0) {
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
    },
    hasClass: ({ attr }, value, key) => {
      if (key === void 0) {
        key = "classes";
      }
      if (attr[key] === void 0) {
        attr[key] = "";
      }
      return attr[key].split(" ").indexOf(value) !== -1;
    },
    selectPrevItem: (tag) => {
      window.getSelection().anchorNode.parentNode.closest(tag).previousElementSibling.querySelector("[contentEditable]").focus();
    },
    selectNextItem: (tag) => {
      window.getSelection().anchorNode.parentNode.closest(tag).nextElementSibling.querySelector("[contentEditable]").focus();
    },
    saveItem: ({ items, itemsKey, set }) => {
      set({ [itemsKey || "items"]: JSON.parse(JSON.stringify(items)) });
    },
    deleteItem: (props) => {
      var { items, index } = props;
      items.splice(index, 1);
      CP.saveItem(props);
    },
    cloneItem: (props) => {
      var { tag, items, index } = props;
      items.splice(index, 0, JSON.parse(JSON.stringify(items[index])));
      CP.saveItem(props);
      CP.selectNextItem(tag);
    },
    upItem: (props) => {
      var { tag, items, index } = props;
      if (!items[index - 1])
        return false;
      items.splice(index - 1, 2, items[index], items[index - 1]);
      CP.saveItem(props);
    },
    downItem: (props) => {
      var { tag, items, index } = props;
      if (!items[index + 1])
        return false;
      items.splice(index, 2, items[index + 1], items[index]);
      CP.saveItem(props);
    },
    switchItemColor: ({ items, index, set }, color, itemsKey) => {
      if (itemsKey === void 0) {
        itemsKey = "items";
      }
      let classArray = (items[index].classes || "").split(" ");
      let i = classArray.findIndex((cls) => cls.substr(0, 5) === "color");
      if (i === -1) {
        if (color) {
          classArray.push("color" + color);
        }
      } else {
        if (color) {
          classArray.splice(i, 1, "color" + color);
        } else {
          classArray.splice(i, 1);
        }
      }
      items[index].classes = classArray.join(" ");
      set({ [itemsKey]: JSON.parse(JSON.stringify(items)) });
    },
    getItemColor: ({ items, index }) => {
      let c = (items[index].classes || "").split(" ").find((cls) => cls.substr(0, 5) === "color");
      if (!c) {
        return 0;
      }
      return parseInt(c.substr(5));
    },
    switchItemPattern: ({ items, index, set }, pattern, itemsKey) => {
      if (itemsKey === void 0) {
        itemsKey = "items";
      }
      let classArray = (items[index].classes || "").split(" ");
      let i = classArray.findIndex((cls) => cls.substr(0, 7) === "pattern");
      if (i === -1) {
        if (pattern) {
          classArray.push("pattern" + pattern);
        }
      } else {
        if (pattern) {
          classArray.splice(i, 1, "pattern" + pattern);
        } else {
          classArray.splice(i, 1);
        }
      }
      items[index].classes = classArray.join(" ");
      set({ [itemsKey]: JSON.parse(JSON.stringify(items)) });
    },
    getItemPattern: ({ items, index }) => {
      let p = (items[index].classes || "").split(" ").find((cls) => cls.substr(0, 7) === "pattern");
      if (!p) {
        return 0;
      }
      return parseInt(p.substr(7));
    },
    switchItemSelectiveClass: ({ items, index, set }, values, value, itemsKey) => {
      if (itemsKey === void 0) {
        itemsKey = "items";
      }
      let classArray = (items[index].classes || "").split(" ");
      if (!Array.isArray(values) && _.isObject(values)) {
        values = Object.keys(values);
      }
      classArray = _.difference(classArray, values);
      if (Array.isArray(value)) {
        classArray = classArray.concat(value);
      } else {
        classArray.push(value);
      }
      items[index].classes = classArray.join(" ");
      set({ [itemsKey]: JSON.parse(JSON.stringify(items)) });
    },
    getItemSelectiveClass: ({ items, index }, values) => {
      if (!items[index].classes) {
        return false;
      }
      let classArray = (items[index].classes || "").split(" ");
      if (!Array.isArray(values) && _.isObject(values)) {
        values = Object.keys(values);
      }
      return _.intersection(classArray, values).shift();
    },
    toggleItemClass: ({ items, index, set }, value, itemsKey) => {
      if (itemsKey === void 0) {
        itemsKey = "items";
      }
      let classArray = (items[index].classes || "").split(" ");
      let i = classArray.indexOf(value);
      if (i === -1) {
        classArray.push(value);
      } else {
        classArray.splice(i, 1);
      }
      items[index].classes = classArray.join(" ");
      set({ [itemsKey]: JSON.parse(JSON.stringify(items)) });
    },
    hasItemClass: ({ items, index }, value) => {
      let classArray = (items[index].classes || "").split(" ");
      return classArray.indexOf(value) !== -1;
    },
    getJsonValue: ({ attr }, json, key) => {
      if (!attr[json]) {
        return null;
      }
      return JSON.parse(attr[json])[key];
    },
    hasJsonValue: (prop, json, key, value) => {
      let values = CP.getJsonValue(prop, json, key);
      if (!values) {
        return false;
      }
      return values.indexOf(value) !== -1;
    },
    setJsonValue: ({ attr, set }, json, key, value) => {
      let data = {};
      let jsonData = JSON.parse(attr[json]);
      jsonData[key] = value;
      data[json] = JSON.stringify(jsonData);
      set(data);
    },
    switchJsonValue: (prop, json, key, value) => {
      let values = CP.getJsonValue(prop, json, key);
      if (!values) {
        values = [];
      }
      let i = values.indexOf(value);
      if (i === -1) {
        values.push(value);
      } else {
        values.splice(i, 1);
      }
      CP.setJsonValue(prop, json, key, values);
    },
    parseStyleString: (css) => {
      if (css instanceof Object) {
        return css;
      }
      if (!css) {
        return {};
      }
      var obj = {};
      css.replace("&amp;", "&").split(";").forEach((pair) => {
        const match = pair.match(/^([^:]+?):(.+)$/);
        if (!match) {
          return;
        }
        obj[match[1]] = match[2];
      });
      return obj;
    },
    createStyleString: (data) => {
      if (!data) {
        return "";
      }
      return Object.keys(data).map((key) => {
        return key + ":" + data[key] + ";";
      }).join("");
    },
    parseStyleCode: (code) => {
      let rtn = {};
      for (const match of code.matchAll(/(\S.+?){([^}]+)}/g)) {
        rtn[match[1]] = CP.parseStyleString(match[2]);
      }
      return rtn;
    },
    createStyleCode: (data) => {
      if (!data) {
        return "";
      }
      return Object.keys(data).map((sel) => {
        return sel + "{" + CP.createStyleString(data[sel]) + "}";
      }).join("");
    },
    parseStyleCodeWithMediaQuery: (code) => {
      if (!code) {
        return {};
      }
      var rtn = {};
      const reg = /@media\s*\((.+?)\)\s*{([^}]+})\s*}/;
      const defaultCode = code.replace(new RegExp(reg, "g"), (str) => {
        const matches = str.match(reg);
        rtn[matches[1]] = CP.parseStyleCode(matches[2]);
        return "";
      });
      rtn["default"] = CP.parseStyleCode(defaultCode);
      return rtn;
    },
    createStyleCodeWithMediaQuery: (data) => {
      var rtn = "";
      return Object.keys(data).map((media) => {
        if (media === "default") {
          return { p: -1e4, media };
        }
        const matches = media.match(/(min|max)\-width:(\d+)px/);
        return { p: parseInt(matches[2]) * { min: 1, max: -1 }[matches[1]], media };
      }).sort((a, b) => a.p - b.p).map((d) => d.media).map((media) => {
        if (media === "default") {
          return CP.createStyleCode(data[media]);
        }
        return "@media(" + media + "){" + CP.createStyleCode(data[media]) + "}";
      }).join("");
    },
    createGridStyleCode: (sel, bnd) => {
      return sel + "{" + CP.createStyleString(CP.createGridStyleCodeData(bnd)) + "}";
    },
    createGridStyleCodeData: (bnd) => {
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
    createGridItemStyleCode: (sel, bnd) => {
      return sel + "{" + CP.createStyleString(CP.createGridItemStyleCodeData(bnd)) + "}";
    },
    createGridItemStyleCodeData: (bnd) => {
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
    getUrlInStyleCode: (code) => {
      if (!code || code.indexOf("url(") === -1) {
        return false;
      }
      const m = code.match(/url\((.+?)\)/);
      return m ? m[1] : "";
    },
    parseGradientStyleValue: (gradient) => {
      const match = gradient.match(/^(linear|radial)\-gradient\((\d+deg),(.+)\)$/);
      return {
        type: match[1],
        angle: match[2],
        colors: match[3].match(/rgba?\([\d,]+?\) \d+%/g).map((color) => {
          const match2 = color.match(/((rgba?)\((\d+),(\d+),(\d+)(,(\d+))?\)) (\d+%)/);
          return {
            color: match2[1],
            type: match2[2],
            r: match2[3],
            g: match2[4],
            b: match2[5],
            a: match2[7] === void 0 ? 1 : match2[7],
            position: match2[8]
          };
        })
      };
    },
    /*flags*/
    testFlags: (cond, flags) => cond & flags === cond,
    filterArrayWithFlags: (array, flags) => array.filter((c, i) => flags & 1 << i),
    wordsToFlags: (words) => {
      var rtn = {};
      if (void 0 === words) {
        return {};
      }
      words.split(" ").forEach((word) => {
        rtn[word] = true;
      });
      return rtn;
    },
    flagsToWords: (flags) => {
      if (void 0 === flags) {
        return "";
      }
      return Object.keys(flags).filter((word) => flags[word]).join(" ");
    },
    filterFlags: (flags, callback) => {
      Object.keys(flags).forEach((key) => {
        if (!callback(key)) {
          delete flags[key];
        }
      });
      return flags;
    },
    /*proxy*/
    finderProxy: (obj) => new Proxy(obj, CP.finderProxyHandler),
    finderProxyHandler: {
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
          return new Proxy(rtn, CP.finderProxyHandler);
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
          prop = obj.findIndex((item) => item === prop || typeof item === "object" && item.hasOwnProperty("name") && item.name === prop);
          if (prop < 0) {
            return;
          }
        }
        delete obj[prop];
      }
    },
    parseSelections: (sels) => {
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
    },
    createBlocks: (blocks) => {
      return blocks.map((block) => {
        if (block[2]) {
          block[2] = CP.createBlocks(block[2]);
        }
        return wp.blocks.createBlock(...block);
      });
    },
    devices: Catpow.util.devices,
    getImageSizesForDevices: (devices) => {
      return Object.keys(CP.devices).filter((device) => devices.includes(device)).map((device) => CP.devices[device].sizes).join(",");
    },
    getPictureSoucesAttributes: (selector) => {
      return {
        source: "query",
        selector: (selector || "picture") + " source",
        query: {
          srcset: { source: "attribute", attribute: "srcset" },
          device: { source: "attribute", "attribute": "data-device" }
        }
      };
    },
    getPictureSoucesAttributesForDevices: (devices, selector, image) => {
      let attr = CP.getPictureSoucesAttributes(selector);
      attr.default = CP.getPictureSoucesAttributesDefaultValueForDevices(devices, image);
      return attr;
    },
    getPictureSoucesAttributesDefaultValueForDevices: (devices, image) => {
      return devices.map((device) => ({ srcset: wpinfo.theme_url + "/images/" + (image || "dummy.jpg"), device }));
    },
    getMediaQueryKeyForDevice: (device) => {
      if (!CP.devices[device].media_query) {
        return "default";
      }
      return CP.devices[device].media_query.slice(1, -1);
    },
    translateCssVal: (type, val) => {
      switch (type) {
        case "background-size":
          switch (val) {
            case "c":
              return "cover";
            case "i":
              return "contain";
            case "f":
              return "100% 100%";
            default:
              return val;
          }
        case "background-repeat":
          switch (val) {
            case "n":
              return "no-repeat";
            case "x":
            case "y":
              return "repeat-" + val;
            default:
              return val;
          }
      }
    },
    selectiveClassesPreset: {
      isTemplate: {
        label: "\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8",
        values: "isTemplate",
        sub: [
          { input: "bool", label: "\u30EB\u30FC\u30D7", key: "doLoop", sub: [
            { label: "content path", input: "text", key: "content_path" },
            { label: "query", input: "textarea", key: "query" },
            { label: "\u30D7\u30EC\u30D3\u30E5\u30FC\u30EB\u30FC\u30D7\u6570", input: "range", key: "loopCount", min: 1, max: 16 }
          ] }
        ]
      }
    },
    /*datalist*/
    getDataListId(name, values) {
      const id = "datalist-" + name;
      if (!document.getElementById(id)) {
        if (!values) {
          if (!CP.dataListPresets.hasOwnProperty(name)) {
            return null;
          }
          values = CP.dataListPresets[name];
        }
        const datalist = document.createElement("datalist");
        datalist.id = id;
        values.forEach((value) => {
          const option = document.createElement("option");
          option.value = value;
          datalist.appendChild(option);
        });
        document.body.appendChild(datalist);
      }
      return id;
    },
    dataListPresets: {
      currency: ["AUD", "CAD", "CNY", "DKK", "HKD", "INR", "IDR", "JPY", "KRW", "MYR", "NOK", "PHP", "RUB", "SGD", "VND", "SEK", "CHF", "THB", "GBP", "USD", "TWD", "EUR", "BRL"],
      mouseEvent: [
        "click",
        "dblclick",
        "mouseup",
        "mousedown",
        "mouseenter",
        "mouseleave",
        "mouseover",
        "mouseout",
        "contextmenu"
      ],
      playerEvent: [
        "canplay",
        "canplaythrough",
        "complete",
        "durationchange",
        "emptied",
        "ended",
        "loadeddata",
        "loadedmetadata",
        "pause",
        "play",
        "playing",
        "progress",
        "ratechange",
        "seeked",
        "seeking",
        "stalled",
        "suspend",
        "timeupdate",
        "volumechange",
        "waiting"
      ]
    },
    /*richtext helper*/
    getSelecedFormatElement: () => {
      const sel = window.getSelection();
      if (!sel.rangeCount)
        return null;
      const con = sel.getRangeAt(0).startContainer;
      return con.nextElementSibling || con.parentElement;
    },
    /*color inherit*/
    inheritColor: (props, images) => {
      const { attributes, className, setAttributes, context } = props;
      const { setURLparams } = Catpow.util;
      const { classes, color } = attributes;
      const { useEffect, useMemo } = wp.element;
      const inheritColor = useMemo(() => {
        return color === "0" || context["catpow/color"] === color;
      }, [color, context["catpow/color"]]);
      useEffect(() => {
        if (inheritColor && context["catpow/color"] !== "0") {
          setAttributes({ color: context["catpow/color"] });
        }
        setAttributes({ inheritColor: color === context["catpow/color"] });
      }, [context["catpow/color"]]);
      useEffect(() => {
        const atts = {
          classes: classes.split(" ").filter((str) => !CP.colorClassPattern.test(str)).join(" ") + (color !== void 0 ? " color" + color : "")
        };
        images.forEach((key) => {
          if (!attributes[key]) {
            return;
          }
          if (attributes[key].indexOf("url(") !== -1) {
            atts[key] = attributes[key].replace(/url\((.+?)\)/, (m, p1) => "url(" + setURLparams(p1, { c: color, theme: wpinfo.theme }) + ")");
            return;
          }
          atts[key] = setURLparams(attributes[key], { c: color, theme: wpinfo.theme });
        });
        setAttributes(atts);
      }, [color]);
    },
    parseColorClass: (colorClass) => {
      if (colorClass) {
        const matches = colorClass.match(CP.colorClassPattern);
        if (matches) {
          return {
            fixed: matches[2] === "--",
            absolute: matches[2] === "",
            relative: matches[2] === "_",
            value: matches[3]
          };
        }
      }
      return { fixed: false, absolute: false, relative: false, value: 0 };
    },
    generateColorClass: (data) => "color" + (data.fixed ? "--" : data.relative ? "_" : "") + data.value,
    colorClassPattern: /^color((|_|\-\-)(\-?\d+))$/,
    /*id reflection*/
    manageStyleData: (props, csss) => {
      const { attributes, className, setAttributes } = props;
      const { id, prevId, styleDatas } = attributes;
      const { useEffect } = wp.element;
      useEffect(() => {
        if (!id) {
          setAttributes({ id: "s" + new Date().getTime().toString(16) });
        }
        if (void 0 === styleDatas) {
          const styleDatas2 = {};
          csss.forEach((key) => {
            styleDatas2[key] = CP.parseStyleCodeWithMediaQuery(attributes[key]);
          });
          setAttributes({ styleDatas: styleDatas2 });
        }
      }, []);
      useEffect(() => {
        if (id && id.length > 2) {
          if (document.querySelectorAll("#" + id).length > 1) {
            setAttributes({ id: "s" + new Date().getTime().toString(16) });
          }
          const atts = {};
          atts.prevId = id;
          atts.styleDatas = {};
          csss.forEach((key) => {
            if (!attributes[key]) {
              return;
            }
            atts[key] = attributes[key].replace("#" + prevId, "#" + id);
            atts.styleDatas[key] = CP.parseStyleCodeWithMediaQuery(atts[key]);
          });
          setAttributes(atts);
        }
      }, [id]);
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
    innerBlocks: [
      {
        name: "core/paragraph",
        attributes: {
          content: CP.dummyText.text
        }
      }
    ]
  };
  window.CP = CP;

  // ../blocks/_init/init/format.jsx
  wp.richText.registerFormatType("catpow/ruby", {
    title: "Ruby",
    tagName: "ruby",
    className: null,
    edit({ isActive, value, onChange }) {
      const { RichTextShortcut, RichTextToolbarButton } = wp.blockEditor;
      const { toggleFormat } = wp.richText;
      const onToggle = () => {
        if (isActive) {
          return onChange(toggleFormat(value, { type: "catpow/ruby" }));
        }
        if (wp.richText.isCollapsed(value)) {
          alert(__("\u30EB\u30D3\u3092\u3064\u3051\u305F\u3044\u30C6\u30AD\u30B9\u30C8\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044"));
          return;
        }
        let rt = prompt(__("\u30EB\u30D3\u3092\u5165\u529B"));
        if (rt === null) {
          return;
        }
        return onChange(wp.richText.insert(
          value,
          wp.richText.create({ html: "<ruby>" + wp.richText.slice(value).text + "<rt>" + rt + "</rt></ruby>" }),
          value.start,
          value.end
        ));
      };
      const icon = /* @__PURE__ */ wp.element.createElement("svg", { role: "img", focusable: "false", xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 20 20", "aria-hidden": "true" }, /* @__PURE__ */ wp.element.createElement("path", { d: "M3.6,19.8L8.9,6.2h1.9l5.6,13.6h-2l-1.6-4.1H7l-1.5,4.1H3.6z M7.6,14.2h4.6l-1.4-3.8c-0.4-1.1-0.8-2.1-1-2.8\n				c-0.2,0.9-0.4,1.7-0.7,2.6L7.6,14.2z" }), /* @__PURE__ */ wp.element.createElement("path", { d: "M10.7,4.4C10.4,4.7,10.1,4.9,9.8,5C9.6,5.1,9.3,5.1,9,5.1C8.4,5.2,8,5,7.7,4.8c-0.3-0.3-0.4-0.6-0.4-1c0-0.2,0-0.4,0.2-0.6\n					C7.6,3,7.7,2.8,7.9,2.7C8,2.6,8.2,2.5,8.5,2.4c0.2,0,0.4-0.1,0.7-0.1c0.7-0.1,1.1-0.2,1.4-0.3c0-0.1,0-0.2,0-0.2\n					c0-0.3-0.1-0.6-0.2-0.7c-0.2-0.2-0.5-0.3-0.9-0.3C9.1,0.8,8.8,0.9,8.6,1C8.4,1.2,8.3,1.4,8.2,1.8L7.4,1.7C7.5,1.3,7.6,1,7.8,0.8\n					c0.2-0.2,0.4-0.4,0.7-0.5c0.3-0.1,0.7-0.2,1.1-0.2c0.4,0,0.7,0,1,0.1c0.3,0.1,0.4,0.2,0.6,0.4c0.1,0.1,0.2,0.3,0.3,0.5\n					c0,0.1,0,0.4,0,0.7l0,1.1c0,0.8,0,1.2,0.1,1.4c0,0.2,0.1,0.4,0.2,0.6l-0.8,0C10.8,4.9,10.7,4.7,10.7,4.4z M10.6,2.6\n					C10.3,2.8,9.9,2.9,9.3,3C9,3,8.7,3.1,8.6,3.1C8.5,3.2,8.4,3.3,8.3,3.4C8.2,3.5,8.2,3.6,8.2,3.8c0,0.2,0.1,0.4,0.3,0.5\n					c0.2,0.1,0.4,0.2,0.7,0.2c0.3,0,0.6-0.1,0.8-0.2s0.4-0.3,0.5-0.6c0.1-0.2,0.1-0.5,0.1-0.8L10.6,2.6z" }));
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(
        RichTextShortcut,
        {
          type: "primary",
          character: "r",
          onUse: onToggle
        }
      ), /* @__PURE__ */ wp.element.createElement(
        RichTextToolbarButton,
        {
          icon,
          title: "Ruby",
          onClick: onToggle,
          isActive,
          shortcutType: "primary",
          shortcutCharacter: "r"
        }
      ));
    }
  });
  wp.richText.registerFormatType("catpow/rt", {
    title: "RubyText",
    tagName: "rt",
    className: null
  });
  wp.richText.registerFormatType("catpow/small", {
    title: "small",
    tagName: "small",
    className: null,
    edit({ isActive, value, onChange }) {
      const { RichTextToolbarButton, RichTextShortcut } = wp.blockEditor;
      const { toggleFormat } = wp.richText;
      const onToggle = () => onChange(toggleFormat(value, { type: "catpow/small" }));
      const icon = /* @__PURE__ */ wp.element.createElement("svg", { role: "img", focusable: "false", xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 20 20", "aria-hidden": "true" }, /* @__PURE__ */ wp.element.createElement("path", { d: "M5.6,16.7l3.6-9.4h1.3l3.8,9.4H13l-1.1-2.8H8l-1,2.8H5.6z M8.3,12.9h3.2l-1-2.6C10.2,9.5,10,8.9,9.9,8.4\n		C9.7,9,9.6,9.6,9.3,10.1L8.3,12.9z" }));
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(
        RichTextShortcut,
        {
          type: "primary",
          character: "-",
          onUse: onToggle
        }
      ), /* @__PURE__ */ wp.element.createElement(
        RichTextToolbarButton,
        {
          icon,
          title: "small",
          onClick: onToggle,
          isActive,
          shortcutType: "primary",
          shortcutCharacter: "-"
        }
      ));
    }
  });
  wp.richText.registerFormatType("catpow/title", {
    title: "Title",
    tagName: "span",
    className: "rtf-title",
    attributes: {
      type: "class"
    },
    edit(props) {
      const { isActive, value, onChange, activeAttributes } = props;
      const { BlockControls, RichTextToolbarButton } = wp.blockEditor;
      const { Popover, Card, CardBody, ToolbarGroup } = wp.components;
      const { useMemo, useCallback } = wp.element;
      const { applyFormat, toggleFormat } = wp.richText;
      const onToggle = () => {
        return onChange(toggleFormat(value, { type: "catpow/title", attributes: { type: "iheader" } }));
      };
      const el = useMemo(CP.getSelecedFormatElement, [isActive, value.start, value.end]);
      const setAttributes = useCallback((attr) => {
        onChange(applyFormat(value, { type: "catpow/title", attributes: Object.assign(activeAttributes, attr) }));
      }, [value, activeAttributes]);
      const icon = /* @__PURE__ */ wp.element.createElement("svg", { role: "img", focusable: "false", xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 20 20", "aria-hidden": "true" }, /* @__PURE__ */ wp.element.createElement("g", null, /* @__PURE__ */ wp.element.createElement("path", { d: "M6.9,15.9V2.6h2.7v5.2h5.3V2.6h2.7v13.3h-2.7v-5.8H9.6v5.8H6.9z" })), /* @__PURE__ */ wp.element.createElement("rect", { x: "1", y: "1", width: "4", height: "18" }), /* @__PURE__ */ wp.element.createElement("rect", { x: "5", y: "18", width: "14", height: "1" }));
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, isActive && /* @__PURE__ */ wp.element.createElement(Popover, { anchor: el, position: "bottom left", focusOnMount: false }, /* @__PURE__ */ wp.element.createElement(Card, { size: "small" }, /* @__PURE__ */ wp.element.createElement(CardBody, null, /* @__PURE__ */ wp.element.createElement(
        CP.SelectButtons,
        {
          options: [
            { label: "header", value: "iheader" },
            { label: "headline", value: "iheadline" },
            { label: "catch", value: "icatch" }
          ],
          selected: activeAttributes["type"],
          onChange: (type) => setAttributes({ type })
        }
      )))), /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(
        ToolbarGroup,
        {
          controls: [
            { icon, onClick: onToggle, isActive }
          ]
        }
      )), /* @__PURE__ */ wp.element.createElement(
        RichTextToolbarButton,
        {
          icon,
          title: "Title",
          onClick: onToggle,
          isActive
        }
      ));
    }
  });
  wp.richText.registerFormatType("catpow/mark", {
    title: "Mark",
    tagName: "mark",
    className: "rtf-mark",
    attributes: {
      color: "class"
    },
    edit(props) {
      const { isActive, value, onChange, activeAttributes } = props;
      const { Popover, Card, CardBody, ToolbarGroup } = wp.components;
      const { BlockControls, RichTextShortcut, RichTextToolbarButton } = wp.blockEditor;
      const { useMemo, useCallback } = wp.element;
      const { applyFormat, toggleFormat } = wp.richText;
      const onToggle = () => {
        return onChange(toggleFormat(value, { type: "catpow/mark", attributes: { color: "color_0" } }));
      };
      const el = useMemo(CP.getSelecedFormatElement, [isActive, value.start, value.end]);
      const setAttributes = useCallback((attr) => {
        onChange(applyFormat(value, { type: "catpow/mark", attributes: Object.assign(activeAttributes, attr) }));
      }, [value, activeAttributes]);
      const icon = /* @__PURE__ */ wp.element.createElement("svg", { role: "img", focusable: "false", xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 20 20", "aria-hidden": "true" }, /* @__PURE__ */ wp.element.createElement("polygon", { points: "7.9,10.8 12.1,10.8 10,5.3 	" }), /* @__PURE__ */ wp.element.createElement("path", { d: "M0,2v16h20V2H0z M13.7,15.3L12.5,12h-5l-1.2,3.4H4.7L9,4h1.9l4.3,11.3H13.7z" }));
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, isActive && /* @__PURE__ */ wp.element.createElement(Popover, { anchor: el, position: "bottom center", focusOnMount: false }, /* @__PURE__ */ wp.element.createElement(Card, { size: "small" }, /* @__PURE__ */ wp.element.createElement(CardBody, null, /* @__PURE__ */ wp.element.createElement(CP.ColorVarTracer, { target: el.parentElement }, /* @__PURE__ */ wp.element.createElement(
        CP.SelectThemeColor,
        {
          onChange: (color) => setAttributes({ color }),
          selected: activeAttributes["color"]
        }
      ))))), /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(
        ToolbarGroup,
        {
          controls: [
            { icon, onClick: onToggle, isActive }
          ]
        }
      )), /* @__PURE__ */ wp.element.createElement(
        RichTextToolbarButton,
        {
          icon,
          title: "Mark",
          onClick: onToggle,
          isActive
        }
      ));
    }
  });
  wp.richText.registerFormatType("catpow/large", {
    title: "Large",
    tagName: "strong",
    className: "rtf-large",
    attributes: {
      color: "class"
    },
    edit(props) {
      const { isActive, value, onChange, activeAttributes } = props;
      const { Popover, Card, CardBody, ToolbarGroup } = wp.components;
      const { useMemo, useCallback } = wp.element;
      const { BlockControls, RichTextToolbarButton } = wp.blockEditor;
      const { applyFormat, toggleFormat } = wp.richText;
      const onToggle = () => {
        return onChange(toggleFormat(value, { type: "catpow/large", attributes: { color: "color_0" } }));
      };
      const el = useMemo(CP.getSelecedFormatElement, [isActive, value.start, value.end]);
      const setAttributes = useCallback((attr) => {
        onChange(applyFormat(value, { type: "catpow/large", attributes: Object.assign(activeAttributes, attr) }));
      }, [value, activeAttributes]);
      const icon = /* @__PURE__ */ wp.element.createElement("svg", { role: "img", focusable: "false", xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 20 20", "aria-hidden": "true" }, /* @__PURE__ */ wp.element.createElement("path", { d: "M4.8,0.5h5c1.6,0,2.8,0.1,3.6,0.4c0.8,0.2,1.5,0.7,2,1.5c0.5,0.8,0.8,2,0.8,3.6c0,1.1-0.2,1.9-0.5,2.4\n		c-0.4,0.4-1.1,0.8-2.1,1c1.2,0.3,1.9,0.7,2.4,1.3c0.4,0.6,0.6,1.5,0.6,2.8v1.8c0,1.3-0.1,2.3-0.4,2.9c-0.3,0.6-0.8,1.1-1.4,1.3\n		c-0.7,0.2-2,0.3-4,0.3H4.8V0.5z M9.8,3.8v4.3c0.2,0,0.4,0,0.5,0c0.5,0,0.8-0.1,0.9-0.4c0.1-0.2,0.2-0.9,0.2-2.1\n		c0-0.6-0.1-1-0.2-1.3s-0.3-0.4-0.4-0.5C10.7,3.8,10.4,3.8,9.8,3.8z M9.8,11.1v5.4c0.7,0,1.2-0.1,1.4-0.3c0.2-0.2,0.3-0.7,0.3-1.5\n		v-1.8c0-0.8-0.1-1.3-0.3-1.5C11.1,11.2,10.6,11.1,9.8,11.1z" }));
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, isActive && /* @__PURE__ */ wp.element.createElement(Popover, { anchor: el, position: "bottom center", focusOnMount: false }, /* @__PURE__ */ wp.element.createElement(Card, { size: "small" }, /* @__PURE__ */ wp.element.createElement(CardBody, null, /* @__PURE__ */ wp.element.createElement(CP.ColorVarTracer, { target: el.parentElement }, /* @__PURE__ */ wp.element.createElement(
        CP.SelectThemeColor,
        {
          onChange: (color) => setAttributes({ color }),
          selected: activeAttributes["color"]
        }
      ))))), /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(
        ToolbarGroup,
        {
          controls: [
            { icon, onClick: onToggle, isActive }
          ]
        }
      )), /* @__PURE__ */ wp.element.createElement(
        RichTextToolbarButton,
        {
          icon,
          title: "Large",
          onClick: onToggle,
          isActive
        }
      ));
    }
  });
  wp.richText.registerFormatType("catpow/tag", {
    title: "tag",
    tagName: "a",
    className: "rtf-tag",
    attributes: {
      url: "href",
      color: "class"
    },
    edit(props) {
      const { isActive, value, onChange, onFocus, activeAttributes, activeObject } = props;
      const { Popover, BaseControle, TextControl, Card, CardBody, ToolbarGroup } = wp.components;
      const { BlockControls, RichTextToolbarButton, RichTextShortcut } = wp.blockEditor;
      const { useState, useMemo, useCallback } = wp.element;
      const { removeFormat, applyFormat, toggleFormat, insert, create, slice } = wp.richText;
      const onToggle = () => {
        return onChange(toggleFormat(value, { type: "catpow/tag", attributes: { class: "color_0" } }));
      };
      const el = useMemo(CP.getSelecedFormatElement, [isActive, value.start, value.end]);
      const setAttributes = useCallback((attr) => {
        onChange(applyFormat(value, { type: "catpow/tag", attributes: Object.assign(activeAttributes, attr) }));
      }, [value, activeAttributes]);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, isActive && /* @__PURE__ */ wp.element.createElement(Popover, { anchor: el, position: "bottom center", focusOnMount: false }, /* @__PURE__ */ wp.element.createElement(Card, null, /* @__PURE__ */ wp.element.createElement(CardBody, null, /* @__PURE__ */ wp.element.createElement(
        TextControl,
        {
          label: "URL",
          value: activeAttributes["url"],
          onChange: (url) => setAttributes({ url })
        }
      ))), /* @__PURE__ */ wp.element.createElement(Card, { size: "small" }, /* @__PURE__ */ wp.element.createElement(CardBody, null, /* @__PURE__ */ wp.element.createElement(CP.ColorVarTracer, { target: el.parentElement }, /* @__PURE__ */ wp.element.createElement(
        CP.SelectThemeColor,
        {
          onChange: (color) => setAttributes({ color }),
          selected: activeAttributes["color"]
        }
      ))))), /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(
        ToolbarGroup,
        {
          controls: [
            { icon: "tag", onClick: onToggle, isActive }
          ]
        }
      )), /* @__PURE__ */ wp.element.createElement(
        RichTextToolbarButton,
        {
          icon: "tag",
          title: "tag",
          onClick: onToggle,
          isActive
        }
      ));
    }
  });
  wp.richText.registerFormatType("catpow/annotation", {
    title: "annotation",
    tagName: "small",
    className: "rtf-annotation",
    edit({ isActive, value, onChange }) {
      const { BlockControls, RichTextToolbarButton } = wp.blockEditor;
      const { ToolbarGroup } = wp.components;
      const { toggleFormat } = wp.richText;
      const onToggle = () => onChange(toggleFormat(value, { type: "catpow/annotation" }));
      const icon = /* @__PURE__ */ wp.element.createElement("svg", { role: "img", focusable: "false", xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 20 20", "aria-hidden": "true" }, /* @__PURE__ */ wp.element.createElement("path", { d: "M2.99,2.01l7.04,7.04l7.04-7.04l0.62,0.62l-7.04,7.04l7.04,7.04l-0.62,0.62l-7.04-7.04l-7.06,7.06l-0.62-0.62l7.06-7.06\n		L2.37,2.62L2.99,2.01z M3.95,11.26c-0.87,0-1.6-0.73-1.6-1.6s0.73-1.6,1.6-1.6s1.6,0.73,1.6,1.6C5.55,10.58,4.78,11.26,3.95,11.26z\n		 M8.43,3.58c0-0.87,0.73-1.6,1.6-1.6s1.6,0.73,1.6,1.6s-0.73,1.6-1.6,1.6C9.11,5.18,8.43,4.42,8.43,3.58z M11.63,15.74\n		c0,0.87-0.73,1.6-1.6,1.6s-1.6-0.73-1.6-1.6c0-0.88,0.73-1.6,1.6-1.6C10.94,14.14,11.63,14.91,11.63,15.74z M16.11,8.06\n		c0.87,0,1.6,0.73,1.6,1.6s-0.73,1.6-1.6,1.6c-0.88,0-1.6-0.73-1.6-1.6C14.51,8.75,15.28,8.06,16.11,8.06z" }));
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(
        ToolbarGroup,
        {
          controls: [
            { icon, onClick: onToggle, isActive }
          ]
        }
      )), /* @__PURE__ */ wp.element.createElement(
        RichTextToolbarButton,
        {
          icon,
          title: "annotation",
          onClick: onToggle,
          isActive
        }
      ));
    }
  });
  wp.richText.registerFormatType("catpow/clear", {
    title: "clear",
    tagName: "div",
    className: null,
    edit({ isActive, value, onChange }) {
      const { RichTextToolbarButton } = wp.blockEditor;
      const { create } = wp.richText;
      return /* @__PURE__ */ wp.element.createElement(
        RichTextToolbarButton,
        {
          icon: "dismiss",
          title: "\u{1F9F9}\u5168\u3066\u306E\u30B9\u30BF\u30A4\u30EB\u3092\u30AF\u30EA\u30A2",
          onClick: () => onChange(create({ html: value.text })),
          isActive: false
        }
      );
    }
  });

  // ../blocks/_init/init/plugins.jsx
  wp.plugins.registerPlugin("catpow-sidebar", { render: (props) => {
    const { useState, useMemo, useCallback } = wp.element;
    const { PluginSidebarMoreMenuItem, PluginSidebar } = wp.editPost;
    const { PanelBody } = wp.components;
    const [structure, setStructure] = useState(false);
    const { DataStructure, DataStructureItem } = CP;
    if (!structure) {
      wp.apiFetch({ path: "/cp/v1/config/structure" }).then((structure2) => {
        setStructure(structure2);
      });
    }
    const RenderMeta = useCallback(({ meta }) => {
      return /* @__PURE__ */ wp.element.createElement(DataStructure, null, meta.map((item) => {
        if (item.value) {
          return /* @__PURE__ */ wp.element.createElement(DataStructureItem, { title: item.label, name: item.name }, /* @__PURE__ */ wp.element.createElement(RenderMetaValue, { value: item.value }));
        }
        return /* @__PURE__ */ wp.element.createElement(DataStructureItem, { title: item.label, name: item.name }, item.meta.length && /* @__PURE__ */ wp.element.createElement(RenderMeta, { meta: item.meta }));
      }));
    }, [props]);
    const RenderMetaValue = useCallback(({ value }) => {
      if (Array.isArray(value)) {
        return value.map((val) => /* @__PURE__ */ wp.element.createElement(DataStructureItem, { title: val }));
      }
      return Object.keys(value).map((key) => {
        if (typeof value[key] === "object") {
          return /* @__PURE__ */ wp.element.createElement(DataStructureItem, { title: key }, /* @__PURE__ */ wp.element.createElement(RenderMetaValue, { value: value[key] }));
        }
        return /* @__PURE__ */ wp.element.createElement(DataStructureItem, { title: key, name: value[key] });
      });
    }, [props]);
    return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(PluginSidebarMoreMenuItem, { target: "catpow-sidebar" }, "\u{1F43E}Catpow"), /* @__PURE__ */ wp.element.createElement(
      PluginSidebar,
      {
        name: "catpow-sidebar",
        title: "\u{1F43E}Catpow",
        icon: /* @__PURE__ */ wp.element.createElement("svg", { role: "img", focusable: "false", xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 20 20", "aria-hidden": "true" }, /* @__PURE__ */ wp.element.createElement("g", null, /* @__PURE__ */ wp.element.createElement("path", { d: "M10.1,14.5c0-0.9,0.5-1.4,1.3-1.5c0.6-0.1,1.1-0.5,1.6-0.8c0.8-0.5,2.3-0.4,3,0.1c0.4,0.3,0.8,0.6,1,1.1\n								c0.2,0.5,0.1,1,0.1,1.5c-0.1,0.8,0.1,1.6,0.1,2.4c0,1.3-1.4,1.7-2.3,1.4c-0.6-0.3-0.9-0.8-1.3-1.3c-0.4-0.4-0.9-0.7-1.4-0.9\n								c-0.8-0.3-1.7-0.6-2.1-1.6C10,14.8,10.1,14.6,10.1,14.5z" }), /* @__PURE__ */ wp.element.createElement("path", { d: "M2.8,8.6c0.3-1,0.5-2.2,0.9-3.3c0.3-0.8,1.9-1.3,2.7-1c0.9,0.3,1.7,0.9,2.5,1.4c0.5,0.3,1.1,0.5,1.4,1.1\n								c0.2,0.5,0.2,0.9,0,1.4c-0.6,1.2-1.7,1-2.7,1.1c-0.8,0.1-1.4,0.5-2,0.9c-0.5,0.3-1,0.5-1.6,0.4C3.2,10.2,2.7,9.7,2.8,8.6z" }), /* @__PURE__ */ wp.element.createElement("path", { d: "M4.9,2.2C4.8,2.8,4.8,3.6,4,3.9C3.5,4.1,3.2,3.8,2.9,3.5C2,2.6,2.2,1.6,2.7,0.6c0.2-0.3,0.5-0.5,0.9-0.4\n								c0.4,0,0.7,0.3,0.9,0.6C4.8,1.2,4.9,1.7,4.9,2.2z" }), /* @__PURE__ */ wp.element.createElement("path", { d: "M1,3.5c0.8,0,1.3,0.8,1.5,1.4c0.2,0.7,0.1,1.2-0.4,1.7C1.6,7.1,0.9,6.8,0.5,6.2C0.1,5.6,0.1,4.9,0.2,4.3\n								C0.2,3.8,0.4,3.4,1,3.5z" }), /* @__PURE__ */ wp.element.createElement("path", { d: "M5.8,1.8c0-1.2,0.4-1.6,1.3-1.5c0.6,0.1,1,0.6,1.1,1.2c0.1,0.8,0,1.5-0.6,2.1C7.1,4,6.7,3.7,6.5,3.4C6,3,5.7,2.4,5.8,1.8z\n								" }), /* @__PURE__ */ wp.element.createElement("path", { d: "M15.3,11.5c-0.7,0-1-0.3-1-1c0-0.9,0.9-1.8,1.8-1.8c0.6,0,1.1,0.6,1.1,1.3C17.2,10.7,16.3,11.5,15.3,11.5z" }), /* @__PURE__ */ wp.element.createElement("path", { d: "M17.3,12.5c0-1.1,0.3-1.5,1.1-1.5c0.8,0,1.3,0.5,1.3,1.2c0,1-0.6,1.7-1.3,1.7C17.6,13.9,17.3,13.5,17.3,12.5z" }), /* @__PURE__ */ wp.element.createElement("path", { d: "M11.6,11.8c-0.5,0.1-0.9-0.2-0.9-0.8c0-1,0.6-1.9,1.3-2c0.8,0,1.3,0.4,1.3,1.2C13.3,11.1,12.7,11.7,11.6,11.8z" }), /* @__PURE__ */ wp.element.createElement("path", { d: "M18.9,17.7c-0.7,0-1.2-0.9-1-1.5c0.2-0.4,0.1-0.8,0.4-1.2c0.3-0.3,1.2-0.3,1.4,0.1c0.4,0.8,0.3,1.7-0.3,2.4\n								C19.3,17.6,19.1,17.7,18.9,17.7z" }), /* @__PURE__ */ wp.element.createElement("path", { d: "M8.7,3.4c0-0.6,0.4-1.1,0.9-1.1C10.2,2.3,11,3.2,11,4c0,0.6-0.5,0.9-1.1,1C9.2,4.9,8.7,4.3,8.7,3.4z" })))
      },
      /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "\u30C7\u30FC\u30BF\u69CB\u9020", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(DataStructure, null, structure && Object.keys(structure).map((data_type) => {
        return /* @__PURE__ */ wp.element.createElement(DataStructureItem, { title: data_type, key: data_type }, structure[data_type].length && /* @__PURE__ */ wp.element.createElement(DataStructure, null, structure[data_type].map((item) => /* @__PURE__ */ wp.element.createElement(DataStructureItem, { title: item.label, name: item.name, key: item.name }, item.meta.length && /* @__PURE__ */ wp.element.createElement(RenderMeta, { meta: item.meta })))));
      })))
    ));
  } });

  // ../blocks/_init/init/AlignmentIcon.jsx
  CP.AlignmentIcon = (props) => {
    const { icon } = props;
    switch (icon) {
      case "top":
        return /* @__PURE__ */ wp.element.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20" }, /* @__PURE__ */ wp.element.createElement("rect", { x: "10", y: "3", width: "8", height: "11" }), /* @__PURE__ */ wp.element.createElement("rect", { x: "2", y: "3", width: "7", height: "15" }), /* @__PURE__ */ wp.element.createElement("rect", { x: "1", y: "1", width: "18", height: "1" }));
      case "middle":
        return /* @__PURE__ */ wp.element.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20" }, /* @__PURE__ */ wp.element.createElement("polygon", { points: "1.5 17.5 8.5 17.5 8.5 10.5 9.5 10.5 9.5 15.5 17.5 15.5 17.5 10.5 18.5 10.5 18.5 9.5 17.5 9.5 17.5 4.5 9.5 4.5 9.5 9.5 8.5 9.5 8.5 2.5 1.5 2.5 1.5 9.5 .5 9.5 .5 10.5 1.5 10.5 1.5 17.5" }));
      case "bottom":
        return /* @__PURE__ */ wp.element.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20" }, /* @__PURE__ */ wp.element.createElement("rect", { x: "10", y: "6", width: "8", height: "11" }), /* @__PURE__ */ wp.element.createElement("rect", { x: "2", y: "2", width: "7", height: "15" }), /* @__PURE__ */ wp.element.createElement("rect", { x: "1", y: "18", width: "18", height: "1" }));
      case "left":
        return /* @__PURE__ */ wp.element.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20" }, /* @__PURE__ */ wp.element.createElement("rect", { x: "3", y: "2", width: "11", height: "8" }), /* @__PURE__ */ wp.element.createElement("rect", { x: "3", y: "11", width: "15", height: "7" }), /* @__PURE__ */ wp.element.createElement("rect", { x: "1", y: "1", width: "1", height: "18" }));
      case "center":
        return /* @__PURE__ */ wp.element.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20" }, /* @__PURE__ */ wp.element.createElement("polygon", { points: "9 19 10 19 10 18 17 18 17 11 10 11 10 10 15 10 15 2 10 2 10 1 9 1 9 2 4 2 4 10 9 10 9 11 2 11 2 18 9 18 9 19" }));
      case "right":
        return /* @__PURE__ */ wp.element.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20" }, /* @__PURE__ */ wp.element.createElement("rect", { x: "6", y: "2", width: "11", height: "8" }), /* @__PURE__ */ wp.element.createElement("rect", { x: "2", y: "11", width: "15", height: "7" }), /* @__PURE__ */ wp.element.createElement("rect", { x: "18", y: "1", width: "1", height: "18" }));
      case "evenTop":
        return /* @__PURE__ */ wp.element.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20" }, /* @__PURE__ */ wp.element.createElement("rect", { x: "3", y: "3", width: "14", height: "5" }), /* @__PURE__ */ wp.element.createElement("rect", { x: "2", y: "12", width: "16", height: "7" }), /* @__PURE__ */ wp.element.createElement("rect", { x: "1", y: "1", width: "18", height: "1" }), /* @__PURE__ */ wp.element.createElement("rect", { x: "1", y: "10", width: "18", height: "1" }));
      case "evenMiddle":
        return /* @__PURE__ */ wp.element.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20" }, /* @__PURE__ */ wp.element.createElement("polygon", { points: "17 2 3 2 3 4 1 4 1 5 3 5 3 7 17 7 17 5 19 5 19 4 17 4 17 2" }), /* @__PURE__ */ wp.element.createElement("polygon", { points: "18 11 2 11 2 14 1 14 1 15 2 15 2 18 18 18 18 15 19 15 19 14 18 14 18 11" }));
      case "evenBottom":
        return /* @__PURE__ */ wp.element.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20" }, /* @__PURE__ */ wp.element.createElement("rect", { x: "3", y: "1", width: "14", height: "5" }), /* @__PURE__ */ wp.element.createElement("rect", { x: "2", y: "10", width: "16", height: "7" }), /* @__PURE__ */ wp.element.createElement("rect", { x: "1", y: "7", width: "18", height: "1" }), /* @__PURE__ */ wp.element.createElement("rect", { x: "1", y: "18", width: "18", height: "1" }));
      case "evenLeft":
        return /* @__PURE__ */ wp.element.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20" }, /* @__PURE__ */ wp.element.createElement("rect", { x: "3", y: "3", width: "5", height: "14" }), /* @__PURE__ */ wp.element.createElement("rect", { x: "12", y: "2", width: "7", height: "16" }), /* @__PURE__ */ wp.element.createElement("rect", { x: "1", y: "1", width: "1", height: "18" }), /* @__PURE__ */ wp.element.createElement("rect", { x: "10", y: "1", width: "1", height: "18" }));
      case "evenCenter":
        return /* @__PURE__ */ wp.element.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20" }, /* @__PURE__ */ wp.element.createElement("polygon", { points: "4 1 4 3 2 3 2 17 4 17 4 19 5 19 5 17 7 17 7 3 5 3 5 1 4 1" }), /* @__PURE__ */ wp.element.createElement("polygon", { points: "15 1 14 1 14 2 11 2 11 18 14 18 14 19 15 19 15 18 18 18 18 2 15 2 15 1" }));
      case "evenRight":
        return /* @__PURE__ */ wp.element.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20" }, /* @__PURE__ */ wp.element.createElement("rect", { x: "1", y: "3", width: "5", height: "14" }), /* @__PURE__ */ wp.element.createElement("rect", { x: "10", y: "2", width: "7", height: "16" }), /* @__PURE__ */ wp.element.createElement("rect", { x: "7", y: "1", width: "1", height: "18" }), /* @__PURE__ */ wp.element.createElement("rect", { x: "18", y: "1", width: "1", height: "18" }));
      case "evenSpaceV":
        return /* @__PURE__ */ wp.element.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20" }, /* @__PURE__ */ wp.element.createElement("rect", { x: "4", y: "2", width: "13", height: "6" }), /* @__PURE__ */ wp.element.createElement("rect", { x: "4", y: "11", width: "14", height: "7" }), /* @__PURE__ */ wp.element.createElement("polygon", { points: "3 10 3 9 4 9 4 8 3 8 3 7 2 7 2 8 1 8 1 9 2 9 2 10 1 10 1 11 2 11 2 12 3 12 3 11 4 11 4 10 3 10" }));
      case "evenSpaceH":
        return /* @__PURE__ */ wp.element.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20" }, /* @__PURE__ */ wp.element.createElement("rect", { x: "2", y: "4", width: "6", height: "13" }), /* @__PURE__ */ wp.element.createElement("rect", { x: "11", y: "4", width: "7", height: "14" }), /* @__PURE__ */ wp.element.createElement("polygon", { points: "12 3 12 2 11 2 11 1 10 1 10 2 9 2 9 1 8 1 8 2 7 2 7 3 8 3 8 4 9 4 9 3 10 3 10 4 11 4 11 3 12 3" }));
    }
  };

  // ../blocks/_init/init/BoundingBox.jsx
  CP.BoundingBox = (props) => {
    const { targets, onDeselect, onDuplicate, onDelete, onChange } = props;
    const { useState, useCallback, useMemo, useEffect, useRef } = wp.element;
    const { bem } = Catpow.util;
    const classes = useMemo(() => bem("CP-BoundingBox"), []);
    const ref = useRef();
    const [style, setStyle] = useState({});
    const [action, setAction] = useState(false);
    const container = useMemo(() => props.container || document, [props.container]);
    const tracePosition = useCallback((targets2) => {
      if (targets2.length === 1) {
        setStyle(extractPosition(targets2[0]));
        return;
      }
      const bnd = targets2.reduce((bnd2, target) => {
        const crrBnd = getBoundingArray(extractPosition(target));
        crrBnd[2] += crrBnd[0];
        crrBnd[3] += crrBnd[1];
        if (bnd2 === false) {
          return crrBnd;
        }
        return [
          Math.min(bnd2[0], crrBnd[0]),
          Math.min(bnd2[1], crrBnd[1]),
          Math.max(bnd2[2], crrBnd[2]),
          Math.max(bnd2[3], crrBnd[3])
        ];
      }, false);
      setStyle({
        position: window.getComputedStyle(targets2[0]).position,
        left: bnd[0] + "px",
        top: bnd[1] + "px",
        width: bnd[2] - bnd[0] + "px",
        height: bnd[3] - bnd[1] + "px"
      });
    }, []);
    const extractPosition = useCallback((target) => {
      if (!target) {
        return {};
      }
      const { position, left, top, width, height } = window.getComputedStyle(target);
      return { position, left, top, width, height };
    }, []);
    const getBoundingArray = useCallback((obj) => [
      parseFloat(obj.left),
      parseFloat(obj.top),
      parseFloat(obj.width),
      parseFloat(obj.height)
    ]);
    const observer = useMemo(() => {
      return new MutationObserver((mutations) => {
        tracePosition(targets);
      });
    }, [tracePosition, targets]);
    useEffect(() => {
      if (!targets.length) {
        return false;
      }
      tracePosition(targets);
      targets.forEach((target) => {
        observer.observe(target, { attributes: true, attributeFilter: ["style"] });
      });
      return () => observer.disconnect();
    }, [targets, observer]);
    useEffect(() => {
      if (!targets.length) {
        return false;
      }
      tracePosition(targets);
      const cb = () => tracePosition(targets);
      window.addEventListener("resize", cb);
      return () => window.removeEventListener("resize", cb);
    }, [targets, props.viewMode]);
    useEffect(() => {
      if (!onDeselect) {
        return;
      }
      const cb = (e) => {
        if (ref.current && !e.shiftKey) {
          const bnd = ref.current.getBoundingClientRect();
          const { clientX: x, clientY: y } = e;
          if (x < bnd.left || x > bnd.right || y < bnd.top || y > bnd.bottom) {
            onDeselect();
          }
        }
      };
      container.addEventListener("click", cb);
      return () => container.removeEventListener("click", cb);
    }, [targets, container, onDeselect]);
    useEffect(() => {
      if (!onDelete) {
        return;
      }
      const cb = (e) => {
        if (e.isComposing || e.target.nodeName === "INPUT" || e.target.nodeName === "TEXTAREA" || e.target.isContentEditable) {
          return;
        }
        if (e.key === "Backspace") {
          onDelete(targets);
        }
      };
      document.addEventListener("keydown", cb);
      return () => document.removeEventListener("keydown", cb);
    }, [targets, onDelete]);
    const controls = useMemo(() => {
      const controls2 = [];
      ["top", "middle", "bottom"].forEach((v, vi) => {
        ["left", "center", "right"].forEach((h, hi) => {
          const isMove = vi === 1 && hi === 1;
          const d = isMove ? "move" : vi === 1 ? "ew" : hi === 1 ? "ns" : vi === hi ? "nwse" : "nesw";
          controls2.push({
            className: [isMove ? "is-position-control" : "is-size-control", "is-" + v, "is-" + h, "is-" + d],
            action: isMove ? "move" : "resize",
            flags: hi << 2 | vi
          });
        });
      });
      return controls2;
    }, []);
    const onMouseDown = useCallback((e) => {
      const control = e.target.closest("[data-control-action]");
      if (!control) {
        return setAction(false);
      }
      if (onDuplicate && e.altKey && control.dataset.controlAction === "move") {
        onDuplicate(targets);
      }
      targets.forEach((target) => {
        target.style.animation = "none";
        target.style.transition = "none";
      });
      const orgBnd = getBoundingArray(window.getComputedStyle(ref.current));
      const orgBnds = targets.map((target) => getBoundingArray(window.getComputedStyle(target)));
      const [ol, ot, ow, oh] = orgBnd;
      setAction({
        action: control.dataset.controlAction,
        flags: parseInt(control.dataset.controlFlags),
        org: { x: e.clientX, y: e.clientY },
        orgBnd,
        orgBnds,
        coefs: orgBnds.map((bnd) => {
          const [l, t, w, h] = bnd;
          return [(l - ol) / ow, (t - ot) / oh, w / ow, h / oh];
        }),
        orgAspect: oh / ow,
        keepAspect: e.shiftKey,
        keepCenter: e.altKey,
        targets
      });
    }, [ref, targets, onDuplicate]);
    const onMouseMove = useCallback((e) => {
      if (!action) {
        return;
      }
      const dx = e.clientX - action.org.x;
      const dy = e.clientY - action.org.y;
      if (action.action === "move") {
        targets.forEach((target, index) => {
          target.style.left = action.orgBnds[index][0] + dx + "px";
          target.style.top = action.orgBnds[index][1] + dy + "px";
        });
      } else if (action.action === "resize") {
        let [ol, ot, ow, oh] = action.orgBnd;
        let [l, t, w, h] = action.orgBnd;
        if (!(action.flags & 4)) {
          if (action.flags & 8) {
            w += dx;
          } else {
            w -= dx;
            l += dx;
          }
        }
        if (!(action.flags & 1)) {
          if (action.flags & 2) {
            h += dy;
          } else {
            h -= dy;
            t += dy;
          }
        }
        if (action.keepAspect) {
          let d;
          if (action.flags & 1) {
            h *= w / ow;
            t += (oh - h) / 2;
          } else if (action.flags & 4) {
            w *= h / oh;
            l += (ow - w) / 2;
          } else {
            if (w * oh > h * ow) {
              w = ow * h / oh;
              if (!(action.flags & 8)) {
                l = ol + ow - w;
              }
            } else {
              h = oh * w / ow;
              if (!(action.flags & 2)) {
                t = ot + oh - h;
              }
            }
          }
        }
        targets.forEach((target, index) => {
          const coef = action.coefs[index];
          target.style.left = l + w * coef[0] + "px";
          target.style.top = t + h * coef[1] + "px";
          target.style.width = w * coef[2] + "px";
          target.style.height = h * coef[3] + "px";
        });
      }
    }, [action]);
    const onMouseUp = useCallback((e) => {
      action.targets.map((target) => {
        target.style.animation = "";
        target.style.transition = "";
      });
      if (onChange) {
        onChange(action.targets.map(
          (target) => getBoundingArray(extractPosition(target))
        ));
      }
      action.targets.map((target) => {
        target.style.left = "";
        target.style.top = "";
        target.style.width = "";
        target.style.height = "";
      });
      setAction(false);
    }, [action, onChange]);
    const onDoubleClick = useCallback((e) => {
      targets.forEach((target) => {
        target.style.height = "auto";
        target.style.height = window.getComputedStyle(target).height + "px";
      });
      if (onChange) {
        onChange(targets.map(
          (target) => getBoundingArray(extractPosition(target))
        ));
      }
    }, [targets, onChange]);
    if (!targets.length) {
      return false;
    }
    return /* @__PURE__ */ wp.element.createElement(
      "div",
      {
        className: classes({ "is-doing-action": !!action }),
        style,
        ref,
        onMouseDown,
        onMouseMove,
        onMouseUp,
        onDoubleClick
      },
      /* @__PURE__ */ wp.element.createElement("div", { className: classes.controls() }, controls.map((props2, i) => /* @__PURE__ */ wp.element.createElement(
        "span",
        {
          className: classes.controls.control(props2.className),
          "data-control-action": props2.action,
          "data-control-flags": props2.flags,
          key: i
        }
      )))
    );
  };

  // ../blocks/_init/init/SelectThemeColor.jsx
  CP.SelectThemeColor = (props) => {
    const { selected, onChange } = props;
    const { useCallback, useMemo } = wp.element;
    const { Icon } = wp.components;
    const { bem } = Catpow.util;
    const classes = bem("CP-SelectThemeColor");
    const data = useMemo(() => CP.parseColorClass(selected), [selected]);
    const Selections = useCallback((props2) => {
      const { fixed = false, absolute = false, relative = false, active = false, selected: selected2 } = props2;
      return /* @__PURE__ */ wp.element.createElement("ul", { className: classes.items({ fixed, absolute, relative, active }) }, /* @__PURE__ */ wp.element.createElement("li", { className: classes.items.icon({ active }) }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: fixed ? "lock" : absolute ? "media-default" : "excerpt-view" })), Array.from(Array(13), (v, value) => {
        const colorClass = CP.generateColorClass({ fixed, absolute, relative, value });
        return /* @__PURE__ */ wp.element.createElement(
          "li",
          {
            className: classes.items.item(colorClass, { active: colorClass == selected2, fixed, absolute, relative }),
            onClick: () => onChange(colorClass),
            key: colorClass
          },
          " "
        );
      }));
    }, [onChange]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement(Selections, { selected, fixed: true, active: data.fixed }), /* @__PURE__ */ wp.element.createElement(Selections, { selected, absolute: true, active: data.absolute }), /* @__PURE__ */ wp.element.createElement(Selections, { selected, relative: true, active: data.relative }));
  };

  // ../blocks/_init/init/SelectColors.jsx
  CP.SelectColors = (props) => {
    const { useState, useRef } = wp.element;
    const { ColorPicker, ColorPalette, Popover } = wp.components;
    const { onChange } = props;
    const [index, setIndex] = useState(-1);
    const colorValues = props.colors.map((color) => {
      if (typeof color === "string") {
        return color;
      }
      if ("h" in color) {
        if ("a" in color) {
          return `hsla(${color.h},${color.s},${color.l},${color.a})`;
        }
        return `hsl(${color.h},${color.s},${color.l})`;
      }
      if ("a" in color) {
        return `rgba(${color.r},${color.g},${color.b},${color.a})`;
      }
      return `rgba(${color.r},${color.g},${color.b})`;
    });
    const colors = colorValues.map((color) => {
      return { name: color, color };
    });
    return /* @__PURE__ */ wp.element.createElement("div", null, /* @__PURE__ */ wp.element.createElement(
      ColorPalette,
      {
        colors,
        color: index > -1 && colors[index].color,
        onChange: (colorValue) => {
          setIndex(colorValues.indexOf(colorValue));
        }
      }
    ), index > -1 && /* @__PURE__ */ wp.element.createElement(Popover, null, /* @__PURE__ */ wp.element.createElement(
      ColorPicker,
      {
        color: colors[index].color,
        onChangeComplete: (value) => {
          colors[index].color = value.hex;
          onChange(index, value);
        }
      }
    )));
  };

  // ../blocks/_init/init/SelectButtons.jsx
  CP.SelectButtons = (props) => {
    const { BaseControl, Button, ButtonGroup } = wp.components;
    return /* @__PURE__ */ wp.element.createElement(BaseControl, { label: props.label, help: props.help, id: "CP-SelectButtons-" + wp.compose.useInstanceId(CP.SelectButtons) }, /* @__PURE__ */ wp.element.createElement("div", { className: "selectButtons" }, /* @__PURE__ */ wp.element.createElement(ButtonGroup, null, props.options.map((option) => /* @__PURE__ */ wp.element.createElement(
      Button,
      {
        onClick: () => props.onChange(option.value),
        isPrimary: props.selected === option.value,
        key: option.value
      },
      option.label
    )))));
  };

  // ../blocks/_init/init/SelectGridButtons.jsx
  CP.SelectGridButtons = (props) => {
    const { BaseControl } = wp.components;
    const maxStrlen = props.options.reduce((acc, cur) => Math.max(acc, cur.label.length + cur.label.replace(/[ -~]+/, "").length), 3);
    const colNum = Math.min(6, Math.floor(36 / (maxStrlen + 2)));
    return /* @__PURE__ */ wp.element.createElement(BaseControl, { label: props.label, help: props.help, id: "CP-SelectGridButtons-" + wp.compose.useInstanceId(CP.SelectGridButtons) }, /* @__PURE__ */ wp.element.createElement("ul", { className: "selectGridButtons col" + colNum }, props.options.map((option) => /* @__PURE__ */ wp.element.createElement(
      "li",
      {
        onClick: () => props.onChange(option.value),
        className: "item" + (props.selected === option.value ? " active" : ""),
        key: option.value
      },
      option.label
    ))));
  };

  // ../blocks/_init/init/SelectResponsiveImage.jsx
  CP.SelectResponsiveImage = (props) => {
    const { className, attr, set, keys = {}, index, size, devices, device, isTemplate, ...otherProps } = props;
    let { sizes } = props;
    let type, onClick, item, items;
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
      const sizeData = CP.devices[device];
      onClick = (e) => CP.selectImage({ src: "src" }, function({ src: src2 }) {
        if (keys.sources) {
          item[keys.sources].forEach((source) => {
            if (source.device === device) {
              source.srcset = src2;
            }
          });
          if (items) {
            set({ [keys.items]: JSON.parse(JSON.stringify(items)) });
          } else {
            set({ [keys.sources]: JSON.parse(JSON.stringify(item[keys.sources])) });
          }
        } else {
          if (items) {
            item[keys.srcset] = item[keys.srcset].replace(sizeData.reg, src2 + sizeData.rep);
            set({ [keys.items]: JSON.parse(JSON.stringify(items)) });
          } else {
            set({ [keys.srcset]: item[keys.srcset].replace(sizeData.reg, src2 + sizeData.rep) });
          }
        }
      }, sizeData.media_size);
    } else {
      onClick = (e) => CP.selectImage(keys, function(data) {
        if (keys.items) {
          Object.assign(item, data);
          set({ [keys.items]: JSON.parse(JSON.stringify(items)) });
        } else {
          set(data);
        }
      }, size, devices);
    }
    if (isTemplate && keys.code && item[keys.code]) {
      return /* @__PURE__ */ wp.element.createElement(CP.DummyImage, { text: item[keys.code] });
    }
    if (item[keys.mime]) {
      type = item[keys.mime].split("/")[0];
    } else {
      type = "image";
    }
    if (type == "audio") {
      return /* @__PURE__ */ wp.element.createElement(
        "audio",
        {
          className: "selectImage " + className,
          src: item[keys.src],
          "data-mime": item[keys.mime],
          onClick,
          ...otherProps
        }
      );
    }
    if (item[keys.srcset] && !sizes) {
      if (device) {
        sizes = CP.devices[device].sizes_value;
      } else {
        sizes = CP.getImageSizesForDevices(devices || ["sp", "pc"]);
      }
    }
    if (type == "video") {
      return /* @__PURE__ */ wp.element.createElement(
        "video",
        {
          className: "selectImage " + className,
          src: item[keys.src],
          "data-mime": item[keys.mime],
          onClick,
          autoplay: 1,
          loop: 1,
          playsinline: 1,
          muted: 1,
          ...otherProps
        }
      );
    }
    var src = CP.imageSrcOrDummy(item[keys.src]);
    if (keys.sources) {
      if (device) {
        const source = item[keys.sources].find((source2) => source2.device === device) || { srcset: wpinfo.theme_url + "/images/dummy.jpg" };
        return /* @__PURE__ */ wp.element.createElement(
          "picture",
          {
            className: "selectImage " + className,
            onClick,
            ...otherProps
          },
          /* @__PURE__ */ wp.element.createElement(
            "img",
            {
              src: source.srcset,
              alt: item[keys.alt]
            }
          )
        );
      }
      return /* @__PURE__ */ wp.element.createElement(
        "picture",
        {
          className: "selectImage " + className,
          onClick,
          ...otherProps
        },
        item[keys.sources].map((source) => /* @__PURE__ */ wp.element.createElement("source", { srcSet: source.srcset, media: CP.devices[source.device].media_query, "data-device": source.device, key: source.device })),
        /* @__PURE__ */ wp.element.createElement(
          "img",
          {
            src,
            alt: item[keys.alt]
          }
        )
      );
    }
    return /* @__PURE__ */ wp.element.createElement(
      "img",
      {
        className: "selectImage " + className,
        src,
        alt: item[keys.alt],
        srcSet: item[keys.srcset],
        sizes,
        "data-mime": item[keys.mime],
        onClick,
        ...otherProps
      }
    );
  };

  // ../blocks/_init/init/ResponsiveImage.jsx
  CP.ResponsiveImage = ({ className, attr, keys, index, sizes, devices, device, isTemplate }) => {
    let type, item;
    if (keys.items) {
      item = attr[keys.items][index];
    } else {
      item = attr;
    }
    if (isTemplate && keys.code && item[keys.code]) {
      return item[keys.code];
    }
    if (item[keys.mime]) {
      type = item[keys.mime].split("/")[0];
    } else {
      type = "image";
    }
    if (type == "audio") {
      return /* @__PURE__ */ wp.element.createElement(
        "audio",
        {
          src: item[keys.src],
          "data-mime": item[keys.mime]
        }
      );
    }
    if (item[keys.srcset] && !sizes) {
      devices = devices || ["sp", "pc"];
      sizes = CP.getImageSizesForDevices(devices);
    }
    if (type == "video") {
      return /* @__PURE__ */ wp.element.createElement(
        "video",
        {
          className,
          src: item[keys.src],
          srcSet: item[keys.srcset],
          sizes,
          "data-mime": item[keys.mime],
          autoplay: 1,
          loop: 1,
          playsinline: 1,
          muted: 1
        }
      );
    }
    if (keys.sources && item[keys.sources] && item[keys.sources].length) {
      if (device) {
        const source = item[keys.sources].find((source2) => source2.device === device);
        return /* @__PURE__ */ wp.element.createElement("picture", { className: "selectImage " + className }, /* @__PURE__ */ wp.element.createElement(
          "img",
          {
            src: source.srcset,
            alt: item[keys.alt]
          }
        ));
      }
      return /* @__PURE__ */ wp.element.createElement("picture", { className: "selectImage " + className }, item[keys.sources].map((source) => /* @__PURE__ */ wp.element.createElement("source", { srcSet: source.srcset, media: CP.devices[source.device].media_query, "data-device": source.device, key: source.device })), /* @__PURE__ */ wp.element.createElement(
        "img",
        {
          src: item[keys.src],
          alt: item[keys.alt]
        }
      ));
    }
    return /* @__PURE__ */ wp.element.createElement(
      "img",
      {
        className,
        src: item[keys.src],
        alt: item[keys.alt],
        srcSet: item[keys.srcset],
        sizes,
        "data-mime": item[keys.mime]
      }
    );
  };

  // ../blocks/_init/init/SelectPictureSources.jsx
  CP.SelectPictureSources = (props) => {
    const { Icon } = wp.components;
    const { devices } = props;
    return /* @__PURE__ */ wp.element.createElement("table", { className: "SelectPictureSources" }, /* @__PURE__ */ wp.element.createElement("tbody", null, /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("td", { colSpan: devices.length }, /* @__PURE__ */ wp.element.createElement(CP.SelectResponsiveImage, { ...props }))), /* @__PURE__ */ wp.element.createElement("tr", null, devices.map((device) => /* @__PURE__ */ wp.element.createElement("td", { key: device }, /* @__PURE__ */ wp.element.createElement("div", { className: "label" }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: CP.devices[device].icon })), /* @__PURE__ */ wp.element.createElement(
      CP.SelectResponsiveImage,
      {
        device,
        ...props
      }
    ))))));
  };

  // ../blocks/_init/init/SelectPreparedImage.jsx
  CP.SelectPreparedImage = ({ className, name, value, color, onChange, ...otherProps }) => {
    let onClick;
    const { useEffect, useReducer } = wp.element;
    const { getURLparam, setURLparam, setURLparams, removeURLparam } = Catpow.util;
    const [state, dispatch] = useReducer((state2, action) => {
      const newState = { ...state2 };
      switch (action.type) {
        case "nextPage":
          newState.page--;
          break;
        case "prevPage":
          newState.page++;
          break;
        case "gotoPage":
          newState.page = action.page;
          break;
        case "update":
          if (action.images) {
            newState.images = action.images;
            const bareURL = removeURLparam(value, "c");
            newState.image = action.images.find((image) => image.url === bareURL);
          }
          if (action.image) {
            newState.image = action.image;
          }
      }
      return newState;
    }, { page: 0, images: null, image: null });
    CP.cache.PreparedImage = CP.cache.PreparedImage || {};
    useEffect(() => {
      if (state.images === null) {
        if (CP.cache.PreparedImage[name]) {
          dispatch({ type: "update", images: CP.cache.PreparedImage[name] });
        } else {
          wp.apiFetch({ path: "cp/v1/images/" + name }).then((images) => {
            CP.cache.PreparedImage[name] = images;
            dispatch({ type: "update", images });
          });
        }
      }
    }, [state.images]);
    useEffect(() => {
      onChange({ ...state.image, url: setURLparams(state.image ? state.image.url : value, { c: color, theme: wpinfo.theme }) });
    }, [state.image]);
    if (state.images === null) {
      return false;
    }
    return /* @__PURE__ */ wp.element.createElement("ul", { className: "selectPreparedImage " + name + " " + className, ...otherProps }, state.images.map((image) => {
      const url = setURLparams(image.url, { c: color, theme: wpinfo.theme });
      return /* @__PURE__ */ wp.element.createElement("li", { className: "item " + (value == url ? "active" : ""), key: image.url }, /* @__PURE__ */ wp.element.createElement(
        "img",
        {
          src: url,
          alt: image.alt,
          onClick: () => dispatch({ type: "update", image })
        }
      ));
    }));
  };

  // ../blocks/_init/init/SelectPreparedImageSet.jsx
  CP.SelectPreparedImageSet = ({ className, name, value, color, onChange, ...otherProps }) => {
    let onClick;
    const { getURLparam, setURLparam, setURLparams, removeURLparam } = Catpow.util;
    const [state, dispatch] = wp.element.useReducer((state2, action) => {
      switch (action.type) {
        case "update":
          if (action.imagesets) {
            state2.imagesets = action.imagesets;
            const bareURL = removeURLparam(value, "c");
            for (const key in state2.imagesets) {
              if (state2.imagesets[key].url === bareURL) {
                state2.imageset = state2.imagesets[key];
                break;
              }
            }
          }
          if (action.imageset) {
            state2.imageset = action.imageset;
          }
          if (state2.imageset) {
            onChange(state2.imageset.map((item) => {
              return { ...item, url: setURLparams(item.url, { c: color, theme: wpinfo.theme }) };
            }));
          }
      }
      return { ...state2 };
    }, { page: 0, imagesets: null, imageset: null });
    CP.cache.PreparedImageSets = CP.cache.PreparedImageSets || {};
    if (state.imagesets === null) {
      if (CP.cache.PreparedImageSets[name]) {
        dispatch({ type: "update", imagesets: CP.cache.PreparedImageSets[name] });
      } else {
        wp.apiFetch({ path: "cp/v1/imageset/" + name }).then((imagesets) => {
          CP.cache.PreparedImageSets[name] = imagesets;
          dispatch({ type: "update", imagesets });
        });
      }
      return false;
    }
    return /* @__PURE__ */ wp.element.createElement("ul", { className: "selectPreparedImageSet " + name + " " + className, ...otherProps }, Object.keys(state.imagesets).map((key) => {
      const imageset = state.imagesets[key];
      const url = setURLparams(imageset[0].url, { c: color, theme: wpinfo.theme });
      return /* @__PURE__ */ wp.element.createElement("li", { className: "item " + (value == url ? "active" : ""), key }, /* @__PURE__ */ wp.element.createElement(
        "img",
        {
          src: url,
          alt: imageset[0].alt,
          onClick: () => dispatch({ type: "update", imageset })
        }
      ));
    }));
  };

  // ../blocks/_init/init/InputIcon.jsx
  CP.InputIcon = (props) => {
    return wp.element.createElement(CP[wp.hooks.applyFilters("catpow.IconComponent", "StandardIcon")].Input, props);
  };

  // ../blocks/_init/init/OutputIcon.jsx
  CP.OutputIcon = (props) => {
    return wp.element.createElement(CP[wp.hooks.applyFilters("catpow.IconComponent", "StandardIcon")].Output, props);
  };

  // ../blocks/_init/init/StandardIcon.jsx
  CP.StandardIcon = {
    Input: (props) => {
      const { item, prm, save } = props;
      prm.keys = prm.keys || {};
      prm.keys.src = prm.keys.src || prm.input + "Src";
      prm.keys.alt = prm.keys.alt || prm.input + "Alt";
      return /* @__PURE__ */ wp.element.createElement(
        CP.SelectPreparedImage,
        {
          name: prm.input,
          value: item[prm.keys.src],
          color: prm.color || CP.getColor({ attr: item }) || 0,
          onChange: (image) => {
            save({
              [prm.keys.src]: image.url,
              [prm.keys.alt]: image.alt
            });
          }
        }
      );
    },
    Output: (props) => {
      const { item } = props;
      return /* @__PURE__ */ wp.element.createElement("span", { className: "icon" }, /* @__PURE__ */ wp.element.createElement("img", { src: item.iconSrc, alt: item.iconAlt }));
    }
  };

  // ../blocks/_init/init/DataInputTable.jsx
  CP.DataInputTable = (props) => {
    const { cols, value, onChange } = props;
    const { useCallback, useMemo } = wp.element;
    const el = wp.element.createElement;
    const Row = useCallback((props2) => {
      const { cols: cols2, value: value2, onChange: onChange2 } = props2;
      return /* @__PURE__ */ wp.element.createElement("tr", { className: "DataInputTable__body__row" }, Object.keys(cols2).map((c) => /* @__PURE__ */ wp.element.createElement("td", { className: "DataInputTable__body__row__cell", key: c }, /* @__PURE__ */ wp.element.createElement(
        CP.DynamicInput,
        {
          value: value2[c],
          onChange: (val) => {
            value2[c] = val;
            onChange2(value2);
          },
          param: cols2[c]
        }
      ))));
    }, []);
    const defaultRowValues = useMemo(() => {
      const rowValue = {};
      Object.keys(cols).forEach((c) => {
        rowValue[c] = cols[c].default || "";
      });
      return [rowValue];
    }, [cols]);
    const colsWithoutLabel = useMemo(() => {
      const colsWithoutLabel2 = {};
      Object.keys(cols).forEach((c) => {
        const { label, ...otherParams } = cols[c];
        colsWithoutLabel2[c] = otherParams;
      });
      return colsWithoutLabel2;
    }, [cols]);
    return /* @__PURE__ */ wp.element.createElement("table", { className: "DataInputTable" }, /* @__PURE__ */ wp.element.createElement("thead", { className: "DataInputTable__head" }, /* @__PURE__ */ wp.element.createElement("tr", { className: "DataInputTable__head__row" }, Object.keys(cols).map((c) => /* @__PURE__ */ wp.element.createElement("th", { className: "DataInputTable__head__row__cell", key: c }, cols[c].label || c)))), /* @__PURE__ */ wp.element.createElement("tbody", { className: "DataInputTable__body" }, (value || defaultRowValues).map((rowValue, index) => /* @__PURE__ */ wp.element.createElement(
      Row,
      {
        cols: colsWithoutLabel,
        value: rowValue,
        onChange: (rowValue2) => {
          if (!value) {
            onChange([rowValue2]);
            return;
          }
          value[index] = rowValue2;
          onChange(value);
        },
        onDelete: () => {
          if (!value) {
            onChange([]);
            return;
          }
          value.splice(index, 1);
          onChange(value);
        },
        onClone: () => {
          if (!value) {
            onChange([defaultRowValues]);
            return;
          }
          value.splice(index, 0, JSON.parse(JSON.stringify(rowValue)));
          onChange(value);
        },
        key: index
      }
    ))));
  };

  // ../blocks/_init/init/DynamicInput.jsx
  CP.DynamicInput = (props) => {
    const { useMemo } = wp.element;
    const { RadioControl, RangeControl, SelectControl, TextControl, TextareaControl, ToggleControl } = wp.components;
    const { param, value, onChange } = props;
    const type = param.type || param.input || "text";
    const { options } = useMemo(() => {
      if (!param.options && !param.values) {
        return {};
      }
      return CP.parseSelections(param.options || param.values);
    }, [param.options, param.values]);
    switch (type) {
      case "radio": {
        return /* @__PURE__ */ wp.element.createElement(
          RadioControl,
          {
            label: param.label || null,
            onChange,
            selected: value,
            options
          }
        );
      }
      case "select": {
        return /* @__PURE__ */ wp.element.createElement(
          SelectControl,
          {
            label: param.label || null,
            onChange,
            value,
            options
          }
        );
      }
      case "buttons": {
        return /* @__PURE__ */ wp.element.createElement(
          CP.SelectButtons,
          {
            label: param.label || null,
            onChange,
            selected: value,
            options
          }
        );
      }
      case "gridbuttons": {
        return /* @__PURE__ */ wp.element.createElement(
          CP.SelectGridButtons,
          {
            label: param.label || null,
            onChange,
            selected: value,
            options
          }
        );
      }
      case "range": {
        if (!param.coef) {
          param.coef = 1;
        }
        return /* @__PURE__ */ wp.element.createElement(
          RangeControl,
          {
            label: param.label || null,
            onChange: (value2) => onChange(value2 * param.coef),
            value: value / param.coef,
            min: param.min || 0,
            max: param.max || 10,
            step: param.step || 1
          }
        );
      }
      case "bool": {
        return /* @__PURE__ */ wp.element.createElement(
          ToggleControl,
          {
            label: param.label || null,
            checked: value,
            onChange
          }
        );
      }
      case "data": {
        return /* @__PURE__ */ wp.element.createElement(
          CP.DataInputTable,
          {
            label: param.label || null,
            cols: param.cols,
            value,
            onChange
          }
        );
      }
      case "textarea": {
        return /* @__PURE__ */ wp.element.createElement(
          TextareaControl,
          {
            label: param.label || null,
            value,
            onChange
          }
        );
      }
      default: {
        return /* @__PURE__ */ wp.element.createElement(
          TextControl,
          {
            label: param.label || null,
            type: param.type,
            value,
            onChange,
            list: param.list && CP.getDataListId(param.list, param.values)
          }
        );
      }
    }
  };

  // ../blocks/_init/init/Item.jsx
  CP.Item = (props) => {
    const { tag, items, itemsKey, index, set, attr, triggerClasses, children } = props;
    let { itemClasses } = props;
    if (!items[index].classes) {
      items[index].classes = "item";
    } else if (items[index].classes.search(/\bitem\b/) === -1) {
      items[index].classes += " item";
    }
    let classes = items[index].classes;
    if (props.className) {
      classes += " " + props.className;
    }
    const { currentItemIndex = 0 } = attr;
    const isSelected = props.isSelected === void 0 ? index == currentItemIndex : props.isSelected;
    return wp.element.createElement(
      tag,
      {
        className: classes,
        "data-index": index,
        "data-refine-cond": items[index]["cond"],
        onKeyDown: (e) => {
          if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
              case "s":
                CP.saveItem(props);
                e.preventDefault();
                break;
              case "d":
                CP.cloneItem(props);
                e.preventDefault();
                break;
              case "Backspace":
                CP.deleteItem(props);
                e.preventDefault();
                break;
              case "ArrowUp":
                CP.upItem(props);
                e.preventDefault();
                break;
              case "ArrowDown":
                CP.downItem(props);
                e.preventDefault();
                break;
            }
          }
        },
        onClick: (e) => {
          set({ currentItemIndex: index });
        }
      },
      /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, children, isSelected && /* @__PURE__ */ wp.element.createElement("div", { className: "itemControl" }, /* @__PURE__ */ wp.element.createElement("div", { className: "btn delete", onClick: (e) => CP.deleteItem(props) }), /* @__PURE__ */ wp.element.createElement("div", { className: "btn clone", onClick: (e) => CP.cloneItem(props) }), /* @__PURE__ */ wp.element.createElement("div", { className: "btn up", onClick: (e) => CP.upItem(props) }), /* @__PURE__ */ wp.element.createElement("div", { className: "btn down", onClick: (e) => CP.downItem(props) })))
    );
  };

  // ../blocks/_init/init/ItemControlInfoPanel.jsx
  CP.ItemControlInfoPanel = () => {
    const { PanelBody } = wp.components;
    return /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "\u64CD\u4F5C", initialOpen: false, icon: "info" }, /* @__PURE__ */ wp.element.createElement("table", null, /* @__PURE__ */ wp.element.createElement("tbody", null, /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("th", null, "\u2318/Ctrl + S"), /* @__PURE__ */ wp.element.createElement("td", null, "\u4FDD\u5B58")), /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("th", null, "\u2318/Ctrl + D"), /* @__PURE__ */ wp.element.createElement("td", null, "\u8907\u88FD")), /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("th", null, "\u2318/Ctrl + delete"), /* @__PURE__ */ wp.element.createElement("td", null, "\u524A\u9664")), /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("th", null, "\u2318/Ctrl + \u2191"), /* @__PURE__ */ wp.element.createElement("td", null, "\u524D\u306E\u30A2\u30A4\u30C6\u30E0\u3068\u5165\u308C\u66FF\u3048")), /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("th", null, "\u2318/Ctrl + \u2193"), /* @__PURE__ */ wp.element.createElement("td", null, "\u6B21\u306E\u30A2\u30A4\u30C6\u30E0\u3068\u5165\u308C\u66FF\u3048")))));
  };

  // ../blocks/_init/init/SelectClassPanel.jsx
  CP.SelectClassPanelContext = wp.element.createContext({});
  CP.SelectClassPanel = (props) => {
    const { Fragment, useMemo, useCallback, useContext, createElement: el } = wp.element;
    const { __: __2 } = wp.i18n;
    const { PanelBody, CheckboxControl, RadioControl, SelectControl, TextareaControl, TextControl, ColorPicker, __experimentalGradientPicker: GradientPicker } = wp.components;
    const { classKey = "classes", items, index, subItemsKey, subIndex: subIndex2, set, attr, triggerClasses } = wp.hooks.applyFilters("catpow.SelectClassPanelProps", props);
    let { itemsKey = items ? "items" : null, itemClasses } = props;
    const selectiveClasses = useMemo(() => {
      if (!triggerClasses || !triggerClasses.item) {
        return props.selectiveClasses;
      }
      const blockStates = CP.wordsToFlags(attr.classes);
      return triggerClasses.item[Object.keys(triggerClasses.item).find((value) => blockStates[value])];
    }, [props.selectiveClasses, triggerClasses]);
    const { styleDatas } = attr;
    const item = useMemo(() => {
      if (!items) {
        return attr;
      }
      if (!items[index]) {
        return false;
      }
      if (subItemsKey) {
        return items[index][subItemsKey][subIndex2];
      }
      return items[index];
    }, [attr, items, index, subItemsKey, subIndex2]);
    const states = useMemo(() => CP.wordsToFlags(item[classKey]), [item[classKey]]);
    const save = useCallback((data) => {
      if (items) {
        Object.assign(item, data);
        set({ [itemsKey]: JSON.parse(JSON.stringify(items)) });
      } else {
        set(data);
      }
    }, [set, index, items, itemsKey]);
    const saveClasses = useCallback(() => {
      save({ [classKey]: CP.flagsToWords(states) });
    }, [save, classKey, states]);
    const saveCss = useCallback((cssKey) => {
      set({ [cssKey]: CP.createStyleCodeWithMediaQuery(styleDatas[cssKey]) });
    }, [set, styleDatas]);
    const SelectClass = useCallback(({ prm }) => {
      const { props: props2, item: item2, states: states2, save: save2, saveClasses: saveClasses2, saveCss: saveCss2 } = useContext(CP.SelectClassPanelContext);
      if (prm.hasOwnProperty("cond")) {
        if (prm.cond === false) {
          return false;
        }
        if (Array.isArray(prm.cond) && prm.cond.some((className) => !states2[className])) {
          return false;
        }
        if (typeof prm.cond === "string" && !states2[prm.cond]) {
          return false;
        }
        if (typeof prm.cond === "function" && !prm.cond(states2, props2)) {
          return false;
        }
      }
      let rtn = [];
      if (prm.filter && props2.filters && props2.filters[prm.filter]) {
        props2.filters[prm.filter](prm);
      }
      if (prm.keys) {
        if (props2.items) {
          prm.keys.items = prm.keys.items || props2.itemsKey;
          if (subItemsKey) {
            prm.keys.subItems = prm.keys.subItems || subItemsKey;
          }
        }
      }
      if (prm.json) {
        if (prm.input) {
          switch (prm.input) {
            case "select":
            case "buttons":
            case "gridbuttons":
            case "bool":
            case "range":
            case "text":
            case "textarea": {
              rtn.push(
                /* @__PURE__ */ wp.element.createElement(
                  CP.DynamicInput,
                  {
                    param: prm,
                    value: JSON.parse(props2.attr[prm.json])[prm.key],
                    onChange: (val) => {
                      CP.setJsonValue(props2, prm.json, prm.key, val);
                      if (prm.effect) {
                        prm.effect(val, states2, props2);
                      }
                    }
                  }
                )
              );
              break;
            }
            case "flag": {
              let value = CP.getJsonValue(props2, prm.json, prm.key) || 0;
              if (prm.label) {
                rtn.push(/* @__PURE__ */ wp.element.createElement("h5", null, prm.label));
              }
              Object.keys(prm.values).forEach((key) => {
                rtn.push(
                  /* @__PURE__ */ wp.element.createElement(
                    CheckboxControl,
                    {
                      label: key,
                      onChange: (flag) => {
                        value |= prm.values[key];
                        if (!flag) {
                          value ^= prm.values[key];
                        }
                        CP.setJsonValue(props2, prm.json, prm.key, value);
                      },
                      checked: value & prm.values[key],
                      key
                    }
                  )
                );
              });
              break;
            }
            case "color": {
              if (prm.label) {
                rtn.push(/* @__PURE__ */ wp.element.createElement("h5", null, prm.label));
              }
              rtn.push(
                /* @__PURE__ */ wp.element.createElement(
                  ColorPicker,
                  {
                    color: CP.getJsonValue(props2, prm.json, prm.key) || "#FFFFFF",
                    onChangeComplete: (value) => {
                      CP.setJsonValue(props2, prm.json, prm.key, value.hex);
                    }
                  }
                )
              );
              break;
            }
            case "colors": {
              if (prm.label) {
                rtn.push(/* @__PURE__ */ wp.element.createElement("h5", null, prm.label));
              }
              rtn.push(
                /* @__PURE__ */ wp.element.createElement(
                  CP.SelectColors,
                  {
                    colors: CP.getJsonValue(props2, prm.json, prm.key) || [{ h: "40", s: "80%", l: "50%" }, { h: "60", s: "80%", l: "50%" }],
                    onChange: (colors) => {
                      CP.setJsonValue(props2, prm.json, prm.key, colors);
                    }
                  }
                )
              );
              break;
            }
            case "gradient": {
              if (prm.label) {
                rtn.push(/* @__PURE__ */ wp.element.createElement("h5", null, prm.label));
              }
              rtn.push(
                /* @__PURE__ */ wp.element.createElement(
                  GradientPicker,
                  {
                    onChange: (value) => {
                      console.log(CP.parseGradientStyleValue(value));
                    }
                  }
                )
              );
              break;
            }
          }
          switch (prm.input) {
            case "select":
            case "buttons":
            case "gridbuttons": {
              if (prm.sub) {
                if (prm.sub[JSON.parse(props2.attr[prm.json])[prm.key]]) {
                  let sub = [];
                  prm.sub[JSON.parse(props2.attr[prm.json])[prm.key]].forEach((prm2) => {
                    sub.push(el(SelectClass, { prm: prm2 }));
                  });
                  rtn.push(/* @__PURE__ */ wp.element.createElement("div", { className: "sub" }, sub));
                }
              }
              break;
            }
            case "bool": {
              if (prm.sub) {
                if (JSON.parse(props2.attr[prm.json])[prm.key]) {
                  let sub = [];
                  prm.sub.forEach((prm2) => {
                    sub.push(el(SelectClass, { prm: prm2 }));
                  });
                  rtn.push(/* @__PURE__ */ wp.element.createElement("div", { className: "sub" }, sub));
                }
              }
              break;
            }
          }
        } else if (_.isObject(prm.values)) {
          let { options: options2, values: values2 } = CP.parseSelections(prm.values);
          rtn.push(
            /* @__PURE__ */ wp.element.createElement(
              SelectControl,
              {
                label: prm.label,
                value: CP.getJsonValue(props2, prm.json, prm.key),
                onChange: (val) => {
                  CP.setJsonValue(props2, prm.json, prm.key, val);
                },
                options: options2
              }
            )
          );
          if (prm.sub) {
            let currentValue = CP.getJsonValue(props2, prm.json, prm.key);
            if (currentValue && prm.sub[currentValue]) {
              let sub = [];
              prm.sub[currentValue].forEach((prm2) => {
                sub.push(el(SelectClass, { prm: prm2 }));
              });
              rtn.push(/* @__PURE__ */ wp.element.createElement("div", { className: "sub" }, sub));
            }
          }
        } else if (prm.values) {
          rtn.push(
            /* @__PURE__ */ wp.element.createElement(
              CheckboxControl,
              {
                label: prm.label,
                onChange: () => {
                  CP.switchJsonValue(props2, prm.json, prm.key, prm.values);
                },
                checked: CP.hasJsonValue(props2, prm.json, prm.key, prm.values)
              }
            )
          );
          if (prm.sub) {
            if (CP.getJsonValue(props2, prm.json, prm.key)) {
              let sub = [];
              prm.sub.forEach((prm2) => {
                sub.push(el(SelectClass, { prm: prm2 }));
              });
              rtn.push(/* @__PURE__ */ wp.element.createElement("div", { className: "sub" }, sub));
            }
          }
        } else {
          rtn.push(
            /* @__PURE__ */ wp.element.createElement(
              TextControl,
              {
                label: prm.label,
                value: JSON.parse(props2.attr[prm.json])[prm.key],
                onChange: (val) => {
                  CP.setJsonValue(props2, prm.json, prm.key, val);
                }
              }
            )
          );
        }
      } else if (prm.css) {
        const { device = "pc" } = prm;
        const media = CP.getMediaQueryKeyForDevice(device);
        const sel = typeof prm.sel === "function" ? prm.sel(props2) : prm.sel;
        styleDatas[prm.css] = styleDatas[prm.css] || {};
        styleDatas[prm.css][media] = styleDatas[prm.css][media] || {};
        styleDatas[prm.css][media][sel] = styleDatas[prm.css][media][sel] || {};
        const tgt = styleDatas[prm.css][media][sel];
        if (prm.input) {
          switch (prm.input) {
            case "border":
              rtn.push(
                /* @__PURE__ */ wp.element.createElement(
                  CP.SelectPreparedImage,
                  {
                    name: "border",
                    value: CP.getUrlInStyleCode(tgt["border-image"]),
                    color: prm.color || 0,
                    onChange: (image) => {
                      if (!image.conf) {
                        return;
                      }
                      const { slice, width, repeat } = image.conf;
                      tgt["border-style"] = "solid";
                      tgt["border-image"] = "url(" + image.url + ") fill " + slice + " / " + width + " " + repeat;
                      saveCss2(prm.css);
                    }
                  }
                )
              );
              break;
            case "pattern":
              rtn.push(
                /* @__PURE__ */ wp.element.createElement(
                  CP.SelectPreparedImage,
                  {
                    name: "pattern",
                    value: CP.getUrlInStyleCode(tgt["background-image"]),
                    color: prm.color || 0,
                    onChange: (image) => {
                      if (!image.conf) {
                        return;
                      }
                      const { size, width, height, repeat, x, y } = image.conf;
                      tgt["background-image"] = "url(" + image.url + ")";
                      if (width && height) {
                        tgt["background-size"] = width + "px " + height + "px";
                      } else if (size) {
                        tgt["background-size"] = CP.translateCssVal("background-size", size);
                      } else {
                        delete tgt["background-size"];
                      }
                      if (repeat) {
                        tgt["background-repeat"] = CP.translateCssVal("background-repeat", repeat);
                      } else {
                        delete tgt["background-repeat"];
                      }
                      if (x && y) {
                        tgt["background-position"] = x + "% " + y + "%";
                      } else {
                        delete tgt["background-position"];
                      }
                      saveCss2(prm.css);
                    }
                  }
                )
              );
              break;
            case "frame":
              rtn.push(
                /* @__PURE__ */ wp.element.createElement(
                  CP.SelectPreparedImageSet,
                  {
                    name: "frame",
                    value: CP.getUrlInStyleCode(tgt["border-image"]),
                    color: prm.color || 0,
                    onChange: (imageset) => {
                      imageset.forEach((image) => {
                        if (!image.conf) {
                          return;
                        }
                        const { device: device2, slice, width, repeat } = image.conf;
                        const media2 = CP.getMediaQueryKeyForDevice(device2);
                        styleDatas[prm.css][media2] = styleDatas[prm.css][media2] || {};
                        styleDatas[prm.css][media2][sel] = styleDatas[prm.css][media2][sel] || {};
                        styleDatas[prm.css][media2][sel]["border-style"] = "solid";
                        styleDatas[prm.css][media2][sel]["border-image"] = "url(" + image.url + ") fill " + slice + " / " + width + " " + repeat;
                      });
                      saveCss2(prm.css);
                    }
                  }
                )
              );
              break;
          }
        } else {
          rtn.push(
            /* @__PURE__ */ wp.element.createElement(
              TextControl,
              {
                label: prm.label,
                value: tgt[prm.attr],
                onChange: (val) => {
                  tgt[prm.attr] = val;
                  saveCss2(prm.css);
                }
              }
            )
          );
        }
      } else {
        if (prm === "color") {
          rtn.push(
            /* @__PURE__ */ wp.element.createElement(
              CP.SelectColorClass,
              {
                label: __2("\u8272", "catpow"),
                selected: Object.keys(states2).find((key) => CP.colorClassPattern.test(key)),
                onChange: (color) => {
                  CP.filterFlags(states2, (key) => !CP.colorClassPattern.test(key));
                  states2[color] = true;
                  if (!props2.items) {
                    set({ color: color.substr(5) });
                  }
                  saveClasses2();
                }
              }
            )
          );
        } else if (prm === "pattern") {
          rtn.push(
            /* @__PURE__ */ wp.element.createElement(
              CP.SelectPatternClass,
              {
                label: __2("\u30D1\u30BF\u30FC\u30F3", "catpow"),
                set: props2.set,
                attr: props2.attr,
                selected: Object.keys(states2).find((key) => /^pattern\d+/.test(key)),
                onChange: (pattern) => {
                  CP.filterFlags(states2, (key) => !/^pattern\d+/.test(key));
                  states2[pattern] = true;
                  saveClasses2();
                }
              }
            )
          );
        } else if (prm === "cond") {
          rtn.push(
            /* @__PURE__ */ wp.element.createElement(
              TextareaControl,
              {
                label: __2("\u8868\u793A\u6761\u4EF6", "catpow"),
                value: item2["cond"],
                onChange: (cond) => save2({ cond })
              }
            )
          );
        } else if (prm === "event") {
          const EventInputs = useMemo(() => wp.hooks.applyFilters("catpow.EventInputs", [], { item: item2, save: save2 }), [item2, save2]);
          rtn.push(...EventInputs);
        } else if (prm.input) {
          switch (prm.input) {
            case "select":
            case "buttons":
            case "gridbuttons":
            case "bool":
            case "range":
            case "text":
            case "textarea": {
              rtn.push(
                /* @__PURE__ */ wp.element.createElement(
                  CP.DynamicInput,
                  {
                    param: prm,
                    value: item2[prm.key],
                    onChange: (val) => {
                      save2({ [prm.key]: val });
                      if (prm.effect) {
                        prm.effect(val, states2, props2);
                      }
                    }
                  }
                )
              );
              break;
            }
            case "image": {
              if (prm.label) {
                rtn.push(/* @__PURE__ */ wp.element.createElement("h5", null, prm.label));
              }
              rtn.push(
                /* @__PURE__ */ wp.element.createElement(
                  CP.SelectResponsiveImage,
                  {
                    index: props2.index,
                    set: props2.set,
                    attr: props2.attr,
                    keys: prm.keys,
                    size: prm.size,
                    sizes: prm.sizes,
                    device: prm.device,
                    devices: prm.devices,
                    isTemplate: prm.isTemplate
                  }
                )
              );
              break;
            }
            case "picture": {
              if (prm.label) {
                rtn.push(/* @__PURE__ */ wp.element.createElement("h5", null, prm.label));
              }
              rtn.push(
                /* @__PURE__ */ wp.element.createElement(
                  CP.SelectPictureSources,
                  {
                    index: props2.index,
                    set: props2.set,
                    attr: props2.attr,
                    keys: prm.keys,
                    sizes: prm.sizes,
                    devices: prm.devices,
                    isTemplate: prm.isTemplate
                  }
                )
              );
              break;
            }
            case "position": {
              rtn.push(
                /* @__PURE__ */ wp.element.createElement(
                  CP.SelectPositionClass,
                  {
                    set: props2.set,
                    attr: props2.attr,
                    label: prm.label,
                    key: prm.key,
                    help: prm.help,
                    disable: prm.disable,
                    itemsKey,
                    index: props2.index
                  }
                )
              );
            }
            case "icon": {
              if (prm.label) {
                rtn.push(/* @__PURE__ */ wp.element.createElement("h5", null, prm.label));
              }
              rtn.push(/* @__PURE__ */ wp.element.createElement(CP.InputIcon, { prm, item: item2, save: save2 }));
              break;
            }
            case "symbol":
            case "pattern": {
              prm.keys = prm.keys || {};
              prm.keys.src = prm.keys.src || prm.input + "Src";
              prm.keys.alt = prm.keys.alt || prm.input + "Alt";
              if (prm.label) {
                rtn.push(/* @__PURE__ */ wp.element.createElement("h5", null, prm.label));
              }
              rtn.push(
                /* @__PURE__ */ wp.element.createElement(
                  CP.SelectPreparedImage,
                  {
                    name: prm.input,
                    value: item2[prm.keys.src],
                    color: prm.color || CP.getColor({ attr: item2 }) || 0,
                    onChange: (image) => {
                      save2({
                        [prm.keys.src]: image.url,
                        [prm.keys.alt]: image.alt
                      });
                    }
                  }
                )
              );
              break;
            }
          }
          switch (prm.input) {
            case "select":
            case "buttons":
            case "gridbuttons": {
              if (prm.sub && prm.sub[item2[prm.key]]) {
                let sub = [];
                prm.sub[item2[prm.key]].forEach((prm2) => {
                  sub.push(el(SelectClass, { prm: prm2 }));
                });
                rtn.push(/* @__PURE__ */ wp.element.createElement("div", { className: "sub" }, sub));
              }
              break;
            }
            case "bool": {
              if (prm.sub && item2[prm.key]) {
                let sub = [];
                prm.sub.forEach((prm2) => {
                  sub.push(el(SelectClass, { prm: prm2 }));
                });
                rtn.push(/* @__PURE__ */ wp.element.createElement("div", { className: "sub" }, sub));
              }
              break;
            }
          }
        } else if (_.isObject(prm.values)) {
          let subClasses = CP.getSubClasses(prm);
          let bindClasses = CP.getBindClasses(prm);
          var { options, values } = CP.parseSelections(prm.values);
          const currentClass = values.find((value) => states2[value]);
          let onChangeCB = (newClass) => {
            if (currentClass) {
              states2[currentClass] = false;
              let currentSels = [];
              if (subClasses[currentClass]) {
                currentSels = currentSels.concat(subClasses[currentClass]);
              }
              if (bindClasses[currentClass]) {
                currentSels = currentSels.concat(bindClasses[currentClass]);
              }
              let newSels = [];
              if (subClasses[newClass]) {
                newSels = newSels.concat(subClasses[newClass]);
              }
              if (bindClasses[newClass]) {
                newSels = newSels.concat(bindClasses[newClass]);
              }
              currentSels.forEach((value) => {
                if (!newSels.includes(value)) {
                  states2[value] = false;
                }
              });
            }
            bindClasses[newClass].forEach((value) => {
              states2[value] = true;
            });
            states2[newClass] = true;
            saveClasses2();
            if (prm.effect) {
              prm.effect(currentClass, newClass, states2, props2);
            }
          };
          switch (prm.type) {
            case "radio": {
              rtn.push(
                /* @__PURE__ */ wp.element.createElement(
                  RadioControl,
                  {
                    label: prm.label,
                    onChange: onChangeCB,
                    selected: currentClass,
                    options
                  }
                )
              );
              break;
            }
            case "buttons": {
              rtn.push(
                /* @__PURE__ */ wp.element.createElement(
                  CP.SelectButtons,
                  {
                    label: prm.label,
                    onChange: onChangeCB,
                    selected: currentClass,
                    options
                  }
                )
              );
              break;
            }
            case "gridbuttons": {
              rtn.push(
                /* @__PURE__ */ wp.element.createElement(
                  CP.SelectGridButtons,
                  {
                    label: prm.label,
                    onChange: onChangeCB,
                    selected: currentClass,
                    options
                  }
                )
              );
              break;
            }
            default: {
              rtn.push(
                /* @__PURE__ */ wp.element.createElement(
                  SelectControl,
                  {
                    label: prm.label,
                    onChange: onChangeCB,
                    value: currentClass,
                    options
                  }
                )
              );
            }
          }
          if (prm.sub) {
            if (currentClass && prm.sub[currentClass]) {
              let sub = [];
              prm.sub[currentClass].forEach((prm2, index2) => {
                sub.push(/* @__PURE__ */ wp.element.createElement(Fragment, { key: index2 }, el(SelectClass, { prm: prm2 })));
              });
              rtn.push(/* @__PURE__ */ wp.element.createElement("div", { className: "sub" }, sub));
            }
          }
        } else {
          rtn.push(
            /* @__PURE__ */ wp.element.createElement(
              CheckboxControl,
              {
                label: prm.label,
                onChange: () => {
                  states2[prm.values] = !states2[prm.values];
                  saveClasses2();
                },
                checked: !!states2[prm.values]
              }
            )
          );
          if (prm.sub) {
            if (states2[prm.values]) {
              let sub = [];
              prm.sub.forEach((prm2, index2) => {
                sub.push(/* @__PURE__ */ wp.element.createElement(Fragment, { key: index2 }, el(SelectClass, { prm: prm2 })));
              });
              rtn.push(/* @__PURE__ */ wp.element.createElement("div", { className: "sub" }, sub));
            }
          }
        }
      }
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, rtn.map((item3, index2) => /* @__PURE__ */ wp.element.createElement(Fragment, { key: index2 }, item3)));
    }, []);
    if (!item || !selectiveClasses) {
      return false;
    }
    return /* @__PURE__ */ wp.element.createElement(PanelBody, { title: props.title, initialOpen: props.initialOpen || false, icon: props.icon }, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanelContext.Provider, { value: { props, item, states, save, saveClasses, saveCss } }, selectiveClasses.map((prm, index2) => /* @__PURE__ */ wp.element.createElement(Fragment, { key: index2 }, el(SelectClass, { prm }))), props.children));
  };

  // ../blocks/_init/init/AlignClassToolbar.jsx
  CP.AlignClassToolbar = (props) => {
    const { BlockAlignmentToolbar } = wp.blockEditor;
    const aligns = ["left", "center", "right"];
    return /* @__PURE__ */ wp.element.createElement(
      BlockAlignmentToolbar,
      {
        value: CP.getSelectiveClass(props, aligns),
        controls: props.aligns || aligns,
        onChange: (align) => {
          CP.switchSelectiveClass(props, aligns, align, props.key);
        }
      }
    );
  };

  // ../blocks/_init/init/VerticalAlignClassToolbar.jsx
  CP.VerticalAlignClassToolbar = (props) => {
    const { BlockVerticalAlignmentToolbar } = wp.blockEditor;
    const aligns = ["top", "center", "bottom"];
    return /* @__PURE__ */ wp.element.createElement(
      BlockVerticalAlignmentToolbar,
      {
        value: CP.getSelectiveClass(props, aligns),
        controls: props.aligns || aligns,
        onChange: (align) => {
          CP.switchSelectiveClass(props, aligns, align, props.key);
        }
      }
    );
  };

  // ../blocks/_init/init/SelectColorClass.jsx
  CP.SelectColorClass = (props) => {
    const { BaseControl } = wp.components;
    const { label, help } = props;
    return /* @__PURE__ */ wp.element.createElement(BaseControl, { label, help }, /* @__PURE__ */ wp.element.createElement(
      CP.SelectThemeColor,
      {
        onChange: props.onChange,
        selected: props.selected
      }
    ));
  };

  // ../blocks/_init/init/SelectPatternClass.jsx
  CP.SelectPatternClass = (props) => {
    const { BaseControl } = wp.components;
    const { label, help, selected, onChange } = props;
    var items = Array.from(Array(6), (v, i) => {
      var classes = "bgPattern" + i;
      const value = "pattern" + i;
      if (value == selected) {
        classes += " active";
      }
      return /* @__PURE__ */ wp.element.createElement(
        "li",
        {
          className: classes,
          onClick: () => onChange(value),
          key: value
        },
        " "
      );
    });
    return /* @__PURE__ */ wp.element.createElement(BaseControl, { label, help }, /* @__PURE__ */ wp.element.createElement("ul", { className: "selectPattern" }, items));
  };

  // ../blocks/_init/init/SelectPositionClass.jsx
  CP.SelectPositionClass = (props) => {
    const { BaseControl } = wp.components;
    const rows = [
      ["topLeft", "top", "topRight"],
      ["left", "center", "right"],
      ["bottomLeft", "bottom", "bottomRight"]
    ];
    const values = _.flatten(rows);
    const { label, help, itemsKey, index, disable } = props;
    let value = itemsKey ? CP.getItemSelectiveClass(props, values) : CP.getSelectiveClass(props, values);
    return /* @__PURE__ */ wp.element.createElement(BaseControl, { label, help }, /* @__PURE__ */ wp.element.createElement("table", { className: "selectPosition" }, /* @__PURE__ */ wp.element.createElement("tbody", null, rows.map((cols, index2) => /* @__PURE__ */ wp.element.createElement("tr", { key: index2 }, cols.map((col) => {
      var isChecked = value == col;
      if (disable && disable.includes(col)) {
        return /* @__PURE__ */ wp.element.createElement("td", { className: "disable", key: col }, " ");
      }
      return /* @__PURE__ */ wp.element.createElement(
        "td",
        {
          className: isChecked ? "active" : "",
          onClick: () => {
            if (itemsKey) {
              CP.switchItemSelectiveClass(props, values, col, props.key);
            } else {
              CP.switchSelectiveClass(props, values, col, props.key);
            }
          },
          key: col
        },
        " "
      );
    }))))));
  };

  // ../blocks/_init/init/ImporterCSVPanel.jsx
  CP.ImporterCSVPanel = (props) => {
    const { PanelBody, FormFileUpload } = wp.components;
    let reader = new FileReader();
    reader.onload = (e) => {
      props.callback(CP.parseCSV(e.target.result));
    };
    return /* @__PURE__ */ wp.element.createElement(PanelBody, { title: props.title, initialOpen: false, icon: props.icon }, /* @__PURE__ */ wp.element.createElement(
      FormFileUpload,
      {
        label: "CSV",
        accept: "text/csv",
        onChange: (e) => {
          reader.readAsText(e.target.files[0]);
        }
      }
    ));
  };

  // ../blocks/_init/init/SelectBreakPointToolbar.jsx
  CP.SelectBreakPointToolbar = (props) => {
    const { ToolbarGroup } = wp.components;
    return /* @__PURE__ */ wp.element.createElement(
      ToolbarGroup,
      {
        controls: props.breakpoints.map((bp) => {
          let title = bp == "0" ? "\u30FC" : bp;
          return {
            icon: /* @__PURE__ */ wp.element.createElement("svg", { viewBox: "0 0 100 100" }, /* @__PURE__ */ wp.element.createElement("text", { style: { "font-size": "50px" }, x: 50, y: 50, textAnchor: "middle", dominantBaseline: "middle" }, title)),
            isActive: props.value == bp,
            onClick: () => props.onChange(bp)
          };
        })
      }
    );
  };

  // ../blocks/_init/init/SelectModeToolbar.jsx
  CP.SelectModeToolbar = (props) => {
    const { BlockControls } = wp.blockEditor;
    const { ToolbarGroup } = wp.components;
    const { set, attr, modes = ["EditMode", "AltMode"] } = props;
    const SomeMode = modes.some((mode) => attr[mode]);
    const icons = {
      EditMode: "edit",
      OpenMode: "video-alt3",
      AltMode: "welcome-comments",
      TextMode: "media-text"
    };
    const cond = {
      AltMode: "doLoop"
    };
    return /* @__PURE__ */ wp.element.createElement(BlockControls, null, modes.map((mode) => {
      if (!attr[mode] && SomeMode) {
        return false;
      }
      if (cond[mode] && !attr[cond[mode]]) {
        return false;
      }
      return /* @__PURE__ */ wp.element.createElement(
        ToolbarGroup,
        {
          controls: [
            {
              icon: icons[mode],
              title: mode,
              isActive: attr[mode],
              onClick: () => set({ [mode]: !attr[mode] })
            }
          ],
          key: mode
        }
      );
    }));
  };

  // ../blocks/_init/init/SelectDeviceToolbar.jsx
  CP.SelectDeviceToolbar = (props) => {
    const { BlockControls } = wp.blockEditor;
    const { ToolbarGroup } = wp.components;
    const { set, attr, devices = ["sp", "pc"], defaultInput } = props;
    return /* @__PURE__ */ wp.element.createElement(BlockControls, null, devices.map((device) => {
      return /* @__PURE__ */ wp.element.createElement(
        ToolbarGroup,
        {
          controls: [
            {
              icon: CP.devices[device].icon,
              title: device,
              isActive: attr.device === device,
              onClick: () => {
                if (attr.device === device) {
                  set({ device: defaultInput || null });
                } else {
                  set({ device });
                }
              }
            }
          ],
          key: device
        }
      );
    }));
  };

  // ../blocks/_init/init/EditItemsTable.jsx
  CP.EditItemsTable = (props) => {
    const { set, attr, itemsKey = "items", columns, isTemplate } = props;
    const { RichText } = wp.blockEditor;
    const items = attr[itemsKey] || [];
    const save = () => {
      set({ [itemsKey]: JSON.parse(JSON.stringify(items)) });
    };
    return /* @__PURE__ */ wp.element.createElement("table", { className: "editItemsTable" }, /* @__PURE__ */ wp.element.createElement("thead", null, /* @__PURE__ */ wp.element.createElement("tr", null, columns.map((col, c) => !("cond" in col) || col.cond ? /* @__PURE__ */ wp.element.createElement("th", { key: c }, col.label || col.key) : false), /* @__PURE__ */ wp.element.createElement("th", null))), /* @__PURE__ */ wp.element.createElement("tbody", null, items.map((item, index) => {
      const propsForControl = { tag: "tr", set, itemsKey, items, index };
      return /* @__PURE__ */ wp.element.createElement(
        "tr",
        {
          onClick: (e) => {
            set({ currentItemIndex: index });
          },
          key: index
        },
        columns.map((col, c) => {
          if ("cond" in col && !col.cond) {
            return false;
          }
          switch (col.type) {
            case "text":
              return /* @__PURE__ */ wp.element.createElement("td", { key: c }, /* @__PURE__ */ wp.element.createElement(
                RichText,
                {
                  value: item[col.key],
                  onChange: (value) => {
                    item[col.key] = value;
                    save();
                  }
                }
              ));
            case "image":
              return /* @__PURE__ */ wp.element.createElement("td", { key: c }, /* @__PURE__ */ wp.element.createElement(
                CP.SelectResponsiveImage,
                {
                  attr,
                  set,
                  keys: { items: itemsKey, src: col.key, ...col.keys },
                  index,
                  size: col.size || "vga",
                  isTemplate
                }
              ));
            case "picture":
              return /* @__PURE__ */ wp.element.createElement("td", { key: c }, /* @__PURE__ */ wp.element.createElement(
                CP.SelectPictureSources,
                {
                  index,
                  attr,
                  set,
                  keys: { items: itemsKey, ...col.keys },
                  sizes: col.sizes,
                  devices: col.devices,
                  isTemplate
                }
              ));
            case "items":
              col.columns.forEach((subCol) => {
                if (subCol.keys) {
                  subCol.keys.subItems = col.key;
                }
              });
              return /* @__PURE__ */ wp.element.createElement("td", { key: c }, /* @__PURE__ */ wp.element.createElement(
                CP.EditItemsTable,
                {
                  set: () => {
                    save();
                  },
                  attr: item,
                  itemsKey: col.itemsKey,
                  columns: col.columns,
                  isTemplate
                }
              ));
          }
        }),
        /* @__PURE__ */ wp.element.createElement("td", null, /* @__PURE__ */ wp.element.createElement("div", { className: "itemControl" }, /* @__PURE__ */ wp.element.createElement("div", { className: "btn delete", onClick: (e) => CP.deleteItem(propsForControl) }), /* @__PURE__ */ wp.element.createElement("div", { className: "btn clone", onClick: (e) => CP.cloneItem(propsForControl) }), /* @__PURE__ */ wp.element.createElement("div", { className: "btn up", onClick: (e) => CP.upItem(propsForControl) }), /* @__PURE__ */ wp.element.createElement("div", { className: "btn down", onClick: (e) => CP.downItem(propsForControl) })))
      );
    })));
  };

  // ../blocks/_init/init/DummyImage.jsx
  CP.DummyImage = ({ className = "dummyimage", text }) => {
    return /* @__PURE__ */ wp.element.createElement("img", { className, src: wpinfo.plugins_url + "/catpow/callee/dummy_image.php?text=" + text });
  };

  // ../blocks/_init/init/DataStructure.jsx
  CP.DataStructure = (props) => {
    return /* @__PURE__ */ wp.element.createElement("ul", { className: "dataStructure" }, props.children);
  };
  CP.DataStructureItem = (props) => {
    const { useState } = wp.element;
    const [open, setOpen] = useState(false);
    return /* @__PURE__ */ wp.element.createElement("li", { className: "item " + (props.children ? "hasChildren " + (open ? "open" : "close") : "noChildren") }, /* @__PURE__ */ wp.element.createElement("h5", { className: "title", onClick: () => setOpen(!open) }, props.title, void 0 !== props.name && /* @__PURE__ */ wp.element.createElement("span", { className: "name" }, props.name)), !!open && !!props.children && /* @__PURE__ */ wp.element.createElement("div", { className: "children" }, props.children));
  };

  // ../blocks/_init/init/EventInputCards.jsx
  CP.EventInputCards = (props) => {
    const { title, onChange } = props;
    const { useState, useReducer, useCallback, useEffect, useMemo } = wp.element;
    const { BaseControl, Card, CardHeader, CardBody, Flex, FlexItem, FlexBlock, Icon, TextControl } = wp.components;
    const { processerId, eventTypes, parseEventValue, createEventValue, eventParams } = props.processer;
    const reducer = useCallback((state2, action) => {
      switch (action.type) {
        case "UPDATE_ALL": {
          return { events: action.events };
        }
        case "UPDATE": {
          state2.events[action.index] = { ...state2.events[action.index], ...action.event };
          return { ...state2 };
        }
        case "CLONE": {
          state2.events.splice(action.index, 0, { ...state2.events[action.index] });
          return { ...state2 };
        }
        case "REMOVE": {
          state2.events.splice(action.index, 1);
          return { ...state2 };
        }
      }
      return state2;
    }, []);
    const [state, dispatch] = useReducer(reducer, { events: [] });
    const eventParamsWithoutLabel = useMemo(() => {
      const eventParamsWithoutLabel2 = {};
      Object.keys(eventParams).forEach((name) => {
        const { label, ...otherParams } = eventParams[name];
        eventParamsWithoutLabel2[name] = otherParams;
      });
      return eventParamsWithoutLabel2;
    }, [eventParams]);
    const eventTypeList = useMemo(() => {
      if (!eventTypes) {
        return [];
      }
      return Object.keys(eventTypes).filter((eventType) => eventType !== "_custom");
    }, [eventTypes]);
    useEffect(() => {
      const timer = setTimeout(() => {
        onChange(createEventValue(state.events));
      }, 500);
      return () => clearTimeout(timer);
    }, [state]);
    useEffect(() => {
      const events = parseEventValue(props.value);
      if (events) {
        dispatch({ type: "UPDATE_ALL", events });
      }
    }, [props.value]);
    const EventInputCard = useCallback((props2) => {
      const { event, index } = props2;
      const activeEventParamNames = useMemo(() => {
        if (eventTypes && event.eventType) {
          const eventType = eventTypes[event.eventType] || eventTypes["_custom"];
          console.log(eventType);
          if (eventType) {
            return Object.keys(eventParams).filter((paramName) => {
              return eventParams[paramName].common || eventType.options.indexOf(paramName) >= 0;
            });
          }
        }
        return Object.keys(eventParams).filter((paramName) => !eventParams[paramName].limited);
      }, [eventTypes, eventParams, event.eventType]);
      return /* @__PURE__ */ wp.element.createElement(Card, { className: "EventInputCard" }, /* @__PURE__ */ wp.element.createElement(CardHeader, { className: "EventInputCard__header" }, /* @__PURE__ */ wp.element.createElement(Flex, null, /* @__PURE__ */ wp.element.createElement(FlexBlock, null, title), /* @__PURE__ */ wp.element.createElement(FlexItem, null, /* @__PURE__ */ wp.element.createElement(
        Icon,
        {
          icon: "insert",
          onClick: () => {
            dispatch({ type: "CLONE", index });
          }
        }
      ), state.events.length > 1 && /* @__PURE__ */ wp.element.createElement(
        Icon,
        {
          icon: "remove",
          onClick: () => {
            dispatch({ type: "REMOVE", index });
          }
        }
      )))), /* @__PURE__ */ wp.element.createElement(CardBody, { className: "EventInputCard__body" }, eventTypes && /* @__PURE__ */ wp.element.createElement("div", { className: "EventInputCard__item" }, /* @__PURE__ */ wp.element.createElement("div", { className: "EventInputCard__item__inputs" }, /* @__PURE__ */ wp.element.createElement(
        TextControl,
        {
          value: event.eventType,
          onChange: (val) => {
            dispatch({ type: "UPDATE", event: { eventType: val }, index });
          },
          list: CP.getDataListId(processerId + "EventTypes", eventTypeList)
        }
      ))), /* @__PURE__ */ wp.element.createElement("div", { className: "EventInputCard__item" }, /* @__PURE__ */ wp.element.createElement("div", { className: "EventInputCard__item__pref" }, "@"), /* @__PURE__ */ wp.element.createElement("div", { className: "EventInputCard__item__inputs" }, /* @__PURE__ */ wp.element.createElement(
        TextControl,
        {
          value: event.event,
          onChange: (val) => {
            dispatch({ type: "UPDATE", event: { event: val }, index });
          },
          list: CP.getDataListId(props2.eventList || "mouseEvent")
        }
      ))), activeEventParamNames.map((paramName) => {
        const param = eventParams[paramName];
        return /* @__PURE__ */ wp.element.createElement("div", { className: "EventInputCard__item is-type-" + (param.type || "text"), key: paramName }, /* @__PURE__ */ wp.element.createElement("div", { className: "EventInputCard__item__title" }, param.label), /* @__PURE__ */ wp.element.createElement("div", { className: "EventInputCard__item__inputs" }, /* @__PURE__ */ wp.element.createElement(
          CP.DynamicInput,
          {
            param: eventParamsWithoutLabel[paramName],
            value: event[paramName] || "",
            onChange: (val) => {
              dispatch({ type: "UPDATE", event: { [paramName]: val }, index });
            }
          }
        )));
      })));
    }, []);
    return /* @__PURE__ */ wp.element.createElement(BaseControl, null, state.events.length > 0 ? state.events.map((event, index) => /* @__PURE__ */ wp.element.createElement(EventInputCard, { event, index, key: index })) : /* @__PURE__ */ wp.element.createElement(EventInputCard, { event: {}, index: 0 }));
  };

  // ../blocks/_init/init/ServerSideRender.jsx
  CP.ServerSideRender = (props) => {
    const { className, block, attributes } = props;
    const { RawHTML, useState, useMemo, useRef, useEffect } = wp.element;
    const { useDebounce } = wp.compose;
    const [response, setResponse] = useState(false);
    const [hold, setHold] = useState(false);
    const [stylesheets, setStylesheets] = useState([]);
    useEffect(() => {
      if (hold) {
        return;
      }
      const path = "/cp/v1/blocks/render/" + block.split("/")[1];
      const data = {
        context: "edit",
        attributes
      };
      const post_id = wp.data.select("core/editor").getCurrentPostId();
      if (post_id) {
        data.post_id = post_id;
      }
      wp.apiFetch({ path, data, method: "POST" }).then((res) => {
        if (!res) {
          return;
        }
        setStylesheets(res.deps.styles);
        setResponse(res.rendered);
      }).catch((res) => {
        console.log(res);
      }).finally(() => {
        setTimeout(() => setHold(false), 500);
      });
      setHold(true);
    }, [JSON.stringify(attributes)]);
    return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(RawHTML, { className }, response), stylesheets.map((stylesheet) => /* @__PURE__ */ wp.element.createElement("link", { rel: "stylesheet", href: stylesheet, key: stylesheet })));
  };

  // ../blocks/_init/init/ColorVarTracer.jsx
  CP.ColorVarTracer = (props) => {
    const { target } = props;
    const { useMemo } = wp.element;
    const vars = useMemo(() => {
      const vars2 = {};
      if (target) {
        const styles = getComputedStyle(target);
        ["b", "s", "t", "m", "a", "i"].forEach((k) => {
          ["", "-container"].forEach((p) => {
            const name = `--cp${p}-tones-${k}-h`;
            vars2[name] = styles.getPropertyValue(name);
          });
        });
      }
      return vars2;
    }, [target]);
    return /* @__PURE__ */ wp.element.createElement("div", { style: vars }, props.children);
  };
})();
