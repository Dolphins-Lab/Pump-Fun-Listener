"use strict";
// https://docs.shyft.to/solana-apis/transactions/transaction-apis#parsed-transaction
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParsedTransaction = void 0;
const getParsedTransaction = (txnId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = `https://api.shyft.to/sol/v1/transaction/parsed?network=mainnet-beta&txn_signature=${txnId}`;
        const myHeaders = new Headers();
        myHeaders.append("x-api-key", "SHYFT_API_KEY");
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        const response = yield fetch(url, requestOptions);
        const data = yield response.json();
        if (data.success) {
            console.log("Parsed transaction details:", data.result);
            const firstAction = data.result.actions[0];
            let poolInfoAddress = "";
            if (firstAction &&
                firstAction.info &&
                firstAction.info.receiver_address) {
                poolInfoAddress = firstAction.info.receiver_address;
            }
            console.log("Actions:");
            data.result.actions.forEach((action, index) => {
                console.log(`Action ${index + 1}:`, action);
            });
            console.log("Events:");
            data.result.events.forEach((event, index) => {
                console.log(`Event ${index + 1}:`, event);
            });
            return { data, poolInfoAddress };
        }
        else {
            console.log("Failed to fetch transaction details:", data.message);
            return { data, poolInfoAddress: "" };
        }
    }
    catch (error) {
        console.log("Error fetching parsed transaction:", error);
        return null;
    }
});
exports.getParsedTransaction = getParsedTransaction;
