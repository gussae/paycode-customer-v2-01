"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// ../../../../../../../node_modules/@aws-sdk/util-dynamodb/dist-cjs/index.js
var require_dist_cjs = __commonJS({
  "../../../../../../../node_modules/@aws-sdk/util-dynamodb/dist-cjs/index.js"(exports2, module2) {
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
    var src_exports = {};
    __export2(src_exports, {
      NumberValueImpl: () => NumberValue,
      convertToAttr: () => convertToAttr,
      convertToNative: () => convertToNative,
      marshall: () => marshall,
      unmarshall: () => unmarshall2
    });
    module2.exports = __toCommonJS2(src_exports);
    var _NumberValue = class _NumberValue2 {
      /**
       * This class does not validate that your string input is a valid number.
       *
       * @param value - a precise number, or any BigInt or string, or AttributeValue.
       */
      constructor(value) {
        if (typeof value === "object" && "N" in value) {
          this.value = String(value.N);
        } else {
          this.value = String(value);
        }
        const valueOf = typeof value.valueOf() === "number" ? value.valueOf() : 0;
        const imprecise = valueOf > Number.MAX_SAFE_INTEGER || valueOf < Number.MIN_SAFE_INTEGER || Math.abs(valueOf) === Infinity || Number.isNaN(valueOf);
        if (imprecise) {
          throw new Error(
            `NumberValue should not be initialized with an imprecise number=${valueOf}. Use a string instead.`
          );
        }
      }
      /**
       * This class does not validate that your string input is a valid number.
       *
       * @param value - a precise number, or any BigInt or string, or AttributeValue.
       */
      static from(value) {
        return new _NumberValue2(value);
      }
      /**
       * @returns the AttributeValue form for DynamoDB.
       */
      toAttributeValue() {
        return {
          N: this.toString()
        };
      }
      /**
       * @returns BigInt representation.
       *
       * @throws SyntaxError if the string representation is not convertable to a BigInt.
       */
      toBigInt() {
        const stringValue = this.toString();
        return BigInt(stringValue);
      }
      /**
       * @override
       *
       * @returns string representation. This is the canonical format in DynamoDB.
       */
      toString() {
        return String(this.value);
      }
      /**
       * @override
       */
      valueOf() {
        return this.toString();
      }
    };
    __name(_NumberValue, "NumberValue");
    var NumberValue = _NumberValue;
    var convertToAttr = /* @__PURE__ */ __name((data, options) => {
      var _a, _b, _c, _d, _e, _f;
      if (data === void 0) {
        throw new Error(`Pass options.removeUndefinedValues=true to remove undefined values from map/array/set.`);
      } else if (data === null && typeof data === "object") {
        return convertToNullAttr();
      } else if (Array.isArray(data)) {
        return convertToListAttr(data, options);
      } else if (((_a = data == null ? void 0 : data.constructor) == null ? void 0 : _a.name) === "Set") {
        return convertToSetAttr(data, options);
      } else if (((_b = data == null ? void 0 : data.constructor) == null ? void 0 : _b.name) === "Map") {
        return convertToMapAttrFromIterable(data, options);
      } else if (((_c = data == null ? void 0 : data.constructor) == null ? void 0 : _c.name) === "Object" || // for object which is result of Object.create(null), which doesn't have constructor defined
      !data.constructor && typeof data === "object") {
        return convertToMapAttrFromEnumerableProps(data, options);
      } else if (isBinary(data)) {
        if (data.length === 0 && (options == null ? void 0 : options.convertEmptyValues)) {
          return convertToNullAttr();
        }
        return convertToBinaryAttr(data);
      } else if (typeof data === "boolean" || ((_d = data == null ? void 0 : data.constructor) == null ? void 0 : _d.name) === "Boolean") {
        return { BOOL: data.valueOf() };
      } else if (typeof data === "number" || ((_e = data == null ? void 0 : data.constructor) == null ? void 0 : _e.name) === "Number") {
        return convertToNumberAttr(data);
      } else if (data instanceof NumberValue) {
        return data.toAttributeValue();
      } else if (typeof data === "bigint") {
        return convertToBigIntAttr(data);
      } else if (typeof data === "string" || ((_f = data == null ? void 0 : data.constructor) == null ? void 0 : _f.name) === "String") {
        if (data.length === 0 && (options == null ? void 0 : options.convertEmptyValues)) {
          return convertToNullAttr();
        }
        return convertToStringAttr(data);
      } else if ((options == null ? void 0 : options.convertClassInstanceToMap) && typeof data === "object") {
        return convertToMapAttrFromEnumerableProps(data, options);
      }
      throw new Error(
        `Unsupported type passed: ${data}. Pass options.convertClassInstanceToMap=true to marshall typeof object as map attribute.`
      );
    }, "convertToAttr");
    var convertToListAttr = /* @__PURE__ */ __name((data, options) => ({
      L: data.filter(
        (item) => typeof item !== "function" && (!(options == null ? void 0 : options.removeUndefinedValues) || (options == null ? void 0 : options.removeUndefinedValues) && item !== void 0)
      ).map((item) => convertToAttr(item, options))
    }), "convertToListAttr");
    var convertToSetAttr = /* @__PURE__ */ __name((set, options) => {
      const setToOperate = (options == null ? void 0 : options.removeUndefinedValues) ? new Set([...set].filter((value) => value !== void 0)) : set;
      if (!(options == null ? void 0 : options.removeUndefinedValues) && setToOperate.has(void 0)) {
        throw new Error(`Pass options.removeUndefinedValues=true to remove undefined values from map/array/set.`);
      }
      if (setToOperate.size === 0) {
        if (options == null ? void 0 : options.convertEmptyValues) {
          return convertToNullAttr();
        }
        throw new Error(`Pass a non-empty set, or options.convertEmptyValues=true.`);
      }
      const item = setToOperate.values().next().value;
      if (item instanceof NumberValue) {
        return {
          NS: Array.from(setToOperate).map((_) => _.toString())
        };
      } else if (typeof item === "number") {
        return {
          NS: Array.from(setToOperate).map(convertToNumberAttr).map((item2) => item2.N)
        };
      } else if (typeof item === "bigint") {
        return {
          NS: Array.from(setToOperate).map(convertToBigIntAttr).map((item2) => item2.N)
        };
      } else if (typeof item === "string") {
        return {
          SS: Array.from(setToOperate).map(convertToStringAttr).map((item2) => item2.S)
        };
      } else if (isBinary(item)) {
        return {
          // Do not alter binary data passed https://github.com/aws/aws-sdk-js-v3/issues/1530
          // @ts-expect-error Type 'ArrayBuffer' is not assignable to type 'Uint8Array'
          BS: Array.from(setToOperate).map(convertToBinaryAttr).map((item2) => item2.B)
        };
      } else {
        throw new Error(`Only Number Set (NS), Binary Set (BS) or String Set (SS) are allowed.`);
      }
    }, "convertToSetAttr");
    var convertToMapAttrFromIterable = /* @__PURE__ */ __name((data, options) => ({
      M: ((data2) => {
        const map = {};
        for (const [key, value] of data2) {
          if (typeof value !== "function" && (value !== void 0 || !(options == null ? void 0 : options.removeUndefinedValues))) {
            map[key] = convertToAttr(value, options);
          }
        }
        return map;
      })(data)
    }), "convertToMapAttrFromIterable");
    var convertToMapAttrFromEnumerableProps = /* @__PURE__ */ __name((data, options) => ({
      M: ((data2) => {
        const map = {};
        for (const key in data2) {
          const value = data2[key];
          if (typeof value !== "function" && (value !== void 0 || !(options == null ? void 0 : options.removeUndefinedValues))) {
            map[key] = convertToAttr(value, options);
          }
        }
        return map;
      })(data)
    }), "convertToMapAttrFromEnumerableProps");
    var convertToNullAttr = /* @__PURE__ */ __name(() => ({ NULL: true }), "convertToNullAttr");
    var convertToBinaryAttr = /* @__PURE__ */ __name((data) => ({ B: data }), "convertToBinaryAttr");
    var convertToStringAttr = /* @__PURE__ */ __name((data) => ({ S: data.toString() }), "convertToStringAttr");
    var convertToBigIntAttr = /* @__PURE__ */ __name((data) => ({ N: data.toString() }), "convertToBigIntAttr");
    var validateBigIntAndThrow = /* @__PURE__ */ __name((errorPrefix) => {
      throw new Error(`${errorPrefix} ${typeof BigInt === "function" ? "Use BigInt." : "Pass string value instead."} `);
    }, "validateBigIntAndThrow");
    var convertToNumberAttr = /* @__PURE__ */ __name((num) => {
      if ([Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY].map((val) => val.toString()).includes(num.toString())) {
        throw new Error(`Special numeric value ${num.toString()} is not allowed`);
      } else if (num > Number.MAX_SAFE_INTEGER) {
        validateBigIntAndThrow(`Number ${num.toString()} is greater than Number.MAX_SAFE_INTEGER.`);
      } else if (num < Number.MIN_SAFE_INTEGER) {
        validateBigIntAndThrow(`Number ${num.toString()} is lesser than Number.MIN_SAFE_INTEGER.`);
      }
      return { N: num.toString() };
    }, "convertToNumberAttr");
    var isBinary = /* @__PURE__ */ __name((data) => {
      const binaryTypes = [
        "ArrayBuffer",
        "Blob",
        "Buffer",
        "DataView",
        "File",
        "Int8Array",
        "Uint8Array",
        "Uint8ClampedArray",
        "Int16Array",
        "Uint16Array",
        "Int32Array",
        "Uint32Array",
        "Float32Array",
        "Float64Array",
        "BigInt64Array",
        "BigUint64Array"
      ];
      if (data == null ? void 0 : data.constructor) {
        return binaryTypes.includes(data.constructor.name);
      }
      return false;
    }, "isBinary");
    var convertToNative = /* @__PURE__ */ __name((data, options) => {
      for (const [key, value] of Object.entries(data)) {
        if (value !== void 0) {
          switch (key) {
            case "NULL":
              return null;
            case "BOOL":
              return Boolean(value);
            case "N":
              return convertNumber(value, options);
            case "B":
              return convertBinary(value);
            case "S":
              return convertString(value);
            case "L":
              return convertList(value, options);
            case "M":
              return convertMap(value, options);
            case "NS":
              return new Set(value.map((item) => convertNumber(item, options)));
            case "BS":
              return new Set(value.map(convertBinary));
            case "SS":
              return new Set(value.map(convertString));
            default:
              throw new Error(`Unsupported type passed: ${key}`);
          }
        }
      }
      throw new Error(`No value defined: ${JSON.stringify(data)}`);
    }, "convertToNative");
    var convertNumber = /* @__PURE__ */ __name((numString, options) => {
      if (options == null ? void 0 : options.wrapNumbers) {
        return NumberValue.from(numString);
      }
      const num = Number(numString);
      const infinityValues = [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY];
      const isLargeFiniteNumber = (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) && !infinityValues.includes(num);
      if (isLargeFiniteNumber) {
        if (typeof BigInt === "function") {
          try {
            return BigInt(numString);
          } catch (error) {
            throw new Error(`${numString} can't be converted to BigInt. Set options.wrapNumbers to get string value.`);
          }
        } else {
          throw new Error(`${numString} is outside SAFE_INTEGER bounds. Set options.wrapNumbers to get string value.`);
        }
      }
      return num;
    }, "convertNumber");
    var convertString = /* @__PURE__ */ __name((stringValue) => stringValue, "convertString");
    var convertBinary = /* @__PURE__ */ __name((binaryValue) => binaryValue, "convertBinary");
    var convertList = /* @__PURE__ */ __name((list, options) => list.map((item) => convertToNative(item, options)), "convertList");
    var convertMap = /* @__PURE__ */ __name((map, options) => Object.entries(map).reduce(
      (acc, [key, value]) => (acc[key] = convertToNative(value, options), acc),
      {}
    ), "convertMap");
    function marshall(data, options) {
      const attributeValue = convertToAttr(data, options);
      const [key, value] = Object.entries(attributeValue)[0];
      switch (key) {
        case "M":
        case "L":
          return (options == null ? void 0 : options.convertTopLevelContainer) ? attributeValue : value;
        case "SS":
        case "NS":
        case "BS":
        case "S":
        case "N":
        case "B":
        case "NULL":
        case "BOOL":
        case "$unknown":
        default:
          return attributeValue;
      }
    }
    __name(marshall, "marshall");
    var unmarshall2 = /* @__PURE__ */ __name((data, options) => {
      if (options == null ? void 0 : options.convertWithoutMapWrapper) {
        return convertToNative(data, options);
      }
      return convertToNative({ M: data }, options);
    }, "unmarshall");
  }
});

// index.ts
var ts_exports = {};
__export(ts_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(ts_exports);
var import_client_s3 = require("@aws-sdk/client-s3");
var import_util_dynamodb = __toESM(require_dist_cjs());
var s3Client = new import_client_s3.S3Client({ region: process.env.REGION });
if (!process.env.STORAGE_DOCUMENTSTORE_BUCKETNAME)
  throw new Error("STORAGE_DOCUMENTSTORE_BUCKETNAME is not set");
var handler = async (event) => {
  for (const record of event.Records) {
    try {
      if (record.eventName === "REMOVE") {
        const oldImage = record.dynamodb?.OldImage;
        if (!oldImage)
          continue;
        const document = (0, import_util_dynamodb.unmarshall)(oldImage);
        const key = document.key;
        const version = document.version;
        await s3Client.send(
          new import_client_s3.DeleteObjectCommand({
            Bucket: process.env.STORAGE_DOCUMENTSTORE_BUCKETNAME,
            Key: key,
            ...version && { VersionId: version }
          })
        );
        console.log(
          `Successfully deleted S3 object ${key}${version ? ` with version ${version}` : ""}`
        );
      }
    } catch (error) {
      console.error("Error deleting document from S3:", error);
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
