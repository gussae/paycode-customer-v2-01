/*
 * Generated type guards for "API.ts".
 * WARNING: Do not manually change this file.
 */
import { PostPayment202, PostPaymentBody, GetTransactionById200, GetTransactionByIdParams, GetTransactions200Item, GetTransactionsParams, GetBalance200, GetBalanceParams, GetBalanceResult, GetTransactionsResult, GetTransactionByIdResult, PostPaymentResult } from "./API";

function evaluate(
    isCorrect: boolean,
    varName: string,
    expected: string,
    actual: any
): boolean {
    if (!isCorrect) {
        console.error(
            `${varName} type mismatch, expected: ${expected}, found:`,
            actual
        )
    }
    return isCorrect
}

export function isPostPayment202(obj: unknown, argumentName: string = "postPayment202"): obj is PostPayment202 {
    const typedObj = obj as PostPayment202
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        evaluate((typeof typedObj["id"] === "undefined" ||
            typeof typedObj["id"] === "string"), `${argumentName}["id"]`, "string | undefined", typedObj["id"]) &&
        evaluate((typeof typedObj["status"] === "undefined" ||
            typeof typedObj["status"] === "string"), `${argumentName}["status"]`, "string | undefined", typedObj["status"])
    )
}

export function isPostPaymentBody(obj: unknown, argumentName: string = "postPaymentBody"): obj is PostPaymentBody {
    const typedObj = obj as PostPaymentBody
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        evaluate((typeof typedObj["amount"] === "undefined" ||
            typeof typedObj["amount"] === "string"), `${argumentName}["amount"]`, "string | undefined", typedObj["amount"]) &&
        evaluate((typeof typedObj["username"] === "undefined" ||
            typeof typedObj["username"] === "string"), `${argumentName}["username"]`, "string | undefined", typedObj["username"])
    )
}

export function isGetTransactionById200(obj: unknown, argumentName: string = "getTransactionById200"): obj is GetTransactionById200 {
    const typedObj = obj as GetTransactionById200
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        evaluate((typeof typedObj["amount"] === "undefined" ||
            typeof typedObj["amount"] === "string"), `${argumentName}["amount"]`, "string | undefined", typedObj["amount"]) &&
        evaluate((typeof typedObj["date"] === "undefined" ||
            typeof typedObj["date"] === "string"), `${argumentName}["date"]`, "string | undefined", typedObj["date"]) &&
        evaluate((typeof typedObj["id"] === "undefined" ||
            typeof typedObj["id"] === "string"), `${argumentName}["id"]`, "string | undefined", typedObj["id"]) &&
        evaluate((typeof typedObj["status"] === "undefined" ||
            typeof typedObj["status"] === "string"), `${argumentName}["status"]`, "string | undefined", typedObj["status"])
    )
}

export function isGetTransactionByIdParams(obj: unknown, argumentName: string = "getTransactionByIdParams"): obj is GetTransactionByIdParams {
    const typedObj = obj as GetTransactionByIdParams
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        evaluate(typeof typedObj["id"] === "string", `${argumentName}["id"]`, "string", typedObj["id"]) &&
        evaluate(typeof typedObj["username"] === "string", `${argumentName}["username"]`, "string", typedObj["username"])
    )
}

export function isGetTransactions200Item(obj: unknown, argumentName: string = "getTransactions200Item"): obj is GetTransactions200Item {
    const typedObj = obj as GetTransactions200Item
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        evaluate((typeof typedObj["amount"] === "undefined" ||
            typeof typedObj["amount"] === "string"), `${argumentName}["amount"]`, "string | undefined", typedObj["amount"]) &&
        evaluate((typeof typedObj["date"] === "undefined" ||
            typeof typedObj["date"] === "string"), `${argumentName}["date"]`, "string | undefined", typedObj["date"]) &&
        evaluate((typeof typedObj["id"] === "undefined" ||
            typeof typedObj["id"] === "string"), `${argumentName}["id"]`, "string | undefined", typedObj["id"]) &&
        evaluate((typeof typedObj["status"] === "undefined" ||
            typeof typedObj["status"] === "string"), `${argumentName}["status"]`, "string | undefined", typedObj["status"])
    )
}

export function isGetTransactionsParams(obj: unknown, argumentName: string = "getTransactionsParams"): obj is GetTransactionsParams {
    const typedObj = obj as GetTransactionsParams
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        evaluate(typeof typedObj["username"] === "string", `${argumentName}["username"]`, "string", typedObj["username"])
    )
}

export function isGetBalance200(obj: unknown, argumentName: string = "getBalance200"): obj is GetBalance200 {
    const typedObj = obj as GetBalance200
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        evaluate((typeof typedObj["balance"] === "undefined" ||
            typeof typedObj["balance"] === "number"), `${argumentName}["balance"]`, "number | undefined", typedObj["balance"])
    )
}

export function isGetBalanceParams(obj: unknown, argumentName: string = "getBalanceParams"): obj is GetBalanceParams {
    const typedObj = obj as GetBalanceParams
    return (
        (typedObj !== null &&
            typeof typedObj === "object" ||
            typeof typedObj === "function") &&
        evaluate(typeof typedObj["username"] === "string", `${argumentName}["username"]`, "string", typedObj["username"])
    )
}

export function isGetBalanceResult(obj: unknown, argumentName: string = "getBalanceResult"): obj is GetBalanceResult {
    const typedObj = obj as GetBalanceResult
    return (
        typeof typedObj === "AxiosResponse<import("F: /ws2/middle_earth / paycode - customer - v2 / apps / paycode - proxy /.temp - generateClient / client / API").GetBalance200>"
)
}

export function isGetTransactionsResult(obj: unknown, argumentName: string = "getTransactionsResult"): obj is GetTransactionsResult {
    const typedObj = obj as GetTransactionsResult
    return (
        typeof typedObj === "AxiosResponse<import("F: /ws2/middle_earth / paycode - customer - v2 / apps / paycode - proxy /.temp - generateClient / client / API").GetTransactions200Item[]>"
)
}

export function isGetTransactionByIdResult(obj: unknown, argumentName: string = "getTransactionByIdResult"): obj is GetTransactionByIdResult {
    const typedObj = obj as GetTransactionByIdResult
    return (
        typeof typedObj === "AxiosResponse<import("F: /ws2/middle_earth / paycode - customer - v2 / apps / paycode - proxy /.temp - generateClient / client / API").GetTransactionById200>"
)
}

export function isPostPaymentResult(obj: unknown, argumentName: string = "postPaymentResult"): obj is PostPaymentResult {
    const typedObj = obj as PostPaymentResult
    return (
        typeof typedObj === "AxiosResponse<import("F: /ws2/middle_earth / paycode - customer - v2 / apps / paycode - proxy /.temp - generateClient / client / API").PostPayment202>"
)
}
