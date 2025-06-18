(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // react-global:react
  var react_exports = {};
  __export(react_exports, {
    Fragment: () => Fragment,
    cloneElement: () => cloneElement,
    createContext: () => createContext,
    createElement: () => createElement,
    default: () => react_default,
    forwardRef: () => forwardRef,
    isValidElement: () => isValidElement,
    useCallback: () => useCallback,
    useContext: () => useContext,
    useEffect: () => useEffect,
    useLayoutEffect: () => useLayoutEffect,
    useMemo: () => useMemo2,
    useReducer: () => useReducer,
    useRef: () => useRef,
    useState: () => useState,
    version: () => version
  });
  var react_default, version, useState, useEffect, useLayoutEffect, useRef, forwardRef, useMemo2, useCallback, createContext, useContext, useReducer, createElement, cloneElement, isValidElement, Fragment;
  var init_react = __esm({
    "react-global:react"() {
      react_default = window.wp.element;
      version = "18.0.0";
      useState = wp.element.useState;
      useEffect = wp.element.useEffect;
      useLayoutEffect = wp.element.useLayoutEffect;
      useRef = wp.element.useRef;
      forwardRef = wp.element.forwardRef;
      useMemo2 = wp.element.useMemo;
      useCallback = wp.element.useCallback;
      createContext = wp.element.createContext;
      useContext = wp.element.useContext;
      useReducer = wp.element.useReducer;
      createElement = wp.element.createElement;
      cloneElement = wp.element.cloneElement;
      isValidElement = wp.element.isValidElement;
      Fragment = wp.element.Fragment;
    }
  });

  // node_modules/tslib/tslib.es6.js
  var tslib_es6_exports = {};
  __export(tslib_es6_exports, {
    __addDisposableResource: () => __addDisposableResource,
    __assign: () => __assign,
    __asyncDelegator: () => __asyncDelegator,
    __asyncGenerator: () => __asyncGenerator,
    __asyncValues: () => __asyncValues,
    __await: () => __await,
    __awaiter: () => __awaiter,
    __classPrivateFieldGet: () => __classPrivateFieldGet,
    __classPrivateFieldIn: () => __classPrivateFieldIn,
    __classPrivateFieldSet: () => __classPrivateFieldSet,
    __createBinding: () => __createBinding,
    __decorate: () => __decorate,
    __disposeResources: () => __disposeResources,
    __esDecorate: () => __esDecorate,
    __exportStar: () => __exportStar,
    __extends: () => __extends,
    __generator: () => __generator,
    __importDefault: () => __importDefault,
    __importStar: () => __importStar,
    __makeTemplateObject: () => __makeTemplateObject,
    __metadata: () => __metadata,
    __param: () => __param,
    __propKey: () => __propKey,
    __read: () => __read,
    __rest: () => __rest,
    __rewriteRelativeImportExtension: () => __rewriteRelativeImportExtension,
    __runInitializers: () => __runInitializers,
    __setFunctionName: () => __setFunctionName,
    __spread: () => __spread,
    __spreadArray: () => __spreadArray,
    __spreadArrays: () => __spreadArrays,
    __values: () => __values,
    default: () => tslib_es6_default
  });
  function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __5() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__5.prototype = b.prototype, new __5());
  }
  function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  }
  function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key, r2) : d(target, key)) || r2;
    return c > 3 && r2 && Object.defineProperty(target, key, r2), r2;
  }
  function __param(paramIndex, decorator) {
    return function(target, key) {
      decorator(target, key, paramIndex);
    };
  }
  function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) {
      if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
      return f;
    }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _2, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function(f) {
        if (done) throw new TypeError("Cannot add initializers after decoration has completed");
        extraInitializers.push(accept(f || null));
      };
      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
      if (kind === "accessor") {
        if (result === void 0) continue;
        if (result === null || typeof result !== "object") throw new TypeError("Object expected");
        if (_2 = accept(result.get)) descriptor.get = _2;
        if (_2 = accept(result.set)) descriptor.set = _2;
        if (_2 = accept(result.init)) initializers.unshift(_2);
      } else if (_2 = accept(result)) {
        if (kind === "field") initializers.unshift(_2);
        else descriptor[key] = _2;
      }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
  }
  function __runInitializers(thisArg, initializers, value2) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
      value2 = useValue ? initializers[i].call(thisArg, value2) : initializers[i].call(thisArg);
    }
    return useValue ? value2 : void 0;
  }
  function __propKey(x) {
    return typeof x === "symbol" ? x : "".concat(x);
  }
  function __setFunctionName(f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
  }
  function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
  }
  function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value2) {
      return value2 instanceof P ? value2 : new P(function(resolve) {
        resolve(value2);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value2) {
        try {
          step2(generator.next(value2));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value2) {
        try {
          step2(generator["throw"](value2));
        } catch (e) {
          reject(e);
        }
      }
      function step2(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step2((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  }
  function __generator(thisArg, body) {
    var _2 = { label: 0, sent: function() {
      if (t[0] & 1) throw t[1];
      return t[1];
    }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step2([n, v]);
      };
    }
    function step2(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_2 = 0)), _2) try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _2.label++;
            return { value: op[1], done: false };
          case 5:
            _2.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _2.ops.pop();
            _2.trys.pop();
            continue;
          default:
            if (!(t = _2.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _2 = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _2.label = op[1];
              break;
            }
            if (op[0] === 6 && _2.label < t[1]) {
              _2.label = t[1];
              t = op;
              break;
            }
            if (t && _2.label < t[2]) {
              _2.label = t[2];
              _2.ops.push(op);
              break;
            }
            if (t[2]) _2.ops.pop();
            _2.trys.pop();
            continue;
        }
        op = body.call(thisArg, _2);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  }
  function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
  }
  function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
      next: function() {
        if (o && i >= o.length) o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }
  function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r2, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r2 = i.next()).done) ar.push(r2.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r2 && !r2.done && (m = i["return"])) m.call(i);
      } finally {
        if (e) throw e.error;
      }
    }
    return ar;
  }
  function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
    return ar;
  }
  function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r2 = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r2[k] = a[j];
    return r2;
  }
  function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  }
  function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
  }
  function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
      return this;
    }, i;
    function awaitReturn(f) {
      return function(v) {
        return Promise.resolve(v).then(f, reject);
      };
    }
    function verb(n, f) {
      if (g[n]) {
        i[n] = function(v) {
          return new Promise(function(a, b) {
            q.push([n, v, a, b]) > 1 || resume(n, v);
          });
        };
        if (f) i[n] = f(i[n]);
      }
    }
    function resume(n, v) {
      try {
        step2(g[n](v));
      } catch (e) {
        settle(q[0][3], e);
      }
    }
    function step2(r2) {
      r2.value instanceof __await ? Promise.resolve(r2.value.v).then(fulfill, reject) : settle(q[0][2], r2);
    }
    function fulfill(value2) {
      resume("next", value2);
    }
    function reject(value2) {
      resume("throw", value2);
    }
    function settle(f, v) {
      if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
    }
  }
  function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function(e) {
      throw e;
    }), verb("return"), i[Symbol.iterator] = function() {
      return this;
    }, i;
    function verb(n, f) {
      i[n] = o[n] ? function(v) {
        return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v;
      } : f;
    }
  }
  function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
      return this;
    }, i);
    function verb(n) {
      i[n] = o[n] && function(v) {
        return new Promise(function(resolve, reject) {
          v = o[n](v), settle(resolve, reject, v.done, v.value);
        });
      };
    }
    function settle(resolve, reject, d, v) {
      Promise.resolve(v).then(function(v2) {
        resolve({ value: v2, done: d });
      }, reject);
    }
  }
  function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, "raw", { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  }
  function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
      for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
    }
    __setModuleDefault(result, mod);
    return result;
  }
  function __importDefault(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  }
  function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  }
  function __classPrivateFieldSet(receiver, state, value2, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value2) : f ? f.value = value2 : state.set(receiver, value2), value2;
  }
  function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
  }
  function __addDisposableResource(env, value2, async) {
    if (value2 !== null && value2 !== void 0) {
      if (typeof value2 !== "object" && typeof value2 !== "function") throw new TypeError("Object expected.");
      var dispose, inner;
      if (async) {
        if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
        dispose = value2[Symbol.asyncDispose];
      }
      if (dispose === void 0) {
        if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
        dispose = value2[Symbol.dispose];
        if (async) inner = dispose;
      }
      if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
      if (inner) dispose = function() {
        try {
          inner.call(this);
        } catch (e) {
          return Promise.reject(e);
        }
      };
      env.stack.push({ value: value2, dispose, async });
    } else if (async) {
      env.stack.push({ async: true });
    }
    return value2;
  }
  function __disposeResources(env) {
    function fail(e) {
      env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
      env.hasError = true;
    }
    var r2, s = 0;
    function next() {
      while (r2 = env.stack.pop()) {
        try {
          if (!r2.async && s === 1) return s = 0, env.stack.push(r2), Promise.resolve().then(next);
          if (r2.dispose) {
            var result = r2.dispose.call(r2.value);
            if (r2.async) return s |= 2, Promise.resolve(result).then(next, function(e) {
              fail(e);
              return next();
            });
          } else s |= 1;
        } catch (e) {
          fail(e);
        }
      }
      if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
      if (env.hasError) throw env.error;
    }
    return next();
  }
  function __rewriteRelativeImportExtension(path, preserveJsx) {
    if (typeof path === "string" && /^\.\.?\//.test(path)) {
      return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(m, tsx, d, ext, cm) {
        return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : d + ext + "." + cm.toLowerCase() + "js";
      });
    }
    return path;
  }
  var extendStatics, __assign, __createBinding, __setModuleDefault, ownKeys, _SuppressedError, tslib_es6_default;
  var init_tslib_es6 = __esm({
    "node_modules/tslib/tslib.es6.js"() {
      extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      __assign = function() {
        __assign = Object.assign || function __assign2(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      __createBinding = Object.create ? function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0) k2 = k;
        o[k2] = m[k];
      };
      __setModuleDefault = Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      };
      ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function(o2) {
          var ar = [];
          for (var k in o2) if (Object.prototype.hasOwnProperty.call(o2, k)) ar[ar.length] = k;
          return ar;
        };
        return ownKeys(o);
      };
      _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
      };
      tslib_es6_default = {
        __extends,
        __assign,
        __rest,
        __decorate,
        __param,
        __esDecorate,
        __runInitializers,
        __propKey,
        __setFunctionName,
        __metadata,
        __awaiter,
        __generator,
        __createBinding,
        __exportStar,
        __values,
        __read,
        __spread,
        __spreadArrays,
        __spreadArray,
        __await,
        __asyncGenerator,
        __asyncDelegator,
        __asyncValues,
        __makeTemplateObject,
        __importStar,
        __importDefault,
        __classPrivateFieldGet,
        __classPrivateFieldSet,
        __classPrivateFieldIn,
        __addDisposableResource,
        __disposeResources,
        __rewriteRelativeImportExtension
      };
    }
  });

  // node_modules/react-universal-interface/lib/render.js
  var require_render = __commonJS({
    "node_modules/react-universal-interface/lib/render.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
      var react_1 = (init_react(), __toCommonJS(react_exports));
      var isReact16Plus = parseInt(react_1.version.substr(0, react_1.version.indexOf("."))) > 15;
      var isFn = function(fn) {
        return typeof fn === "function";
      };
      var render2 = function(props, data) {
        var more = [];
        for (var _i = 2; _i < arguments.length; _i++) {
          more[_i - 2] = arguments[_i];
        }
        if (true) {
          if (typeof props !== "object") {
            throw new TypeError("renderChildren(props, data) first argument must be a props object.");
          }
          var children_1 = props.children, render_1 = props.render;
          if (isFn(children_1) && isFn(render_1)) {
            console.warn('Both "render" and "children" are specified for in a universal interface component. Children will be used.');
            console.trace();
          }
          if (typeof data !== "object") {
            console.warn("Universal component interface normally expects data to be an object, " + ('"' + typeof data + '" received.'));
            console.trace();
          }
        }
        var render3 = props.render, _a = props.children, children = _a === void 0 ? render3 : _a, component = props.component, _b = props.comp, comp = _b === void 0 ? component : _b;
        if (isFn(children))
          return children.apply(void 0, tslib_1.__spreadArrays([data], more));
        if (comp) {
          return react_1.createElement(comp, data);
        }
        if (children instanceof Array)
          return isReact16Plus ? children : react_1.createElement.apply(void 0, tslib_1.__spreadArrays(["div", null], children));
        if (children && children instanceof Object) {
          if (true) {
            if (!children.type || typeof children.type !== "string" && typeof children.type !== "function" && typeof children.type !== "symbol") {
              console.warn('Universal component interface received object as children, expected React element, but received unexpected React "type".');
              console.trace();
            }
            if (typeof children.type === "string")
              return children;
            return react_1.cloneElement(children, Object.assign({}, children.props, data));
          } else {
            if (typeof children.type === "string")
              return children;
            return react_1.cloneElement(children, Object.assign({}, children.props, data));
          }
        }
        return children || null;
      };
      exports.default = render2;
    }
  });

  // node_modules/react-universal-interface/lib/wrapInStatefulComponent.js
  var require_wrapInStatefulComponent = __commonJS({
    "node_modules/react-universal-interface/lib/wrapInStatefulComponent.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
      var React2 = tslib_1.__importStar((init_react(), __toCommonJS(react_exports)));
      var wrapInStatefulComponent = function(Comp) {
        var Decorated = function(_super) {
          tslib_1.__extends(class_1, _super);
          function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
          }
          class_1.prototype.render = function() {
            return Comp(this.props, this.context);
          };
          return class_1;
        }(React2.Component);
        if (true) {
          Decorated.displayName = "Decorated(" + (Comp.displayName || Comp.name) + ")";
        }
        return Decorated;
      };
      exports.default = wrapInStatefulComponent;
    }
  });

  // node_modules/react-universal-interface/lib/addClassDecoratorSupport.js
  var require_addClassDecoratorSupport = __commonJS({
    "node_modules/react-universal-interface/lib/addClassDecoratorSupport.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
      var wrapInStatefulComponent_1 = tslib_1.__importDefault(require_wrapInStatefulComponent());
      var addClassDecoratorSupport = function(Comp) {
        var isSFC = !Comp.prototype;
        return !isSFC ? Comp : wrapInStatefulComponent_1.default(Comp);
      };
      exports.default = addClassDecoratorSupport;
    }
  });

  // node_modules/react-universal-interface/lib/createEnhancer.js
  var require_createEnhancer = __commonJS({
    "node_modules/react-universal-interface/lib/createEnhancer.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.divWrapper = void 0;
      var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
      var React2 = tslib_1.__importStar((init_react(), __toCommonJS(react_exports)));
      var addClassDecoratorSupport_1 = tslib_1.__importDefault(require_addClassDecoratorSupport());
      var h = React2.createElement;
      var noWrap = function(Comp, propName, props, state) {
        var _a;
        return h(Comp, propName ? tslib_1.__assign((_a = {}, _a[propName] = state, _a), props) : tslib_1.__assign(tslib_1.__assign({}, state), props));
      };
      exports.divWrapper = function(Comp, propName, props, state) {
        return h("div", null, noWrap(Comp, propName, props, state));
      };
      var createEnhancer = function(Facc, prop, wrapper) {
        if (wrapper === void 0) {
          wrapper = noWrap;
        }
        var enhancer = function(Comp, propName, faccProps) {
          if (propName === void 0) {
            propName = prop;
          }
          if (faccProps === void 0) {
            faccProps = null;
          }
          var isClassDecoratorMethodCall = typeof Comp === "string";
          if (isClassDecoratorMethodCall) {
            return function(Klass) {
              return enhancer(Klass, Comp || prop, propName);
            };
          }
          var Enhanced = function(props) {
            return h(Facc, faccProps, function(state) {
              return wrapper(Comp, propName, props, state);
            });
          };
          if (true) {
            Enhanced.displayName = (Facc.displayName || Facc.name) + "(" + (Comp.displayName || Comp.name) + ")";
          }
          return isClassDecoratorMethodCall ? addClassDecoratorSupport_1.default(Enhanced) : Enhanced;
        };
        return enhancer;
      };
      exports.default = createEnhancer;
    }
  });

  // node_modules/react-universal-interface/lib/hookToRenderProp.js
  var require_hookToRenderProp = __commonJS({
    "node_modules/react-universal-interface/lib/hookToRenderProp.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
      var render_1 = tslib_1.__importDefault(require_render());
      var defaultMapPropsToArgs = function(props) {
        return [props];
      };
      var hookToRenderProp = function(hook, mapPropsToArgs) {
        if (mapPropsToArgs === void 0) {
          mapPropsToArgs = defaultMapPropsToArgs;
        }
        return function(props) {
          return render_1.default(props, hook.apply(void 0, mapPropsToArgs(props)));
        };
      };
      exports.default = hookToRenderProp;
    }
  });

  // node_modules/react-universal-interface/lib/index.js
  var require_lib = __commonJS({
    "node_modules/react-universal-interface/lib/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.hookToRenderProp = exports.createEnhancer = exports.render = void 0;
      var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
      var render_1 = tslib_1.__importDefault(require_render());
      exports.render = render_1.default;
      var createEnhancer_1 = tslib_1.__importDefault(require_createEnhancer());
      exports.createEnhancer = createEnhancer_1.default;
      var hookToRenderProp_1 = tslib_1.__importDefault(require_hookToRenderProp());
      exports.hookToRenderProp = hookToRenderProp_1.default;
    }
  });

  // ../blocks/_init/init/CP/index.js
  var CP_exports = {};
  __export(CP_exports, {
    AlignClassToolbar: () => AlignClassToolbar,
    AlignmentIcon: () => AlignmentIcon,
    Bem: () => Bem,
    BoundingBox: () => BoundingBox,
    ColorVarTracer: () => ColorVarTracer,
    ConfigIcon: () => ConfigIcon,
    CustomColorVars: () => CustomColorVars,
    DataInputTable: () => DataInputTable,
    DataSetInput: () => DataSetInput,
    DataStructure: () => DataStructure,
    DataStructureItem: () => DataStructureItem,
    DummyImage: () => DummyImage,
    DynamicInput: () => DynamicInput,
    EditItemsTable: () => EditItemsTable,
    EventInputCards: () => EventInputCards,
    ImporterCSVPanel: () => ImporterCSVPanel,
    InputIcon: () => InputIcon,
    Item: () => Item,
    ItemControl: () => ItemControl,
    ItemControlInfoPanel: () => ItemControlInfoPanel,
    Link: () => Link,
    Loop: () => Loop,
    Message: () => Message,
    NavBar: () => NavBar,
    OutputIcon: () => OutputIcon,
    PlacedPictures: () => PlacedPictures,
    PositionInput: () => PositionInput2,
    RTF: () => RTF,
    ResponsiveImage: () => ResponsiveImage,
    ResponsiveImageBody: () => ResponsiveImageBody,
    SelectBlendMode: () => SelectBlendMode,
    SelectBreakPointToolbar: () => SelectBreakPointToolbar,
    SelectButtons: () => SelectButtons,
    SelectClassPanel: () => SelectClassPanel,
    SelectClassPanelContext: () => SelectClassPanelContext,
    SelectColorClass: () => SelectColorClass,
    SelectColors: () => SelectColors,
    SelectDeviceToolbar: () => SelectDeviceToolbar,
    SelectGridButtons: () => SelectGridButtons,
    SelectModeToolbar: () => SelectModeToolbar,
    SelectPatternClass: () => SelectPatternClass,
    SelectPictureSources: () => SelectPictureSources,
    SelectPositionClass: () => SelectPositionClass,
    SelectPreparedImage: () => SelectPreparedImage,
    SelectPreparedImageSet: () => SelectPreparedImageSet,
    SelectResponsiveImage: () => SelectResponsiveImage,
    SelectSize: () => SelectSize,
    SelectThemeColor: () => SelectThemeColor,
    ServerSideRender: () => ServerSideRender,
    ServerSideRenderPart: () => ServerSideRenderPart,
    StandardIcon: () => StandardIcon,
    VerticalAlignClassToolbar: () => VerticalAlignClassToolbar,
    addAllClassFlags: () => addAllClassFlags,
    addBindClassFlags: () => addBindClassFlags,
    cache: () => cache,
    classNamesToFlags: () => classNamesToFlags,
    cloneItem: () => cloneItem,
    colorClassPattern: () => colorClassPattern,
    colorClassProxy: () => colorClassProxy,
    colorClassProxyHandler: () => colorClassProxyHandler,
    colorToneClassPattern: () => colorToneClassPattern,
    colorToneValuePattern: () => colorToneValuePattern,
    colorToneValueToClasses: () => colorToneValueToClasses,
    config: () => config,
    convertRowsToItems: () => convertRowsToItems,
    createBlocks: () => createBlocks,
    createGridItemStyleCode: () => createGridItemStyleCode,
    createGridItemStyleCodeData: () => createGridItemStyleCodeData,
    createGridStyleCode: () => createGridStyleCode,
    createGridStyleCodeData: () => createGridStyleCodeData,
    createStyleCode: () => createStyleCode,
    createStyleCodeWithMediaQuery: () => createStyleCodeWithMediaQuery,
    createStyleString: () => createStyleString,
    dataListPresets: () => dataListPresets,
    deleteItem: () => deleteItem,
    devices: () => devices,
    downItem: () => downItem,
    dummyText: () => dummyText,
    example: () => example,
    extractColorToneValue: () => extractColorToneValue,
    extractColorToneValues: () => extractColorToneValues,
    extractEventDispatcherAttributes: () => extractEventDispatcherAttributes,
    filterArrayWithFlags: () => filterArrayWithFlags,
    filterFlags: () => filterFlags,
    filters: () => filters,
    finderProxy: () => finderProxy,
    flagsToClassNames: () => flagsToClassNames,
    flagsToWords: () => flagsToWords,
    generateColorClass: () => generateColorClass,
    generateColorToneClasses: () => generateColorToneClasses,
    generateColorToneValue: () => generateColorToneValue,
    generateToneClass: () => generateToneClass,
    getAllClassFlags: () => getAllClassFlags,
    getAllSubClasses: () => getAllSubClasses,
    getBindClassFlagsByValue: () => getBindClassFlagsByValue,
    getBindClasses: () => getBindClasses,
    getClassFlagsByValue: () => getClassFlagsByValue,
    getColor: () => getColor,
    getDataListId: () => getDataListId,
    getImageSizesForDevices: () => getImageSizesForDevices,
    getItemByKeyAndIndex: () => getItemByKeyAndIndex,
    getItemColor: () => getItemColor,
    getItemPattern: () => getItemPattern,
    getItemSelectiveClass: () => getItemSelectiveClass,
    getJsonValue: () => getJsonValue,
    getMediaQueryKeyForDevice: () => getMediaQueryKeyForDevice,
    getNumberClass: () => getNumberClass,
    getPattern: () => getPattern,
    getPictureSoucesAttributes: () => getPictureSoucesAttributes,
    getPictureSoucesAttributesDefaultValueForDevices: () => getPictureSoucesAttributesDefaultValueForDevices,
    getPictureSoucesAttributesForDevices: () => getPictureSoucesAttributesForDevices,
    getSelecedFormatElement: () => getSelecedFormatElement,
    getSelectiveClass: () => getSelectiveClass,
    getSubClasses: () => getSubClasses,
    getUpdatesFromStatesAndClasssFlags: () => getUpdatesFromStatesAndClasssFlags,
    getUrlInStyleCode: () => getUrlInStyleCode,
    hasClass: () => hasClass,
    hasItemClass: () => hasItemClass,
    hasJsonValue: () => hasJsonValue,
    imageSrcOrDummy: () => imageSrcOrDummy,
    isRowsConvertibleToItems: () => isRowsConvertibleToItems,
    listedConvertibles: () => listedConvertibles,
    parseCSV: () => parseCSV,
    parseColorClass: () => parseColorClass,
    parseColorToneValue: () => parseColorToneValue,
    parseGradientStyleValue: () => parseGradientStyleValue,
    parseSelections: () => parseSelections,
    parseStyleCode: () => parseStyleCode,
    parseStyleCodeWithMediaQuery: () => parseStyleCodeWithMediaQuery,
    parseStyleString: () => parseStyleString,
    parseToneClass: () => parseToneClass,
    resolveSelectiveClassesPresets: () => resolveSelectiveClassesPresets,
    saveItem: () => saveItem,
    selectImage: () => selectImage,
    selectNextItem: () => selectNextItem,
    selectPrevItem: () => selectPrevItem,
    selectiveClassesPresets: () => selectiveClassesPresets,
    setJsonValue: () => setJsonValue,
    setJsonValues: () => setJsonValues,
    switchColor: () => switchColor,
    switchItemColor: () => switchItemColor,
    switchItemPattern: () => switchItemPattern,
    switchItemSelectiveClass: () => switchItemSelectiveClass,
    switchJsonValue: () => switchJsonValue,
    switchNumberClass: () => switchNumberClass,
    switchPattern: () => switchPattern,
    switchSelectiveClass: () => switchSelectiveClass,
    tableConvertibles: () => tableConvertibles,
    testFlags: () => testFlags,
    toggleClass: () => toggleClass,
    toggleItemClass: () => toggleItemClass,
    toneClassPattern: () => toneClassPattern,
    translateCssVal: () => translateCssVal,
    upItem: () => upItem,
    updateItemByKeyAndIndex: () => updateItemByKeyAndIndex,
    useInheritColor: () => useInheritColor,
    useManageStyleData: () => useManageStyleData,
    wordsToFlags: () => wordsToFlags
  });

  // ../blocks/_init/init/CP/components/AlignmentIcon.jsx
  var AlignmentIcon = (props) => {
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

  // ../blocks/_init/init/CP/components/ConfigIcon.jsx
  var ConfigIcon = (props) => {
    const { icon } = props;
    switch (icon) {
      case "json":
        return /* @__PURE__ */ wp.element.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20" }, " ", /* @__PURE__ */ wp.element.createElement("path", { d: "m.23,11.13v-2.28c.46-.03.81-.1,1.05-.21.23-.11.44-.31.61-.57.17-.27.29-.61.35-1.01.05-.3.08-.83.08-1.59,0-1.23.06-2.09.17-2.57.11-.48.32-.87.62-1.17.3-.29.73-.53,1.3-.7.39-.11.99-.17,1.82-.17h.5v2.27c-.7,0-1.15.04-1.35.12-.2.08-.35.2-.44.36-.1.16-.14.44-.14.83s-.03,1.16-.09,2.27c-.03.63-.11,1.14-.25,1.52-.13.39-.3.71-.51.96-.21.25-.52.52-.95.79.37.21.68.47.92.75.24.29.42.64.55,1.05.13.41.21.96.25,1.65.04,1.05.07,1.72.07,2.01,0,.42.05.71.15.87.1.16.25.29.46.38.21.08.65.13,1.33.13v2.28h-.5c-.85,0-1.51-.07-1.97-.2-.46-.14-.84-.36-1.15-.68s-.52-.71-.63-1.17c-.11-.47-.16-1.2-.16-2.2,0-1.17-.05-1.92-.15-2.27-.14-.51-.35-.87-.63-1.09-.28-.22-.71-.34-1.3-.38Z" }), /* @__PURE__ */ wp.element.createElement("path", { d: "m19.56,11.13c-.46.03-.81.1-1.04.21-.23.11-.44.31-.6.58s-.29.61-.36,1.01c-.05.3-.08.83-.08,1.58,0,1.23-.06,2.09-.17,2.57-.11.49-.31.88-.61,1.17-.3.29-.74.53-1.31.7-.39.11-.99.17-1.82.17h-.5v-2.28c.68,0,1.12-.04,1.33-.13.21-.09.36-.21.46-.37.1-.16.15-.44.15-.82,0-.39.03-1.12.08-2.21.03-.66.12-1.19.26-1.58.14-.4.32-.73.56-1.01.23-.28.53-.52.89-.73-.47-.3-.81-.6-1.03-.89-.3-.42-.5-.95-.61-1.6-.07-.44-.12-1.42-.15-2.93,0-.48-.05-.79-.13-.95-.08-.16-.22-.28-.43-.37s-.67-.13-1.38-.13V.86h.5c.86,0,1.51.07,1.97.2s.84.36,1.15.68c.31.32.52.71.63,1.18.11.47.17,1.2.17,2.2,0,1.16.05,1.92.14,2.27.14.51.35.87.64,1.09.29.22.72.34,1.3.38v2.28Z" }));
      case "light":
        return /* @__PURE__ */ wp.element.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20" }, /* @__PURE__ */ wp.element.createElement("path", { d: "m10,5c-2.76,0-5,2.24-5,5s2.24,5,5,5,5-2.24,5-5-2.24-5-5-5Zm0,9c-2.21,0-4-1.79-4-4s1.79-4,4-4,4,1.79,4,4-1.79,4-4,4Z" }), /* @__PURE__ */ wp.element.createElement("path", { d: "m3.5,10.5H1c-.28,0-.5-.22-.5-.5s.22-.5.5-.5h2.5c.28,0,.5.22.5.5s-.22.5-.5.5ZM10,.5c-.28,0-.5.22-.5.5v2.5c0,.28.22.5.5.5s.5-.22.5-.5V1c0-.28-.22-.5-.5-.5Zm0,15.5c-.28,0-.5.22-.5.5v2.5c0,.28.22.5.5.5s.5-.22.5-.5v-2.5c0-.28-.22-.5-.5-.5ZM3.99,3.28c-.2-.2-.51-.2-.71,0-.2.2-.2.51,0,.71l1.77,1.77c.2.2.51.2.71,0,.2-.2.2-.51,0-.71l-1.77-1.77Zm10.96,10.96c-.2-.2-.51-.2-.71,0s-.2.51,0,.71l1.77,1.77c.2.2.51.2.71,0s.2-.51,0-.71l-1.77-1.77Zm4.05-4.74h-2.5c-.28,0-.5.22-.5.5s.22.5.5.5h2.5c.28,0,.5-.22.5-.5s-.22-.5-.5-.5Zm-13.95,4.74l-1.77,1.77c-.2.2-.2.51,0,.71.2.2.51.2.71,0l1.77-1.77c.2-.2.2-.51,0-.71-.2-.2-.51-.2-.71,0ZM14.95,5.76l1.77-1.77c.2-.2.2-.51,0-.71s-.51-.2-.71,0l-1.77,1.77c-.2.2-.2.51,0,.71s.51.2.71,0Z" }));
      case "contrast":
        return /* @__PURE__ */ wp.element.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20" }, /* @__PURE__ */ wp.element.createElement("rect", { x: "10", y: "3", width: "8", height: "11" }), /* @__PURE__ */ wp.element.createElement("path", { d: "m10,1C5.03,1,1,5.03,1,10s4.03,9,9,9,9-4.03,9-9S14.97,1,10,1Zm0,17c-4.42,0-8-3.58-8-8S5.58,2,10,2v16Z" }));
    }
  };

  // modules/src/util/string.jsx
  var wordsToFlags = (words) => words && words.split(" ").reduce((p, c) => {
    p[c] = true;
    return p;
  }, {});
  var flagsToWords = (flags) => flags && Object.keys(flags).filter((word) => flags[word]).join(" ");
  var classNamesToFlags = (classNames) => classNames && classNames.split(" ").map(kebabToCamel).reduce((p, c) => {
    p[c] = true;
    return p;
  }, {}) || {};
  var flagsToClassNames = (flags) => flags && Object.keys(flags).filter((f) => flags[f]).map(camelToKebab).join(" ");
  var filterFlags = (flags, callback) => {
    Object.keys(flags).forEach((key) => {
      if (!callback(key)) {
        delete flags[key];
      }
    });
    return flags;
  };
  var camelToKebab = (str) => str.replace(/(\w)([A-Z])/g, "$1-$2").toLowerCase();
  var kebabToCamel = (str) => str.replace(/\-(\w)/g, (m) => m[1].toUpperCase());

  // modules/src/util/rtf.jsx
  var rtf = (text, pref = "rtf") => {
    if (typeof text !== "string") {
      if (text.toString == null) {
        return "";
      }
      text = text.toString();
    }
    text = replaceBlockFormat(text, pref);
    text = joinConsecutiveLists(text, pref);
    text = replaceInlineFormat(text, pref);
    text = replaceLineBreak(text);
    return text;
  };
  var replaceInlineFormat = (text, pref) => {
    const patterns = [
      [/\(\((.+?)\)\)/gu, `<small class="${pref}-small">$1</small>`],
      [/\*\*\*\*(.+?)\*\*\*\*/gu, `<strong class="${pref}-strongest">$1</strong>`],
      [/\*\*\*(.+?)\*\*\*/gu, `<strong class="${pref}-stronger">$1</strong>`],
      [/\*\*(.+?)\*\*/gu, `<strong class="${pref}-strong">$1</strong>`],
      [/##(.+?)##/gu, `<em class="${pref}-em">$1</em>`],
      [/~~(.+?)~~/gu, `<del class="${pref}-del">$1</del>`],
      [/``(.+?)``/gu, `<code class="${pref}-code">$1</code>`],
      [/!\[(.+?)\]\((.+?)\)/gu, `<img class="${pref}-image" src="$2" alt="$1"/>`],
      [/\[tel:(\d+)-(\d+)-(\d+)\]/gu, `<a class="${pref}-tel" href="tel:$1$2$3" target="_blank" rel="noopener">$1-$2-$3</a>`],
      [/\[mail:(.+?@.+?)\]/gu, `<a class="${pref}-mailto" href="mailto:$1" target="_blank" rel="noopener">$1</a>`],
      [/\[\[(.+?)\]\]\((.+?)\)/gu, `<a class="${pref}-button" href="$2" target="_blank" rel="noopener"><span class="${pref}-button__label">$1</span></a>`],
      [/\[\[(.+?):(\w+)\]\]/gu, `<span class="${pref}-tag is-tag-$2"><span class="${pref}-tag__label">$1</span></span>`],
      [/\[\[(.+?)\]\]/gu, `<span class="${pref}-tag"><span class="${pref}-tag__label">$1</span></span>`],
      [/\[(.+?)\]\((.+?\.pdf)\)/gu, `<a class="${pref}-link is-link-pdf" href="$2" target="_blank" rel="noopener">$1</a>`],
      [/\[(.+?)\]\((https?:\/\/.+?)\)/gu, `<a class="${pref}-link is-link-external" href="$2" target="_blank" rel="noopener">$1</a>`],
      [/\[(.+?)\]\((.+?)\)/gu, `<a class="${pref}-link" href="$2" rel="noopener">$1</a>`]
    ];
    patterns.forEach(([regex, replacement]) => {
      text = text.replace(regex, replacement);
    });
    return text;
  };
  var replaceBlockFormat = (text, pref, level = 0) => {
    if (level > 3) return text;
    const prefix = level > 0 ? `([ \u3000	]{${level}})` : "";
    const classLevel = level > 0 ? ` is-level-${level}` : "";
    const h = "^" + (level > 0 ? `([\u3000\\t]{${level}})` : "()");
    const t = "(.+((\\n" + (level > 0 ? "\\1" : "") + "[\u3000\\t]).+)*)$";
    const c = level > 0 ? ` is-level-${level}` : "";
    const l = level + 4;
    const p = "$2\n";
    const p2 = "$3\n";
    if (level > 0 && !text.match(new RegExp(h, "gum"))) {
      return text;
    }
    text = text.replace(
      new RegExp(h + "\\^([^\\s\u3000].{0,20}?) [:\uFF1A] " + t, "gum"),
      `<dl class="${pref}-notes${c}"><dt class="${pref}-notes__dt">$2</dt><dd class="${pref}-notes__dd">${p2}</dd></dl><!--/notes-->`,
      text
    );
    text = text.replace(new RegExp(h + "([^\\s\u3000].{0,20}?) [:\uFF1A] " + t, "gum"), `<dl class="${pref}-dl${c}"><dt class="${pref}-dl__dt">$2</dt><dd class="${pref}-dl__dd">${p2}</dd></dl>`, text);
    text = text.replace(new RegExp(h + "\u203B" + t, "gum"), `<span class="${pref}-annotation${c}">${p}</span>`);
    text = text.replace(new RegExp(h + "\u25A0 " + t, "gum"), `<h${l} class="${pref}-title${c}">${p}</h${l}>`);
    text = text.replace(new RegExp(h + "\u30FB " + t, "gum"), `<ul class="${pref}-ul${c}"><li class="${pref}-ul__li">${p}</li></ul>`);
    text = text.replace(new RegExp(h + "\\d{1,2}\\. " + t, "gum"), `<ol class="${pref}-ol${c}"><li class="${pref}-ol__li">${p}</li></ol>`);
    text = text.replace(
      new RegExp(h + "([\u2460-\u2473]|[^\\s\u3000]\\.) " + t, "gum"),
      `<dl class="${pref}-listed${c}"><dt class="${pref}-listed__dt">$2</dt><dd class="${pref}-listed__dd">${p2}</dd></dl><!--/listed-->`
    );
    if (level < 3) {
      return replaceBlockFormat(text, pref, level + 1);
    }
    return text;
  };
  var joinConsecutiveLists = (text, pref) => {
    text = text.replace(new RegExp(`</(dl|ul|ol)>\\s*<\\1 class="${pref}-\\1.*?">`, "gum"), "");
    text = text.replace(new RegExp(`</(dl|ul|ol)><!--/(\\w+?)-->\\s*<\\1 class="${pref}-\\2.*?">`, "gum"), "");
    return text;
  };
  var replaceLineBreak = (text) => {
    text = text.replace(/\s*(<\/(h\d|dl|dt|dd|ul|ol|li)+?>)\s*/g, "$1");
    text = text.replace(/(\n[　\t]*|\n[　\t]+)/g, "<br/>");
    return text;
  };

  // modules/src/util/data.jsx
  var deepMap = () => {
    const maps = {};
    const getMap = (keys, shift = 0) => {
      const depth = keys.length + shift;
      if (maps[depth] == null) {
        maps[depth] = /* @__PURE__ */ new Map();
      }
      let currentMap = maps[depth];
      for (const key of keys) {
        if (!currentMap.has(key)) {
          currentMap.set(key, /* @__PURE__ */ new Map());
        }
        currentMap = currentMap.get(key);
      }
      return currentMap;
    };
    return {
      getMap(keys, shift = 1) {
        return getMap(keys, shift);
      },
      has(keys) {
        return getMap(keys.slice(0, -1)).has(keys[keys.length - 1]);
      },
      get(keys) {
        return getMap(keys.slice(0, -1)).get(keys[keys.length - 1]);
      },
      set(keys, value2) {
        return getMap(keys.slice(0, -1)).set(keys[keys.length - 1], value2);
      },
      forEach(keys, callback) {
        return getMap(keys).forEach(callback);
      },
      map(keys, callback) {
        return [...getMap(keys)].map(callback);
      }
    };
  };

  // modules/src/util/bem.jsx
  var bem = (className) => {
    const children = {};
    const firstClass = className.split(" ")[0];
    return new Proxy(
      function() {
        if (arguments.length > 0) {
          const classes = [];
          let i;
          for (i = 0; i < arguments.length; i++) {
            if (!arguments[i]) {
              continue;
            }
            if (typeof arguments[i] === "string") {
              classes.push(arguments[i]);
              continue;
            }
            classes.push.apply(classes, Array.isArray(arguments[i]) ? arguments[i] : Object.keys(arguments[i]).filter((c) => arguments[i][c]));
          }
          if (classes.length > 0) {
            return (className + " " + classes.join(" ")).replace(" --", " " + firstClass + "--");
          }
        }
        return className;
      },
      {
        get: (target, prop) => {
          if (void 0 === children[prop]) {
            children[prop] = bem(firstClass + (prop[0] === "_" ? "_" : "-") + prop);
          }
          return children[prop];
        }
      }
    );
  };

  // ../blocks/_init/init/CP/components/BoundingBox.jsx
  var BoundingBox = (props) => {
    const { targets, onDeselect, onDuplicate, onDelete, onChange } = props;
    const { useState: useState4, useCallback: useCallback4, useMemo: useMemo5, useEffect: useEffect6, useRef: useRef4 } = wp.element;
    const classes = useMemo5(() => bem("cp-boundingbox"), []);
    const ref = useRef4();
    const [style, setStyle] = useState4({});
    const [action, setAction] = useState4(false);
    const container = useMemo5(() => props.container || document, [props.container]);
    const tracePosition = useCallback4(
      (targets2) => {
        const cBnd = container.getBoundingClientRect();
        const bnd = targets2.length === 1 ? targets2[0].getBoundingClientRect() : targets2.reduce((bnd2, target) => {
          const crrBnd = target.getBoundingClientRect();
          if (bnd2 === false) {
            return crrBnd;
          }
          return {
            left: Math.min(bnd2.left, crrBnd.left),
            right: Math.max(bnd2.right, crrBnd.right),
            top: Math.min(bnd2.top, crrBnd.top),
            bottom: Math.max(bnd2.bottom, crrBnd.bottom)
          };
        }, false);
        setStyle({
          position: "absolute",
          left: bnd.left - cBnd.left + "px",
          top: bnd.top - cBnd.top + "px",
          width: bnd.right - bnd.left + "px",
          height: bnd.bottom - bnd.top + "px"
        });
      },
      [container]
    );
    const getRelBnd = useCallback4(
      (el) => {
        const bnd1 = container.getBoundingClientRect();
        const bnd2 = el.getBoundingClientRect();
        return {
          ...bnd2,
          left: bnd2.left - bnd1.left,
          right: bnd2.right - bnd1.left,
          top: bnd2.top - bnd1.top,
          bottom: bnd2.bottom - bnd1.top
        };
      },
      [container]
    );
    const observer = useMemo5(() => {
      return new MutationObserver((mutations) => {
        tracePosition(targets);
      });
    }, [tracePosition, targets]);
    useEffect6(() => {
      if (!targets.length) {
        return;
      }
      tracePosition(targets);
      targets.forEach((target) => {
        observer.observe(target, {
          attributes: true,
          attributeFilter: ["style"]
        });
      });
      return () => observer.disconnect();
    }, [targets, observer]);
    useEffect6(() => {
      if (!targets.length) {
        return;
      }
      tracePosition(targets);
      const cb = () => tracePosition(targets);
      window.addEventListener("resize", cb);
      return () => window.removeEventListener("resize", cb);
    }, [targets, props.viewMode]);
    useEffect6(() => {
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
    useEffect6(() => {
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
    const controls = useMemo5(() => {
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
    const onMouseDown = useCallback4(
      (e) => {
        const control = e.target.closest("[data-control-action]");
        if (!control) {
          return setAction(false);
        }
        const action2 = control.dataset.controlAction;
        const flags = parseInt(control.dataset.controlFlags);
        if (onDuplicate && e.altKey && action2 === "move") {
          onDuplicate(targets);
        }
        targets.forEach((target) => {
          target.style.animation = "none";
          target.style.transition = "none";
        });
        const orgBnd = ref.current.getBoundingClientRect();
        const ox = orgBnd.right - (flags & 12) / 8 * orgBnd.width;
        const oy = orgBnd.bottom - (flags & 3) / 2 * orgBnd.height;
        if (action2 === "resize") {
          targets.forEach((target) => {
            const bnd = target.getBoundingClientRect();
            target.style["transform-origin"] = `${ox - bnd.left}px ${oy - bnd.top}px`;
          });
        }
        setAction({
          action: action2,
          flags,
          org: { x: e.clientX, y: e.clientY, ox, oy },
          orgBnd,
          keepAspect: e.shiftKey,
          keepCenter: e.altKey,
          targets
        });
      },
      [ref, targets, onDuplicate]
    );
    const onMouseMove = useCallback4(
      (e) => {
        if (!action) {
          return;
        }
        const dx = e.clientX - action.org.x;
        const dy = e.clientY - action.org.y;
        if (action.action === "move") {
          targets.forEach((target, index) => {
            target.style.transform = `translate(${dx}px,${dy}px)`;
          });
        } else if (action.action === "resize") {
          let s;
          const sx = Math.abs(e.clientX - action.org.ox) / action.orgBnd.width;
          const sy = Math.abs(e.clientY - action.org.oy) / action.orgBnd.height;
          if (action.flags & 1) {
            s = action.keepAspect ? `scale(${sx})` : `scaleX(${sx})`;
          } else if (action.flags & 4) {
            s = action.keepAspect ? `scale(${sy})` : `scaleY(${sy})`;
          } else {
            s = action.keepAspect ? `scale(${Math.min(sx, sy)})` : `scale(${sx},${sy})`;
          }
          targets.forEach((target, index) => {
            target.style.transform = s;
          });
        }
      },
      [action]
    );
    const onMouseUp = useCallback4(
      (e) => {
        if (onChange) {
          onChange(action.targets);
        }
        action.targets.map((target) => {
          target.style.animation = "";
          target.style.transition = "";
          target.style.transform = "";
          target.style["transform-origin"] = "";
        });
        setAction(false);
      },
      [action, onChange]
    );
    const onDoubleClick = useCallback4(
      (e) => {
        targets.forEach((target) => {
          target.style.height = "auto";
          target.style.height = window.getComputedStyle(target).height + "px";
        });
        if (onChange) {
          onChange(targets);
        }
      },
      [targets, onChange]
    );
    if (!targets.length) {
      return false;
    }
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes({ "is-doing-action": !!action }), style, ref, onMouseDown, onMouseMove, onMouseUp, onDoubleClick }, /* @__PURE__ */ wp.element.createElement("div", { className: classes.controls() }, controls.map((props2, i) => /* @__PURE__ */ wp.element.createElement("span", { className: classes.controls.control(props2.className), "data-control-action": props2.action, "data-control-flags": props2.flags, key: i }))));
  };

  // modules/src/component/Animation/Animation.jsx
  init_react();

  // modules/src/component/Animation/MosaicWave.jsx
  init_react();

  // modules/src/component/Input/PositionInput.jsx
  init_react();

  // node_modules/react-use/esm/misc/util.js
  var noop = function() {
  };
  function on(obj) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    if (obj && obj.addEventListener) {
      obj.addEventListener.apply(obj, args);
    }
  }
  function off(obj) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i];
    }
    if (obj && obj.removeEventListener) {
      obj.removeEventListener.apply(obj, args);
    }
  }

  // node_modules/react-use/esm/useLatest.js
  init_react();
  var useLatest = function(value2) {
    var ref = useRef(value2);
    ref.current = value2;
    return ref;
  };
  var useLatest_default = useLatest;

  // node_modules/react-use/esm/useScratch.js
  init_tslib_es6();
  init_react();
  var import_react_universal_interface = __toESM(require_lib());
  var useScratch = function(params) {
    if (params === void 0) {
      params = {};
    }
    var disabled = params.disabled;
    var paramsRef = useLatest_default(params);
    var _a = useState({ isScratching: false }), state = _a[0], setState = _a[1];
    var refState = useRef(state);
    var refScratching = useRef(false);
    var refAnimationFrame = useRef(null);
    var _b = useState(null), el = _b[0], setEl = _b[1];
    useEffect(function() {
      if (disabled)
        return;
      if (!el)
        return;
      var onMoveEvent = function(docX, docY) {
        cancelAnimationFrame(refAnimationFrame.current);
        refAnimationFrame.current = requestAnimationFrame(function() {
          var _a2 = el.getBoundingClientRect(), left = _a2.left, top = _a2.top;
          var elX = left + window.scrollX;
          var elY = top + window.scrollY;
          var x = docX - elX;
          var y = docY - elY;
          setState(function(oldState) {
            var newState = __assign(__assign({}, oldState), { dx: x - (oldState.x || 0), dy: y - (oldState.y || 0), end: Date.now(), isScratching: true });
            refState.current = newState;
            (paramsRef.current.onScratch || noop)(newState);
            return newState;
          });
        });
      };
      var onMouseMove = function(event) {
        onMoveEvent(event.pageX, event.pageY);
      };
      var onTouchMove = function(event) {
        onMoveEvent(event.changedTouches[0].pageX, event.changedTouches[0].pageY);
      };
      var onMouseUp;
      var onTouchEnd;
      var stopScratching = function() {
        if (!refScratching.current)
          return;
        refScratching.current = false;
        refState.current = __assign(__assign({}, refState.current), { isScratching: false });
        (paramsRef.current.onScratchEnd || noop)(refState.current);
        setState({ isScratching: false });
        off(window, "mousemove", onMouseMove);
        off(window, "touchmove", onTouchMove);
        off(window, "mouseup", onMouseUp);
        off(window, "touchend", onTouchEnd);
      };
      onMouseUp = stopScratching;
      onTouchEnd = stopScratching;
      var startScratching = function(docX, docY) {
        if (!refScratching.current)
          return;
        var _a2 = el.getBoundingClientRect(), left = _a2.left, top = _a2.top;
        var elX = left + window.scrollX;
        var elY = top + window.scrollY;
        var x = docX - elX;
        var y = docY - elY;
        var time = Date.now();
        var newState = {
          isScratching: true,
          start: time,
          end: time,
          docX,
          docY,
          x,
          y,
          dx: 0,
          dy: 0,
          elH: el.offsetHeight,
          elW: el.offsetWidth,
          elX,
          elY
        };
        refState.current = newState;
        (paramsRef.current.onScratchStart || noop)(newState);
        setState(newState);
        on(window, "mousemove", onMouseMove);
        on(window, "touchmove", onTouchMove);
        on(window, "mouseup", onMouseUp);
        on(window, "touchend", onTouchEnd);
      };
      var onMouseDown = function(event) {
        refScratching.current = true;
        startScratching(event.pageX, event.pageY);
      };
      var onTouchStart = function(event) {
        refScratching.current = true;
        startScratching(event.changedTouches[0].pageX, event.changedTouches[0].pageY);
      };
      on(el, "mousedown", onMouseDown);
      on(el, "touchstart", onTouchStart);
      return function() {
        off(el, "mousedown", onMouseDown);
        off(el, "touchstart", onTouchStart);
        off(window, "mousemove", onMouseMove);
        off(window, "touchmove", onTouchMove);
        off(window, "mouseup", onMouseUp);
        off(window, "touchend", onTouchEnd);
        if (refAnimationFrame.current)
          cancelAnimationFrame(refAnimationFrame.current);
        refAnimationFrame.current = null;
        refScratching.current = false;
        refState.current = { isScratching: false };
        setState(refState.current);
      };
    }, [el, disabled, paramsRef]);
    return [setEl, state];
  };
  var useScratch_default = useScratch;

  // modules/src/component/Bem.jsx
  init_react();
  var applyBem2 = (component, { ...ctx }) => {
    if (Array.isArray(component)) {
      component.forEach((child) => {
        applyBem2(child, ctx);
      });
      return;
    }
    if (component?.props == null) {
      return;
    }
    if (component.type == react_default.Fragment) {
      applyBem2(component.props.children, ctx);
      return;
    }
    const {
      props: { className, children }
    } = component;
    if (className) {
      component.props.className = className.split(" ").map((className2) => {
        if (className2.slice(0, 2) === "--") {
          return ctx.element + className2;
        }
        if (className2[0] === "-") {
          return ctx.block = ctx.element = ctx.block + className2;
        }
        if (className2[0] === "_") {
          return ctx.element = ctx.element + (ctx.element === ctx.block ? "__" : "-") + className2.slice(1);
        }
        if (className2.slice(-1) === "-") {
          return ctx.block = ctx.element = ctx.prefix + "-" + className2.slice(0, -1);
        }
        if (className2.slice(-1) === "_") {
          return ctx.element = ctx.block + "__" + className2.slice(0, -1);
        }
        return className2;
      }).join(" ");
      if (component.props.className === className) {
        const matches = className.match(/\b(([a-z]+)\-[a-z]+(\-[a-z]+)*)(__[a-z]+(\-[a-z]+)*)?\b/);
        if (!matches) {
          return;
        }
        if (!matches[1].startsWith(ctx.prefix)) {
          ctx.prefix = matches[2];
        }
        ctx.block = matches[1];
        ctx.element = matches[0];
      }
    } else if (typeof component.type === "string") {
      component.props.className = ctx.element = ctx.element + (ctx.element === ctx.block ? "__" : "-") + component.type;
    } else {
      return;
    }
    if (children == null) {
      return;
    }
    if (Array.isArray(children)) {
      children.forEach((child) => {
        applyBem2(child, ctx);
      });
    } else {
      applyBem2(children, ctx);
    }
  };
  var Bem = ({ prefix = "cp", block, element, children }) => {
    const ctx = { prefix, block, element };
    applyBem2(children, ctx);
    return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, children);
  };

  // modules/src/hooks/useThrottle.jsx
  init_react();
  var { useEffect: useEffect2, useRef: useRef2 } = react_default;
  var useThrottle = (callback, interval, deps) => {
    const ref = useRef2(false);
    useEffect2(() => {
      if (ref.current) {
        const timer = setTimeout(callback, interval);
        return () => clearTimeout(timer);
      }
      ref.current = true;
      callback();
      setTimeout(() => {
        ref.current = false;
      }, interval);
    }, deps);
  };

  // modules/src/component/Input/PositionInput.jsx
  var PositionInput = (props) => {
    const { className = "cp-positioninput", width = 100, height = 100, margin: margin2 = 10, grid = 10, snap = false, x = 50, y = 50, r: r2 = 6, onChange, ...otherProps } = props;
    const [ref, state] = useScratch_default();
    const [pos, setPos] = useState({ x, y });
    useThrottle(() => onChange({ x: pos.x, y: pos.y }), 50, [pos.x, pos.y]);
    useEffect(() => {
      if (!state.isScratching) {
        return;
      }
      let x2 = parseInt(Math.max(0, Math.min(state.x + state.dx - margin2, width)));
      let y2 = parseInt(Math.max(0, Math.min(state.y + state.dy - margin2, height)));
      if (isNaN(x2) || isNaN(y2)) {
        return;
      }
      if (snap) {
        x2 = Math.round(x2 / grid) * grid;
        y2 = Math.round(y2 / grid) * grid;
      }
      setPos({ x: x2, y: y2 });
    }, [state.dx, state.dy]);
    return /* @__PURE__ */ wp.element.createElement(Bem, null, /* @__PURE__ */ wp.element.createElement(
      "svg",
      {
        className,
        width: width + margin2 * 2,
        height: height + margin2 * 2,
        viewBox: `0 0 ${width + margin2 * 2} ${height + margin2 * 2}`,
        xmlns: "http://www.w3.org/2000/svg",
        ref,
        style: { cursor: state.isScratching ? "grabbing" : "grab" },
        ...otherProps
      },
      /* @__PURE__ */ wp.element.createElement("rect", { className: "_bg", x: margin2, y: margin2, width, height, fill: "none", stroke: "currentColor", strokeOpacity: 0.5 }),
      /* @__PURE__ */ wp.element.createElement("circle", { fill: "none", stroke: "currentColor", strokeOpacity: 0.75, className: "_circle", cx: pos.x + margin2, cy: pos.y + margin2, r: r2 }),
      /* @__PURE__ */ wp.element.createElement("circle", { fill: "currentColor", className: "_dot", cx: pos.x + margin2, cy: pos.y + margin2, r: 2 }),
      grid > 0 && /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, Array.from({ length: Math.floor(width / grid) }, (_2, i) => /* @__PURE__ */ wp.element.createElement("line", { key: i, stroke: "currentColor", strokeOpacity: 0.1, className: "_grid", x1: i * grid + margin2, y1: margin2, x2: i * grid + margin2, y2: height + margin2 })), Array.from({ length: Math.floor(height / grid) }, (_2, i) => /* @__PURE__ */ wp.element.createElement("line", { key: i, stroke: "currentColor", strokeOpacity: 0.1, className: "_grid", x1: margin2, y1: i * grid + margin2, x2: width + margin2, y2: i * grid + margin2 })), /* @__PURE__ */ wp.element.createElement("line", { stroke: "currentColor", strokeOpacity: 0.2, className: "_grid is-center", x1: width / 2 + margin2, y1: margin2, x2: width / 2 + margin2, y2: height + margin2 }), /* @__PURE__ */ wp.element.createElement("line", { stroke: "currentColor", strokeOpacity: 0.2, className: "_grid is-center", x1: margin2, y1: height / 2 + margin2, x2: width + margin2, y2: height / 2 + margin2 }))
    ));
  };

  // modules/src/component/Input/SizingInput.jsx
  init_react();
  var SizingContext = createContext();

  // modules/src/component/Nav/Nav.jsx
  init_react();

  // modules/src/component/Nav/Menu.jsx
  init_react();

  // modules/src/component/Nav/MenuItem.jsx
  init_react();

  // modules/src/component/Nav/MainMenu.jsx
  init_react();

  // modules/src/component/Nav/SubMenu.jsx
  init_react();

  // modules/src/component/Nav/SubMenuContents.jsx
  init_react();

  // modules/src/component/SVG/ComputeLine.jsx
  init_react();

  // modules/src/component/SVG/Honycomb.jsx
  init_react();

  // modules/src/component/SVG/Flux.jsx
  init_react();

  // modules/src/component/SVG/Star.jsx
  init_react();

  // modules/src/component/SVG/SVG.jsx
  init_react();

  // modules/src/component/Cloak.jsx
  init_react();

  // modules/src/component/ElasticBox.jsx
  init_react();

  // modules/src/component/Parallax.jsx
  init_react();

  // modules/src/component/Portal.jsx
  init_react();

  // react-global:react-dom
  var react_dom_default = window.wp.element;
  var createPortal = wp.element.createPortal;
  var flushSync = wp.element.flushSync;

  // modules/src/component/Portal.jsx
  var Portal = (props) => {
    const { children, trace } = props;
    const { render: render2, useState: useState4, useMemo: useMemo5, useCallback: useCallback4, useEffect: useEffect6, useRef: useRef4 } = react_default;
    const { createPortal: createPortal2 } = react_dom_default;
    const ref = useRef4({ contents: false, setContents: () => {
    } });
    const el = useMemo5(() => {
      if (props.id) {
        const exEl = document.getElementById(props.id);
        if (exEl) {
          return exEl;
        }
      }
      const el2 = document.createElement("div");
      if (props.id) {
        el2.id = props.id;
      }
      if (props.className) {
        el2.className = props.className;
      }
      document.body.appendChild(el2);
      return el2;
    }, []);
    useEffect6(() => {
      const { trace: trace2 } = props;
      if (!trace2) {
        return;
      }
      el.style.position = "absolute";
      const timer = setInterval(() => {
        if (trace2.getBoundingClientRect) {
          const bnd = trace2.getBoundingClientRect();
          el.style.left = window.scrollX + bnd.left + "px";
          el.style.top = window.scrollY + bnd.top + "px";
          el.style.width = bnd.width + "px";
          el.style.height = bnd.height + "px";
        }
      }, 50);
      return () => clearInterval(timer);
    }, [props.trace]);
    return createPortal2(children, el);
  };

  // modules/src/component/PortalWindow.jsx
  init_react();

  // modules/src/component/RawNode.jsx
  init_react();

  // modules/src/component/ScrollSpy.jsx
  init_react();

  // modules/src/component/Slider.jsx
  init_react();

  // modules/src/component/TabPanel.jsx
  init_react();

  // modules/src/component/TextBuild.jsx
  init_react();

  // modules/src/component/Transition.jsx
  init_react();

  // modules/src/hooks/useAgent.jsx
  init_react();
  var { useMemo: useMemo3, useState: useState2, useCallback: useCallback2, useRef: useRef3, useEffect: useEffect3, createContext: createContext2, useContext: useContext2, lazy } = react_default;
  var AgentContext = createContext2();

  // modules/src/hooks/useBem.jsx
  init_react();

  // modules/src/hooks/useCache.jsx
  init_react();

  // modules/src/hooks/useQuery.jsx
  init_react();

  // modules/src/hooks/useTransition.jsx
  init_react();

  // modules/src/hooks/useLazyProvider.jsx
  init_react();

  // modules/src/hooks/useLazyComponent.jsx
  init_react();

  // modules/src/hooks/useDebounce.jsx
  init_react();
  var { useEffect: useEffect4 } = react_default;

  // modules/src/hooks/useChangeEffect.jsx
  init_react();

  // modules/src/component/Loop.jsx
  init_react();

  // ../blocks/_init/init/CP/components/SelectBlendMode.jsx
  var options = [
    { value: "normal", label: "\u901A\u5E38" },
    { value: "multiply", label: "\u4E57\u7B97" },
    { value: "screen", label: "\u30B9\u30AF\u30EA\u30FC\u30F3" },
    { value: "overlay", label: "\u30AA\u30FC\u30D0\u30FC\u30EC\u30A4" },
    { value: "darken", label: "\u6BD4\u8F03\uFF08\u6697\uFF09" },
    { value: "lighten", label: "\u6BD4\u8F03\uFF08\u660E\uFF09" },
    { value: "color-dodge", label: "\u8986\u3044\u713C\u304D" },
    { value: "color-burn", label: "\u713C\u304D\u8FBC\u307F" },
    { value: "hard-light", label: "\u30CF\u30FC\u30C9\u30E9\u30A4\u30C8" },
    { value: "soft-light", label: "\u30BD\u30D5\u30C8\u30E9\u30A4\u30C8" },
    { value: "difference", label: "\u5DEE\u306E\u7D76\u5BFE\u5024" },
    { value: "exclusion", label: "\u9664\u5916" },
    { value: "hue", label: "\u8272\u76F8" },
    { value: "saturation", label: "\u5F69\u5EA6" },
    { value: "color", label: "\u30AB\u30E9\u30FC" },
    { value: "luminosity", label: "\u660E\u5EA6" }
  ];
  var SelectBlendMode = (props) => {
    const { SelectControl } = wp.components;
    return /* @__PURE__ */ wp.element.createElement(SelectControl, { label: props.label, onChange: props.onChange, value: props.value, options });
  };

  // ../blocks/_init/init/CP/components/SelectThemeColor.jsx
  var SelectThemeColor = (props) => {
    const { onChange } = props;
    const { useCallback: useCallback4, useMemo: useMemo5, Fragment: Fragment2 } = wp.element;
    const { Icon } = wp.components;
    const classes = bem("cp-selectthemecolor");
    const proxy = useMemo5(() => CP.colorClassProxy(props.selected), [props.selected]);
    const data = useMemo5(() => CP.parseColorClass(proxy.h), [proxy.h]);
    const ColorSelections = useCallback4(
      (props2) => {
        const { fixed = false, absolute = false, relative = false, active = false, proxy: proxy2 } = props2;
        const { h, s, l } = proxy2;
        const hsl = { h, s, l };
        return /* @__PURE__ */ wp.element.createElement("ul", { className: classes.colors({ fixed, absolute, relative, active }) }, /* @__PURE__ */ wp.element.createElement("li", { className: classes.colors.icon({ active }) }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: fixed ? "lock" : absolute ? "media-default" : "excerpt-view" })), Array.from(Array(13), (v, value2) => {
          const colorClass = CP.generateColorClass({
            fixed,
            absolute,
            relative,
            value: value2
          });
          const active2 = colorClass === h;
          return /* @__PURE__ */ wp.element.createElement(
            "li",
            {
              className: classes.colors.item(colorClass, s, l, { active: active2 }),
              onClick: () => {
                proxy2.h = !active2 && colorClass;
                onChange(proxy2);
              },
              key: colorClass
            },
            " "
          );
        }));
      },
      [onChange]
    );
    const ToneSelections = useCallback4(
      (props2) => {
        const { proxy: proxy2 } = props2;
        const { h, s, l } = proxy2;
        const hsl = { h, s, l };
        return /* @__PURE__ */ wp.element.createElement("ul", { className: classes.tones() }, ["s", "l"].map((r2) => /* @__PURE__ */ wp.element.createElement(Fragment2, { key: r2 }, /* @__PURE__ */ wp.element.createElement("li", { className: classes.colors.icon({ active: !!hsl[r2] }) }, /* @__PURE__ */ wp.element.createElement(CP.ConfigIcon, { icon: { s: "contrast", l: "light" }[r2] })), Array.from(Array(5), (v, index) => {
          const value2 = index - 2;
          const toneClass = CP.generateToneClass({ [r2]: true, value: value2 });
          const active = toneClass === hsl[r2];
          return /* @__PURE__ */ wp.element.createElement(
            "li",
            {
              className: classes.tones.item(h, r2 === "s" ? l : s, toneClass, { active }),
              onClick: () => {
                proxy2[r2] = !active && toneClass;
                onChange(proxy2);
              },
              key: toneClass
            },
            " "
          );
        }))));
      },
      [onChange]
    );
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement(ColorSelections, { proxy, fixed: true, active: data.fixed }), /* @__PURE__ */ wp.element.createElement(ColorSelections, { proxy, absolute: true, active: data.absolute }), /* @__PURE__ */ wp.element.createElement(ColorSelections, { proxy, relative: true, active: data.relative }), /* @__PURE__ */ wp.element.createElement(ToneSelections, { proxy }));
  };

  // ../blocks/_init/init/CP/components/SelectColors.jsx
  var SelectColors = (props) => {
    const { useState: useState4, useRef: useRef4, useReducer: useReducer3, useCallback: useCallback4 } = wp.element;
    const { ColorPicker, ColorPalette, Popover: Popover2 } = wp.components;
    const { onChange } = props;
    const [index, setIndex] = useState4(-1);
    const init = useCallback4((colors2) => {
      const colorValues = colors2.map((color) => {
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
      return colorValues.map((color) => {
        return { name: color, color };
      });
    }, []);
    const reducer = useCallback4((colors2, action) => {
      const { index: index2, color } = action;
      const newColors = [...colors2];
      newColors.splice(index2, 1, { name: color, color });
      return newColors;
    }, []);
    const [colors, updateColors] = useReducer3(reducer, props.colors, init);
    const onChangeOfColorPalette = useCallback4(
      (value2) => {
        setIndex(colors.findIndex((color) => color.color == value2));
      },
      [colors]
    );
    const onChangeOfColorPicker = useCallback4(
      (value2) => {
        updateColors({ index, color: value2.hex });
        onChange(index, value2);
      },
      [onChange, index, updateColors]
    );
    return /* @__PURE__ */ wp.element.createElement("div", null, /* @__PURE__ */ wp.element.createElement(ColorPalette, { colors, value: index > -1 ? colors[index].color : "rgba(0,0,0,0)", onChange: onChangeOfColorPalette, disableCustomColors: true }), index > -1 && /* @__PURE__ */ wp.element.createElement(Popover2, { onClose: () => setIndex(-1) }, /* @__PURE__ */ wp.element.createElement(ColorPicker, { color: colors[index].color, onChangeComplete: onChangeOfColorPicker })));
  };

  // ../blocks/_init/init/CP/components/SelectButtons.jsx
  var SelectButtons = (props) => {
    const { BaseControl, Button, ButtonGroup } = wp.components;
    return /* @__PURE__ */ wp.element.createElement(BaseControl, { label: props.label, help: props.help, id: "cp-slectbuttons-" + wp.compose.useInstanceId(SelectButtons) }, /* @__PURE__ */ wp.element.createElement("div", { className: "cp-selectbuttons" }, /* @__PURE__ */ wp.element.createElement(ButtonGroup, null, props.options.map((option) => /* @__PURE__ */ wp.element.createElement(Button, { onClick: () => props.onChange(option.value), isPrimary: props.selected === option.value, key: option.value }, option.label)))));
  };

  // ../blocks/_init/init/CP/components/SelectGridButtons.jsx
  var SelectGridButtons = (props) => {
    const { BaseControl } = wp.components;
    const maxStrlen = props.options.reduce((acc, cur) => Math.max(acc, cur.label.length + cur.label.replace(/[ -~]+/, "").length), 3);
    const colNum = Math.min(6, Math.floor(36 / (maxStrlen + 2)));
    return /* @__PURE__ */ wp.element.createElement(BaseControl, { label: props.label, help: props.help, id: "cp-selectgridbuttons-" + wp.compose.useInstanceId(SelectGridButtons) }, /* @__PURE__ */ wp.element.createElement("ul", { className: "cp-selectgridbuttons col" + colNum }, props.options.map((option) => /* @__PURE__ */ wp.element.createElement("li", { onClick: () => props.onChange(option.value), className: "item" + (props.selected === option.value ? " active" : ""), key: option.value }, option.label))));
  };

  // ../blocks/_init/init/CP/components/SelectResponsiveImage.jsx
  var SelectResponsiveImage = (props) => {
    const { className = "cp-selectresponsiveimage", type, attr, set, keys = {}, index = 0, size, devices: devices2, device, showSelectPictureSources = false, isTemplate, ...otherProps } = props;
    let onClick;
    const itemsKey2 = keys.items && Array.isArray(keys.items) ? keys.items[0] : keys.items;
    const items2 = itemsKey2 && attr[itemsKey2];
    const item = CP.getItemByKeyAndIndex(props, keys?.items, index);
    if (device) {
      const sizeData = CP.devices[device];
      onClick = (e) => CP.selectImage(
        function({ src }) {
          if (keys.sources) {
            const source = item[keys.sources].find((source2) => source2.device === device);
            if (source) {
              source.srcset = src;
            } else {
              item[keys.sources].push({ device, srcset: src });
            }
            if (items2) {
              set({ [itemsKey2]: JSON.parse(JSON.stringify(items2)) });
            } else {
              set({
                [keys.sources]: JSON.parse(JSON.stringify(item[keys.sources]))
              });
            }
          } else {
            if (item[keys.srcset].match(sizeData.reg)) {
              item[keys.srcset] = item[keys.srcset].replace(sizeData.reg, src + sizeData.rep);
            } else {
              item[keys.srcset] += "," + src + sizeData.rep;
            }
            if (items2) {
              set({ [itemsKey2]: JSON.parse(JSON.stringify(items2)) });
            } else {
              set({ [keys.srcset]: item[keys.srcset] });
            }
          }
        },
        { keys: { src: "src" }, type, size: sizeData.media_size }
      );
    } else {
      onClick = (e) => {
        CP.selectImage(
          function(data) {
            if (itemsKey2) {
              Object.assign(item, data);
              set({ [itemsKey2]: JSON.parse(JSON.stringify(items2)) });
            } else {
              set(data);
            }
          },
          { keys, type, size, devices: devices2 }
        );
      };
    }
    if (isTemplate && keys.code && item[keys.code]) {
      return /* @__PURE__ */ wp.element.createElement(CP.DummyImage, { text: item[keys.code] });
    }
    return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, showSelectPictureSources ? /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImageBody, { ...props, className, item, keys }), /* @__PURE__ */ wp.element.createElement("div", { className: "cp-selectresponsiveimage__controls" }, /* @__PURE__ */ wp.element.createElement(CP.SelectPictureSources, { attr, set, keys, index, size, devices: devices2 }))) : /* @__PURE__ */ wp.element.createElement(CP.ResponsiveImageBody, { ...props, className, item, keys, style: { pointerEvents: "auto" }, onClick }));
  };

  // ../blocks/_init/init/CP/components/ResponsiveImage.jsx
  var ResponsiveImage = (props) => {
    const { className = "cp-responsiveimage", attr, set, keys, index, sizes, devices: devices2, device, isTemplate, ...otherProps } = props;
    let item = CP.getItemByKeyAndIndex(props, keys?.items, index);
    if (isTemplate && keys.code && item[keys.code]) {
      return item[keys.code];
    }
    return /* @__PURE__ */ wp.element.createElement(ResponsiveImageBody, { ...props, className, item });
  };
  var ResponsiveImageBody = (props) => {
    const { className = "cp-responsiveimage", attr, set, keys, index, devices: devices2, device, isTemplate, item, size, ...otherProps } = props;
    let { sizes } = props;
    const primaryClassName = className.split(" ")[0];
    if (item?.[keys.mime] == "application/pdf") {
      return /* @__PURE__ */ wp.element.createElement("iframe", { className: className + " is-pdf", src: item[keys.src], "data-mime": item[keys.mime], ...otherProps });
    }
    const type = item[keys.mime] ? item[keys.mime].split("/")[0] : "image";
    if (type == "audio") {
      return /* @__PURE__ */ wp.element.createElement("audio", { className: className + " is-audio", src: item[keys.src], "data-mime": item[keys.mime], ...otherProps });
    }
    if (item[keys.srcset] && !sizes) {
      if (device) {
        sizes = CP.devices[device].sizes_value;
      } else {
        sizes = CP.getImageSizesForDevices(devices2 || ["sp", "pc"]);
      }
    }
    if (type == "video") {
      const videoAtts = {
        "data-mime": item[keys.mime],
        autoplay: 1,
        loop: 1,
        playsinline: 1,
        muted: 1
      };
      if (keys.sources) {
        if (device) {
          const source = item[keys.sources] && item[keys.sources].find((source2) => source2.device === device) || {
            srcset: wpinfo.theme_url + "/images/dummy.mp4"
          };
          return /* @__PURE__ */ wp.element.createElement("video", { className: className + " is-video", src: source.srcset, ...videoAtts, ...otherProps });
        }
        return /* @__PURE__ */ wp.element.createElement("video", { className: className + " is-picture", ...videoAtts, ...otherProps }, item[keys.sources] && item[keys.sources].map((source) => /* @__PURE__ */ wp.element.createElement("source", { src: source.srcset, media: CP.devices[source.device].media_query, "data-device": source.device, key: source.device })), /* @__PURE__ */ wp.element.createElement("source", { src: item[keys.src] }));
      }
      return /* @__PURE__ */ wp.element.createElement("video", { className: className + " is-video", src: item[keys.src], ...videoAtts, ...otherProps });
    }
    var src = CP.imageSrcOrDummy(keys.src ? item[keys.src] : keys.url && item[keys.url] ? item[keys.url].slice(4, -1) : null, size);
    if (keys.sources) {
      if (device) {
        const source = item[keys.sources] && item[keys.sources].find((source2) => source2.device === device) || {
          srcset: wpinfo.theme_url + "/images/dummy.jpg"
        };
        return /* @__PURE__ */ wp.element.createElement("picture", { className: className + " is-picture", ...otherProps }, /* @__PURE__ */ wp.element.createElement("img", { className: primaryClassName + "-img", src: source.srcset, alt: item[keys.alt] }));
      }
      return /* @__PURE__ */ wp.element.createElement("picture", { className: className + " is-picture", ...otherProps }, item[keys.sources] && item[keys.sources].map((source) => /* @__PURE__ */ wp.element.createElement("source", { srcSet: source.srcset, media: CP.devices[source.device].media_query, "data-device": source.device, key: source.device })), /* @__PURE__ */ wp.element.createElement("img", { className: primaryClassName + "-img", src, alt: item[keys.alt] }));
    }
    return /* @__PURE__ */ wp.element.createElement("img", { className: className + " is-img", src, alt: item[keys.alt], srcSet: item[keys.srcset], sizes, "data-mime": item[keys.mime], ...otherProps });
  };

  // ../blocks/_init/init/CP/components/SelectPictureSources.jsx
  var SelectPictureSources = (props) => {
    const { Icon } = wp.components;
    const {
      devices: devices2 = ["sp", "tb"],
      keys = {
        mime: "mime",
        src: "src",
        alt: "alt",
        srcset: "srcset",
        sources: "sources"
      },
      compact = false
    } = props;
    const { useMemo: useMemo5 } = wp.element;
    const classes = useMemo5(() => bem("cp-selectpicturesources"), []);
    return /* @__PURE__ */ wp.element.createElement("table", { className: classes({ "is-compact": compact }) }, /* @__PURE__ */ wp.element.createElement("tbody", { className: classes.tbody() }, /* @__PURE__ */ wp.element.createElement("tr", { className: classes.tbody.tr() }, /* @__PURE__ */ wp.element.createElement("td", { className: classes.tbody.tr.td(), colSpan: devices2.length }, /* @__PURE__ */ wp.element.createElement(CP.SelectResponsiveImage, { ...props, keys, devices: devices2 }))), /* @__PURE__ */ wp.element.createElement("tr", { className: classes.tbody.tr() }, devices2.map((device) => /* @__PURE__ */ wp.element.createElement("td", { className: classes.tbody.tr.td(), key: device }, /* @__PURE__ */ wp.element.createElement("div", { className: classes.tbody.tr.td.label() }, /* @__PURE__ */ wp.element.createElement(Icon, { icon: CP.devices[device].icon })), /* @__PURE__ */ wp.element.createElement(CP.SelectResponsiveImage, { ...props, keys, devices: devices2, device }))))));
  };

  // ../blocks/_init/init/CP/components/SelectPreparedImage.jsx
  var SelectPreparedImage = ({ className, name, value: value2, color = 0, onChange, ...otherProps }) => {
    let onClick;
    const { useEffect: useEffect6, useReducer: useReducer3 } = wp.element;
    const { getURLparam, setURLparam, setURLparams, removeURLparam } = Catpow.util;
    const [state, dispatch] = useReducer3(
      (state2, action) => {
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
              const bareURL = removeURLparam(value2, "c");
              newState.image = action.images.find((image) => image.url === bareURL);
            }
            if (action.image) {
              newState.image = action.image;
            }
        }
        return newState;
      },
      { page: 0, images: null, image: null }
    );
    useEffect6(() => {
      if (state.images === null) {
        if (CP.cache.get([SelectPreparedImage, name])) {
          dispatch({ type: "update", images: CP.cache.PreparedImage[name] });
        } else {
          wp.apiFetch({ path: "cp/v1/images/" + name }).then((images) => {
            CP.cache.set([SelectPreparedImage, name], images);
            dispatch({ type: "update", images });
          });
        }
      }
    }, [state.images]);
    useEffect6(() => {
      onChange({
        ...state.image,
        url: setURLparams(state.image ? state.image.url : value2, {
          c: color,
          theme: wpinfo.theme
        })
      });
    }, [state.image]);
    if (state.images === null) {
      return false;
    }
    return /* @__PURE__ */ wp.element.createElement("ul", { className: "cp-selectpreparedimage " + name + " " + className, ...otherProps }, state.images.map((image) => {
      const url = setURLparams(image.url, { c: color, theme: wpinfo.theme });
      return /* @__PURE__ */ wp.element.createElement("li", { className: "item " + (value2 == url ? "active" : ""), key: image.url }, /* @__PURE__ */ wp.element.createElement("img", { src: url, alt: image.alt, onClick: () => dispatch({ type: "update", image }) }));
    }));
  };

  // ../blocks/_init/init/CP/components/SelectPreparedImageSet.jsx
  var SelectPreparedImageSet = ({ className, name, value: value2, color = 0, onChange, ...otherProps }) => {
    const { getURLparam, setURLparam, setURLparams, removeURLparam } = Catpow.util;
    const [state, dispatch] = wp.element.useReducer(
      (state2, action) => {
        switch (action.type) {
          case "update": {
            const newState = { ...state2 };
            if (action.imagesets) {
              newState.imagesets = action.imagesets;
              const bareURL = removeURLparam(value2, "c");
              for (const key in newState.imagesets) {
                if (newState.imagesets[key].url === bareURL) {
                  newState.imageset = {
                    ...newState.imagesets[key],
                    url: setURLparams(bareURL, { c: color, theme: wpinfo.theme })
                  };
                  break;
                }
              }
            }
            if (action.imageset) {
              newState.imageset = action.imageset;
            }
            if (newState.imageset) {
              onChange(
                newState.imageset.map((item) => {
                  return {
                    ...item,
                    url: setURLparams(item.url, {
                      c: color,
                      theme: wpinfo.theme
                    })
                  };
                })
              );
            }
            return newState;
          }
        }
        return state2;
      },
      { page: 0, imagesets: null, imageset: null }
    );
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
    return /* @__PURE__ */ wp.element.createElement("ul", { className: "cp-selectpreparedimageset " + name + " " + className, ...otherProps }, Object.keys(state.imagesets).map((key) => {
      const imageset = state.imagesets[key];
      const url = setURLparams(imageset[0].url, {
        c: color,
        theme: wpinfo.theme
      });
      return /* @__PURE__ */ wp.element.createElement("li", { className: "item " + (value2 == url ? "active" : ""), key }, /* @__PURE__ */ wp.element.createElement("img", { src: url, alt: imageset[0].alt, onClick: () => dispatch({ type: "update", imageset }) }));
    }));
  };

  // ../blocks/_init/init/CP/components/InputIcon.jsx
  var InputIcon = (props) => {
    return wp.element.createElement(CP[wp.hooks.applyFilters("catpow.IconComponent", "StandardIcon")].Input, props);
  };

  // ../blocks/_init/init/CP/components/OutputIcon.jsx
  var OutputIcon = (props) => {
    return wp.element.createElement(CP[wp.hooks.applyFilters("catpow.IconComponent", "StandardIcon")].Output, props);
  };

  // ../blocks/_init/init/CP/components/StandardIcon.jsx
  var StandardIcon = {
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
      const { className = "icon", item } = props;
      return /* @__PURE__ */ wp.element.createElement("span", { className }, /* @__PURE__ */ wp.element.createElement("img", { src: item.iconSrc, alt: item.iconAlt }));
    }
  };

  // ../blocks/_init/init/CP/components/DataInputTable.jsx
  var DataInputTable = (props) => {
    const { cols, value: value2, onChange } = props;
    const { useCallback: useCallback4, useMemo: useMemo5 } = wp.element;
    const el = wp.element.createElement;
    const Row = useCallback4((props2) => {
      const { cols: cols2, value: value3, onChange: onChange2 } = props2;
      return /* @__PURE__ */ wp.element.createElement("tr", { className: "cp-datainputtable__body__row" }, Object.keys(cols2).map((c) => /* @__PURE__ */ wp.element.createElement("td", { className: "cp-datainputtable__body__row__cell", key: c }, /* @__PURE__ */ wp.element.createElement(
        CP.DynamicInput,
        {
          value: value3[c],
          onChange: (val) => {
            value3[c] = val;
            onChange2(value3);
          },
          param: cols2[c]
        }
      ))));
    }, []);
    const defaultRowValues = useMemo5(() => {
      const rowValue = {};
      Object.keys(cols).forEach((c) => {
        rowValue[c] = cols[c].default || "";
      });
      return [rowValue];
    }, [cols]);
    const colsWithoutLabel = useMemo5(() => {
      const colsWithoutLabel2 = {};
      Object.keys(cols).forEach((c) => {
        const { label, ...otherParams } = cols[c];
        colsWithoutLabel2[c] = otherParams;
      });
      return colsWithoutLabel2;
    }, [cols]);
    return /* @__PURE__ */ wp.element.createElement("table", { className: "cp-datainputtable" }, /* @__PURE__ */ wp.element.createElement("thead", { className: "cp-datainputtable__head" }, /* @__PURE__ */ wp.element.createElement("tr", { className: "cp-datainputtable__head__row" }, Object.keys(cols).map((c) => /* @__PURE__ */ wp.element.createElement("th", { className: "cp-datainputtable__head__row__cell", key: c }, cols[c].label || c)))), /* @__PURE__ */ wp.element.createElement("tbody", { className: "cp-datainputtable__body" }, (value2 || defaultRowValues).map((rowValue, index) => /* @__PURE__ */ wp.element.createElement(
      Row,
      {
        cols: colsWithoutLabel,
        value: rowValue,
        onChange: (rowValue2) => {
          if (!value2) {
            onChange([rowValue2]);
            return;
          }
          value2[index] = rowValue2;
          onChange(value2);
        },
        onDelete: () => {
          if (!value2) {
            onChange([]);
            return;
          }
          value2.splice(index, 1);
          onChange(value2);
        },
        onClone: () => {
          if (!value2) {
            onChange([defaultRowValues]);
            return;
          }
          value2.splice(index, 0, JSON.parse(JSON.stringify(rowValue)));
          onChange(value2);
        },
        key: index
      }
    ))));
  };

  // ../blocks/_init/init/CP/components/DynamicInput.jsx
  var DynamicInput = (props) => {
    const { useMemo: useMemo5 } = wp.element;
    const { RadioControl, RangeControl: RangeControl2, SelectControl, TextControl: TextControl2, TextareaControl, ToggleControl } = wp.components;
    const { param, value: value2, onChange } = props;
    const type = param.type || param.input || "text";
    const { options: options3 } = useMemo5(() => {
      if (!param.options && !param.values) {
        return {};
      }
      return CP.parseSelections(param.options || param.values);
    }, [param.options, param.values]);
    switch (type) {
      case "radio": {
        return /* @__PURE__ */ wp.element.createElement(RadioControl, { label: param.label || null, onChange, selected: value2, options: options3 });
      }
      case "select": {
        return /* @__PURE__ */ wp.element.createElement(SelectControl, { label: param.label || null, onChange, value: value2, options: options3 });
      }
      case "buttons": {
        return /* @__PURE__ */ wp.element.createElement(CP.SelectButtons, { label: param.label || null, onChange, selected: value2, options: options3 });
      }
      case "gridbuttons": {
        return /* @__PURE__ */ wp.element.createElement(CP.SelectGridButtons, { label: param.label || null, onChange, selected: value2, options: options3 });
      }
      case "range": {
        if (!param.coef) {
          param.coef = 1;
        }
        return /* @__PURE__ */ wp.element.createElement(
          RangeControl2,
          {
            label: param.label || null,
            onChange: (value3) => onChange(param.unit ? value3 * param.coef + param.unit : value3 * param.coef),
            value: parseFloat(value2) / param.coef,
            min: param.min || 0,
            max: param.max || 10,
            step: param.step || 1
          }
        );
      }
      case "bool": {
        return /* @__PURE__ */ wp.element.createElement(ToggleControl, { label: param.label || null, checked: value2, onChange });
      }
      case "data": {
        return /* @__PURE__ */ wp.element.createElement(CP.DataInputTable, { label: param.label || null, cols: param.cols, value: value2, onChange });
      }
      case "textarea": {
        return /* @__PURE__ */ wp.element.createElement(TextareaControl, { label: param.label || null, value: value2, onChange });
      }
      default: {
        return /* @__PURE__ */ wp.element.createElement(TextControl2, { label: param.label || null, type: param.type, value: value2, onChange, list: param.list && CP.getDataListId(param.list, param.values) });
      }
    }
  };

  // ../blocks/_init/init/CP/components/DataSetInput.jsx
  var DataSetInput = (props) => {
    const { useMemo: useMemo5, useCallback: useCallback4 } = wp.element;
    const { param, value: dataSet = [], onChange } = props;
    const classes = bem("cp-datasetinput");
    const appendData = useCallback4(() => {
      const data = {};
      Object.keys(param.items).forEach((key) => {
        const item = param.items[key];
        if (item.hasOwnProperty("default")) {
          data[key] = item.default;
        } else {
          data[key] = null;
        }
      });
      dataSet.push(data);
      onChange(dataSet.slice());
    }, [param.items, dataSet, onChange]);
    return /* @__PURE__ */ wp.element.createElement("ul", { className: classes() }, dataSet && dataSet.map((data, index) => {
      const dataProps = {
        tag: "li",
        set: ({ dataSet: dataSet2 }) => {
          onChange(dataSet2);
        },
        items: dataSet,
        itemsKey: "dataset",
        index
      };
      return /* @__PURE__ */ wp.element.createElement("li", { className: classes.row(), key: index }, /* @__PURE__ */ wp.element.createElement("ul", { className: classes.row.items() }, Object.keys(param.items).map((key) => {
        return /* @__PURE__ */ wp.element.createElement("li", { className: classes.row.items.item(), key }, /* @__PURE__ */ wp.element.createElement(
          CP.DynamicInput,
          {
            param: param.items[key],
            value: data[key],
            onChange: (value2) => {
              data[key] = value2;
              onChange(dataSet.slice());
            }
          }
        ));
      })), /* @__PURE__ */ wp.element.createElement(
        CP.ItemControl,
        {
          controls: {
            delete: (e) => CP.deleteItem(dataProps),
            clone: (e) => CP.cloneItem(dataProps),
            up: (e) => CP.upItem(dataProps),
            down: (e) => CP.downItem(dataProps)
          }
        }
      ));
    }), /* @__PURE__ */ wp.element.createElement("li", { className: classes.row() }, /* @__PURE__ */ wp.element.createElement("div", { className: classes.row.button("is-button-append"), onClick: appendData })));
  };

  // node_modules/clsx/dist/clsx.mjs
  function r(e) {
    var t, f, n = "";
    if ("string" == typeof e || "number" == typeof e) n += e;
    else if ("object" == typeof e) if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else for (f in e) e[f] && (n && (n += " "), n += f);
    return n;
  }
  function clsx() {
    for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
    return n;
  }
  var clsx_default = clsx;

  // ../blocks/_init/init/CP/components/Item.jsx
  var Item = (props) => {
    const { tag = "div", items: items2, index, indexKey = "currentItemIndex", set, attr, children } = props;
    const isSelected = props.isSelected === void 0 ? index == attr[indexKey] : props.isSelected;
    return wp.element.createElement(
      tag,
      {
        className: clsx_default(props.className || items2[index].classes, "cp-item"),
        style: props.style,
        "data-index": index,
        "data-refine-cond": items2[index]["cond"],
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
          set({ [indexKey]: index });
        }
      },
      /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, children, isSelected && /* @__PURE__ */ wp.element.createElement(
        CP.ItemControl,
        {
          tag: tag === "tr" ? "td" : "div",
          controls: {
            delete: (e) => CP.deleteItem(props),
            clone: (e) => CP.cloneItem(props),
            up: (e) => CP.upItem(props),
            down: (e) => CP.downItem(props)
          }
        }
      ))
    );
  };

  // ../blocks/_init/init/CP/components/ItemControl.jsx
  var ItemControl = (props) => {
    const { className = "", tag: Tag = "div", controls, float = true, children } = props;
    const { useState: useState4 } = wp.element;
    const [open, setOpen] = useState4(false);
    return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "cp" }, /* @__PURE__ */ wp.element.createElement(
      Tag,
      {
        className: clsx_default("itemcontrol-", className, {
          "is-open": open,
          "is-position-absolute": float
        })
      },
      Object.keys(controls).map((key) => {
        return /* @__PURE__ */ wp.element.createElement("div", { className: clsx_default("-button", "is-" + key), onClick: controls[key], key });
      }),
      children && /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { className: clsx_default("-button", "is-edit"), onClick: () => setOpen(!open) }), /* @__PURE__ */ wp.element.createElement("div", { className: "-inputs" }, children))
    ));
  };

  // ../blocks/_init/init/CP/components/ItemControlInfoPanel.jsx
  var ItemControlInfoPanel = () => {
    const { PanelBody } = wp.components;
    return /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "\u64CD\u4F5C", initialOpen: false, icon: "info" }, /* @__PURE__ */ wp.element.createElement("table", null, /* @__PURE__ */ wp.element.createElement("tbody", null, /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("th", null, "\u2318/Ctrl + S"), /* @__PURE__ */ wp.element.createElement("td", null, "\u4FDD\u5B58")), /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("th", null, "\u2318/Ctrl + D"), /* @__PURE__ */ wp.element.createElement("td", null, "\u8907\u88FD")), /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("th", null, "\u2318/Ctrl + delete"), /* @__PURE__ */ wp.element.createElement("td", null, "\u524A\u9664")), /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("th", null, "\u2318/Ctrl + \u2191"), /* @__PURE__ */ wp.element.createElement("td", null, "\u524D\u306E\u30A2\u30A4\u30C6\u30E0\u3068\u5165\u308C\u66FF\u3048")), /* @__PURE__ */ wp.element.createElement("tr", null, /* @__PURE__ */ wp.element.createElement("th", null, "\u2318/Ctrl + \u2193"), /* @__PURE__ */ wp.element.createElement("td", null, "\u6B21\u306E\u30A2\u30A4\u30C6\u30E0\u3068\u5165\u308C\u66FF\u3048")))));
  };

  // ../blocks/_init/init/CP/components/SelectClassPanelBlock.jsx
  var { __ } = wp.i18n;
  var SelectClassPanelBlock = ({ prm }) => {
    const { Fragment: Fragment2, useMemo: useMemo5, useContext: useContext3, createElement: el } = wp.element;
    const { CheckboxControl, RadioControl, SelectControl, TextareaControl, TextControl: TextControl2, ColorPicker, __experimentalGradientPicker: GradientPicker } = wp.components;
    const { props, item, states, allStates, set, save, saveClasses, saveCss, primaryClassKey } = useContext3(SelectClassPanelContext);
    const { subItemsKey } = props;
    if (prm.hasOwnProperty("cond")) {
      if (prm.cond === false) {
        return false;
      }
      if (Array.isArray(prm.cond) && prm.cond.some((className) => !states[className])) {
        return false;
      }
      if (typeof prm.cond === "string" && !states[prm.cond]) {
        return false;
      }
      if (typeof prm.cond === "function" && !prm.cond(states, props)) {
        return false;
      }
    }
    let rtn = [];
    if (prm.keys) {
      if (props.items) {
        prm.keys.items = prm.keys.items || props.itemsKey;
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
                  value: JSON.parse(props.attr[prm.json])[prm.key],
                  onChange: (val) => {
                    if (prm.filter) {
                      val = prm.filter(val, states, props);
                    }
                    CP.setJsonValue(props, prm.json, prm.key, val);
                    if (prm.effect) {
                      prm.effect(val, states, props);
                    }
                  }
                }
              )
            );
            break;
          }
          case "picture": {
            if (prm.label) {
              rtn.push(/* @__PURE__ */ wp.element.createElement("h5", null, prm.label));
            }
            let attr = JSON.parse(props.attr[prm.json]) || {};
            if (prm.key) {
              attr = attr[prm.key] || {};
            }
            rtn.push(
              /* @__PURE__ */ wp.element.createElement(
                CP.SelectPictureSources,
                {
                  index: props.index,
                  set: (val) => {
                    if (prm.filter) {
                      val = prm.filter(val, states, props);
                    }
                    if (prm.key) {
                      CP.setJsonValue(props, prm.json, prm.key, Object.assign(attr, val));
                    } else {
                      CP.setJsonValues(props, prm.json, prm.keys, val);
                    }
                    if (prm.effect) {
                      prm.effect(val, states, props);
                    }
                  },
                  attr,
                  keys: prm.keys,
                  sizes: prm.sizes,
                  devices: prm.devices,
                  isTemplate: prm.isTemplate
                }
              )
            );
            break;
          }
          case "flag": {
            let value2 = CP.getJsonValue(props, prm.json, prm.key) || 0;
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
                      value2 |= prm.values[key];
                      if (!flag) {
                        value2 ^= prm.values[key];
                      }
                      CP.setJsonValue(props, prm.json, prm.key, value2);
                    },
                    checked: value2 & prm.values[key],
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
                  color: CP.getJsonValue(props, prm.json, prm.key) || "#FFFFFF",
                  onChangeComplete: (value2) => {
                    CP.setJsonValue(props, prm.json, prm.key, value2.hex);
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
                  colors: CP.getJsonValue(props, prm.json, prm.key) || [
                    { h: "40", s: "80%", l: "50%" },
                    { h: "60", s: "80%", l: "50%" }
                  ],
                  onChange: (colors) => {
                    CP.setJsonValue(props, prm.json, prm.key, colors);
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
                  onChange: (value2) => {
                    console.log(CP.parseGradientStyleValue(value2));
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
              if (prm.sub[JSON.parse(props.attr[prm.json])[prm.key]]) {
                let sub = [];
                prm.sub[JSON.parse(props.attr[prm.json])[prm.key]].forEach((prm2) => {
                  sub.push(el(SelectClass, { prm: prm2 }));
                });
                rtn.push(/* @__PURE__ */ wp.element.createElement("div", { className: "sub" }, sub));
              }
            }
            break;
          }
          case "bool": {
            if (prm.sub) {
              if (JSON.parse(props.attr[prm.json])[prm.key]) {
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
        let { options: options4, values: values2 } = CP.parseSelections(prm.values);
        rtn.push(
          /* @__PURE__ */ wp.element.createElement(
            SelectControl,
            {
              label: prm.label,
              value: CP.getJsonValue(props, prm.json, prm.key),
              onChange: (val) => {
                CP.setJsonValue(props, prm.json, prm.key, val);
              },
              options: options4
            }
          )
        );
        if (prm.sub) {
          let currentValue = CP.getJsonValue(props, prm.json, prm.key);
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
                CP.switchJsonValue(props, prm.json, prm.key, prm.values);
              },
              checked: CP.hasJsonValue(props, prm.json, prm.key, prm.values)
            }
          )
        );
        if (prm.sub) {
          if (CP.getJsonValue(props, prm.json, prm.key)) {
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
            TextControl2,
            {
              label: prm.label,
              value: JSON.parse(props.attr[prm.json])[prm.key],
              onChange: (val) => {
                CP.setJsonValue(props, prm.json, prm.key, val);
              }
            }
          )
        );
      }
    } else if (prm.css) {
      const { device = "pc" } = prm;
      const media = CP.getMediaQueryKeyForDevice(device);
      const sel = typeof prm.sel === "function" ? prm.sel(props) : prm.sel;
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
                  value: CP.getUrlInStyleCode(tgt.borderImage),
                  color: prm.color || 0,
                  onChange: (image) => {
                    if (!image.conf) {
                      return;
                    }
                    const { slice: slice2, width, repeat } = image.conf;
                    tgt.borderStyle = "solid";
                    tgt.borderImage = "url(" + image.url + ") fill " + slice2 + " / " + width + " " + repeat;
                    saveCss(prm.css);
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
                  value: CP.getUrlInStyleCode(tgt.backgroundImage),
                  color: prm.color || 0,
                  onChange: (image) => {
                    if (!image.conf) {
                      return;
                    }
                    const { size, width, height, repeat, x, y } = image.conf;
                    tgt.backgroundImage = "url(" + image.url + ")";
                    if (width && height) {
                      tgt.backgroundSize = width + "px " + height + "px";
                    } else if (size) {
                      tgt.backgroundSize = CP.translateCssVal("background-size", size);
                    } else {
                      delete tgt.backgroundSize;
                    }
                    if (repeat) {
                      tgt.backgroundRepeat = CP.translateCssVal("background-repeat", repeat);
                    } else {
                      delete tgt.backgroundRepeat;
                    }
                    if (x && y) {
                      tgt.backgroundPosition = x + "% " + y + "%";
                    } else {
                      delete tgt.backgroundPosition;
                    }
                    saveCss(prm.css);
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
                  value: CP.getUrlInStyleCode(tgt.borderImage),
                  color: prm.color || 0,
                  onChange: (imageset) => {
                    imageset.forEach((image) => {
                      if (!image.conf) {
                        return;
                      }
                      const { device: device2, slice: slice2, width, repeat } = image.conf;
                      const media2 = CP.getMediaQueryKeyForDevice(device2);
                      styleDatas[prm.css][media2] = styleDatas[prm.css][media2] || {};
                      styleDatas[prm.css][media2][sel] = styleDatas[prm.css][media2][sel] || {};
                      styleDatas[prm.css][media2][sel].borderStyle = "solid";
                      styleDatas[prm.css][media2][sel].borderImage = "url(" + image.url + ") fill " + slice2 + " / " + width + " " + repeat;
                    });
                    saveCss(prm.css);
                  }
                }
              )
            );
            break;
        }
      } else {
        rtn.push(
          /* @__PURE__ */ wp.element.createElement(
            TextControl2,
            {
              label: prm.label,
              value: tgt[prm.attr],
              onChange: (val) => {
                tgt[prm.attr] = val;
                saveCss(prm.css);
              }
            }
          )
        );
      }
    } else if (prm.vars) {
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
                  value: props.attr?.[prm.vars]?.[prm.key],
                  onChange: (val) => {
                    if (prm.filter) {
                      val = prm.filter(val, states, props);
                    }
                    save({
                      [prm.vars]: {
                        ...props.attr[prm.vars],
                        [prm.key]: `${val}`
                      }
                    });
                  }
                }
              )
            );
            break;
          }
          case "customColorVars": {
            rtn.push(
              /* @__PURE__ */ wp.element.createElement(
                CP.CustomColorVars,
                {
                  value: props.attr[prm.vars],
                  onChange: (vars) => {
                    const newVars = { ...props.attr[prm.vars] };
                    Object.keys(vars).forEach((key) => {
                      if (vars[key] === null) {
                        delete newVars[key];
                      } else {
                        newVars[key] = vars[key];
                      }
                    });
                    save({ [prm.vars]: newVars });
                  }
                }
              )
            );
            break;
          }
          case "blendmode": {
            rtn.push(
              /* @__PURE__ */ wp.element.createElement(
                CP.SelectBlendMode,
                {
                  label: prm.label,
                  value: props.attr?.[prm.vars]?.[prm.key],
                  onChange: (val) => {
                    save({
                      [prm.vars]: {
                        ...props.attr[prm.vars],
                        [prm.key]: `${val}`
                      }
                    });
                  }
                }
              )
            );
            break;
          }
          case "image": {
            rtn.push(
              /* @__PURE__ */ wp.element.createElement(
                CP.SelectResponsiveImage,
                {
                  attr: props.attr[prm.vars],
                  set: (data) => {
                    save({
                      [prm.vars]: {
                        ...props.attr[prm.vars],
                        ...data
                      }
                    });
                  },
                  keys: { url: prm.key }
                }
              )
            );
            break;
          }
          case "position": {
            rtn.push(
              /* @__PURE__ */ wp.element.createElement(
                CP.PositionInput,
                {
                  label: prm.label,
                  value: props.attr?.[prm.vars]?.[prm.key],
                  onChange: (val) => {
                    save({
                      [prm.vars]: {
                        ...props.attr[prm.vars],
                        [prm.key]: `${val}`
                      }
                    });
                  }
                }
              )
            );
            break;
          }
          case "size": {
            rtn.push(
              /* @__PURE__ */ wp.element.createElement(
                CP.SelectSize,
                {
                  label: prm.label,
                  value: props.attr?.[prm.vars]?.[prm.key],
                  onChange: (val) => {
                    save({
                      [prm.vars]: {
                        ...props.attr[prm.vars],
                        [prm.key]: `${val}`
                      }
                    });
                  }
                }
              )
            );
            break;
          }
        }
      } else {
        rtn.push(
          /* @__PURE__ */ wp.element.createElement(
            TextControl2,
            {
              label: prm.label,
              value: props.attr?.[prm.vars]?.[prm.key],
              onChange: (val) => {
                save({
                  [prm.vars]: { ...props.attr[prm.vars], [prm.key]: `${val}` }
                });
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
              label: __("\u8272", "catpow"),
              selected: states,
              onChange: (proxy) => {
                if (!props.items) {
                  set({ color: proxy.value });
                }
                saveClasses();
              }
            }
          )
        );
      } else if (prm === "pattern") {
        rtn.push(
          /* @__PURE__ */ wp.element.createElement(
            CP.SelectPatternClass,
            {
              label: __("\u30D1\u30BF\u30FC\u30F3", "catpow"),
              set: props.set,
              attr: props.attr,
              selected: Object.keys(states).find((key) => /^pattern\d+/.test(key)),
              onChange: (pattern) => {
                CP.filterFlags(states, (key) => !/^pattern\d+/.test(key));
                states[pattern] = true;
                saveClasses();
              }
            }
          )
        );
      } else if (prm === "cond") {
        rtn.push(/* @__PURE__ */ wp.element.createElement(TextareaControl, { label: __("\u8868\u793A\u6761\u4EF6", "catpow"), value: item["cond"], onChange: (cond) => save({ cond }) }));
      } else if (prm === "event") {
        const EventInputs = useMemo5(() => wp.hooks.applyFilters("catpow.EventInputs", [], { item, save }), [item, save]);
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
                  value: item[prm.key],
                  onChange: (val) => {
                    if (prm.filter) {
                      val = prm.filter(val, states, props);
                    }
                    save({ [prm.key]: val });
                    if (prm.effect) {
                      prm.effect(val, states, props);
                    }
                  }
                }
              )
            );
            break;
          }
          case "dataset": {
            if (prm.label) {
              rtn.push(/* @__PURE__ */ wp.element.createElement("h5", null, prm.label));
            }
            rtn.push(
              /* @__PURE__ */ wp.element.createElement(
                CP.DataSetInput,
                {
                  param: prm,
                  value: item[prm.key],
                  onChange: (val) => {
                    if (prm.filter) {
                      val = prm.filter(val, states, props);
                    }
                    save({ [prm.key]: val });
                    if (prm.effect) {
                      prm.effect(val, states, props);
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
                  index: props.index,
                  set: props.set,
                  attr: props.attr,
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
            rtn.push(/* @__PURE__ */ wp.element.createElement(CP.SelectPictureSources, { index: props.index, set: props.set, attr: props.attr, keys: prm.keys, sizes: prm.sizes, devices: prm.devices, isTemplate: prm.isTemplate }));
            break;
          }
          case "position": {
            rtn.push(/* @__PURE__ */ wp.element.createElement(CP.SelectPositionClass, { set: props.set, attr: props.attr, label: prm.label, key: prm.key, help: prm.help, disable: prm.disable, itemsKey, index: props.index }));
          }
          case "icon": {
            if (prm.label) {
              rtn.push(/* @__PURE__ */ wp.element.createElement("h5", null, prm.label));
            }
            rtn.push(/* @__PURE__ */ wp.element.createElement(CP.InputIcon, { prm, item, save }));
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
                  value: item[prm.keys.src],
                  color: prm.color || CP.getColor({ attr: item }) || 0,
                  onChange: (image) => {
                    save({
                      [prm.keys.src]: image.url,
                      [prm.keys.alt]: image.alt
                    });
                  }
                }
              )
            );
            break;
          }
          case "json": {
            if (prm.label) {
              rtn.push(/* @__PURE__ */ wp.element.createElement("h5", null, prm.label));
            }
            rtn.push(
              /* @__PURE__ */ wp.element.createElement(
                Catpow.JsonEditor,
                {
                  title: prm.label,
                  schema: prm.schema,
                  json: item[prm.key],
                  autoSave: 100,
                  showHeader: false,
                  debug: prm.debug,
                  onChange: (val) => {
                    val = { ...val };
                    console.log(val);
                    if (prm.filter) {
                      val = prm.filter(val, states, props);
                    }
                    save({ [prm.key]: val });
                    if (prm.effect) {
                      prm.effect(val, states, props);
                    }
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
            if (prm.sub && prm.sub[item[prm.key]]) {
              let sub = [];
              prm.sub[item[prm.key]].forEach((prm2) => {
                sub.push(el(SelectClass, { prm: prm2 }));
              });
              rtn.push(/* @__PURE__ */ wp.element.createElement("div", { className: "sub" }, sub));
            }
            break;
          }
          case "bool": {
            if (prm.sub && item[prm.key]) {
              let sub = [];
              prm.sub.forEach((prm2) => {
                sub.push(el(SelectClass, { prm: prm2 }));
              });
              rtn.push(/* @__PURE__ */ wp.element.createElement("div", { className: "sub" }, sub));
            }
            break;
          }
        }
      } else {
        const classKey = prm.classKey ? prm.classKey : primaryClassKey;
        const targetStates = allStates[classKey] || {};
        const allClassFlags = CP.getAllClassFlags(prm, primaryClassKey);
        const classFlagsByValue = CP.getClassFlagsByValue(prm, primaryClassKey);
        const bindClasseFlagsByValue = CP.getBindClassFlagsByValue(prm, primaryClassKey);
        if (_.isObject(prm.values)) {
          var { options: options3, values } = CP.parseSelections(prm.values);
          const currentClass2 = values.find((value2) => targetStates[kebabToCamel(value2)]);
          const onChangeCB = (value2) => {
            const updates = CP.getUpdatesFromStatesAndClasssFlags({
              states,
              allStates,
              allClassFlags,
              classFlags: classFlagsByValue[value2],
              bindClassFlags: bindClasseFlagsByValue[value2]
            });
            set(updates);
            if (prm.effect) {
              prm.effect(currentClass2, value2, targetStates, props);
            }
          };
          switch (prm.type) {
            case "radio": {
              rtn.push(/* @__PURE__ */ wp.element.createElement(RadioControl, { label: prm.label, onChange: onChangeCB, selected: currentClass2, options: options3 }));
              break;
            }
            case "buttons": {
              rtn.push(/* @__PURE__ */ wp.element.createElement(CP.SelectButtons, { label: prm.label, onChange: onChangeCB, selected: currentClass2, options: options3 }));
              break;
            }
            case "gridbuttons": {
              rtn.push(/* @__PURE__ */ wp.element.createElement(CP.SelectGridButtons, { label: prm.label, onChange: onChangeCB, selected: currentClass2, options: options3 }));
              break;
            }
            default: {
              rtn.push(/* @__PURE__ */ wp.element.createElement(SelectControl, { label: prm.label, onChange: onChangeCB, value: currentClass2, options: options3 }));
            }
          }
          if (prm.sub) {
            if (currentClass2 && prm.sub[currentClass2]) {
              let sub = [];
              prm.sub[currentClass2].forEach((prm2, index) => {
                sub.push(
                  /* @__PURE__ */ wp.element.createElement(Fragment2, { key: index }, /* @__PURE__ */ wp.element.createElement(SelectClassPanelBlock, { prm: prm2 }))
                );
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
                  if (targetStates[prm.values]) {
                    const updates = CP.getUpdatesFromStatesAndClasssFlags({
                      allStates,
                      allClassFlags
                    });
                    console.log({ allClassFlags, bindClasseFlagsByValue, updates });
                    set(updates);
                  } else {
                    const updates = CP.getUpdatesFromStatesAndClasssFlags({
                      allStates,
                      allClassFlags,
                      classFlags: classFlagsByValue[prm.values],
                      bindClassFlags: bindClasseFlagsByValue[prm.values]
                    });
                    console.log({ allClassFlags, bindClasseFlagsByValue, updates });
                    set(updates);
                  }
                  if (prm.effect) {
                    prm.effect(currentClass, value, targetStates, props);
                  }
                },
                checked: !!targetStates[prm.values]
              }
            )
          );
          if (prm.sub) {
            if (targetStates[prm.values]) {
              let sub = [];
              prm.sub.forEach((prm2, index) => {
                sub.push(
                  /* @__PURE__ */ wp.element.createElement(Fragment2, { key: index }, /* @__PURE__ */ wp.element.createElement(SelectClassPanelBlock, { prm: prm2 }))
                );
              });
              rtn.push(/* @__PURE__ */ wp.element.createElement("div", { className: "sub" }, sub));
            }
          }
        }
      }
    }
    return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, rtn.map((item2, index) => /* @__PURE__ */ wp.element.createElement(Fragment2, { key: index }, item2)));
  };

  // ../blocks/_init/init/CP/components/SelectClassPanel.jsx
  var { __: __2 } = wp.i18n;
  var SelectClassPanelContext = wp.element.createContext({});
  var SelectClassPanel = (props) => {
    const { Fragment: Fragment2, useMemo: useMemo5, useCallback: useCallback4, createElement: el } = wp.element;
    const { PanelBody } = wp.components;
    const {
      blockClasssKey = "classes",
      classKey: primaryClassKey = "classes",
      items: items2,
      index,
      subItemsKey,
      subIndex,
      set,
      attr,
      triggerClasses
    } = wp.hooks.applyFilters("catpow.SelectClassPanelProps", props);
    let { itemsKey: itemsKey2 = items2 ? "items" : null, itemClasses } = props;
    const selectiveClasses = useMemo5(() => {
      if (!triggerClasses || !triggerClasses.item) {
        if (Array.isArray(props.selectiveClasses)) {
          return CP.resolveSelectiveClassesPresets(props.selectiveClasses);
        }
        return CP.resolveSelectiveClassesPresets(Object.values(props.selectiveClasses));
      }
      const blockStates = CP.classNamesToFlags(attr[blockClasssKey]);
      return CP.resolveSelectiveClassesPresets(triggerClasses.item[Object.keys(triggerClasses.item).find((value2) => blockStates[value2])]);
    }, [props.selectiveClasses, triggerClasses && attr[blockClasssKey]]);
    const { styleDatas: styleDatas2 } = attr;
    const item = useMemo5(() => {
      if (!items2) {
        return attr;
      }
      if (!items2[index]) {
        return false;
      }
      if (subItemsKey) {
        return items2[index][subItemsKey][subIndex];
      }
      return items2[index];
    }, [attr, items2, index, subItemsKey, subIndex]);
    const states = useMemo5(() => CP.classNamesToFlags(item[primaryClassKey]), [item[primaryClassKey]]);
    const allStates = useMemo5(() => {
      const allStates2 = { [primaryClassKey]: states };
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
        allStates2[classKey] = CP.classNamesToFlags(item[classKey]);
      });
      return allStates2;
    }, [props.selectiveClasses, item, states, primaryClassKey]);
    const save = useCallback4(
      (data) => {
        if (items2) {
          Object.assign(item, data);
          set({ [itemsKey2]: JSON.parse(JSON.stringify(items2)) });
        } else {
          set(data);
        }
      },
      [set, index, items2, itemsKey2]
    );
    const saveClasses = useCallback4(
      (classKey) => {
        save({ [classKey]: CP.flagsToClassNames(allStates[classKey]) });
      },
      [save, allStates]
    );
    const saveCss = useCallback4(
      (cssKey) => {
        set({ [cssKey]: CP.createStyleCodeWithMediaQuery(styleDatas2[cssKey]) });
      },
      [set, styleDatas2]
    );
    if (!item || !selectiveClasses) {
      return false;
    }
    return /* @__PURE__ */ wp.element.createElement(PanelBody, { title: props.title, initialOpen: props.initialOpen || false, icon: props.icon }, /* @__PURE__ */ wp.element.createElement(CP.SelectClassPanelContext.Provider, { value: { props, item, states, allStates, set, save, saveClasses, saveCss, primaryClassKey } }, selectiveClasses.map((prm, index2) => /* @__PURE__ */ wp.element.createElement(Fragment2, { key: index2 }, /* @__PURE__ */ wp.element.createElement(SelectClassPanelBlock, { prm }))), props.children));
  };

  // ../blocks/_init/init/CP/components/AlignClassToolbar.jsx
  var AlignClassToolbar = (props) => {
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

  // ../blocks/_init/init/CP/components/VerticalAlignClassToolbar.jsx
  var VerticalAlignClassToolbar = (props) => {
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

  // ../blocks/_init/init/CP/components/PositionInput.jsx
  init_react();
  var valueToPosition = (val) => {
    let [x, y] = val ? val.split(" ") : [50, 50];
    if (x === void 0 || x === "center") {
      x = 50;
    } else if (x === "left") {
      x = 0;
    } else if (x === "right") {
      x = 100;
    } else {
      x = parseInt(x);
      if (isNaN(x)) {
        x = 50;
      }
    }
    if (y === void 0 || y === "center") {
      y = 50;
    } else if (y === "top") {
      y = 0;
    } else if (y === "bottom") {
      y = 100;
    } else {
      y = parseInt(y);
      if (isNaN(y)) {
        y = 50;
      }
    }
    return { x, y };
  };
  var positionToValue = (pos) => {
    let { x, y } = pos;
    if (x === 0) x = "left";
    else if (x === 50) x = "center";
    else if (x === 100) x = "right";
    else {
      x += "%";
    }
    if (y === 0) y = "top";
    else if (y === 50) y = "center";
    else if (y === 100) y = "bottom";
    else {
      y += "%";
    }
    return `${x} ${y}`;
  };
  var PositionInput2 = (props) => {
    const { Button, ButtonGroup, Icon } = wp.components;
    const { onChange } = props;
    const pos = useMemo2(() => valueToPosition(props.value), [props.value]);
    const [showGrid, setShowGrid] = useState(pos.x % 10 === 0 && pos.y % 10 === 0);
    return /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "cp" }, /* @__PURE__ */ wp.element.createElement("div", { className: "positioninput-" }, /* @__PURE__ */ wp.element.createElement("div", { className: "_input" }, /* @__PURE__ */ wp.element.createElement(PositionInput, { onChange: (pos2) => onChange(positionToValue(pos2)), ...pos, grid: showGrid ? 10 : 0, snap: showGrid })), /* @__PURE__ */ wp.element.createElement("div", { className: "_controls" }, /* @__PURE__ */ wp.element.createElement(
      Icon,
      {
        className: clsx("_icon", { "is-active": showGrid }),
        icon: "grid-view",
        size: 16,
        onClick: () => {
          setShowGrid(!showGrid);
        }
      }
    ))));
  };

  // ../blocks/_init/init/CP/components/SelectColorClass.jsx
  var SelectColorClass = (props) => {
    const { BaseControl } = wp.components;
    const { label, help } = props;
    return /* @__PURE__ */ wp.element.createElement(BaseControl, { label, help }, /* @__PURE__ */ wp.element.createElement(CP.SelectThemeColor, { onChange: props.onChange, selected: props.selected }));
  };

  // ../blocks/_init/init/CP/components/SelectPatternClass.jsx
  var SelectPatternClass = (props) => {
    const { BaseControl } = wp.components;
    const { label, help, selected, onChange } = props;
    var items2 = Array.from(Array(6), (v, i) => {
      var classes = "bgPattern" + i;
      const value2 = "pattern" + i;
      if (value2 == selected) {
        classes += " active";
      }
      return /* @__PURE__ */ wp.element.createElement("li", { className: classes, onClick: () => onChange(value2), key: value2 }, " ");
    });
    return /* @__PURE__ */ wp.element.createElement(BaseControl, { label, help }, /* @__PURE__ */ wp.element.createElement("ul", { className: "cp-selectpattern" }, items2));
  };

  // ../blocks/_init/init/CP/components/SelectSize.jsx
  init_react();
  var options2 = [
    { value: "cover", label: "\u5916\u63A5" },
    { value: "contain", label: "\u5185\u63A5" },
    { value: "auto", label: "\u81EA\u52D5" },
    { value: "custom", label: "\u30AB\u30B9\u30BF\u30E0" }
  ];
  var regularTypes = ["cover", "contain", "auto"];
  var SelectSize = (props) => {
    const { onChange } = props;
    const { RangeControl: RangeControl2 } = wp.components;
    const [type, setType] = useState(regularTypes.includes(props.value) ? props.value : "custom");
    const [size, setSize] = useState(parseInt(props.value) || 100);
    useEffect(() => {
      onChange(type === "custom" ? size + "px" : type);
    }, [type, size]);
    return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(CP.SelectButtons, { label: props.label, onChange: setType, selected: type, options: options2 }), type === "custom" && /* @__PURE__ */ wp.element.createElement(RangeControl2, { onChange: setSize, value: size, min: props.min || 5, max: props.max || 1e3, step: props.step || 5 }));
  };

  // ../blocks/_init/init/CP/components/SelectPositionClass.jsx
  var SelectPositionClass = (props) => {
    const { BaseControl } = wp.components;
    const rows = [
      ["topLeft", "top", "topRight"],
      ["left", "center", "right"],
      ["bottomLeft", "bottom", "bottomRight"]
    ];
    const values = _.flatten(rows);
    const { label, help, itemsKey: itemsKey2, index, disable } = props;
    let value2 = itemsKey2 ? CP.getItemSelectiveClass(props, values) : CP.getSelectiveClass(props, values);
    return /* @__PURE__ */ wp.element.createElement(BaseControl, { label, help }, /* @__PURE__ */ wp.element.createElement(CP.Bem, { prefix: "cp" }, /* @__PURE__ */ wp.element.createElement("table", { className: "selectposition-" }, /* @__PURE__ */ wp.element.createElement("tbody", { className: "_body" }, rows.map((cols, index2) => /* @__PURE__ */ wp.element.createElement("tr", { className: "_row", key: index2 }, cols.map((col) => {
      var isChecked = value2 == col;
      if (disable && disable.includes(col)) {
        return /* @__PURE__ */ wp.element.createElement("td", { className: "_cell is-disabled", key: col }, " ");
      }
      return /* @__PURE__ */ wp.element.createElement(
        "td",
        {
          className: clsx("_cell", { "is-active": isChecked }),
          onClick: () => {
            if (itemsKey2) {
              CP.switchItemSelectiveClass(props, values, col, props.key);
            } else {
              CP.switchSelectiveClass(props, values, col, props.key);
            }
          },
          key: col
        },
        " "
      );
    })))))));
  };

  // ../blocks/_init/init/CP/components/ImporterCSVPanel.jsx
  var ImporterCSVPanel = (props) => {
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

  // ../blocks/_init/init/CP/components/SelectBreakPointToolbar.jsx
  var SelectBreakPointToolbar = (props) => {
    const { ToolbarGroup: ToolbarGroup2 } = wp.components;
    return /* @__PURE__ */ wp.element.createElement(
      ToolbarGroup2,
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

  // ../blocks/_init/init/CP/components/SelectModeToolbar.jsx
  var SelectModeToolbar = (props) => {
    const { BlockControls: BlockControls2 } = wp.blockEditor;
    const { ToolbarGroup: ToolbarGroup2 } = wp.components;
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
    return /* @__PURE__ */ wp.element.createElement(BlockControls2, null, modes.map((mode) => {
      if (!attr[mode] && SomeMode) {
        return false;
      }
      if (cond[mode] && !attr[cond[mode]]) {
        return false;
      }
      return /* @__PURE__ */ wp.element.createElement(
        ToolbarGroup2,
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

  // ../blocks/_init/init/CP/components/SelectDeviceToolbar.jsx
  var SelectDeviceToolbar = (props) => {
    const { BlockControls: BlockControls2 } = wp.blockEditor;
    const { ToolbarGroup: ToolbarGroup2 } = wp.components;
    const { set, attr, devices: devices2 = ["sp", "pc"], defaultInput } = props;
    return /* @__PURE__ */ wp.element.createElement(BlockControls2, null, devices2.map((device) => {
      return /* @__PURE__ */ wp.element.createElement(
        ToolbarGroup2,
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

  // ../blocks/_init/init/CP/components/EditItemsTable.jsx
  var EditItemsTable = (props) => {
    const { set, attr, itemsKey: itemsKey2 = "items", isTemplate = false } = props;
    const { useCallback: useCallback4 } = wp.element;
    const { RichText } = wp.blockEditor;
    const classes = bem("cp-edititemstable");
    const items2 = attr[itemsKey2] || [];
    const save = () => {
      set({ [itemsKey2]: JSON.parse(JSON.stringify(items2)) });
    };
    const getActiveColumns = useCallback4((props2) => {
      const columns2 = [];
      props2.columns.forEach((col) => {
        if (col.hasOwnProperty("cond")) {
          if (typeof col.cond === "function") {
            if (!col.cond(props2.attr)) {
              return false;
            }
          } else if (!col.cond) {
            return false;
          }
        }
        if (col.type === "dynamic") {
          columns2.push.apply(columns2, col.getColumns(props2.attr));
        } else {
          columns2.push(col);
        }
      });
      return columns2;
    }, []);
    const columns = getActiveColumns(props);
    return /* @__PURE__ */ wp.element.createElement("table", { className: classes() }, /* @__PURE__ */ wp.element.createElement("thead", { className: classes.thead() }, /* @__PURE__ */ wp.element.createElement("tr", { className: classes.thead.tr() }, columns.map((col, c) => /* @__PURE__ */ wp.element.createElement("th", { className: classes.thead.tr.th(), key: c }, col.label || col.key)), /* @__PURE__ */ wp.element.createElement("th", { className: classes.thead.tr.th() }))), /* @__PURE__ */ wp.element.createElement("tbody", { className: classes.tbody() }, items2.map((item, index) => {
      const propsForControl = { tag: "tr", set, itemsKey: itemsKey2, items: items2, index };
      return /* @__PURE__ */ wp.element.createElement(
        "tr",
        {
          className: classes.tbody.tr(),
          onClick: (e) => {
            set({ currentItemIndex: index });
          },
          key: index
        },
        columns.map((col, c) => {
          switch (col.type) {
            case "text": {
              return /* @__PURE__ */ wp.element.createElement("td", { className: classes.tbody.tr.td(), key: c }, /* @__PURE__ */ wp.element.createElement(
                RichText,
                {
                  value: item[col.key],
                  onChange: (value2) => {
                    item[col.key] = value2;
                    save();
                  }
                }
              ));
            }
            case "image": {
              return /* @__PURE__ */ wp.element.createElement("td", { className: classes.tbody.tr.td(), key: c }, /* @__PURE__ */ wp.element.createElement(CP.SelectResponsiveImage, { attr, set, keys: { items: itemsKey2, src: col.key, ...col.keys }, index, size: col.size || "vga", isTemplate }));
            }
            case "picture": {
              return /* @__PURE__ */ wp.element.createElement("td", { className: classes.tbody.tr.td(), key: c }, /* @__PURE__ */ wp.element.createElement(CP.SelectPictureSources, { index, attr, set, keys: { items: itemsKey2, ...col.keys }, sizes: col.sizes, devices: col.devices, isTemplate }));
            }
            case "items": {
              col.columns.forEach((subCol) => {
                if (subCol.keys) {
                  subCol.keys.subItems = col.key;
                }
              });
              return /* @__PURE__ */ wp.element.createElement("td", { className: classes.tbody.tr.td(), key: c }, /* @__PURE__ */ wp.element.createElement(
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
          }
        }),
        /* @__PURE__ */ wp.element.createElement("td", { className: classes.tbody.tr.td() }, /* @__PURE__ */ wp.element.createElement(
          CP.ItemControl,
          {
            controls: {
              delete: (e) => CP.deleteItem(propsForControl),
              clone: (e) => CP.cloneItem(propsForControl),
              up: (e) => CP.upItem(propsForControl),
              down: (e) => CP.downItem(propsForControl)
            },
            float: false
          }
        ))
      );
    })));
  };

  // ../blocks/_init/init/CP/components/DummyImage.jsx
  var DummyImage = ({ className = "cp-dummyimage", text }) => {
    return /* @__PURE__ */ wp.element.createElement("img", { className, src: wpinfo.plugins_url + "/catpow/callee/dummy_image.php?text=" + text });
  };

  // ../blocks/_init/init/CP/components/DataStructure.jsx
  var DataStructure = (props) => {
    return /* @__PURE__ */ wp.element.createElement("ul", { className: "cp-datastructure" }, props.children);
  };
  var DataStructureItem = (props) => {
    const { useState: useState4 } = wp.element;
    const [open, setOpen] = useState4(false);
    return /* @__PURE__ */ wp.element.createElement("li", { className: "item " + (props.children ? "hasChildren " + (open ? "open" : "close") : "noChildren") }, /* @__PURE__ */ wp.element.createElement("h5", { className: "title", onClick: () => setOpen(!open) }, props.title, void 0 !== props.name && /* @__PURE__ */ wp.element.createElement("span", { className: "name" }, props.name)), !!open && !!props.children && /* @__PURE__ */ wp.element.createElement("div", { className: "children" }, props.children));
  };

  // ../blocks/_init/init/CP/components/EventInputCards.jsx
  var EventInputCards = (props) => {
    const { title, onChange } = props;
    const { useState: useState4, useReducer: useReducer3, useCallback: useCallback4, useEffect: useEffect6, useMemo: useMemo5 } = wp.element;
    const { BaseControl, Card: Card2, CardHeader, CardBody: CardBody2, CardFooter, Flex, FlexItem, FlexBlock, Icon, TextControl: TextControl2 } = wp.components;
    const { processerId, eventTypes, parseEventValue, createEventValue, createEventString, eventParams } = props.processer;
    const reducer = useCallback4((state2, action) => {
      switch (action.type) {
        case "UPDATE_ALL": {
          return { events: action.events };
        }
        case "UPDATE": {
          state2.events[action.index] = {
            ...state2.events[action.index],
            ...action.event
          };
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
    const [state, dispatch] = useReducer3(reducer, { events: [] });
    const eventParamsWithoutLabel = useMemo5(() => {
      const eventParamsWithoutLabel2 = {};
      Object.keys(eventParams).forEach((name) => {
        const { label, ...otherParams } = eventParams[name];
        eventParamsWithoutLabel2[name] = otherParams;
      });
      return eventParamsWithoutLabel2;
    }, [eventParams]);
    const eventTypeList = useMemo5(() => {
      if (!eventTypes) {
        return [];
      }
      return Object.keys(eventTypes).filter((eventType) => eventType !== "_custom");
    }, [eventTypes]);
    useEffect6(() => {
      const timer = setTimeout(() => {
        onChange(createEventValue(state.events));
      }, 500);
      return () => clearTimeout(timer);
    }, [state]);
    useEffect6(() => {
      const events = parseEventValue(props.value);
      if (events) {
        if (state.events.length < 1) {
          dispatch({ type: "UPDATE_ALL", events });
        }
      }
    }, [props.value]);
    const EventInputCard = useCallback4((props2) => {
      const { event, index, canRemove } = props2;
      const [editMode, setEditMode] = useState4(false);
      const activeEventParamNames = useMemo5(() => {
        if (eventTypes && event.eventType) {
          const eventType = eventTypes[event.eventType] || eventTypes["_custom"];
          if (eventType) {
            return Object.keys(eventParams).filter((paramName) => {
              return eventParams[paramName].common || eventType.options.indexOf(paramName) >= 0;
            });
          }
        }
        return Object.keys(eventParams).filter((paramName) => !eventParams[paramName].limited);
      }, [eventTypes, eventParams, event.eventType]);
      return /* @__PURE__ */ wp.element.createElement(Card2, { className: "cp-eventinputcard" }, /* @__PURE__ */ wp.element.createElement(CardHeader, { className: "cp-eventinputcard__header" }, /* @__PURE__ */ wp.element.createElement(Flex, null, /* @__PURE__ */ wp.element.createElement(FlexBlock, null, title), /* @__PURE__ */ wp.element.createElement(FlexItem, null, canRemove && /* @__PURE__ */ wp.element.createElement(
        Icon,
        {
          icon: "remove",
          onClick: () => {
            dispatch({ type: "REMOVE", index });
          }
        }
      ), /* @__PURE__ */ wp.element.createElement(
        Icon,
        {
          icon: "insert",
          onClick: () => {
            dispatch({ type: "CLONE", index });
          }
        }
      ), /* @__PURE__ */ wp.element.createElement(Icon, { icon: "edit", onClick: () => setEditMode(!editMode) })))), editMode && /* @__PURE__ */ wp.element.createElement(CardBody2, { className: "cp-eventinputcard__body" }, eventTypes && /* @__PURE__ */ wp.element.createElement("div", { className: "cp-eventinputcard__item" }, /* @__PURE__ */ wp.element.createElement("div", { className: "cp-eventinputcard__item__inputs" }, /* @__PURE__ */ wp.element.createElement(
        TextControl2,
        {
          value: event.eventType || "",
          onChange: (val) => {
            dispatch({
              type: "UPDATE",
              event: { eventType: val },
              index
            });
          },
          list: CP.getDataListId(processerId + "EventTypes", eventTypeList)
        }
      ))), /* @__PURE__ */ wp.element.createElement("div", { className: "cp-eventinputcard__item" }, /* @__PURE__ */ wp.element.createElement("div", { className: "cp-eventinputcard__item__pref" }, "@"), /* @__PURE__ */ wp.element.createElement("div", { className: "cp-eventinputcard__item__inputs" }, /* @__PURE__ */ wp.element.createElement(
        TextControl2,
        {
          value: event.event || "",
          onChange: (val) => {
            dispatch({ type: "UPDATE", event: { event: val }, index });
          },
          list: CP.getDataListId(props2.eventList || "mouseEvent")
        }
      ))), activeEventParamNames.map((paramName) => {
        const param = eventParams[paramName];
        return /* @__PURE__ */ wp.element.createElement("div", { className: "cp-eventinputcard__item is-type-" + (param.type || "text"), key: paramName }, /* @__PURE__ */ wp.element.createElement("div", { className: "cp-eventinputcard__item__title" }, param.label), /* @__PURE__ */ wp.element.createElement("div", { className: "cp-eventinputcard__item__inputs" }, /* @__PURE__ */ wp.element.createElement(
          CP.DynamicInput,
          {
            param: eventParamsWithoutLabel[paramName],
            value: event[paramName] || "",
            onChange: (val) => {
              dispatch({
                type: "UPDATE",
                event: { [paramName]: val },
                index
              });
            }
          }
        )));
      })), /* @__PURE__ */ wp.element.createElement(CardFooter, { className: "cp-eventinputcard__footer", size: "xSmall", justify: "center" }, createEventString(event)));
    }, []);
    return /* @__PURE__ */ wp.element.createElement(BaseControl, null, state.events.length > 0 ? state.events.map((event, index) => /* @__PURE__ */ wp.element.createElement(EventInputCard, { event, index, canRemove: state.events.length > 1, key: index })) : /* @__PURE__ */ wp.element.createElement(EventInputCard, { event: {}, index: 0 }));
  };

  // ../blocks/_init/init/CP/components/ServerSideRender.jsx
  var ServerSideRender = (props) => {
    const { className, block, attributes } = props;
    const { RawHTML, useState: useState4, useMemo: useMemo5, useRef: useRef4, useEffect: useEffect6 } = wp.element;
    const { useDebounce } = wp.compose;
    const [response, setResponse] = useState4(false);
    const [hold, setHold] = useState4(false);
    const [stylesheets, setStylesheets] = useState4([]);
    useEffect6(() => {
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

  // ../blocks/_init/init/CP/components/ServerSideRenderPart.jsx
  var ServerSideRenderPart = (props) => {
    const { className, ...otherProps } = props;
    return /* @__PURE__ */ wp.element.createElement("div", { className }, "[ssr_parts" + Object.keys(otherProps).reduce((p, c) => p += ` ${c}=${otherProps[c]}`, "") + "]");
  };
  ServerSideRenderPart.Preview = (props) => {
    const { className, name, ...otherProps } = props;
    const { RawHTML, useState: useState4, useMemo: useMemo5, useRef: useRef4, useEffect: useEffect6 } = wp.element;
    const [response, setResponse] = useState4(false);
    const [hold, setHold] = useState4(false);
    const [stylesheets, setStylesheets] = useState4([]);
    useEffect6(() => {
      if (hold) {
        return;
      }
      const path = "/cp/v1/blocks/parts/" + name;
      const data = otherProps;
      console.log(data);
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
        console.error(res);
      }).finally(() => {
        setTimeout(() => setHold(false), 500);
      });
      setHold(true);
    }, [name, JSON.stringify(otherProps)]);
    return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(RawHTML, { className }, response), stylesheets.map((stylesheet) => /* @__PURE__ */ wp.element.createElement("link", { rel: "stylesheet", href: stylesheet, key: stylesheet })));
  };

  // ../blocks/_init/init/CP/components/ColorVarTracer.jsx
  var ColorVarTracer = (props) => {
    const { target } = props;
    const { useMemo: useMemo5 } = wp.element;
    const vars = useMemo5(() => {
      const vars2 = {};
      if (target) {
        const styles = getComputedStyle(target);
        ["b", "s", "t", "m", "a", "i"].forEach((k) => {
          ["h", "s", "l"].forEach((r2) => {
            ["", "-container"].forEach((p) => {
              const name = `--cp${p}-tones-${k}-${r2}`;
              vars2[name] = styles.getPropertyValue(name);
            });
          });
        });
      }
      return vars2;
    }, [target]);
    return /* @__PURE__ */ wp.element.createElement("div", { style: vars }, props.children);
  };

  // ../blocks/_init/init/CP/components/PlacedPictures.jsx
  var PlacedPictures = (props) => {
    const { className, attr, keys, index } = props;
    const item = keys.items ? attr[keys.items][index] : attr;
    const pictures = item[keys.pictures];
    return /* @__PURE__ */ wp.element.createElement("div", { className }, pictures && pictures.map((picture, index2) => {
      const { style, code, sources, src, alt } = picture;
      return /* @__PURE__ */ wp.element.createElement("div", { className: "item", style: CP.parseStyleString(style), key: index2 }, code || /* @__PURE__ */ wp.element.createElement("picture", { className: "picture" }, sources && sources.map((source) => /* @__PURE__ */ wp.element.createElement("source", { srcSet: source.srcset, media: CP.devices[source.device].media_query, "data-device": source.device, key: source.device })), /* @__PURE__ */ wp.element.createElement("img", { className: "img", src, alt })));
    }));
  };
  PlacedPictures.Edit = (props) => {
    const { className, set, attr, keys, index, devices: devices2 } = props;
    const { useState: useState4, useMemo: useMemo5, useCallback: useCallback4, useRef: useRef4, useEffect: useEffect6 } = wp.element;
    const { BlockControls: BlockControls2, InspectorControls } = wp.blockEditor;
    const { BaseControl, Icon, PanelBody, RangeControl: RangeControl2, TextControl: TextControl2, Toolbar, ToolbarGroup: ToolbarGroup2, ToolbarButton, ToolbarDropdownMenu } = wp.components;
    const item = keys.items ? attr[keys.items][index] : attr;
    const pictures = item[keys.pictures];
    const classes = useMemo5(() => bem("cp-placedpictures " + className), [className]);
    const [editMode, setEditMode] = useState4(false);
    const [currentItemNodes, setCurrentItemNodes] = useState4([]);
    const [currentItemIndexes, setCurrentItemIndexes] = useState4([]);
    const [containerNode, setContainerNode] = useState4(false);
    const targetRefs = useRef4([]);
    useEffect6(() => {
      setCurrentItemNodes(currentItemIndexes.sort().map((index2) => targetRefs.current[index2]));
    }, [currentItemIndexes, targetRefs, setCurrentItemNodes]);
    const remPx = useMemo5(() => parseFloat(getComputedStyle(document.documentElement).fontSize), []);
    const getPlaceStyle = useCallback4((bnd, tgtBnd) => {
      const style = {
        position: "absolute",
        width: Math.pround(tgtBnd.width / remPx, 2) + "rem",
        height: Math.pround(tgtBnd.height / remPx, 2) + "rem"
      };
      const px = (tgtBnd.left - bnd.left + tgtBnd.width / 2) / bnd.width;
      const py = (tgtBnd.top - bnd.top + tgtBnd.height / 2) / bnd.height;
      if (px < 0.35) {
        style.left = Math.pround((tgtBnd.left - bnd.left) / remPx, 4) + "rem";
      } else if (px > 0.65) {
        style.right = Math.pround((bnd.right - tgtBnd.right) / remPx, 4) + "rem";
      } else {
        style.left = "calc(50% + " + Math.pround((tgtBnd.left - bnd.left - bnd.width / 2) / remPx, 4) + "rem)";
      }
      if (py < 0.35) {
        style.top = Math.pround((tgtBnd.top - bnd.top) / remPx, 4) + "rem";
      } else if (py > 0.65) {
        style.bottom = Math.pround((bnd.bottom - tgtBnd.bottom) / remPx, 4) + "rem";
      } else {
        style.top = "calc(50% + " + Math.pround((tgtBnd.top - bnd.top - bnd.height / 2) / remPx, 4) + "rem)";
      }
      return style;
    }, []);
    const onClickItem = useCallback4(
      (e) => {
        const index2 = parseInt(e.currentTarget.dataset.index);
        const selected = currentItemIndexes.includes(index2);
        if (e.shiftKey) {
          if (selected) {
            setCurrentItemIndexes(currentItemIndexes.filter((i) => i !== index2));
          } else {
            setCurrentItemIndexes(currentItemIndexes.concat([index2]));
          }
        } else if (!selected) {
          setCurrentItemIndexes([index2]);
        }
      },
      [currentItemIndexes, setCurrentItemIndexes]
    );
    const updatePictures = useCallback4(
      (pictures2) => {
        if (keys.items) {
          const items2 = attr[keys.iteems];
          items2[index][keys.pictures] = [...pictures2];
          set({ [keys.items]: [...items2] });
        } else {
          set({ [keys.pictures]: [...pictures2] });
        }
      },
      [attr, set, keys, index]
    );
    const save = useCallback4(() => {
      if (keys.items) {
        items[index][keys.pictures] = JSON.parse(JSON.stringify(pictures));
        set({ [keys.items]: [...items] });
      } else {
        set({ [keys.pictures]: JSON.parse(JSON.stringify(pictures)) });
      }
    }, [set, pictures]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes({ "is-edit-mode": editMode }), ref: setContainerNode }, /* @__PURE__ */ wp.element.createElement(BlockControls2, null, /* @__PURE__ */ wp.element.createElement(ToolbarButton, { icon: "images-alt", label: "edit decoration", isActive: editMode, onClick: () => setEditMode(!editMode) }), editMode && /* @__PURE__ */ wp.element.createElement(
      ToolbarButton,
      {
        icon: "welcome-add-page",
        label: "add item",
        onClick: () => {
          pictures.push({
            style: {
              width: "4rem",
              height: "4rem",
              top: "0rem",
              left: "0rem"
            },
            code: false,
            sources: devices2.map((device) => {
              return { device, srcset: CP.imageSrcOrDummy() };
            }),
            src: CP.imageSrcOrDummy(),
            alt: ""
          });
          save();
        }
      }
    ), editMode && currentItemIndexes.length > 0 && /* @__PURE__ */ wp.element.createElement(
      ToolbarButton,
      {
        icon: "insert",
        label: "insert",
        onClick: () => {
          pictures.push.apply(
            pictures,
            pictures.filter((item2, index2) => currentItemIndexes.includes(index2))
          );
          save();
        }
      }
    ), editMode && currentItemIndexes.length > 0 && pictures.length > currentItemIndexes.length && /* @__PURE__ */ wp.element.createElement(
      ToolbarButton,
      {
        icon: "remove",
        label: "remove",
        onClick: () => {
          currentItemIndexes.sort().reverse().forEach((index2) => pictures.splice(index2, 1));
          save();
        }
      }
    )), pictures && pictures.map((picture, index2) => {
      const { style, code, sources, src, alt } = picture;
      return /* @__PURE__ */ wp.element.createElement("div", { className: "item", style: CP.parseStyleString(style), onClick: (e) => editMode && onClickItem(e), "data-index": index2, ref: (el) => targetRefs.current[index2] = el, key: index2 }, code ? /* @__PURE__ */ wp.element.createElement(CP.DummyImage, { text: code }) : /* @__PURE__ */ wp.element.createElement(
        "picture",
        {
          className: "picture",
          onClick: (e) => editMode && currentItemIndexes.includes(index2) && CP.selectImage(
            function(data) {
              Object.assign(picture, data);
              save();
            },
            { keys: { sources: "sources", src: "src", alt: "alt" }, size: "full", devices: devices2 }
          )
        },
        sources && sources.map((source) => /* @__PURE__ */ wp.element.createElement("source", { srcSet: source.srcset, media: CP.devices[source.device].media_query, "data-device": source.device, key: source.device })),
        /* @__PURE__ */ wp.element.createElement("img", { className: "img", src, alt })
      ));
    }), editMode && /* @__PURE__ */ wp.element.createElement(
      CP.BoundingBox,
      {
        targets: currentItemNodes,
        container: containerNode,
        onChange: () => {
          const bnd = containerNode.getBoundingClientRect();
          currentItemNodes.forEach((el) => {
            pictures[el.dataset.index].style = getPlaceStyle(bnd, el.getBoundingClientRect());
          });
          save();
        },
        onDeselect: () => {
          setCurrentItemIndexes([]);
        },
        onDuplicate: () => {
          pictures.push.apply(
            pictures,
            pictures.filter((item2, index2) => currentItemIndexes.includes(index2))
          );
          save();
        },
        onDelete: () => {
          currentItemIndexes.sort().reverse().forEach((index2) => pictures.splice(index2, 1));
          save();
        }
      }
    ));
  };

  // ../blocks/_init/init/CP/components/Link.jsx
  var Link = (props) => {
    const { className, attr, keys, index, ...otherProps } = props;
    const item = keys.items ? attr[keys.items][index] : attr;
    const href = item[keys.href] || "";
    const target = href.indexOf("://") !== -1 ? "_brank" : null;
    return /* @__PURE__ */ wp.element.createElement("a", { className, href, target, rel: target && "noopener", ...otherProps }, props.children);
  };
  Link.Edit = (props) => {
    const { className, set, attr, keys, index, isSelected = "auto", ...otherProps } = props;
    const { onChange } = props;
    const { useMemo: useMemo5, useCallback: useCallback4, useEffect: useEffect6, useState: useState4 } = wp.element;
    const classes = useMemo5(() => bem("cp-link " + className), [className]);
    const item = useMemo5(() => keys.items ? attr[keys.items][index] : attr, [attr, keys.items, index]);
    const [hasCursor, setHasCursor] = useState4(false);
    const [ref, setRef] = useState4(false);
    useEffect6(() => {
      const cb = () => {
        if (!ref) {
          return;
        }
        const selection = window.getSelection();
        setHasCursor(selection.rangeCount > 0 && ref.contains(selection.getRangeAt(0).commonAncestorContainer));
      };
      document.addEventListener("click", cb);
      return () => document.removeEventListener("click", cb);
    }, [ref, setHasCursor]);
    return /* @__PURE__ */ wp.element.createElement(
      "span",
      {
        className: classes({
          "is-selected": isSelected === "auto" ? hasCursor : isSelected
        }),
        ...otherProps,
        ref: setRef
      },
      props.children,
      /* @__PURE__ */ wp.element.createElement(
        "span",
        {
          className: classes.input(),
          contentEditable: true,
          suppressContentEditableWarning: true,
          onBlur: (e) => {
            const href = e.target.textContent;
            if (keys.items) {
              Object.assign(attr[keys.items][index], { [keys.href]: href });
              set({ [keys.items]: JSON.parse(JSON.stringify(attr[keys.items])) });
            } else {
              set({ [keys.href]: href });
            }
          }
        },
        item[keys.href] || ""
      )
    );
  };

  // ../blocks/_init/init/CP/components/RTF.jsx
  var RTF = (props) => {
    const { className, pref = "rtf", attr, keys = { text: "text" }, index, ...otherProps } = props;
    const item = keys.items ? attr[keys.items][index] : attr;
    const text = item[keys.text] ? item[keys.text] : "";
    return /* @__PURE__ */ wp.element.createElement("div", { className, ...otherProps, dangerouslySetInnerHTML: { __html: rtf(text, pref) } });
  };
  RTF.Edit = (props) => {
    const { className, pref = "rtf", set, attr, keys = { text: "text" }, index, isSelected = true, ...otherProps } = props;
    const { useMemo: useMemo5, useCallback: useCallback4, useState: useState4 } = wp.element;
    const classes = useMemo5(() => bem("cp-rtf " + className), [className]);
    const item = useMemo5(() => keys.items ? attr[keys.items][index] : attr, [attr, keys.items, index]);
    const text = item[keys.text];
    const updateText = useCallback4(
      (text2) => {
        if (keys.items) {
          Object.assign(attr[keys.items][index], { [keys.text]: text2 });
          set({ [keys.items]: JSON.parse(JSON.stringify(attr[keys.items])) });
        } else {
          set({ [keys.text]: text2 });
        }
      },
      [set, attr, keys]
    );
    const editorFunction = useCallback4(
      (e) => {
        if (e.key === "Tab") {
          const text2 = e.target.value;
          const lineStart = Math.max(0, text2.slice(0, e.currentTarget.selectionStart).lastIndexOf("\n"));
          const lineEnd = e.currentTarget.selectionEnd + Math.max(0, text2.slice(e.currentTarget.selectionEnd).indexOf("\n"));
          let targetText = text2.slice(lineStart, lineEnd);
          if (e.shiftKey) {
            targetText = targetText.replaceAll("\n	", "\n");
          } else {
            targetText = targetText.replaceAll("\n", "\n	");
          }
          e.target.value = text2.slice(0, lineStart) + targetText + text2.slice(lineEnd);
          e.target.setSelectionRange(lineStart ? lineStart + 1 : 0, lineStart + targetText.length);
          updateText(e.target.value);
          e.preventDefault();
        }
      },
      [updateText]
    );
    const [savedText, setSavedText] = useState4(text);
    const [isActive, setIsActive] = useState4(false);
    return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { className: classes({ "is-active": isSelected && isActive }), onClick: () => setIsActive(!isActive), ...otherProps, dangerouslySetInnerHTML: { __html: rtf(item.text, pref) } }), /* @__PURE__ */ wp.element.createElement(Portal, { id: "EditRTF" }, /* @__PURE__ */ wp.element.createElement("div", { className: classes.portal({ "is-active": isSelected && isActive }) }, /* @__PURE__ */ wp.element.createElement("div", { className: classes.portal.preview(), dangerouslySetInnerHTML: { __html: rtf(item.text, pref) } }), /* @__PURE__ */ wp.element.createElement("div", { className: classes.portal.input() }, /* @__PURE__ */ wp.element.createElement(
      "textarea",
      {
        className: classes.portal.input.edit(),
        value: text,
        onKeyDown: editorFunction,
        onChange: (e) => {
          updateText(e.target.value);
        }
      }
    ), /* @__PURE__ */ wp.element.createElement("div", { className: classes.portal.input.buttons() }, /* @__PURE__ */ wp.element.createElement("div", { className: classes.portal.input.buttons.button("is-reset"), onClick: () => updateText(savedText) }, "Reset"), /* @__PURE__ */ wp.element.createElement(
      "div",
      {
        className: classes.portal.input.buttons.button("is-save"),
        onClick: () => {
          setSavedText(text);
          setIsActive(false);
        }
      },
      "Save"
    ))))));
  };

  // ../blocks/_init/init/CP/components/Loop.jsx
  var Loop = (props) => {
    const { current = 0, Component = "div", loop = false, ...otherProps } = props;
    const { useState: useState4, useMemo: useMemo5, useCallback: useCallback4, useEffect: useEffect6, useRef: useRef4 } = wp.element;
    const items2 = (() => {
      const items3 = Array.isArray(props.items) ? props.items : Number.isInteger(props.items) ? [...Array(props.items).keys()] : Array.from(props.items);
      items3.forEach((value2, index) => {
        if (typeof value2 !== "object") {
          items3[index] = { value: value2 };
        }
      });
      return items3;
    })();
    return (() => {
      const l = items2.length;
      const h = l >> 1;
      return items2.map((item, index) => {
        return /* @__PURE__ */ wp.element.createElement(Component, { ...otherProps, ...item, index, position: loop ? (index - current + l + h) % l - h : index - current, key: index });
      });
    })();
  };

  // ../blocks/_init/init/CP/components/CustomColorVars.jsx
  var CustomColorVars = (props) => {
    const { useState: useState4, useRef: useRef4, useMemo: useMemo5, useCallback: useCallback4 } = wp.element;
    const { ColorPicker, CheckboxControl, Flex, FlexItem, FlexBlock, Button, Popover: Popover2 } = wp.components;
    const { label = "\u30AB\u30B9\u30BF\u30E0\u30AB\u30E9\u30FC", value: value2, onChange } = props;
    const cache2 = useRef4(value2);
    const [index, setIndex] = useState4(-1);
    const [useCustomColor, setUseCustomColor] = useState4(Object.keys(value2).length > 0);
    const classes = bem("cp-customcolorvars");
    const roles = [
      { key: "b", label: "\u80CC\u666F\u8272" },
      { key: "s", label: "\u5F37\u8ABF\u80CC\u666F\u8272" },
      { key: "t", label: "\u6587\u5B57\u8272" },
      { key: "m", label: "\u57FA\u672C\u8272" },
      { key: "a", label: "\u5F37\u8ABF\u8272" },
      { key: "i", label: "\u53CD\u8EE2\u6587\u5B57\u8272" }
    ];
    const keys = ["h", "s", "l"];
    const originalColors = useMemo5(() => {
      const originalColors2 = {};
      const selectedBlock = wp.data.select("core/block-editor").getSelectedBlock();
      const editorCanvas = document.querySelector('iframe[name="editor-canvas"]');
      const el = (editorCanvas ? editorCanvas.contentDocument : document).getElementById("block-" + selectedBlock.clientId);
      if (!el) {
        return originalColors2;
      }
      const styles = window.getComputedStyle(el);
      roles.forEach((role) => {
        const hsla = {};
        keys.forEach((key) => {
          hsla[key] = styles.getPropertyValue(`--cp-tones-${role.key}-${key}`);
        });
        originalColors2[role.key] = `hsl(${hsla.h},${hsla.s},${hsla.l})`;
      });
      return originalColors2;
    }, []);
    const colors = useMemo5(() => {
      const colors2 = {};
      roles.forEach((role) => {
        const hsla = {};
        if (keys.every((key) => {
          const name = `--cp-tones-${role.key}-${key}`;
          if (!value2.hasOwnProperty(name)) {
            return false;
          }
          hsla[key] = value2[name];
          return true;
        })) {
          colors2[role.key] = `hsl(${hsla.h},${hsla.s},${hsla.l})`;
        }
      });
      return colors2;
    }, []);
    const Item2 = useCallback4((props2) => {
      const { classes: classes2, role, originalColor, onChange: onChange2 } = props2;
      const [isOpen, setIsOpen] = useState4(false);
      const [isCustomized, setIsCustomized] = useState4(!!props2.color);
      const [color, setColor] = useState4(props2.color || originalColor);
      const onChangeComplete = useCallback4(
        (color2) => {
          setIsCustomized(true);
          setColor(color2.hex);
          onChange2({
            [`--cp-tones-${role.key}-h`]: color2.hsl.h + "",
            [`--cp-tones-${role.key}-s`]: color2.hsl.s + "%",
            [`--cp-tones-${role.key}-l`]: color2.hsl.l + "%"
          });
        },
        [onChange2, role, setColor]
      );
      const clearColorVars = useCallback4(() => {
        setIsCustomized(false);
        setColor(originalColor);
        onChange2({
          [`--cp-tones-${role.key}-h`]: null,
          [`--cp-tones-${role.key}-s`]: null,
          [`--cp-tones-${role.key}-l`]: null
        });
      }, [onChange2, role, originalColor, setColor, setIsCustomized]);
      return /* @__PURE__ */ wp.element.createElement("div", { className: classes2(flagsToClassNames({ isCustomized })) }, /* @__PURE__ */ wp.element.createElement("div", { className: classes2.chip(), onClick: () => setIsOpen(!isOpen), style: { backgroundColor: color } }, /* @__PURE__ */ wp.element.createElement("div", { className: classes2.chip.label() }, role.label)), isOpen && /* @__PURE__ */ wp.element.createElement(Popover2, { onClose: () => setIsOpen(false) }, /* @__PURE__ */ wp.element.createElement(ColorPicker, { color, onChangeComplete }), /* @__PURE__ */ wp.element.createElement(Flex, { justify: "center" }, /* @__PURE__ */ wp.element.createElement(FlexItem, null, /* @__PURE__ */ wp.element.createElement(Button, { text: "CLEAR", onClick: clearColorVars })))));
    }, []);
    const clearAllColorVars = useCallback4(() => {
      const vars = {};
      roles.forEach((role) => {
        keys.forEach((key) => {
          vars[`--cp-tones-${role.key}-${key}`] = null;
        });
      });
      onChange(vars);
    }, [onChange]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement(
      CheckboxControl,
      {
        label,
        onChange: () => {
          if (useCustomColor) {
            cache2.current = value2;
            clearAllColorVars();
          } else {
            onChange(cache2.current);
          }
          setUseCustomColor(!useCustomColor);
        },
        checked: useCustomColor
      }
    ), /* @__PURE__ */ wp.element.createElement("div", { className: classes.items({ "is-active": useCustomColor }) }, roles.map((role) => /* @__PURE__ */ wp.element.createElement(Item2, { role, classes: classes.items.item, onChange, color: colors[role.key] || false, originalColor: originalColors[role.key], key: role.key }))));
  };

  // ../blocks/_init/init/CP/components/Message.jsx
  var Message = (props) => {
    const { useMemo: useMemo5 } = wp.element;
    const classes = useMemo5(() => bem("cp-message"), []);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement("div", { className: classes._body() }, props.children));
  };

  // ../blocks/_init/init/CP/components/NavBar.jsx
  var NavBar = (props) => {
    const { value: value2, label, onChange } = props;
    const { useMemo: useMemo5, useState: useState4 } = wp.element;
    const classes = bem("cp-navbar");
    const { options: options3 } = useMemo5(() => CP.parseSelections(props.options), [props.options]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: classes() }, /* @__PURE__ */ wp.element.createElement("ul", { className: classes.items() }, label && /* @__PURE__ */ wp.element.createElement("li", { className: classes.items.item("is-label") }, label), options3.map((option) => /* @__PURE__ */ wp.element.createElement(
      "li",
      {
        className: classes.items.item({
          "is-active": option.value === value2
        }),
        onClick: () => onChange(option.value),
        key: option.label
      },
      option.label
    ))));
  };

  // ../blocks/_init/init/CP/data/example.js
  var dummyText = {
    title: "\u543E\u8F29\u306F\u732B\u3067\u3042\u308B\u3002",
    lead: "\u540D\u524D\u306F\u307E\u3060\u306A\u3044\u3002\u3069\u3053\u3067\u751F\u308C\u305F\u304B\u9813\u3068\u898B\u5F53\u304C\u3064\u304B\u306C\u3002\u4F55\u3067\u3082\u8584\u6697\u3044\u3058\u3081\u3058\u3081\u3057\u305F\u6240\u3067\u30CB\u30E3\u30FC\u30CB\u30E3\u30FC\u6CE3\u3044\u3066\u3044\u305F\u4E8B\u3060\u3051\u306F\u8A18\u61B6\u3057\u3066\u3044\u308B\u3002",
    text: "\u540D\u524D\u306F\u307E\u3060\u306A\u3044\u3002\u3069\u3053\u3067\u751F\u308C\u305F\u304B\u9813\u3068\u898B\u5F53\u304C\u3064\u304B\u306C\u3002\u4F55\u3067\u3082\u8584\u6697\u3044\u3058\u3081\u3058\u3081\u3057\u305F\u6240\u3067\u30CB\u30E3\u30FC\u30CB\u30E3\u30FC\u6CE3\u3044\u3066\u3044\u305F\u4E8B\u3060\u3051\u306F\u8A18\u61B6\u3057\u3066\u3044\u308B\u3002\u543E\u8F29\u306F\u3053\u3053\u3067\u59CB\u3081\u3066\u4EBA\u9593\u3068\u3044\u3046\u3082\u306E\u3092\u898B\u305F\u3002\u3057\u304B\u3082\u3042\u3068\u3067\u805E\u304F\u3068\u305D\u308C\u306F\u66F8\u751F\u3068\u3044\u3046\u4EBA\u9593\u4E2D\u3067\u4E00\u756A\u7370\u60AA\u306A\u7A2E\u65CF\u3067\u3042\u3063\u305F\u305D\u3046\u3060\u3002\u3053\u306E\u66F8\u751F\u3068\u3044\u3046\u306E\u306F\u6642\u3005\u6211\u3005\u3092\u6355\u3048\u3066\u716E\u3066\u98DF\u3046\u3068\u3044\u3046\u8A71\u3067\u3042\u308B\u3002\u3057\u304B\u3057\u305D\u306E\u5F53\u6642\u306F\u4F55\u3068\u3044\u3046\u8003\u3082\u306A\u304B\u3063\u305F\u304B\u3089\u5225\u6BB5\u6050\u3057\u3044\u3068\u3082\u601D\u308F\u306A\u304B\u3063\u305F\u3002",
    footer: "\u300E\u543E\u8F29\u306F\u732B\u3067\u3042\u308B\u300F\uFF08\u308F\u304C\u306F\u3044\u306F\u306D\u3053\u3067\u3042\u308B\uFF09\u3000\u590F\u76EE\u6F31\u77F3\u3000\u8457"
  };
  var example = {
    attributes: {
      title: [dummyText.title],
      headerText: [dummyText.title],
      footerText: [dummyText.footer],
      lead: [dummyText.lead],
      text: [dummyText.text]
    },
    innerBlocks: [
      {
        name: "core/paragraph",
        attributes: {
          content: dummyText.text
        }
      }
    ]
  };
  wp.domReady(() => {
    wp.hooks.applyFilters("catpow.blocks.dummyText", dummyText);
    wp.hooks.applyFilters("catpow.blocks.example", example);
  });

  // ../blocks/_init/init/CP/data/store.js
  var cache = deepMap();
  var filters = {};
  var config = {};

  // ../blocks/_init/init/CP/data/convertibles.js
  var listedConvertibles = [
    "catpow/listed",
    "catpow/flow",
    "catpow/faq",
    "catpow/ranking",
    "catpow/dialog",
    "catpow/sphere",
    "catpow/slider",
    "catpow/banners",
    "catpow/lightbox",
    "catpow/panes",
    "catpow/slidablemenu",
    "catpow/showcase"
  ];
  var tableConvertibles = ["catpow/simpletable", "catpow/datatable", "catpow/comparetable", "catpow/layouttable"];

  // ../blocks/_init/init/CP/data/devices.js
  var devices = {
    sp: {
      icon: "smartphone",
      width: 480,
      media_query: "(max-width:640px)",
      sizes: "(max-width:640px) 480px",
      sizes_value: "480px",
      media_size: "medium_large",
      reg: /[^,]+ 480w,/,
      rep: " 480w,"
    },
    tb: {
      icon: "tablet",
      width: 960,
      media_query: "(max-width:1280px)",
      sizes: "(max-width:1280px) 960px",
      sizes_value: "960px",
      media_size: "full",
      reg: /[^,]+ 960w,/,
      rep: " 960w,"
    },
    lt: {
      icon: "laptop",
      width: 1440,
      media_query: "(max-width:1920px)",
      sizes: "(max-width:1920px) 1440px",
      sizes_value: "1440px",
      media_size: "full",
      reg: /[^,]+ 1440w,/,
      rep: " 1440w,"
    },
    pc: {
      icon: "desktop",
      width: 1920,
      media_query: false,
      sizes: "100vw",
      sizes_value: "100vw",
      media_size: "full",
      reg: /[^,]+$/,
      rep: ""
    }
  };

  // ../blocks/_init/init/CP/data/datalist.js
  var dataListPresets = {
    currency: ["AUD", "CAD", "CNY", "DKK", "HKD", "INR", "IDR", "JPY", "KRW", "MYR", "NOK", "PHP", "RUB", "SGD", "VND", "SEK", "CHF", "THB", "GBP", "USD", "TWD", "EUR", "BRL"],
    mouseEvent: ["click", "dblclick", "mouseup", "mousedown", "mouseenter", "mouseleave", "mouseover", "mouseout", "contextmenu"],
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
  };

  // ../blocks/_init/init/CP/data/selectiveClasses.js
  var { __: __3 } = wp.i18n;
  var selectiveClassesPresets = {
    customColorVars: {
      name: "customColorVars",
      input: "customColorVars",
      label: __3("\u30AB\u30B9\u30BF\u30E0\u30AB\u30E9\u30FC", "catpow"),
      vars: "vars"
    },
    isTemplate: {
      name: "template",
      input: "bool",
      key: "isTemplate",
      label: __3("\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8", "catpow"),
      sub: [
        {
          name: "loop",
          input: "bool",
          label: __3("\u30EB\u30FC\u30D7", "catpow"),
          key: "doLoop",
          sub: [
            {
              name: "contentPath",
              label: "content path",
              input: "text",
              key: "content_path"
            },
            { name: "query", label: "query", input: "textarea", key: "query" },
            {
              name: "loopCount",
              label: __3("\u30D7\u30EC\u30D3\u30E5\u30FC\u30EB\u30FC\u30D7\u6570", "catpow"),
              input: "range",
              key: "loopCount",
              min: 1,
              max: 16
            }
          ]
        }
      ]
    },
    backgroundColor: {
      name: "backgroundColor",
      type: "buttons",
      label: __3("\u80CC\u666F\u8272", "catpow"),
      values: {
        hasBackgroundColorNone: __3("\u306A\u3057", "catpow"),
        hasBackgroundColor: __3("\u901A\u5E38", "catpow"),
        hasBackgroundColorAlt: __3("\u5F37\u8ABF", "catpow")
      }
    },
    backgroundImage({ preset, vars = "vars", classKey, ...otherParams }) {
      return {
        name: "backgroundImage",
        label: __3("\u80CC\u666F\u753B\u50CF", "catpow"),
        values: "hasBackgroundImage",
        classKey,
        sub: [
          {
            name: "fixed",
            label: __3("\u56FA\u5B9A", "catpow"),
            classKey,
            values: "hasBackgroundImageFixed"
          },
          {
            name: "image",
            label: __3("\u753B\u50CF", "catpow"),
            vars,
            key: "--cp-background-image",
            input: "image"
          },
          {
            name: "repeat",
            label: __3("\u7E70\u308A\u8FD4\u3057", "catpow"),
            vars,
            key: "--cp-background-image-repeat",
            input: "buttons",
            values: { repeat: "\u4E21\u65B9", "repeat-x": "\u6A2A", "repeat-y": "\u7E26", "no-repeat": "\u306A\u3057" }
          },
          {
            name: "position",
            label: __3("\u4F4D\u7F6E", "catpow"),
            vars,
            key: "--cp-background-image-position",
            input: "position"
          },
          {
            name: "size",
            label: __3("\u30B5\u30A4\u30BA", "catpow"),
            vars,
            key: "--cp-background-image-size",
            input: "size"
          },
          {
            name: "blendmode",
            label: __3("\u30E2\u30FC\u30C9", "catpow"),
            vars,
            key: "--cp-background-image-blendmode",
            input: "blendmode"
          },
          {
            name: "opacity",
            label: __3("\u4E0D\u900F\u660E\u5EA6", "catpow"),
            vars,
            key: "--cp-background-image-opacity",
            input: "range",
            min: 0,
            max: 1,
            step: 0.1
          }
        ],
        ...otherParams
      };
    },
    backgroundPattern({ preset, vars = "vars", ...otherParams }) {
      return {
        name: "backgroundPattern",
        label: __3("\u80CC\u666F\u30D1\u30BF\u30FC\u30F3", "catpow"),
        values: "hasBackgroundPattern",
        sub: [
          {
            name: "image",
            label: __3("\u753B\u50CF", "catpow"),
            vars,
            key: "--cp-background-pattern-image",
            input: "image"
          },
          {
            name: "repeat",
            label: __3("\u7E70\u308A\u8FD4\u3057", "catpow"),
            vars,
            key: "--cp-background-pattern-repeat",
            input: "buttons",
            values: { repeat: "\u4E21\u65B9", "repeat-x": "\u6A2A", "repeat-y": "\u7E26", "no-repeat": "\u306A\u3057" }
          },
          {
            name: "position",
            label: __3("\u4F4D\u7F6E", "catpow"),
            vars,
            key: "--cp-background-pattern-position",
            input: "position"
          },
          {
            name: "size",
            label: __3("\u30B5\u30A4\u30BA", "catpow"),
            vars,
            key: "--cp-background-pattern-size",
            input: "size"
          }
        ],
        ...otherParams
      };
    },
    textAlign: {
      name: "textAlign",
      type: "buttons",
      label: __3("\u30C6\u30AD\u30B9\u30C8\u63C3\u3048", "catpow"),
      values: {
        hasTextAlignLeft: __3("\u5DE6\u63C3\u3048", "catpow"),
        hasTextAlignCenter: __3("\u4E2D\u592E", "catpow"),
        hasTextAlignRight: __3("\u53F3\u63C3\u3048", "catpow")
      }
    },
    verticalAlign: {
      name: "verticalAlign",
      type: "buttons",
      label: __3("\u5782\u76F4\u65B9\u5411\u63C3\u3048", "catpow"),
      values: {
        hasVerticalAlignTop: __3("\u4E0A\u63C3\u3048", "catpow"),
        hasVerticalAlignMiddle: __3("\u4E2D\u592E", "catpow"),
        hasVerticalAlignBottom: __3("\u4E0B\u63C3\u3048", "catpow")
      }
    },
    fontSize: {
      name: "size",
      type: "buttons",
      label: __3("\u6587\u5B57\u30B5\u30A4\u30BA", "catpow"),
      values: {
        hasFontSizeLarge: __3("\u5927", "catpow"),
        hasFontSizeMiddle: __3("\u4E2D", "catpow"),
        hasFontSizeSmall: __3("\u5C0F", "catpow")
      }
    },
    width: {
      name: "width",
      type: "buttons",
      label: __3("\u5E45", "catpow"),
      values: {
        hasWidthFull: __3("\u30D5\u30EB", "catpow"),
        hasWidthWide: __3("\u30EF\u30A4\u30C9", "catpow"),
        hasWidthRegular: __3("\u30EC\u30AE\u30E5\u30E9\u30FC", "catpow"),
        hasWidthNarrow: __3("\u30CA\u30ED\u30FC", "catpow")
      }
    },
    size: {
      name: "size",
      type: "buttons",
      label: __3("\u30B5\u30A4\u30BA", "catpow"),
      values: {
        isSizeLarge: __3("\u5927", "catpow"),
        isSizeMedium: __3("\u4E2D", "catpow"),
        isSizeSmall: __3("\u5C0F", "catpow")
      }
    },
    itemSize: {
      name: "itemSize",
      label: __3("\u30B5\u30A4\u30BA", "catpow"),
      vars: "vars",
      key: "--cp-item-size",
      input: "range",
      min: 100,
      max: 1200,
      step: 10,
      coef: 0.0625,
      unit: "rem"
    },
    colorScheme: {
      name: "colorScheme",
      type: "buttons",
      label: __3("\u914D\u8272", "catpow"),
      values: {
        hasColorSchemeInherit: __3("\u7D99\u627F", "catpow"),
        hasColorSchemeReverted: __3("\u901A\u5E38", "catpow"),
        hasColorSchemeInverted: __3("\u53CD\u8EE2", "catpow")
      }
    },
    clipPath({ preset, vars = "vars", ...otherParams }) {
      return {
        name: "clipPath",
        label: __3("\u30AF\u30EA\u30C3\u30D7", "catpow"),
        values: "hasClipPath",
        sub: [
          {
            name: "shape",
            label: __3("\u5F62\u72B6", "catpow"),
            type: "buttons",
            values: {
              hasClipShapeEllipse: __3("\u6955\u5186", "catpow"),
              hasClipShapeSlope: __3("\u50BE\u659C", "catpow"),
              hasClipShapeArrow: __3("\u30A2\u30ED\u30FC", "catpow"),
              hasClipShapeTail: __3("\u30D5\u30AD\u30C0\u30B7", "catpow")
            },
            sub: {
              hasClipShapeEllipse: [
                {
                  name: "direction",
                  type: "buttons",
                  values: {
                    hasClipShapeBoth: __3("\u4E21\u65B9", "catpow"),
                    hasClipShapeUpper: __3("\u4E0A", "catpow"),
                    hasClipShapeBelow: __3("\u4E0B", "catpow")
                  }
                },
                {
                  name: "amount",
                  label: __3("\u91CF", "catpow"),
                  input: "range",
                  vars,
                  key: "--cp-clip-shape-amount",
                  min: 1,
                  max: 100
                }
              ],
              hasClipShapeSlope: [
                {
                  name: "uppper",
                  type: "buttons",
                  values: {
                    hasClipShapeUpperNone: __3("\u306A\u3057", "catpow"),
                    hasClipShapeUpperLeft: __3("\u5DE6", "catpow"),
                    hasClipShapeUpperRight: __3("\u53F3", "catpow")
                  }
                },
                {
                  name: "below",
                  type: "buttons",
                  values: {
                    hasClipShapeBelowNone: __3("\u306A\u3057", "catpow"),
                    hasClipShapeBelowLeft: __3("\u5DE6", "catpow"),
                    hasClipShapeBelowRight: __3("\u53F3", "catpow")
                  }
                },
                {
                  name: "upperHeight",
                  label: __3("\u4E0A\u9AD8\u3055", "catpow"),
                  input: "range",
                  vars,
                  key: "--cp-clip-shape-upper-height",
                  min: 8,
                  max: 400
                },
                {
                  name: "belowHeight",
                  label: __3("\u4E0B\u9AD8\u3055", "catpow"),
                  input: "range",
                  vars,
                  key: "--cp-clip-shape-below-height",
                  min: 8,
                  max: 400
                }
              ],
              hasClipShapeArrow: [
                {
                  name: "uppper",
                  type: "buttons",
                  values: {
                    hasClipShapeUpperNone: __3("\u306A\u3057", "catpow"),
                    hasClipShapeUpperIn: __3("\u5185", "catpow"),
                    hasClipShapeUpperOut: __3("\u5916", "catpow")
                  }
                },
                {
                  name: "below",
                  type: "buttons",
                  values: {
                    hasClipShapeBelowNone: __3("\u306A\u3057", "catpow"),
                    hasClipShapeBelowIn: __3("\u5185", "catpow"),
                    hasClipShapeBelowOut: __3("\u5916", "catpow")
                  }
                },
                {
                  name: "upperHeight",
                  label: __3("\u4E0A\u9AD8\u3055", "catpow"),
                  input: "range",
                  vars,
                  key: "--cp-clip-shape-upper-height",
                  min: 8,
                  max: 400
                },
                {
                  name: "belowHeight",
                  label: __3("\u4E0B\u9AD8\u3055", "catpow"),
                  input: "range",
                  vars,
                  key: "--cp-clip-shape-below-height",
                  min: 8,
                  max: 400
                }
              ],
              hasClipShapeTail: [
                {
                  name: "uppper",
                  type: "buttons",
                  values: {
                    hasClipShapeUpperNone: __3("\u306A\u3057", "catpow"),
                    hasClipShapeUpperIn: __3("\u5185", "catpow"),
                    hasClipShapeUpperOut: __3("\u5916", "catpow")
                  }
                },
                {
                  name: "below",
                  type: "buttons",
                  values: {
                    hasClipShapeBelowNone: __3("\u306A\u3057", "catpow"),
                    hasClipShapeBelowIn: __3("\u5185", "catpow"),
                    hasClipShapeBelowOut: __3("\u5916", "catpow")
                  }
                },
                {
                  name: "upperWidth",
                  label: __3("\u4E0A\u5E45", "catpow"),
                  input: "range",
                  vars,
                  key: "--cp-clip-shape-upper-width",
                  min: 8,
                  max: 400
                },
                {
                  name: "upperHeight",
                  label: __3("\u4E0A\u9AD8\u3055", "catpow"),
                  input: "range",
                  vars,
                  key: "--cp-clip-shape-upper-height",
                  min: 8,
                  max: 400
                },
                {
                  name: "belowWidth",
                  label: __3("\u4E0B\u5E45", "catpow"),
                  input: "range",
                  vars,
                  key: "--cp-clip-shape-below-width",
                  min: 8,
                  max: 400
                },
                {
                  name: "belowHeight",
                  label: __3("\u4E0B\u9AD8\u3055", "catpow"),
                  input: "range",
                  vars,
                  key: "--cp-clip-shape-below-height",
                  min: 8,
                  max: 400
                }
              ]
            }
          }
        ],
        ...otherParams
      };
    },
    customPadding({ preset, vars = "vars", ...otherParams }) {
      return {
        name: "customPadding",
        label: __3("\u4F59\u767D", "catpow"),
        values: "hasCustomPadding",
        sub: [
          {
            name: "paddingTop",
            label: __3("\u4E0A\u4F59\u767D", "catpow"),
            input: "range",
            vars,
            key: "--cp-padding-top",
            min: 0,
            max: 400,
            coef: 0.0625,
            unit: "rem"
          },
          {
            name: "paddingBottom",
            label: __3("\u4E0B\u4F59\u767D", "catpow"),
            input: "range",
            vars,
            key: "--cp-padding-bottom",
            min: 0,
            max: 400,
            coef: 0.0625,
            unit: "rem"
          },
          {
            name: "paddingInline",
            label: __3("\u6A2A\u4F59\u767D", "catpow"),
            input: "range",
            vars,
            key: "--cp-padding-inline",
            min: 0,
            max: 100,
            coef: 0.0625,
            unit: "rem"
          }
        ],
        ...otherParams
      };
    },
    customMargin({ preset, vars = "vars", ...otherParams }) {
      return {
        name: "customMargin",
        label: __3("\u9593\u9694", "catpow"),
        values: "hasCustomMargin",
        sub: [
          {
            name: "marginTop",
            label: __3("\u4E0A\u9593\u9694", "catpow"),
            input: "range",
            vars,
            key: "--cp-margin-top",
            min: -400,
            max: 400,
            coef: 0.0625,
            unit: "rem"
          },
          {
            name: "marginBottom",
            label: __3("\u4E0B\u9593\u9694", "catpow"),
            input: "range",
            vars,
            key: "--cp-margin-bottom",
            min: -400,
            max: 400,
            coef: 0.0625,
            unit: "rem"
          }
        ],
        ...otherParams
      };
    },
    customContentWidth({ preset, vars = "vars", ...otherParams }) {
      return {
        name: "customContentWidth",
        label: __3("\u30AB\u30B9\u30BF\u30E0\u30B3\u30F3\u30C6\u30F3\u30C4\u5E45", "catpow"),
        values: "hasCustomContentWidth",
        sub: [
          {
            name: "contentWidth",
            label: __3("\u5E45", "catpow"),
            input: "range",
            vars,
            key: "--cp-custom-content-width",
            min: 50,
            max: 100,
            unit: "vw"
          },
          {
            name: "contentMaxWidth",
            label: __3("\u6700\u5927\u5E45", "catpow"),
            input: "range",
            vars,
            key: "--cp-custom-content-max-width",
            min: 200,
            max: 1600,
            coef: 0.0625,
            unit: "rem"
          }
        ],
        ...otherParams
      };
    },
    contentWidth({ preset, vars = "vars", ...otherParams }) {
      return {
        name: "contentWidth",
        label: __3("\u30B3\u30F3\u30C6\u30F3\u30C4\u5E45", "catpow"),
        values: "hasContentWidth",
        sub: [{ preset: "customContentWidth", vars }],
        ...otherParams
      };
    },
    customBorderRadius({ preset, vars = "vars", ...otherParams }) {
      return {
        name: "cusotomRadius",
        label: __3("\u89D2\u4E38", "catpow"),
        values: "hasCustomBorderRadius",
        sub: [
          {
            name: "borderRadius",
            label: __3("\u5F84", "catpow"),
            input: "range",
            vars,
            key: "--cp-border-radius",
            min: 1,
            max: 100
          }
        ],
        ...otherParams
      };
    }
  };
  wp.domReady(() => {
    wp.hooks.applyFilters("catpow.blocks.selectiveClassesPresets", CP.finderProxy(selectiveClassesPresets));
  });

  // ../blocks/_init/init/CP/functions/classes.jsx
  var switchNumberClass = ({ set, attr }, label, value2) => {
    let classArray = (attr.classes || "").split(" ");
    let i = classArray.findIndex((cls) => cls.slice(0, label.length) === label);
    if (i === -1) {
      if (value2) {
        classArray.push(label + value2);
      }
    } else {
      if (value2) {
        classArray.splice(i, 1, label + value2);
      } else {
        classArray.splice(i, 1);
      }
    }
    set({ classes: classArray.join(" ") });
  };
  var getNumberClass = ({ attr }, label) => {
    let value2 = (attr.classes || "").split(" ").find((cls) => cls.slice(0, label.length) === label);
    if (!value2) {
      return 0;
    }
    return parseInt(value2.slice(label.length));
  };
  var switchColor = (props, value2) => {
    CP.switchNumberClass(props, "color", value2);
  };
  var getColor = (props) => {
    return CP.getNumberClass(props, "color");
  };
  var switchPattern = (props, value2) => {
    CP.switchNumberClass(props, "pattern", value2);
  };
  var getPattern = (props) => {
    return CP.getNumberClass(props, "pattern");
  };
  var switchSelectiveClass = ({ set, attr }, values, value2, key) => {
    if (key === void 0) {
      key = "classes";
    }
    let classArray = attr[key].split(" ");
    if (!Array.isArray(values) && _.isObject(values)) {
      values = Object.keys(values);
    }
    classArray = _.difference(classArray, values);
    if (Array.isArray(value2)) {
      classArray = classArray.concat(value2);
    } else {
      classArray.push(value2);
    }
    let data = {};
    data[key] = classArray.join(" ");
    set(data);
  };
  var getSelectiveClass = ({ attr }, values, key) => {
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
  };
  var getSubClasses = (prm) => {
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
  var getAllSubClasses = (prms) => {
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
  var getBindClasses = (prm) => {
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
  var getClassFlagsByValue = (prm, primaryClassKey = "classes") => {
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
    for (const value2 of values) {
      flags[value2] = { [prm.classKey || primaryClassKey]: { [value2]: true } };
      if (prm.sub) {
        if (Array.isArray(prm.sub)) {
          CP.addAllClassFlags(flags[value2], prm.sub, primaryClassKey);
        } else if (prm.sub[value2]) {
          CP.addAllClassFlags(flags[value2], prm.sub[value2], primaryClassKey);
        }
      }
      if (prm.bind) {
        if (Array.isArray(prm.bind)) {
          CP.addBindClassFlags(flags[value2], prm.bind, primaryClassKey);
        } else if (prm.bind[value2]) {
          CP.addBindClassFlags(flags[value2], prm.bind[value2], primaryClassKey);
        }
      }
    }
    return flags;
  };
  var getAllClassFlags = (prm, primaryClassKey = "classes") => {
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
  var getBindClassFlagsByValue = (prm, primaryClassKey = "classes") => {
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
    for (let value2 of values) {
      flags[value2] = { [prm.classKey || primaryClassKey]: { [value2]: true } };
      if (prm.bind) {
        if (typeof prm.values === "string") {
          CP.addBindClassFlags(flags[value2], prm.bind, primaryClassKey);
        } else {
          if (prm.bind[value2]) {
            CP.addBindClassFlags(flags[value2], prm.bind[value2], primaryClassKey);
          }
        }
      }
    }
    return flags;
  };
  var addAllClassFlags = (flags, prms, primaryClassKey = "classes") => {
    if (!flags[primaryClassKey]) {
      flags[primaryClassKey] = {};
    }
    for (const prm of prms) {
      if (prm.key || prm.json || prm.css || prm.vars) {
        continue;
      }
      if (prm.values) {
        const values = typeof prm.values === "string" ? [prm.values] : Array.isArray(prm.values) ? prm.values : Object.keys(prm.values);
        for (const value2 of values) {
          const classKey = prm.classKey || primaryClassKey;
          if (!flags[classKey]) {
            flags[classKey] = {};
          }
          flags[classKey][value2] = true;
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
  var addBindClassFlags = (flags, bindClasses, primaryClassKey = "classes") => {
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
  var getUpdatesFromStatesAndClasssFlags = ({ allStates, allClassFlags, classFlags, bindClassFlags }) => {
    const updates = {};
    for (const [classKey, allClassFlag] of Object.entries(allClassFlags)) {
      console.assert(!!allStates[classKey], `allStates should have ${classKey} states`);
      const states = allStates[classKey];
      for (const value2 of Object.keys(states)) {
        if (allClassFlag[value2] && !classFlags?.[classKey]?.[value2]) {
          states[value2] = false;
        }
      }
      if (bindClassFlags?.[classKey]) {
        Object.assign(states, bindClassFlags[classKey]);
      }
      updates[classKey] = CP.flagsToClassNames(states);
    }
    return updates;
  };
  var toggleClass = ({ attr, set }, value2, key) => {
    if (key === void 0) {
      key = "classes";
    }
    if (attr[key] === void 0) {
      attr[key] = "";
    }
    let classArray = attr[key].split(" ");
    let i = classArray.indexOf(value2);
    if (i === -1) {
      classArray.push(value2);
    } else {
      classArray.splice(i, 1);
    }
    let data = {};
    data[key] = classArray.join(" ");
    set(data);
  };
  var hasClass = ({ attr }, value2, key) => {
    if (key === void 0) {
      key = "classes";
    }
    if (attr[key] === void 0) {
      attr[key] = "";
    }
    return attr[key].split(" ").indexOf(value2) !== -1;
  };
  var parseSelections = (sels) => {
    let options3, values;
    if (Array.isArray(sels)) {
      values = sels;
      options3 = sels.map((cls) => {
        return { label: cls, value: cls };
      });
    } else {
      values = Object.keys(sels);
      options3 = values.map((cls) => {
        return { label: sels[cls], value: cls };
      });
    }
    return { options: options3, values };
  };
  var resolveSelectiveClassesPresets = (prms) => {
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

  // ../blocks/_init/init/CP/functions/items.js
  var selectPrevItem = (tag) => {
    window.getSelection().anchorNode.parentNode.closest(tag).previousElementSibling.querySelector("[contentEditable]").focus();
  };
  var selectNextItem = (tag) => {
    window.getSelection().anchorNode.parentNode.closest(tag).nextElementSibling.querySelector("[contentEditable]").focus();
  };
  var saveItem = ({ items: items2, itemsKey: itemsKey2, set }) => {
    set({ [itemsKey2 || "items"]: JSON.parse(JSON.stringify(items2)) });
  };
  var deleteItem = (props) => {
    var { items: items2, index } = props;
    items2.splice(index, 1);
    saveItem(props);
  };
  var cloneItem = (props) => {
    var { tag, items: items2, index } = props;
    items2.splice(index, 0, JSON.parse(JSON.stringify(items2[index])));
    saveItem(props);
    selectNextItem(tag);
  };
  var upItem = (props) => {
    var { items: items2, index } = props;
    if (!items2[index - 1]) return false;
    items2.splice(index - 1, 2, items2[index], items2[index - 1]);
    saveItem(props);
  };
  var downItem = (props) => {
    var { items: items2, index } = props;
    if (!items2[index + 1]) return false;
    items2.splice(index, 2, items2[index + 1], items2[index]);
    saveItem(props);
  };
  var getItemByKeyAndIndex = ({ attr }, keys, index) => {
    let item = attr || {};
    if (keys) {
      if (Array.isArray(keys)) {
        console.assert(Array.isArray(index) && index.length === keys.length, "index and keys should be same length");
        for (let i in keys) {
          item = item?.[keys[i]]?.[index[i]];
        }
        return item || {};
      } else {
        const items2 = item[keys] || [];
        item = items2[index] || {};
      }
    }
    return item;
  };
  var updateItemByKeyAndIndex = ({ attr, set }, keys, index, item) => {
    if (keys) {
      if (Array.isArray(keys)) {
        console.assert(Array.isArray(index) && index.length === keys.length, "index and keys should be same length");
        let oldItem = attr;
        for (let i in keys) {
          if (!oldItem[keys[i]]) {
            oldItem[keys[i]] = [];
          }
          if (!oldItem[keys[i]][index[i]]) {
            oldItem[keys[i]][index[i]] = {};
          }
          oldItem = oldItem[keys[i]][index[i]];
        }
        Object.assign(oldItem, item);
        set({ [keys[0]]: JSON.parse(JSON.stringify(attr[keys[0]])) });
      } else {
        set({ [keys]: Object.assign({}, attr[keys] || {}, item) });
      }
    }
  };
  var switchItemColor = ({ items: items2, index, set }, color, itemsKey2) => {
    if (itemsKey2 === void 0) {
      itemsKey2 = "items";
    }
    let classArray = (items2[index].classes || "").split(" ");
    let i = classArray.findIndex((cls) => cls.slice(0, 5) === "color");
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
    items2[index].classes = classArray.join(" ");
    set({ [itemsKey2]: JSON.parse(JSON.stringify(items2)) });
  };
  var getItemColor = ({ items: items2, index }) => {
    let c = (items2[index].classes || "").split(" ").find((cls) => cls.slice(0, 5) === "color");
    if (!c) {
      return 0;
    }
    return parseInt(c.slice(5));
  };
  var switchItemPattern = ({ items: items2, index, set }, pattern, itemsKey2) => {
    if (itemsKey2 === void 0) {
      itemsKey2 = "items";
    }
    let classArray = (items2[index].classes || "").split(" ");
    let i = classArray.findIndex((cls) => cls.slice(0, 7) === "pattern");
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
    items2[index].classes = classArray.join(" ");
    set({ [itemsKey2]: JSON.parse(JSON.stringify(items2)) });
  };
  var getItemPattern = ({ items: items2, index }) => {
    let p = (items2[index].classes || "").split(" ").find((cls) => cls.slice(0, 7) === "pattern");
    if (!p) {
      return 0;
    }
    return parseInt(p.slice(7));
  };
  var switchItemSelectiveClass = ({ items: items2, index, set }, values, value2, itemsKey2) => {
    if (itemsKey2 === void 0) {
      itemsKey2 = "items";
    }
    let classArray = (items2[index].classes || "").split(" ");
    if (!Array.isArray(values) && _.isObject(values)) {
      values = Object.keys(values);
    }
    classArray = _.difference(classArray, values);
    if (Array.isArray(value2)) {
      classArray = classArray.concat(value2);
    } else {
      classArray.push(value2);
    }
    items2[index].classes = classArray.join(" ");
    set({ [itemsKey2]: JSON.parse(JSON.stringify(items2)) });
  };
  var getItemSelectiveClass = ({ items: items2, index }, values) => {
    if (!items2[index].classes) {
      return false;
    }
    let classArray = (items2[index].classes || "").split(" ");
    if (!Array.isArray(values) && _.isObject(values)) {
      values = Object.keys(values);
    }
    return _.intersection(classArray, values).shift();
  };
  var toggleItemClass = ({ items: items2, index, set }, value2, itemsKey2) => {
    if (itemsKey2 === void 0) {
      itemsKey2 = "items";
    }
    let classArray = (items2[index].classes || "").split(" ");
    let i = classArray.indexOf(value2);
    if (i === -1) {
      classArray.push(value2);
    } else {
      classArray.splice(i, 1);
    }
    items2[index].classes = classArray.join(" ");
    set({ [itemsKey2]: JSON.parse(JSON.stringify(items2)) });
  };
  var hasItemClass = ({ items: items2, index }, value2) => {
    let classArray = (items2[index].classes || "").split(" ");
    return classArray.indexOf(value2) !== -1;
  };

  // ../blocks/_init/init/CP/functions/json.js
  var getJsonValue = ({ attr }, json, key) => {
    if (!attr[json]) {
      return null;
    }
    return JSON.parse(attr[json])[key];
  };
  var hasJsonValue = (prop, json, key, value2) => {
    let values = getJsonValue(prop, json, key);
    if (!values) {
      return false;
    }
    return values.indexOf(value2) !== -1;
  };
  var setJsonValue = ({ attr, set }, json, key, value2) => {
    let data = {};
    let jsonData = JSON.parse(attr[json]);
    jsonData[key] = value2;
    data[json] = JSON.stringify(jsonData);
    set(data);
  };
  var setJsonValues = ({ attr, set }, json, keys, value2) => {
    let data = {};
    let jsonData = JSON.parse(attr[json]);
    if (keys) {
      for (const key in keys) {
        jsonData[keys[key]] = value2[key];
      }
    } else {
      Object.assign(jsonData, value2);
    }
    data[json] = JSON.stringify(jsonData);
    set(data);
  };
  var switchJsonValue = (prop, json, key, value2) => {
    let values = CP.getJsonValue(prop, json, key);
    if (!values) {
      values = [];
    }
    let i = values.indexOf(value2);
    if (i === -1) {
      values.push(value2);
    } else {
      values.splice(i, 1);
    }
    setJsonValue(prop, json, key, values);
  };

  // ../blocks/_init/init/CP/functions/style.js
  var parseStyleString = (css) => {
    if (css instanceof Object) {
      return css;
    }
    if (!css) {
      return {};
    }
    var obj = {};
    css.replace("&amp;", "&").split(";").forEach((pair) => {
      const match = pair.match(/^((\-\-)?([^:]+?)):(.+)$/);
      if (!match) {
        return;
      }
      obj[match[2] ? match[1] : kebabToCamel(match[3])] = match[4];
    });
    return obj;
  };
  var createStyleString = (data) => {
    if (!data) {
      return "";
    }
    return Object.keys(data).map((key) => {
      return camelToKebab(key) + ":" + data[key] + ";";
    }).join("");
  };
  var parseStyleCode = (code) => {
    let rtn = {};
    for (const match of code.matchAll(/(\S.+?){([^}]+)}/g)) {
      rtn[match[1]] = parseStyleString(match[2]);
    }
    return rtn;
  };
  var createStyleCode = (data) => {
    if (!data) {
      return "";
    }
    return Object.keys(data).map((sel) => {
      return sel + "{" + createStyleString(data[sel]) + "}";
    }).join("");
  };
  var parseStyleCodeWithMediaQuery = (code) => {
    if (!code) {
      return {};
    }
    var rtn = {};
    const reg = /@media\s*\((.+?)\)\s*{([^}]+})\s*}/;
    const defaultCode = code.replace(new RegExp(reg, "g"), (str) => {
      const matches = str.match(reg);
      rtn[matches[1]] = parseStyleCode(matches[2]);
      return "";
    });
    rtn["default"] = parseStyleCode(defaultCode);
    return rtn;
  };
  var createStyleCodeWithMediaQuery = (data) => {
    var rtn = "";
    return Object.keys(data).map((media) => {
      if (media === "default") {
        return { p: -1e4, media };
      }
      const matches = media.match(/(min|max)\-width:(\d+)px/);
      return { p: parseInt(matches[2]) * { min: 1, max: -1 }[matches[1]], media };
    }).sort((a, b) => a.p - b.p).map((d) => d.media).map((media) => {
      if (media === "default") {
        return createStyleCode(data[media]);
      }
      return "@media(" + media + "){" + createStyleCode(data[media]) + "}";
    }).join("");
  };
  var createGridStyleCode = (sel, bnd) => {
    return sel + "{" + createStyleString(CP.createGridStyleCodeData(bnd)) + "}";
  };
  var createGridStyleCodeData = (bnd) => {
    var rtn = {
      display: "grid",
      " display": "-ms-grid",
      "-ms-grid-columns": "1fr ".repeat(bnd[0]),
      "grid-template-columns": "repeat(" + bnd[0] + ",1fr)",
      "-ms-grid-rows": "1fr ".repeat(bnd[1]),
      "grid-template-rows": "repeat(" + bnd[1] + ",1fr)"
    };
    return rtn;
  };
  var createGridItemStyleCode = (sel, bnd) => {
    return sel + "{" + createStyleString(CP.createGridItemStyleCodeData(bnd)) + "}";
  };
  var createGridItemStyleCodeData = (bnd) => {
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
  };
  var getUrlInStyleCode = (code) => {
    if (!code || code.indexOf("url(") === -1) {
      return false;
    }
    const m = code.match(/url\((.+?)\)/);
    return m ? m[1] : "";
  };
  var parseGradientStyleValue = (gradient) => {
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
  };
  var translateCssVal = (type, val) => {
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
  };
  var useManageStyleData = (props, csss) => {
    const { attributes, className, setAttributes } = props;
    const { anchor, prevAnchor, styleDatas: styleDatas2 } = attributes;
    const { useEffect: useEffect6 } = wp.element;
    useEffect6(() => {
      if (!anchor) {
        setAttributes({ anchor: "s" + (/* @__PURE__ */ new Date()).getTime().toString(16) });
      }
      if (void 0 === styleDatas2) {
        const styleDatas3 = {};
        csss.forEach((key) => {
          styleDatas3[key] = CP.parseStyleCodeWithMediaQuery(attributes[key]);
        });
        setAttributes({ styleDatas: styleDatas3 });
      }
    }, []);
    useEffect6(() => {
      if (anchor && anchor.length > 2) {
        if (document.querySelectorAll("#" + anchor).length > 1) {
          setAttributes({ anchor: "s" + (/* @__PURE__ */ new Date()).getTime().toString(16) });
        }
        const atts = {};
        atts.prevAnchor = anchor;
        atts.styleDatas = {};
        csss.forEach((key) => {
          if (!attributes[key]) {
            return;
          }
          atts[key] = attributes[key].replace("#" + prevAnchor, "#" + anchor);
          atts.styleDatas[key] = CP.parseStyleCodeWithMediaQuery(atts[key]);
        });
        setAttributes(atts);
      }
    }, [anchor]);
  };

  // ../blocks/_init/init/CP/functions/flags.js
  var testFlags = (cond, flags) => cond & flags === cond;
  var filterArrayWithFlags = (array, flags) => array.filter((c, i) => flags & 1 << i);

  // ../blocks/_init/init/CP/functions/transform.js
  var isRowsConvertibleToItems = (rows, itemsConf) => {
    for (const cell of rows[0].cells) {
      if (itemsConf.query.hasOwnProperty(cell.text)) {
        return true;
      }
    }
    return false;
  };
  var convertRowsToItems = (rows, itemsConf) => {
    const keyIndex = [];
    rows[0].cells.forEach((cell, index) => {
      if (itemsConf.query.hasOwnProperty(cell.text)) {
        keyIndex.push([cell.text, index]);
      }
    });
    return rows.slice(1).map((row) => {
      const item = {};
      for (const [key, index] of keyIndex) {
        item[key] = row.cells[index].text;
      }
      return item;
    });
  };

  // ../blocks/_init/init/CP/functions/csv.js
  var parseCSV = (csv) => {
    let tmp = [];
    csv = csv.replace(/("[^"]*")+/g, (match) => {
      tmp.push(match.slice(1, -1).replace(/""/g, '"'));
      return "[TMP]";
    });
    return csv.split("\r\n").map((row) => {
      return row.split(",").map((val) => val === "[TMP]" ? tmp.shift() : val);
    });
  };

  // ../blocks/_init/init/CP/functions/color.js
  var useInheritColor = (props, images) => {
    const { attributes, className, setAttributes, context } = props;
    const { setURLparams } = Catpow.util;
    const { classes, color = "0" } = attributes;
    const { useEffect: useEffect6, useMemo: useMemo5 } = wp.element;
    const inheritColor = useMemo5(() => {
      return color === "0" || context["catpow/color"] === color;
    }, [color, context["catpow/color"]]);
    useEffect6(() => {
      if (inheritColor && context["catpow/color"] !== "0") {
        setAttributes({ color: context["catpow/color"] });
      }
      setAttributes({ inheritColor: color === context["catpow/color"] });
    }, [context["catpow/color"]]);
    useEffect6(() => {
      const atts = {
        classes: classes.split(" ").filter((str) => !colorToneClassPattern.test(str)).concat(colorToneValueToClasses(color)).join(" ")
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
  };
  var extractColorToneValue = (classes) => generateColorToneValue(extractColorToneValues(classes));
  var extractColorToneValues = (classes) => {
    if (!Array.isArray(classes)) {
      classes = classes.split(" ");
    }
    const rtn = {};
    classes.find((c) => {
      const matches = c.match(colorToneClassPattern);
      if (matches) {
        if (matches[1]) {
          rtn.h = matches[2];
        }
        if (matches[5]) {
          rtn[matches[7]] = matches[8];
        }
        return rtn.hasOwnProperty("h") && rtn.hasOwnProperty("s") && rtn.hasOwnProperty("l");
      }
      return false;
    });
    return rtn;
  };
  var parseColorToneValue = (value2) => {
    if (value2) {
      const matches = value2.match(colorToneValuePattern);
      if (matches) {
        return { h: matches[1], s: matches[5], l: matches[7] };
      }
    }
    return { h: "0" };
  };
  var colorToneValueToClasses = (value2) => generateColorToneClasses(parseColorToneValue(value2));
  var generateColorToneValue = (values) => (values.h || "0") + (values.s ? "s" + values.s : "") + (values.l ? "l" + values.l : "");
  var generateColorToneClasses = (values) => {
    const classes = [];
    if (values.h) {
      classes.push("color" + values.h);
    }
    if (values.s) {
      classes.push("tone-s" + values.s);
    }
    if (values.l) {
      classes.push("tone-l" + values.l);
    }
    return classes;
  };
  var colorToneValuePattern = /^((|_|\-\-)(\-?\d+))?(s(\-?\d+))?(l(\-?\d+))?$/;
  var colorToneClassPattern = /^(color((|_|\-\-)(\-?\d+)))|(tone\-((s|l)(\-?\d+)))$/;
  var parseColorClass = (colorClass) => {
    if (colorClass) {
      const matches = colorClass.match(colorClassPattern);
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
  };
  var generateColorClass = (data) => "color" + (data.fixed ? "--" : data.relative ? "_" : "") + data.value;
  var colorClassPattern = /^color((|_|\-\-)(\-?\d+))$/;
  var parseToneClass = (toneClass) => {
    if (toneClass) {
      const matches = toneClass.match(toneClassPattern);
      if (matches) {
        return {
          s: matches[2] === "s",
          l: matches[2] === "l",
          value: matches[3]
        };
      }
    }
    return { s: false, l: false, value: 0 };
  };
  var generateToneClass = (data) => "tone-" + (data.s ? "s" : "l") + data.value;
  var toneClassPattern = /^tone\-((s|l)(\-?\d+))$/;
  var colorClassProxy = (state) => {
    if (!state) {
      state = {};
    }
    if (typeof state === "string" || Array.isArray(state)) {
      state = CP.wordsToFlags(state);
    }
    return new Proxy(state, colorClassProxyHandler);
  };
  var colorClassProxyHandler = {
    get(state, prop) {
      switch (prop) {
        case "classes": {
          return CP.flagsToWords(state);
        }
        case "value": {
          return extractColorToneValue(Object.keys(state).filter((c) => state[c]));
        }
        case "h": {
          return Object.keys(state).find((c) => colorClassPattern.test(c));
        }
        case "s":
        case "l": {
          return Object.keys(state).find((c) => {
            const match = c.match(toneClassPattern);
            return match && match[2] === prop;
          });
        }
      }
      return Reflect.get(...arguments);
    },
    set(state, prop, val) {
      switch (prop) {
        case "state": {
          return state;
        }
        case "h":
        case "s":
        case "l": {
          if (prop === "h") {
            CP.filterFlags(state, (c) => !colorClassPattern.test(c));
          } else {
            CP.filterFlags(state, (c) => {
              const match = c.match(toneClassPattern);
              return !(match && match[2] === prop);
            });
          }
          if (val) {
            state[val] = true;
          }
          return;
        }
      }
      return Reflect.set(...arguments);
    }
  };

  // ../blocks/_init/init/CP/functions/media.js
  var selectImage = (set, { attr, keys, index, size, devices: devices2 = ["sp", "tb"], type = "image" }) => {
    if (CP.uploder === void 0) {
      CP.uploader = wp.media({
        title: "Select Image",
        button: { text: "Select" },
        multiple: false,
        library: { type }
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
      } else if (keys.src) {
        data[keys.src] = image.url;
      } else if (keys.url) {
        data[keys.url] = `url(${image.url})`;
      }
      if (keys.sources) {
        if (image.sizes) {
          data[keys.sources] = devices2.map((device) => {
            const sizeData = CP.devices[device];
            return { srcset: image.sizes[sizeData.media_size].url, device };
          });
        } else {
          data[keys.sources] = devices2.map((device) => {
            return { srcset: image.url, device };
          });
        }
      }
      if (keys.srcset && image.sizes) {
        data[keys.srcset] = "";
        devices2.forEach((device) => {
          const sizeData = CP.devices[device];
          data[keys.srcset] += image.sizes[sizeData.media_size].url + sizeData.rep;
        });
      }
      if (keys.data) {
        data[keys.data] = image;
      }
      if (attr && keys.items && index) {
        CP.updateItemByKeyAndIndex({ attr, set }, keys.items, index, data);
      } else {
        set(data);
      }
    }).off("open").on("open", () => {
      const library = CP.uploader.state().get("library");
      if (library.props.get("type") !== type) {
        library.props.set({ type });
        library.reset();
      }
    }).open();
  };
  var imageSrcOrDummy = (src) => {
    if (!src) {
      return wpinfo.theme_url + "/images/dummy.jpg";
    }
    if (src[0] == "[") {
      return wpinfo.plugins_url + "/catpow/callee/dummy_image.php?text=" + src;
    }
    return src;
  };
  var getImageSizesForDevices = (devices2) => {
    return Object.keys(CP.devices).filter((device) => devices2.includes(device)).map((device) => CP.devices[device].sizes).join(",");
  };
  var getPictureSoucesAttributes = (selector) => {
    return {
      source: "query",
      selector: (selector || "picture") + " source",
      query: {
        srcset: { source: "attribute", attribute: "srcset" },
        device: { source: "attribute", attribute: "data-device" }
      }
    };
  };
  var getPictureSoucesAttributesForDevices = (devices2, selector, image) => {
    let attr = CP.getPictureSoucesAttributes(selector);
    attr.default = CP.getPictureSoucesAttributesDefaultValueForDevices(devices2, image);
    return attr;
  };
  var getPictureSoucesAttributesDefaultValueForDevices = (devices2, image) => {
    return devices2.map((device) => ({ srcset: wpinfo.theme_url + "/images/" + (image || "dummy.jpg"), device }));
  };
  var getMediaQueryKeyForDevice = (device) => {
    if (!CP.devices[device].media_query) {
      return "default";
    }
    return CP.devices[device].media_query.slice(1, -1);
  };

  // ../blocks/_init/init/CP/functions/datalist.js
  var getDataListId = (name, values) => {
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
      values.forEach((value2) => {
        const option = document.createElement("option");
        option.value = value2;
        datalist.appendChild(option);
      });
      document.body.appendChild(datalist);
    }
    return id;
  };

  // ../blocks/_init/init/CP/functions/richtext.js
  var getSelecedFormatElement = () => {
    const sel = window.getSelection();
    if (!sel.rangeCount) return null;
    const con = sel.getRangeAt(0).startContainer;
    return con.nextElementSibling || con.parentElement;
  };

  // ../blocks/_init/init/CP/functions/event.js
  var extractEventDispatcherAttributes = (blockTypeName, item) => {
    const blockType = wp.data.select("core/blocks").getBlockType(blockTypeName);
    const eventDispatcherAttributes = {};
    if (blockType.attributes.items.eventDispatcherAttributes) {
      blockType.attributes.items.eventDispatcherAttributes.map((attr_name) => {
        eventDispatcherAttributes[blockType.attributes.items.query[attr_name].attribute] = item[attr_name];
      });
    }
    return eventDispatcherAttributes;
  };

  // ../blocks/_init/init/CP/functions/block.js
  var createBlocks = (blocks) => {
    return blocks.map((block) => {
      if (block[2]) {
        block[2] = CP.createBlocks(block[2]);
      }
      return wp.blocks.createBlock(...block);
    });
  };

  // ../blocks/_init/init/CP/functions/proxy.js
  var finderProxy = (obj) => new Proxy(obj, finderProxyHandler);
  var finderProxyHandler = {
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
  };

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
  wp.hooks.addFilter("blocks.registerBlockType", "catpow/editor", function(settings, name) {
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
  });
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

  // ../blocks/_init/init/format.jsx
  var { __: __4 } = wp.i18n;
  var { BlockControls, RichTextToolbarButton, RichTextShortcut } = wp.blockEditor;
  var { Popover, BaseControle, TextControl, RangeControl, Card, CardBody, ToolbarGroup } = wp.components;
  var { useState: useState3, useMemo: useMemo4, useCallback: useCallback3, useReducer: useReducer2, useEffect: useEffect5 } = wp.element;
  var { removeFormat, applyFormat, toggleFormat, insert, create, slice } = wp.richText;
  wp.richText.registerFormatType("catpow/ruby", {
    title: "Ruby",
    tagName: "ruby",
    className: "rtf-ruby",
    edit({ isActive, value: value2, onChange }) {
      const onToggle = () => {
        if (isActive) {
          return onChange(toggleFormat(value2, { type: "catpow/ruby" }));
        }
        if (wp.richText.isCollapsed(value2)) {
          alert(__4("\u30EB\u30D3\u3092\u3064\u3051\u305F\u3044\u30C6\u30AD\u30B9\u30C8\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044"));
          return;
        }
        let rt = prompt(__4("\u30EB\u30D3\u3092\u5165\u529B"));
        if (rt === null) {
          return;
        }
        return onChange(
          wp.richText.insert(
            value2,
            wp.richText.create({
              html: `<ruby class="rtf-ruby">${wp.richText.slice(value2).text}<rt class="rtf-ruby__rt">${rt}</rt></ruby>`
            }),
            value2.start,
            value2.end
          )
        );
      };
      const icon = /* @__PURE__ */ wp.element.createElement("svg", { role: "img", focusable: "false", xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 20 20", "aria-hidden": "true" }, /* @__PURE__ */ wp.element.createElement(
        "path",
        {
          d: "M3.6,19.8L8.9,6.2h1.9l5.6,13.6h-2l-1.6-4.1H7l-1.5,4.1H3.6z M7.6,14.2h4.6l-1.4-3.8c-0.4-1.1-0.8-2.1-1-2.8\n				c-0.2,0.9-0.4,1.7-0.7,2.6L7.6,14.2z"
        }
      ), /* @__PURE__ */ wp.element.createElement(
        "path",
        {
          d: "M10.7,4.4C10.4,4.7,10.1,4.9,9.8,5C9.6,5.1,9.3,5.1,9,5.1C8.4,5.2,8,5,7.7,4.8c-0.3-0.3-0.4-0.6-0.4-1c0-0.2,0-0.4,0.2-0.6\n					C7.6,3,7.7,2.8,7.9,2.7C8,2.6,8.2,2.5,8.5,2.4c0.2,0,0.4-0.1,0.7-0.1c0.7-0.1,1.1-0.2,1.4-0.3c0-0.1,0-0.2,0-0.2\n					c0-0.3-0.1-0.6-0.2-0.7c-0.2-0.2-0.5-0.3-0.9-0.3C9.1,0.8,8.8,0.9,8.6,1C8.4,1.2,8.3,1.4,8.2,1.8L7.4,1.7C7.5,1.3,7.6,1,7.8,0.8\n					c0.2-0.2,0.4-0.4,0.7-0.5c0.3-0.1,0.7-0.2,1.1-0.2c0.4,0,0.7,0,1,0.1c0.3,0.1,0.4,0.2,0.6,0.4c0.1,0.1,0.2,0.3,0.3,0.5\n					c0,0.1,0,0.4,0,0.7l0,1.1c0,0.8,0,1.2,0.1,1.4c0,0.2,0.1,0.4,0.2,0.6l-0.8,0C10.8,4.9,10.7,4.7,10.7,4.4z M10.6,2.6\n					C10.3,2.8,9.9,2.9,9.3,3C9,3,8.7,3.1,8.6,3.1C8.5,3.2,8.4,3.3,8.3,3.4C8.2,3.5,8.2,3.6,8.2,3.8c0,0.2,0.1,0.4,0.3,0.5\n					c0.2,0.1,0.4,0.2,0.7,0.2c0.3,0,0.6-0.1,0.8-0.2s0.4-0.3,0.5-0.6c0.1-0.2,0.1-0.5,0.1-0.8L10.6,2.6z"
        }
      ));
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(RichTextShortcut, { type: "primary", character: "r", onUse: onToggle }), /* @__PURE__ */ wp.element.createElement(RichTextToolbarButton, { icon, title: "Ruby", onClick: onToggle, isActive, shortcutType: "primary", shortcutCharacter: "r" }));
    }
  });
  wp.richText.registerFormatType("catpow/rt", {
    title: "RubyText",
    tagName: "rt",
    className: "rtf-ruby__rt"
  });
  wp.richText.registerFormatType("catpow/small", {
    title: "small",
    tagName: "small",
    className: "rtf-small",
    edit({ isActive, value: value2, onChange }) {
      const onToggle = () => onChange(toggleFormat(value2, { type: "catpow/small" }));
      const icon = /* @__PURE__ */ wp.element.createElement("svg", { role: "img", focusable: "false", xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 20 20", "aria-hidden": "true" }, /* @__PURE__ */ wp.element.createElement(
        "path",
        {
          d: "M5.6,16.7l3.6-9.4h1.3l3.8,9.4H13l-1.1-2.8H8l-1,2.8H5.6z M8.3,12.9h3.2l-1-2.6C10.2,9.5,10,8.9,9.9,8.4\n		C9.7,9,9.6,9.6,9.3,10.1L8.3,12.9z"
        }
      ));
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(RichTextShortcut, { type: "primary", character: "-", onUse: onToggle }), /* @__PURE__ */ wp.element.createElement(RichTextToolbarButton, { icon, title: "small", onClick: onToggle, isActive, shortcutType: "primary", shortcutCharacter: "-" }));
    }
  });
  wp.richText.registerFormatType("catpow/u", {
    title: "underline",
    tagName: "u",
    className: "rtf-u",
    edit({ isActive, value: value2, onChange }) {
      const onToggle = () => onChange(toggleFormat(value2, { type: "catpow/u" }));
      const icon = /* @__PURE__ */ wp.element.createElement("svg", { role: "img", focusable: "false", xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 20 20", "aria-hidden": "true" }, /* @__PURE__ */ wp.element.createElement(
        "path",
        {
          d: "M6.2,12.1h7.2l2,5.2h2.6L11,0H8.5L1.9,17.3h2.4L6.2,12.1z M8.8,5.1C9.2,4,9.5,2.9,9.7,1.8C10,2.8,10.4,4,10.9,5.4l1.8,4.8\n	H6.9L8.8,5.1z M20,18v2H0v-2H20z"
        }
      ));
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(RichTextShortcut, { type: "primary", character: "_", onUse: onToggle }), /* @__PURE__ */ wp.element.createElement(RichTextToolbarButton, { icon, title: "underline", onClick: onToggle, isActive, shortcutType: "primary", shortcutCharacter: "_" }));
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
      const { isActive, value: value2, onChange, activeAttributes, contentRef } = props;
      const onToggle = () => {
        return onChange(
          toggleFormat(value2, {
            type: "catpow/title",
            attributes: { type: "is-header" }
          })
        );
      };
      const setAttributes = useCallback3(
        (attr) => {
          onChange(
            applyFormat(value2, {
              type: "catpow/title",
              attributes: Object.assign(activeAttributes, attr)
            })
          );
        },
        [value2, activeAttributes]
      );
      const icon = /* @__PURE__ */ wp.element.createElement("svg", { role: "img", focusable: "false", xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 20 20", "aria-hidden": "true" }, /* @__PURE__ */ wp.element.createElement("g", null, /* @__PURE__ */ wp.element.createElement("path", { d: "M6.9,15.9V2.6h2.7v5.2h5.3V2.6h2.7v13.3h-2.7v-5.8H9.6v5.8H6.9z" })), /* @__PURE__ */ wp.element.createElement("rect", { x: "1", y: "1", width: "4", height: "18" }), /* @__PURE__ */ wp.element.createElement("rect", { x: "5", y: "18", width: "14", height: "1" }));
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, isActive && /* @__PURE__ */ wp.element.createElement(Popover, { anchor: contentRef.current, position: "bottom center", focusOnMount: false }, /* @__PURE__ */ wp.element.createElement(Card, null, /* @__PURE__ */ wp.element.createElement(CardBody, null, /* @__PURE__ */ wp.element.createElement(
        CP.SelectButtons,
        {
          options: [
            { label: "header", value: "is-header" },
            { label: "headline", value: "is-headline" },
            { label: "catch", value: "is-catch" }
          ],
          selected: activeAttributes["type"],
          onChange: (type) => setAttributes({ type })
        }
      )))), /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(ToolbarGroup, { controls: [{ icon, onClick: onToggle, isActive }] })), /* @__PURE__ */ wp.element.createElement(RichTextToolbarButton, { icon, title: "Title", onClick: onToggle, isActive }));
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
      const { isActive, value: value2, onChange, activeAttributes, contentRef } = props;
      const onToggle = () => {
        return onChange(
          toggleFormat(value2, {
            type: "catpow/mark",
            attributes: { color: "color_0" }
          })
        );
      };
      const setAttributes = useCallback3(
        (attr) => {
          onChange(
            applyFormat(value2, {
              type: "catpow/mark",
              attributes: Object.assign(activeAttributes, attr)
            })
          );
        },
        [value2, activeAttributes]
      );
      const icon = /* @__PURE__ */ wp.element.createElement("svg", { role: "img", focusable: "false", xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 20 20", "aria-hidden": "true" }, /* @__PURE__ */ wp.element.createElement("polygon", { points: "7.9,10.8 12.1,10.8 10,5.3 	" }), /* @__PURE__ */ wp.element.createElement("path", { d: "M0,2v16h20V2H0z M13.7,15.3L12.5,12h-5l-1.2,3.4H4.7L9,4h1.9l4.3,11.3H13.7z" }));
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, isActive && /* @__PURE__ */ wp.element.createElement(Popover, { anchor: contentRef.current, position: "bottom center", focusOnMount: false }, /* @__PURE__ */ wp.element.createElement(Card, { size: "small" }, /* @__PURE__ */ wp.element.createElement(CardBody, null, /* @__PURE__ */ wp.element.createElement(CP.ColorVarTracer, { target: contentRef.current }, /* @__PURE__ */ wp.element.createElement(CP.SelectThemeColor, { onChange: (proxy) => setAttributes({ color: proxy.classes }), selected: activeAttributes["color"] }))))), /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(ToolbarGroup, { controls: [{ icon, onClick: onToggle, isActive }] })), /* @__PURE__ */ wp.element.createElement(RichTextToolbarButton, { icon, title: "Mark", onClick: onToggle, isActive }));
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
      const { isActive, value: value2, onChange, activeAttributes, contentRef } = props;
      const onToggle = () => {
        return onChange(
          toggleFormat(value2, {
            type: "catpow/large",
            attributes: { color: "color_0" }
          })
        );
      };
      const setAttributes = useCallback3(
        (attr) => {
          onChange(
            applyFormat(value2, {
              type: "catpow/large",
              attributes: Object.assign(activeAttributes, attr)
            })
          );
        },
        [value2, activeAttributes]
      );
      const icon = /* @__PURE__ */ wp.element.createElement("svg", { role: "img", focusable: "false", xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 20 20", "aria-hidden": "true" }, /* @__PURE__ */ wp.element.createElement(
        "path",
        {
          d: "M4.8,0.5h5c1.6,0,2.8,0.1,3.6,0.4c0.8,0.2,1.5,0.7,2,1.5c0.5,0.8,0.8,2,0.8,3.6c0,1.1-0.2,1.9-0.5,2.4\n		c-0.4,0.4-1.1,0.8-2.1,1c1.2,0.3,1.9,0.7,2.4,1.3c0.4,0.6,0.6,1.5,0.6,2.8v1.8c0,1.3-0.1,2.3-0.4,2.9c-0.3,0.6-0.8,1.1-1.4,1.3\n		c-0.7,0.2-2,0.3-4,0.3H4.8V0.5z M9.8,3.8v4.3c0.2,0,0.4,0,0.5,0c0.5,0,0.8-0.1,0.9-0.4c0.1-0.2,0.2-0.9,0.2-2.1\n		c0-0.6-0.1-1-0.2-1.3s-0.3-0.4-0.4-0.5C10.7,3.8,10.4,3.8,9.8,3.8z M9.8,11.1v5.4c0.7,0,1.2-0.1,1.4-0.3c0.2-0.2,0.3-0.7,0.3-1.5\n		v-1.8c0-0.8-0.1-1.3-0.3-1.5C11.1,11.2,10.6,11.1,9.8,11.1z"
        }
      ));
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, isActive && /* @__PURE__ */ wp.element.createElement(Popover, { anchor: contentRef.current, position: "bottom center", focusOnMount: false }, /* @__PURE__ */ wp.element.createElement(Card, { size: "small" }, /* @__PURE__ */ wp.element.createElement(CardBody, null, /* @__PURE__ */ wp.element.createElement(CP.ColorVarTracer, { target: contentRef.current }, /* @__PURE__ */ wp.element.createElement(CP.SelectThemeColor, { onChange: (proxy) => setAttributes({ color: proxy.classes }), selected: activeAttributes["color"] }))))), /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(ToolbarGroup, { controls: [{ icon, onClick: onToggle, isActive }] })), /* @__PURE__ */ wp.element.createElement(RichTextToolbarButton, { icon, title: "Large", onClick: onToggle, isActive }));
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
      const { isActive, value: value2, onChange, onFocus, activeAttributes, activeObject, contentRef } = props;
      const onToggle = () => {
        return onChange(
          toggleFormat(value2, {
            type: "catpow/tag",
            attributes: { class: "color_0" }
          })
        );
      };
      const setAttributes = useCallback3(
        (attr) => {
          onChange(
            applyFormat(value2, {
              type: "catpow/tag",
              attributes: Object.assign(activeAttributes, attr)
            })
          );
        },
        [value2, activeAttributes]
      );
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, isActive && /* @__PURE__ */ wp.element.createElement(Popover, { anchor: contentRef.current, position: "bottom center", focusOnMount: false }, /* @__PURE__ */ wp.element.createElement(Card, null, /* @__PURE__ */ wp.element.createElement(CardBody, null, /* @__PURE__ */ wp.element.createElement(TextControl, { label: "URL", value: activeAttributes["url"], onChange: (url) => setAttributes({ url }) }))), /* @__PURE__ */ wp.element.createElement(Card, { size: "small" }, /* @__PURE__ */ wp.element.createElement(CardBody, null, /* @__PURE__ */ wp.element.createElement(CP.ColorVarTracer, { target: contentRef.current }, /* @__PURE__ */ wp.element.createElement(CP.SelectThemeColor, { onChange: (proxy) => setAttributes({ color: proxy.classes }), selected: activeAttributes["color"] }))))), /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(ToolbarGroup, { controls: [{ icon: "tag", onClick: onToggle, isActive }] })), /* @__PURE__ */ wp.element.createElement(RichTextToolbarButton, { icon: "tag", title: "tag", onClick: onToggle, isActive }));
    }
  });
  wp.richText.registerFormatType("catpow/annotation", {
    title: "annotation",
    tagName: "small",
    className: "rtf-annotation",
    edit({ isActive, value: value2, onChange }) {
      const onToggle = () => onChange(toggleFormat(value2, { type: "catpow/annotation" }));
      const icon = /* @__PURE__ */ wp.element.createElement("svg", { role: "img", focusable: "false", xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 20 20", "aria-hidden": "true" }, /* @__PURE__ */ wp.element.createElement(
        "path",
        {
          d: "M2.99,2.01l7.04,7.04l7.04-7.04l0.62,0.62l-7.04,7.04l7.04,7.04l-0.62,0.62l-7.04-7.04l-7.06,7.06l-0.62-0.62l7.06-7.06\n		L2.37,2.62L2.99,2.01z M3.95,11.26c-0.87,0-1.6-0.73-1.6-1.6s0.73-1.6,1.6-1.6s1.6,0.73,1.6,1.6C5.55,10.58,4.78,11.26,3.95,11.26z\n		 M8.43,3.58c0-0.87,0.73-1.6,1.6-1.6s1.6,0.73,1.6,1.6s-0.73,1.6-1.6,1.6C9.11,5.18,8.43,4.42,8.43,3.58z M11.63,15.74\n		c0,0.87-0.73,1.6-1.6,1.6s-1.6-0.73-1.6-1.6c0-0.88,0.73-1.6,1.6-1.6C10.94,14.14,11.63,14.91,11.63,15.74z M16.11,8.06\n		c0.87,0,1.6,0.73,1.6,1.6s-0.73,1.6-1.6,1.6c-0.88,0-1.6-0.73-1.6-1.6C14.51,8.75,15.28,8.06,16.11,8.06z"
        }
      ));
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(ToolbarGroup, { controls: [{ icon, onClick: onToggle, isActive }] })), /* @__PURE__ */ wp.element.createElement(RichTextToolbarButton, { icon, title: "annotation", onClick: onToggle, isActive }));
    }
  });
  wp.richText.registerFormatType("catpow/custom", {
    title: "custom",
    tagName: "span",
    className: "rtf-custom",
    attributes: {
      vars: "style"
    },
    edit(props) {
      const { isActive, value: value2, onChange, onFocus, activeAttributes, activeObject, contentRef } = props;
      const onToggle = () => {
        return onChange(
          toggleFormat(value2, {
            type: "catpow/custom",
            attributes: { vars: "font-size:1em;" }
          })
        );
      };
      const setAttributes = useCallback3(
        (attr) => {
          onChange(
            applyFormat(value2, {
              type: "catpow/custom",
              attributes: Object.assign(activeAttributes, attr)
            })
          );
        },
        [value2, activeAttributes]
      );
      const extractStateFromVars = useCallback3((vars) => {
        const state2 = {};
        if (!vars) {
          return state2;
        }
        const map = {
          color: "color",
          "background-color": "bgcolor",
          "font-size": "size",
          "font-weight": "weight"
        };
        vars.split(";").forEach((chunk) => {
          const [key, val] = chunk.split(":");
          state2[map[key]] = val;
        });
        return state2;
      }, []);
      const extractVarsFromState = useCallback3((state2) => {
        let vars = "";
        const map = {
          color: "color:$;",
          bgcolor: "background-color:$;",
          size: "font-size:$em;",
          weight: "font-weight:$;"
        };
        Object.keys(map).forEach((key) => {
          if (state2.hasOwnProperty(key)) {
            vars += map[key].replace("$", "" + state2[key]);
          }
        });
        return vars;
      }, []);
      const init = useCallback3((state2) => {
        if (state2.vars) {
          const { vars } = state2;
          return { vars, ...extractStateFromVars(vars) };
        }
        return { color: "inherit", size: 1, weight: 400, vars: "font-size:1em;" };
      }, []);
      const reducer = useCallback3((state2, action) => {
        if (action.hasOwnProperty("vars")) {
          const { vars } = action;
          return { vars, ...extractStateFromVars(vars) };
        } else {
          const newState = { ...state2, ...action };
          newState.vars = extractVarsFromState(newState);
          return newState;
        }
      }, []);
      const [state, update] = useReducer2(reducer, { vars: activeAttributes.vars }, init);
      useEffect5(() => {
        if (isActive) {
          onChange(
            applyFormat(value2, {
              type: "catpow/custom",
              attributes: { vars: state.vars }
            })
          );
        }
      }, [state.vars]);
      useEffect5(() => {
        update({ vars: activeAttributes.vars });
      }, [activeAttributes.vars]);
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, isActive && /* @__PURE__ */ wp.element.createElement(Popover, { anchor: contentRef.current, position: "bottom center", focusOnMount: false }, /* @__PURE__ */ wp.element.createElement(Card, null, /* @__PURE__ */ wp.element.createElement(CardBody, { style: { width: "20rem" } }, /* @__PURE__ */ wp.element.createElement(TextControl, { label: "\u8272", onChange: (color) => update({ color }), value: state.color || "" }), /* @__PURE__ */ wp.element.createElement(TextControl, { label: "\u80CC\u666F\u8272", onChange: (bgcolor) => update({ bgcolor }), value: state.bgcolor || "" }), /* @__PURE__ */ wp.element.createElement(RangeControl, { label: "\u30B5\u30A4\u30BA", onChange: (size) => update({ size }), value: parseFloat(state.size || 1), min: 0.1, max: 10, step: 0.1 }), /* @__PURE__ */ wp.element.createElement(RangeControl, { label: "\u592A\u3055", onChange: (weight) => update({ weight }), value: parseFloat(state.weight || 400), min: 100, max: 1e3, step: 100 })))), /* @__PURE__ */ wp.element.createElement(BlockControls, null, /* @__PURE__ */ wp.element.createElement(ToolbarGroup, { controls: [{ icon: "admin-generic", onClick: onToggle, isActive }] })), /* @__PURE__ */ wp.element.createElement(RichTextToolbarButton, { icon: "admin-generic", title: "custom", onClick: onToggle, isActive }));
    }
  });
  wp.richText.registerFormatType("catpow/clear", {
    title: "clear",
    tagName: "div",
    className: null,
    edit({ isActive, value: value2, onChange }) {
      return /* @__PURE__ */ wp.element.createElement(RichTextToolbarButton, { icon: "dismiss", title: "\u{1F9F9}\u5168\u3066\u306E\u30B9\u30BF\u30A4\u30EB\u3092\u30AF\u30EA\u30A2", onClick: () => onChange(create({ html: value2.text })), isActive: false });
    }
  });

  // ../blocks/_init/init/plugins.jsx
  wp.plugins.registerPlugin("catpow-sidebar", {
    render: (props) => {
      const { useState: useState4, useMemo: useMemo5, useCallback: useCallback4 } = wp.element;
      const { PluginSidebarMoreMenuItem, PluginSidebar } = wp.editPost;
      const { PanelBody } = wp.components;
      const [structure, setStructure] = useState4(false);
      const { DataStructure: DataStructure2, DataStructureItem: DataStructureItem2 } = CP;
      if (!structure) {
        wp.apiFetch({ path: "/cp/v1/config/structure" }).then((structure2) => {
          setStructure(structure2);
        });
      }
      const RenderMeta = useCallback4(
        ({ meta }) => {
          return /* @__PURE__ */ wp.element.createElement(DataStructure2, null, meta.map((item) => {
            if (item.value) {
              return /* @__PURE__ */ wp.element.createElement(DataStructureItem2, { title: item.label, name: item.name }, /* @__PURE__ */ wp.element.createElement(RenderMetaValue, { value: item.value }));
            }
            return /* @__PURE__ */ wp.element.createElement(DataStructureItem2, { title: item.label, name: item.name }, item.meta.length && /* @__PURE__ */ wp.element.createElement(RenderMeta, { meta: item.meta }));
          }));
        },
        [props]
      );
      const RenderMetaValue = useCallback4(
        ({ value: value2 }) => {
          if (Array.isArray(value2)) {
            return value2.map((val) => /* @__PURE__ */ wp.element.createElement(DataStructureItem2, { title: val }));
          }
          return Object.keys(value2).map((key) => {
            if (typeof value2[key] === "object") {
              return /* @__PURE__ */ wp.element.createElement(DataStructureItem2, { title: key }, /* @__PURE__ */ wp.element.createElement(RenderMetaValue, { value: value2[key] }));
            }
            return /* @__PURE__ */ wp.element.createElement(DataStructureItem2, { title: key, name: value2[key] });
          });
        },
        [props]
      );
      return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement(PluginSidebarMoreMenuItem, { target: "catpow-sidebar" }, "\u{1F43E}Catpow"), /* @__PURE__ */ wp.element.createElement(
        PluginSidebar,
        {
          name: "catpow-sidebar",
          title: "\u{1F43E}Catpow",
          icon: /* @__PURE__ */ wp.element.createElement("svg", { role: "img", focusable: "false", xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 20 20", "aria-hidden": "true" }, /* @__PURE__ */ wp.element.createElement("g", null, /* @__PURE__ */ wp.element.createElement(
            "path",
            {
              d: "M10.1,14.5c0-0.9,0.5-1.4,1.3-1.5c0.6-0.1,1.1-0.5,1.6-0.8c0.8-0.5,2.3-0.4,3,0.1c0.4,0.3,0.8,0.6,1,1.1\n								c0.2,0.5,0.1,1,0.1,1.5c-0.1,0.8,0.1,1.6,0.1,2.4c0,1.3-1.4,1.7-2.3,1.4c-0.6-0.3-0.9-0.8-1.3-1.3c-0.4-0.4-0.9-0.7-1.4-0.9\n								c-0.8-0.3-1.7-0.6-2.1-1.6C10,14.8,10.1,14.6,10.1,14.5z"
            }
          ), /* @__PURE__ */ wp.element.createElement(
            "path",
            {
              d: "M2.8,8.6c0.3-1,0.5-2.2,0.9-3.3c0.3-0.8,1.9-1.3,2.7-1c0.9,0.3,1.7,0.9,2.5,1.4c0.5,0.3,1.1,0.5,1.4,1.1\n								c0.2,0.5,0.2,0.9,0,1.4c-0.6,1.2-1.7,1-2.7,1.1c-0.8,0.1-1.4,0.5-2,0.9c-0.5,0.3-1,0.5-1.6,0.4C3.2,10.2,2.7,9.7,2.8,8.6z"
            }
          ), /* @__PURE__ */ wp.element.createElement(
            "path",
            {
              d: "M4.9,2.2C4.8,2.8,4.8,3.6,4,3.9C3.5,4.1,3.2,3.8,2.9,3.5C2,2.6,2.2,1.6,2.7,0.6c0.2-0.3,0.5-0.5,0.9-0.4\n								c0.4,0,0.7,0.3,0.9,0.6C4.8,1.2,4.9,1.7,4.9,2.2z"
            }
          ), /* @__PURE__ */ wp.element.createElement(
            "path",
            {
              d: "M1,3.5c0.8,0,1.3,0.8,1.5,1.4c0.2,0.7,0.1,1.2-0.4,1.7C1.6,7.1,0.9,6.8,0.5,6.2C0.1,5.6,0.1,4.9,0.2,4.3\n								C0.2,3.8,0.4,3.4,1,3.5z"
            }
          ), /* @__PURE__ */ wp.element.createElement(
            "path",
            {
              d: "M5.8,1.8c0-1.2,0.4-1.6,1.3-1.5c0.6,0.1,1,0.6,1.1,1.2c0.1,0.8,0,1.5-0.6,2.1C7.1,4,6.7,3.7,6.5,3.4C6,3,5.7,2.4,5.8,1.8z\n								"
            }
          ), /* @__PURE__ */ wp.element.createElement("path", { d: "M15.3,11.5c-0.7,0-1-0.3-1-1c0-0.9,0.9-1.8,1.8-1.8c0.6,0,1.1,0.6,1.1,1.3C17.2,10.7,16.3,11.5,15.3,11.5z" }), /* @__PURE__ */ wp.element.createElement("path", { d: "M17.3,12.5c0-1.1,0.3-1.5,1.1-1.5c0.8,0,1.3,0.5,1.3,1.2c0,1-0.6,1.7-1.3,1.7C17.6,13.9,17.3,13.5,17.3,12.5z" }), /* @__PURE__ */ wp.element.createElement("path", { d: "M11.6,11.8c-0.5,0.1-0.9-0.2-0.9-0.8c0-1,0.6-1.9,1.3-2c0.8,0,1.3,0.4,1.3,1.2C13.3,11.1,12.7,11.7,11.6,11.8z" }), /* @__PURE__ */ wp.element.createElement(
            "path",
            {
              d: "M18.9,17.7c-0.7,0-1.2-0.9-1-1.5c0.2-0.4,0.1-0.8,0.4-1.2c0.3-0.3,1.2-0.3,1.4,0.1c0.4,0.8,0.3,1.7-0.3,2.4\n								C19.3,17.6,19.1,17.7,18.9,17.7z"
            }
          ), /* @__PURE__ */ wp.element.createElement("path", { d: "M8.7,3.4c0-0.6,0.4-1.1,0.9-1.1C10.2,2.3,11,3.2,11,4c0,0.6-0.5,0.9-1.1,1C9.2,4.9,8.7,4.3,8.7,3.4z" })))
        },
        /* @__PURE__ */ wp.element.createElement(PanelBody, { title: "\u30C7\u30FC\u30BF\u69CB\u9020", initialOpen: false }, /* @__PURE__ */ wp.element.createElement(DataStructure2, null, structure && Object.keys(structure).map((data_type) => {
          return /* @__PURE__ */ wp.element.createElement(DataStructureItem2, { title: data_type, key: data_type }, structure[data_type].length && /* @__PURE__ */ wp.element.createElement(DataStructure2, null, structure[data_type].map((item) => /* @__PURE__ */ wp.element.createElement(DataStructureItem2, { title: item.label, name: item.name, key: item.name }, item.meta.length && /* @__PURE__ */ wp.element.createElement(RenderMeta, { meta: item.meta })))));
        })))
      ));
    }
  });

  // ../blocks/_init/init/index.jsx
  window.CP = CP_exports;
})();
