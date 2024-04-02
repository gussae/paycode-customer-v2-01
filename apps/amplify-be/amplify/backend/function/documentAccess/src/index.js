"use strict";
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

// ../../../../node_modules/@smithy/types/dist-cjs/index.js
var require_dist_cjs = __commonJS({
  "../../../../node_modules/@smithy/types/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name = (target, value) => __defProp2(target, "name", { value, configurable: true });
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var src_exports2 = {};
    __export2(src_exports2, {
      AlgorithmId: () => AlgorithmId,
      EndpointURLScheme: () => EndpointURLScheme,
      FieldPosition: () => FieldPosition,
      HttpApiKeyAuthLocation: () => HttpApiKeyAuthLocation,
      HttpAuthLocation: () => HttpAuthLocation,
      IniSectionType: () => IniSectionType,
      RequestHandlerProtocol: () => RequestHandlerProtocol,
      SMITHY_CONTEXT_KEY: () => SMITHY_CONTEXT_KEY,
      getDefaultClientConfiguration: () => getDefaultClientConfiguration,
      resolveDefaultRuntimeConfig: () => resolveDefaultRuntimeConfig
    });
    module2.exports = __toCommonJS2(src_exports2);
    var HttpAuthLocation = /* @__PURE__ */ ((HttpAuthLocation2) => {
      HttpAuthLocation2["HEADER"] = "header";
      HttpAuthLocation2["QUERY"] = "query";
      return HttpAuthLocation2;
    })(HttpAuthLocation || {});
    var HttpApiKeyAuthLocation = /* @__PURE__ */ ((HttpApiKeyAuthLocation2) => {
      HttpApiKeyAuthLocation2["HEADER"] = "header";
      HttpApiKeyAuthLocation2["QUERY"] = "query";
      return HttpApiKeyAuthLocation2;
    })(HttpApiKeyAuthLocation || {});
    var EndpointURLScheme = /* @__PURE__ */ ((EndpointURLScheme2) => {
      EndpointURLScheme2["HTTP"] = "http";
      EndpointURLScheme2["HTTPS"] = "https";
      return EndpointURLScheme2;
    })(EndpointURLScheme || {});
    var AlgorithmId = /* @__PURE__ */ ((AlgorithmId2) => {
      AlgorithmId2["MD5"] = "md5";
      AlgorithmId2["CRC32"] = "crc32";
      AlgorithmId2["CRC32C"] = "crc32c";
      AlgorithmId2["SHA1"] = "sha1";
      AlgorithmId2["SHA256"] = "sha256";
      return AlgorithmId2;
    })(AlgorithmId || {});
    var getChecksumConfiguration = /* @__PURE__ */ __name((runtimeConfig) => {
      const checksumAlgorithms = [];
      if (runtimeConfig.sha256 !== void 0) {
        checksumAlgorithms.push({
          algorithmId: () => "sha256",
          checksumConstructor: () => runtimeConfig.sha256
        });
      }
      if (runtimeConfig.md5 != void 0) {
        checksumAlgorithms.push({
          algorithmId: () => "md5",
          checksumConstructor: () => runtimeConfig.md5
        });
      }
      return {
        _checksumAlgorithms: checksumAlgorithms,
        addChecksumAlgorithm(algo) {
          this._checksumAlgorithms.push(algo);
        },
        checksumAlgorithms() {
          return this._checksumAlgorithms;
        }
      };
    }, "getChecksumConfiguration");
    var resolveChecksumRuntimeConfig = /* @__PURE__ */ __name((clientConfig) => {
      const runtimeConfig = {};
      clientConfig.checksumAlgorithms().forEach((checksumAlgorithm) => {
        runtimeConfig[checksumAlgorithm.algorithmId()] = checksumAlgorithm.checksumConstructor();
      });
      return runtimeConfig;
    }, "resolveChecksumRuntimeConfig");
    var getDefaultClientConfiguration = /* @__PURE__ */ __name((runtimeConfig) => {
      return {
        ...getChecksumConfiguration(runtimeConfig)
      };
    }, "getDefaultClientConfiguration");
    var resolveDefaultRuntimeConfig = /* @__PURE__ */ __name((config) => {
      return {
        ...resolveChecksumRuntimeConfig(config)
      };
    }, "resolveDefaultRuntimeConfig");
    var FieldPosition = /* @__PURE__ */ ((FieldPosition2) => {
      FieldPosition2[FieldPosition2["HEADER"] = 0] = "HEADER";
      FieldPosition2[FieldPosition2["TRAILER"] = 1] = "TRAILER";
      return FieldPosition2;
    })(FieldPosition || {});
    var SMITHY_CONTEXT_KEY = "__smithy_context";
    var IniSectionType = /* @__PURE__ */ ((IniSectionType2) => {
      IniSectionType2["PROFILE"] = "profile";
      IniSectionType2["SSO_SESSION"] = "sso-session";
      IniSectionType2["SERVICES"] = "services";
      return IniSectionType2;
    })(IniSectionType || {});
    var RequestHandlerProtocol = /* @__PURE__ */ ((RequestHandlerProtocol2) => {
      RequestHandlerProtocol2["HTTP_0_9"] = "http/0.9";
      RequestHandlerProtocol2["HTTP_1_0"] = "http/1.0";
      RequestHandlerProtocol2["TDS_8_0"] = "tds/8.0";
      return RequestHandlerProtocol2;
    })(RequestHandlerProtocol || {});
  }
});

// ../../../../node_modules/@smithy/protocol-http/dist-cjs/index.js
var require_dist_cjs2 = __commonJS({
  "../../../../node_modules/@smithy/protocol-http/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name = (target, value) => __defProp2(target, "name", { value, configurable: true });
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var src_exports2 = {};
    __export2(src_exports2, {
      Field: () => Field,
      Fields: () => Fields,
      HttpRequest: () => HttpRequest,
      HttpResponse: () => HttpResponse,
      getHttpHandlerExtensionConfiguration: () => getHttpHandlerExtensionConfiguration,
      isValidHostname: () => isValidHostname,
      resolveHttpHandlerRuntimeConfig: () => resolveHttpHandlerRuntimeConfig
    });
    module2.exports = __toCommonJS2(src_exports2);
    var getHttpHandlerExtensionConfiguration = /* @__PURE__ */ __name((runtimeConfig) => {
      let httpHandler = runtimeConfig.httpHandler;
      return {
        setHttpHandler(handler2) {
          httpHandler = handler2;
        },
        httpHandler() {
          return httpHandler;
        },
        updateHttpClientConfig(key, value) {
          httpHandler.updateHttpClientConfig(key, value);
        },
        httpHandlerConfigs() {
          return httpHandler.httpHandlerConfigs();
        }
      };
    }, "getHttpHandlerExtensionConfiguration");
    var resolveHttpHandlerRuntimeConfig = /* @__PURE__ */ __name((httpHandlerExtensionConfiguration) => {
      return {
        httpHandler: httpHandlerExtensionConfiguration.httpHandler()
      };
    }, "resolveHttpHandlerRuntimeConfig");
    var import_types = require_dist_cjs();
    var _Field = class _Field {
      constructor({ name, kind = import_types.FieldPosition.HEADER, values = [] }) {
        this.name = name;
        this.kind = kind;
        this.values = values;
      }
      /**
       * Appends a value to the field.
       *
       * @param value The value to append.
       */
      add(value) {
        this.values.push(value);
      }
      /**
       * Overwrite existing field values.
       *
       * @param values The new field values.
       */
      set(values) {
        this.values = values;
      }
      /**
       * Remove all matching entries from list.
       *
       * @param value Value to remove.
       */
      remove(value) {
        this.values = this.values.filter((v) => v !== value);
      }
      /**
       * Get comma-delimited string.
       *
       * @returns String representation of {@link Field}.
       */
      toString() {
        return this.values.map((v) => v.includes(",") || v.includes(" ") ? `"${v}"` : v).join(", ");
      }
      /**
       * Get string values as a list
       *
       * @returns Values in {@link Field} as a list.
       */
      get() {
        return this.values;
      }
    };
    __name(_Field, "Field");
    var Field = _Field;
    var _Fields = class _Fields {
      constructor({ fields = [], encoding = "utf-8" }) {
        this.entries = {};
        fields.forEach(this.setField.bind(this));
        this.encoding = encoding;
      }
      /**
       * Set entry for a {@link Field} name. The `name`
       * attribute will be used to key the collection.
       *
       * @param field The {@link Field} to set.
       */
      setField(field) {
        this.entries[field.name.toLowerCase()] = field;
      }
      /**
       *  Retrieve {@link Field} entry by name.
       *
       * @param name The name of the {@link Field} entry
       *  to retrieve
       * @returns The {@link Field} if it exists.
       */
      getField(name) {
        return this.entries[name.toLowerCase()];
      }
      /**
       * Delete entry from collection.
       *
       * @param name Name of the entry to delete.
       */
      removeField(name) {
        delete this.entries[name.toLowerCase()];
      }
      /**
       * Helper function for retrieving specific types of fields.
       * Used to grab all headers or all trailers.
       *
       * @param kind {@link FieldPosition} of entries to retrieve.
       * @returns The {@link Field} entries with the specified
       *  {@link FieldPosition}.
       */
      getByType(kind) {
        return Object.values(this.entries).filter((field) => field.kind === kind);
      }
    };
    __name(_Fields, "Fields");
    var Fields = _Fields;
    var _HttpRequest = class _HttpRequest2 {
      constructor(options) {
        this.method = options.method || "GET";
        this.hostname = options.hostname || "localhost";
        this.port = options.port;
        this.query = options.query || {};
        this.headers = options.headers || {};
        this.body = options.body;
        this.protocol = options.protocol ? options.protocol.slice(-1) !== ":" ? `${options.protocol}:` : options.protocol : "https:";
        this.path = options.path ? options.path.charAt(0) !== "/" ? `/${options.path}` : options.path : "/";
        this.username = options.username;
        this.password = options.password;
        this.fragment = options.fragment;
      }
      static isInstance(request) {
        if (!request)
          return false;
        const req = request;
        return "method" in req && "protocol" in req && "hostname" in req && "path" in req && typeof req["query"] === "object" && typeof req["headers"] === "object";
      }
      clone() {
        const cloned = new _HttpRequest2({
          ...this,
          headers: { ...this.headers }
        });
        if (cloned.query)
          cloned.query = cloneQuery(cloned.query);
        return cloned;
      }
    };
    __name(_HttpRequest, "HttpRequest");
    var HttpRequest = _HttpRequest;
    function cloneQuery(query) {
      return Object.keys(query).reduce((carry, paramName) => {
        const param = query[paramName];
        return {
          ...carry,
          [paramName]: Array.isArray(param) ? [...param] : param
        };
      }, {});
    }
    __name(cloneQuery, "cloneQuery");
    var _HttpResponse = class _HttpResponse {
      constructor(options) {
        this.statusCode = options.statusCode;
        this.reason = options.reason;
        this.headers = options.headers || {};
        this.body = options.body;
      }
      static isInstance(response) {
        if (!response)
          return false;
        const resp = response;
        return typeof resp.statusCode === "number" && typeof resp.headers === "object";
      }
    };
    __name(_HttpResponse, "HttpResponse");
    var HttpResponse = _HttpResponse;
    function isValidHostname(hostname) {
      const hostPattern = /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/;
      return hostPattern.test(hostname);
    }
    __name(isValidHostname, "isValidHostname");
  }
});

// ../../../../node_modules/tslib/tslib.es6.mjs
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
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) {
    if (f !== void 0 && typeof f !== "function")
      throw new TypeError("Function expected");
    return f;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context = {};
    for (var p in contextIn)
      context[p] = p === "access" ? {} : contextIn[p];
    for (var p in contextIn.access)
      context.access[p] = contextIn.access[p];
    context.addInitializer = function(f) {
      if (done)
        throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f || null));
    };
    var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0)
        continue;
      if (result === null || typeof result !== "object")
        throw new TypeError("Object expected");
      if (_ = accept(result.get))
        descriptor.get = _;
      if (_ = accept(result.set))
        descriptor.set = _;
      if (_ = accept(result.init))
        initializers.unshift(_);
    } else if (_ = accept(result)) {
      if (kind === "field")
        initializers.unshift(_);
      else
        descriptor[key] = _;
    }
  }
  if (target)
    Object.defineProperty(target, contextIn.name, descriptor);
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
  if (typeof name === "symbol")
    name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(metadataKey, metadataValue);
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
    if (t[0] & 1)
      throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f)
      throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _)
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
          return t;
        if (y = 0, t)
          op = [op[0] & 2, t.value];
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
            if (t[2])
              _.ops.pop();
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
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __exportStar(m, o) {
  for (var p in m)
    if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
      __createBinding(o, m, p);
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m)
    return m.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function() {
        if (o && i >= o.length)
          o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
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
  for (var s = 0, i = 0, il = arguments.length; i < il; i++)
    s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
      r[k] = a[j];
  return r;
}
function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function verb(n) {
    if (g[n])
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length)
      resume(q[0][0], q[0][1]);
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
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
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
  if (mod && mod.__esModule)
    return mod;
  var result = {};
  if (mod != null) {
    for (var k in mod)
      if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
        __createBinding(result, mod, k);
  }
  __setModuleDefault(result, mod);
  return result;
}
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : { default: mod };
}
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || typeof receiver !== "object" && typeof receiver !== "function")
    throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}
function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function")
      throw new TypeError("Object expected.");
    var dispose;
    if (async) {
      if (!Symbol.asyncDispose)
        throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose)
        throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
    }
    if (typeof dispose !== "function")
      throw new TypeError("Object not disposable.");
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
  function next() {
    while (env.stack.length) {
      var rec = env.stack.pop();
      try {
        var result = rec.dispose && rec.dispose.call(rec.value);
        if (rec.async)
          return Promise.resolve(result).then(next, function(e) {
            fail(e);
            return next();
          });
      } catch (e) {
        fail(e);
      }
    }
    if (env.hasError)
      throw env.error;
  }
  return next();
}
var extendStatics, __assign, __createBinding, __setModuleDefault, _SuppressedError, tslib_es6_default;
var init_tslib_es6 = __esm({
  "../../../../node_modules/tslib/tslib.es6.mjs"() {
    extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    __assign = function() {
      __assign = Object.assign || function __assign3(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    __createBinding = Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    };
    __setModuleDefault = Object.create ? function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
    } : function(o, v) {
      o["default"] = v;
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
      __disposeResources
    };
  }
});

// ../../../../node_modules/@aws-crypto/sha256-js/build/main/constants.js
var require_constants = __commonJS({
  "../../../../node_modules/@aws-crypto/sha256-js/build/main/constants.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.MAX_HASHABLE_LENGTH = exports2.INIT = exports2.KEY = exports2.DIGEST_LENGTH = exports2.BLOCK_SIZE = void 0;
    exports2.BLOCK_SIZE = 64;
    exports2.DIGEST_LENGTH = 32;
    exports2.KEY = new Uint32Array([
      1116352408,
      1899447441,
      3049323471,
      3921009573,
      961987163,
      1508970993,
      2453635748,
      2870763221,
      3624381080,
      310598401,
      607225278,
      1426881987,
      1925078388,
      2162078206,
      2614888103,
      3248222580,
      3835390401,
      4022224774,
      264347078,
      604807628,
      770255983,
      1249150122,
      1555081692,
      1996064986,
      2554220882,
      2821834349,
      2952996808,
      3210313671,
      3336571891,
      3584528711,
      113926993,
      338241895,
      666307205,
      773529912,
      1294757372,
      1396182291,
      1695183700,
      1986661051,
      2177026350,
      2456956037,
      2730485921,
      2820302411,
      3259730800,
      3345764771,
      3516065817,
      3600352804,
      4094571909,
      275423344,
      430227734,
      506948616,
      659060556,
      883997877,
      958139571,
      1322822218,
      1537002063,
      1747873779,
      1955562222,
      2024104815,
      2227730452,
      2361852424,
      2428436474,
      2756734187,
      3204031479,
      3329325298
    ]);
    exports2.INIT = [
      1779033703,
      3144134277,
      1013904242,
      2773480762,
      1359893119,
      2600822924,
      528734635,
      1541459225
    ];
    exports2.MAX_HASHABLE_LENGTH = Math.pow(2, 53) - 1;
  }
});

// ../../../../node_modules/@aws-crypto/sha256-js/build/main/RawSha256.js
var require_RawSha256 = __commonJS({
  "../../../../node_modules/@aws-crypto/sha256-js/build/main/RawSha256.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.RawSha256 = void 0;
    var constants_1 = require_constants();
    var RawSha256 = (
      /** @class */
      function() {
        function RawSha2562() {
          this.state = Int32Array.from(constants_1.INIT);
          this.temp = new Int32Array(64);
          this.buffer = new Uint8Array(64);
          this.bufferLength = 0;
          this.bytesHashed = 0;
          this.finished = false;
        }
        RawSha2562.prototype.update = function(data) {
          if (this.finished) {
            throw new Error("Attempted to update an already finished hash.");
          }
          var position = 0;
          var byteLength = data.byteLength;
          this.bytesHashed += byteLength;
          if (this.bytesHashed * 8 > constants_1.MAX_HASHABLE_LENGTH) {
            throw new Error("Cannot hash more than 2^53 - 1 bits");
          }
          while (byteLength > 0) {
            this.buffer[this.bufferLength++] = data[position++];
            byteLength--;
            if (this.bufferLength === constants_1.BLOCK_SIZE) {
              this.hashBuffer();
              this.bufferLength = 0;
            }
          }
        };
        RawSha2562.prototype.digest = function() {
          if (!this.finished) {
            var bitsHashed = this.bytesHashed * 8;
            var bufferView = new DataView(this.buffer.buffer, this.buffer.byteOffset, this.buffer.byteLength);
            var undecoratedLength = this.bufferLength;
            bufferView.setUint8(this.bufferLength++, 128);
            if (undecoratedLength % constants_1.BLOCK_SIZE >= constants_1.BLOCK_SIZE - 8) {
              for (var i = this.bufferLength; i < constants_1.BLOCK_SIZE; i++) {
                bufferView.setUint8(i, 0);
              }
              this.hashBuffer();
              this.bufferLength = 0;
            }
            for (var i = this.bufferLength; i < constants_1.BLOCK_SIZE - 8; i++) {
              bufferView.setUint8(i, 0);
            }
            bufferView.setUint32(constants_1.BLOCK_SIZE - 8, Math.floor(bitsHashed / 4294967296), true);
            bufferView.setUint32(constants_1.BLOCK_SIZE - 4, bitsHashed);
            this.hashBuffer();
            this.finished = true;
          }
          var out = new Uint8Array(constants_1.DIGEST_LENGTH);
          for (var i = 0; i < 8; i++) {
            out[i * 4] = this.state[i] >>> 24 & 255;
            out[i * 4 + 1] = this.state[i] >>> 16 & 255;
            out[i * 4 + 2] = this.state[i] >>> 8 & 255;
            out[i * 4 + 3] = this.state[i] >>> 0 & 255;
          }
          return out;
        };
        RawSha2562.prototype.hashBuffer = function() {
          var _a = this, buffer = _a.buffer, state = _a.state;
          var state0 = state[0], state1 = state[1], state2 = state[2], state3 = state[3], state4 = state[4], state5 = state[5], state6 = state[6], state7 = state[7];
          for (var i = 0; i < constants_1.BLOCK_SIZE; i++) {
            if (i < 16) {
              this.temp[i] = (buffer[i * 4] & 255) << 24 | (buffer[i * 4 + 1] & 255) << 16 | (buffer[i * 4 + 2] & 255) << 8 | buffer[i * 4 + 3] & 255;
            } else {
              var u = this.temp[i - 2];
              var t1_1 = (u >>> 17 | u << 15) ^ (u >>> 19 | u << 13) ^ u >>> 10;
              u = this.temp[i - 15];
              var t2_1 = (u >>> 7 | u << 25) ^ (u >>> 18 | u << 14) ^ u >>> 3;
              this.temp[i] = (t1_1 + this.temp[i - 7] | 0) + (t2_1 + this.temp[i - 16] | 0);
            }
            var t1 = (((state4 >>> 6 | state4 << 26) ^ (state4 >>> 11 | state4 << 21) ^ (state4 >>> 25 | state4 << 7)) + (state4 & state5 ^ ~state4 & state6) | 0) + (state7 + (constants_1.KEY[i] + this.temp[i] | 0) | 0) | 0;
            var t2 = ((state0 >>> 2 | state0 << 30) ^ (state0 >>> 13 | state0 << 19) ^ (state0 >>> 22 | state0 << 10)) + (state0 & state1 ^ state0 & state2 ^ state1 & state2) | 0;
            state7 = state6;
            state6 = state5;
            state5 = state4;
            state4 = state3 + t1 | 0;
            state3 = state2;
            state2 = state1;
            state1 = state0;
            state0 = t1 + t2 | 0;
          }
          state[0] += state0;
          state[1] += state1;
          state[2] += state2;
          state[3] += state3;
          state[4] += state4;
          state[5] += state5;
          state[6] += state6;
          state[7] += state7;
        };
        return RawSha2562;
      }()
    );
    exports2.RawSha256 = RawSha256;
  }
});

// ../../../../node_modules/@smithy/is-array-buffer/dist-cjs/index.js
var require_dist_cjs3 = __commonJS({
  "../../../../node_modules/@smithy/is-array-buffer/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name = (target, value) => __defProp2(target, "name", { value, configurable: true });
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var src_exports2 = {};
    __export2(src_exports2, {
      isArrayBuffer: () => isArrayBuffer
    });
    module2.exports = __toCommonJS2(src_exports2);
    var isArrayBuffer = /* @__PURE__ */ __name((arg) => typeof ArrayBuffer === "function" && arg instanceof ArrayBuffer || Object.prototype.toString.call(arg) === "[object ArrayBuffer]", "isArrayBuffer");
  }
});

// ../../../../node_modules/@smithy/util-buffer-from/dist-cjs/index.js
var require_dist_cjs4 = __commonJS({
  "../../../../node_modules/@smithy/util-buffer-from/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name = (target, value) => __defProp2(target, "name", { value, configurable: true });
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var src_exports2 = {};
    __export2(src_exports2, {
      fromArrayBuffer: () => fromArrayBuffer,
      fromString: () => fromString
    });
    module2.exports = __toCommonJS2(src_exports2);
    var import_is_array_buffer = require_dist_cjs3();
    var import_buffer = require("buffer");
    var fromArrayBuffer = /* @__PURE__ */ __name((input, offset = 0, length = input.byteLength - offset) => {
      if (!(0, import_is_array_buffer.isArrayBuffer)(input)) {
        throw new TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof input} (${input})`);
      }
      return import_buffer.Buffer.from(input, offset, length);
    }, "fromArrayBuffer");
    var fromString = /* @__PURE__ */ __name((input, encoding) => {
      if (typeof input !== "string") {
        throw new TypeError(`The "input" argument must be of type string. Received type ${typeof input} (${input})`);
      }
      return encoding ? import_buffer.Buffer.from(input, encoding) : import_buffer.Buffer.from(input);
    }, "fromString");
  }
});

// ../../../../node_modules/@smithy/util-utf8/dist-cjs/index.js
var require_dist_cjs5 = __commonJS({
  "../../../../node_modules/@smithy/util-utf8/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name = (target, value) => __defProp2(target, "name", { value, configurable: true });
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var src_exports2 = {};
    __export2(src_exports2, {
      fromUtf8: () => fromUtf8,
      toUint8Array: () => toUint8Array,
      toUtf8: () => toUtf8
    });
    module2.exports = __toCommonJS2(src_exports2);
    var import_util_buffer_from = require_dist_cjs4();
    var fromUtf8 = /* @__PURE__ */ __name((input) => {
      const buf = (0, import_util_buffer_from.fromString)(input, "utf8");
      return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength / Uint8Array.BYTES_PER_ELEMENT);
    }, "fromUtf8");
    var toUint8Array = /* @__PURE__ */ __name((data) => {
      if (typeof data === "string") {
        return fromUtf8(data);
      }
      if (ArrayBuffer.isView(data)) {
        return new Uint8Array(data.buffer, data.byteOffset, data.byteLength / Uint8Array.BYTES_PER_ELEMENT);
      }
      return new Uint8Array(data);
    }, "toUint8Array");
    var toUtf8 = /* @__PURE__ */ __name((input) => {
      if (typeof input === "string") {
        return input;
      }
      if (typeof input !== "object" || typeof input.byteOffset !== "number" || typeof input.byteLength !== "number") {
        throw new Error("@smithy/util-utf8: toUtf8 encoder function only accepts string | Uint8Array.");
      }
      return (0, import_util_buffer_from.fromArrayBuffer)(input.buffer, input.byteOffset, input.byteLength).toString("utf8");
    }, "toUtf8");
  }
});

// ../../../../node_modules/@aws-crypto/util/build/main/convertToBuffer.js
var require_convertToBuffer = __commonJS({
  "../../../../node_modules/@aws-crypto/util/build/main/convertToBuffer.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.convertToBuffer = void 0;
    var util_utf8_1 = require_dist_cjs5();
    var fromUtf8 = typeof Buffer !== "undefined" && Buffer.from ? function(input) {
      return Buffer.from(input, "utf8");
    } : util_utf8_1.fromUtf8;
    function convertToBuffer(data) {
      if (data instanceof Uint8Array)
        return data;
      if (typeof data === "string") {
        return fromUtf8(data);
      }
      if (ArrayBuffer.isView(data)) {
        return new Uint8Array(data.buffer, data.byteOffset, data.byteLength / Uint8Array.BYTES_PER_ELEMENT);
      }
      return new Uint8Array(data);
    }
    exports2.convertToBuffer = convertToBuffer;
  }
});

// ../../../../node_modules/@aws-crypto/util/build/main/isEmptyData.js
var require_isEmptyData = __commonJS({
  "../../../../node_modules/@aws-crypto/util/build/main/isEmptyData.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isEmptyData = void 0;
    function isEmptyData(data) {
      if (typeof data === "string") {
        return data.length === 0;
      }
      return data.byteLength === 0;
    }
    exports2.isEmptyData = isEmptyData;
  }
});

// ../../../../node_modules/@aws-crypto/util/build/main/numToUint8.js
var require_numToUint8 = __commonJS({
  "../../../../node_modules/@aws-crypto/util/build/main/numToUint8.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.numToUint8 = void 0;
    function numToUint8(num) {
      return new Uint8Array([
        (num & 4278190080) >> 24,
        (num & 16711680) >> 16,
        (num & 65280) >> 8,
        num & 255
      ]);
    }
    exports2.numToUint8 = numToUint8;
  }
});

// ../../../../node_modules/@aws-crypto/util/build/main/uint32ArrayFrom.js
var require_uint32ArrayFrom = __commonJS({
  "../../../../node_modules/@aws-crypto/util/build/main/uint32ArrayFrom.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.uint32ArrayFrom = void 0;
    function uint32ArrayFrom(a_lookUpTable) {
      if (!Uint32Array.from) {
        var return_array = new Uint32Array(a_lookUpTable.length);
        var a_index = 0;
        while (a_index < a_lookUpTable.length) {
          return_array[a_index] = a_lookUpTable[a_index];
          a_index += 1;
        }
        return return_array;
      }
      return Uint32Array.from(a_lookUpTable);
    }
    exports2.uint32ArrayFrom = uint32ArrayFrom;
  }
});

// ../../../../node_modules/@aws-crypto/util/build/main/index.js
var require_main = __commonJS({
  "../../../../node_modules/@aws-crypto/util/build/main/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.uint32ArrayFrom = exports2.numToUint8 = exports2.isEmptyData = exports2.convertToBuffer = void 0;
    var convertToBuffer_1 = require_convertToBuffer();
    Object.defineProperty(exports2, "convertToBuffer", { enumerable: true, get: function() {
      return convertToBuffer_1.convertToBuffer;
    } });
    var isEmptyData_1 = require_isEmptyData();
    Object.defineProperty(exports2, "isEmptyData", { enumerable: true, get: function() {
      return isEmptyData_1.isEmptyData;
    } });
    var numToUint8_1 = require_numToUint8();
    Object.defineProperty(exports2, "numToUint8", { enumerable: true, get: function() {
      return numToUint8_1.numToUint8;
    } });
    var uint32ArrayFrom_1 = require_uint32ArrayFrom();
    Object.defineProperty(exports2, "uint32ArrayFrom", { enumerable: true, get: function() {
      return uint32ArrayFrom_1.uint32ArrayFrom;
    } });
  }
});

// ../../../../node_modules/@aws-crypto/sha256-js/build/main/jsSha256.js
var require_jsSha256 = __commonJS({
  "../../../../node_modules/@aws-crypto/sha256-js/build/main/jsSha256.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Sha256 = void 0;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var constants_1 = require_constants();
    var RawSha256_1 = require_RawSha256();
    var util_1 = require_main();
    var Sha256 = (
      /** @class */
      function() {
        function Sha2562(secret) {
          this.secret = secret;
          this.hash = new RawSha256_1.RawSha256();
          this.reset();
        }
        Sha2562.prototype.update = function(toHash) {
          if ((0, util_1.isEmptyData)(toHash) || this.error) {
            return;
          }
          try {
            this.hash.update((0, util_1.convertToBuffer)(toHash));
          } catch (e) {
            this.error = e;
          }
        };
        Sha2562.prototype.digestSync = function() {
          if (this.error) {
            throw this.error;
          }
          if (this.outer) {
            if (!this.outer.finished) {
              this.outer.update(this.hash.digest());
            }
            return this.outer.digest();
          }
          return this.hash.digest();
        };
        Sha2562.prototype.digest = function() {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            return tslib_1.__generator(this, function(_a) {
              return [2, this.digestSync()];
            });
          });
        };
        Sha2562.prototype.reset = function() {
          this.hash = new RawSha256_1.RawSha256();
          if (this.secret) {
            this.outer = new RawSha256_1.RawSha256();
            var inner = bufferFromSecret(this.secret);
            var outer = new Uint8Array(constants_1.BLOCK_SIZE);
            outer.set(inner);
            for (var i = 0; i < constants_1.BLOCK_SIZE; i++) {
              inner[i] ^= 54;
              outer[i] ^= 92;
            }
            this.hash.update(inner);
            this.outer.update(outer);
            for (var i = 0; i < inner.byteLength; i++) {
              inner[i] = 0;
            }
          }
        };
        return Sha2562;
      }()
    );
    exports2.Sha256 = Sha256;
    function bufferFromSecret(secret) {
      var input = (0, util_1.convertToBuffer)(secret);
      if (input.byteLength > constants_1.BLOCK_SIZE) {
        var bufferHash = new RawSha256_1.RawSha256();
        bufferHash.update(input);
        input = bufferHash.digest();
      }
      var buffer = new Uint8Array(constants_1.BLOCK_SIZE);
      buffer.set(input);
      return buffer;
    }
  }
});

// ../../../../node_modules/@aws-crypto/sha256-js/build/main/index.js
var require_main2 = __commonJS({
  "../../../../node_modules/@aws-crypto/sha256-js/build/main/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_jsSha256(), exports2);
  }
});

// ../../../../node_modules/@aws-crypto/crc32/node_modules/tslib/tslib.es6.js
var tslib_es6_exports2 = {};
__export(tslib_es6_exports2, {
  __assign: () => __assign2,
  __asyncDelegator: () => __asyncDelegator2,
  __asyncGenerator: () => __asyncGenerator2,
  __asyncValues: () => __asyncValues2,
  __await: () => __await2,
  __awaiter: () => __awaiter2,
  __classPrivateFieldGet: () => __classPrivateFieldGet2,
  __classPrivateFieldSet: () => __classPrivateFieldSet2,
  __createBinding: () => __createBinding2,
  __decorate: () => __decorate2,
  __exportStar: () => __exportStar2,
  __extends: () => __extends2,
  __generator: () => __generator2,
  __importDefault: () => __importDefault2,
  __importStar: () => __importStar2,
  __makeTemplateObject: () => __makeTemplateObject2,
  __metadata: () => __metadata2,
  __param: () => __param2,
  __read: () => __read2,
  __rest: () => __rest2,
  __spread: () => __spread2,
  __spreadArrays: () => __spreadArrays2,
  __values: () => __values2
});
function __extends2(d, b) {
  extendStatics2(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __rest2(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function __decorate2(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param2(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
function __metadata2(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter2(thisArg, _arguments, P, generator) {
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
function __generator2(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1)
      throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f)
      throw new TypeError("Generator is already executing.");
    while (_)
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
          return t;
        if (y = 0, t)
          op = [op[0] & 2, t.value];
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
            if (t[2])
              _.ops.pop();
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
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __createBinding2(o, m, k, k2) {
  if (k2 === void 0)
    k2 = k;
  o[k2] = m[k];
}
function __exportStar2(m, exports2) {
  for (var p in m)
    if (p !== "default" && !exports2.hasOwnProperty(p))
      exports2[p] = m[p];
}
function __values2(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m)
    return m.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function() {
        if (o && i >= o.length)
          o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read2(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
}
function __spread2() {
  for (var ar = [], i = 0; i < arguments.length; i++)
    ar = ar.concat(__read2(arguments[i]));
  return ar;
}
function __spreadArrays2() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++)
    s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
      r[k] = a[j];
  return r;
}
function __await2(v) {
  return this instanceof __await2 ? (this.v = v, this) : new __await2(v);
}
function __asyncGenerator2(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function verb(n) {
    if (g[n])
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await2 ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length)
      resume(q[0][0], q[0][1]);
  }
}
function __asyncDelegator2(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function(e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function() {
    return this;
  }, i;
  function verb(n, f) {
    i[n] = o[n] ? function(v) {
      return (p = !p) ? { value: __await2(o[n](v)), done: n === "return" } : f ? f(v) : v;
    } : f;
  }
}
function __asyncValues2(o) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values2 === "function" ? __values2(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
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
function __makeTemplateObject2(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
function __importStar2(mod) {
  if (mod && mod.__esModule)
    return mod;
  var result = {};
  if (mod != null) {
    for (var k in mod)
      if (Object.hasOwnProperty.call(mod, k))
        result[k] = mod[k];
  }
  result.default = mod;
  return result;
}
function __importDefault2(mod) {
  return mod && mod.__esModule ? mod : { default: mod };
}
function __classPrivateFieldGet2(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }
  return privateMap.get(receiver);
}
function __classPrivateFieldSet2(receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }
  privateMap.set(receiver, value);
  return value;
}
var extendStatics2, __assign2;
var init_tslib_es62 = __esm({
  "../../../../node_modules/@aws-crypto/crc32/node_modules/tslib/tslib.es6.js"() {
    extendStatics2 = function(d, b) {
      extendStatics2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (b2.hasOwnProperty(p))
            d2[p] = b2[p];
      };
      return extendStatics2(d, b);
    };
    __assign2 = function() {
      __assign2 = Object.assign || function __assign3(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign2.apply(this, arguments);
    };
  }
});

// ../../../../node_modules/@aws-crypto/crc32/node_modules/@aws-crypto/util/build/convertToBuffer.js
var require_convertToBuffer2 = __commonJS({
  "../../../../node_modules/@aws-crypto/crc32/node_modules/@aws-crypto/util/build/convertToBuffer.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.convertToBuffer = void 0;
    var util_utf8_browser_1 = require("@aws-sdk/util-utf8-browser");
    var fromUtf8 = typeof Buffer !== "undefined" && Buffer.from ? function(input) {
      return Buffer.from(input, "utf8");
    } : util_utf8_browser_1.fromUtf8;
    function convertToBuffer(data) {
      if (data instanceof Uint8Array)
        return data;
      if (typeof data === "string") {
        return fromUtf8(data);
      }
      if (ArrayBuffer.isView(data)) {
        return new Uint8Array(data.buffer, data.byteOffset, data.byteLength / Uint8Array.BYTES_PER_ELEMENT);
      }
      return new Uint8Array(data);
    }
    exports2.convertToBuffer = convertToBuffer;
  }
});

// ../../../../node_modules/@aws-crypto/crc32/node_modules/@aws-crypto/util/build/isEmptyData.js
var require_isEmptyData2 = __commonJS({
  "../../../../node_modules/@aws-crypto/crc32/node_modules/@aws-crypto/util/build/isEmptyData.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isEmptyData = void 0;
    function isEmptyData(data) {
      if (typeof data === "string") {
        return data.length === 0;
      }
      return data.byteLength === 0;
    }
    exports2.isEmptyData = isEmptyData;
  }
});

// ../../../../node_modules/@aws-crypto/crc32/node_modules/@aws-crypto/util/build/numToUint8.js
var require_numToUint82 = __commonJS({
  "../../../../node_modules/@aws-crypto/crc32/node_modules/@aws-crypto/util/build/numToUint8.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.numToUint8 = void 0;
    function numToUint8(num) {
      return new Uint8Array([
        (num & 4278190080) >> 24,
        (num & 16711680) >> 16,
        (num & 65280) >> 8,
        num & 255
      ]);
    }
    exports2.numToUint8 = numToUint8;
  }
});

// ../../../../node_modules/@aws-crypto/crc32/node_modules/@aws-crypto/util/build/uint32ArrayFrom.js
var require_uint32ArrayFrom2 = __commonJS({
  "../../../../node_modules/@aws-crypto/crc32/node_modules/@aws-crypto/util/build/uint32ArrayFrom.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.uint32ArrayFrom = void 0;
    function uint32ArrayFrom(a_lookUpTable) {
      if (!Uint32Array.from) {
        var return_array = new Uint32Array(a_lookUpTable.length);
        var a_index = 0;
        while (a_index < a_lookUpTable.length) {
          return_array[a_index] = a_lookUpTable[a_index];
          a_index += 1;
        }
        return return_array;
      }
      return Uint32Array.from(a_lookUpTable);
    }
    exports2.uint32ArrayFrom = uint32ArrayFrom;
  }
});

// ../../../../node_modules/@aws-crypto/crc32/node_modules/@aws-crypto/util/build/index.js
var require_build = __commonJS({
  "../../../../node_modules/@aws-crypto/crc32/node_modules/@aws-crypto/util/build/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.uint32ArrayFrom = exports2.numToUint8 = exports2.isEmptyData = exports2.convertToBuffer = void 0;
    var convertToBuffer_1 = require_convertToBuffer2();
    Object.defineProperty(exports2, "convertToBuffer", { enumerable: true, get: function() {
      return convertToBuffer_1.convertToBuffer;
    } });
    var isEmptyData_1 = require_isEmptyData2();
    Object.defineProperty(exports2, "isEmptyData", { enumerable: true, get: function() {
      return isEmptyData_1.isEmptyData;
    } });
    var numToUint8_1 = require_numToUint82();
    Object.defineProperty(exports2, "numToUint8", { enumerable: true, get: function() {
      return numToUint8_1.numToUint8;
    } });
    var uint32ArrayFrom_1 = require_uint32ArrayFrom2();
    Object.defineProperty(exports2, "uint32ArrayFrom", { enumerable: true, get: function() {
      return uint32ArrayFrom_1.uint32ArrayFrom;
    } });
  }
});

// ../../../../node_modules/@aws-crypto/crc32/build/aws_crc32.js
var require_aws_crc32 = __commonJS({
  "../../../../node_modules/@aws-crypto/crc32/build/aws_crc32.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AwsCrc32 = void 0;
    var tslib_1 = (init_tslib_es62(), __toCommonJS(tslib_es6_exports2));
    var util_1 = require_build();
    var index_1 = require_build2();
    var AwsCrc32 = (
      /** @class */
      function() {
        function AwsCrc322() {
          this.crc32 = new index_1.Crc32();
        }
        AwsCrc322.prototype.update = function(toHash) {
          if ((0, util_1.isEmptyData)(toHash))
            return;
          this.crc32.update((0, util_1.convertToBuffer)(toHash));
        };
        AwsCrc322.prototype.digest = function() {
          return tslib_1.__awaiter(this, void 0, void 0, function() {
            return tslib_1.__generator(this, function(_a) {
              return [2, (0, util_1.numToUint8)(this.crc32.digest())];
            });
          });
        };
        AwsCrc322.prototype.reset = function() {
          this.crc32 = new index_1.Crc32();
        };
        return AwsCrc322;
      }()
    );
    exports2.AwsCrc32 = AwsCrc32;
  }
});

// ../../../../node_modules/@aws-crypto/crc32/build/index.js
var require_build2 = __commonJS({
  "../../../../node_modules/@aws-crypto/crc32/build/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.AwsCrc32 = exports2.Crc32 = exports2.crc32 = void 0;
    var tslib_1 = (init_tslib_es62(), __toCommonJS(tslib_es6_exports2));
    var util_1 = require_build();
    function crc32(data) {
      return new Crc32().update(data).digest();
    }
    exports2.crc32 = crc32;
    var Crc32 = (
      /** @class */
      function() {
        function Crc322() {
          this.checksum = 4294967295;
        }
        Crc322.prototype.update = function(data) {
          var e_1, _a;
          try {
            for (var data_1 = tslib_1.__values(data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
              var byte = data_1_1.value;
              this.checksum = this.checksum >>> 8 ^ lookupTable[(this.checksum ^ byte) & 255];
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (data_1_1 && !data_1_1.done && (_a = data_1.return))
                _a.call(data_1);
            } finally {
              if (e_1)
                throw e_1.error;
            }
          }
          return this;
        };
        Crc322.prototype.digest = function() {
          return (this.checksum ^ 4294967295) >>> 0;
        };
        return Crc322;
      }()
    );
    exports2.Crc32 = Crc32;
    var a_lookUpTable = [
      0,
      1996959894,
      3993919788,
      2567524794,
      124634137,
      1886057615,
      3915621685,
      2657392035,
      249268274,
      2044508324,
      3772115230,
      2547177864,
      162941995,
      2125561021,
      3887607047,
      2428444049,
      498536548,
      1789927666,
      4089016648,
      2227061214,
      450548861,
      1843258603,
      4107580753,
      2211677639,
      325883990,
      1684777152,
      4251122042,
      2321926636,
      335633487,
      1661365465,
      4195302755,
      2366115317,
      997073096,
      1281953886,
      3579855332,
      2724688242,
      1006888145,
      1258607687,
      3524101629,
      2768942443,
      901097722,
      1119000684,
      3686517206,
      2898065728,
      853044451,
      1172266101,
      3705015759,
      2882616665,
      651767980,
      1373503546,
      3369554304,
      3218104598,
      565507253,
      1454621731,
      3485111705,
      3099436303,
      671266974,
      1594198024,
      3322730930,
      2970347812,
      795835527,
      1483230225,
      3244367275,
      3060149565,
      1994146192,
      31158534,
      2563907772,
      4023717930,
      1907459465,
      112637215,
      2680153253,
      3904427059,
      2013776290,
      251722036,
      2517215374,
      3775830040,
      2137656763,
      141376813,
      2439277719,
      3865271297,
      1802195444,
      476864866,
      2238001368,
      4066508878,
      1812370925,
      453092731,
      2181625025,
      4111451223,
      1706088902,
      314042704,
      2344532202,
      4240017532,
      1658658271,
      366619977,
      2362670323,
      4224994405,
      1303535960,
      984961486,
      2747007092,
      3569037538,
      1256170817,
      1037604311,
      2765210733,
      3554079995,
      1131014506,
      879679996,
      2909243462,
      3663771856,
      1141124467,
      855842277,
      2852801631,
      3708648649,
      1342533948,
      654459306,
      3188396048,
      3373015174,
      1466479909,
      544179635,
      3110523913,
      3462522015,
      1591671054,
      702138776,
      2966460450,
      3352799412,
      1504918807,
      783551873,
      3082640443,
      3233442989,
      3988292384,
      2596254646,
      62317068,
      1957810842,
      3939845945,
      2647816111,
      81470997,
      1943803523,
      3814918930,
      2489596804,
      225274430,
      2053790376,
      3826175755,
      2466906013,
      167816743,
      2097651377,
      4027552580,
      2265490386,
      503444072,
      1762050814,
      4150417245,
      2154129355,
      426522225,
      1852507879,
      4275313526,
      2312317920,
      282753626,
      1742555852,
      4189708143,
      2394877945,
      397917763,
      1622183637,
      3604390888,
      2714866558,
      953729732,
      1340076626,
      3518719985,
      2797360999,
      1068828381,
      1219638859,
      3624741850,
      2936675148,
      906185462,
      1090812512,
      3747672003,
      2825379669,
      829329135,
      1181335161,
      3412177804,
      3160834842,
      628085408,
      1382605366,
      3423369109,
      3138078467,
      570562233,
      1426400815,
      3317316542,
      2998733608,
      733239954,
      1555261956,
      3268935591,
      3050360625,
      752459403,
      1541320221,
      2607071920,
      3965973030,
      1969922972,
      40735498,
      2617837225,
      3943577151,
      1913087877,
      83908371,
      2512341634,
      3803740692,
      2075208622,
      213261112,
      2463272603,
      3855990285,
      2094854071,
      198958881,
      2262029012,
      4057260610,
      1759359992,
      534414190,
      2176718541,
      4139329115,
      1873836001,
      414664567,
      2282248934,
      4279200368,
      1711684554,
      285281116,
      2405801727,
      4167216745,
      1634467795,
      376229701,
      2685067896,
      3608007406,
      1308918612,
      956543938,
      2808555105,
      3495958263,
      1231636301,
      1047427035,
      2932959818,
      3654703836,
      1088359270,
      936918e3,
      2847714899,
      3736837829,
      1202900863,
      817233897,
      3183342108,
      3401237130,
      1404277552,
      615818150,
      3134207493,
      3453421203,
      1423857449,
      601450431,
      3009837614,
      3294710456,
      1567103746,
      711928724,
      3020668471,
      3272380065,
      1510334235,
      755167117
    ];
    var lookupTable = (0, util_1.uint32ArrayFrom)(a_lookUpTable);
    var aws_crc32_1 = require_aws_crc32();
    Object.defineProperty(exports2, "AwsCrc32", { enumerable: true, get: function() {
      return aws_crc32_1.AwsCrc32;
    } });
  }
});

// ../../../../node_modules/@smithy/util-hex-encoding/dist-cjs/index.js
var require_dist_cjs6 = __commonJS({
  "../../../../node_modules/@smithy/util-hex-encoding/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name = (target, value) => __defProp2(target, "name", { value, configurable: true });
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var src_exports2 = {};
    __export2(src_exports2, {
      fromHex: () => fromHex,
      toHex: () => toHex
    });
    module2.exports = __toCommonJS2(src_exports2);
    var SHORT_TO_HEX = {};
    var HEX_TO_SHORT = {};
    for (let i = 0; i < 256; i++) {
      let encodedByte = i.toString(16).toLowerCase();
      if (encodedByte.length === 1) {
        encodedByte = `0${encodedByte}`;
      }
      SHORT_TO_HEX[i] = encodedByte;
      HEX_TO_SHORT[encodedByte] = i;
    }
    function fromHex(encoded) {
      if (encoded.length % 2 !== 0) {
        throw new Error("Hex encoded strings must have an even number length");
      }
      const out = new Uint8Array(encoded.length / 2);
      for (let i = 0; i < encoded.length; i += 2) {
        const encodedByte = encoded.slice(i, i + 2).toLowerCase();
        if (encodedByte in HEX_TO_SHORT) {
          out[i / 2] = HEX_TO_SHORT[encodedByte];
        } else {
          throw new Error(`Cannot decode unrecognized sequence ${encodedByte} as hexadecimal`);
        }
      }
      return out;
    }
    __name(fromHex, "fromHex");
    function toHex(bytes) {
      let out = "";
      for (let i = 0; i < bytes.byteLength; i++) {
        out += SHORT_TO_HEX[bytes[i]];
      }
      return out;
    }
    __name(toHex, "toHex");
  }
});

// ../../../../node_modules/@smithy/eventstream-codec/dist-cjs/index.js
var require_dist_cjs7 = __commonJS({
  "../../../../node_modules/@smithy/eventstream-codec/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name = (target, value) => __defProp2(target, "name", { value, configurable: true });
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var src_exports2 = {};
    __export2(src_exports2, {
      EventStreamCodec: () => EventStreamCodec,
      HeaderMarshaller: () => HeaderMarshaller,
      Int64: () => Int64,
      MessageDecoderStream: () => MessageDecoderStream,
      MessageEncoderStream: () => MessageEncoderStream,
      SmithyMessageDecoderStream: () => SmithyMessageDecoderStream,
      SmithyMessageEncoderStream: () => SmithyMessageEncoderStream
    });
    module2.exports = __toCommonJS2(src_exports2);
    var import_crc322 = require_build2();
    var import_util_hex_encoding = require_dist_cjs6();
    var _Int64 = class _Int642 {
      constructor(bytes) {
        this.bytes = bytes;
        if (bytes.byteLength !== 8) {
          throw new Error("Int64 buffers must be exactly 8 bytes");
        }
      }
      static fromNumber(number) {
        if (number > 9223372036854776e3 || number < -9223372036854776e3) {
          throw new Error(`${number} is too large (or, if negative, too small) to represent as an Int64`);
        }
        const bytes = new Uint8Array(8);
        for (let i = 7, remaining = Math.abs(Math.round(number)); i > -1 && remaining > 0; i--, remaining /= 256) {
          bytes[i] = remaining;
        }
        if (number < 0) {
          negate(bytes);
        }
        return new _Int642(bytes);
      }
      /**
       * Called implicitly by infix arithmetic operators.
       */
      valueOf() {
        const bytes = this.bytes.slice(0);
        const negative = bytes[0] & 128;
        if (negative) {
          negate(bytes);
        }
        return parseInt((0, import_util_hex_encoding.toHex)(bytes), 16) * (negative ? -1 : 1);
      }
      toString() {
        return String(this.valueOf());
      }
    };
    __name(_Int64, "Int64");
    var Int64 = _Int64;
    function negate(bytes) {
      for (let i = 0; i < 8; i++) {
        bytes[i] ^= 255;
      }
      for (let i = 7; i > -1; i--) {
        bytes[i]++;
        if (bytes[i] !== 0)
          break;
      }
    }
    __name(negate, "negate");
    var _HeaderMarshaller = class _HeaderMarshaller {
      constructor(toUtf8, fromUtf8) {
        this.toUtf8 = toUtf8;
        this.fromUtf8 = fromUtf8;
      }
      format(headers) {
        const chunks = [];
        for (const headerName of Object.keys(headers)) {
          const bytes = this.fromUtf8(headerName);
          chunks.push(Uint8Array.from([bytes.byteLength]), bytes, this.formatHeaderValue(headers[headerName]));
        }
        const out = new Uint8Array(chunks.reduce((carry, bytes) => carry + bytes.byteLength, 0));
        let position = 0;
        for (const chunk of chunks) {
          out.set(chunk, position);
          position += chunk.byteLength;
        }
        return out;
      }
      formatHeaderValue(header) {
        switch (header.type) {
          case "boolean":
            return Uint8Array.from([
              header.value ? 0 : 1
              /* boolFalse */
            ]);
          case "byte":
            return Uint8Array.from([2, header.value]);
          case "short":
            const shortView = new DataView(new ArrayBuffer(3));
            shortView.setUint8(
              0,
              3
              /* short */
            );
            shortView.setInt16(1, header.value, false);
            return new Uint8Array(shortView.buffer);
          case "integer":
            const intView = new DataView(new ArrayBuffer(5));
            intView.setUint8(
              0,
              4
              /* integer */
            );
            intView.setInt32(1, header.value, false);
            return new Uint8Array(intView.buffer);
          case "long":
            const longBytes = new Uint8Array(9);
            longBytes[0] = 5;
            longBytes.set(header.value.bytes, 1);
            return longBytes;
          case "binary":
            const binView = new DataView(new ArrayBuffer(3 + header.value.byteLength));
            binView.setUint8(
              0,
              6
              /* byteArray */
            );
            binView.setUint16(1, header.value.byteLength, false);
            const binBytes = new Uint8Array(binView.buffer);
            binBytes.set(header.value, 3);
            return binBytes;
          case "string":
            const utf8Bytes = this.fromUtf8(header.value);
            const strView = new DataView(new ArrayBuffer(3 + utf8Bytes.byteLength));
            strView.setUint8(
              0,
              7
              /* string */
            );
            strView.setUint16(1, utf8Bytes.byteLength, false);
            const strBytes = new Uint8Array(strView.buffer);
            strBytes.set(utf8Bytes, 3);
            return strBytes;
          case "timestamp":
            const tsBytes = new Uint8Array(9);
            tsBytes[0] = 8;
            tsBytes.set(Int64.fromNumber(header.value.valueOf()).bytes, 1);
            return tsBytes;
          case "uuid":
            if (!UUID_PATTERN.test(header.value)) {
              throw new Error(`Invalid UUID received: ${header.value}`);
            }
            const uuidBytes = new Uint8Array(17);
            uuidBytes[0] = 9;
            uuidBytes.set((0, import_util_hex_encoding.fromHex)(header.value.replace(/\-/g, "")), 1);
            return uuidBytes;
        }
      }
      parse(headers) {
        const out = {};
        let position = 0;
        while (position < headers.byteLength) {
          const nameLength = headers.getUint8(position++);
          const name = this.toUtf8(new Uint8Array(headers.buffer, headers.byteOffset + position, nameLength));
          position += nameLength;
          switch (headers.getUint8(position++)) {
            case 0:
              out[name] = {
                type: BOOLEAN_TAG,
                value: true
              };
              break;
            case 1:
              out[name] = {
                type: BOOLEAN_TAG,
                value: false
              };
              break;
            case 2:
              out[name] = {
                type: BYTE_TAG,
                value: headers.getInt8(position++)
              };
              break;
            case 3:
              out[name] = {
                type: SHORT_TAG,
                value: headers.getInt16(position, false)
              };
              position += 2;
              break;
            case 4:
              out[name] = {
                type: INT_TAG,
                value: headers.getInt32(position, false)
              };
              position += 4;
              break;
            case 5:
              out[name] = {
                type: LONG_TAG,
                value: new Int64(new Uint8Array(headers.buffer, headers.byteOffset + position, 8))
              };
              position += 8;
              break;
            case 6:
              const binaryLength = headers.getUint16(position, false);
              position += 2;
              out[name] = {
                type: BINARY_TAG,
                value: new Uint8Array(headers.buffer, headers.byteOffset + position, binaryLength)
              };
              position += binaryLength;
              break;
            case 7:
              const stringLength = headers.getUint16(position, false);
              position += 2;
              out[name] = {
                type: STRING_TAG,
                value: this.toUtf8(new Uint8Array(headers.buffer, headers.byteOffset + position, stringLength))
              };
              position += stringLength;
              break;
            case 8:
              out[name] = {
                type: TIMESTAMP_TAG,
                value: new Date(new Int64(new Uint8Array(headers.buffer, headers.byteOffset + position, 8)).valueOf())
              };
              position += 8;
              break;
            case 9:
              const uuidBytes = new Uint8Array(headers.buffer, headers.byteOffset + position, 16);
              position += 16;
              out[name] = {
                type: UUID_TAG,
                value: `${(0, import_util_hex_encoding.toHex)(uuidBytes.subarray(0, 4))}-${(0, import_util_hex_encoding.toHex)(uuidBytes.subarray(4, 6))}-${(0, import_util_hex_encoding.toHex)(
                  uuidBytes.subarray(6, 8)
                )}-${(0, import_util_hex_encoding.toHex)(uuidBytes.subarray(8, 10))}-${(0, import_util_hex_encoding.toHex)(uuidBytes.subarray(10))}`
              };
              break;
            default:
              throw new Error(`Unrecognized header type tag`);
          }
        }
        return out;
      }
    };
    __name(_HeaderMarshaller, "HeaderMarshaller");
    var HeaderMarshaller = _HeaderMarshaller;
    var BOOLEAN_TAG = "boolean";
    var BYTE_TAG = "byte";
    var SHORT_TAG = "short";
    var INT_TAG = "integer";
    var LONG_TAG = "long";
    var BINARY_TAG = "binary";
    var STRING_TAG = "string";
    var TIMESTAMP_TAG = "timestamp";
    var UUID_TAG = "uuid";
    var UUID_PATTERN = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
    var import_crc32 = require_build2();
    var PRELUDE_MEMBER_LENGTH = 4;
    var PRELUDE_LENGTH = PRELUDE_MEMBER_LENGTH * 2;
    var CHECKSUM_LENGTH = 4;
    var MINIMUM_MESSAGE_LENGTH = PRELUDE_LENGTH + CHECKSUM_LENGTH * 2;
    function splitMessage({ byteLength, byteOffset, buffer }) {
      if (byteLength < MINIMUM_MESSAGE_LENGTH) {
        throw new Error("Provided message too short to accommodate event stream message overhead");
      }
      const view = new DataView(buffer, byteOffset, byteLength);
      const messageLength = view.getUint32(0, false);
      if (byteLength !== messageLength) {
        throw new Error("Reported message length does not match received message length");
      }
      const headerLength = view.getUint32(PRELUDE_MEMBER_LENGTH, false);
      const expectedPreludeChecksum = view.getUint32(PRELUDE_LENGTH, false);
      const expectedMessageChecksum = view.getUint32(byteLength - CHECKSUM_LENGTH, false);
      const checksummer = new import_crc32.Crc32().update(new Uint8Array(buffer, byteOffset, PRELUDE_LENGTH));
      if (expectedPreludeChecksum !== checksummer.digest()) {
        throw new Error(
          `The prelude checksum specified in the message (${expectedPreludeChecksum}) does not match the calculated CRC32 checksum (${checksummer.digest()})`
        );
      }
      checksummer.update(
        new Uint8Array(buffer, byteOffset + PRELUDE_LENGTH, byteLength - (PRELUDE_LENGTH + CHECKSUM_LENGTH))
      );
      if (expectedMessageChecksum !== checksummer.digest()) {
        throw new Error(
          `The message checksum (${checksummer.digest()}) did not match the expected value of ${expectedMessageChecksum}`
        );
      }
      return {
        headers: new DataView(buffer, byteOffset + PRELUDE_LENGTH + CHECKSUM_LENGTH, headerLength),
        body: new Uint8Array(
          buffer,
          byteOffset + PRELUDE_LENGTH + CHECKSUM_LENGTH + headerLength,
          messageLength - headerLength - (PRELUDE_LENGTH + CHECKSUM_LENGTH + CHECKSUM_LENGTH)
        )
      };
    }
    __name(splitMessage, "splitMessage");
    var _EventStreamCodec = class _EventStreamCodec {
      constructor(toUtf8, fromUtf8) {
        this.headerMarshaller = new HeaderMarshaller(toUtf8, fromUtf8);
        this.messageBuffer = [];
        this.isEndOfStream = false;
      }
      feed(message) {
        this.messageBuffer.push(this.decode(message));
      }
      endOfStream() {
        this.isEndOfStream = true;
      }
      getMessage() {
        const message = this.messageBuffer.pop();
        const isEndOfStream = this.isEndOfStream;
        return {
          getMessage() {
            return message;
          },
          isEndOfStream() {
            return isEndOfStream;
          }
        };
      }
      getAvailableMessages() {
        const messages = this.messageBuffer;
        this.messageBuffer = [];
        const isEndOfStream = this.isEndOfStream;
        return {
          getMessages() {
            return messages;
          },
          isEndOfStream() {
            return isEndOfStream;
          }
        };
      }
      /**
       * Convert a structured JavaScript object with tagged headers into a binary
       * event stream message.
       */
      encode({ headers: rawHeaders, body }) {
        const headers = this.headerMarshaller.format(rawHeaders);
        const length = headers.byteLength + body.byteLength + 16;
        const out = new Uint8Array(length);
        const view = new DataView(out.buffer, out.byteOffset, out.byteLength);
        const checksum = new import_crc322.Crc32();
        view.setUint32(0, length, false);
        view.setUint32(4, headers.byteLength, false);
        view.setUint32(8, checksum.update(out.subarray(0, 8)).digest(), false);
        out.set(headers, 12);
        out.set(body, headers.byteLength + 12);
        view.setUint32(length - 4, checksum.update(out.subarray(8, length - 4)).digest(), false);
        return out;
      }
      /**
       * Convert a binary event stream message into a JavaScript object with an
       * opaque, binary body and tagged, parsed headers.
       */
      decode(message) {
        const { headers, body } = splitMessage(message);
        return { headers: this.headerMarshaller.parse(headers), body };
      }
      /**
       * Convert a structured JavaScript object with tagged headers into a binary
       * event stream message header.
       */
      formatHeaders(rawHeaders) {
        return this.headerMarshaller.format(rawHeaders);
      }
    };
    __name(_EventStreamCodec, "EventStreamCodec");
    var EventStreamCodec = _EventStreamCodec;
    var _MessageDecoderStream = class _MessageDecoderStream {
      constructor(options) {
        this.options = options;
      }
      [Symbol.asyncIterator]() {
        return this.asyncIterator();
      }
      async *asyncIterator() {
        for await (const bytes of this.options.inputStream) {
          const decoded = this.options.decoder.decode(bytes);
          yield decoded;
        }
      }
    };
    __name(_MessageDecoderStream, "MessageDecoderStream");
    var MessageDecoderStream = _MessageDecoderStream;
    var _MessageEncoderStream = class _MessageEncoderStream {
      constructor(options) {
        this.options = options;
      }
      [Symbol.asyncIterator]() {
        return this.asyncIterator();
      }
      async *asyncIterator() {
        for await (const msg of this.options.messageStream) {
          const encoded = this.options.encoder.encode(msg);
          yield encoded;
        }
        if (this.options.includeEndFrame) {
          yield new Uint8Array(0);
        }
      }
    };
    __name(_MessageEncoderStream, "MessageEncoderStream");
    var MessageEncoderStream = _MessageEncoderStream;
    var _SmithyMessageDecoderStream = class _SmithyMessageDecoderStream {
      constructor(options) {
        this.options = options;
      }
      [Symbol.asyncIterator]() {
        return this.asyncIterator();
      }
      async *asyncIterator() {
        for await (const message of this.options.messageStream) {
          const deserialized = await this.options.deserializer(message);
          if (deserialized === void 0)
            continue;
          yield deserialized;
        }
      }
    };
    __name(_SmithyMessageDecoderStream, "SmithyMessageDecoderStream");
    var SmithyMessageDecoderStream = _SmithyMessageDecoderStream;
    var _SmithyMessageEncoderStream = class _SmithyMessageEncoderStream {
      constructor(options) {
        this.options = options;
      }
      [Symbol.asyncIterator]() {
        return this.asyncIterator();
      }
      async *asyncIterator() {
        for await (const chunk of this.options.inputStream) {
          const payloadBuf = this.options.serializer(chunk);
          yield payloadBuf;
        }
      }
    };
    __name(_SmithyMessageEncoderStream, "SmithyMessageEncoderStream");
    var SmithyMessageEncoderStream = _SmithyMessageEncoderStream;
  }
});

// ../../../../node_modules/@smithy/util-middleware/dist-cjs/index.js
var require_dist_cjs8 = __commonJS({
  "../../../../node_modules/@smithy/util-middleware/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name = (target, value) => __defProp2(target, "name", { value, configurable: true });
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var src_exports2 = {};
    __export2(src_exports2, {
      getSmithyContext: () => getSmithyContext,
      normalizeProvider: () => normalizeProvider
    });
    module2.exports = __toCommonJS2(src_exports2);
    var import_types = require_dist_cjs();
    var getSmithyContext = /* @__PURE__ */ __name((context) => context[import_types.SMITHY_CONTEXT_KEY] || (context[import_types.SMITHY_CONTEXT_KEY] = {}), "getSmithyContext");
    var normalizeProvider = /* @__PURE__ */ __name((input) => {
      if (typeof input === "function")
        return input;
      const promisified = Promise.resolve(input);
      return () => promisified;
    }, "normalizeProvider");
  }
});

// ../../../../node_modules/@smithy/util-uri-escape/dist-cjs/index.js
var require_dist_cjs9 = __commonJS({
  "../../../../node_modules/@smithy/util-uri-escape/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name = (target, value) => __defProp2(target, "name", { value, configurable: true });
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var src_exports2 = {};
    __export2(src_exports2, {
      escapeUri: () => escapeUri,
      escapeUriPath: () => escapeUriPath
    });
    module2.exports = __toCommonJS2(src_exports2);
    var escapeUri = /* @__PURE__ */ __name((uri) => (
      // AWS percent-encodes some extra non-standard characters in a URI
      encodeURIComponent(uri).replace(/[!'()*]/g, hexEncode)
    ), "escapeUri");
    var hexEncode = /* @__PURE__ */ __name((c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`, "hexEncode");
    var escapeUriPath = /* @__PURE__ */ __name((uri) => uri.split("/").map(escapeUri).join("/"), "escapeUriPath");
  }
});

// ../../../../node_modules/@smithy/signature-v4/dist-cjs/index.js
var require_dist_cjs10 = __commonJS({
  "../../../../node_modules/@smithy/signature-v4/dist-cjs/index.js"(exports2, module2) {
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __name = (target, value) => __defProp2(target, "name", { value, configurable: true });
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS2 = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var src_exports2 = {};
    __export2(src_exports2, {
      SignatureV4: () => SignatureV4,
      clearCredentialCache: () => clearCredentialCache,
      createScope: () => createScope,
      getCanonicalHeaders: () => getCanonicalHeaders,
      getCanonicalQuery: () => getCanonicalQuery,
      getPayloadHash: () => getPayloadHash,
      getSigningKey: () => getSigningKey,
      moveHeadersToQuery: () => moveHeadersToQuery,
      prepareRequest: () => prepareRequest
    });
    module2.exports = __toCommonJS2(src_exports2);
    var import_eventstream_codec = require_dist_cjs7();
    var import_util_middleware = require_dist_cjs8();
    var import_util_utf83 = require_dist_cjs5();
    var ALGORITHM_QUERY_PARAM = "X-Amz-Algorithm";
    var CREDENTIAL_QUERY_PARAM = "X-Amz-Credential";
    var AMZ_DATE_QUERY_PARAM = "X-Amz-Date";
    var SIGNED_HEADERS_QUERY_PARAM = "X-Amz-SignedHeaders";
    var EXPIRES_QUERY_PARAM = "X-Amz-Expires";
    var SIGNATURE_QUERY_PARAM = "X-Amz-Signature";
    var TOKEN_QUERY_PARAM = "X-Amz-Security-Token";
    var AUTH_HEADER = "authorization";
    var AMZ_DATE_HEADER = AMZ_DATE_QUERY_PARAM.toLowerCase();
    var DATE_HEADER = "date";
    var GENERATED_HEADERS = [AUTH_HEADER, AMZ_DATE_HEADER, DATE_HEADER];
    var SIGNATURE_HEADER = SIGNATURE_QUERY_PARAM.toLowerCase();
    var SHA256_HEADER = "x-amz-content-sha256";
    var TOKEN_HEADER = TOKEN_QUERY_PARAM.toLowerCase();
    var ALWAYS_UNSIGNABLE_HEADERS = {
      authorization: true,
      "cache-control": true,
      connection: true,
      expect: true,
      from: true,
      "keep-alive": true,
      "max-forwards": true,
      pragma: true,
      referer: true,
      te: true,
      trailer: true,
      "transfer-encoding": true,
      upgrade: true,
      "user-agent": true,
      "x-amzn-trace-id": true
    };
    var PROXY_HEADER_PATTERN = /^proxy-/;
    var SEC_HEADER_PATTERN = /^sec-/;
    var ALGORITHM_IDENTIFIER = "AWS4-HMAC-SHA256";
    var EVENT_ALGORITHM_IDENTIFIER = "AWS4-HMAC-SHA256-PAYLOAD";
    var UNSIGNED_PAYLOAD = "UNSIGNED-PAYLOAD";
    var MAX_CACHE_SIZE = 50;
    var KEY_TYPE_IDENTIFIER = "aws4_request";
    var MAX_PRESIGNED_TTL = 60 * 60 * 24 * 7;
    var import_util_hex_encoding = require_dist_cjs6();
    var import_util_utf8 = require_dist_cjs5();
    var signingKeyCache = {};
    var cacheQueue = [];
    var createScope = /* @__PURE__ */ __name((shortDate, region, service) => `${shortDate}/${region}/${service}/${KEY_TYPE_IDENTIFIER}`, "createScope");
    var getSigningKey = /* @__PURE__ */ __name(async (sha256Constructor, credentials, shortDate, region, service) => {
      const credsHash = await hmac(sha256Constructor, credentials.secretAccessKey, credentials.accessKeyId);
      const cacheKey = `${shortDate}:${region}:${service}:${(0, import_util_hex_encoding.toHex)(credsHash)}:${credentials.sessionToken}`;
      if (cacheKey in signingKeyCache) {
        return signingKeyCache[cacheKey];
      }
      cacheQueue.push(cacheKey);
      while (cacheQueue.length > MAX_CACHE_SIZE) {
        delete signingKeyCache[cacheQueue.shift()];
      }
      let key = `AWS4${credentials.secretAccessKey}`;
      for (const signable of [shortDate, region, service, KEY_TYPE_IDENTIFIER]) {
        key = await hmac(sha256Constructor, key, signable);
      }
      return signingKeyCache[cacheKey] = key;
    }, "getSigningKey");
    var clearCredentialCache = /* @__PURE__ */ __name(() => {
      cacheQueue.length = 0;
      Object.keys(signingKeyCache).forEach((cacheKey) => {
        delete signingKeyCache[cacheKey];
      });
    }, "clearCredentialCache");
    var hmac = /* @__PURE__ */ __name((ctor, secret, data) => {
      const hash = new ctor(secret);
      hash.update((0, import_util_utf8.toUint8Array)(data));
      return hash.digest();
    }, "hmac");
    var getCanonicalHeaders = /* @__PURE__ */ __name(({ headers }, unsignableHeaders, signableHeaders) => {
      const canonical = {};
      for (const headerName of Object.keys(headers).sort()) {
        if (headers[headerName] == void 0) {
          continue;
        }
        const canonicalHeaderName = headerName.toLowerCase();
        if (canonicalHeaderName in ALWAYS_UNSIGNABLE_HEADERS || (unsignableHeaders == null ? void 0 : unsignableHeaders.has(canonicalHeaderName)) || PROXY_HEADER_PATTERN.test(canonicalHeaderName) || SEC_HEADER_PATTERN.test(canonicalHeaderName)) {
          if (!signableHeaders || signableHeaders && !signableHeaders.has(canonicalHeaderName)) {
            continue;
          }
        }
        canonical[canonicalHeaderName] = headers[headerName].trim().replace(/\s+/g, " ");
      }
      return canonical;
    }, "getCanonicalHeaders");
    var import_util_uri_escape = require_dist_cjs9();
    var getCanonicalQuery = /* @__PURE__ */ __name(({ query = {} }) => {
      const keys = [];
      const serialized = {};
      for (const key of Object.keys(query).sort()) {
        if (key.toLowerCase() === SIGNATURE_HEADER) {
          continue;
        }
        keys.push(key);
        const value = query[key];
        if (typeof value === "string") {
          serialized[key] = `${(0, import_util_uri_escape.escapeUri)(key)}=${(0, import_util_uri_escape.escapeUri)(value)}`;
        } else if (Array.isArray(value)) {
          serialized[key] = value.slice(0).reduce(
            (encoded, value2) => encoded.concat([`${(0, import_util_uri_escape.escapeUri)(key)}=${(0, import_util_uri_escape.escapeUri)(value2)}`]),
            []
          ).sort().join("&");
        }
      }
      return keys.map((key) => serialized[key]).filter((serialized2) => serialized2).join("&");
    }, "getCanonicalQuery");
    var import_is_array_buffer = require_dist_cjs3();
    var import_util_utf82 = require_dist_cjs5();
    var getPayloadHash = /* @__PURE__ */ __name(async ({ headers, body }, hashConstructor) => {
      for (const headerName of Object.keys(headers)) {
        if (headerName.toLowerCase() === SHA256_HEADER) {
          return headers[headerName];
        }
      }
      if (body == void 0) {
        return "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
      } else if (typeof body === "string" || ArrayBuffer.isView(body) || (0, import_is_array_buffer.isArrayBuffer)(body)) {
        const hashCtor = new hashConstructor();
        hashCtor.update((0, import_util_utf82.toUint8Array)(body));
        return (0, import_util_hex_encoding.toHex)(await hashCtor.digest());
      }
      return UNSIGNED_PAYLOAD;
    }, "getPayloadHash");
    var hasHeader = /* @__PURE__ */ __name((soughtHeader, headers) => {
      soughtHeader = soughtHeader.toLowerCase();
      for (const headerName of Object.keys(headers)) {
        if (soughtHeader === headerName.toLowerCase()) {
          return true;
        }
      }
      return false;
    }, "hasHeader");
    var cloneRequest = /* @__PURE__ */ __name(({ headers, query, ...rest }) => ({
      ...rest,
      headers: { ...headers },
      query: query ? cloneQuery(query) : void 0
    }), "cloneRequest");
    var cloneQuery = /* @__PURE__ */ __name((query) => Object.keys(query).reduce((carry, paramName) => {
      const param = query[paramName];
      return {
        ...carry,
        [paramName]: Array.isArray(param) ? [...param] : param
      };
    }, {}), "cloneQuery");
    var moveHeadersToQuery = /* @__PURE__ */ __name((request, options = {}) => {
      var _a;
      const { headers, query = {} } = typeof request.clone === "function" ? request.clone() : cloneRequest(request);
      for (const name of Object.keys(headers)) {
        const lname = name.toLowerCase();
        if (lname.slice(0, 6) === "x-amz-" && !((_a = options.unhoistableHeaders) == null ? void 0 : _a.has(lname))) {
          query[name] = headers[name];
          delete headers[name];
        }
      }
      return {
        ...request,
        headers,
        query
      };
    }, "moveHeadersToQuery");
    var prepareRequest = /* @__PURE__ */ __name((request) => {
      request = typeof request.clone === "function" ? request.clone() : cloneRequest(request);
      for (const headerName of Object.keys(request.headers)) {
        if (GENERATED_HEADERS.indexOf(headerName.toLowerCase()) > -1) {
          delete request.headers[headerName];
        }
      }
      return request;
    }, "prepareRequest");
    var iso8601 = /* @__PURE__ */ __name((time) => toDate(time).toISOString().replace(/\.\d{3}Z$/, "Z"), "iso8601");
    var toDate = /* @__PURE__ */ __name((time) => {
      if (typeof time === "number") {
        return new Date(time * 1e3);
      }
      if (typeof time === "string") {
        if (Number(time)) {
          return new Date(Number(time) * 1e3);
        }
        return new Date(time);
      }
      return time;
    }, "toDate");
    var _SignatureV4 = class _SignatureV4 {
      constructor({
        applyChecksum,
        credentials,
        region,
        service,
        sha256,
        uriEscapePath = true
      }) {
        this.headerMarshaller = new import_eventstream_codec.HeaderMarshaller(import_util_utf83.toUtf8, import_util_utf83.fromUtf8);
        this.service = service;
        this.sha256 = sha256;
        this.uriEscapePath = uriEscapePath;
        this.applyChecksum = typeof applyChecksum === "boolean" ? applyChecksum : true;
        this.regionProvider = (0, import_util_middleware.normalizeProvider)(region);
        this.credentialProvider = (0, import_util_middleware.normalizeProvider)(credentials);
      }
      async presign(originalRequest, options = {}) {
        const {
          signingDate = /* @__PURE__ */ new Date(),
          expiresIn = 3600,
          unsignableHeaders,
          unhoistableHeaders,
          signableHeaders,
          signingRegion,
          signingService
        } = options;
        const credentials = await this.credentialProvider();
        this.validateResolvedCredentials(credentials);
        const region = signingRegion ?? await this.regionProvider();
        const { longDate, shortDate } = formatDate(signingDate);
        if (expiresIn > MAX_PRESIGNED_TTL) {
          return Promise.reject(
            "Signature version 4 presigned URLs must have an expiration date less than one week in the future"
          );
        }
        const scope = createScope(shortDate, region, signingService ?? this.service);
        const request = moveHeadersToQuery(prepareRequest(originalRequest), { unhoistableHeaders });
        if (credentials.sessionToken) {
          request.query[TOKEN_QUERY_PARAM] = credentials.sessionToken;
        }
        request.query[ALGORITHM_QUERY_PARAM] = ALGORITHM_IDENTIFIER;
        request.query[CREDENTIAL_QUERY_PARAM] = `${credentials.accessKeyId}/${scope}`;
        request.query[AMZ_DATE_QUERY_PARAM] = longDate;
        request.query[EXPIRES_QUERY_PARAM] = expiresIn.toString(10);
        const canonicalHeaders = getCanonicalHeaders(request, unsignableHeaders, signableHeaders);
        request.query[SIGNED_HEADERS_QUERY_PARAM] = getCanonicalHeaderList(canonicalHeaders);
        request.query[SIGNATURE_QUERY_PARAM] = await this.getSignature(
          longDate,
          scope,
          this.getSigningKey(credentials, region, shortDate, signingService),
          this.createCanonicalRequest(request, canonicalHeaders, await getPayloadHash(originalRequest, this.sha256))
        );
        return request;
      }
      async sign(toSign, options) {
        if (typeof toSign === "string") {
          return this.signString(toSign, options);
        } else if (toSign.headers && toSign.payload) {
          return this.signEvent(toSign, options);
        } else if (toSign.message) {
          return this.signMessage(toSign, options);
        } else {
          return this.signRequest(toSign, options);
        }
      }
      async signEvent({ headers, payload }, { signingDate = /* @__PURE__ */ new Date(), priorSignature, signingRegion, signingService }) {
        const region = signingRegion ?? await this.regionProvider();
        const { shortDate, longDate } = formatDate(signingDate);
        const scope = createScope(shortDate, region, signingService ?? this.service);
        const hashedPayload = await getPayloadHash({ headers: {}, body: payload }, this.sha256);
        const hash = new this.sha256();
        hash.update(headers);
        const hashedHeaders = (0, import_util_hex_encoding.toHex)(await hash.digest());
        const stringToSign = [
          EVENT_ALGORITHM_IDENTIFIER,
          longDate,
          scope,
          priorSignature,
          hashedHeaders,
          hashedPayload
        ].join("\n");
        return this.signString(stringToSign, { signingDate, signingRegion: region, signingService });
      }
      async signMessage(signableMessage, { signingDate = /* @__PURE__ */ new Date(), signingRegion, signingService }) {
        const promise = this.signEvent(
          {
            headers: this.headerMarshaller.format(signableMessage.message.headers),
            payload: signableMessage.message.body
          },
          {
            signingDate,
            signingRegion,
            signingService,
            priorSignature: signableMessage.priorSignature
          }
        );
        return promise.then((signature) => {
          return { message: signableMessage.message, signature };
        });
      }
      async signString(stringToSign, { signingDate = /* @__PURE__ */ new Date(), signingRegion, signingService } = {}) {
        const credentials = await this.credentialProvider();
        this.validateResolvedCredentials(credentials);
        const region = signingRegion ?? await this.regionProvider();
        const { shortDate } = formatDate(signingDate);
        const hash = new this.sha256(await this.getSigningKey(credentials, region, shortDate, signingService));
        hash.update((0, import_util_utf83.toUint8Array)(stringToSign));
        return (0, import_util_hex_encoding.toHex)(await hash.digest());
      }
      async signRequest(requestToSign, {
        signingDate = /* @__PURE__ */ new Date(),
        signableHeaders,
        unsignableHeaders,
        signingRegion,
        signingService
      } = {}) {
        const credentials = await this.credentialProvider();
        this.validateResolvedCredentials(credentials);
        const region = signingRegion ?? await this.regionProvider();
        const request = prepareRequest(requestToSign);
        const { longDate, shortDate } = formatDate(signingDate);
        const scope = createScope(shortDate, region, signingService ?? this.service);
        request.headers[AMZ_DATE_HEADER] = longDate;
        if (credentials.sessionToken) {
          request.headers[TOKEN_HEADER] = credentials.sessionToken;
        }
        const payloadHash = await getPayloadHash(request, this.sha256);
        if (!hasHeader(SHA256_HEADER, request.headers) && this.applyChecksum) {
          request.headers[SHA256_HEADER] = payloadHash;
        }
        const canonicalHeaders = getCanonicalHeaders(request, unsignableHeaders, signableHeaders);
        const signature = await this.getSignature(
          longDate,
          scope,
          this.getSigningKey(credentials, region, shortDate, signingService),
          this.createCanonicalRequest(request, canonicalHeaders, payloadHash)
        );
        request.headers[AUTH_HEADER] = `${ALGORITHM_IDENTIFIER} Credential=${credentials.accessKeyId}/${scope}, SignedHeaders=${getCanonicalHeaderList(canonicalHeaders)}, Signature=${signature}`;
        return request;
      }
      createCanonicalRequest(request, canonicalHeaders, payloadHash) {
        const sortedHeaders = Object.keys(canonicalHeaders).sort();
        return `${request.method}
${this.getCanonicalPath(request)}
${getCanonicalQuery(request)}
${sortedHeaders.map((name) => `${name}:${canonicalHeaders[name]}`).join("\n")}

${sortedHeaders.join(";")}
${payloadHash}`;
      }
      async createStringToSign(longDate, credentialScope, canonicalRequest) {
        const hash = new this.sha256();
        hash.update((0, import_util_utf83.toUint8Array)(canonicalRequest));
        const hashedRequest = await hash.digest();
        return `${ALGORITHM_IDENTIFIER}
${longDate}
${credentialScope}
${(0, import_util_hex_encoding.toHex)(hashedRequest)}`;
      }
      getCanonicalPath({ path }) {
        if (this.uriEscapePath) {
          const normalizedPathSegments = [];
          for (const pathSegment of path.split("/")) {
            if ((pathSegment == null ? void 0 : pathSegment.length) === 0)
              continue;
            if (pathSegment === ".")
              continue;
            if (pathSegment === "..") {
              normalizedPathSegments.pop();
            } else {
              normalizedPathSegments.push(pathSegment);
            }
          }
          const normalizedPath = `${(path == null ? void 0 : path.startsWith("/")) ? "/" : ""}${normalizedPathSegments.join("/")}${normalizedPathSegments.length > 0 && (path == null ? void 0 : path.endsWith("/")) ? "/" : ""}`;
          const doubleEncoded = encodeURIComponent(normalizedPath);
          return doubleEncoded.replace(/%2F/g, "/");
        }
        return path;
      }
      async getSignature(longDate, credentialScope, keyPromise, canonicalRequest) {
        const stringToSign = await this.createStringToSign(longDate, credentialScope, canonicalRequest);
        const hash = new this.sha256(await keyPromise);
        hash.update((0, import_util_utf83.toUint8Array)(stringToSign));
        return (0, import_util_hex_encoding.toHex)(await hash.digest());
      }
      getSigningKey(credentials, region, shortDate, service) {
        return getSigningKey(this.sha256, credentials, shortDate, region, service || this.service);
      }
      validateResolvedCredentials(credentials) {
        if (typeof credentials !== "object" || // @ts-expect-error: Property 'accessKeyId' does not exist on type 'object'.ts(2339)
        typeof credentials.accessKeyId !== "string" || // @ts-expect-error: Property 'secretAccessKey' does not exist on type 'object'.ts(2339)
        typeof credentials.secretAccessKey !== "string") {
          throw new Error("Resolved credential object is not valid");
        }
      }
    };
    __name(_SignatureV4, "SignatureV4");
    var SignatureV4 = _SignatureV4;
    var formatDate = /* @__PURE__ */ __name((now) => {
      const longDate = iso8601(now).replace(/[\-:]/g, "");
      return {
        longDate,
        shortDate: longDate.slice(0, 8)
      };
    }, "formatDate");
    var getCanonicalHeaderList = /* @__PURE__ */ __name((headers) => Object.keys(headers).sort().join(";"), "getCanonicalHeaderList");
  }
});

// ../../../../packages/lib/dist/cjs/utils.js
var require_utils = __commonJS({
  "../../../../packages/lib/dist/cjs/utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.findAppSyncApiId = exports2.fetchResourcesByLogicalId = exports2.signAwsRequest = exports2.getAwsCredsProvider = exports2.replacePlaceholdersInText = void 0;
    var sha256_js_1 = require_main2();
    var client_cloudformation_1 = require("@aws-sdk/client-cloudformation");
    var credential_provider_node_1 = require("@aws-sdk/credential-provider-node");
    var credential_providers_1 = require("@aws-sdk/credential-providers");
    var signature_v4_1 = require_dist_cjs10();
    var client_appsync_1 = require("@aws-sdk/client-appsync");
    function replacePlaceholdersInText(text, replacementPairs, templateTag = ["${", "}"]) {
      let replacedText = text;
      replacementPairs.forEach(([target, replacement]) => {
        const regex = new RegExp(`${templateTag[0]}${target}${templateTag[1]}`, "g");
        replacedText = replacedText.replace(regex, replacement);
      });
      return replacedText;
    }
    exports2.replacePlaceholdersInText = replacePlaceholdersInText;
    function getAwsCredsProvider(profile) {
      if (process.env.CI === "true") {
        try {
          return (0, credential_providers_1.fromEnv)();
        } catch (error) {
          console.error("Failed to load AWS credentials from token file:", error);
          return void 0;
        }
      } else if (process.env.AWS_LAMBDA_FUNCTION_NAME) {
        console.log("Running in AWS Lambda. Using execution role for credentials.");
        return void 0;
      } else {
        return (0, credential_providers_1.fromIni)({ profile });
      }
    }
    exports2.getAwsCredsProvider = getAwsCredsProvider;
    async function signAwsRequest(service, request, region) {
      request.headers["Host"] = new URL(`https://${request.hostname}`).hostname;
      function headersToHeaderBag(headers) {
        const headerBag = {};
        headers.forEach((value, key) => {
          headerBag[key] = value;
        });
        return headerBag;
      }
      request.headers = headersToHeaderBag(new Headers(Object.entries(request.headers)));
      console.log(444, request.headers);
      const signer = new signature_v4_1.SignatureV4({
        credentials: (0, credential_provider_node_1.defaultProvider)(),
        region,
        service,
        sha256: sha256_js_1.Sha256
      });
      const signedRequest = await signer.sign(request);
      return signedRequest;
    }
    exports2.signAwsRequest = signAwsRequest;
    async function fetchResourcesByLogicalId(resources, stackName, client) {
      const command = new client_cloudformation_1.DescribeStackResourcesCommand({ StackName: stackName });
      const response = await client.send(command);
      const result = {};
      if (!response.StackResources) {
        return void 0;
      }
      response.StackResources.forEach((resource) => {
        const logicalResourceId = resource.LogicalResourceId;
        if (!logicalResourceId)
          return;
        if (resources[logicalResourceId] && resource.ResourceType === resources[logicalResourceId]) {
          result[logicalResourceId] = resource.PhysicalResourceId;
        }
      });
      return result;
    }
    exports2.fetchResourcesByLogicalId = fetchResourcesByLogicalId;
    async function findAppSyncApiId({ endpoint, name, client }) {
      var _a;
      if (!endpoint && !name) {
        throw new Error("Either 'endpoint' or 'name' must be provided.");
      }
      let nextToken = void 0;
      do {
        const response = await client.send(new client_appsync_1.ListGraphqlApisCommand({ nextToken }));
        for (const api of response.graphqlApis || []) {
          if (endpoint && ((_a = api.uris) === null || _a === void 0 ? void 0 : _a.GRAPHQL) === endpoint) {
            return api.apiId || null;
          } else if (name && api.name === name) {
            return api.apiId || null;
          }
        }
        nextToken = response.nextToken;
      } while (nextToken);
      return null;
    }
    exports2.findAppSyncApiId = findAppSyncApiId;
  }
});

// ../../../../packages/lib/dist/cjs/appsync.js
var require_appsync = __commonJS({
  "../../../../packages/lib/dist/cjs/appsync.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.callGqlEndpoint = void 0;
    var protocol_http_1 = require_dist_cjs2();
    var utils_1 = require_utils();
    async function callGqlEndpoint(params) {
      const region = process.env.AWS_REGION || process.env.REGION;
      if (!region)
        throw new Error("Region not found in environment variables");
      const { graphqlEndpoint, query, variables } = params;
      const request = new protocol_http_1.HttpRequest({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        hostname: new URL(graphqlEndpoint).hostname,
        path: params.path,
        body: JSON.stringify({ query, variables })
      });
      const signedRequest = await (0, utils_1.signAwsRequest)("appsync", request, region);
      const response = await fetch(graphqlEndpoint, {
        method: "POST",
        headers: signedRequest.headers,
        body: signedRequest.body
      });
      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`Error calling GraphQL endpoint: ${errorBody}`);
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      return response.json();
    }
    exports2.callGqlEndpoint = callGqlEndpoint;
  }
});

// ../../../../packages/lib/dist/cjs/lambda-response.js
var require_lambda_response = __commonJS({
  "../../../../packages/lib/dist/cjs/lambda-response.js"(exports2) {
    "use strict";
    var _a;
    var _b;
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.runApiOps = exports2.handleError = exports2.createResponse = exports2.addCORSHeaders = void 0;
    var preflightCacheTtl = process.env.PREFLIGHT_CACHE_TTL || "3600";
    var allowedOrigins = JSON.parse(process.env.ALLOWED_ORIGINS || "[]");
    var isConsole = ((_a = process.env.LOGGING_LEVEL) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "debug" || ((_b = process.env.LOGGING_LEVEL) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === "verbose";
    var addCORSHeaders = (response, allowedOrigin) => {
      response.headers = {
        ...response.headers,
        "Access-Control-Allow-Origin": allowedOrigin,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
        "Access-Control-Allow-Headers": "Content-Type, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Max-Age": preflightCacheTtl
      };
      return response;
    };
    exports2.addCORSHeaders = addCORSHeaders;
    var createResponse = (eventHeaders, statusCode, body) => {
      let origin;
      if (eventHeaders)
        origin = eventHeaders["Origin"] || eventHeaders["origin"];
      const basicResponse = {
        statusCode,
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json"
        }
      };
      if (origin && allowedOrigins.includes(origin)) {
        return (0, exports2.addCORSHeaders)(basicResponse, origin);
      } else {
        return basicResponse;
      }
    };
    exports2.createResponse = createResponse;
    var handleError = (error) => {
      console.error(error);
      const response = {
        statusCode: 500,
        body: JSON.stringify({ message: "Internal Server Error" })
      };
      const errorMappings = {
        ValidationError: { statusCode: 400, message: "Validation failed" },
        UnauthorizedError: { statusCode: 401, message: "Unauthorized access" },
        ForbiddenError: { statusCode: 403, message: "Access forbidden" },
        NotFoundError: { statusCode: 404, message: "Resource not found" },
        MethodNotAllowedError: { statusCode: 405, message: "Method not allowed" },
        ConflictError: { statusCode: 409, message: "Resource conflict" },
        InternalServerError: {
          statusCode: 500,
          message: "Internal server error"
        },
        ServiceUnavailableError: {
          statusCode: 503,
          message: "Service unavailable"
        }
      };
      if (errorMappings[error.name]) {
        const mappedError = errorMappings[error.name];
        response.statusCode = mappedError === null || mappedError === void 0 ? void 0 : mappedError.statusCode;
        response.body = JSON.stringify({
          message: error.message || (mappedError === null || mappedError === void 0 ? void 0 : mappedError.message)
        });
      } else if (error.statusCode) {
        response.statusCode = error.statusCode;
        response.body = JSON.stringify({ message: error.message });
      }
      return response;
    };
    exports2.handleError = handleError;
    async function runApiOps({ operation, event, apiUrl, apiKey }) {
      try {
        if (isConsole)
          console.log({ event });
        const result = await operation({ event, apiUrl, apiKey });
        const response = (0, exports2.createResponse)(event.headers, 200, result);
        if (isConsole)
          console.log({ response });
        return response;
      } catch (error) {
        console.error("Error:", error);
        return (0, exports2.handleError)(error);
      }
    }
    exports2.runApiOps = runApiOps;
  }
});

// ../../../../packages/lib/dist/cjs/parameter.js
var require_parameter = __commonJS({
  "../../../../packages/lib/dist/cjs/parameter.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getParameter = void 0;
    var client_ssm_1 = require("@aws-sdk/client-ssm");
    var utils_1 = require_utils();
    var getParameter = async (parameterName, region, profile) => {
      var _a;
      const ssmClient = new client_ssm_1.SSMClient({
        region,
        credentials: (0, utils_1.getAwsCredsProvider)(profile)
      });
      try {
        const command = new client_ssm_1.GetParameterCommand({
          Name: parameterName,
          WithDecryption: true
        });
        const response = await ssmClient.send(command);
        return ((_a = response.Parameter) === null || _a === void 0 ? void 0 : _a.Value) || "";
      } catch (error) {
        console.warn(`Error fetching parameter: ${error}`);
        throw error;
      }
    };
    exports2.getParameter = getParameter;
  }
});

// ../../../../packages/lib/dist/cjs/secret.js
var require_secret = __commonJS({
  "../../../../packages/lib/dist/cjs/secret.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.getSecret = exports2.getSecretFromSecretsManager = void 0;
    var client_secrets_manager_1 = require("@aws-sdk/client-secrets-manager");
    var parameter_1 = require_parameter();
    var utils_1 = require_utils();
    var getSecretFromSecretsManager = async ({ secretId, region, profile }) => {
      const secretsManagerClient = new client_secrets_manager_1.SecretsManagerClient({
        region,
        credentials: (0, utils_1.getAwsCredsProvider)(profile)
      });
      try {
        const command = new client_secrets_manager_1.GetSecretValueCommand({ SecretId: secretId });
        const response = await secretsManagerClient.send(command);
        return response.SecretString || "";
      } catch (error) {
        console.error(`Error fetching secret: ${error}`);
        throw error;
      }
    };
    exports2.getSecretFromSecretsManager = getSecretFromSecretsManager;
    var getSecret = async ({ key, env, region, profile }) => {
      try {
        if (env === "prod") {
          return await (0, exports2.getSecretFromSecretsManager)({
            secretId: key,
            region,
            profile
          });
        } else {
          const secret = await (0, parameter_1.getParameter)(key, region, profile);
          return secret || process.env[key];
        }
      } catch (error) {
        console.warn(`Error fetching secret: ${error}`);
        return void 0;
      }
    };
    exports2.getSecret = getSecret;
  }
});

// ../../../../node_modules/change-case-all/dist/index.umd.cjs
var require_index_umd = __commonJS({
  "../../../../node_modules/change-case-all/dist/index.umd.cjs"(exports2, module2) {
    (function(global, factory) {
      typeof exports2 === "object" && typeof module2 !== "undefined" ? factory(exports2) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.ChangeCaseAll = {}));
    })(exports2, function(exports22) {
      "use strict";
      const SPLIT_LOWER_UPPER_RE = new RegExp("([\\p{Ll}\\d])(\\p{Lu})", "gu");
      const SPLIT_UPPER_UPPER_RE = new RegExp("(\\p{Lu})([\\p{Lu}][\\p{Ll}])", "gu");
      const SPLIT_NUMBER_LOWER_RE = new RegExp("(\\d)(\\p{Ll})", "gu");
      const SPLIT_LETTER_NUMBER_RE = new RegExp("(\\p{L})(\\d)", "gu");
      const DEFAULT_STRIP_REGEXP = /[^\p{L}\d]+/giu;
      const SPLIT_REPLACE_VALUE = "$1\0$2";
      const DEFAULT_PREFIX_CHARACTERS = "";
      function split(input, options) {
        let result = input.trim();
        result = result.replace(SPLIT_LOWER_UPPER_RE, SPLIT_REPLACE_VALUE).replace(SPLIT_UPPER_UPPER_RE, SPLIT_REPLACE_VALUE);
        if (options == null ? void 0 : options.separateNumbers) {
          result = result.replace(SPLIT_NUMBER_LOWER_RE, SPLIT_REPLACE_VALUE).replace(SPLIT_LETTER_NUMBER_RE, SPLIT_REPLACE_VALUE);
        }
        result = result.replace(DEFAULT_STRIP_REGEXP, "\0");
        let start = 0;
        let end = result.length;
        while (result.charAt(start) === "\0")
          start++;
        if (start === end)
          return [];
        while (result.charAt(end - 1) === "\0")
          end--;
        return result.slice(start, end).split(/\0/g);
      }
      function noCase$1(input, options) {
        const prefix = getPrefix(input, options == null ? void 0 : options.prefixCharacters);
        return prefix + split(input, options).map(lowerFactory(options == null ? void 0 : options.locale)).join((options == null ? void 0 : options.delimiter) ?? " ");
      }
      function camelCase$1(input, options) {
        const prefix = getPrefix(input, options == null ? void 0 : options.prefixCharacters);
        const lower = lowerFactory(options == null ? void 0 : options.locale);
        const upper = upperFactory(options == null ? void 0 : options.locale);
        const transform = (options == null ? void 0 : options.mergeAmbiguousCharacters) ? capitalCaseTransformFactory(lower, upper) : pascalCaseTransformFactory(lower, upper);
        return prefix + split(input, options).map((word, index) => {
          if (index === 0)
            return lower(word);
          return transform(word, index);
        }).join((options == null ? void 0 : options.delimiter) ?? "");
      }
      function pascalCase$1(input, options) {
        const prefix = getPrefix(input, options == null ? void 0 : options.prefixCharacters);
        const lower = lowerFactory(options == null ? void 0 : options.locale);
        const upper = upperFactory(options == null ? void 0 : options.locale);
        const transform = (options == null ? void 0 : options.mergeAmbiguousCharacters) ? capitalCaseTransformFactory(lower, upper) : pascalCaseTransformFactory(lower, upper);
        return prefix + split(input, options).map(transform).join((options == null ? void 0 : options.delimiter) ?? "");
      }
      function capitalCase$1(input, options) {
        const prefix = getPrefix(input, options == null ? void 0 : options.prefixCharacters);
        const lower = lowerFactory(options == null ? void 0 : options.locale);
        const upper = upperFactory(options == null ? void 0 : options.locale);
        return prefix + split(input, options).map(capitalCaseTransformFactory(lower, upper)).join((options == null ? void 0 : options.delimiter) ?? " ");
      }
      function constantCase$1(input, options) {
        const prefix = getPrefix(input, options == null ? void 0 : options.prefixCharacters);
        return prefix + split(input, options).map(upperFactory(options == null ? void 0 : options.locale)).join((options == null ? void 0 : options.delimiter) ?? "_");
      }
      function dotCase$1(input, options) {
        return noCase$1(input, { delimiter: ".", ...options });
      }
      function kebabCase$1(input, options) {
        return noCase$1(input, { delimiter: "-", ...options });
      }
      function pathCase$1(input, options) {
        return noCase$1(input, { delimiter: "/", ...options });
      }
      function sentenceCase$1(input, options) {
        const prefix = getPrefix(input, options == null ? void 0 : options.prefixCharacters);
        const lower = lowerFactory(options == null ? void 0 : options.locale);
        const upper = upperFactory(options == null ? void 0 : options.locale);
        const transform = capitalCaseTransformFactory(lower, upper);
        return prefix + split(input, options).map((word, index) => {
          if (index === 0)
            return transform(word);
          return lower(word);
        }).join((options == null ? void 0 : options.delimiter) ?? " ");
      }
      function snakeCase$1(input, options) {
        return noCase$1(input, { delimiter: "_", ...options });
      }
      function trainCase$1(input, options) {
        return capitalCase$1(input, { delimiter: "-", ...options });
      }
      function lowerFactory(locale) {
        return locale === false ? (input) => input.toLowerCase() : (input) => input.toLocaleLowerCase(locale);
      }
      function upperFactory(locale) {
        return locale === false ? (input) => input.toUpperCase() : (input) => input.toLocaleUpperCase(locale);
      }
      function capitalCaseTransformFactory(lower, upper) {
        return (word) => `${upper(word[0])}${lower(word.slice(1))}`;
      }
      function pascalCaseTransformFactory(lower, upper) {
        return (word, index) => {
          const char0 = word[0];
          const initial = index > 0 && char0 >= "0" && char0 <= "9" ? "_" + char0 : upper(char0);
          return initial + lower(word.slice(1));
        };
      }
      function getPrefix(input, prefixCharacters = DEFAULT_PREFIX_CHARACTERS) {
        let prefix = "";
        for (let i = 0; i < input.length; i++) {
          const char = input.charAt(i);
          if (prefixCharacters.includes(char)) {
            prefix += char;
          } else {
            break;
          }
        }
        return prefix;
      }
      function spongeCase$1(input, locale) {
        let result = "";
        for (const char of input) {
          result += Math.random() > 0.5 ? char.toLocaleUpperCase(locale) : char.toLocaleLowerCase(locale);
        }
        return result;
      }
      function swapCase$1(input, locale) {
        let result = "";
        for (const char of input) {
          const lower = char.toLocaleLowerCase(locale);
          result += char === lower ? char.toLocaleUpperCase(locale) : lower;
        }
        return result;
      }
      var SMALL_WORDS = /\b(?:an?d?|a[st]|because|but|by|en|for|i[fn]|neither|nor|o[fnr]|only|over|per|so|some|tha[tn]|the|to|up|upon|vs?\.?|versus|via|when|with|without|yet)\b/i;
      var TOKENS = /[^\s:–—-]+|./g;
      var WHITESPACE = /\s/;
      var IS_MANUAL_CASE = /.(?=[A-Z]|\..)/;
      var ALPHANUMERIC_PATTERN = /[A-Za-z0-9\u00C0-\u00FF]/;
      function titleCase$1(input) {
        var result = "";
        var m;
        while ((m = TOKENS.exec(input)) !== null) {
          var token = m[0], index = m.index;
          if (
            // Ignore already capitalized words.
            !IS_MANUAL_CASE.test(token) && // Ignore small words except at beginning or end.
            (!SMALL_WORDS.test(token) || index === 0 || index + token.length === input.length) && // Ignore URLs.
            (input.charAt(index + token.length) !== ":" || WHITESPACE.test(input.charAt(index + token.length + 1)))
          ) {
            result += token.replace(ALPHANUMERIC_PATTERN, function(m2) {
              return m2.toUpperCase();
            });
            continue;
          }
          result += token;
        }
        return result;
      }
      const camelCase = camelCase$1;
      const capitalCase = capitalCase$1;
      const constantCase = constantCase$1;
      const dotCase = dotCase$1;
      const noCase = noCase$1;
      const pascalCase = pascalCase$1;
      const pathCase = pathCase$1;
      const sentenceCase = sentenceCase$1;
      const snakeCase = snakeCase$1;
      const headerCase = trainCase$1;
      const trainCase = trainCase$1;
      const paramCase = kebabCase$1;
      const kebabCase = kebabCase$1;
      const spongeCase = spongeCase$1;
      const swapCase = swapCase$1;
      const titleCase = titleCase$1;
      const upperCase = (str) => str.toUpperCase();
      const localeUpperCase = (str, locales) => str.toLocaleUpperCase(locales);
      const lowerCase = (str) => str.toLowerCase();
      const localeLowerCase = (str, locales) => str.toLocaleLowerCase(locales);
      const lowerCaseFirst = (str) => str.charAt(0).toLowerCase() + str.slice(1);
      const upperCaseFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);
      const isUpperCase = (str) => str === str.toUpperCase();
      const isLowerCase = (str) => str === str.toLowerCase();
      const _Case = class _Case {
      };
      _Case.camel = camelCase;
      _Case.capital = capitalCase;
      _Case.constant = constantCase;
      _Case.dot = dotCase;
      _Case.kebab = kebabCase;
      _Case.lower = lowerCase;
      _Case.lowerFirst = lowerCaseFirst;
      _Case.localeLower = localeLowerCase;
      _Case.localeUpper = localeUpperCase;
      _Case.no = noCase;
      _Case.pascal = pascalCase;
      _Case.path = pathCase;
      _Case.sentence = sentenceCase;
      _Case.snake = snakeCase;
      _Case.sponge = spongeCase;
      _Case.swap = swapCase;
      _Case.title = titleCase;
      _Case.train = trainCase;
      _Case.upper = upperCase;
      _Case.upperFirst = upperCaseFirst;
      _Case.isUpper = isUpperCase;
      _Case.isLower = isLowerCase;
      let Case = _Case;
      exports22.Case = Case;
      exports22.camelCase = camelCase;
      exports22.capitalCase = capitalCase;
      exports22.constantCase = constantCase;
      exports22.dotCase = dotCase;
      exports22.headerCase = headerCase;
      exports22.isLowerCase = isLowerCase;
      exports22.isUpperCase = isUpperCase;
      exports22.kebabCase = kebabCase;
      exports22.localeLowerCase = localeLowerCase;
      exports22.localeUpperCase = localeUpperCase;
      exports22.lowerCase = lowerCase;
      exports22.lowerCaseFirst = lowerCaseFirst;
      exports22.noCase = noCase;
      exports22.paramCase = paramCase;
      exports22.pascalCase = pascalCase;
      exports22.pathCase = pathCase;
      exports22.sentenceCase = sentenceCase;
      exports22.snakeCase = snakeCase;
      exports22.spongeCase = spongeCase;
      exports22.swapCase = swapCase;
      exports22.titleCase = titleCase;
      exports22.trainCase = trainCase;
      exports22.upperCase = upperCase;
      exports22.upperCaseFirst = upperCaseFirst;
      Object.defineProperty(exports22, Symbol.toStringTag, { value: "Module" });
    });
  }
});

// ../../../../packages/lib/dist/cjs/document-utils.js
var require_document_utils = __commonJS({
  "../../../../packages/lib/dist/cjs/document-utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.fetchDocumentWithPresignedUrl = exports2.uploadDocumentWithPresignedUrl = exports2.getPresignedUrl = exports2.getS3ObjectKey = exports2.createS3ObjectKey = exports2.extractMetadataFromHeaders = exports2.createMetadata = exports2.getValidatedS3ObjectKey = exports2.isValidUploadDocumentMetadata = void 0;
    var lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
    var change_case_all_1 = require_index_umd();
    var client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
    var s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
    var client_s3_1 = require("@aws-sdk/client-s3");
    var isValidUploadDocumentMetadata = (metadata) => {
      if (typeof metadata !== "object" || metadata === null)
        return false;
      const meta = metadata;
      const isValidStrings = [
        "mimetype",
        "dirname",
        "entityType",
        "filename",
        "username"
      ].every((field) => typeof meta[field] === "string" && meta[field] !== "");
      const isValidTags = !meta.tags || Array.isArray(meta.tags) && meta.tags.every((tag) => typeof tag === "string");
      const isValidTtl = typeof meta.ttl === "number" || meta.ttl === null || meta.ttl === void 0;
      return isValidStrings && isValidTags && isValidTtl;
    };
    exports2.isValidUploadDocumentMetadata = isValidUploadDocumentMetadata;
    var ddbClient = new client_dynamodb_1.DynamoDBClient({ region: process.env.REGION });
    var ddbDocClient = lib_dynamodb_1.DynamoDBDocumentClient.from(ddbClient);
    var getValidatedS3ObjectKey2 = async (args, tableName) => {
      const key = (0, exports2.createS3ObjectKey)(args);
      console.log({
        args,
        tableName
      });
      const { Item } = await ddbDocClient.send(new lib_dynamodb_1.GetCommand({
        TableName: tableName,
        Key: { key, username: args.username },
        ProjectionExpression: "username, dirname, filename"
      }));
      if (Item) {
        let isExpectedDocument = Item.username === args.username && Item.dirname === args.dirname && Item.filename === args.filename;
        if (args.version) {
          isExpectedDocument = isExpectedDocument && Item.version === args.version;
        }
        if (isExpectedDocument) {
          return key;
        }
      }
      return null;
    };
    exports2.getValidatedS3ObjectKey = getValidatedS3ObjectKey2;
    var createMetadata2 = (metadata, mode = "metadata") => {
      if (!(0, exports2.isValidUploadDocumentMetadata)(metadata)) {
        throw new Error("Invalid metadata provided");
      }
      const { mimetype, dirname, filename, entityType, username, ttl, tags } = metadata;
      const formattedMetadata = {
        mimetype,
        dirname,
        filename,
        entityType,
        username,
        ...ttl && { ttl },
        ...tags && { tags: tags.toString() }
      };
      if (mode !== "metadata" && mode !== "headers")
        throw new Error("Invalid mode provided");
      if (mode === "headers") {
        return Object.entries(formattedMetadata).map(([key, value]) => ({
          [change_case_all_1.Case.kebab(key)]: value === null || value === void 0 ? void 0 : value.toString()
        })).reduce((acc, curr) => ({ ...acc, ...curr }), {});
      }
      return formattedMetadata;
    };
    exports2.createMetadata = createMetadata2;
    function extractMetadataFromHeaders(Metadata) {
      if (!Metadata)
        return void 0;
      const extractedMetadata = {};
      Object.entries(Metadata).forEach(([key, value]) => {
        const normalizedKey = change_case_all_1.Case.camel(key.startsWith("x-amz-meta-") ? key.substring(11) : key);
        if (normalizedKey === "ttl") {
          extractedMetadata[normalizedKey] = parseInt(value, 10);
        } else {
          extractedMetadata[normalizedKey] = value;
        }
      });
      if (extractedMetadata.tags && typeof extractedMetadata.tags === "string") {
        extractedMetadata.tags = extractedMetadata.tags.split(",");
      }
      return extractedMetadata;
    }
    exports2.extractMetadataFromHeaders = extractMetadataFromHeaders;
    var createS3ObjectKey2 = (args) => {
      return `${args.username}/${args.dirname}/${args.filename}`;
    };
    exports2.createS3ObjectKey = createS3ObjectKey2;
    var getS3ObjectKey = async (args, tableName) => {
      return (0, exports2.getValidatedS3ObjectKey)(args, tableName);
    };
    exports2.getS3ObjectKey = getS3ObjectKey;
    var getPresignedUrl2 = async (params) => {
      const s3Client = new client_s3_1.S3Client({ region: process.env.REGION });
      let command;
      if (params.method === "getObject") {
        const getObjectParams = {
          Bucket: params.bucket,
          Key: params.key,
          ...params.versionId && { VersionId: params.versionId }
        };
        command = new client_s3_1.GetObjectCommand(getObjectParams);
      } else if (params.method === "putObject") {
        const commandInput = {
          Bucket: params.bucket,
          Key: params.key,
          Metadata: params.metadata,
          ContentType: params === null || params === void 0 ? void 0 : params.contentType
        };
        command = new client_s3_1.PutObjectCommand(commandInput);
      } else {
        throw new Error("Unsupported method provided");
      }
      const signedUrl = await (0, s3_request_presigner_1.getSignedUrl)(s3Client, command, {
        expiresIn: params.expiry
      });
      return signedUrl;
    };
    exports2.getPresignedUrl = getPresignedUrl2;
    async function uploadDocumentWithPresignedUrl(params) {
      const { signedUrl, metadataHeaders, content, contentType } = params;
      const uploadResult = await fetch(signedUrl, {
        method: "PUT",
        headers: {
          ...metadataHeaders,
          "Content-Type": contentType || "application/octet-stream"
        },
        body: content
      });
      return uploadResult;
    }
    exports2.uploadDocumentWithPresignedUrl = uploadDocumentWithPresignedUrl;
    async function fetchDocumentWithPresignedUrl(downloadUrl) {
      try {
        const response = await fetch(downloadUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch document: ${response.statusText}`);
        }
        const mimetype = response.headers.get("Content-Type");
        if (mimetype === null || mimetype === void 0 ? void 0 : mimetype.includes("application/json")) {
          return await response.json();
        } else if (mimetype === null || mimetype === void 0 ? void 0 : mimetype.includes("text")) {
          return await response.text();
        } else {
          return await response.blob();
        }
      } catch (error) {
        console.error("Error fetching document:", error);
        throw error;
      }
    }
    exports2.fetchDocumentWithPresignedUrl = fetchDocumentWithPresignedUrl;
  }
});

// ../../../../packages/lib/dist/cjs/index.js
var require_cjs = __commonJS({
  "../../../../packages/lib/dist/cjs/index.js"(exports2) {
    "use strict";
    var __createBinding3 = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar3 = exports2 && exports2.__exportStar || function(m, exports3) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p))
          __createBinding3(exports3, m, p);
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    __exportStar3(require_appsync(), exports2);
    __exportStar3(require_lambda_response(), exports2);
    __exportStar3(require_parameter(), exports2);
    __exportStar3(require_secret(), exports2);
    __exportStar3(require_utils(), exports2);
    __exportStar3(require_document_utils(), exports2);
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(src_exports);

// src/.env.json
var PAYCODE_DOCUMENT_STORE_BUCKET_NAME = "paycode-customer-v2-document-store153324-dev";

// src/index.ts
var import_cjs = __toESM(require_cjs());
if (!process.env.API_PAYCODEGQL_DOCUMENTINDEXTABLE_NAME) {
  throw new Error("API_PAYCODEGQL_DOCUMENTINDEXTABLE_NAME is not defined.");
}
if (!PAYCODE_DOCUMENT_STORE_BUCKET_NAME)
  throw new Error("PAYCODE_DOCUMENT_STORE_BUCKET_NAME is not defined.");
var DOCUMENT_INDEX_TABLE = process.env.API_PAYCODEGQL_DOCUMENTINDEXTABLE_NAME;
var handler = async (event) => {
  if (event.fieldName !== "getUploadDocumentAccess" && event.fieldName !== "getDownloadDocumentAccess") {
    throw new Error("Invalid handler invocation");
  }
  try {
    if (event.fieldName === "getUploadDocumentAccess") {
      const {
        mimetype,
        dirname,
        entityType,
        filename,
        username,
        ttl,
        tags,
        expiry = 3600
      } = event.arguments.params;
      const args = {
        mimetype,
        dirname,
        entityType,
        filename,
        username,
        ...ttl && { ttl },
        ...tags && { tags }
      };
      const presignedParams = {
        method: "putObject",
        bucket: PAYCODE_DOCUMENT_STORE_BUCKET_NAME,
        contentType: mimetype,
        expiry,
        key: (0, import_cjs.createS3ObjectKey)(args),
        metadata: (0, import_cjs.createMetadata)(args, "headers")
      };
      console.debug({ presignedParams, metadata: presignedParams.metadata });
      return {
        __typename: "UploadDocumentAccess",
        metadataHeaders: JSON.stringify(presignedParams.metadata),
        signedUrl: await (0, import_cjs.getPresignedUrl)(
          presignedParams
        )
      };
    } else if (event.fieldName === "getDownloadDocumentAccess") {
      const {
        dirname,
        filename,
        username,
        version,
        expiry = 3600
      } = event.arguments.params;
      const validatedKey = await (0, import_cjs.getValidatedS3ObjectKey)(
        {
          dirname,
          filename,
          username
        },
        DOCUMENT_INDEX_TABLE
      );
      if (!validatedKey)
        throw new Error("Document not found or access denied.");
      const getPresignedUrlParams = {
        method: "getObject",
        bucket: PAYCODE_DOCUMENT_STORE_BUCKET_NAME,
        key: validatedKey,
        expiry,
        versionId: version
      };
      console.debug({ getPresignedUrlParams });
      return {
        __typename: "DownloadDocumentAccess",
        signedUrl: await (0, import_cjs.getPresignedUrl)(
          getPresignedUrlParams
        )
      };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
/*! Bundled license information:

tslib/tslib.es6.js:
  (*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** *)
*/
