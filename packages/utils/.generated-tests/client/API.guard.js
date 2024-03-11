"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPostPaymentResult = exports.isGetTransactionByIdResult = exports.isGetTransactionsResult = exports.isGetBalanceResult = exports.isGetBalanceParams = exports.isGetBalance200 = exports.isGetTransactionsParams = exports.isGetTransactions200Item = exports.isGetTransactionByIdParams = exports.isGetTransactionById200 = exports.isPostPaymentBody = exports.isPostPayment202 = void 0;
function evaluate(isCorrect, varName, expected, actual) {
    if (!isCorrect) {
        console.error("".concat(varName, " type mismatch, expected: ").concat(expected, ", found:"), actual);
    }
    return isCorrect;
}
function isPostPayment202(obj, argumentName) {
    if (argumentName === void 0) { argumentName = "postPayment202"; }
    var typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        evaluate((typeof typedObj["id"] === "undefined" ||
            typeof typedObj["id"] === "string"), "".concat(argumentName, "[\"id\"]"), "string | undefined", typedObj["id"]) &&
        evaluate((typeof typedObj["status"] === "undefined" ||
            typeof typedObj["status"] === "string"), "".concat(argumentName, "[\"status\"]"), "string | undefined", typedObj["status"]));
}
exports.isPostPayment202 = isPostPayment202;
function isPostPaymentBody(obj, argumentName) {
    if (argumentName === void 0) { argumentName = "postPaymentBody"; }
    var typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        evaluate((typeof typedObj["amount"] === "undefined" ||
            typeof typedObj["amount"] === "string"), "".concat(argumentName, "[\"amount\"]"), "string | undefined", typedObj["amount"]) &&
        evaluate((typeof typedObj["username"] === "undefined" ||
            typeof typedObj["username"] === "string"), "".concat(argumentName, "[\"username\"]"), "string | undefined", typedObj["username"]));
}
exports.isPostPaymentBody = isPostPaymentBody;
function isGetTransactionById200(obj, argumentName) {
    if (argumentName === void 0) { argumentName = "getTransactionById200"; }
    var typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        evaluate((typeof typedObj["amount"] === "undefined" ||
            typeof typedObj["amount"] === "string"), "".concat(argumentName, "[\"amount\"]"), "string | undefined", typedObj["amount"]) &&
        evaluate((typeof typedObj["date"] === "undefined" ||
            typeof typedObj["date"] === "string"), "".concat(argumentName, "[\"date\"]"), "string | undefined", typedObj["date"]) &&
        evaluate((typeof typedObj["id"] === "undefined" ||
            typeof typedObj["id"] === "string"), "".concat(argumentName, "[\"id\"]"), "string | undefined", typedObj["id"]) &&
        evaluate((typeof typedObj["status"] === "undefined" ||
            typeof typedObj["status"] === "string"), "".concat(argumentName, "[\"status\"]"), "string | undefined", typedObj["status"]));
}
exports.isGetTransactionById200 = isGetTransactionById200;
function isGetTransactionByIdParams(obj, argumentName) {
    if (argumentName === void 0) { argumentName = "getTransactionByIdParams"; }
    var typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        evaluate(typeof typedObj["id"] === "string", "".concat(argumentName, "[\"id\"]"), "string", typedObj["id"]) &&
        evaluate(typeof typedObj["username"] === "string", "".concat(argumentName, "[\"username\"]"), "string", typedObj["username"]));
}
exports.isGetTransactionByIdParams = isGetTransactionByIdParams;
function isGetTransactions200Item(obj, argumentName) {
    if (argumentName === void 0) { argumentName = "getTransactions200Item"; }
    var typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        evaluate((typeof typedObj["amount"] === "undefined" ||
            typeof typedObj["amount"] === "string"), "".concat(argumentName, "[\"amount\"]"), "string | undefined", typedObj["amount"]) &&
        evaluate((typeof typedObj["date"] === "undefined" ||
            typeof typedObj["date"] === "string"), "".concat(argumentName, "[\"date\"]"), "string | undefined", typedObj["date"]) &&
        evaluate((typeof typedObj["id"] === "undefined" ||
            typeof typedObj["id"] === "string"), "".concat(argumentName, "[\"id\"]"), "string | undefined", typedObj["id"]) &&
        evaluate((typeof typedObj["status"] === "undefined" ||
            typeof typedObj["status"] === "string"), "".concat(argumentName, "[\"status\"]"), "string | undefined", typedObj["status"]));
}
exports.isGetTransactions200Item = isGetTransactions200Item;
function isGetTransactionsParams(obj, argumentName) {
    if (argumentName === void 0) { argumentName = "getTransactionsParams"; }
    var typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        evaluate(typeof typedObj["username"] === "string", "".concat(argumentName, "[\"username\"]"), "string", typedObj["username"]));
}
exports.isGetTransactionsParams = isGetTransactionsParams;
function isGetBalance200(obj, argumentName) {
    if (argumentName === void 0) { argumentName = "getBalance200"; }
    var typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        evaluate((typeof typedObj["balance"] === "undefined" ||
            typeof typedObj["balance"] === "number"), "".concat(argumentName, "[\"balance\"]"), "number | undefined", typedObj["balance"]));
}
exports.isGetBalance200 = isGetBalance200;
function isGetBalanceParams(obj, argumentName) {
    if (argumentName === void 0) { argumentName = "getBalanceParams"; }
    var typedObj = obj;
    return ((typedObj !== null &&
        typeof typedObj === "object" ||
        typeof typedObj === "function") &&
        evaluate(typeof typedObj["username"] === "string", "".concat(argumentName, "[\"username\"]"), "string", typedObj["username"]));
}
exports.isGetBalanceParams = isGetBalanceParams;
function isGetBalanceResult(obj, argumentName) {
    if (argumentName === void 0) { argumentName = "getBalanceResult"; }
    var typedObj = obj;
    return (typeof typedObj === "AxiosResponse<import(");
    F: /ws2/middle_earth / paycode - customer - v2 / apps / paycode - proxy / .temp - generateClient / client / API;
    ").GetBalance200>";
}
exports.isGetBalanceResult = isGetBalanceResult;
function isGetTransactionsResult(obj, argumentName) {
    if (argumentName === void 0) { argumentName = "getTransactionsResult"; }
    var typedObj = obj;
    return (typeof typedObj === "AxiosResponse<import(");
    F: /ws2/middle_earth / paycode - customer - v2 / apps / paycode - proxy / .temp - generateClient / client / API;
    ").GetTransactions200Item[]>";
}
exports.isGetTransactionsResult = isGetTransactionsResult;
function isGetTransactionByIdResult(obj, argumentName) {
    if (argumentName === void 0) { argumentName = "getTransactionByIdResult"; }
    var typedObj = obj;
    return (typeof typedObj === "AxiosResponse<import(");
    F: /ws2/middle_earth / paycode - customer - v2 / apps / paycode - proxy / .temp - generateClient / client / API;
    ").GetTransactionById200>";
}
exports.isGetTransactionByIdResult = isGetTransactionByIdResult;
function isPostPaymentResult(obj, argumentName) {
    if (argumentName === void 0) { argumentName = "postPaymentResult"; }
    var typedObj = obj;
    return (typeof typedObj === "AxiosResponse<import(");
    F: /ws2/middle_earth / paycode - customer - v2 / apps / paycode - proxy / .temp - generateClient / client / API;
    ").PostPayment202>";
}
exports.isPostPaymentResult = isPostPaymentResult;
