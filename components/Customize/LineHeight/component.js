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
    useMemo: () => useMemo,
    useReducer: () => useReducer,
    useRef: () => useRef,
    useState: () => useState,
    version: () => version
  });
  var react_default, version, useState, useEffect, useLayoutEffect, useRef, forwardRef, useMemo, useCallback, createContext, useContext, useReducer, createElement, cloneElement, isValidElement, Fragment;
  var init_react = __esm({
    "react-global:react"() {
      react_default = window.wp.element;
      version = "18.0.0";
      useState = wp.element.useState;
      useEffect = wp.element.useEffect;
      useLayoutEffect = wp.element.useLayoutEffect;
      useRef = wp.element.useRef;
      forwardRef = wp.element.forwardRef;
      useMemo = wp.element.useMemo;
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
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
    var _, done = false;
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
        if (_ = accept(result.get)) descriptor.get = _;
        if (_ = accept(result.set)) descriptor.set = _;
        if (_ = accept(result.init)) initializers.unshift(_);
      } else if (_ = accept(result)) {
        if (kind === "field") initializers.unshift(_);
        else descriptor[key] = _;
      }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
  }
  function __runInitializers(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  }
  function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() {
      if (t[0] & 1) throw t[1];
      return t[1];
    }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2]) _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
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
        step(g[n](v));
      } catch (e) {
        settle(q[0][3], e);
      }
    }
    function step(r2) {
      r2.value instanceof __await ? Promise.resolve(r2.value.v).then(fulfill, reject) : settle(q[0][2], r2);
    }
    function fulfill(value) {
      resume("next", value);
    }
    function reject(value) {
      resume("throw", value);
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
  function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  }
  function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function") throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
  }
  function __addDisposableResource(env, value, async) {
    if (value !== null && value !== void 0) {
      if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
      var dispose, inner;
      if (async) {
        if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
        dispose = value[Symbol.asyncDispose];
      }
      if (dispose === void 0) {
        if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
        dispose = value[Symbol.dispose];
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
      env.stack.push({ value, dispose, async });
    } else if (async) {
      env.stack.push({ async: true });
    }
    return value;
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
      var React = tslib_1.__importStar((init_react(), __toCommonJS(react_exports)));
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
        }(React.Component);
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
      var React = tslib_1.__importStar((init_react(), __toCommonJS(react_exports)));
      var addClassDecoratorSupport_1 = tslib_1.__importDefault(require_addClassDecoratorSupport());
      var h = React.createElement;
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

  // ../components/Customize/LineHeight/component.jsx
  init_react();

  // node_modules-included/catpow/src/util/array/phasedRange.js
  var phasedRange = function* (steps2) {
    let i = 0;
    for (let t of Object.keys(steps2).sort((a, b) => a - b)) {
      let step = parseFloat(steps2[t]);
      let end = parseFloat(t);
      if (step > 0) {
        for (; i < end; i += step) {
          yield i;
        }
      }
      i = end;
    }
    yield i;
  };

  // node_modules-included/catpow/src/util/array/range.js
  var range = function* (start, end, step = 1) {
    if (arguments.length === 1) {
      end = start;
      start = 0;
    }
    for (let i = start; i <= end; i += step) {
      yield i;
    }
  };

  // node_modules-included/catpow/src/util/array/rangeValueConverter.ts
  var rangeValueConverter = function(rawValues, snap = false) {
    let values;
    if (!Array.isArray(rawValues)) {
      values = [...(typeof rawValues === "number" ? range : phasedRange)(rawValues)];
    } else {
      values = rawValues;
    }
    const len = values.length;
    const lastIndex = len - 1;
    return {
      length: values.length,
      getValue(pos) {
        if (pos < 0) {
          return values[0];
        }
        if (pos >= 1) {
          return values[lastIndex];
        }
        if (snap) {
          return values[Math.round(pos * lastIndex)];
        }
        const p = pos * lastIndex;
        const l = Math.floor(p);
        return values[l] + (values[l + 1] - values[l]) * (p - l);
      },
      getProgress(value) {
        return this.getPosition(value) / lastIndex;
      },
      getPosition(value) {
        let l = 0, r2 = lastIndex, m;
        if (values[0] > value) {
          return 0;
        }
        if (values[r2] < value) {
          return r2;
        }
        while (l <= r2) {
          m = l + (r2 - l >> 1);
          if (values[m] === value) {
            return m;
          }
          if (values[m] > value) {
            r2 = m - 1;
          } else {
            l = m + 1;
          }
        }
        const p = r2 + (value - values[r2]) / (values[l] - values[r2]);
        return snap ? Math.round(p) : p;
      }
    };
  };

  // node_modules-included/catpow/src/component/Chart/Chart.tsx
  init_react();

  // node_modules-included/catpow/src/component/Chart/DataSet.tsx
  init_react();
  var DataSetContext = createContext(null);
  var DataSet = (props) => {
    const { labels, colors, classNames, translateToDisplayValue: translateToDisplayValue2, values, steps: steps2 = { 100: 1 }, snap = true, onChange, children, ...otherProps } = props;
    const [activeRow, setActiveRow] = useState(null);
    const [activeColumn, setActiveColumn] = useState(null);
    const [focusedRow, focusRow] = useState(null);
    const selectCell = useCallback(
      (r2, c) => {
        setActiveRow(r2);
        setActiveColumn(c);
      },
      [setActiveRow, setActiveColumn]
    );
    const unselectCell = useCallback(() => {
      setActiveRow(null);
      setActiveColumn(null);
    }, [setActiveRow, setActiveColumn]);
    const setValue = useCallback(
      (r2, c, value) => {
        const newValues = [...values];
        newValues[r2] = [...newValues[r2]];
        newValues[r2][c] = value;
        onChange(newValues);
      },
      [values, onChange]
    );
    const getDisplayValue = useCallback(
      (r2, c) => {
        if (translateToDisplayValue2 == null) {
          return values[r2][c];
        }
        return translateToDisplayValue2(values[r2][c], {
          r: r2,
          c,
          className: classNames?.cells?.[r2]?.[c],
          label: labels?.cells?.[r2]?.[c],
          color: colors?.cells?.[r2]?.[c] || colors?.columns?.[c] || colors?.rows?.[r2]
        });
      },
      [values, translateToDisplayValue2]
    );
    const setActiveCellValue = useCallback(
      (value) => {
        setValue(activeRow, activeColumn, value);
      },
      [activeRow, activeColumn, setValue]
    );
    const converter = useMemo(() => steps2.hasOwnProperty("getValue") ? steps2 : rangeValueConverter(steps2, snap), [steps2, snap]);
    const DataSetContextValue = useMemo(
      () => ({
        values,
        labels,
        colors,
        classNames,
        getDisplayValue,
        steps: converter,
        setValue,
        setActiveCellValue,
        activeRow,
        setActiveRow,
        activeColumn,
        setActiveColumn,
        focusedRow,
        focusRow,
        selectCell,
        unselectCell
      }),
      [
        values,
        labels,
        colors,
        classNames,
        getDisplayValue,
        converter,
        setValue,
        setActiveCellValue,
        activeRow,
        setActiveRow,
        activeColumn,
        setActiveColumn,
        focusedRow,
        focusRow,
        selectCell,
        unselectCell
      ]
    );
    return /* @__PURE__ */ wp.element.createElement(DataSetContext.Provider, { value: DataSetContextValue }, children);
  };

  // node_modules-included/catpow/src/component/Chart/Chart.tsx
  var ChartContext = createContext(null);
  var Chart = (props) => {
    const { width = 640, height = 480, margin: originalMargin = [4, 4, 4, 4], getValueWithProgressPoint, getCellWithProgressPoint, children, ...otherProps } = props;
    const { selectCell, focusedRow, setValue, activeRow, activeColumn } = useContext(DataSetContext);
    const margin = useMemo(() => {
      if (!Array.isArray(originalMargin)) {
        return [...range(4)].fill(originalMargin);
      }
      const margin2 = [...originalMargin];
      if (margin2[3] == null) {
        if (margin2[2] == null) {
          if (margin2[1] == null) {
            margin2[1] = margin2[0];
          }
          margin2[2] = margin2[0];
        }
        margin2[3] = margin2[1];
      }
      return margin2;
    }, [originalMargin]);
    const sizeValues = useMemo(() => {
      const top = margin[0];
      const bottom = height - margin[2];
      const left = margin[3];
      const right = margin[0];
      const innerHeight = height - margin[0] - margin[2];
      const innerWidth = width - margin[1] - margin[3];
      const center = { x: left + innerWidth / 2, y: top + innerHeight / 2 };
      return { top, bottom, left, right, center, innerHeight, innerWidth };
    }, [width, height, margin]);
    const selectCellWithProgressPoint = useCallback(
      (progressPoint) => {
        const { r: r2, c } = getCellWithProgressPoint(progressPoint, focusedRow);
        selectCell(r2, c);
      },
      [selectCell, getCellWithProgressPoint, focusedRow]
    );
    const setValueWithProgressPoint = useCallback(
      (r2, c, progressPoint) => {
        setValue(r2, c, getValueWithProgressPoint(r2, c, progressPoint));
      },
      [setValue, getValueWithProgressPoint]
    );
    const setActiveCellValueWithProgressPoint = useCallback(
      (progressPoint) => {
        if (activeRow == null || activeColumn == null) {
          return;
        }
        setValueWithProgressPoint(activeRow, activeColumn, progressPoint);
      },
      [activeRow, activeColumn, setValueWithProgressPoint]
    );
    const chartContextValue = useMemo(
      () => ({
        width,
        height,
        margin,
        ...sizeValues,
        selectCellWithProgressPoint,
        setValueWithProgressPoint,
        setActiveCellValueWithProgressPoint
      }),
      [width, height, margin, sizeValues, selectCellWithProgressPoint, setValueWithProgressPoint, setActiveCellValueWithProgressPoint]
    );
    return /* @__PURE__ */ wp.element.createElement(ChartContext.Provider, { value: chartContextValue }, children);
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

  // node_modules-included/catpow/src/component/Chart/DataTable.tsx
  init_react();
  var DataTable = (props) => {
    const { className = "cp-datatabel", showColumnHeader = true, showRowHeader = true, ...otherProps } = props;
    const { labels, classNames, colors, values, focusedRow, getDisplayValue } = useContext(DataSetContext);
    return /* @__PURE__ */ wp.element.createElement(Bem, null, /* @__PURE__ */ wp.element.createElement("div", { className: clsx(className, { "has-focused": focusedRow != null }) }, /* @__PURE__ */ wp.element.createElement("table", null, showColumnHeader && labels.columns && /* @__PURE__ */ wp.element.createElement("thead", null, /* @__PURE__ */ wp.element.createElement("tr", null, showRowHeader && labels.rows && /* @__PURE__ */ wp.element.createElement("td", null), labels.columns.map((label) => /* @__PURE__ */ wp.element.createElement("th", null, label)))), /* @__PURE__ */ wp.element.createElement("tbody", null, values.map((row, r2) => /* @__PURE__ */ wp.element.createElement("tr", { className: clsx("_tr", classNames?.rows?.[r2], { "is-focused": r2 === focusedRow }) }, showRowHeader && labels.rows && /* @__PURE__ */ wp.element.createElement("th", null, labels.rows[r2]), row.map((v, c) => /* @__PURE__ */ wp.element.createElement("td", null, getDisplayValue(r2, c)))))))));
  };

  // node_modules-included/catpow/src/component/Chart/LineChart.tsx
  init_react();

  // node_modules-included/catpow/src/graphic/shape/shape.ts
  var pathCommands = {
    M: ({ x, y }) => ` M ${x} ${y}`,
    L: ({ x, y }) => ` L ${x} ${y}`,
    C: ({ x: x1, y: y1 }, { x: x2, y: y2 }, { x: x3, y: y3 }) => ` C ${x1},${y1} ${x2},${y2} ${x3},${y3}`,
    S: ({ x: x1, y: y1 }, { x: x2, y: y2 }) => ` S ${x1},${y1} ${x2},${y2}`,
    Q: ({ x: x1, y: y1 }, { x: x2, y: y2 }) => ` Q ${x1},${y1} ${x2},${y2}`,
    T: ({ x, y }) => ` T ${x},${y}`,
    A: ({ r: r2, rx, ry, rotation = 0, large = 0, sweep = 1, x, y }) => ` A ${rx ?? r2} ${ry ?? r2} ${rotation} ${large} ${sweep} ${x},${y}`
  };
  var shape = (points) => ({
    points,
    get d() {
      let d = "";
      for (let i = 0; i < this.points.length; ) {
        const { x, y, f = i === 0 ? "M" : "L" } = points[i];
        const fn = pathCommands[f];
        if (fn.length) {
          if (points.length < i + fn.length) {
            break;
          }
          d += fn.apply(null, points.slice(i, i + fn.length));
          i += fn.length;
        } else {
          d += ` ${x},${y}`;
          i++;
        }
      }
      return d;
    }
  });

  // node_modules-included/catpow/src/component/Chart/LineChart.tsx
  var LineChart = (props) => {
    const { className = "cp-linechart", children, ...otherProps } = props;
    const { width, height } = otherProps;
    const { values, steps: steps2 } = useContext(DataSetContext);
    const getValueWithProgressPoint = useCallback(
      (r2, c, { py }) => {
        return steps2.getValue(1 - py);
      },
      [steps2]
    );
    const getCellWithProgressPoint = useCallback(
      ({ px, py }, focusedRow) => {
        const c = Math.min(values[0].length - 1, Math.floor(values[0].length * px));
        if (focusedRow != null) {
          return { r: focusedRow, c };
        }
        let r2 = 0;
        let oy = 1 - py;
        let minD = Math.abs(steps2.getProgress(values[0][c]) - oy);
        for (let i = 1; i < values.length; i++) {
          const d = Math.abs(steps2.getProgress(values[i][c]) - oy);
          if (d < minD) {
            minD = d;
            r2 = i;
          }
        }
        return { r: r2, c };
      },
      [steps2, values]
    );
    return /* @__PURE__ */ wp.element.createElement(Chart, { getValueWithProgressPoint, getCellWithProgressPoint, ...otherProps }, /* @__PURE__ */ wp.element.createElement(Bem, null, /* @__PURE__ */ wp.element.createElement("div", { className, style: { position: "relative" } }, /* @__PURE__ */ wp.element.createElement(SVG2, { className: "_chart", width, height, style: { width: "100%", height: "auto" } }, /* @__PURE__ */ wp.element.createElement(Lines, { className: "_lines" }), /* @__PURE__ */ wp.element.createElement(Grid, { className: "_grid" })), children)));
  };
  var Grid = (props) => {
    const { className } = props;
    const { steps: steps2, values } = useContext(DataSetContext);
    const { width, height, margin } = useContext(ChartContext);
    const x1 = margin[3];
    const x2 = width - margin[3];
    const ux = (width - margin[1] - margin[3]) / values[0].length;
    const y1 = margin[0];
    const y2 = height - margin[0];
    const uy = (height - margin[0] - margin[2]) / (steps2.length - 1);
    return /* @__PURE__ */ wp.element.createElement(Bem, null, /* @__PURE__ */ wp.element.createElement("g", { className }, [...range(steps2.length - 1)].map((i) => /* @__PURE__ */ wp.element.createElement("line", { x1, y1: margin[0] + uy * i, x2, y2: margin[0] + uy * i, fill: "transparent", stroke: "lightgray" })), [...range(values[0].length)].map((i) => /* @__PURE__ */ wp.element.createElement("line", { x1: margin[3] + ux * i, y1, x2: margin[3] + ux * i, y2, fill: "transparent", stroke: "lightgray" }))));
  };
  var Lines = (props) => {
    const { className } = props;
    const { steps: steps2, values, colors, classNames, activeRow, focusedRow, activeColumn } = useContext(DataSetContext);
    const { width, height, margin } = useContext(ChartContext);
    const x1 = margin[3];
    const w = width - margin[1] - margin[3];
    const ux = w / values[0].length;
    const y2 = height - margin[0];
    const h = height - margin[0] - margin[2];
    const points = useMemo(() => values.map((row) => row.map((v, c) => ({ x: x1 + ux * (c + 0.5), y: y2 - steps2.getProgress(v) * h }))), [values]);
    return /* @__PURE__ */ wp.element.createElement(Bem, null, /* @__PURE__ */ wp.element.createElement("g", { className: clsx(className, { "has-focused": focusedRow != null }) }, points.map((row, r2) => /* @__PURE__ */ wp.element.createElement("g", { className: clsx("_line", classNames?.rows?.[r2], { "is-active": activeRow === r2, "is-focused": focusedRow === r2 }), style: { "--row-color": colors?.rows?.[r2] } }, /* @__PURE__ */ wp.element.createElement("path", { d: shape(row).d, fill: "transparent", stroke: colors?.rows?.[r2] || "gray" }), row.map((p, c) => /* @__PURE__ */ wp.element.createElement(
      "circle",
      {
        className: clsx("_circle", classNames?.columns?.[c], classNames?.cells?.[r2]?.[c], { "is-active": activeRow === r2 && activeColumn === c }),
        cx: p.x,
        cy: p.y,
        r: 4,
        fill: colors?.rows?.[r2] || "gray"
      }
    ))))));
  };

  // node_modules-included/catpow/src/component/Input/ChartInput.tsx
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
  var useLatest = function(value) {
    var ref = useRef(value);
    ref.current = value;
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

  // node_modules-included/catpow/src/component/Input/ChartInput.tsx
  var ChartInput = (props) => {
    const { className = "cp-chartinput", children, ...otherProps } = props;
    const [ref, state] = useScratch_default();
    const { unselectCell } = useContext(DataSetContext);
    const { width, height, margin, selectCellWithProgressPoint, setActiveCellValueWithProgressPoint } = useContext(ChartContext);
    const getProgressPoint = useCallback(
      ({ x = 0, y = 0, dx = 0, dy = 0, elW = 100, elH = 100 }) => ({
        px: Math.max(0, Math.min((x + dx) / elW * width / (width - margin[1] - margin[3]) - margin[3] / width, 1)),
        py: Math.max(0, Math.min((y + dy) / elH * height / (height - margin[0] - margin[2]) - margin[0] / height, 1))
      }),
      [width, height, margin]
    );
    useEffect(() => {
      if (state.isScratching) {
        selectCellWithProgressPoint(getProgressPoint(state));
      } else {
        unselectCell();
      }
    }, [state.isScratching]);
    useEffect(() => {
      if (state.isScratching) {
        setActiveCellValueWithProgressPoint(getProgressPoint(state));
      }
    }, [state]);
    return /* @__PURE__ */ wp.element.createElement(Bem, null, /* @__PURE__ */ wp.element.createElement("div", { className, style: { position: "absolute", inset: 0 }, ref }, children));
  };

  // node_modules-included/catpow/src/component/Input/LineChartInput.tsx
  var LineChartInput = (props) => {
    const { children, ...otherProps } = props;
    return /* @__PURE__ */ wp.element.createElement(LineChart, { ...otherProps }, /* @__PURE__ */ wp.element.createElement(ChartInput, null), children);
  };

  // node_modules-included/catpow/src/component/Bem.jsx
  init_react();
  var applyBem = (component, { ...ctx }) => {
    if (Array.isArray(component)) {
      component.forEach((child) => {
        applyBem(child, ctx);
      });
      return;
    }
    if (component?.props == null) {
      return;
    }
    if (component.type == react_default.Fragment) {
      applyBem(component.props.children, ctx);
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
        const matches = ctx.prefix && className.match(new RegExp(`\\b((${ctx.prefix.replaceAll("-", "\\-")})\\-[a-z]+(\\-[a-z]+)*)(__[a-z]+(\\-[a-z]+)*)?\\b`)) || className.match(/\b(([a-z]+)\-[a-z]+(\-[a-z]+)*)(__[a-z]+(\-[a-z]+)*)?\b/);
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
        applyBem(child, ctx);
      });
    } else {
      applyBem(children, ctx);
    }
  };
  var Bem = ({ prefix = "cp", block, element, children }) => {
    if (element == null && block != null) {
      element = block;
    }
    if (block == null && element != null) {
      block = element.split("__")[0];
    }
    const ctx = { prefix, block, element };
    applyBem(children, ctx);
    return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, children);
  };

  // node_modules-included/catpow/src/component/SVG/SVG.tsx
  init_react();
  var SVGColorsContext = createContext({ h: 20, s: 80, l: 80 });
  var SVGScreenContext = createContext({ width: 1200, height: 400, flex: false });
  var SVG2 = (props) => {
    const { className = "cp-svg", width = 1200, height = 400, colors = { h: 20, s: 80, l: 80 }, children, ...otherProps } = props;
    const ScreenValue = useMemo(() => ({ width, height, flex: false }), [width, height]);
    return /* @__PURE__ */ wp.element.createElement(SVGColorsContext.Provider, { value: colors }, /* @__PURE__ */ wp.element.createElement(SVGScreenContext.Provider, { value: ScreenValue }, /* @__PURE__ */ wp.element.createElement("svg", { className, width, height, viewBox: `0 0 ${width} ${height}`, xmlns: "http://www.w3.org/2000/svg", ...otherProps }, children)));
  };

  // ../components/Customize/LineHeight/component.jsx
  var extractLabels = (rolesByShorthand) => ({
    columns: Object.keys(rolesByShorthand).map((h) => rolesByShorthand[h].label)
  });
  var extractValues = (vars, rolesByShorthand) => {
    return [Object.keys(rolesByShorthand).map((h) => parseInt(vars[h]) || parseInt(rolesByShorthand[h].default))];
  };
  var convertToVars = (values, rolesByShorthand) => {
    return values[0].reduce((p, c, i) => ({ ...p, [Object.keys(rolesByShorthand)[i]]: c + "%" }), {});
  };
  var steps = {
    100: 0,
    125: 5,
    300: 25
  };
  var translateToDisplayValue = (value, { r: r2 }) => {
    return `${value}%`;
  };
  Catpow.Customize.LineHeight = (props) => {
    const {
      value: vars,
      onChange,
      param: { roles }
    } = props;
    const rolesByShorthand = useMemo(() => Object.values(roles).reduce((p, c) => ({ ...p, [c.shorthand]: c }), {}), [roles]);
    const labels = useMemo(() => extractLabels(rolesByShorthand), [rolesByShorthand]);
    const [values, setValues] = useState(extractValues(vars, rolesByShorthand));
    const onChangeValues = useCallback(
      (values2) => {
        setValues(values2);
        onChange(convertToVars(values2, rolesByShorthand));
      },
      [onChange, rolesByShorthand]
    );
    return /* @__PURE__ */ wp.element.createElement(Bem, null, /* @__PURE__ */ wp.element.createElement(DataSet, { values, labels, steps, onChange: onChangeValues, translateToDisplayValue }, /* @__PURE__ */ wp.element.createElement(LineChartInput, { width: 400, height: 120 }), /* @__PURE__ */ wp.element.createElement(DataTable, null)));
  };
})();
