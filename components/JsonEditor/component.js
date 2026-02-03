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
      for (let key2 of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key2) && key2 !== except)
          __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
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
      for (var i2 = 0, p = Object.getOwnPropertySymbols(s); i2 < p.length; i2++) {
        if (e.indexOf(p[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i2]))
          t[p[i2]] = s[p[i2]];
      }
    return t;
  }
  function __decorate(decorators, target, key2, desc) {
    var c = arguments.length, r2 = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key2) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r2 = Reflect.decorate(decorators, target, key2, desc);
    else for (var i2 = decorators.length - 1; i2 >= 0; i2--) if (d = decorators[i2]) r2 = (c < 3 ? d(r2) : c > 3 ? d(target, key2, r2) : d(target, key2)) || r2;
    return c > 3 && r2 && Object.defineProperty(target, key2, r2), r2;
  }
  function __param(paramIndex, decorator) {
    return function(target, key2) {
      decorator(target, key2, paramIndex);
    };
  }
  function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) {
      if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
      return f;
    }
    var kind = contextIn.kind, key2 = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i2 = decorators.length - 1; i2 >= 0; i2--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function(f) {
        if (done) throw new TypeError("Cannot add initializers after decoration has completed");
        extraInitializers.push(accept(f || null));
      };
      var result = (0, decorators[i2])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key2], context);
      if (kind === "accessor") {
        if (result === void 0) continue;
        if (result === null || typeof result !== "object") throw new TypeError("Object expected");
        if (_ = accept(result.get)) descriptor.get = _;
        if (_ = accept(result.set)) descriptor.set = _;
        if (_ = accept(result.init)) initializers.unshift(_);
      } else if (_ = accept(result)) {
        if (kind === "field") initializers.unshift(_);
        else descriptor[key2] = _;
      }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
  }
  function __runInitializers(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i2 = 0; i2 < initializers.length; i2++) {
      value = useValue ? initializers[i2].call(thisArg, value) : initializers[i2].call(thisArg);
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
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i2 = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
      next: function() {
        if (o && i2 >= o.length) o = void 0;
        return { value: o && o[i2++], done: !o };
      }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }
  function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i2 = m.call(o), r2, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r2 = i2.next()).done) ar.push(r2.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r2 && !r2.done && (m = i2["return"])) m.call(i2);
      } finally {
        if (e) throw e.error;
      }
    }
    return ar;
  }
  function __spread() {
    for (var ar = [], i2 = 0; i2 < arguments.length; i2++)
      ar = ar.concat(__read(arguments[i2]));
    return ar;
  }
  function __spreadArrays() {
    for (var s = 0, i2 = 0, il = arguments.length; i2 < il; i2++) s += arguments[i2].length;
    for (var r2 = Array(s), k = 0, i2 = 0; i2 < il; i2++)
      for (var a = arguments[i2], j = 0, jl = a.length; j < jl; j++, k++)
        r2[k] = a[j];
    return r2;
  }
  function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i2 = 0, l = from.length, ar; i2 < l; i2++) {
      if (ar || !(i2 in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i2);
        ar[i2] = from[i2];
      }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
  }
  function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
  }
  function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i2, q = [];
    return i2 = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i2[Symbol.asyncIterator] = function() {
      return this;
    }, i2;
    function awaitReturn(f) {
      return function(v) {
        return Promise.resolve(v).then(f, reject);
      };
    }
    function verb(n, f) {
      if (g[n]) {
        i2[n] = function(v) {
          return new Promise(function(a, b) {
            q.push([n, v, a, b]) > 1 || resume(n, v);
          });
        };
        if (f) i2[n] = f(i2[n]);
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
    var i2, p;
    return i2 = {}, verb("next"), verb("throw", function(e) {
      throw e;
    }), verb("return"), i2[Symbol.iterator] = function() {
      return this;
    }, i2;
    function verb(n, f) {
      i2[n] = o[n] ? function(v) {
        return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v;
      } : f;
    }
  }
  function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i2;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i2 = {}, verb("next"), verb("throw"), verb("return"), i2[Symbol.asyncIterator] = function() {
      return this;
    }, i2);
    function verb(n) {
      i2[n] = o[n] && function(v) {
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
      for (var k = ownKeys(mod), i2 = 0; i2 < k.length; i2++) if (k[i2] !== "default") __createBinding(result, mod, k[i2]);
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
          for (var s, i2 = 1, n = arguments.length; i2 < n; i2++) {
            s = arguments[i2];
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

  // react-global:react-dom
  var react_dom_default, createPortal, flushSync;
  var init_react_dom = __esm({
    "react-global:react-dom"() {
      react_dom_default = window.wp.element;
      createPortal = wp.element.createPortal;
      flushSync = wp.element.flushSync;
    }
  });

  // node_modules-included/catpow/src/util/array/phasedRange.js
  var phasedRange = function* (steps) {
    let i2 = 0;
    for (let t of Object.keys(steps).sort((a, b) => a - b)) {
      let step = parseFloat(steps[t]);
      let end = parseFloat(t);
      if (step > 0) {
        for (; i2 < end; i2 += step) {
          yield i2;
        }
      }
      i2 = end;
    }
    yield i2;
  };

  // node_modules-included/catpow/src/util/array/range.js
  var range = function* (start, end, step = 1) {
    if (arguments.length === 1) {
      end = start;
      start = 0;
    }
    for (let i2 = start; i2 <= end; i2 += step) {
      yield i2;
    }
  };

  // node_modules-included/catpow/src/util/array/rangeValueConverter.ts
  var RANGE_CONVERTER = Symbol.for("RangeValueConverterApp");
  var rangeValueConverter = function(rawValues, snap = false) {
    if (isRangeValueConverterApp(rawValues)) {
      return rawValues;
    }
    let values;
    if (!Array.isArray(rawValues)) {
      values = [...(typeof rawValues === "number" ? range : phasedRange)(rawValues)];
    } else {
      values = rawValues;
    }
    const len = values.length;
    const lastIndex = len - 1;
    return {
      [RANGE_CONVERTER]: true,
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
  var isRangeValueConverterApp = (maybeApp) => Boolean(maybeApp?.[RANGE_CONVERTER]);

  // node_modules-included/catpow/src/util/bem/bem.js
  var bem2 = (className) => {
    const children = {};
    const firstClass = className.split(" ")[0];
    return new Proxy(
      function() {
        if (arguments.length > 0) {
          const classes = [];
          let i2;
          for (i2 = 0; i2 < arguments.length; i2++) {
            if (!arguments[i2]) {
              continue;
            }
            if (typeof arguments[i2] === "string") {
              classes.push(arguments[i2]);
              continue;
            }
            classes.push.apply(classes, Array.isArray(arguments[i2]) ? arguments[i2] : Object.keys(arguments[i2]).filter((c) => arguments[i2][c]));
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
            children[prop] = bem2(firstClass + (prop[0] === "_" ? "_" : "-") + prop);
          }
          return children[prop];
        }
      }
    );
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

  // node_modules-included/catpow/src/component/Input/AngleInput.jsx
  init_react();

  // node_modules/react-use/esm/useMountedState.js
  init_react();
  function useMountedState() {
    var mountedRef = useRef(false);
    var get = useCallback(function() {
      return mountedRef.current;
    }, []);
    useEffect(function() {
      mountedRef.current = true;
      return function() {
        mountedRef.current = false;
      };
    }, []);
    return get;
  }

  // node_modules/react-use/esm/useSetState.js
  init_react();
  var useSetState = function(initialState) {
    if (initialState === void 0) {
      initialState = {};
    }
    var _a = useState(initialState), state = _a[0], set = _a[1];
    var setState = useCallback(function(patch) {
      set(function(prevState) {
        return Object.assign({}, prevState, patch instanceof Function ? patch(prevState) : patch);
      });
    }, []);
    return [state, setState];
  };
  var useSetState_default = useSetState;

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
  var isBrowser = typeof window !== "undefined";

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
      var onMouseMove = function(event2) {
        onMoveEvent(event2.pageX, event2.pageY);
      };
      var onTouchMove = function(event2) {
        onMoveEvent(event2.changedTouches[0].pageX, event2.changedTouches[0].pageY);
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
      var onMouseDown = function(event2) {
        refScratching.current = true;
        startScratching(event2.pageX, event2.pageY);
      };
      var onTouchStart = function(event2) {
        refScratching.current = true;
        startScratching(event2.changedTouches[0].pageX, event2.changedTouches[0].pageY);
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

  // node_modules/react-use/esm/useSlider.js
  init_react();
  var useSlider = function(ref, options) {
    if (options === void 0) {
      options = {};
    }
    var isMounted = useMountedState();
    var isSliding = useRef(false);
    var valueRef = useRef(0);
    var frame = useRef(0);
    var _a = useSetState_default({
      isSliding: false,
      value: 0
    }), state = _a[0], setState = _a[1];
    valueRef.current = state.value;
    useEffect(function() {
      if (isBrowser) {
        var styles = options.styles === void 0 ? true : options.styles;
        var reverse_1 = options.reverse === void 0 ? false : options.reverse;
        if (ref.current && styles) {
          ref.current.style.userSelect = "none";
        }
        var startScrubbing_1 = function() {
          if (!isSliding.current && isMounted()) {
            (options.onScrubStart || noop)();
            isSliding.current = true;
            setState({ isSliding: true });
            bindEvents_1();
          }
        };
        var stopScrubbing_1 = function() {
          if (isSliding.current && isMounted()) {
            (options.onScrubStop || noop)(valueRef.current);
            isSliding.current = false;
            setState({ isSliding: false });
            unbindEvents_1();
          }
        };
        var onMouseDown_1 = function(event2) {
          startScrubbing_1();
          onMouseMove_1(event2);
        };
        var onMouseMove_1 = options.vertical ? function(event2) {
          return onScrub_1(event2.clientY);
        } : function(event2) {
          return onScrub_1(event2.clientX);
        };
        var onTouchStart_1 = function(event2) {
          startScrubbing_1();
          onTouchMove_1(event2);
        };
        var onTouchMove_1 = options.vertical ? function(event2) {
          return onScrub_1(event2.changedTouches[0].clientY);
        } : function(event2) {
          return onScrub_1(event2.changedTouches[0].clientX);
        };
        var bindEvents_1 = function() {
          on(document, "mousemove", onMouseMove_1);
          on(document, "mouseup", stopScrubbing_1);
          on(document, "touchmove", onTouchMove_1);
          on(document, "touchend", stopScrubbing_1);
        };
        var unbindEvents_1 = function() {
          off(document, "mousemove", onMouseMove_1);
          off(document, "mouseup", stopScrubbing_1);
          off(document, "touchmove", onTouchMove_1);
          off(document, "touchend", stopScrubbing_1);
        };
        var onScrub_1 = function(clientXY) {
          cancelAnimationFrame(frame.current);
          frame.current = requestAnimationFrame(function() {
            if (isMounted() && ref.current) {
              var rect = ref.current.getBoundingClientRect();
              var pos = options.vertical ? rect.top : rect.left;
              var length_1 = options.vertical ? rect.height : rect.width;
              if (!length_1) {
                return;
              }
              var value = (clientXY - pos) / length_1;
              if (value > 1) {
                value = 1;
              } else if (value < 0) {
                value = 0;
              }
              if (reverse_1) {
                value = 1 - value;
              }
              setState({
                value
              });
              (options.onScrub || noop)(value);
            }
          });
        };
        on(ref.current, "mousedown", onMouseDown_1);
        on(ref.current, "touchstart", onTouchStart_1);
        return function() {
          off(ref.current, "mousedown", onMouseDown_1);
          off(ref.current, "touchstart", onTouchStart_1);
        };
      } else {
        return void 0;
      }
    }, [ref, options.vertical]);
    return state;
  };
  var useSlider_default = useSlider;

  // node_modules-included/catpow/src/hooks/useThrottle.jsx
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

  // node_modules-included/catpow/src/component/Input/AngleInput.jsx
  var AngleInput = (props) => {
    const { className = "cp-angleinput", step = 15, snap = false, showInputs = false, value: originalValue, order = [], onChange, children, ...otherProps } = props;
    const [ref, state] = useScratch_default();
    const [value, setValue] = useState(originalValue);
    useEffect(() => {
      const { x, y, dx, dy, elW, elH } = state;
      if (isNaN(dx) || isNaN(dy)) {
        return;
      }
      setValue(Math.round(Math.atan2(elW / 2 - (x + dx), y + dy - elH / 2) / Math.PI * 180 / step) * step + 180);
    }, [state.dx, state.dy]);
    useThrottle(
      () => {
        console.log({ originalValue, value });
        onChange(value);
      },
      50,
      [value]
    );
    return /* @__PURE__ */ wp.element.createElement(Bem, null, /* @__PURE__ */ wp.element.createElement("div", { className, style: { "--angle": value } }, /* @__PURE__ */ wp.element.createElement("div", { className: "_circle", ref }, /* @__PURE__ */ wp.element.createElement("div", { className: "_handler" })), showInputs && /* @__PURE__ */ wp.element.createElement("div", { className: "_inputs" }, /* @__PURE__ */ wp.element.createElement("input", { type: "number", value, className: "_input", min: 0, max: 360, step, onChange: (e) => setValue(e.target.value) }))));
  };

  // node_modules-included/catpow/src/component/Input/ArrayInput.jsx
  init_react();
  var ArrayInput = (props) => {
    const { className = "cp-arrayinput", items, onAddItem, onCopyItem, onMoveItem, onRemoveItem, onChange, children } = props;
    const Item = useMemo(() => {
      return forwardRef((props2, ref) => {
        const { className: className2, index, length, children: children2 } = props2;
        return /* @__PURE__ */ wp.element.createElement(Bem, null, /* @__PURE__ */ wp.element.createElement("li", { className: className2 }, /* @__PURE__ */ wp.element.createElement("div", { className: "_body" }, children2), /* @__PURE__ */ wp.element.createElement("div", { className: "_controls" }, index > 0 ? /* @__PURE__ */ wp.element.createElement("div", { className: clsx_default("_button", "is-up"), onClick: () => onMoveItem(index, index - 1) }) : /* @__PURE__ */ wp.element.createElement("div", { className: "_spacer" }), index < length - 1 ? /* @__PURE__ */ wp.element.createElement("div", { className: clsx_default("_button", "is-down"), onClick: () => onMoveItem(index, index + 1) }) : /* @__PURE__ */ wp.element.createElement("div", { className: "_spacer" }), length > 1 ? /* @__PURE__ */ wp.element.createElement("div", { className: clsx_default("_button", "is-remove"), onClick: () => onRemoveItem(index) }) : /* @__PURE__ */ wp.element.createElement("div", { className: "_spacer" }), /* @__PURE__ */ wp.element.createElement("div", { className: clsx_default("_button", "is-add"), onClick: () => onAddItem(index + 1) }))));
      });
    }, [onAddItem, onCopyItem, onMoveItem, onRemoveItem, onChange]);
    return /* @__PURE__ */ wp.element.createElement(Bem, null, /* @__PURE__ */ wp.element.createElement("div", { className }, /* @__PURE__ */ wp.element.createElement("ul", { className: "_items" }, children.map((child, index) => /* @__PURE__ */ wp.element.createElement(Item, { className: "_item", index, length: children.length, key: index }, child)))));
  };

  // node_modules-included/catpow/src/component/Input/CheckBox.jsx
  var CheckBox = (props) => {
    const { className = "cp-checkbox", label, onChange } = props;
    const selected = props.selected || props.value;
    if (label) {
      return /* @__PURE__ */ wp.element.createElement(Bem, null, /* @__PURE__ */ wp.element.createElement(
        "div",
        {
          className: clsx_default(className, { "is-selected": selected }),
          onClick: (e) => {
            onChange(!selected);
          },
          role: "checkbox",
          "aria-checked": selected
        },
        /* @__PURE__ */ wp.element.createElement("span", { className: "_icon" }, " "),
        /* @__PURE__ */ wp.element.createElement("span", { className: "_label" }, label)
      ));
    }
    return /* @__PURE__ */ wp.element.createElement(Bem, { element: className }, /* @__PURE__ */ wp.element.createElement(
      "div",
      {
        className: clsx_default("_icon", { "is-selected": selected }),
        onClick: (e) => {
          onChange(!selected);
        },
        role: "checkbox",
        "aria-checked": selected
      },
      " "
    ));
  };

  // node_modules-included/catpow/src/component/Input/CheckBoxes.jsx
  init_react();
  var CheckBoxes = (props) => {
    const { className = "cp-checkboxes", value = [], onChange } = props;
    const options = useMemo(() => {
      if (Array.isArray(props.options)) {
        return props.options.map((option) => {
          if (typeof option === "object") {
            return option;
          }
          return { label: option, value: option };
        });
      }
      return Object.keys(props.options).map((label) => {
        return { label, value: props.options[label] };
      });
    }, [props.options]);
    if (Array.isArray(value)) {
      const flags = {};
      value.map((val) => flags[val] = true);
      return /* @__PURE__ */ wp.element.createElement("div", { className }, options.map((option) => /* @__PURE__ */ wp.element.createElement(
        CheckBox,
        {
          label: option.label,
          onChange: (selected) => {
            if (selected) {
              flags[option.value] = true;
            } else {
              delete flags[option.value];
            }
            onChange(Object.keys(flags));
          },
          selected: flags[option.value],
          key: option.label
        }
      )));
    }
    return /* @__PURE__ */ wp.element.createElement("div", { className }, options.map((option) => /* @__PURE__ */ wp.element.createElement(
      CheckBox,
      {
        label: option.label,
        onChange: (selected) => {
          value[option.value] = selected;
          onChange(option.value, selected, value);
        },
        selected: value[option.value],
        key: option.label
      }
    )));
  };

  // node_modules-included/catpow/src/component/Input/InputDuration.jsx
  init_react();
  var InputDuration = (props) => {
    const { className = "cp-inputduration", value, onChange } = props;
    const cols = useMemo(() => {
      return {
        y: { unit: "\u5E74", min: 1, max: 100 },
        m: { unit: "\u6708", min: 1, max: 11 },
        d: { unit: "\u65E5", min: 1, max: 31 },
        h: { unit: "\u6642\u9593", min: 1, max: 23 },
        i: { unit: "\u5206", min: 1, max: 59 },
        s: { unit: "\u79D2", min: 1, max: 59 }
      };
    }, []);
    const init = useCallback((state2) => {
      state2.value = props.value || "";
      return state2;
    }, []);
    const reducer = useCallback((state2, action) => {
      const newState = Object.assign({}, state2, action);
      let value2 = "P";
      if (newState.y) {
        value2 += newState.y + "Y";
      }
      if (newState.m) {
        value2 += newState.m + "M";
      }
      if (newState.d) {
        value2 += newState.d + "D";
      }
      if (newState.h || newState.i || newState.s) {
        value2 += "T";
        if (newState.h) {
          value2 += newState.h + "H";
        }
        if (newState.i) {
          value2 += newState.i + "M";
        }
        if (newState.s) {
          value2 += newState.s + "S";
        }
      }
      newState.value = value2 === "P" ? "" : value2;
      return newState;
    }, []);
    const [state, update] = useReducer(reducer, {}, init);
    useEffect(() => {
      if (state.value || props.value) {
        onChange(state.value);
      }
    }, [onChange, state.value]);
    return /* @__PURE__ */ wp.element.createElement(Bem, null, /* @__PURE__ */ wp.element.createElement("div", { className }, Object.keys(cols).map((key2) => {
      return /* @__PURE__ */ wp.element.createElement("div", { className: clsx_default("_col", "is-col-" + key2), key: key2 }, /* @__PURE__ */ wp.element.createElement("input", { type: "number", className: clsx_default("_input", "is-input-" + key2), min: cols[key2].min, max: cols[key2].max, onChange: (e) => update({ [key2]: e.currentTarget.value }) }), /* @__PURE__ */ wp.element.createElement("span", { className: "_unit" }, cols[key2].unit));
    })));
  };

  // node_modules-included/catpow/src/component/Input/PositionInput.jsx
  init_react();
  var PositionInput = (props) => {
    const {
      className = "cp-positioninput",
      width = 100,
      height = 100,
      margin = 10,
      grid = 10,
      snap = false,
      value: { x = 50, y = 50 },
      r: r2 = 6,
      onChange,
      ...otherProps
    } = props;
    const [ref, state] = useScratch_default();
    const [pos, setPos] = useState({ x, y });
    useThrottle(() => onChange({ x: pos.x, y: pos.y }), 50, [pos.x, pos.y]);
    useEffect(() => {
      if (!state.isScratching) {
        return;
      }
      let x2 = parseInt(Math.max(0, Math.min(state.x + state.dx - margin, width)));
      let y2 = parseInt(Math.max(0, Math.min(state.y + state.dy - margin, height)));
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
        width: width + margin * 2,
        height: height + margin * 2,
        viewBox: `0 0 ${width + margin * 2} ${height + margin * 2}`,
        xmlns: "http://www.w3.org/2000/svg",
        ref,
        style: { cursor: state.isScratching ? "grabbing" : "grab" },
        ...otherProps
      },
      /* @__PURE__ */ wp.element.createElement("rect", { className: "_bg", x: margin, y: margin, width, height, fill: "none", stroke: "currentColor", strokeOpacity: 0.5 }),
      /* @__PURE__ */ wp.element.createElement("circle", { fill: "none", stroke: "currentColor", strokeOpacity: 0.75, className: "_circle", cx: pos.x + margin, cy: pos.y + margin, r: r2 }),
      /* @__PURE__ */ wp.element.createElement("circle", { fill: "currentColor", className: "_dot", cx: pos.x + margin, cy: pos.y + margin, r: 2 }),
      grid > 0 && /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, Array.from({ length: Math.floor(width / grid) }, (_, i2) => /* @__PURE__ */ wp.element.createElement("line", { key: i2, stroke: "currentColor", strokeOpacity: 0.1, className: "_grid", x1: i2 * grid + margin, y1: margin, x2: i2 * grid + margin, y2: height + margin })), Array.from({ length: Math.floor(height / grid) }, (_, i2) => /* @__PURE__ */ wp.element.createElement("line", { key: i2, stroke: "currentColor", strokeOpacity: 0.1, className: "_grid", x1: margin, y1: i2 * grid + margin, x2: width + margin, y2: i2 * grid + margin })), /* @__PURE__ */ wp.element.createElement("line", { stroke: "currentColor", strokeOpacity: 0.2, className: "_grid is-center", x1: width / 2 + margin, y1: margin, x2: width / 2 + margin, y2: height + margin }), /* @__PURE__ */ wp.element.createElement("line", { stroke: "currentColor", strokeOpacity: 0.2, className: "_grid is-center", x1: margin, y1: height / 2 + margin, x2: width + margin, y2: height / 2 + margin }))
    ));
  };

  // node_modules-included/catpow/src/component/Input/RadioButtons.jsx
  init_react();
  var RadioButtons = (props) => {
    const { className = "cp-radiobuttons", size = "medium", onChange } = props;
    const [value, setValue] = useState(props.value ?? null);
    const options = useMemo(() => {
      if (Array.isArray(props.options)) {
        return props.options.map((option) => {
          if (typeof option === "object") {
            return option;
          }
          return { label: option, value: option };
        });
      }
      return Object.keys(props.options).map((label) => {
        return { label, value: props.options[label] };
      });
    }, [props.options]);
    return /* @__PURE__ */ wp.element.createElement(Bem, null, /* @__PURE__ */ wp.element.createElement("div", { className: clsx_default(className, `is-size-${size}`) }, options.map((option) => {
      const selected = option.value === value;
      return /* @__PURE__ */ wp.element.createElement(
        "div",
        {
          className: clsx_default("_button", { "is-selected": selected }),
          onClick: (e) => {
            setValue(option.value);
            onChange(option.value);
          },
          role: "checkbox",
          "aria-checked": selected,
          key: option.label
        },
        /* @__PURE__ */ wp.element.createElement("span", { className: "_icon" }, " "),
        /* @__PURE__ */ wp.element.createElement("span", { className: "_label" }, option.label)
      );
    })));
  };

  // node_modules-included/catpow/src/component/Input/RangeInput.jsx
  init_react();
  var RangeInputContext = createContext({});
  var RangeInput = (props) => {
    const { className = "cp-rangeinput", steps = { 100: 1 }, snap = false, showInputs = false, values = { value: props.value }, order = [], onChange, children, ...otherProps } = props;
    const ref = useRef(null);
    const { isSliding, value } = useSlider_default(ref);
    const [isStart, setIsStart] = useState(false);
    const [targetName, setTargetName] = useState(false);
    const cnv = useMemo(() => rangeValueConverter(steps, snap), [steps]);
    const { gt, lt } = useMemo(() => {
      const orderMap = { gt: {}, lt: {} };
      for (let i2 = 1; i2 < order.length; i2++) {
        orderMap.lt[order[i2 - 1]] = order[i2];
        orderMap.gt[order[i2]] = order[i2 - 1];
      }
      return orderMap;
    }, [order]);
    const onChageCallback = useCallback(
      (key2, val) => {
        if (gt[key2] != null) {
          val = Math.max(val, values[gt[key2]]);
        }
        if (lt[key2] != null) {
          val = Math.min(val, values[lt[key2]]);
        }
        onChange({ ...values, [key2]: val });
      },
      [values, gt, lt, onChange]
    );
    useEffect(() => {
      if (!isSliding) {
        setTargetName(false);
      }
      setIsStart(isSliding);
    }, [isSliding]);
    useThrottle(
      () => {
        if (isStart) {
          setTargetName(
            Object.keys(values).reduce((p, c) => {
              if (p === null || Math.abs(cnv.getProgress(values[c]) - value) < Math.abs(cnv.getProgress(values[p]) - value)) {
                return c;
              }
              return p;
            }, null)
          );
          setIsStart(false);
        }
        if (targetName && onChange) {
          onChageCallback(targetName, cnv.getValue(value));
        }
      },
      50,
      [value]
    );
    return /* @__PURE__ */ wp.element.createElement(RangeInputContext.Provider, { value: { values } }, /* @__PURE__ */ wp.element.createElement(Bem, null, /* @__PURE__ */ wp.element.createElement("div", { className, style: Object.keys(values).reduce((p, c) => ({ ...p, ["--pos-" + c]: cnv.getProgress(values[c]) }), {}) }, /* @__PURE__ */ wp.element.createElement("div", { className: "_bar" }, /* @__PURE__ */ wp.element.createElement("div", { className: "_body", ref }, Object.keys(values).map((name) => {
      return /* @__PURE__ */ wp.element.createElement("div", { className: clsx_default("_control", `is-control-${name}`), style: { "--pos": cnv.getProgress(values[name]) } }, /* @__PURE__ */ wp.element.createElement("div", { className: "_value" }, values[name]));
    }))), showInputs && /* @__PURE__ */ wp.element.createElement("div", { className: "_inputs" }, Object.keys(values).map((name) => {
      return /* @__PURE__ */ wp.element.createElement("div", { className: clsx_default("_item", `is-input-${name}`) }, /* @__PURE__ */ wp.element.createElement("input", { type: "number", value: values[name], className: "_input", onChange: (e) => onChageCallback(name, e.target.value) }));
    })))));
  };

  // node_modules-included/catpow/src/component/Input/SearchSelect.jsx
  init_react();
  var SearchSelect = (props) => {
    const { className = "cp-searchselect", defaultLabel = "\u2500", onChange, col = 5, multiple = true, placeholder = "Search" } = props;
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const cache3 = useRef({});
    const { labelValueMap, valueLabelMap } = useMemo(() => {
      const labelValueMap2 = {};
      const valueLabelMap2 = {};
      const cb = (options) => {
        if (Array.isArray(options)) {
          options.forEach((val) => {
            if (typeof val === "object") {
              cb(val);
            } else {
              labelValueMap2[val] = val;
              valueLabelMap2[val] = val;
            }
          });
        } else {
          Object.keys(options).forEach((key2) => {
            if (typeof options[key2] === "object") {
              cb(options[key2]);
            } else {
              labelValueMap2[key2] = options[key2];
              valueLabelMap2[options[key2]] = key2;
            }
          });
        }
      };
      cb(props.options);
      return { labelValueMap: labelValueMap2, valueLabelMap: valueLabelMap2 };
    }, [props.options]);
    const toggleLabelReducer = useCallback((selectedLabels2, labelToToggle) => {
      if (!selectedLabels2) {
        return [labelToToggle];
      }
      if (multiple) {
        if (selectedLabels2.includes(labelToToggle)) {
          return selectedLabels2.filter((val) => val !== labelToToggle);
        }
        return [...selectedLabels2, labelToToggle];
      } else {
        if (selectedLabels2.includes(labelToToggle)) {
          return [];
        }
        return [labelToToggle];
      }
    }, []);
    const [selectedLabels, toggleLabel] = useReducer(
      toggleLabelReducer,
      useMemo(() => props.value ? props.value.map((value) => valueLabelMap[value]) : [], [])
    );
    useEffect(() => {
      if (multiple) {
        onChange(selectedLabels.map((label) => labelValueMap[label]));
      } else {
        onChange(selectedLabels.length ? labelValueMap[selectedLabels[0]] : null);
      }
    }, [selectedLabels]);
    const getLabelsForSearch = useCallback(
      (search2) => {
        if (cache3.current[search2]) {
          return cache3.current[search2];
        }
        const labels = search2.length > 2 ? getLabelsForSearch(search2.slice(0, -1)) : Object.keys(labelValueMap);
        return cache3.current[search2] = search2 ? labels.filter((label) => label.indexOf(search2) >= 0) : labels;
      },
      [cache3, labelValueMap]
    );
    const currentLabels = useMemo(() => getLabelsForSearch(search), [getLabelsForSearch, search]);
    return /* @__PURE__ */ wp.element.createElement(Bem, null, /* @__PURE__ */ wp.element.createElement("div", { className }, /* @__PURE__ */ wp.element.createElement("div", { className: "_selected", onClick: () => setOpen(true) }, /* @__PURE__ */ wp.element.createElement("ul", { className: "_items" }, selectedLabels && selectedLabels.length ? selectedLabels.map((label) => /* @__PURE__ */ wp.element.createElement("li", { className: "_item", key: label }, label, /* @__PURE__ */ wp.element.createElement("span", { className: "_button", onClick: () => toggleLabel(label) }))) : /* @__PURE__ */ wp.element.createElement("li", { className: "_item" }, defaultLabel))), /* @__PURE__ */ wp.element.createElement(Popup, { open, onClose: () => open && setOpen(false) }, /* @__PURE__ */ wp.element.createElement(Bem, { element: className }, /* @__PURE__ */ wp.element.createElement("div", { className: "_header" }, /* @__PURE__ */ wp.element.createElement("div", { className: "_selected" }, /* @__PURE__ */ wp.element.createElement("ul", { className: "_items" }, selectedLabels && selectedLabels.length > 0 && selectedLabels.map((label) => /* @__PURE__ */ wp.element.createElement("li", { className: "_item", key: label }, label, /* @__PURE__ */ wp.element.createElement("span", { className: "_button", onClick: () => toggleLabel(label) }))))), /* @__PURE__ */ wp.element.createElement("div", { className: "_search" }, /* @__PURE__ */ wp.element.createElement("input", { type: "text", className: "_input", value: search, placeholder, onChange: (e) => setSearch(e.currentTarget.value) }))), /* @__PURE__ */ wp.element.createElement("div", { className: "_body" }, /* @__PURE__ */ wp.element.createElement("div", { className: "_selections" }, /* @__PURE__ */ wp.element.createElement(SelectTable, { selections: currentLabels, value: selectedLabels, multiple, col, onChange: toggleLabel })))))));
  };

  // node_modules-included/catpow/src/component/Input/SelectBox.jsx
  init_react();
  var SelectBox = (props) => {
    const { className = "cp-selectbox", label, value, onChange } = props;
    const options = useMemo(() => {
      if (Array.isArray(props.options)) {
        return props.options.map((option) => {
          if (typeof option === "object") {
            return option;
          }
          return { label: option, value: option };
        });
      }
      return Object.keys(props.options).map((label2) => {
        return { label: label2, value: props.options[label2] };
      });
    }, [props.options]);
    return /* @__PURE__ */ wp.element.createElement(Bem, null, /* @__PURE__ */ wp.element.createElement("div", { className }, /* @__PURE__ */ wp.element.createElement("select", { className: "_select", value, onChange: (e) => onChange(event.target.value) }, label && /* @__PURE__ */ wp.element.createElement("option", { value: false }, label), options.map((option) => /* @__PURE__ */ wp.element.createElement("option", { value: option.value, key: option.label }, option.label)))));
  };

  // node_modules-included/catpow/src/component/Input/SelectTable.jsx
  init_react();
  var SelectTable = (props) => {
    const { className = "cp-selecttable", selections, value, onChange, spacer = 0, col = 5, multipe = false } = props;
    var i2, items, values, fontSize, rows = [];
    const itemClassName = className + "__tbody-tr-td";
    const isActiveValue = useCallback(
      (val) => {
        if (Array.isArray(value)) {
          return value.includes(val);
        }
        return value === val;
      },
      [value]
    );
    if (Array.isArray(selections)) {
      items = selections.map((val) => /* @__PURE__ */ wp.element.createElement(
        "td",
        {
          className: clsx_default(itemClassName, { "is-active": isActiveValue(val) }),
          onClick: () => {
            onChange(val);
          },
          key: val
        },
        val
      ));
    } else {
      items = Object.keys(selections).map((key2) => /* @__PURE__ */ wp.element.createElement(
        "td",
        {
          className: clsx_default(itemClassName, { "is-active": isActiveValue(selections[key2]) }),
          onClick: () => {
            onChange(selections[key2]);
          },
          key: key2
        },
        key2
      ));
    }
    const allLabels = useMemo(() => Array.isArray(selections) ? selections : Object.keys(selections), [selections]);
    const fontSizeClass = useMemo(() => {
      const fontSize2 = (360 / col - 5) / Math.max(...allLabels.map((label) => label.toString().length));
      if (fontSize2 > 20) {
        return "hasLargeFontSize";
      }
      if (fontSize2 > 10) {
        return "hasRegularFontSize";
      }
      return "hasSmallFontSize";
    }, [col, allLabels]);
    for (i2 = 0; i2 < spacer; i2++) {
      items.unshift(/* @__PURE__ */ wp.element.createElement("td", { className: "spacer", key: `start-spacer-${i2}` }));
    }
    for (i2 = (col - items.length % col) % col; i2 > 0; i2--) {
      items.push(/* @__PURE__ */ wp.element.createElement("td", { className: "spacer", key: `end-spacer-${i2}` }));
    }
    for (i2 = 0; i2 < items.length; i2 += col) {
      rows.push(items.slice(i2, i2 + col));
    }
    return /* @__PURE__ */ wp.element.createElement(Bem, null, /* @__PURE__ */ wp.element.createElement("table", { className: clsx_default(className, fontSizeClass) }, /* @__PURE__ */ wp.element.createElement("tbody", null, rows.map((row, index) => /* @__PURE__ */ wp.element.createElement("tr", { key: index }, row)))));
  };

  // node_modules-included/catpow/src/component/Input/StepSelect.jsx
  init_react();
  var StepSelect = (props) => {
    const { className = "cp-stepselect", defaultLabel = "\u2500", onChange, multiple = true } = props;
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const cache3 = useRef({});
    const { rootItem, valueItemMap } = useMemo(() => {
      const rootItem2 = {};
      const valueItemMap2 = {};
      const cb = (options, parent) => {
        const items = [];
        if (Array.isArray(options)) {
          options.forEach((value) => {
            const item = { label: value, value, parent };
            valueItemMap2[value] = item;
            items.push(item);
          });
        } else {
          Object.keys(options).forEach((label) => {
            const item = { label, parent };
            if (typeof options[label] === "object") {
              item.options = cb(options[label], item);
            } else {
              item.value = options[label];
              valueItemMap2[options[label]] = item;
            }
            items.push(item);
          });
        }
        return items;
      };
      rootItem2.options = cb(props.options, rootItem2);
      return { rootItem: rootItem2, valueItemMap: valueItemMap2 };
    }, [props.options]);
    const init = useCallback((state2) => {
      state2.selectedItems = props.value ? props.value.map((value) => valueItemMap[value]) : [];
      state2.activeItems = [rootItem];
      return state2;
    }, []);
    const toggleItemReducer = useCallback((state2, itemToToggle) => {
      const { selectedItems, activeItems } = state2;
      const newState = { ...state2 };
      if (activeItems.includes(itemToToggle)) {
        newState.activeItems = activeItems.slice(0, activeItems.indexOf(itemToToggle));
      } else {
        newState.activeItems = [];
        let currentItem = itemToToggle;
        while (currentItem) {
          if (currentItem.options != null) {
            newState.activeItems.unshift(currentItem);
          }
          currentItem = currentItem.parent;
        }
      }
      if (activeItems.some((activeItem) => activeItem.options && activeItem.options.includes(itemToToggle))) {
        if (itemToToggle.hasOwnProperty("value")) {
          if (multiple) {
            if (selectedItems.includes(itemToToggle)) {
              newState.selectedItems = selectedItems.filter((item) => item !== itemToToggle);
            } else {
              newState.selectedItems = [...selectedItems, itemToToggle];
            }
          } else {
            newState.selectedItems = selectedItems.includes(itemToToggle) ? [] : [itemToToggle];
          }
        }
      }
      return newState;
    }, []);
    const [state, toggleItem] = useReducer(toggleItemReducer, {}, init);
    useEffect(() => {
      if (multiple) {
        onChange(state.selectedItems.map((item) => item.value));
      } else {
        onChange(state.selectedItems.length ? state.selectedItems[0].value : null);
      }
    }, [state.selectedItems]);
    return /* @__PURE__ */ wp.element.createElement(Bem, null, /* @__PURE__ */ wp.element.createElement("div", { className }, /* @__PURE__ */ wp.element.createElement("div", { className: "_selected", onClick: () => setOpen(true) }, /* @__PURE__ */ wp.element.createElement("ul", { className: "_items" }, state.selectedItems && state.selectedItems.length ? state.selectedItems.map((item) => /* @__PURE__ */ wp.element.createElement("li", { className: "_item", onClick: () => toggleItem(item), key: item.value }, item.label, /* @__PURE__ */ wp.element.createElement("span", { className: "_button" }))) : /* @__PURE__ */ wp.element.createElement("li", { className: "_item" }, defaultLabel))), /* @__PURE__ */ wp.element.createElement(Popup, { open, onClose: () => open && setOpen(false) }, /* @__PURE__ */ wp.element.createElement(Bem, { element: className }, /* @__PURE__ */ wp.element.createElement("div", { className: "_header" }, /* @__PURE__ */ wp.element.createElement("div", { className: "_selected", onClick: () => setOpen(true) }, /* @__PURE__ */ wp.element.createElement("ul", { className: "_items" }, state.selectedItems && state.selectedItems.length ? state.selectedItems.map((item) => /* @__PURE__ */ wp.element.createElement("li", { className: "_item", onClick: () => toggleItem(item), key: item.value }, item.label, /* @__PURE__ */ wp.element.createElement("span", { className: "_button" }))) : false))), /* @__PURE__ */ wp.element.createElement("div", { className: "_body" }, /* @__PURE__ */ wp.element.createElement("div", { className: "_selections" }, state.activeItems.map((activeItem, index) => /* @__PURE__ */ wp.element.createElement("div", { className: "_options", key: index }, /* @__PURE__ */ wp.element.createElement("ul", { className: "_items" }, activeItem.options.map((item, index2) => /* @__PURE__ */ wp.element.createElement(
      "li",
      {
        className: clsx_default("_item", {
          "is-selected": state.selectedItems.includes(item),
          "is-active": state.activeItems.includes(item),
          "has-children": !item.hasOwnProperty("value")
        }),
        onClick: () => toggleItem(item),
        key: item.label
      },
      item.label
    ))), /* @__PURE__ */ wp.element.createElement("div", { className: clsx_default("_arrow", index < state.activeItems.length - 1 ? "is-shown" : "is-hidden") })))))))));
  };

  // node_modules-included/catpow/src/component/Input/TableInput.jsx
  init_react();
  var TableInput = (props) => {
    const { className = "cp-tableinput", labels, items, onAddItem, onCopyItem, onMoveItem, onRemoveItem, onChange, children } = props;
    const classes = useMemo(() => bem(className), [className]);
    const Row = useMemo(() => {
      return forwardRef((props2, ref) => {
        const { className: className2, index, length, children: children2 } = props2;
        return /* @__PURE__ */ wp.element.createElement(Bem, null, /* @__PURE__ */ wp.element.createElement("tr", { className: className2 }, children2.map((child, index2) => /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-input", key: index2 }, child)), /* @__PURE__ */ wp.element.createElement("td", { className: "_td is-control", key: index }, /* @__PURE__ */ wp.element.createElement("div", { className: "_controls" }, index > 0 ? /* @__PURE__ */ wp.element.createElement("div", { className: "_button is-up", onClick: () => onMoveItem(index, index - 1) }) : /* @__PURE__ */ wp.element.createElement("div", { className: "_spacer" }), index < length - 1 ? /* @__PURE__ */ wp.element.createElement("div", { className: "_button is-down", onClick: () => onMoveItem(index, index + 1) }) : /* @__PURE__ */ wp.element.createElement("div", { className: "_spacer" }), length > 1 ? /* @__PURE__ */ wp.element.createElement("div", { className: "_buttonz is-remove", onClick: () => onRemoveItem(index) }) : /* @__PURE__ */ wp.element.createElement("div", { className: "_spacer" }), /* @__PURE__ */ wp.element.createElement("div", { className: "_button is-add", onClick: () => onAddItem(index + 1) })))));
      });
    }, [onAddItem, onCopyItem, onMoveItem, onRemoveItem, onChange]);
    return /* @__PURE__ */ wp.element.createElement(Bem, null, /* @__PURE__ */ wp.element.createElement("div", { className }, /* @__PURE__ */ wp.element.createElement("table", null, labels && /* @__PURE__ */ wp.element.createElement("thead", null, /* @__PURE__ */ wp.element.createElement("tr", null, labels.map((label, index) => /* @__PURE__ */ wp.element.createElement("th", { key: index }, label)), /* @__PURE__ */ wp.element.createElement("td", null))), /* @__PURE__ */ wp.element.createElement("tbody", null, children.map((child, index) => /* @__PURE__ */ wp.element.createElement(Row, { className: "_tr", index, length: children.length, key: index }, child))))));
  };

  // node_modules-included/catpow/src/component/Input/Toggle.jsx
  init_react();
  var Toggle = (props) => {
    const { className = "cp-toggle", onChange, threashold = 40 } = props;
    const [value, setValue] = useState(props.value);
    const [handler, setHandler] = useState(false);
    useEffect(() => {
      if (!handler) {
        return;
      }
      const org = { x: 0 };
      const handleTouchStart = (e) => {
        org.x = e.targetTouches[0].clientX;
      };
      const handleTouchMove = (e) => {
        setValue(e.targetTouches[0].clientX - org.x > threashold);
      };
      return () => {
        handler.removeEventListener("touchstart", handleTouchStart);
        handler.removeEventListener("touchmove", handleTouchMove);
        handler.removeEventListener("mousedown", handleTouchStart);
        handler.removeEventListener("mousemove", handleTouchMove);
      };
    }, [handler, setValue, threashold]);
    useEffect(() => {
      if (props.value !== value) {
        onChange(value);
      }
    }, [props.value, value, onChange]);
    return /* @__PURE__ */ wp.element.createElement(Bem, null, /* @__PURE__ */ wp.element.createElement(
      "div",
      {
        className: clsx_default(className, { "is-selected": value }),
        onClick: () => {
          setValue(!value);
        },
        ref: setHandler
      },
      /* @__PURE__ */ wp.element.createElement("span", { className: "_handler" })
    ));
  };

  // node_modules-included/catpow/src/component/Popover.jsx
  init_react();
  var Popover = function(props) {
    const { className = "cp-popover", children, open, onClose, size = "middle", closeButton = false, closeOnClickAway = true } = props;
    const [state, setPopoverState] = useState("closed");
    const [positionX, setPositionX] = useState("");
    const [positionY, setPositionY] = useState("");
    const classes = bem2(className);
    useEffect(() => setPopoverState(open ? "open" : state === "closed" ? "closed" : "close"), [open]);
    const ref = useRef({});
    const [contentRef, setContentRef] = useState();
    useEffect(() => {
      if (ref.current.getBoundingClientRect && open) {
        const bnd = ref.current.getBoundingClientRect();
        const x = bnd.left + bnd.width / 2;
        const ux = window.innerWidth / 8, cy = window.innerHeight / 2;
        setPositionY(bnd.bottom < cy ? "bottom" : "top");
        setPositionX(x < ux * 3 ? "right" : x > ux * 5 ? "left" : "center");
      }
    }, [ref, open]);
    useEffect(() => {
      if (!open || !contentRef || !onClose || !closeOnClickAway) {
        return;
      }
      const doc = contentRef.ownerDocument;
      const cb = (e) => {
        if (!contentRef.contains(e.target)) {
          onClose();
          doc.body.removeEventListener("click", cb);
        }
      };
      requestAnimationFrame(() => {
        doc.body.addEventListener("click", cb);
      });
      return () => doc.body.removeEventListener("click", cb);
    }, [open, onClose, closeOnClickAway, contentRef]);
    return /* @__PURE__ */ wp.element.createElement(wp.element.Fragment, null, /* @__PURE__ */ wp.element.createElement("div", { className: classes.anchor(), ref }), /* @__PURE__ */ wp.element.createElement(Portal, { className: classes.container(), trace: ref.current }, /* @__PURE__ */ wp.element.createElement(
      "div",
      {
        className: classes(`is-size-${size} is-${state} is-${positionX} is-${positionY}`),
        onAnimationEnd: () => {
          if (state === "close") {
            setPopoverState("closed");
          }
        },
        ref: setContentRef
      },
      /* @__PURE__ */ wp.element.createElement("div", { className: classes._body() }, /* @__PURE__ */ wp.element.createElement("div", { className: classes._body.arrow() }), /* @__PURE__ */ wp.element.createElement("div", { className: classes._body.contents() }, children), closeButton && /* @__PURE__ */ wp.element.createElement("div", { className: classes._body.control() }, /* @__PURE__ */ wp.element.createElement("div", { className: classes._body.control.button("is-button-close"), onClick: onClose })))
    )));
  };

  // node_modules-included/catpow/src/component/Popup.jsx
  init_react();
  var Popup = (props) => {
    const { children, open, onClose, onClosed, closeButton = false, closeOnClickAway = true } = props;
    const [state, setPopupState] = useState("closed");
    useEffect(() => setPopupState(open ? "open" : "close"), [open]);
    const ref = useRef({});
    useEffect(() => {
      if (state === "close") {
        setTimeout(() => {
          Promise.all(ref.current.getAnimations({ subTree: true }).map((animation) => animation.finished)).then(() => {
            setPopupState("closed");
            onClosed && onClosed();
          });
        }, 100);
      }
    }, [state]);
    return /* @__PURE__ */ wp.element.createElement(Portal, { id: "PopupContainer", className: "cp-popup__container" }, /* @__PURE__ */ wp.element.createElement("div", { className: "cp-popup is-" + state, ref }, /* @__PURE__ */ wp.element.createElement(
      "div",
      {
        className: "cp-popup__bg",
        onClick: () => {
          if (closeOnClickAway) {
            onClose();
          }
        }
      }
    ), /* @__PURE__ */ wp.element.createElement("div", { className: "cp-popup__body" }, /* @__PURE__ */ wp.element.createElement("div", { className: "cp-popup-contents" }, children), closeButton && /* @__PURE__ */ wp.element.createElement("div", { className: "cp-popup-control" }, /* @__PURE__ */ wp.element.createElement("div", { className: "cp-popup-control__close", onClick: onClose })))));
  };

  // node_modules-included/catpow/src/component/Portal.jsx
  init_react();
  init_react_dom();
  var Portal = (props) => {
    const { children, trace } = props;
    const { render: render2, useState: useState2, useMemo: useMemo2, useCallback: useCallback2, useEffect: useEffect3, useRef: useRef3 } = react_default;
    const { createPortal: createPortal2 } = react_dom_default;
    const ref = useRef3({ contents: false, setContents: () => {
    } });
    const el = useMemo2(() => {
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
    useEffect3(() => {
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

  // node_modules-included/catpow/src/component/JsonEditor/JsonEditor.tsx
  init_react();

  // node_modules-included/catpow/src/component/JsonEditor/inputComponents/ObjectInput.jsx
  init_react();

  // node_modules-included/catpow/src/component/JsonEditor/inputComponents/Input.jsx
  init_react();

  // node_modules-included/catpow/src/component/JsonEditor/inputComponents/index.js
  var inputComponents_exports = {};
  __export(inputComponents_exports, {
    Angle: () => Angle,
    ArrayInput: () => ArrayInput2,
    Checkbox: () => Checkbox,
    Date: () => Date2,
    DateTime: () => DateTime,
    Duration: () => Duration,
    Input: () => Input,
    None: () => None,
    Number: () => Number2,
    ObjectInput: () => ObjectInput,
    Position: () => Position,
    Radio: () => Radio,
    Range: () => Range,
    ReadOnly: () => ReadOnly,
    SearchSelect: () => SearchSelect2,
    Select: () => Select,
    StepSelect: () => StepSelect2,
    Text: () => Text,
    Textarea: () => Textarea,
    Time: () => Time,
    Toggle: () => Toggle2
  });

  // node_modules-included/catpow/src/component/JsonEditor/inputComponents/None.jsx
  var None = (props) => {
    return false;
  };

  // node_modules-included/catpow/src/component/JsonEditor/inputComponents/ReadOnly.jsx
  var ReadOnly = (props) => {
    const { className = "cp-jsoneditor-input-readonly", agent, onChange, onUpdate } = props;
    return /* @__PURE__ */ wp.element.createElement("div", { className }, agent.getValue() || "");
  };

  // node_modules-included/catpow/src/component/JsonEditor/inputComponents/Toggle.jsx
  var Toggle2 = (props) => {
    const { className = "cp-jsoneditor-input-toggle", agent, onUpdate } = props;
    return /* @__PURE__ */ wp.element.createElement("div", { className }, /* @__PURE__ */ wp.element.createElement(Toggle, { value: agent.getValue(), onChange: onUpdate }));
  };

  // node_modules-included/catpow/src/component/JsonEditor/inputComponents/Select.jsx
  var Select = (props) => {
    const { className = "cp-jsoneditor-input-select", agent, onUpdate } = props;
    const mergedSchemaForInput = agent.getMergedSchemaForInput();
    return /* @__PURE__ */ wp.element.createElement("div", { className }, /* @__PURE__ */ wp.element.createElement(SelectBox, { value: agent.getValue(), options: mergedSchemaForInput.options || mergedSchemaForInput.enum, onChange: onUpdate }));
  };

  // node_modules-included/catpow/src/component/JsonEditor/inputComponents/Checkbox.jsx
  var Checkbox = (props) => {
    const { className = "cp-jsoneditor-input-checkbox", agent, onUpdate } = props;
    const schema2 = agent.getMergedSchemaForInput();
    return /* @__PURE__ */ wp.element.createElement("div", { className }, /* @__PURE__ */ wp.element.createElement(CheckBoxes, { value: agent.getValue(), options: schema2.items.enum ?? schema2.items.options, onChange: onUpdate }));
  };

  // node_modules-included/catpow/src/component/JsonEditor/inputComponents/Radio.jsx
  var Radio = (props) => {
    const { className = "cp-jsoneditor-input-radio", agent, onUpdate } = props;
    const schema2 = agent.getMergedSchemaForInput();
    return /* @__PURE__ */ wp.element.createElement("div", { className }, /* @__PURE__ */ wp.element.createElement(RadioButtons, { value: agent.getValue(), options: schema2.enum ?? schema2.options, onChange: onUpdate }));
  };

  // node_modules-included/catpow/src/component/JsonEditor/inputComponents/SearchSelect.jsx
  init_react();
  var SearchSelect2 = (props) => {
    const { className = "cp-jsoneditor-input-searchselect", agent, onUpdate } = props;
    const options = useMemo(() => {
      const schema2 = agent.getMergedSchemaForInput();
      if (schema2.items != null) {
        if (schema2.items.options != null) {
          return schema2.items.options;
        }
        if (schema2.items.enum != null) {
          return schema2.items.enum;
        }
        return [];
      }
      if (schema2.options != null) {
        return schema2.options;
      }
      if (schema2.enum != null) {
        return schema2.enum;
      }
      return [];
    }, [agent.getMergedSchemaForInput()]);
    return /* @__PURE__ */ wp.element.createElement("div", { className }, /* @__PURE__ */ wp.element.createElement(SearchSelect, { options, multiple: agent.getMergedSchemaForInput().type === "array", onChange: onUpdate }));
  };

  // node_modules-included/catpow/src/component/JsonEditor/inputComponents/StepSelect.jsx
  init_react();
  var StepSelect2 = (props) => {
    const { className = "cp-jsoneditor-input-stepselect", agent, onChange, onUpdate } = props;
    const options = useMemo(() => {
      const schema2 = agent.getMergedSchemaForInput();
      if (schema2.items != null) {
        if (schema2.items.options != null) {
          return schema2.items.options;
        }
        if (schema2.items.enum != null) {
          return schema2.items.enum;
        }
        return [];
      }
      if (schema2.options != null) {
        return schema2.options;
      }
      if (schema2.enum != null) {
        return schema2.enum;
      }
      return [];
    }, [agent.getMergedSchemaForInput()]);
    return /* @__PURE__ */ wp.element.createElement("div", { className }, /* @__PURE__ */ wp.element.createElement(StepSelect, { options, multiple: agent.getMergedSchemaForInput().type === "array", onChange: onUpdate }));
  };

  // node_modules-included/catpow/src/component/JsonEditor/inputComponents/Text.jsx
  init_react();
  var Text = (props) => {
    const { className = "cp-jsoneditor-input-text", agent, onChange, onUpdate } = props;
    const autoComplete = useMemo(() => {
      const schema2 = agent.getMergedSchemaForInput();
      if (schema2.hasOwnProperty("autoComplete")) {
        return schema2.autoComplete;
      }
      if (schema2.hasOwnProperty("format")) {
        switch (schema2.format) {
          case "email":
          case "idn-email":
            return "email";
          case "uri":
          case "uri-reference":
            return "url";
        }
      }
      return null;
    }, [agent.getMergedSchemaForInput()]);
    const inputType = useMemo(() => {
      const schema2 = agent.getMergedSchemaForInput();
      if (schema2.hasOwnProperty("format")) {
        switch (schema2.format) {
          case "datetime":
            return "datetime-local";
          case "uri":
            return "url";
          case "date":
          case "time":
          case "email":
            return schema2.format;
          default:
            return "text";
        }
      }
      return "text";
    }, [agent.getMergedSchemaForInput()]);
    const size = useMemo(() => {
      const schema2 = agent.getMergedSchemaForInput();
      if (schema2.hasOwnProperty("maxLength")) {
        return schema2.maxLength;
      }
      return null;
    }, [agent.getMergedSchemaForInput()]);
    const onChangeHandle = useCallback(
      (e) => {
        onChange(e.currentTarget.value);
      },
      [onChange]
    );
    const onUpdateHandle = useCallback(
      (e) => {
        onUpdate(e.currentTarget.value);
      },
      [onChange]
    );
    return /* @__PURE__ */ wp.element.createElement(Bem, null, /* @__PURE__ */ wp.element.createElement("div", { className }, /* @__PURE__ */ wp.element.createElement("input", { type: inputType, value: agent.getValue() || "", size, className: "_input", onChange: onChangeHandle, onBlur: onUpdateHandle, autoComplete })));
  };

  // node_modules-included/catpow/src/component/JsonEditor/inputComponents/Textarea.jsx
  init_react();
  var Textarea = (props) => {
    const { className = "cp-jsoneditor-input-textarea", agent, onChange, onUpdate } = props;
    const onChangeHandle = useCallback(
      (e) => {
        onChange(e.currentTarget.value);
      },
      [onChange]
    );
    const onUpdateHandle = useCallback(
      (e) => {
        onUpdate(e.currentTarget.value);
      },
      [onChange]
    );
    const { cols, rows } = useMemo(() => {
      const schema2 = agent.getMergedSchemaForInput();
      const { cols: cols2, rows: rows2 } = schema2;
      return { cols: cols2, rows: rows2 };
    }, [agent.getMergedSchemaForInput()]);
    return /* @__PURE__ */ wp.element.createElement(Bem, null, /* @__PURE__ */ wp.element.createElement("div", { className }, /* @__PURE__ */ wp.element.createElement("textarea", { className: "_textarea", onChange: onChangeHandle, onBlur: onUpdateHandle, value: agent.getValue() || "", cols, rows })));
  };

  // node_modules-included/catpow/src/component/JsonEditor/inputComponents/DateTime.jsx
  init_react();
  var DateTime = (props) => {
    const { className = "cp-jsoneditor-input-datetime", agent, onChange, onUpdate } = props;
    const onChangeHandle = useCallback(
      (e) => {
        onChange(e.currentTarget.value);
      },
      [onChange]
    );
    const onUpdateHandle = useCallback(
      (e) => {
        onUpdate(e.currentTarget.value);
      },
      [onUpdate]
    );
    return /* @__PURE__ */ wp.element.createElement("div", { className }, /* @__PURE__ */ wp.element.createElement("input", { type: "datetime-local", value: agent.getValue() || "", onChange: onChangeHandle, onBlur: onUpdateHandle }));
  };

  // node_modules-included/catpow/src/component/JsonEditor/inputComponents/Date.jsx
  init_react();
  var Date2 = (props) => {
    const { className = "cp-jsoneditor-input-date", agent, onChange, onUpdate } = props;
    const onChangeHandle = useCallback(
      (e) => {
        onChange(e.currentTarget.value);
      },
      [onChange]
    );
    const onUpdateHandle = useCallback(
      (e) => {
        onUpdate(e.currentTarget.value);
      },
      [onUpdate]
    );
    return /* @__PURE__ */ wp.element.createElement("div", { className }, /* @__PURE__ */ wp.element.createElement("input", { type: "date", value: agent.getValue() || "", onChange: onChangeHandle, onBlur: onUpdateHandle }));
  };

  // node_modules-included/catpow/src/component/JsonEditor/inputComponents/Time.jsx
  init_react();
  var Time = (props) => {
    const { className = "cp-jsoneditor-input-time", agent, onChange, onUpdate } = props;
    const onChangeHandle = useCallback(
      (e) => {
        onChange(e.currentTarget.value);
      },
      [onChange]
    );
    const onUpdateHandle = useCallback(
      (e) => {
        onUpdate(e.currentTarget.value);
      },
      [onUpdate]
    );
    return /* @__PURE__ */ wp.element.createElement("div", { className }, /* @__PURE__ */ wp.element.createElement("input", { type: "time", value: agent.getValue() || "", onChange: onChangeHandle, onBlur: onUpdateHandle }));
  };

  // node_modules-included/catpow/src/component/JsonEditor/inputComponents/Duration.jsx
  var Duration = (props) => {
    const { className = "cp-jsoneditor-input-duration", agent, onChange, onUpdate } = props;
    return /* @__PURE__ */ wp.element.createElement("div", { className }, /* @__PURE__ */ wp.element.createElement(InputDuration, { value: agent.getValue() || "", onChange: onUpdate }));
  };

  // node_modules-included/catpow/src/component/JsonEditor/inputComponents/Range.jsx
  init_react();
  var Range = (props) => {
    const { className = "cp-jsoneditor-input-range", agent, onChange, onUpdate } = props;
    const { minimum: min, maximum: max, multipleOf: step = 1, steps } = agent.getMergedSchemaForInput();
    const onChangeHandle = useCallback(
      ({ value }) => {
        onUpdate(value);
      },
      [onUpdate]
    );
    return /* @__PURE__ */ wp.element.createElement(Bem, null, /* @__PURE__ */ wp.element.createElement(RangeInput, { value: agent.getValue(), steps: steps || { [min]: 0, [max]: step }, snap: true, onChange: onChangeHandle }));
  };

  // node_modules-included/catpow/src/component/JsonEditor/inputComponents/Number.jsx
  init_react();
  var Number2 = (props) => {
    const { className = "cp-jsoneditor-input-number", agent, onChange, onUpdate } = props;
    const { minimum: min, maximum: max, multipleOf: step } = agent.getMergedSchemaForInput();
    const onChangeHandle = useCallback(
      (e) => {
        onChange(parseFloat(e.currentTarget.value));
      },
      [onChange]
    );
    const onUpdateHandle = useCallback(
      (e) => {
        onUpdate(parseFloat(e.currentTarget.value));
      },
      [onUpdate]
    );
    return /* @__PURE__ */ wp.element.createElement("div", { className }, /* @__PURE__ */ wp.element.createElement("input", { type: "number", value: agent.getValue(), min, max, step, onChange: onChangeHandle, onBlur: onUpdateHandle }));
  };

  // node_modules-included/catpow/src/component/JsonEditor/inputComponents/Angle.jsx
  var Angle = (props) => {
    const { className = "cp-jsoneditor-input-toggle", agent, onUpdate } = props;
    const { multipleOf: step = 15 } = agent.getMergedSchemaForInput();
    return /* @__PURE__ */ wp.element.createElement("div", { className }, /* @__PURE__ */ wp.element.createElement(AngleInput, { value: agent.getValue(), step, onChange: onUpdate }));
  };

  // node_modules-included/catpow/src/component/JsonEditor/inputComponents/Position.jsx
  var Position = (props) => {
    const { className = "cp-jsoneditor-input-toggle", agent, onUpdate } = props;
    const { width = 100, height = 100, margin = 10, grid = 10, snap = true } = agent.getMergedSchemaForInput();
    return /* @__PURE__ */ wp.element.createElement("div", { className }, /* @__PURE__ */ wp.element.createElement(PositionInput, { value: agent.getValue(), width, height, margin, grid, snap, onChange: onUpdate }));
  };

  // node_modules-included/catpow/src/component/JsonEditor/inputComponents/ArrayInput.jsx
  init_react();
  var ArrayInput2 = (props) => {
    const { className = "cp-jsoneditor-input-arrayinput", compact = false, agent } = props;
    const schema2 = agent.getMergedSchemaForInput();
    const layout = schema2.layout || props.layout || (compact ? "table" : "block");
    const size = schema2.size || props.size || "medium";
    const onAddItem = useCallback(
      (index, value) => {
        agent.addItem(index, value);
        agent.update();
      },
      [agent]
    );
    const onCopyItem = useCallback(
      (from, to) => {
        agent.copyItem(from, to);
        agent.update();
      },
      [agent]
    );
    const onMoveItem = useCallback(
      (from, to) => {
        agent.moveItem(from, to);
        agent.update();
      },
      [agent]
    );
    const onRemoveItem = useCallback(
      (index) => {
        agent.removeItem(index);
        agent.update();
      },
      [agent]
    );
    const [lastUpdated, setLastUpdated] = useState(Date.now());
    useEffect(() => {
      const cb = (e) => {
        setLastUpdated(Date.now());
      };
      agent.on("modifyItems", cb);
      return () => agent.off("modifyItems", cb);
    }, []);
    const getItemId = useMemo(() => {
      const map = /* @__PURE__ */ new WeakMap();
      let maxId = 0;
      return (item) => {
        if (!map.has(item)) {
          map.set(item, maxId++);
        }
        return map.get(item);
      };
    }, []);
    const InputComponent = useMemo(() => {
      if (layout === "table") {
        return (props2) => {
          const { agent: agent2 } = props2;
          const cols = {};
          for (const item of agent2.items) {
            const itemSchema = item.getMergedSchemaForInput();
            if (itemSchema.properties == null) {
              continue;
            }
            for (const col in itemSchema.properties) {
              if (cols[col] == null) {
                cols[col] = {};
              }
              Object.assign(cols[col], itemSchema.properties[col]);
            }
          }
          const sortedColsKeys = Object.keys(cols).filter((key2) => !cols[key2].hidden).sort((key1, key2) => (cols[key1].order || 10) - (cols[key2].order || 10));
          return /* @__PURE__ */ wp.element.createElement(
            TableInput,
            {
              size,
              labels: sortedColsKeys.map((key2) => cols[key2].title || key2),
              onAddItem,
              onCopyItem,
              onMoveItem,
              onRemoveItem
            },
            props2.agent.items.map(
              (item) => sortedColsKeys.map((col) => {
                if (item.getMergedSchemaForInput().properties[col] == null) {
                  return false;
                }
                return /* @__PURE__ */ wp.element.createElement(Input, { agent: item.properties[col], layout: "inline", size: "small", compact: true, key: getItemId(item) });
              })
            )
          );
        };
      }
      return (props2) => {
        const { agent: agent2 } = props2;
        return /* @__PURE__ */ wp.element.createElement(ArrayInput, { size, onAddItem, onCopyItem, onMoveItem, onRemoveItem }, agent2.items.map((item) => /* @__PURE__ */ wp.element.createElement(Input, { agent: item, layout: "inline", size: "small", compact: true, key: getItemId(item) })));
      };
    }, [layout, size, onAddItem, onCopyItem, onMoveItem, onRemoveItem]);
    return /* @__PURE__ */ wp.element.createElement("div", { className: className + ` is-layout-${layout} is-size-${size}` }, /* @__PURE__ */ wp.element.createElement(InputComponent, { agent }));
  };

  // node_modules-included/catpow/src/component/JsonEditor/functions.js
  var getInputComponentForSchema = (schema2, params) => {
    if (schema2.hasOwnProperty("@editor")) {
      if (JsonEditor[schema2["@editor"]]) {
        return JsonEditor[schema2["@editor"]];
      }
      if (inputComponents_exports[schema2["@editor"]]) {
        return inputComponents_exports[schema2["@editor"]];
      }
    }
    if (schema2.hasOwnProperty("options")) {
      if (Array.isArray(schema2.options) || Object.keys(schema2.options).every((key2) => typeof schema2.options[key2] !== "object")) {
        const length = Array.isArray(schema2.options) ? schema2.options.length : Object.keys(schema2.options).length;
        if (length < 8 && !params.compact) {
          return Radio;
        }
        if (length < 64) {
          return Select;
        }
        return SearchSelect2;
      }
      return StepSelect2;
    }
    if (schema2.type === "null") {
      return None;
    }
    if (schema2.const) {
      return ReadOnly;
    }
    if (schema2.enum) {
      if (schema2.enum.length < 8 && !params.compact) {
        return Radio;
      }
      if (schema2.enum.length < 64) {
        return Select;
      }
      return SearchSelect2;
    }
    if (schema2.type === "boolean") {
      return Toggle2;
    }
    if (schema2.type === "string") {
      if (schema2.format) {
        switch (schema2.format) {
          case "date-time":
            return DateTime;
          case "date":
            return Date2;
          case "time":
            return Time;
          case "duration":
            return Duration;
          default:
            return Text;
        }
      }
      if (schema2.hasOwnProperty("pattern") || schema2.hasOwnProperty("maxLength") && schema2.maxLength < 40) {
        return Text;
      }
      return Textarea;
    }
    if (schema2.type === "integer" || schema2.type === "number") {
      if (schema2.hasOwnProperty("minimum") && schema2.hasOwnProperty("maximum") || schema2.hasOwnProperty("steps")) {
        return Range;
      }
      return Number2;
    }
    if (schema2.type === "array") {
      if (schema2.items.enum) {
        if (schema2.items.enum.length < 16) {
          return Checkbox;
        }
        return SearchSelect2;
      }
      return ArrayInput2;
    }
    if (schema2.type === "object") {
      return ObjectInput;
    }
    return Text;
  };

  // node_modules-included/catpow/src/component/JsonEditor/inputComponents/Input.jsx
  var Input = (props) => {
    const { className = "cp-jsoneditor-input", compact = false, level = 0, agent } = props;
    const schema2 = agent.getMergedSchemaForInput();
    const layout = schema2.layout || props.layout || (compact ? "table" : "block");
    const size = schema2.size || props.size || "medium";
    const { getAdditionalInputComponent } = useContext(DataContext);
    const { description } = schema2;
    const InputComponent = useMemo(() => {
      return getAdditionalInputComponent && getAdditionalInputComponent(schema2, { layout, size, compact }) || getInputComponentForSchema(schema2, { layout, size, compact });
    }, [schema2, layout, size]);
    const [showMessage, setShowMessage] = useState(false);
    const onChange = useCallback(
      (value) => {
        agent.setValue(value);
        setShowMessage(false);
      },
      [agent, setShowMessage]
    );
    const onUpdate = useCallback(
      (value) => {
        agent.setValue(value);
        agent.update();
        window.requestAnimationFrame(() => {
          setShowMessage(true);
        });
      },
      [agent, setShowMessage]
    );
    const [lastChanged, setLastChanged] = useState(Date.now());
    useEffect(() => {
      const cb = (e) => {
        setLastChanged(Date.now());
      };
      agent.on("change", cb);
      return () => agent.off("change", cb);
    }, []);
    return /* @__PURE__ */ wp.element.createElement(Bem, null, /* @__PURE__ */ wp.element.createElement("div", { className: clsx_default(className, { "is-invalid": !agent.isValid, "is-compact": compact }, `is-layout-${layout}`, `is-size-${size}`, `is-level-${level}`), "data-json-key": agent.key }, /* @__PURE__ */ wp.element.createElement("div", { className: "_body" }, agent.getMessage() && /* @__PURE__ */ wp.element.createElement("div", { className: clsx_default("_message", showMessage ? "is-show" : "is-hidden") }, agent.getMessage()), /* @__PURE__ */ wp.element.createElement(InputComponent, { agent, size, compact, level, onChange, onUpdate, lastChanged }), description && /* @__PURE__ */ wp.element.createElement("div", { className: "_description" }, description))));
  };

  // node_modules-included/catpow/src/component/JsonEditor/inputComponents/ObjectInput.jsx
  var ObjectInput = (props) => {
    const { className = "cp-jsoneditor-input-objectinput", compact = false, popoverSize = "large", level = 0, agent, lastChanged } = props;
    const schema2 = agent.getMergedSchemaForInput();
    const layout = schema2.layout || props.layout || "block";
    const size = schema2.size || props.size || "medium";
    const InputComponent = useMemo(() => {
      const InputBodyComponent = (() => {
        const stateClassNames = `is-layout-${layout} is-size-${size} is-level-${level}`;
        switch (layout) {
          case "block": {
            return (props2) => {
              const { agent: agent2 } = props2;
              const schema3 = agent2.getMergedSchemaForInput();
              return /* @__PURE__ */ wp.element.createElement(Bem, { block: className }, /* @__PURE__ */ wp.element.createElement("div", { className: "-block " + stateClassNames }, Object.keys(schema3.properties).map((name) => {
                if (agent2.properties[name] == null || agent2.properties[name].getMergedSchemaForInput().hidden) {
                  return false;
                }
                const schema4 = agent2.properties[name].getMergedSchemaForInput();
                return /* @__PURE__ */ wp.element.createElement("div", { className: "_item", key: name }, /* @__PURE__ */ wp.element.createElement("div", { className: "_title" }, schema4.title || schema4.key || name), /* @__PURE__ */ wp.element.createElement("div", { className: "_body" }, /* @__PURE__ */ wp.element.createElement(Input, { agent: agent2.properties[name], level: level + 1, layout, size })));
              })));
            };
          }
          case "table": {
            return (props2) => {
              const { agent: agent2 } = props2;
              const schema3 = agent2.getMergedSchemaForInput();
              return /* @__PURE__ */ wp.element.createElement(Bem, { block: className }, /* @__PURE__ */ wp.element.createElement("table", { className: "-table " + stateClassNames }, /* @__PURE__ */ wp.element.createElement("tbody", null, Object.keys(schema3.properties).map((name) => {
                if (agent2.properties[name] == null || agent2.properties[name].getMergedSchemaForInput().hidden) {
                  return false;
                }
                const schema4 = agent2.properties[name].getMergedSchemaForInput();
                return /* @__PURE__ */ wp.element.createElement("tr", { className: "_tr", key: name }, /* @__PURE__ */ wp.element.createElement("th", { className: "_th" }, schema4.title || schema4.key), /* @__PURE__ */ wp.element.createElement("td", { className: "_td" }, /* @__PURE__ */ wp.element.createElement(Input, { agent: agent2.properties[name], level: level + 1, layout, size })));
              }))));
            };
          }
          case "inline": {
            return (props2) => {
              const { agent: agent2 } = props2;
              const schema3 = agent2.getMergedSchemaForInput();
              return /* @__PURE__ */ wp.element.createElement(Bem, { block: className }, /* @__PURE__ */ wp.element.createElement("div", { className: "-row " + stateClassNames }, Object.keys(schema3.properties).map((name) => {
                if (agent2.properties[name] == null || agent2.properties[name].getMergedSchemaForInput().hidden) {
                  return false;
                }
                const schema4 = agent2.properties[name].getMergedSchemaForInput();
                return /* @__PURE__ */ wp.element.createElement("div", { className: "_item", key: name }, /* @__PURE__ */ wp.element.createElement("div", { className: "_title" }, schema4.title || schema4.key), /* @__PURE__ */ wp.element.createElement("div", { className: "_body" }, /* @__PURE__ */ wp.element.createElement(Input, { agent: agent2.properties[name], level: level + 1, layout, size })));
              })));
            };
          }
        }
      })();
      if (compact) {
        return (props2) => {
          const { agent: agent2 } = props2;
          const schema3 = agent2.getMergedSchemaForInput();
          const [open, setOpen] = useState(false);
          const onClose = useCallback(() => setOpen(false), [setOpen]);
          const getLabel = useMemo(() => {
            if (!schema3.label) {
              return () => schema3.title || schema3.key;
            }
            if (schema3.label.includes("{")) {
              return (agent3) => schema3.label.replaceAll(/{(.+?)}/g, (match, p1) => {
                const names = p1.split("|");
                for (let name of names) {
                  if (/^("|').+\1$/.test(name)) {
                    return name.slice(1, -1);
                  }
                  if (agent3.properties[name]) {
                    let value = agent3.properties[name].getValue();
                    if (value) {
                      return value;
                    }
                  }
                }
                return "";
              });
            }
            return () => schema3.label;
          }, [schema3.label]);
          const label = getLabel(agent2);
          return /* @__PURE__ */ wp.element.createElement(Bem, null, /* @__PURE__ */ wp.element.createElement("div", { className: clsx_default(className, `is-layout-${layout}`, `is-size-${size}`, `is-level-${level}`, open ? "is-open" : "is-close") }, /* @__PURE__ */ wp.element.createElement("div", { className: "_label", onClick: () => setOpen(!open) }, label), /* @__PURE__ */ wp.element.createElement(Popover, { open, size: popoverSize, onClose, closeButton: true, closeOnClickAway: false }, /* @__PURE__ */ wp.element.createElement("div", { className: "_body" }, /* @__PURE__ */ wp.element.createElement(InputBodyComponent, { agent: agent2 })))));
        };
      }
      return InputBodyComponent;
    }, [layout, size, compact, popoverSize, level]);
    if (schema2.properties == null) {
      return /* @__PURE__ */ wp.element.createElement("div", { className: className + "__message" });
    }
    return /* @__PURE__ */ wp.element.createElement(InputComponent, { agent });
  };

  // node_modules-included/catpow/src/schema/functions/createAgent.js
  var createAgent = (matrix, ref, key2, value, parent, params) => {
    const agent = { matrix, ref, key: key2, value, parent };
    for (let functionName in matrix.curries) {
      agent[functionName] = matrix.curries[functionName](agent);
    }
    if (params != null) {
      Object.assign(agent, params);
    }
    agent.message = false;
    agent.schemaStatus = /* @__PURE__ */ new Map();
    agent.conditionalSchemaStatus = /* @__PURE__ */ new WeakMap();
    agent.conditionalRequiredFlag = /* @__PURE__ */ new Map();
    agent.eventListeners = {};
    agent.debug = parent ? parent.debug : params?.debug || false;
    agent.rootAgent = parent ? parent.rootAgent : agent;
    agent.rootMatrix = parent ? parent.rootMatrix : matrix;
    agent.rootSchema = agent.rootMatrix.schemas[0];
    for (let schema2 of matrix.schemas) {
      if (schema2.isConditional) {
        agent.schemaStatus.set(schema2, 0);
        agent.conditionalSchemaStatus.set(schema2, 0);
      } else {
        agent.schemaStatus.set(schema2, parent ? parent.getSchemaStatus(schema2.parent) : 3);
      }
    }
    if (matrix.properties != null) {
      if (agent.value == null || Array.isArray(agent.value) || typeof agent.value !== "object") {
        agent.value = value = {};
      }
      agent.properties = {};
      for (let propertyName in matrix.properties) {
        agent.properties[propertyName] = createAgent(matrix.properties[propertyName], value, propertyName, value[propertyName], agent);
      }
    } else if (matrix.items != null) {
      if (agent.value == null || !Array.isArray(agent.value)) {
        agent.value = value = [];
      }
      if (value.length > 0) {
        agent.items = [];
        for (let index in value) {
          agent.items[index] = createAgent(matrix.items, value, index, value[index], agent);
        }
      } else {
        agent.items = [createAgent(matrix.items, value, 0, null, agent)];
      }
    }
    return agent;
  };

  // node_modules-included/catpow/src/schema/methods/index.js
  var methods_exports = {};
  __export(methods_exports, {
    extractDependencies: () => extractDependencies,
    find: () => find,
    getDefaultValue: () => getDefaultValue,
    getErrorMessage: () => getErrorMessage,
    getErrorMessageFormat: () => getErrorMessageFormat,
    getMatchedSchemas: () => getMatchedSchemas,
    getMergedSchema: () => getMergedSchema,
    getMergedSchemaForValue: () => getMergedSchemaForValue,
    getPrimaryPropertyName: () => getPrimaryPropertyName,
    getResolvedSchema: () => getResolvedSchema,
    getSubSchema: () => getSubSchema,
    getType: () => getType,
    mergeSchema: () => mergeSchema,
    mergeSchemas: () => mergeSchemas,
    sanitize: () => sanitize,
    test: () => test
  });

  // node_modules-included/catpow/src/schema/methods/getErrorMessageFormat.js
  var getErrorMessageFormat = (params) => {
    const { invalidBy, schema: schema2 } = params;
    if (schema2.message != null) {
      return schema2.message;
    }
    switch (invalidBy) {
      case "type":
        return "\u5165\u529B\u5024\u306E\u578B\u304C\u4E00\u81F4\u3057\u307E\u305B\u3093";
      case "minimum":
        return schema2.exclusiveMinimum ? "{minimum}\u3088\u308A\u5927\u304D\u3044\u6570\u5024\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044" : "{minimum}\u4EE5\u4E0A\u306E\u6570\u5024\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044";
      case "exclusiveMinimum":
        return "{exclusiveMinimum}\u3088\u308A\u5927\u304D\u3044\u6570\u5024\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044";
      case "maximum":
        return schema2.exclusiveMaximum ? "{maximum}\u3088\u308A\u5C0F\u3055\u3044\u6570\u5024\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044" : "{maximum}\u4EE5\u4E0B\u306E\u6570\u5024\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044";
      case "exclusiveMaximum":
        return "{exclusiveMaximum}\u3088\u308A\u5C0F\u3055\u3044\u6570\u5024\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044";
      case "multipleOf":
        return "{multipleOf}\u306E\u500D\u6570\u3067\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044";
      case "pattern":
        return "\u5165\u529B\u5F62\u5F0F\u304C\u4E00\u81F4\u3057\u307E\u305B\u3093";
      case "minLength":
        return "{minLength}\u6587\u5B57\u4EE5\u4E0A\u3067\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044";
      case "maxLength":
        return "{maxLength}\u6587\u5B57\u4EE5\u4E0B\u3067\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044";
      case "required":
      case "dependentRequired":
        return "\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044";
      case "additionalProperties":
        return "\u898F\u5B9A\u306E\u30D7\u30ED\u30D1\u30C6\u30A3\u4EE5\u5916\u5165\u529B\u3067\u304D\u307E\u305B\u3093";
      case "minProperties":
        return "{minProperties}\u4EE5\u4E0A\u306E\u30D7\u30ED\u30D1\u30C6\u30A3\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044";
      case "maxProperties":
        return "{maxProperties}\u4EE5\u4E0B\u306E\u30D7\u30ED\u30D1\u30C6\u30A3\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044";
      case "minItems":
        return "{minItems}\u4EE5\u4E0A\u306E\u30A2\u30A4\u30C6\u30E0\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044";
      case "maxItems":
        return "{maxItems}\u4EE5\u4E0B\u306E\u30A2\u30A4\u30C6\u30E0\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044";
      case "contains":
        return "\u898F\u5B9A\u306E\u5F62\u5F0F\u306E\u30A2\u30A4\u30C6\u30E0\u3092\u542B\u3081\u3066\u304F\u3060\u3055\u3044";
      case "minContains":
        return "\u898F\u5B9A\u306E\u5F62\u5F0F\u306E\u30A2\u30A4\u30C6\u30E0\u3092{maxItems}\u4EE5\u4E0A\u542B\u3081\u3066\u304F\u3060\u3055\u3044";
      case "maxContains":
        return "\u898F\u5B9A\u306E\u5F62\u5F0F\u306E\u30A2\u30A4\u30C6\u30E0\u306F{maxContains}\u4EE5\u4E0B\u306B\u3057\u3066\u304F\u3060\u3055\u3044";
      case "uniqueItems":
        return "\u5024\u304C\u91CD\u8907\u3057\u3066\u3044\u307E\u3059";
      case "oneOf":
        return params.matchedSchemaLength > 1 ? "\u8907\u6570\u306E\u5165\u529B\u898F\u5247\u306B\u4E00\u81F4\u3057\u3066\u3044\u307E\u3059" : "\u4E00\u81F4\u3059\u308B\u5165\u529B\u898F\u5247\u304C\u3042\u308A\u307E\u305B\u3093";
      case "anyOf":
        return "\u4E00\u81F4\u3059\u308B\u5165\u529B\u898F\u5247\u304C\u3042\u308A\u307E\u305B\u3093";
    }
    return null;
  };

  // node_modules-included/catpow/src/schema/methods/getErrorMessage.js
  var getErrorMessage = (params) => {
    const format = getErrorMessageFormat(params);
    if (format == null) {
      return null;
    }
    return format.replace(/{\w+}/g, (matches) => {
      const key2 = matches.slice(1, -1);
      if (params[key2] != null) {
        return params[key2];
      }
      if (params.schema[key2] != null) {
        return params.schema[key2];
      }
      return matches;
    });
  };

  // node_modules-included/catpow/src/schema/methods/extractDependencies.js
  var extractDependencies = (schema2) => {
    if (schema2.dependencies != null) {
      if (Array.isArray(Object.values(schema2.dependencies)[0])) {
        return { dependentRequired: schema2.dependencies };
      } else {
        return { dependentSchemas: schema2.dependencies };
      }
    } else {
      const { dependentRequired, dependentSchemas } = schema2;
      return { dependentRequired, dependentSchemas };
    }
  };

  // node_modules-included/catpow/src/schema/methods/getSubSchema.js
  var getSubSchema = (path, schema2, rootSchema) => {
    let keys = path.split("/");
    if (keys[0] === "#") {
      keys.shift();
      schema2 = rootSchema;
    }
    keys.every((key2) => {
      if (!schema2.hasOwnProperty(key2)) {
        schema2 = null;
        return false;
      }
      schema2 = schema2[key2];
      return true;
    });
    return schema2;
  };

  // node_modules-included/catpow/src/schema/methods/find.js
  var find = (callback, schema2, rootSchema, params = {}) => {
    if (schema2 == null) {
      return null;
    }
    const result = callback(schema2, rootSchema);
    if (result != null) {
      return result;
    }
    if (!params.refStack != null) {
      params.refStack = /* @__PURE__ */ new WeakMap();
    }
    if (params.refStack.has(schema2)) {
      return null;
    }
    params.refStack.set(schema2, true);
    if (schema2.allOf != null) {
      for (let i2 in schema2.allOf) {
        const result2 = find(callback, schema2.allOf[i2], rootSchema, params);
        if (result2 != null) {
          return result2;
        }
      }
    }
    if (params.proactive) {
      if (schema2.anyOf != null) {
        for (let i2 in schema2.anyOf) {
          const result2 = find(callback, schema2.anyOf[i2], rootSchema, params);
          if (result2 != null) {
            return result2;
          }
        }
      }
      if (schema2.oneOf != null) {
        for (let i2 in schema2.oneOf) {
          const result2 = find(callback, schema2.oneOf[i2], rootSchema, params);
          if (result2 != null) {
            return result2;
          }
        }
      }
      for (let key2 in ["if", "then", "else"]) {
        if (schema2[key2] == null) {
          break;
        }
        const result2 = find(callback, schema2[key2], rootSchema, params);
        if (result2 != null) {
          return result2;
        }
      }
      const { dependentSchemas } = extractDependencies(schema2);
      if (dependentSchemas) {
        for (let i2 in dependentSchemas) {
          const result2 = find(callback, dependentSchemas[i2], rootSchema, params);
          if (result2 != null) {
            return result2;
          }
        }
      }
    }
    if (schema2["$ref"] != null) {
      const refSchema = getSubSchema(schema2.$ref, schema2, rootSchema);
      const result2 = find(callback, refSchema, rootSchema, params);
      if (result2 != null) {
        return result2;
      }
    }
    return null;
  };

  // node_modules-included/catpow/src/schema/methods/getType.js
  var getType = (schema2, rootSchema) => {
    return find(
      (schema3) => {
        if (schema3.type != null) {
          return schema3.type;
        }
        if (schema3.properties != null) {
          return "object";
        }
        if (schema3.items != null || schema3.prefixItems != null) {
          return "array";
        }
        if (schema3.minimum != null || schema3.maximam != null || schema3.multipleOf != null || schema3.steps != null) {
          return "number";
        }
        if (schema3.pattern != null || schema3.minLength != null || schema3.maxLength != null) {
          return "string";
        }
        if (schema3.const != null) {
          return typeof schema3.const;
        }
        if (schema3.default != null) {
          return typeof schema3.default;
        }
        if (schema3.enum != null && schema3.enum.length) {
          return typeof schema3.enum[0];
        }
        if (schema3["@type"] != null) {
          return "object";
        }
      },
      schema2,
      rootSchema
    );
  };

  // node_modules-included/catpow/src/schema/methods/getResolvedSchema.js
  var cache = /* @__PURE__ */ new WeakMap();
  var getResolvedSchema = (schema2, rootSchema) => {
    if (schema2 == null) {
      return {};
    }
    if (rootSchema == null) {
      rootSchema = schema2;
    }
    if (cache.has(schema2)) {
      return cache.get(schema2);
    }
    const resolvedSchema = {};
    const { properties = null, items = null, ...otherParams } = schema2;
    if (schema2.hasOwnProperty("@type")) {
      Object.assign(resolvedSchema, getResolvedSchema(getSubSchema("#/$defs/" + schema2["@type"], schema2, rootSchema), rootSchema));
    }
    if (schema2.hasOwnProperty("$ref")) {
      Object.assign(resolvedSchema, getResolvedSchema(getSubSchema(schema2.$ref, schema2, rootSchema), rootSchema));
    }
    if (items != null) {
      if (resolvedSchema.items) {
        const { properties: itemsProperties = null, ...otherItemsParams } = items;
        if (itemsProperties != null) {
          resolvedSchema.items.properties = Object.assign({}, resolvedSchema.items.properties || {}, itemsProperties);
        }
        Object.assign(resolvedSchema.items, otherItemsParams);
      } else {
        resolvedSchema.items = items;
      }
    }
    if (properties != null) {
      if (resolvedSchema.properties == null) {
        resolvedSchema.properties = {};
      }
      resolvedSchema.properties = Object.assign({}, resolvedSchema.properties, properties);
    }
    Object.assign(resolvedSchema, otherParams);
    if (resolvedSchema.type == null) {
      resolvedSchema.type = getType(resolvedSchema, rootSchema);
    }
    cache.set(schema2, resolvedSchema);
    return resolvedSchema;
  };

  // node_modules-included/catpow/src/schema/methods/test.js
  var test = (value, schema2, rootSchema, params = {}) => {
    const type = getType(schema2, rootSchema);
    schema2 = getResolvedSchema(schema2, rootSchema);
    const { ignoreRequired = false, recursive = false, onError = false, onSuccess = false } = params;
    const cb = (invalidBy, params2 = {}) => onError && onError(Object.assign({ invalidBy, schema: schema2, value }, params2));
    if (schema2.const != null && schema2.const !== value) {
      return cb("const");
    }
    if (schema2.enum != null && !schema2.enum.includes(value)) {
      return cb("enum");
    }
    if (value == null) {
      return true;
    }
    switch (type) {
      case "boolean": {
        if (typeof value !== "boolean") {
          return cb("type");
        }
        break;
      }
      case "integer":
      case "number": {
        if (type === "intger" && !Number.isInteger(value)) {
          return cb("type");
        }
        if (schema2.minimum != null && value < schema2.minimum) {
          return cb("minimum");
        }
        if (schema2.maximum != null && value > schema2.maximum) {
          return cb("maximum");
        }
        if (schema2.exclusiveMinimum != null) {
          if (typeof schema2.exclusiveMinimum === "boolean") {
            if (schema2.exclusiveMinimum === true && value <= schema2.minimum) {
              return cb("minimum");
            }
          } else {
            if (value <= schema2.exclusiveMinimum) {
              return cb("exclusiveMinimum");
            }
          }
        }
        if (schema2.exclusiveMaximum != null) {
          if (typeof schema2.exclusiveMaximum === "boolean") {
            if (schema2.exclusiveMaximum === true && value >= schema2.maximum) {
              return cb("maximum");
            }
          } else {
            if (value >= schema2.exclusiveMaximum) {
              return cb("exclusiveMaximum");
            }
          }
        }
        if (schema2.multipleOf != null) {
          if (value % schema2.multipleOf !== 0) {
            return cb("multipleOf");
          }
        }
        break;
      }
      case "string": {
        if (schema2.pattern != null) {
          const reg = new RegExp(schema2.pattern);
          if (!reg.test(value)) {
            return cb("pattern");
          }
        }
        if (schema2.minLength != null && value.length < schema2.minLength) {
          return cb("minLength");
        }
        if (schema2.maxLength != null && value.length > schema2.maxLength) {
          return cb("maxLength");
        }
        break;
      }
      case "object": {
        if (typeof value !== "object" || Array.isArray(value)) {
          return cb("type");
        }
        if (schema2.required != null && !ignoreRequired) {
          for (let propertyName of schema2.required) {
            if (value[propertyName] == null) {
              return cb("required", { propertyName });
            }
          }
        }
        if (schema2.additionalProperties != null && schema2.additionalProperties === false) {
          if (Object.keys(value).some((key2) => !schema2.properties.hasOwnProperty(key2))) {
            return cb("additionalProperties");
          }
        }
        const { dependentRequired, dependentSchemas } = extractDependencies(schema2);
        if (dependentRequired) {
          if (!ignoreRequired) {
            for (let keyPropertyName in dependentRequired) {
              if (value[keyPropertyName] == null) {
                continue;
              }
              for (let propertyName of dependentRequired[keyPropertyName]) {
                if (value[propertyName] == null) {
                  return cb("dependentRequired", { propertyName });
                }
              }
            }
          }
        }
        if (dependentSchemas) {
          for (let propertyName in dependentSchemas) {
            if (value[key] == null) {
              continue;
            }
            const result = test(value, dependentSchemas[propertyName], rootSchema, params);
            if (result !== true) {
              return result;
            }
          }
        }
        const length = Object.keys(value).length;
        if (schema2.minProperties != null && length < schema2.minProperties) {
          return cb("minProperties");
        }
        if (schema2.maxProperties != null && length > schema2.maxProperties) {
          return cb("maxProperties");
        }
        if (recursive && schema2.properties != null) {
          if (Object.keys(schema2.properties).some((key2) => {
            if (value[key2] == null) {
              return false;
            }
            return test(value[key2], schema2.properties[key2], rootSchema, params) !== true;
          })) {
            return false;
          }
        }
        break;
      }
      case "array": {
        if (schema2.minItems != null && value.length < schema2.minItems) {
          return cb("minItems");
        }
        if (schema2.maxItems != null && value.length > schema2.maxItems) {
          return cb("maxItems");
        }
        if (schema2.prefixItems != null) {
          if (schema2.prefixItems.some((itemSchema, index) => value[index] !== void 0 && test(value[index], itemSchema, rootSchema, params) !== true)) {
            return cb("prefixItems");
          }
        }
        if (schema2.contains != null) {
          const matchedItems = value.filter((item) => test(item, schema2.contain, rootSchema, params) !== true);
          if (matchedItems.length === 0) {
            return cb("contains");
          }
          if (schema2.minContains != null && matchedItems.length < schema2.minContains) {
            return cb("minContains");
          }
          if (schema2.maxContains != null && matchedItems.length > schema2.maxContains) {
            return cb("maxContains");
          }
        }
        if (schema2.uniqueItems != null && schema2.uniqueItems === true) {
          if (value.slice(0, -1).some((item, index) => value.indexOf(item, index + 1) !== -1)) {
            return cb("uniqueItems");
          }
        }
        break;
      }
    }
    if (schema2.oneOf != null) {
      const matchedSchemaLength = getMatchedSchemas(value, schema2.oneOf, rootSchema, { recursive: true }).length;
      if (matchedSchemaLength !== 1) {
        return cb("oneOf", { matchedSchemaLength });
      }
    }
    if (schema2.anyOf != null) {
      if (schema2.anyOf.every((subSchema) => test(value, subSchema, rootSchema) !== true)) {
        return cb("anyOf");
      }
    }
    if (schema2.allOf != null) {
      for (let subSchema of schema2.allOf) {
        const result = test(value, subSchema, rootSchema, params);
        if (result !== true) {
          return result;
        }
      }
    }
    if (onSuccess) {
      onSuccess(Object.assign({ schema: schema2, value }, params));
    }
    return true;
  };

  // node_modules-included/catpow/src/schema/methods/getMatchedSchemas.js
  var getMatchedSchemas = (value, schemas, rootSchema, params) => {
    return schemas.filter((schema2) => test(value, schema2, rootSchema, params) === true);
  };

  // node_modules-included/catpow/src/schema/methods/sanitize.js
  var sanitize = (value, schema2, rootSchema) => {
    const type = getType(schema2, rootSchema);
    schema2 = getResolvedSchema(schema2, rootSchema);
    if (value == null) {
      return value;
    }
    if (schema2.const != null && schema2.const !== value) {
      return schema2.const;
    }
    if (schema2.enum != null && !schema2.enum.includes(value)) {
      return null;
    }
    switch (type) {
      case "integer":
        if (!Number.isInteger(value)) {
          value = parseInt(value);
        }
      case "number": {
        if (typeof value !== "number") {
          parseFloat(value);
        }
        if (schema2.minimum != null && value < schema2.minimum) {
          value = schema2.minimum;
        }
        if (schema2.maximum != null && value > schema2.maximum) {
          value = schema2.maximum;
        }
        const step = schema2.multipleOf || 1;
        if (schema2.exclusiveMinimum != null) {
          if (typeof schema2.exclusiveMinimum === "boolean") {
            if (schema2.exclusiveMinimum === true && value <= schema2.minimum) {
              value = schema2.minimum + step;
            }
          } else {
            if (value <= schema2.exclusiveMinimum) {
              value = schema2.exclusiveMinimum + step;
            }
          }
        }
        if (schema2.exclusiveMaximum != null) {
          if (typeof schema2.exclusiveMaximum === "boolean") {
            if (schema2.exclusiveMaximum === true && value >= schema2.maximum) {
              value = schema2.maximum - step;
            }
          } else {
            if (value <= schema2.exclusiveMaximum) {
              value = schema2.exclusiveMaximum - step;
            }
          }
        }
        break;
      }
      case "string": {
        if (typeof value !== "string" && value.toString) {
          return value.toString();
        }
        break;
      }
      case "object": {
        if (typeof value !== "object" || Array.isArray(value)) {
          return {};
        }
        if (schema2.additionalProperties != null && schema2.additionalProperties === false) {
          for (let key2 in value) {
            if (!schema2.properties.hasOwnProperty(key2)) {
              delete value[key2];
            }
          }
        }
        break;
      }
    }
    return value;
  };

  // node_modules-included/catpow/src/schema/consts.js
  var consts_exports = {};
  __export(consts_exports, {
    conditionalSchemaKeys: () => conditionalSchemaKeys,
    minMaxKeys: () => minMaxKeys2,
    reservedKeys: () => reservedKeys,
    schemaStatusFlag: () => schemaStatusFlag,
    typeSpecificKeys: () => typeSpecificKeys
  });
  var schemaStatusFlag = Object.freeze({
    input: 1,
    validation: 2
  });
  var reservedKeys = Object.freeze({
    const: 1,
    enum: 1,
    oneOf: 1,
    anyOf: 1,
    $ref: 1,
    minimum: 1,
    maximum: 1,
    multipleOf: 1,
    minLength: 1,
    maxLength: 1,
    items: 1,
    prefixItems: 1,
    minItems: 1,
    maxItems: 1,
    contains: 1,
    minContains: 1,
    maxContains: 1,
    properties: 1,
    required: 1,
    dependencies: 1,
    dependentSchemas: 1,
    dependentRequired: 1
  });
  var typeSpecificKeys = Object.freeze({
    number: ["minimum", "maximum", "multipleOf"],
    string: ["minLength", "maxLength", "pattern"],
    array: ["items", "prefixItems", "minItems", "maxItems", "contains", "minContains", "maxContains"],
    object: [
      "properties",
      "minProperties",
      "maxProperties",
      "propertyNames",
      "patternProperties",
      "additionalProperties",
      "unevaluatedProperties",
      "required",
      "depndencies",
      "dependentSchemas",
      "dependentRequired"
    ]
  });
  var minMaxKeys2 = Object.freeze({
    minimum: false,
    maximum: true,
    minLength: false,
    maxLength: true,
    minItems: false,
    maxItems: true,
    minContains: false,
    maxContains: true
  });
  var conditionalSchemaKeys = Object.freeze({
    allOf: true,
    anyOf: true,
    oneOf: true,
    if: false,
    then: false,
    else: false,
    dependentSchemas: true
  });

  // node_modules-included/catpow/src/schema/methods/getMergedSchemaForValue.js
  var getMergedSchemaForValue = (value, schema2, rootSchema) => {
    if (rootSchema == null) {
      rootSchema = schema2;
    }
    const mergedSchema = {};
    find(
      (schema3) => {
        mergeSchema(mergedSchema, schema3, rootSchema, { extend: false, value });
      },
      schema2,
      rootSchema,
      { proactive: false }
    );
    return mergedSchema;
  };

  // node_modules-included/catpow/src/schema/methods/mergeSchema.js
  var mergeSchema = (targetSchema, schema2, rootSchema, params = {}) => {
    const { extend = false, initialize = true, value = null } = params;
    const forValue = params.hasOwnProperty("value");
    const includeConditional = forValue || params.includeConditional;
    for (let key2 in schema2) {
      if (!reservedKeys[key2] && targetSchema[key2] == null) {
        targetSchema[key2] = schema2[key2];
      }
    }
    if (schema2.const != null) {
      if (extend) {
        if (targetSchema.enum != null) {
          if (!targetSchema.enum) {
            targetSchema.enum = [];
          }
          if (!targetSchema.enum.includes(schema2.const)) {
            targetSchema.enum.push(schema2.const);
          }
        } else if (initialize) {
          targetSchema.const = schema2.const;
        }
      } else {
        targetSchema.const = schema2.const;
      }
    } else {
      if (extend && targetSchema.const != null) {
        targetSchema.const = null;
      }
      if (schema2.enum != null) {
        if (extend) {
          if (targetSchema.enum == null) {
            if (targetSchema.const != null) {
              targetSchema.enum = schema2.enum.slice();
              if (!targetSchema.enum.includes(targetSchema.cons)) {
                targetSchema.enum.push(targetSchema.const);
              }
              targetSchema.const = null;
            } else if (initialize) {
              targetSchema.enum = schema2.enum.slice();
            }
          } else {
            targetSchema.enum.push.apply(
              targetSchema.enum,
              schema2.enum.filter((val) => !targetSchema.enum.includes(val))
            );
          }
        } else {
          if (targetSchema.enum == null) {
            targetSchema.enum = schema2.enum.slice();
          } else {
            targetSchema.enum = targetSchema.enum.filter((val) => schema2.enum.includes(val));
          }
        }
      } else if (extend && targetSchema.enum != null) {
        targetSchema.enum = null;
      }
    }
    for (let key2 in minMaxKeys2) {
      if (schema2[key2] != null) {
        if (targetSchema[key2] != null) {
          targetSchema[key2] = Math[minMaxKeys2[key2] == extend ? "max" : "min"](targetSchema[key2], schema2[key2]);
        } else {
          if (initialize) {
            targetSchema[key2] = schema2[key2];
          }
        }
      } else if (extend && targetSchema[key2] != null) {
        targetSchema[key2] = null;
      }
    }
    if (schema2.multipleOf != null) {
      if (targetSchema.multipleOf != null) {
        targetSchema.multipleOf = Math.max(targetSchema.multipleOf, schema2.multipleOf);
      } else {
        if (initialize) {
          targetSchema.multipleOf = schema2.multipleOf;
        }
      }
    } else if (extend && targetSchema.multipleOf != null) {
      targetSchema.multipleOf = null;
    }
    if (schema2.required != null) {
      if (extend) {
        if (targetSchema.required !== null) {
          if (targetSchema.required == null) {
            targetSchema.required = schema2.required.slice();
          } else {
            targetSchema.required = targetSchema.required.filter((val) => schema2.required.includes(val));
          }
        }
      } else {
        if (targetSchema.required == null) {
          targetSchema.required = schema2.required.slice();
        } else {
          targetSchema.required.push.apply(
            targetSchema.required,
            schema2.required.filter((val) => !targetSchema.required.includes(val))
          );
        }
      }
    } else if (extend && targetSchema.required != null) {
      targetSchema.required = null;
    }
    if (schema2.properties != null) {
      if (targetSchema.properties == null) {
        targetSchema.properties = {};
      }
      for (let key2 in schema2.properties) {
        const propParams = Object.assign({}, params);
        if (forValue) {
          propParams.value = propParams.value[key2];
        }
        if (targetSchema.properties[key2] != null) {
          mergeSchema(targetSchema.properties[key2], schema2.properties[key2], rootSchema, propParams);
        } else {
          const propSchema = {};
          mergeSchema(propSchema, schema2.properties[key2], rootSchema, propParams);
          targetSchema.properties[key2] = propSchema;
        }
      }
    }
    if (schema2.items != null) {
      if (targetSchema.items == null) {
        targetSchema.items = getMergedSchema(schema2.items, rootSchema);
        if (forValue && value != null) {
          targetSchema.itemsForValue = [];
          for (let i2 in value) {
            targetSchema.itemsForValue.push(getMergedSchemaForValue(value[i2], schema2.items, rootSchema));
          }
        }
      }
    }
    if (!includeConditional) {
      return targetSchema;
    }
    const conditionalSchemas = [];
    if (schema2.oneOf != null) {
      conditionalSchemas.push.apply(conditionalSchemas, forValue ? getMatchedSchemas(value, schema2.oneOf, rootSchema, { ignoreRequired: true }) : schema2.oneOf);
    }
    if (schema2.anyOf != null) {
      conditionalSchemas.push.apply(conditionalSchemas, forValue ? getMatchedSchemas(value, schema2.anyOf, rootSchema, { ignoreRequired: true }) : schema2.anyOf);
    }
    const { dependentSchemas } = extractDependencies(schema2);
    if (dependentSchemas != null) {
      if (forValue) {
        for (let key2 in dependentSchemas) {
          if (value[key2] != null) {
            conditionalSchemas.push(dependentSchemas[key2]);
          }
        }
      } else {
        conditionalSchemas.push.apply(conditionalSchemas, Object.values(dependentSchemas));
      }
    }
    if (conditionalSchemas.length) {
      const mergedConditionalSchema = {};
      for (let i2 in conditionalSchemas) {
        if (forValue) {
          mergeSchema(mergedConditionalSchema, getMergedSchemaForValue(value, conditionalSchemas[i2], rootSchema), rootSchema, { extend: true, value });
        } else {
          mergeSchema(mergedConditionalSchema, getMergedSchemaForValue(value, conditionalSchemas[i2], rootSchema), rootSchema, { extend: true });
        }
      }
      mergeSchema(targetSchema, conditionalSchemas[i], rootSchema, params);
    }
    return targetSchema;
  };

  // node_modules-included/catpow/src/schema/methods/getMergedSchema.js
  var cache2 = /* @__PURE__ */ new WeakMap();
  var getMergedSchema = (schema2, rootSchema) => {
    if (rootSchema == null) {
      rootSchema = schema2;
    }
    if (cache2.has(schema2)) {
      return cache2.get(schema2);
    }
    const mergedSchema = {};
    find(
      (schema3) => {
        mergeSchema(mergedSchema, schema3, rootSchema, { extend: false });
      },
      schema2,
      rootSchema,
      { proactive: false }
    );
    cache2.set(schema2, mergedSchema);
    return mergedSchema;
  };

  // node_modules-included/catpow/src/schema/methods/getPrimaryPropertyName.js
  var getPrimaryPropertyName = (schema2, rootSchema) => {
    if (getType(schema2, rootSchema) !== "object") {
      return null;
    }
    const mergedSchema = getMergedSchema(schema2, rootSchema);
    if (mergedSchema.properties["@type"] != null) {
      return "@type";
    }
    return Object.keys(mergedSchema.properties).find((key2) => mergedSchema.properties[key2].enum != null);
  };

  // node_modules-included/catpow/src/schema/methods/mergeSchemas.js
  var mergeSchemas = (schemas, rootSchema, params = {}) => {
    const mergedSchema = {};
    schemas.forEach((schema2) => mergeSchema(mergedSchema, schema2, rootSchema, params));
    if (mergedSchema.properties != null) {
      const sortedProperties = {};
      Object.keys(mergedSchema.properties).sort((key1, key2) => {
        return (mergedSchema.properties[key1].order || 10) - (mergedSchema.properties[key2].order || 10);
      }).forEach((key2) => {
        sortedProperties[key2] = mergedSchema.properties[key2];
      });
      mergedSchema.properties = sortedProperties;
    }
    return mergedSchema;
  };

  // node_modules-included/catpow/src/schema/methods/getDefaultValue.js
  var getDefaultValue = (schema2, rootSchema) => {
    const type = getType(schema2, rootSchema);
    schema2 = getResolvedSchema(schema2, rootSchema);
    if (schema2.default != null) {
      return schema2.default;
    }
    if (schema2.const != null) {
      return schema2.const;
    }
    if (schema2.enum != null) {
      return schema2.enum[0];
    }
    switch (type) {
      case "null": {
        return null;
      }
      case "boolean": {
        return false;
      }
      case "integer":
      case "number": {
        if (schema2.minimum != null) {
          const unit2 = schema2.multipleOf != null ? schema2.multipleOf : 1;
          if (schema2.exclusiveMinimum === true) {
            return schema2.minimum + unit2;
          }
          return schema2.minimum;
        }
        if (schema2.exclusiveMinimum != null) {
          return schema2.exclusiveMinimum + unit;
        }
        return 0;
      }
      case "string": {
        return "";
      }
    }
    return null;
  };

  // node_modules-included/catpow/src/schema/functions/getPossibleTypes.js
  var getPossibleTypes = (schemas) => {
    const flags = {};
    schemas.forEach((schema2) => flags[schema2.type] = true);
    return flags;
  };

  // node_modules-included/catpow/src/schema/functions/walkDescendantSchema.js
  var walkDescendantSchema = (agent, schema2, cb) => {
    agent.walkChildren((child) => {
      for (let subSchema of child.matrix.schemas) {
        if (subSchema.parent === schema2) {
          if (cb(child, subSchema) !== false) {
            walkDescendantSchema(child, subSchema, cb);
          }
        }
      }
    });
  };

  // node_modules-included/catpow/src/schema/functions/debugLog.js
  var debugLog = (message, object) => {
    console.groupCollapsed(message);
    console.debug(object);
    console.trace();
    console.groupEnd();
  };

  // node_modules-included/catpow/src/schema/functions/createMatrix.js
  var updateHandles = /* @__PURE__ */ new WeakMap();
  var createMatrix = (schemas) => {
    const possibleTypes = getPossibleTypes(schemas);
    const curries = {
      on: (agent) => {
        return (type, callback, arg = null) => {
          if (agent.eventListeners[type] == null) {
            agent.eventListeners[type] = /* @__PURE__ */ new Map();
          }
          agent.eventListeners[type].set(callback, arg);
        };
      },
      off: (agent) => {
        return (type, callback) => {
          if (agent.eventListeners[type] == null) {
            return;
          }
          return agent.eventListeners[type].delete(callback);
        };
      },
      trigger: (agent) => {
        return (event2) => {
          if (typeof event2 === "string") {
            event2 = { type: event2, bubbles: true };
          }
          if (agent.debug) {
            debugLog(`\u26A1 trigger event '${event2.type}' on '${agent.key}'`, { event: event2, agent });
          }
          event2.target = agent;
          const cb = (agent2) => {
            if (agent2.eventListeners[event2.type] == null) {
              return true;
            }
            let stopPropagation = false;
            agent2.eventListeners[event2.type].forEach((arg, callback) => {
              if (callback(event2, arg) === false) {
                stopPropagation = true;
              }
            });
            return !stopPropagation;
          };
          if (cb(agent) !== false && event2.bubbles && agent.parent != null) {
            agent.parent.trigger(event2);
          }
        };
      },
      getAgent: (agent) => {
        return (path) => {
          if (!Array.isArray(path)) {
            path = path.split("/");
          }
          if (path.length === 0) {
            return agent;
          }
          const key2 = path.shift();
          if (isNaN(key2)) {
            return agent.properties[key2].getAgent(path);
          } else {
            const index = parseInt(key2);
            if (agent.prefixItems != null) {
              if (index < agent.prefixItems.length) {
                return agent.prefixItems[index].getAgent(path);
              } else {
                return agent.prefixItems[index - agent.prefixItems.length].getAgent(path);
              }
            } else {
              return agent.items[index].getAgent(path);
            }
          }
        };
      },
      walkChildren: (agent) => {
        return (cb) => {
          if (agent.properties != null) {
            for (let name in agent.properties) {
              cb(agent.properties[name]);
            }
          }
          if (agent.prefixItems != null) {
            for (let child of agent.prefixItems) {
              cb(child);
            }
          }
          if (agent.items != null) {
            for (let child of agent.items) {
              cb(child);
            }
          }
        };
      },
      getConditionalSchemaStatus: (agent) => {
        return (schema2) => {
          return agent.conditionalSchemaStatus.get(schema2);
        };
      },
      setConditionalSchemaStatus: (agent) => {
        return (schema2, status) => {
          if (agent.conditionalSchemaStatus.get(schema2) === status) {
            return status;
          }
          agent.conditionalSchemaStatus.set(schema2, status);
          if (agent.debug) {
            debugLog(`\u{1F511} conditionalSchemaStatus of '${agent.key}' was changed`, { schema: schema2, status });
          }
          agent.setSchemaStatus(schema2, (agent.parent == null ? 3 : agent.parent.getSchemaStatus(schema2.parent)) & status);
        };
      },
      getParentSchemaStatus: (agent) => {
        return (schema2) => {
          return agent.conditionalSchemaStatus.get(schema2);
        };
      },
      setConditionalRequiredFlag: (agent) => {
        return (schema2, flag) => {
          if (agent.conditionalRequiredFlag.get(schema2) === flag) {
            return flag;
          }
          agent.conditionalRequiredFlag.set(schema2, flag);
          agent.isReqired = false;
          for (let [schema3, flag2] of agent.conditionalRequiredFlag.entries()) {
            if (flag2 && agent.getSchemaStatus(schema3) & 1) {
              agent.isReqired = true;
              break;
            }
          }
        };
      },
      getSchemaStatus: (agent) => {
        return (schema2) => {
          if (agent.schemaStatus == null || !agent.schemaStatus.has(schema2)) {
            return 1;
          }
          return agent.schemaStatus.get(schema2);
        };
      },
      setSchemaStatus: (agent) => {
        return (schema2, status) => {
          if (agent.schemaStatus.get(schema2) === status) {
            return status;
          }
          agent.schemaStatus.set(schema2, status);
          if (agent.debug) {
            debugLog(`\u{1F511} schemaStatus of '${agent.key}' was changed`, { schema: schema2, status });
          }
          walkDescendantSchema(agent, schema2, (agent2, schema3) => {
            const currentStatus = agent2.schemaStatus.get(schema3);
            let status2 = agent2.parent.schemaStatus.get(schema3.parent);
            if (agent2.conditionalSchemaStatus.has(schema3)) {
              status2 &= agent2.conditionalSchemaStatus.get(schema3);
              let container = schema3.container;
              while (agent2.conditionalSchemaStatus.has(container)) {
                status2 &= agent2.conditionalSchemaStatus.get(container);
                container = container.container;
              }
            }
            if (status2 === currentStatus) {
              return false;
            }
            agent2.schemaStatus.set(schema3, status2);
          });
        };
      },
      getSchemas: (agent) => {
        return (status) => {
          return schemas.filter((schema2) => (agent.getSchemaStatus(schema2) & status) != 0);
        };
      },
      getSchemasForInput: (agent) => {
        return () => agent.getSchemas(1);
      },
      getSchemasForValidation: (agent) => {
        return () => agent.getSchemas(2);
      },
      getMergedSchema: (agent) => {
        const cache3 = {};
        return (status = 1, extend = true) => {
          const key2 = agent.getMergedSchemaKey(status, extend);
          if (cache3[key2] != null) {
            return cache3[key2];
          }
          cache3[key2] = mergeSchemas(agent.getSchemas(status), agent.rootSchema, extend);
          return cache3[key2];
        };
      },
      getMergedSchemaKey: (agent) => {
        return (status = 1, extend = true) => {
          return Array.from(agent.schemaStatus.values()).join("") + "-" + status + (extend ? "-e" : "");
        };
      },
      getMergedSchemaForInput: (agent) => {
        return () => agent.getMergedSchema(1, true);
      },
      getMergedSchemaForValidation: (agent) => {
        return () => agent.getMergedSchema(2, false);
      },
      getValue: (agent) => {
        return (getDefaultValueIfEmpty = true) => {
          if (agent.value == null && getDefaultValueIfEmpty) {
            return getDefaultValue(agent.getMergedSchemaForInput(), agent.rootSchema);
          }
          return agent.value;
        };
      },
      setValue: (agent) => {
        return (value) => {
          agent.value = value;
          agent.trigger({ type: "change", bubbles: true });
          if (agent.debug) {
            debugLog(`\u{1F4DD} change value for '${agent.key}'`, { value });
          }
        };
      },
      deleteValue: (agent) => {
        return () => {
          agent.value = null;
          agent.trigger({ type: "change", bubbles: true });
        };
      },
      update: (agent) => {
        return () => {
          if (agent.debug) {
            debugLog(`\u2699\uFE0F update process for '${agent.key}' start`, { agent });
          }
          if (agent.value == null) {
            delete agent.ref[agent.key];
          } else {
            agent.ref[agent.key] = agent.value;
          }
          if (agent.parent != null) {
            agent.parent.update();
          }
          updateHandles.get(agent.matrix)(agent);
          agent.validate();
          if (!agent.isValid) {
            agent.trigger({ type: "error", bubbles: false });
          }
          agent.trigger({ type: "update", bubbles: false });
          if (agent.debug) {
            debugLog(`\u2699\uFE0F update process for '${agent.key}' end`, { agent });
          }
        };
      },
      validate: (agent) => {
        return () => {
          agent.isValid = agent.getSchemasForValidation().every((schema2) => {
            return test(agent.value, schema2, agent.rootSchema, {
              onSuccess: (params) => {
                agent.setMessage(null);
              },
              onError: (params) => {
                if (agent.debug) {
                  debugLog("\u26A0\uFE0F invalid value was found", params);
                }
                agent.setMessage(getErrorMessage(params));
                agent.trigger({ type: "error", bubble: false });
                return false;
              }
            });
          });
          agent.trigger({ type: "validate", bubbles: false });
        };
      },
      initialize: (agent) => {
        return () => {
          if (agent.value == null) {
            agent.value = getDefaultValue(agent.getMergedSchemaForInput(), agent.rootSchema);
          }
          agent.walkChildren((agent2) => agent2.initialize());
          updateHandles.get(agent.matrix)(agent);
          agent.trigger({ type: "initialize", bubbles: false });
        };
      },
      sanitize: (agent) => {
        return () => {
          let value = agent.getValue();
          const schemas2 = agent.getSchemasForValidation();
          for (const schema2 of schemas2) {
            value = sanitize(value, schema2, agent.rootSchema);
          }
          if (value !== agent.getValue()) {
            agent.setValue(value);
          }
          agent.walkChildren((agent2) => agent2.sanitize());
          updateHandles.get(agent.matrix)(agent);
          agent.trigger({ type: "sanitize", bubbles: false });
        };
      },
      getMessage: (agent) => {
        return () => agent.message;
      },
      setMessage: (agent) => {
        return (message) => {
          agent.message = message;
        };
      },
      getProperties: (agent) => {
        return () => {
          return agent.properties;
        };
      },
      getPrefixItems: (agent) => {
        return () => {
          return agent.prefixItems;
        };
      },
      getItems: (agent) => {
        return () => {
          return agent.items;
        };
      },
      addItem: (agent) => {
        return (index, value) => {
          if (value == null) {
            value = typeof agent.value[index - 1] === "object" ? JSON.parse(JSON.stringify(agent.value[index - 1])) : agent.value[index - 1];
          }
          const item = createAgent(agent.matrix.items, agent.value, index, value, agent.parent);
          agent.value.splice(index, 0, value);
          agent.items.splice(index, 0, item);
          agent.items.forEach((item2, index2) => item2.key = index2);
          item.initialize();
          agent.trigger({ type: "addItem", bubbles: false });
          agent.trigger({ type: "modifyItems", bubbles: false });
        };
      },
      copyItem: (agent) => {
        return (from, to) => {
          agent.addItem(to, JSON.parse(JSON.stringify(agent.items[from].getValue())));
        };
      },
      moveItem: (agent) => {
        return (from, to) => {
          agent.items.splice(to, 0, agent.items.splice(from, 1)[0]);
          agent.items.forEach((item, index) => item.key = index);
          agent.trigger({ type: "moveItem", bubbles: false });
          agent.trigger({ type: "modifyItems", bubbles: false });
        };
      },
      removeItem: (agent) => {
        return (index) => {
          agent.value.splice(index, 1);
          agent.items.splice(index, 1);
          agent.items.forEach((item, index2) => item.key = index2);
          agent.trigger({ type: "removeItem", bubbles: false });
          agent.trigger({ type: "modifyItems", bubbles: false });
        };
      }
    };
    return { possibleTypes, curries, schemas };
  };

  // node_modules-included/catpow/src/schema/functions/getUnlimietedSchema.js
  var getUnlimietedSchema = (schema2) => {
    const unlimitedSchema = Object.assign({}, schema2);
    delete unlimitedSchema.enum;
    delete unlimitedSchema.const;
    for (let key2 in minMaxKeys) {
      if (unlimitedSchema[key2] != null) {
        delete unlimitedSchema[key2];
      }
    }
    return unlimitedSchema;
  };

  // node_modules-included/catpow/src/schema/functions/getMatrix.js
  var getMatrix = (originalSchemas) => {
    const updateHandlesList = [];
    const schemas = originalSchemas.slice();
    const registerSchema = (schema2) => {
      if (schema2.if != null) {
        schemas.push(getUnlimietedSchema(schema2.if));
        updateHandlesList.push((agent) => {
          const isValid = test(agent.getValue(), schema2.if, agent.rootSchema);
          if (schema2.then != null) {
            agent.setConditionalSchemaStatus(schema2.then, isValid ? 3 : 0);
          }
          if (schema2.else != null) {
            agent.setConditionalSchemaStatus(schema2.else, isValid ? 0 : 3);
          }
        });
      }
      if (schema2.allOf != null) {
        schemas.push.apply(schemas, schema2.allOf);
      }
      if (schema2.anyOf != null) {
        schemas.push.apply(schemas, schema2.anyOf);
        const keyPropertyNames = Object.keys(schema2.properties);
        updateHandlesList.push((agent) => {
          schema2.anyOf.forEach((subSchema) => {
            if (subSchema.properties == null) {
              return;
            }
            const isValid = keyPropertyNames.every((keyPropertyName) => {
              return subSchema.properties[keyPropertyName] == null || test(agent.properties[keyPropertyName].getValue(), subSchema.properties[keyPropertyName], agent.rootSchema);
            });
            agent.setConditionalSchemaStatus(subSchema, isValid ? 3 : 0);
            keyPropertyNames.forEach((keyPropertyName) => {
              if (subSchema.properties[keyPropertyName] == null) {
                return;
              }
              agent.properties[keyPropertyName].setConditionalSchemaStatus(subSchema.properties[keyPropertyName], 0);
            });
          });
        });
      }
      if (schema2.oneOf != null) {
        schemas.push.apply(schemas, schema2.oneOf);
        const keyPropertyNames = Object.keys(schema2.properties);
        updateHandlesList.push((agent) => {
          schema2.oneOf.forEach((subSchema) => {
            if (subSchema.properties == null) {
              return;
            }
            const isValid = keyPropertyNames.every((keyPropertyName) => {
              return subSchema.properties[keyPropertyName] == null || test(agent.properties[keyPropertyName].getValue(), subSchema.properties[keyPropertyName], agent.rootSchema);
            });
            agent.setConditionalSchemaStatus(subSchema, isValid ? 3 : 0);
            keyPropertyNames.forEach((keyPropertyName) => {
              if (subSchema.properties[keyPropertyName] == null) {
                return;
              }
              agent.properties[keyPropertyName].setConditionalSchemaStatus(subSchema.properties[keyPropertyName], 0);
            });
          });
        });
      }
      const { dependentRequired, dependentSchemas } = extractDependencies(schema2);
      if (dependentSchemas != null) {
        for (let name in dependentSchemas) {
          schemas.push(dependentSchemas[name]);
        }
        updateHandlesList.push((agent) => {
          const value = agent.getValue();
          for (let name in dependentSchemas) {
            agent.setConditionalSchemaStatus(dependentSchemas[name], value[name] != null ? 3 : 0);
          }
        });
      }
      if (dependentRequired != null) {
        updateHandlesList.push((agent) => {
          const value = agent.getValue();
          for (let name in dependentRequired) {
            const flag = value[name] != null;
            dependentRequired[name].forEach((name2) => {
              agent.properties[name2].setConditionalRequiredFlag(schema2, flag);
            });
          }
        });
      }
    };
    for (let i2 = 0; i2 < schemas.length; i2++) {
      registerSchema(schemas[i2]);
    }
    const matrix = createMatrix(schemas);
    updateHandles.set(matrix, (agent) => {
      updateHandlesList.forEach((cb) => cb(agent));
    });
    schemas.forEach((schema2) => {
      if (schema2.properties != null) {
        if (matrix.properties == null) {
          matrix.properties = {};
        }
        for (let key2 in schema2.properties) {
          if (matrix.properties[key2] == null) {
            matrix.properties[key2] = [];
          }
          matrix.properties[key2].push(schema2.properties[key2]);
        }
      }
      if (schema2.prefixItems != null) {
        if (matrix.prefixItems == null) {
          matrix.prefixItems = [];
        }
        for (let index in schema2.prefixItems) {
          if (matrix.prefixItems[index] == null) {
            matrix.prefixItems[index] = [];
          }
          matrix.prefixItems[index].push(schema2.prefixItems[index]);
        }
      }
      if (schema2.items != null) {
        if (matrix.items == null) {
          matrix.items = [];
        }
        matrix.items.push(schema2.items);
      }
    });
    if (matrix.properties != null) {
      for (let key2 in matrix.properties) {
        matrix.properties[key2] = getMatrix(matrix.properties[key2]);
      }
    }
    if (matrix.prefixItems != null) {
      for (let index in matrix.prefixItems) {
        matrix.prefixItems[index] = getMatrix(matrix.prefixItems[index]);
      }
    }
    if (matrix.items != null) {
      matrix.items = getMatrix(matrix.items);
    }
    return matrix;
  };

  // node_modules-included/catpow/src/schema/functions/resolveSchema.js
  var resolveSchema = (uri, schema2, rootSchema, param) => {
    const resolvedSchema = getResolvedSchema(schema2, rootSchema);
    Object.assign(resolvedSchema, param);
    if (resolvedSchema.$ref != null) {
      delete resolvedSchema.$ref;
    }
    const { parent } = param;
    for (let conditionalSchemaKey in conditionalSchemaKeys) {
      if (resolvedSchema[conditionalSchemaKey] == null) {
        continue;
      }
      if (conditionalSchemaKeys[conditionalSchemaKey]) {
        for (let key2 in resolvedSchema[conditionalSchemaKey]) {
          resolvedSchema[conditionalSchemaKey][key2] = resolveSchema(uri, resolvedSchema[conditionalSchemaKey][key2], rootSchema, { parent, isConditional: true, container: resolvedSchema });
        }
      } else {
        resolvedSchema[conditionalSchemaKey] = resolveSchema(uri, resolvedSchema[conditionalSchemaKey], rootSchema, { parent, isConditional: true, container: resolvedSchema });
      }
    }
    const { dependentSchemas } = extractDependencies(resolvedSchema);
    if (dependentSchemas != null) {
      for (let propertyName in dependentSchemas) {
        dependentSchemas[propertyName] = resolveSchema(uri, dependentSchemas[propertyName], rootSchema, { parent, isConditional: true });
      }
    }
    if (resolvedSchema.properties != null) {
      for (let key2 in resolvedSchema.properties) {
        resolvedSchema.properties[key2] = resolveSchema(uri + "/" + key2, resolvedSchema.properties[key2], rootSchema, { parent: resolvedSchema });
      }
      if (resolvedSchema.required) {
        for (let key2 of resolvedSchema.required) {
          if (resolvedSchema.properties[key2]) {
            resolvedSchema.properties[key2].isRequired = true;
          }
        }
      }
    }
    if (resolvedSchema.prefixItems != null) {
      for (let index in resolvedSchema.prefixItems) {
        resolvedSchema.prefixItems[index] = resolveSchema(uri + "/" + index, resolvedSchema.prefixItems[index], rootSchema, { parent: resolvedSchema });
      }
    }
    if (resolvedSchema.items != null) {
      resolvedSchema.items = resolveSchema(uri + "/$", resolvedSchema.items, rootSchema, { parent: resolvedSchema });
    }
    return resolvedSchema;
  };

  // node_modules-included/catpow/src/schema/main.js
  var main = (originalRootSchema, matrixParams = {}) => {
    const { debug = false } = matrixParams;
    const rootSchema = JSON.parse(JSON.stringify(originalRootSchema));
    const resolvedRootSchema = resolveSchema("#", rootSchema, rootSchema, {});
    if (debug) {
      debugLog("\u2728 resolve rootSchema", { originalRootSchema, resolvedRootSchema });
    }
    const rootMatrix = getMatrix([resolvedRootSchema]);
    rootMatrix.createAgent = (data, agentParams) => {
      agentParams = { ...matrixParams, ...agentParams };
      const rootAgent = createAgent(rootMatrix, { data }, "data", data, null, agentParams);
      rootAgent.initialize();
      if (debug) {
        debugLog("\u2728 rootAgent was created", { rootAgent });
      }
      return rootAgent;
    };
    if (debug) {
      debugLog("\u2728 rootMatrix was created", { rootMatrix });
    }
    return rootMatrix;
  };

  // node_modules-included/catpow/src/schema/index.js
  var schema = Object.assign(main, consts_exports, methods_exports);

  // node_modules-included/catpow/src/component/JsonEditor/JsonEditor.tsx
  var DataContext = createContext({});
  var JsonEditor = (props) => {
    const { className = "cp-jsoneditor-editor", title = "JsonEditor", debug = false, onChange, autoSave = false, showHeader = true, children: getAdditionalInputComponent } = props;
    const [hasChange, setHasChange] = useState(false);
    const json = useMemo(() => {
      if (typeof props.json === "object") {
        return props.json;
      }
      const json2 = JSON.parse(props.json);
      if (json2 == null) {
        return null;
      }
      return json2;
    }, []);
    const rootAgent = useMemo(() => {
      const rootAgent2 = schema(props.schema, { debug }).createAgent(json);
      rootAgent2.on("change", (e) => {
        setHasChange(true);
      });
      return rootAgent2;
    }, [props.schema]);
    const save = useCallback(() => {
      onChange(typeof props.json === "object" ? rootAgent.value : JSON.stringify(rootAgent.value));
      setHasChange(false);
    }, [rootAgent, setHasChange, onChange]);
    const data = useMemo(() => {
      return { getAdditionalInputComponent };
    }, [getAdditionalInputComponent]);
    useEffect(() => {
      let timer, isHold = false;
      const cb = (e) => {
        if (autoSave) {
          if (!isHold) {
            save();
            isHold = true;
            setTimeout(
              () => {
                isHold = false;
              },
              autoSave === true ? 1e3 : autoSave
            );
          } else {
            clearTimeout(timer);
            timer = setTimeout(save, autoSave === true ? 1e3 : autoSave);
          }
        }
      };
      rootAgent.on("update", cb);
      return () => rootAgent.off("update", cb);
    }, [rootAgent, setHasChange, save]);
    return /* @__PURE__ */ wp.element.createElement(DataContext.Provider, { value: data }, /* @__PURE__ */ wp.element.createElement(Bem, null, /* @__PURE__ */ wp.element.createElement("div", { className }, /* @__PURE__ */ wp.element.createElement("div", { className: "_body" }, showHeader && /* @__PURE__ */ wp.element.createElement("div", { className: "_header" }, /* @__PURE__ */ wp.element.createElement("div", { className: "_title" }, title), /* @__PURE__ */ wp.element.createElement("div", { className: "_controls" }, /* @__PURE__ */ wp.element.createElement("div", { className: clsx_default("_save", { "is-active": hasChange }), onClick: () => save() }, "Save"))), /* @__PURE__ */ wp.element.createElement("div", { className: "_contents" }, /* @__PURE__ */ wp.element.createElement(ObjectInput, { agent: rootAgent }))))));
  };
  JsonEditor.Input = Input;
  JsonEditor.DataContext = DataContext;

  // ../components/JsonEditor/component.jsx
  window.Catpow.JsonEditor = JsonEditor;
})();
